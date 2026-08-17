'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const HOST = '0.0.0.0';
const PREVIEW_USER = process.env.PREVIEW_USER || '';
const PREVIEW_PASSWORD = process.env.PREVIEW_PASSWORD || '';
const AUTH_ENABLED = Boolean(PREVIEW_USER && PREVIEW_PASSWORD);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function constantTimeEqual(a, b) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  if (aa.length !== bb.length) return false;
  return crypto.timingSafeEqual(aa, bb);
}

function authorized(req) {
  if (!AUTH_ENABLED) return true;
  const header = req.headers.authorization || '';
  if (!header.startsWith('Basic ')) return false;
  try {
    const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
    const idx = decoded.indexOf(':');
    if (idx < 0) return false;
    const user = decoded.slice(0, idx);
    const pass = decoded.slice(idx + 1);
    return constantTimeEqual(user, PREVIEW_USER) && constantTimeEqual(pass, PREVIEW_PASSWORD);
  } catch {
    return false;
  }
}

function setSecurityHeaders(res) {
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "img-src 'self' data: blob:",
    "style-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "form-action 'self' https://wa.me",
    'upgrade-insecure-requests'
  ].join('; '));
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
}

function safeResolve(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath.split('?')[0]);
  } catch {
    return null;
  }
  if (decoded.includes('\0') || decoded.split('/').includes('..')) return null;
  const clean = path.posix.normalize('/' + decoded).replace(/^\/+/, '');
  if (!clean || clean === '.') return path.join(ROOT, 'index.html');
  if (clean.split('/').some(part => part.startsWith('.'))) return null;
  const candidate = path.resolve(ROOT, clean);
  if (!candidate.startsWith(path.resolve(ROOT) + path.sep)) return null;
  return candidate;
}

function serveFile(req, res, filePath) {
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      // SPA/deep-link fallback only for extensionless routes.
      const requestPath = (req.url || '/').split('?')[0];
      if (!path.extname(requestPath)) {
        return serveFile(req, res, path.join(ROOT, 'index.html'));
      }
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.end('404');
    }

    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    if (ext === '.html') {
      res.setHeader('Cache-Control', 'no-store');
    } else if (['.js', '.css', '.json'].includes(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }

    if (req.method === 'HEAD') {
      res.statusCode = 200;
      res.setHeader('Content-Length', stat.size);
      return res.end();
    }

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) res.statusCode = 500;
      res.end();
    });
    stream.pipe(res);
  });
}

const server = http.createServer((req, res) => {
  setSecurityHeaders(res);

  if (!['GET', 'HEAD'].includes(req.method || '')) {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET, HEAD');
    return res.end('Method Not Allowed');
  }

  if (!authorized(req)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Estilo Med Preview", charset="UTF-8"');
    res.setHeader('Cache-Control', 'no-store');
    return res.end('Authentication required');
  }

  if ((req.url || '').split('?')[0] === '/health') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(JSON.stringify({ ok: true, service: 'estilo-med-preview' }));
  }

  const filePath = safeResolve(req.url || '/');
  if (!filePath) {
    res.statusCode = 400;
    return res.end('Bad Request');
  }
  serveFile(req, res, filePath);
});

server.requestTimeout = 15000;
server.headersTimeout = 10000;
server.keepAliveTimeout = 5000;

server.listen(PORT, HOST, () => {
  console.log(`Estilo Med preview listening on ${HOST}:${PORT}`);
  console.log(`Preview auth: ${AUTH_ENABLED ? 'enabled' : 'disabled'}`);
});

# Railway — Estilo Med Preview

## Repository
Recommended: `gtech-estilo-med-preview` (PRIVATE).

## Deploy
1. Push this folder to a private GitHub repository.
2. Railway > New Project > Deploy from GitHub repo.
3. Select the private repository.
4. Railway detects `package.json` and runs `npm start`.
5. Generate a Railway public domain.

## Preview protection (recommended)
In Railway > Service > Variables, create:
- `PREVIEW_USER` = a username you choose
- `PREVIEW_PASSWORD` = a strong unique password (16+ chars)

Do NOT commit real values to GitHub.

## Notes
- No API keys are required for this preview.
- No private client contact is present in the public app data.
- The preview sends `noindex` headers and robots rules to avoid search indexing.
- `/health` returns a small JSON status after authentication (or without auth if preview protection is disabled).

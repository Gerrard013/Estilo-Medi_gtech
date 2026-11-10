'use strict';
/** G Tech — Emilly S. Cristina. Sem integração com API de IA/WhatsApp nesta versão. */
const WHATSAPP='5591989478306';
const PROCEDURES=[
{name:'Limpeza de pele',category:'facial',short:'Cuidados faciais',description:'Converse com a profissional para conhecer as etapas e a indicação do procedimento.'},
{name:'Limpeza de pele com dermaplaning',category:'facial',short:'Cuidados faciais',description:'Conheça os detalhes e as orientações antes de agendar.'},
{name:'Hydra Gloss',category:'facial',short:'Cuidados faciais',description:'Consulte a indicação e os cuidados específicos para o procedimento labial.'},
{name:'Clareamento com peeling',category:'facial',short:'Consultar áreas',description:'As áreas atendidas e a indicação devem ser confirmadas com a profissional.'},
{name:'Drenagem linfática',category:'corporal',short:'Bem-estar corporal',description:'Solicite informações sobre a técnica, orientações e disponibilidade.'},
{name:'Massagem relaxante',category:'corporal',short:'Bem-estar corporal',description:'Um momento dedicado ao relaxamento e à pausa na rotina.'},
{name:'Massagem com ventosaterapia',category:'corporal',short:'Bem-estar corporal',description:'Converse sobre a técnica, indicações e cuidados antes do atendimento.'},
{name:'Massagem com pedras quentes',category:'corporal',short:'Bem-estar corporal',description:'Conheça essa opção de massagem e consulte disponibilidade.'},
{name:'Depilação a cera',category:'corporal',short:'Consultar áreas',description:'As áreas atendidas, valores e cuidados são informados no agendamento.'},
{name:'Cílios tufinho',category:'olhar',short:'Realce do olhar',description:'Converse sobre o efeito desejado, manutenção e recomendações.'},
{name:'Brow Lamination',category:'olhar',short:'Realce do olhar',description:'Consulte os detalhes, duração e cuidados com o procedimento.'},
{name:'Design de sobrancelhas com henna',category:'olhar',short:'Realce do olhar',description:'Agende uma conversa para descobrir as possibilidades de acabamento.'}
];
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav=document.getElementById('nav-links');
const toggle=document.querySelector('.menu-toggle');
function closeMenu(){if(!nav||!toggle)return;nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');document.body.classList.remove('menu-open')}
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');document.body.classList.toggle('menu-open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()})}
function bookHref(name){return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá, Emilly! Vim pelo site e gostaria de saber mais sobre '+name+'. Poderia me informar o valor e a disponibilidade para agendamento?')}`}
const procedureList=document.getElementById('procedure-list');
const filters=[...document.querySelectorAll('[data-filter]')];
function renderServices(type='todos'){
 if(!procedureList)return;
 const subset=PROCEDURES.filter(p=>type==='todos'||p.category===type);
 const fragment=document.createDocumentFragment();
 subset.forEach((item,i)=>{
  const article=document.createElement('article');article.className='procedure';
  const num=document.createElement('span');num.className='procedure__number';num.textContent=String(i+1).padStart(2,'0');
  const body=document.createElement('div');body.className='procedure__text';
  const title=document.createElement('h3');title.textContent=item.name;
  const desc=document.createElement('p');desc.textContent=item.description;
  body.append(title,desc);
  const action=document.createElement('a');action.className='procedure__action';action.href=bookHref(item.name);action.target='_blank';action.rel='noopener noreferrer';action.dataset.wa='Procedimento: '+item.name;action.setAttribute('aria-label','Consultar '+item.name+' pelo WhatsApp');action.innerHTML='Consultar <span aria-hidden="true">↗</span>';
  article.append(num,body,action);fragment.appendChild(article);
 });
 procedureList.replaceChildren(fragment);
 filters.forEach(b=>{const active=b.dataset.filter===type;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
}
filters.forEach(b=>b.addEventListener('click',()=>renderServices(b.dataset.filter)));
document.querySelectorAll('[data-filter-link]').forEach(a=>a.addEventListener('click',()=>renderServices(a.dataset.filterLink)));
renderServices();
const currentYear=document.getElementById('year');if(currentYear)currentYear.textContent=new Date().getFullYear();
if(!reducedMotion&&'IntersectionObserver' in window){const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:0.08,rootMargin:'0px 0px 40px 0px'});document.querySelectorAll('.reveal').forEach(el=>io.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
// Registro operacional opcional: o evento é publicado somente quando houver endpoint próprio configurado.
// Nenhum dado pessoal nem conteúdo do WhatsApp é coletado neste site.
const METRICS_ENDPOINT='';
document.addEventListener('click',event=>{const link=event.target.closest('a[data-wa]');if(!link||!METRICS_ENDPOINT)return;try{const payload=JSON.stringify({event:'whatsapp_click',origin:link.dataset.wa||'desconhecido',ts:Date.now()});navigator.sendBeacon?.(METRICS_ENDPOINT,new Blob([payload],{type:'application/json'}))}catch{/* Sem interromper o agendamento */}});

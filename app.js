'use strict';
/** Emilly S. Cristina — Esthetic Expert | G Tech Cinema Experience v2.0.0 */
const WHATSAPP = '5591989478306';
const IG = 'https://www.instagram.com/emillyscristina_estheticexpert/';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PROCEDURES = [
 {name:'Limpeza de pele',category:'facial',short:'Um cuidado dedicado à pele e à sua rotina de autocuidado.',image:'facial-em-destaque.webp',advice:'Solicite orientações sobre avaliação, etapas, contraindicações e cuidados posteriores.'},
 {name:'Limpeza de pele com dermaplaning',category:'facial',short:'Uma opção de cuidado facial que combina técnicas.',image:'facial-em-destaque.webp',advice:'Confirme com a Emilly as indicações e os cuidados apropriados para a sua pele.'},
 {name:'Hydra Gloss',category:'facial',short:'Um ritual de cuidado labial.',image:'hydra-em-destaque.webp',advice:'Pergunte sobre as etapas, recomendações e expectativas adequadas para o seu caso.'},
 {name:'Clareamento com peeling',category:'facial',short:'Procedimento estético para áreas a consultar.',image:'resultados-em-destaque.webp',advice:'A região, o protocolo e a adequação precisam ser definidos pela profissional.'},
 {name:'Drenagem linfática',category:'corporal',short:'Uma das opções de cuidado corporal disponíveis.',image:'corporal-em-destaque.webp',advice:'A profissional poderá informar indicações, contraindicações e orientações específicas.'},
 {name:'Massagem relaxante',category:'corporal',short:'Um convite para desacelerar e reservar um tempo para você.',image:'ritual-corporal.webp',advice:'Consulte o formato do atendimento e esclareça dúvidas antes de agendar.'},
 {name:'Massagem com ventosaterapia',category:'corporal',short:'Técnica de massagem disponível no catálogo.',image:'atendimento.webp',advice:'Pergunte sobre a técnica, adequação e cuidados pertinentes.'},
 {name:'Massagem relaxante com pedras quentes',category:'corporal',short:'Massagem com uso de pedras quentes.',image:'corporal-em-destaque.webp',advice:'Confirme disponibilidade e recomendações para o seu atendimento.'},
 {name:'Depilação a cera',category:'corporal',short:'Regiões atendidas sob consulta.',image:'clinica-experiencia.webp',advice:'Informe a área de interesse no WhatsApp para consultar valores e cuidados.'},
 {name:'Cílios tufinho',category:'olhar',short:'Realce do olhar com uma proposta personalizada.',image:'sobrancelhas.webp',advice:'Converse sobre acabamento, manutenção e cuidados necessários.'},
 {name:'Brow Lamination',category:'olhar',short:'Procedimento para valorização estética das sobrancelhas.',image:'olhar-em-destaque.webp',advice:'Consulte a profissional sobre o efeito, indicações e cuidados posteriores.'},
 {name:'Design de sobrancelhas com henna',category:'olhar',short:'Detalhes que valorizam a expressão do olhar.',image:'sobrancelhas.webp',advice:'Converse sobre formato, cor, estilo e os cuidados do procedimento.'}
];
const GALLERY = [
 ['abertura','Logomarca oficial da Emilly S. Cristina'],
 ['foto01','Conteúdo do Instagram oficial'],['foto02','Contato e informações do perfil'],
 ['foto03','Cuidados: peeling'],['foto04','Informações sobre procedimentos'],['foto05','Cuidados com a pele'],['foto06','Cuidados personalizados'],['foto07','Informações sobre resultados'],['foto08','Conteúdo sobre cílios'],['foto09','Catálogo de serviços'],['foto10','Informações de pagamento'],
 ['foto11','Registro de tratamento de pele'],['foto12','Hydra Gloss'],['foto13','Cuidado corporal'],['foto14','Bastidores do atendimento'],['foto15','Registro de procedimento facial'],['foto16','Equipamentos em atendimento'],['foto17','Registro de sobrancelhas'],['foto18','Agenda e bastidores'],['foto19','Registro de depilação'],['foto20','Registro comparativo compartilhado'],['foto21','Conteúdo de tratamento estético'],['foto22','Catálogo oficial de procedimentos'],['foto23','Bastidores de atendimento'],['foto24','Registro comparativo compartilhado'],['foto25','Registro de cuidados faciais'],['foto26','Bastidores de procedimento facial'],['foto27','Agenda de atendimentos'],['foto28','Registro comparativo compartilhado'],['foto29','Registro de beleza do olhar'],['foto30','Registro de design de sobrancelhas'],['foto31','Detalhes de sobrancelhas'],['foto32','Detalhes de Hydra Gloss'],['foto33','Retrato do acervo da profissional']
].map(([key,caption])=>({key,caption,src:`/assets/acervo/${key}.webp`}));
const $ = (q,scope=document)=>scope.querySelector(q);
const $$ = (q,scope=document)=>Array.from(scope.querySelectorAll(q));
const whatsapp=(message)=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
function linkTracked(a,origin){a.href=whatsapp(`Olá, Emilly! Vim pelo site e gostaria de conhecer melhor ${origin}. Poderia me informar o valor e os horários disponíveis?`);a.dataset.wa=origin;a.target='_blank';a.rel='noopener noreferrer';}
function openModal(dialog){if(!dialog)return;try{dialog.showModal();document.body.classList.add('modal-open')}catch(e){console.error('Não foi possível abrir',e)}}
function closeModal(dialog){if(dialog?.open)dialog.close();if(!$$('dialog[open]').length)document.body.classList.remove('modal-open')}
$$('[data-close-modal]').forEach(button=>button.addEventListener('click',()=>closeModal(button.closest('dialog'))));
$$('dialog').forEach(dialog=>{dialog.addEventListener('click',event=>{if(event.target===dialog)closeModal(dialog)});dialog.addEventListener('close',()=>{if(!$$('dialog[open]').length)document.body.classList.remove('modal-open')})});

// Intro: cinema on first visit to page within a browser session, accessible skip and replay.
const intro=$('#cinema');const skip=$('#skip-intro');let introTimer=null;let introClosed=false;
function endIntro(){if(!intro||introClosed)return;introClosed=true;clearTimeout(introTimer);intro.classList.add('is-exiting');document.body.classList.add('is-ready');try{sessionStorage.setItem('emilly-intro-seen-v2','1')}catch{}setTimeout(()=>{intro.hidden=true;intro.setAttribute('aria-hidden','true')},950)}
function startIntro(force=false){if(!intro)return;introClosed=false;clearTimeout(introTimer);intro.hidden=false;intro.removeAttribute('aria-hidden');intro.classList.remove('is-exiting');document.body.classList.remove('is-ready');if(reduced){endIntro();return}introTimer=setTimeout(endIntro,3900);if(force)skip?.focus({preventScroll:true})}
let alreadySeen=false;try{alreadySeen=sessionStorage.getItem('emilly-intro-seen-v2')==='1'}catch{}
if(alreadySeen||reduced){intro.hidden=true;intro.setAttribute('aria-hidden','true');document.body.classList.add('is-ready');introClosed=true}else startIntro();
skip?.addEventListener('click',endIntro);
$('#replay-intro')?.addEventListener('click',()=>{window.scrollTo({top:0,behavior:reduced?'auto':'smooth'});startIntro(true)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!introClosed)endIntro()});

// Menus & scroll progress
const nav=$('#main-nav'),menu=$('#menu-button'),header=$('.header'),progress=$('#progress');
function closeMenu(){nav?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Abrir menu');document.body.classList.remove('menu-open')}
menu?.addEventListener('click',()=>{const opened=!nav.classList.contains('is-open');nav.classList.toggle('is-open',opened);menu.setAttribute('aria-expanded',String(opened));menu.setAttribute('aria-label',opened?'Fechar menu':'Abrir menu');document.body.classList.toggle('menu-open',opened)});
$$('#main-nav a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
let frame=null;
function scrollEffects(){frame=null;const y=window.scrollY;header?.classList.toggle('is-scrolled',y>28);if(progress){const extent=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);progress.style.width=`${Math.max(0,Math.min(100,y/extent*100))}%`}if(reduced||window.innerWidth<700)return;
 $$('[data-float]').forEach(el=>{const rect=el.closest('[data-parallax-root]').getBoundingClientRect();const p=Math.max(-1,Math.min(1,((window.innerHeight/2)-(rect.top+rect.height/2))/window.innerHeight));el.style.transform=`translate3d(0, ${p*Number(el.dataset.float||0)}px,0)`});
 $$('.scene[data-depth]').forEach(el=>{const rect=el.getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight){const offset=(rect.top-innerHeight*.5)*Number(el.dataset.depth);el.style.setProperty('--depth-offset',`${offset.toFixed(1)}px`)}})
}
window.addEventListener('scroll',()=>{if(frame===null)frame=requestAnimationFrame(scrollEffects)},{passive:true});scrollEffects();
if(!reduced&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}},{threshold:.07,rootMargin:'0px 0px -20px 0px'});$$('.reveal').forEach(e=>observer.observe(e))}else $$('.reveal').forEach(e=>e.classList.add('in-view'));

// Service catalog and detail dialogs
let serviceFilter='todos';const catalog=$('#service-grid'),serviceDialog=$('#service-dialog');
const prettyCategory=c=>({facial:'FACIAL',corporal:'CORPORAL',olhar:'OLHAR'}[c]||'ESTÉTICA');
function showService(item){const box=$('#service-dialog-content');if(!box)return;box.replaceChildren();const inner=document.createElement('div');inner.className='service-modal__inner';const visual=document.createElement('div');visual.className='service-modal__image';const img=document.createElement('img');img.src='/assets/'+item.image;img.alt='Imagem ilustrativa do procedimento '+item.name;visual.append(img);const body=document.createElement('div');body.className='service-modal__body';const category=document.createElement('p');category.className='micro';category.textContent=prettyCategory(item.category)+' · ESTHETIC EXPERT';const h=document.createElement('h2');h.textContent=item.name;const p=document.createElement('p');p.textContent=item.short;const note=document.createElement('p');note.textContent=item.advice;const list=document.createElement('ul');['Atendimento com horário a confirmar','Valores consultados diretamente com a profissional','Orientações individualizadas no contato'].forEach(t=>{const li=document.createElement('li');li.textContent=t;list.append(li)});const link=document.createElement('a');link.className='button button--gold';link.textContent='Consultar e agendar ↗';linkTracked(link,item.name);body.append(category,h,p,note,list,link);inner.append(visual,body);box.append(inner);openModal(serviceDialog)}
function renderServices(filter='todos'){serviceFilter=filter;const selected=PROCEDURES.filter(p=>filter==='todos'||p.category===filter);if(!catalog)return;catalog.replaceChildren();selected.forEach((item,i)=>{const card=document.createElement('button');card.type='button';card.className='service-card';card.setAttribute('aria-label','Saiba mais sobre '+item.name);const img=document.createElement('img');img.src='/assets/'+item.image;img.alt='';img.loading='lazy';img.decoding='async';const top=document.createElement('div');top.className='service-card__top';const cat=document.createElement('span');cat.textContent=prettyCategory(item.category);const num=document.createElement('b');num.textContent=String(i+1).padStart(2,'0')+' / '+String(selected.length).padStart(2,'0');top.append(cat,num);const bottom=document.createElement('div');bottom.className='service-card__bottom';const h=document.createElement('h3');h.textContent=item.name;const p=document.createElement('p');p.textContent=item.short;const link=document.createElement('span');link.className='service-card__arrow';link.innerHTML='CONHECER PROCEDIMENTO <span aria-hidden="true">↗</span>';bottom.append(h,p,link);card.append(img,top,bottom);card.addEventListener('click',()=>showService(item));catalog.append(card)});$$('[data-filter]').forEach(button=>{let active=button.dataset.filter===filter;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))})}
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>renderServices(b.dataset.filter)));
$$('[data-goal-category]').forEach(a=>a.addEventListener('click',()=>renderServices(a.dataset.goalCategory)));
renderServices();

// Full 34-piece verified visual archive; enlarge with keyboard navigable lightbox.
let currentImage=0;const galleryDialog=$('#gallery-dialog'),lightbox=$('#lightbox-dialog');
function imageButton(i,withCaption=true){const im=GALLERY[i];const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Ampliar imagem ${i+1}: ${im.caption}`);const img=document.createElement('img');img.src=im.src;img.alt=im.caption;img.loading='lazy';img.decoding='async';b.append(img);if(withCaption){const label=document.createElement('span');label.textContent=`${String(i+1).padStart(2,'0')} / 34`;b.append(label)}b.addEventListener('click',()=>openLightbox(i));return b}
function buildGallery(){const grid=$('#gallery-grid'),ribbon=$('#gallery-ribbon');if(grid){const fragment=document.createDocumentFragment();GALLERY.forEach((_,i)=>fragment.append(imageButton(i)));grid.append(fragment)}if(ribbon){const track=document.createElement('div');track.className='gallery-ribbon__track';const showcase=[0,11,12,13,14,15,16,17,19,20,22,23,24,25,26,27,28,29,30,31,32,33];showcase.concat(showcase).forEach(i=>track.append(imageButton(i)));ribbon.append(track)}const count=$('#gallery-count');if(count)count.textContent=`${GALLERY.length} imagens autorizadas`}
function openLightbox(i){currentImage=(i+GALLERY.length)%GALLERY.length;const im=GALLERY[currentImage];const image=$('#lightbox-image');image.src=im.src;image.alt=im.caption;$('#lightbox-caption').textContent=im.caption;$('#lightbox-index').textContent=`${currentImage+1} / ${GALLERY.length}`;if(!lightbox.open)openModal(lightbox)}
function openGallery(){openModal(galleryDialog)}
$('#open-gallery')?.addEventListener('click',openGallery);$('#open-gallery-bottom')?.addEventListener('click',openGallery);
$('#lightbox-prev')?.addEventListener('click',()=>openLightbox(currentImage-1));$('#lightbox-next')?.addEventListener('click',()=>openLightbox(currentImage+1));
document.addEventListener('keydown',e=>{if(lightbox?.open&&e.key==='ArrowLeft')openLightbox(currentImage-1);if(lightbox?.open&&e.key==='ArrowRight')openLightbox(currentImage+1)});
buildGallery();

// Guided exploration — no personal data, no automatic treatment recommendations
const quizHeading=$('#quiz-heading'),quizOptions=$('#quiz-options'),quizResults=$('#quiz-results'),stage=$('#quiz-stage');
const goals={facial:'cuidados faciais',corporal:'bem-estar corporal',olhar:'beleza do olhar',todos:'todos os cuidados'};
function showQuizResults(goal){quizHeading.textContent='Seu próximo passo pode começar por aqui.';stage.textContent='02 / 02';quizOptions.hidden=true;quizResults.hidden=false;quizResults.replaceChildren();const p=document.createElement('p');p.className='quiz-result__head';p.textContent=`Você escolheu explorar ${goals[goal]}. Conheça algumas opções do catálogo e confirme o que faz sentido para você com a Emilly.`;quizResults.append(p);PROCEDURES.filter(s=>goal==='todos'||s.category===goal).slice(0,3).forEach(s=>{const d=document.createElement('div');d.className='quiz-result__item';const name=document.createElement('span');name.textContent=s.name;const a=document.createElement('a');a.href='#agendar';a.textContent='Quero saber mais ↗';a.addEventListener('click',()=>{$('#booking-service').value=s.name});d.append(name,a);quizResults.append(d)});const reset=document.createElement('button');reset.type='button';reset.className='quiz-reset';reset.textContent='← Explorar outro cuidado';reset.addEventListener('click',resetQuiz);quizResults.append(reset)}
function resetQuiz(){quizHeading.textContent='O que você gostaria de cuidar hoje?';stage.textContent='01 / 02';quizOptions.hidden=false;quizResults.hidden=true}
$$('[data-quiz-goal]').forEach(b=>b.addEventListener('click',()=>showQuizResults(b.dataset.quizGoal)));

// Booking preferences -> WhatsApp (never claim slot is available; no backend data storage)
const form=$('#booking-form'),serviceSelect=$('#booking-service'),day=$('#booking-day');
if(serviceSelect)PROCEDURES.forEach(p=>{const option=document.createElement('option');option.value=p.name;option.textContent=p.name;serviceSelect.append(option)});
const localDate=()=>{const now=new Date(),y=now.getFullYear(),m=String(now.getMonth()+1).padStart(2,'0'),d=String(now.getDate()).padStart(2,'0');return `${y}-${m}-${d}`};
if(day)day.min=localDate();
form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const service=serviceSelect.value,dayValue=day.value,period=$('#booking-period').value,notes=$('#booking-notes').value.trim();if(dayValue<localDate()){day.setCustomValidity('Selecione uma data a partir de hoje.');day.reportValidity();day.setCustomValidity('');return}const [y,m,d]=dayValue.split('-');const message=[`Olá, Emilly! Vim pelo seu site oficial e gostaria de solicitar um agendamento.`,`✨ Procedimento: ${service}`,`📅 Dia de preferência: ${d}/${m}/${y}`,`🕒 Período: ${period}`,notes?`📝 Observação: ${notes}`:null,`Você pode confirmar os valores e a disponibilidade?`].filter(Boolean).join('\n');const url=whatsapp(message);const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.click()});

// No tracking endpoint, cookies, analytics beacons, or conversations recorded in this version.
$('#year').textContent=String(new Date().getFullYear());

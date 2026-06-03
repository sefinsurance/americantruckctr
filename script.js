const menuButton=document.querySelector('.nav-toggle');const nav=document.querySelector('.nav');if(menuButton&&nav){menuButton.addEventListener('click',()=>{const o=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(o));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));}

// ---- Service tabs (bilingual) ----
const data={
  repair:{badge:{en:'Mechanical Repair',es:'Reparación Mecánica'},title:{en:'Heavy-duty and light-duty truck repair.',es:'Reparación de camiones pesados y ligeros.'},text:{en:'As a NAPA TruckCare shop, our ASE-certified technicians diagnose and repair engines, transmissions, brakes, suspension, electrical, and A/C on trucks of every size — backed by over 75 years of combined experience.',es:'Como taller NAPA TruckCare, nuestros técnicos certificados ASE diagnostican y reparan motores, transmisiones, frenos, suspensión, sistema eléctrico y aire acondicionado en camiones de todo tamaño — con más de 75 años de experiencia combinada.'},bullets:{en:['Engine diagnostics, engine and transmission repair','Preventative maintenance, DOT inspections, tires and alignment','Welding, paint and body, and collision work'],es:['Diagnóstico de motor, reparación de motor y transmisión','Mantenimiento preventivo, inspecciones DOT, llantas y alineación','Soldadura, pintura y carrocería, y trabajo de colisión']},image:'assets/interior-blue-bay.png?v=9',alt:{en:'ASE-certified technician servicing a blue semi truck inside a repair bay',es:'Técnico certificado ASE dando servicio a un camión azul en una bahía de reparación'}},
  body:{badge:{en:'Body & Collision',es:'Carrocería y Colisión'},title:{en:'Collision and fiberglass body repair done right.',es:'Reparación de colisión y fibra de vidrio bien hecha.'},text:{en:'Our body specialist handles all collision and body work, including fiberglass body panel repair, so your truck looks as good as it runs.',es:'Nuestro especialista en carrocería se encarga de todo el trabajo de colisión y carrocería, incluida la reparación de paneles de fibra de vidrio, para que su camión se vea tan bien como funciona.'},bullets:{en:['Collision repair for heavy-duty and light-duty trucks','Fiberglass body panel repair and replacement','Careful work that restores trucks back to service'],es:['Reparación de colisión para camiones pesados y ligeros','Reparación y reemplazo de paneles de fibra de vidrio','Trabajo cuidadoso que devuelve los camiones al servicio']},image:'assets/interior-gray-bay.png?v=9',alt:{en:'Truck being serviced for body and collision work inside a professional garage',es:'Camión recibiendo servicio de carrocería y colisión en un taller profesional'}},
  towing:{badge:{en:'Towing & Roadside',es:'Grúa y Asistencia'},title:{en:'Roadside repair and towing when you need it.',es:'Reparación en carretera y grúa cuando la necesita.'},text:{en:'Stuck on the side of the road? We offer roadside repair within a 20-mile radius during business hours, plus towing service to get your down truck into our shop and back to work.',es:'¿Varado a un lado de la carretera? Ofrecemos reparación en carretera dentro de un radio de 20 millas durante el horario de atención, además de servicio de grúa para llevar su camión averiado a nuestro taller y de vuelta al trabajo.'},bullets:{en:['Roadside repair within a 20-mile radius during business hours','Towing service for heavy-duty and light-duty trucks','Direct line to the shop for fast repairs once you arrive'],es:['Reparación en carretera dentro de un radio de 20 millas durante el horario','Servicio de grúa para camiones pesados y ligeros','Línea directa con el taller para reparaciones rápidas al llegar']},image:'assets/freight-loading.png?v=9',alt:{en:'Commercial truck being loaded and serviced',es:'Camión comercial siendo cargado y atendido'}}
};
const tabs=document.querySelectorAll('.service-tab'),badge=document.getElementById('serviceBadge'),title=document.getElementById('serviceTitle'),text=document.getElementById('serviceText'),list=document.getElementById('serviceList'),img=document.getElementById('serviceImage');
let currentTab='repair';
window.renderService=function(){const lang=window.__atcLang||'en';const s=data[currentTab];if(!s)return;badge.textContent=s.badge[lang];title.textContent=s.title[lang];text.textContent=s.text[lang];img.src=s.image;img.alt=s.alt[lang];list.innerHTML='';s.bullets[lang].forEach(b=>{const li=document.createElement('li');li.textContent=b;list.appendChild(li);});tabs.forEach(t=>{const a=t.dataset.service===currentTab;t.classList.toggle('active',a);t.setAttribute('aria-selected',String(a));});};
tabs.forEach(t=>t.addEventListener('click',()=>{currentTab=t.dataset.service;window.renderService();}));

// ---- Bilingual EN/ES toggle ----
(function(){
  var btn=document.getElementById('langToggle');
  function applyLang(lang){
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-es]').forEach(function(el){
      // Safety: never overwrite an element that wraps a form control — an
      // innerHTML swap would destroy the input/select/textarea. (data-es should
      // sit on a leaf text element / span; this guards against regressions.)
      if(el.querySelector&&el.querySelector('input,select,textarea,form'))return;
      if(el.__en===undefined)el.__en=el.innerHTML;
      el.innerHTML=(lang==='es')?el.getAttribute('data-es'):el.__en;
    });
    document.querySelectorAll('[data-es-ph]').forEach(function(el){
      if(el.__ph===undefined)el.__ph=el.getAttribute('placeholder')||'';
      el.setAttribute('placeholder',(lang==='es')?el.getAttribute('data-es-ph'):el.__ph);
    });
    if(btn){btn.textContent=(lang==='es')?'EN':'ES';btn.setAttribute('aria-label',(lang==='es')?'Switch to English':'Cambiar a Español');}
    window.__atcLang=lang;
    try{localStorage.setItem('atc_lang',lang);}catch(_){}
    if(typeof window.renderService==='function')window.renderService();
  }
  var saved=null;try{saved=localStorage.getItem('atc_lang');}catch(_){}
  if(saved!=='es'&&saved!=='en'){saved=((navigator.language||'').toLowerCase().indexOf('es')===0)?'es':'en';}
  if(btn)btn.addEventListener('click',function(){applyLang((window.__atcLang==='es')?'en':'es');});
  applyLang(saved);
})();

// ---- Reveal on scroll ----
const reveal=document.querySelectorAll('.reveal');const ro=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');ro.unobserve(x.target);}})},{threshold:.14});reveal.forEach(x=>ro.observe(x));

// ---- Counters ----
const counters=document.querySelectorAll('[data-counter]');const co=new IntersectionObserver(e=>{e.forEach(x=>{if(!x.isIntersecting)return;const el=x.target,target=Number(el.dataset.counter||0);let cur=0;const step=Math.max(1,Math.ceil(target/24));const tick=()=>{cur+=step;if(cur>=target){el.textContent=target}else{el.textContent=cur;requestAnimationFrame(tick)}};tick();co.unobserve(el);})},{threshold:.5});counters.forEach(c=>co.observe(c));

// ---- Lightbox ----
const lightbox=document.getElementById('lightbox'),lbImg=document.getElementById('lightboxImage'),lbCap=document.getElementById('lightboxCaption'),lbClose=document.querySelector('.lightbox-close');function closeLb(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lbImg.src='';}if(lightbox&&lbImg&&lbCap&&lbClose){document.querySelectorAll('[data-lightbox]').forEach(b=>b.addEventListener('click',()=>{lbImg.src=b.dataset.lightbox;lbCap.textContent=b.dataset.caption||'';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');}));lbClose.addEventListener('click',closeLb);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLb();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLb();});}

// ---- Contact form (bilingual confirmation) ----
const form=document.querySelector('.contact-form');if(form){form.addEventListener('submit',e=>{e.preventDefault();const es=(window.__atcLang==='es');alert(es?'¡Gracias! Recibimos su solicitud. Para una respuesta más rápida, llámenos al 239-337-4360.':'Thanks! Your request has been received. For the fastest response, call us at 239-337-4360.');form.reset();});}

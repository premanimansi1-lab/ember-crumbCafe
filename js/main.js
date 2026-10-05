document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.querySelector('.nav'), progress=document.querySelector('.progress'), top=document.querySelector('.to-top');
 const loader=document.querySelector('.loader');
 if(loader&&window.gsap) gsap.to(loader,{opacity:0,duration:.55,delay:.35,onComplete:()=>loader.remove()});
 const cursor=document.querySelector('.cursor');
 window.addEventListener('pointermove',e=>{ if(cursor){gsap.to(cursor,{x:e.clientX,y:e.clientY,duration:.15});} });
 document.querySelectorAll('a,button,.food,.gitem,.photo').forEach(el=>{el.addEventListener('mouseenter',()=>cursor?.classList.add('active'));el.addEventListener('mouseleave',()=>cursor?.classList.remove('active'))});
 window.addEventListener('scroll',()=>{
   nav?.classList.toggle('scrolled',scrollY>20);
   if(progress) progress.style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%';
   top?.classList.toggle('show',scrollY>600);
 });
 const mobileMenu=document.querySelector('.mobile');
 const hamburger=document.querySelector('.hamb');
 const mobileClose=document.querySelector('.mobile-close');
 const setMobileMenu=(open)=>{
   mobileMenu?.classList.toggle('open',open);
   mobileMenu?.setAttribute('aria-hidden',String(!open));
   document.body.classList.toggle('menu-open',open);
   if(hamburger) hamburger.setAttribute('aria-expanded',String(open));
 };
 hamburger?.setAttribute('aria-expanded','false');
 hamburger?.addEventListener('click',()=>setMobileMenu(true));
 mobileClose?.addEventListener('click',()=>setMobileMenu(false));
 document.querySelectorAll('.mobile a').forEach(a=>a.addEventListener('click',()=>setMobileMenu(false)));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')setMobileMenu(false)});
 top?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
 if(!window.gsap)return;
 if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
 gsap.from('.reveal',{opacity:0,y:45,duration:1,stagger:.12,delay:.35,ease:'power3.out'});
 gsap.utils.toArray('.section .tag,.section h2,.food,.items article,.events article,.gallery .gitem,.storygrid,.contactcard,.form,.pagevisual').forEach((el,i)=>gsap.from(el,{opacity:0,y:38,scale:.98,duration:.8,delay:i%3*.05,ease:'power3.out',scrollTrigger:window.ScrollTrigger?{trigger:el,start:'top 88%',once:true}:undefined}));
 document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.14,y:(e.clientY-r.top-r.height/2)*.14,duration:.25});});el.addEventListener('mouseleave',()=>gsap.to(el,{x:0,y:0,duration:.45,ease:'elastic.out(1,.5)'}));});
 document.querySelectorAll('[data-tilt]').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to(el,{rotateY:x*7,rotateX:-y*7,transformPerspective:900,duration:.35});});el.addEventListener('mouseleave',()=>gsap.to(el,{rotateX:0,rotateY:0,duration:.5}));});
 const tableTrack=document.querySelector('#tableTrack'); const tablePrev=document.querySelector('#tablePrev'); const tableNext=document.querySelector('#tableNext'); const tableCurrent=document.querySelector('#tableCurrent'); const tableSlides=tableTrack?Array.from(tableTrack.querySelectorAll('.carousel-slide')):[]; if(tableTrack&&tableSlides.length){ let tableIndex=0; const updateTable=(nextIndex,instant=false)=>{tableIndex=(nextIndex+tableSlides.length)%tableSlides.length; tableTrack.style.transition=instant?'none':'transform .72s cubic-bezier(.22,.8,.2,1)'; tableTrack.style.transform=`translate3d(-${tableIndex*100}%,0,0)`; if(tableCurrent)tableCurrent.textContent=String(tableIndex+1).padStart(2,'0');}; tablePrev?.addEventListener('click',()=>updateTable(tableIndex-1)); tableNext?.addEventListener('click',()=>updateTable(tableIndex+1)); let startX=0,dragging=false; tableTrack.addEventListener('pointerdown',e=>{startX=e.clientX;dragging=true;tableTrack.setPointerCapture?.(e.pointerId);tableTrack.style.cursor='grabbing';}); tableTrack.addEventListener('pointerup',e=>{if(!dragging)return; const dx=e.clientX-startX; dragging=false;tableTrack.style.cursor=''; if(Math.abs(dx)>50)updateTable(tableIndex+(dx<0?1:-1));}); tableTrack.addEventListener('pointercancel',()=>{dragging=false;tableTrack.style.cursor='';}); tableTrack.addEventListener('pointerleave',()=>{dragging=false;tableTrack.style.cursor='';}); window.addEventListener('keydown',e=>{if(e.key==='ArrowRight')updateTable(tableIndex+1); if(e.key==='ArrowLeft')updateTable(tableIndex-1);}); updateTable(0,true); }
 document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');const c=t.dataset.cat;document.querySelectorAll('.items article').forEach(a=>{const show=c==='all'||a.dataset.cat===c;gsap.to(a,{opacity:show?1:0,duration:.2,onComplete:()=>a.style.display=show?'block':'none'});});}));
 document.querySelectorAll('.parallax-img').forEach(img=>gsap.to(img,{yPercent:10,ease:'none',scrollTrigger:window.ScrollTrigger?{trigger:img,start:'top bottom',end:'bottom top',scrub:true}:undefined}));
 const modal=document.querySelector('.modal-view'); if(modal){document.querySelectorAll('.gitem img').forEach(img=>img.addEventListener('click',()=>{modal.querySelector('img').src=img.src;modal.classList.add('open')}));modal.addEventListener('click',e=>{if(e.target===modal||e.target.classList.contains('modal-close'))modal.classList.remove('open')});}
});

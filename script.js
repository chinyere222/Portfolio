(function(){
const PAGES=[['index','This is Seyi','main'],['world','My World','main'],['profile','My Profile','main'],['services','Services','main'],['graphics','Graphic Library','works'],['oncamera','On-Camera Presentation','works'],['strategy','Content Strategy','works'],['writing','Content Writing','works'],['social','Social Media','works'],['contact','Contact','contact']];
const link=p=>`<a href="#${p[0]}" data-r="${p[0]}">${p[1]}</a>`;
const grp=(id,t,items)=>`<div class="grp"><button class="gh" aria-expanded="false">${t}</button><ul><div>${items.map(link).join('')}</div></ul></div>`;
const side=document.createElement('aside');side.className='side';
side.innerHTML=`<a class="brand" href="#index"><b>Seyi</b><span>Media &amp; communications</span></a><nav>${grp('main','Main menu',PAGES.filter(p=>p[2]==='main'))}${grp('works','My works',PAGES.filter(p=>p[2]==='works'))}<a href="#contact" data-r="contact">Contact</a></nav><div><a class="btn" href="#contact" style="width:100%;justify-content:center">Let's connect</a></div>`;
document.body.prepend(side);
const bar=document.createElement('div');bar.className='bar';bar.innerHTML='Seyi<button aria-label="Open menu">Menu</button>';document.body.prepend(bar);
bar.querySelector('button').onclick=()=>document.body.classList.toggle('menu');
side.querySelectorAll('.gh').forEach(b=>b.onclick=()=>{const g=b.parentNode;g.classList.toggle('open');b.setAttribute('aria-expanded',g.classList.contains('open'))});
const arrow='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
PAGES.forEach((p,i)=>{if(['index','contact','world'].includes(p[0]))return;const w=document.querySelector('#pg-'+p[0]+' .wrap'),pv=PAGES[i-1],nx=PAGES[i+1];
w.insertAdjacentHTML('beforeend',`<nav class="pn" aria-label="Page navigation"><a href="#${pv[0]}">← ${pv[1]}</a>${nx?`<a href="#${nx[0]}">${nx[1]} ${arrow}</a>`:'<span></span>'}</nav>`)});
function loadVid(v){if(v.dataset.ready)return;v.dataset.ready='1';v.src=v.dataset.src;v.load()}
function tryPlay(v){const p=v.play();if(p&&p.then)p.then(()=>v.parentNode.classList.remove('needs')).catch(()=>v.parentNode.classList.add('needs'))}
function playVideos(){document.querySelectorAll('video').forEach(v=>{if(v.closest('.pg').classList.contains('on')){loadVid(v);tryPlay(v)}else v.pause()})}
function show(n){if(!PAGES.some(p=>p[0]===n))n='index';
document.querySelectorAll('.pg').forEach(p=>p.classList.toggle('on',p.id==='pg-'+n));
side.querySelectorAll('[data-r]').forEach(a=>a.classList.toggle('on',a.dataset.r===n));
side.querySelectorAll('.grp').forEach(g=>{if(g.querySelector('.on')){g.classList.add('open');g.querySelector('.gh').setAttribute('aria-expanded','true')}});
document.title=PAGES.find(p=>p[0]===n)[1]+' · Seyi';playVideos();window.scrollTo(0,0)}
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;e.preventDefault();document.body.classList.remove('menu');const n=a.getAttribute('href').slice(1);show(n);try{history.replaceState(null,'','#'+n)}catch(_){}});
addEventListener('hashchange',()=>show(location.hash.slice(1)||'index'));
show(location.hash.slice(1)||'index');
const lb=document.createElement('div');lb.className='lb';lb.innerHTML='<img alt=""><button>Close</button>';document.body.append(lb);const lbi=lb.querySelector('img');
document.addEventListener('click',e=>{const z=e.target.closest('.zoomable');if(z){const i=z.querySelector('img');lbi.src=i.src;lbi.alt=i.alt;lb.classList.add('on');return}if(lb.classList.contains('on'))lb.classList.remove('on')});
addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on')});
document.querySelectorAll('.zoomable').forEach(z=>{z.tabIndex=0;z.setAttribute('role','button');z.onkeydown=e=>{if(e.key==='Enter')z.click()}});
document.querySelectorAll('.tap').forEach(t=>t.onclick=()=>{const v=t.parentNode.querySelector('video');loadVid(v);v.muted=true;v.play().then(()=>t.parentNode.classList.remove('needs')).catch(()=>{})});
document.querySelectorAll('video').forEach(v=>v.addEventListener('canplay',()=>{if(v.closest('.pg').classList.contains('on')&&v.paused)tryPlay(v)}));
document.querySelectorAll('.mute').forEach(b=>b.onclick=()=>{const v=b.parentNode.querySelector('video');v.muted=!v.muted;b.classList.toggle('snd',!v.muted);b.setAttribute('aria-label',v.muted?'Turn sound on':'Turn sound off');
if(!v.muted)document.querySelectorAll('video').forEach(o=>{if(o!==v){o.muted=true;const m=o.parentNode.querySelector('.mute');m&&m.classList.remove('snd')}})});
document.querySelectorAll('[data-copy]').forEach(btn=>btn.onclick=()=>{try{navigator.clipboard.writeText(btn.dataset.copy)}catch(_){}const o=btn.textContent;btn.textContent='Copied';setTimeout(()=>btn.textContent=o,1400)});
})();
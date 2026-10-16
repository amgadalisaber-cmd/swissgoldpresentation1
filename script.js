(()=>{
const stage=document.getElementById('stage'),slides=[...document.querySelectorAll('.slide')];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let cur=0,step=0;
// number every slide
slides.forEach((s,i)=>{const n=document.createElement('div');n.className='num';n.textContent=(i+1)+' / '+slides.length;s.appendChild(n);});
function fit(){const s=Math.min(innerWidth/1600,innerHeight/900)*0.96;stage.style.transform='scale('+s+')';fx.width=1600;fx.height=900;}
addEventListener('resize',fit);
const steps=s=>{const g=[];s.querySelectorAll('.step').forEach(e=>{if(e.hasAttribute('data-with')&&g.length)g[g.length-1].push(e);else g.push([e]);});return g;};
function countUp(el){const to=+el.dataset.to;if(reduce){el.textContent=to.toLocaleString('en-US');return;}
  const t0=performance.now(),dur=1100;(function f(t){const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e).toLocaleString('en-US');if(p<1)requestAnimationFrame(f);})(t0);}
function reveal(el){el.classList.add('shown');el.querySelectorAll('.count').forEach(countUp);if(el.classList.contains('count'))countUp(el);
  if(el.hasAttribute('data-burst'))burst();
  const row=el.closest('[data-bar]');if(row)row.classList.add('grown');}
function show(i,fromBack){
  slides[cur].classList.remove('on');cur=Math.max(0,Math.min(slides.length-1,i));const s=slides[cur];
  s.querySelectorAll('.step').forEach(e=>e.classList.remove('shown'));s.querySelectorAll('[data-bar]').forEach(r=>r.classList.remove('grown'));
  step=0;s.classList.add('on');
  if(fromBack){steps(s).flat().forEach(reveal);step=steps(s).length;}
  if(s.hasAttribute('data-bars'))s.querySelectorAll('[data-bar]:not(.step)').forEach((r,k)=>setTimeout(()=>r.classList.add('grown'),300+k*180));
  if(s.hasAttribute('data-burst-on-enter'))setTimeout(burst,500);
  document.getElementById('prog').style.width=((cur+1)/slides.length*100)+'%';
  try{history.replaceState(null,'','#s'+(cur+1));}catch(e){}
}
function next(){const st=steps(slides[cur]);if(step<st.length){st[step++].forEach(reveal);}else if(cur<slides.length-1)show(cur+1);}
function prev(){if(cur>0)show(cur-1,true);}
addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' ','Enter'].includes(e.key)){e.preventDefault();next();}
  else if(['ArrowLeft','PageUp','Backspace'].includes(e.key)){e.preventDefault();prev();}
  else if(e.key==='f'||e.key==='F')full();else if(e.key==='Home')show(0);else if(e.key==='End')show(slides.length-1,true);});
stage.addEventListener('click',e=>{if(e.target.closest('a'))return;next();});
document.getElementById('next').onclick=next;document.getElementById('prev').onclick=prev;
function full(){const d=document.documentElement;try{(document.fullscreenElement?document.exitFullscreen():d.requestFullscreen()).catch(()=>{});}catch(e){}}
document.getElementById('fs').onclick=full;
// coin confetti
const fx=document.getElementById('fx'),cx=fx.getContext('2d');let parts=[],raf=0;
const cols=['#E3A72F','#F2C766','#B97F12','#FF6B57','#2F9BEA'];
function burst(){if(reduce)return;for(let i=0;i<90;i++){const a=Math.random()*Math.PI*2,v=6+Math.random()*10;
  parts.push({x:800,y:470,vx:Math.cos(a)*v,vy:Math.sin(a)*v-6,r:6+Math.random()*10,c:cols[i%cols.length],life:90+Math.random()*40,rot:Math.random()*6});}
  if(!raf)raf=requestAnimationFrame(tick);}
function tick(){cx.clearRect(0,0,1600,900);parts=parts.filter(p=>p.life-->0);
  parts.forEach(p=>{p.vy+=.35;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.rot+=.15;cx.save();cx.translate(p.x,p.y);cx.scale(Math.abs(Math.cos(p.rot)),1);cx.beginPath();cx.arc(0,0,p.r,0,7);cx.fillStyle=p.c;cx.globalAlpha=Math.min(1,p.life/30);cx.fill();cx.restore();});
  raf=parts.length?requestAnimationFrame(tick):0;}
fit();const h=+(location.hash.match(/^#s(\d+)$/)||[])[1];slides[0].classList.add('on');show(h?h-1:0);
})();

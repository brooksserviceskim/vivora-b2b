/* ============================================================
   VIVORA B2B — index page engine
   (i18n handled by assets/js/i18n.js · data by product-data.js)
   ============================================================ */
(function(){
'use strict';
const P = window.VIVORA_PRODUCTS;

/* ---------------- product cards (front cut + motion, links to detail) ---------------- */
function card(p){
 const tags=p.ingredients.slice(0,4).map(x=>`<span>${x.n.split(/[(·]/)[0].trim()}</span>`).join("");
 const spec=p.vol+(p.spf?` · ${p.spf}`:"");
 return `<a class="prod-card reveal" href="product.html?id=${p.slug}">
   <div class="pcard-media">
     <span class="pcard-line">${p.line}</span>
     <img src="${p.front}" alt="${p.name}" loading="lazy">
     <span class="pcard-shine"></span>
   </div>
   <div class="prod-body">
     <h3>${p.name}</h3>
     <div class="prod-vol">${spec}</div>
     <p data-pdesc="${p.descKey}"></p>
     <div class="prod-ingr">${tags}</div>
     <span class="pcard-go" aria-hidden="true">→</span>
   </div>
 </a>`;
}
function renderProducts(){
 const g=document.getElementById("grid-geneon"), j=document.getElementById("grid-joseon");
 if(g) g.innerHTML=P.geneon.map(card).join("");
 if(j) j.innerHTML=P.joseon.map(card).join("");
}

/* ---------------- texture (gold ampoule): video if present, else image cycle ---------------- */
function initTexture(){
 const wrap=document.getElementById("textureMedia"); if(!wrap)return;
 const ph=document.getElementById("texturePh");
 const vid=document.createElement("video");
 vid.src="assets/img/media/texture-gold.mp4";
 vid.autoplay=vid.loop=vid.muted=vid.playsInline=true; vid.setAttribute("playsinline","");
 vid.oncanplay=()=>{ if(ph)ph.style.display="none"; vid.classList.add("show"); };
 vid.onerror=()=>{ vid.remove(); textureImages(); };
 wrap.appendChild(vid);
 setTimeout(()=>{ if(vid.isConnected && vid.readyState<2 && !vid.classList.contains("show")) textureImages(); },1400);
}
function textureImages(){
 const wrap=document.getElementById("textureMedia"); const ph=document.getElementById("texturePh");
 if(wrap.dataset.imgInit)return; wrap.dataset.imgInit="1";
 const srcs=["tex-01","tex-02","tex-03"].map(n=>`assets/img/texture/joseon-gold-ampoule/${n}.png`);
 let loaded=0;
 const imgs=srcs.map((s,i)=>{const im=document.createElement("img");im.src=s;im.alt="Gold Capsule texture";
   if(i===0)im.classList.add("show");
   im.onload=()=>{loaded++;if(loaded===1&&ph)ph.style.display="none";};
   im.onerror=()=>im.remove(); wrap.appendChild(im);return im;});
 let c=0; setInterval(()=>{const v=imgs.filter(i=>i.isConnected);if(v.length<2)return;
   v[c%v.length].classList.remove("show");c++;v[c%v.length].classList.add("show");},2600);
}

/* ---------------- hero particles ---------------- */
function initParticles(){
 const cv=document.getElementById("particles"); if(!cv)return;
 const ctx=cv.getContext("2d"); let w,h,parts=[];
 const resize=()=>{w=cv.width=cv.offsetWidth;h=cv.height=cv.offsetHeight;
   parts=Array.from({length:Math.min(70,Math.floor(w/22))},()=>({x:Math.random()*w,y:Math.random()*h,
     r:Math.random()*2+.4,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,a:Math.random()*.5+.2}));};
 resize(); window.addEventListener("resize",resize);
 (function loop(){ctx.clearRect(0,0,w,h);parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;
   if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
   ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fillStyle=`rgba(255,255,255,${p.a})`;ctx.fill();});
   requestAnimationFrame(loop);})();
}

/* ---------------- animated globe + markets ---------------- */
const MARKETS=["Austria","Bulgaria","Serbia","Hungary","Italy","France","Mexico","Middle East","Thailand","Vietnam","Japan","United States","Canada"];
function initGlobe(){
 const wrap=document.getElementById("mapWrap"); if(!wrap)return;
 const pins=[[250,150],[300,130],[330,160],[420,140],[470,170],[560,150],[620,200],[180,220],[150,180],[600,250],[680,160],[520,240],[400,210]];
 const dots=pins.map((p,i)=>`<circle class="pin p${(i%5)+1}" cx="${p[0]}" cy="${p[1]}" r="3"></circle><circle class="pin-core" cx="${p[0]}" cy="${p[1]}" r="2.4"></circle>`).join("");
 const arcs=pins.map(p=>`<path d="M400,300 Q${(400+p[0])/2},${Math.min(p[1],300)-70} ${p[0]},${p[1]}" fill="none" stroke="rgba(230,211,163,.28)" stroke-width="1"/>`).join("");
 wrap.innerHTML=`<svg class="world" viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
   <defs><radialGradient id="g" cx="50%" cy="45%"><stop offset="0%" stop-color="rgba(155,138,216,.18)"/><stop offset="100%" stop-color="rgba(28,20,68,0)"/></radialGradient></defs>
   <ellipse cx="400" cy="210" rx="330" ry="150" fill="url(#g)"/>
   <g stroke="rgba(255,255,255,.12)" fill="none" stroke-width="1">
     <ellipse cx="400" cy="210" rx="330" ry="150"/><ellipse cx="400" cy="210" rx="330" ry="100"/><ellipse cx="400" cy="210" rx="330" ry="50"/>
     <line x1="70" y1="210" x2="730" y2="210"/>
     <path d="M400,60 Q250,210 400,360 Q550,210 400,60"/><path d="M400,60 Q320,210 400,360 Q480,210 400,60"/><path d="M400,60 L400,360"/>
   </g>
   <circle cx="400" cy="300" r="4" fill="#fff"/>
   <text x="400" y="320" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="11">SEOUL · KOREA</text>
   ${arcs}${dots}</svg>`;
 document.getElementById("markets").innerHTML=MARKETS.map(m=>`<span class="market">${m}</span>`).join("");
}

/* ---------------- charts ---------------- */
let charts=[];
function donut(id,labels,data){
 const cv=document.getElementById(id); if(!cv||!window.Chart)return null;
 return new Chart(cv,{type:"doughnut",
  data:{labels,datasets:[{data,backgroundColor:["#b9a9e0","#c5a253","#6b5bb0","#3a2c7e","#9fd6cf"],borderColor:"rgba(28,20,68,1)",borderWidth:2}]},
  options:{responsive:true,maintainAspectRatio:true,cutout:"62%",
   plugins:{legend:{position:"bottom",labels:{color:"#cabfe8",font:{family:"Inter",size:12},padding:14,boxWidth:12}}}}});
}
function initCharts(){
 const t=window.I18N.t;
 charts.forEach(c=>c&&c.destroy()); charts=[];
 charts.push(donut("chartGlobal",[t("ch_dist"),t("ch_b2b"),t("ch_retail"),t("ch_other")],[50,40,5,5]));
 charts.push(donut("chartTotal",[t("ch_dept"),t("ch_export"),t("ch_online"),t("ch_other")],[45,40,10,5]));
}

/* ---------------- chrome / nav / reveal ---------------- */
function initChrome(){
 const hdr=document.getElementById("hdr");
 const onScroll=()=>hdr.classList.toggle("scrolled",window.scrollY>60);
 onScroll(); window.addEventListener("scroll",onScroll,{passive:true});
 const mnav=document.getElementById("mnav");
 const burger=document.getElementById("burger");
 if(burger)burger.addEventListener("click",()=>mnav.classList.add("open"));
 const mc=document.getElementById("mnavClose"); if(mc)mc.addEventListener("click",()=>mnav.classList.remove("open"));
 if(mnav)mnav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mnav.classList.remove("open")));
 const mq=document.getElementById("marquee");
 if(mq){const words=["Fermented RG3","K-Beauty Heritage","Skin Science","FDA · CPNP","Global Partnership","Balanced Skincare"];
   const block=`<span>${words.join('</span><span>')}</span>`; mq.innerHTML=block+block;}
}
function initReveal(){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in");}),
   {threshold:.12,rootMargin:"0px 0px -6% 0px"});
 document.querySelectorAll(".reveal,.flow-step").forEach(el=>io.observe(el));
}

/* ---------------- inquiry form -> mailto ---------------- */
function initForm(){
 const f=document.getElementById("inquiryForm"); if(!f)return;
 f.addEventListener("submit",e=>{e.preventDefault();
   const g=n=>(f.elements[n]&&f.elements[n].value||"").trim();
   const subj=`[VIVORA Buyer Inquiry] ${g("company")} — ${g("country")}`;
   const body=`Company: ${g("company")}\nContact: ${g("name")}\nEmail: ${g("email")}\nCountry/Region: ${g("country")}\nChannel: ${g("channel")}\nTarget MOQ/Volume: ${g("moq")}\n\nMessage:\n${g("message")}`;
   window.location.href=`mailto:vivoralabs@naver.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;});
}

/* ---------------- boot ---------------- */
document.addEventListener("DOMContentLoaded",()=>{
 renderProducts();
 initTexture(); initParticles(); initGlobe(); initChrome(); initForm();
 initCharts();
 window.I18N.onChange(()=>initCharts());
 window.I18N.init();
 initReveal();
});
})();

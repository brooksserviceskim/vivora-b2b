/* ============================================================
   VIVORA — product detail page renderer
   ============================================================ */
(function(){
'use strict';
const BY = window.VIVORA_PRODUCT_BY_SLUG;
const ALL = [...window.VIVORA_PRODUCTS.geneon, ...window.VIVORA_PRODUCTS.joseon];

function qparam(k){ return new URLSearchParams(location.search).get(k); }
const id = qparam("id");
const p = id && BY[id];

document.addEventListener("DOMContentLoaded",()=>{
 // chrome (burger / mobile nav)
 const mnav=document.getElementById("mnav");
 const burger=document.getElementById("burger");
 if(burger)burger.addEventListener("click",()=>mnav.classList.add("open"));
 const mc=document.getElementById("mnavClose"); if(mc)mc.addEventListener("click",()=>mnav.classList.remove("open"));
 if(mnav)mnav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mnav.classList.remove("open")));

 if(!p){ location.replace("index.html#products"); return; }

 // main stage
 const stage=document.getElementById("pdStage");
 document.getElementById("pdStageTag").textContent=p.line;
 const mainImg=document.createElement("img");
 mainImg.className="show"; mainImg.src=p.front; mainImg.alt=p.name;
 stage.insertBefore(mainImg, stage.querySelector(".pcard-shine"));
 const setMain=(src,thumbEl,allThumbs)=>{
   allThumbs.forEach(x=>x.classList.remove("active")); thumbEl.classList.add("active");
   mainImg.classList.remove("show");
   setTimeout(()=>{mainImg.src=src;mainImg.classList.add("show");},120);
 };
 function fillThumbs(containerId, list){
   const c=document.getElementById(containerId);
   c.innerHTML=list.map((src,i)=>`<div class="pd-thumb${src===p.front?' active':''}" data-src="${src}"><img src="${src}" alt="${p.name} ${i+1}" loading="lazy"></div>`).join("");
   return [...c.querySelectorAll(".pd-thumb")];
 }
 // gather all thumbs across both groups so selection state is shared
 const vesselThumbs=fillThumbs("pdThumbsVessel", p.vessel);
 let boxThumbs=[];
 if(p.box && p.box.length){ boxThumbs=fillThumbs("pdThumbsBox", p.box); }
 else { document.getElementById("pdBoxGroup").style.display="none"; }
 const all=[...vesselThumbs,...boxThumbs];
 all.forEach(th=>th.addEventListener("click",()=>setMain(th.dataset.src,th,all)));

 // zoom hint on stage
 const hint=document.createElement("span");
 hint.className="pd-zoom-hint";
 const ZH={ko:"🔍 클릭하면 확대",ja:"🔍 クリックで拡大",zh:"🔍 点击放大",th:"🔍 คลิกเพื่อซูม"};
 const updateZoomHint=()=>{ hint.textContent=ZH[window.I18N.get()]||"🔍 Click to zoom"; };
 updateZoomHint(); stage.appendChild(hint);

 // ---- Amazon-style lightbox ----
 const gallery=[...p.vessel, ...(p.box||[])];
 buildLightbox(gallery);
 stage.addEventListener("click",()=>openLightbox(Math.max(0,gallery.indexOf(mainImg.getAttribute("src")))));
 window.I18N.onChange(updateZoomHint);

 // info
 document.getElementById("pdLine").textContent=p.line+" Line";
 document.getElementById("pdName").textContent=p.name;
 document.getElementById("pdVol").textContent=p.vol+(p.spf?` · ${p.spf}`:"");
 document.getElementById("pdDesc").setAttribute("data-pdesc",p.descKey);

 // ingredients
 document.getElementById("pdIngr").innerHTML=p.ingredients.map(x=>
   `<li><b>${x.n}</b><span>${x.b}</span></li>`).join("");

 // spec
 const spec=[["detail_vol",p.vol]];
 if(p.spf) spec.push(["detail_spf",p.spf]);
 spec.push(["detail_line",p.line]);
 document.getElementById("pdSpec").innerHTML=spec.map(([k,v])=>
   `<div><b data-i18n="${k}"></b><span>${v}</span></div>`).join("");

 // related
 document.getElementById("pdRelated").innerHTML=ALL.filter(x=>x.slug!==p.slug).slice(0,4).map(x=>
   `<a class="prod-card" href="product.html?id=${x.slug}">
      <div class="pcard-media"><span class="pcard-line">${x.line}</span>
        <img src="${x.front}" alt="${x.name}" loading="lazy">
        <span class="pcard-shine"></span></div>
      <div class="prod-body"><h3 style="font-size:1.02rem">${x.name}</h3>
        <div class="prod-vol">${x.vol}${x.spf?` · ${x.spf}`:""}</div></div>
    </a>`).join("");

 // title (keep product name; don't let i18n overwrite with meta_title)
 document.title=`${p.name} | VIVORA`;

 // i18n (applies data-i18n + data-pdesc). Re-set box placeholder on lang change.
 window.I18N.onChange(()=>{ document.title=`${p.name} | VIVORA`; });
 window.I18N.init();
});

/* ---------------- Amazon-style lightbox ---------------- */
let lbIdx=0, lbList=[], lbEl=null, lbImg=null, lbZoom=false;
function buildLightbox(list){
 lbList=list; if(lbEl) return;
 lbEl=document.createElement("div"); lbEl.className="lightbox";
 lbEl.innerHTML=`
   <button class="lb-close" aria-label="close">×</button>
   <div class="lb-counter"></div>
   <button class="lb-nav lb-prev" aria-label="previous">‹</button>
   <div class="lb-stage"><img class="lb-img" alt=""></div>
   <button class="lb-nav lb-next" aria-label="next">›</button>
   <div class="lb-thumbs"></div>`;
 document.body.appendChild(lbEl);
 lbImg=lbEl.querySelector(".lb-img");
 lbEl.querySelector(".lb-close").addEventListener("click",closeLightbox);
 lbEl.querySelector(".lb-prev").addEventListener("click",e=>{e.stopPropagation();lbShow(lbIdx-1);});
 lbEl.querySelector(".lb-next").addEventListener("click",e=>{e.stopPropagation();lbShow(lbIdx+1);});
 lbEl.addEventListener("click",e=>{ if(e.target===lbEl||e.target.classList.contains("lb-stage")) closeLightbox(); });
 lbImg.addEventListener("click",e=>{e.stopPropagation(); lbToggleZoom(e);});
 lbImg.addEventListener("mousemove",e=>{ if(lbZoom) lbPan(e); });
 document.addEventListener("keydown",e=>{ if(!lbEl||!lbEl.classList.contains("open"))return;
   if(e.key==="Escape")closeLightbox(); else if(e.key==="ArrowLeft")lbShow(lbIdx-1); else if(e.key==="ArrowRight")lbShow(lbIdx+1); });
 const tw=lbEl.querySelector(".lb-thumbs");
 tw.innerHTML=lbList.map((s,i)=>`<img src="${s}" data-i="${i}" alt="">`).join("");
 tw.querySelectorAll("img").forEach(t=>t.addEventListener("click",e=>{e.stopPropagation();lbShow(+t.dataset.i);}));
}
function lbShow(i){ const n=lbList.length; if(!n)return; lbIdx=(i%n+n)%n;
 lbResetZoom(); lbImg.src=lbList[lbIdx];
 lbEl.querySelector(".lb-counter").textContent=`${lbIdx+1} / ${n}`;
 lbEl.querySelectorAll(".lb-thumbs img").forEach((t,j)=>t.classList.toggle("active",j===lbIdx)); }
function openLightbox(i){ lbShow(i||0); lbEl.classList.add("open"); document.body.style.overflow="hidden"; }
function closeLightbox(){ lbEl.classList.remove("open"); document.body.style.overflow=""; lbResetZoom(); }
function lbToggleZoom(e){ lbZoom=!lbZoom; lbImg.classList.toggle("zoom",lbZoom); if(lbZoom) lbPan(e); else lbResetZoom(); }
function lbPan(e){ const r=lbImg.getBoundingClientRect();
 const x=((e.clientX-r.left)/r.width)*100, y=((e.clientY-r.top)/r.height)*100;
 lbImg.style.transformOrigin=`${Math.max(0,Math.min(100,x))}% ${Math.max(0,Math.min(100,y))}%`;
 lbImg.style.transform="scale(2.3)"; }
function lbResetZoom(){ lbZoom=false; if(lbImg){lbImg.classList.remove("zoom");lbImg.style.transform="";lbImg.style.transformOrigin="center";} }
})();

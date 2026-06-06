/* ============================================================
   VIVORA — shared i18n engine (used by index.html & product.html)
   window.I18N : { t, set, get, onChange, init }
   ============================================================ */
window.I18N = (function(){
 const T = window.VIVORA_I18N || {};
 const LANGS = [
  ["en","English"],["ko","한국어"],["zh","中文"],["ja","日本語"],
  ["de","Deutsch"],["fr","Français"],["es","Español"],["it","Italiano"],
  ["pt","Português"],["nl","Nederlands"],["pl","Polski"],["ru","Русский"],
  ["bg","Български"],["sr","Srpski"],["hu","Magyar"],["vi","Tiếng Việt"],["th","ไทย"]
 ];
 let cur="en"; const cbs=[];

 function t(key){
   const d=T[cur]||T.en||{};
   return (key in d)?d[key]:((T.en&&T.en[key])||"");
 }
 function apply(){
   document.documentElement.lang=cur;
   document.querySelectorAll("[data-i18n]").forEach(el=>{const v=t(el.getAttribute("data-i18n"));if(v)el.textContent=v;});
   document.querySelectorAll("[data-i18n-html]").forEach(el=>{const v=t(el.getAttribute("data-i18n-html"));if(v)el.innerHTML=v;});
   document.querySelectorAll("[data-i18n-ph]").forEach(el=>{const v=t(el.getAttribute("data-i18n-ph"));if(v)el.setAttribute("placeholder",v);});
   document.querySelectorAll("[data-pdesc]").forEach(el=>{const v=t(el.getAttribute("data-pdesc"));if(v)el.textContent=v;});
   const lbl=document.getElementById("langLabel"); if(lbl)lbl.textContent=cur.toUpperCase();
   document.querySelectorAll("#langMenu button").forEach(b=>b.classList.toggle("active",b.dataset.lang===cur));
   const mt=t("meta_title"); if(mt&&!document.body.dataset.keepTitle)document.title=mt;
 }
 function set(l){
   cur=T[l]?l:"en";
   try{localStorage.setItem("vivora_lang",cur);}catch(e){}
   apply(); cbs.forEach(f=>{try{f(cur);}catch(e){}});
 }
 function buildMenu(){
   const menu=document.getElementById("langMenu"); if(!menu)return;
   menu.innerHTML=LANGS.map(([c,n])=>`<button data-lang="${c}">${n}</button>`).join("");
   menu.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{set(b.dataset.lang);menu.classList.remove("open");}));
   const btn=document.getElementById("langBtn");
   if(btn)btn.addEventListener("click",e=>{e.stopPropagation();menu.classList.toggle("open");});
   document.addEventListener("click",()=>menu.classList.remove("open"));
 }
 function detect(){
   let l=null;
   const u=new URLSearchParams(location.search).get("lang"); if(u)l=u;
   if(!l){try{l=localStorage.getItem("vivora_lang");}catch(e){}}
   if(!l){const n=(navigator.language||"en").slice(0,2); if(T[n])l=n;}
   return l||"en";
 }
 return {
   t, set, get:()=>cur,
   onChange:f=>cbs.push(f),
   langs:LANGS,
   init(){ buildMenu(); set(detect()); }
 };
})();

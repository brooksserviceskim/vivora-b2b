/* ============================================================
   VIVORA — shared product data (used by index + product page)
   front  : hero/card image (vessel front)
   vessel : product (용기 / pouch) cut images
   box    : 단상자 (unit carton / package) cut images  (empty = no box)
   ingredients: INCI name + short benefit (English / universal)
   descKey: i18n key for the short description
   ============================================================ */
(function(){
function img(slug,name){return `assets/img/products/${slug}/${name}.png`;}
window.VIVORA_PRODUCTS = {
 geneon:[
  {slug:"geneon-mist", line:"Genēon", name:"Genēon RG3 Revive Skin Mist", vol:"100 mL / 3.38 fl.oz", spf:"", descKey:"p_geneon-mist_d",
   front:img("geneon-mist","vessel-front"),
   vessel:["vessel-front","vessel-back"].map(n=>img("geneon-mist",n)),
   box:["box-front","box-side","box-side2","box-back"].map(n=>img("geneon-mist",n)),
   ingredients:[
    {n:"Niacinamide",b:"Brightening & even tone"},
    {n:"PDRN (Sodium DNA)",b:"Conditioning & elasticity"},
    {n:"Adenosine",b:"Wrinkle care"},
    {n:"Multi-Peptide Complex",b:"Firming support"},
    {n:"Glycerin",b:"Hydration & moisture retention"},
    {n:"Trehalose",b:"Moisture protection"}]},
  {slug:"geneon-ampoule", line:"Genēon", name:"Genēon RG3 Revive Ampoule", vol:"30 mL / 1.01 fl.oz", spf:"", descKey:"p_geneon-ampoule_d",
   front:img("geneon-ampoule","vessel-front"),
   vessel:["vessel-front","vessel-back"].map(n=>img("geneon-ampoule",n)),
   box:["box-front","box-side","box-side2","box-back"].map(n=>img("geneon-ampoule",n)),
   ingredients:[
    {n:"Fermented RG3 (Ginsenoside RG3)",b:"Vitality & antioxidant support"},
    {n:"PDRN (Sodium DNA)",b:"Conditioning & elasticity"},
    {n:"Multi-Peptide Complex",b:"Firming & smoothing"},
    {n:"Niacinamide",b:"Brightening & even tone"},
    {n:"Adenosine",b:"Wrinkle care"}]},
  {slug:"geneon-cream", line:"Genēon", name:"Genēon RG3 Revive Cream", vol:"100 mL / 3.38 fl.oz", spf:"", descKey:"p_geneon-cream_d",
   front:img("geneon-cream","vessel-front"),
   vessel:["vessel-front","vessel-back"].map(n=>img("geneon-cream",n)),
   box:["box-front","box-side","box-side2","box-back"].map(n=>img("geneon-cream",n)),
   ingredients:[
    {n:"Fermented RG3 (Ginsenoside RG3)",b:"Vitality & antioxidant support"},
    {n:"PDRN (Sodium DNA)",b:"Conditioning & elasticity"},
    {n:"Multi-Peptide Complex",b:"Firming & smoothing"},
    {n:"Niacinamide",b:"Brightening & even tone"},
    {n:"Sunflower Seed Oil",b:"Nourishing & barrier support"},
    {n:"Squalane",b:"Moisturizing & softening"}]}
 ],
 joseon:[
  {slug:"joseon-sunscreen-scholar", line:"Joseon", name:"Joseon RG3 Revive Sunscreen — Scholar", vol:"50 mL / 1.69 fl.oz", spf:"SPF50+ / PA+++", descKey:"p_joseon-sunscreen-scholar_d",
   front:img("joseon-sunscreen-scholar","vessel-front"),
   vessel:["vessel-front","vessel-back"].map(n=>img("joseon-sunscreen-scholar",n)),
   box:["box-front","box-side","box-side2","box-back"].map(n=>img("joseon-sunscreen-scholar",n)),
   ingredients:[
    {n:"Hybrid UV Filter System",b:"Broad-spectrum UVA & UVB"},
    {n:"Fermented RG3 (Ginsenoside RG3)",b:"Vitality & antioxidant support"},
    {n:"Ceramide NP",b:"Barrier support & moisture"},
    {n:"Aloe Vera Extract",b:"Soothing & hydrating"},
    {n:"Glycerin",b:"Hydration & moisture retention"},
    {n:"Plant-Derived Oils",b:"Nourishing & conditioning"}]},
  {slug:"joseon-sunscreen-queen", line:"Joseon", name:"Joseon RG3 Revive Sunscreen — Queen", vol:"50 mL / 1.69 fl.oz", spf:"SPF50+ / PA+++", descKey:"p_joseon-sunscreen-queen_d",
   front:img("joseon-sunscreen-queen","vessel-front"),
   vessel:["vessel-front","vessel-back"].map(n=>img("joseon-sunscreen-queen",n)),
   box:["box-front","box-side","box-side2","box-back"].map(n=>img("joseon-sunscreen-queen",n)),
   ingredients:[
    {n:"Hybrid UV Filter System",b:"Broad-spectrum UVA & UVB"},
    {n:"Fermented RG3 (Ginsenoside RG3)",b:"Vitality & antioxidant support"},
    {n:"Ceramide NP",b:"Barrier support & moisture"},
    {n:"Aloe Vera Extract",b:"Soothing & hydrating"},
    {n:"Glycerin",b:"Hydration & moisture retention"},
    {n:"Plant-Derived Oils",b:"Nourishing & conditioning"}]},
  {slug:"joseon-gold-ampoule", line:"Joseon", name:"Joseon Gold Capsule Ampoule", vol:"50 mL / 1.69 fl.oz", spf:"", descKey:"p_joseon-gold-ampoule_d",
   front:img("joseon-gold-ampoule","vessel-front"),
   vessel:["vessel-front","vessel-side","vessel-back"].map(n=>img("joseon-gold-ampoule",n)),
   box:["box-front","box-side","box-side2","box-back"].map(n=>img("joseon-gold-ampoule",n)),
   ingredients:[
    {n:"24K Gold",b:"Natural radiance & glow"},
    {n:"Capsule Beads (Vitamin Complex)",b:"Tone & conditioning"},
    {n:"Rosa Damascena Callus Extracellular Vesicles",b:"Conditioning & balance"},
    {n:"Sodium DNA & Acetyl Hexapeptide-8",b:"Condition & elasticity"},
    {n:"Fermentation Complex (Saccharomyces / Aspergillus / Rice)",b:"Smooth, healthy skin"},
    {n:"Sodium Hyaluronate · Glycerin · Trehalose",b:"Hydration & moisture"}]},
  {slug:"joseon-clearmask-princess", line:"Joseon", name:"Joseon Clear Care Mask", vol:"26 g / 0.92 oz", spf:"", descKey:"p_joseon-clearmask-princess_d",
   front:img("joseon-clearmask-princess","vessel-front"),
   vessel:["vessel-front","vessel-back","vessel-front-b","vessel-back-b"].map(n=>img("joseon-clearmask-princess",n)),
   box:[],
   ingredients:[
    {n:"Tranexamic Acid · Niacinamide · Glutathione",b:"Clear, even-looking tone"},
    {n:"Panthenol · Tremella Fuciformis Extract",b:"Barrier & moisture"},
    {n:"Hexylresorcinol",b:"Conditioning & antioxidant"},
    {n:"Diospyros Kaki Leaf · Botanical Complex",b:"Balance & soothing"},
    {n:"Glycerin · Butylene Glycol · Trehalose",b:"Hydration & moisture"}]},
  {slug:"joseon-vitalmask-queen", line:"Joseon", name:"Joseon Vital Mask", vol:"26 g / 0.92 oz", spf:"", descKey:"p_joseon-vitalmask-queen_d",
   front:img("joseon-vitalmask-queen","vessel-front"),
   vessel:["vessel-front","vessel-back","vessel-front-b","vessel-back-b"].map(n=>img("joseon-vitalmask-queen",n)),
   box:[],
   ingredients:[
    {n:"Centella Asiatica Callus Extracellular Vesicles",b:"Barrier strengthening & soothing"},
    {n:"Croton Lechleri Resin (Dragon's Blood)",b:"Antioxidant & firmness"},
    {n:"Tremella Fuciformis & Moisture Complex",b:"Hydration & moisture"},
    {n:"Adenosine",b:"Wrinkle care & elasticity"},
    {n:"Sodium DNA (PDRN)",b:"Regeneration & recovery"}]}
 ]
};
window.VIVORA_PRODUCT_BY_SLUG=(function(){const m={};const P=window.VIVORA_PRODUCTS;
 [...P.geneon,...P.joseon].forEach(p=>m[p.slug]=p);return m;})();
})();

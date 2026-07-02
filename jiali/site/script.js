/* Feng Jiali site — render from DATA + CONTENT */
(function(){
const D = window.DATA, C = window.CONTENT;
const app = document.getElementById('app');
const body = document.body;
let lang = localStorage.getItem('fj-lang') || 'en';

/* ---------- helpers ---------- */
const T = (zh,en)=> lang==='zh' ? zh : en;
const yrs = s => (s||'').replace(/\s*[–—-]\s*/g,' → ');  // dash-free year ranges
const seriesById = id => D.series.find(s=>s.id===id);
const worksOf = id => D.works.filter(w=>w.series===id && w.role==='work');
const allOf  = id => D.works.filter(w=>w.series===id);
const essaysFor = id => (window.CONTENT.essays||[]).filter(e=>e.series===id && e.id!=='muyuan-letter');
const esc = s => (s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const ROLE_ZH={detail:'局部',site:'展覽現場',studio:'工作照',kerchief:'手帕',shixu:'石墟',bts:'花絮'};
const ROLE_EN={detail:'detail',site:'installation',studio:'in the studio',kerchief:'kerchief',shixu:'Stone Ruins',bts:'behind the scenes'};
function workCaption(w){
  const s = seriesById(w.series);
  let title = lang==='zh' ? (w.title_zh||s.zh) : (w.title_en||w.title_zh||s.en);
  if(!/[一-鿿A-Za-z]{2,}/.test(title||'')) title = T(s.zh,s.en);   // generic filename -> series name
  if(w.role && ROLE_ZH[w.role]) title += ' · ' + T(ROLE_ZH[w.role], ROLE_EN[w.role]);
  const bits = [w.medium && lang==='zh'?w.medium:'', w.dims, w.year].filter(Boolean).join(' · ');
  return {title, bits};
}
function card(w, blurred){
  const {title,bits} = workCaption(w);
  const overlay = blurred
    ? `<span class="blur-hint">✉ ${T('聯繫獲得','Contact to view')}</span>`
    : `<span class="cap"><b>${esc(title)}</b> ${bits?'· '+esc(bits):''}</span>`;
  return `<button class="card${blurred?' blurred':''}" data-work="${w.id}" style="--st:${seriesById(w.series).accent}">
    <img loading="lazy" decoding="async" src="${w.thumb}" alt="${esc(title)}" style="view-transition-name:vt-${w.id}">
    ${overlay}</button>`;
}

/* ---------- HERO + TIMELINE (home) ---------- */
function viewHome(){
  const a=C.artist;
  const hero=`<section class="hero5 hero-solo">
    <button class="hero5-photo" data-open="xiaoxia" aria-label="${T('曉霞裝 作品','Dawn-Cloud Dress, works')}">
      ${D.hero?`<img src="${D.hero}" alt="${T('曉霞裝1#','Dawn-Cloud Dress No.1')}">`:''}
    </button>
    <span class="hero5-label">${T('《曉霞裝1#》 · 綜合材料 · 2001','Dawn-Cloud Dress No.1 · mixed media · 2001')}</span>
    <div class="hero5-scrim" aria-hidden="true"></div>
    <div class="hero5-text">
      <div class="hero2-kick">${T('當代藝術家 · 女性主義','Contemporary artist · Feminism')}</div>
      <h1 class="hero2-name"><span>FENG</span><span class="outline">JIALI</span></h1>
      <div class="hero2-zh">奉家麗</div>
      <p class="hero2-tag">${T(a.tagline_zh,a.tagline_en)}</p>
      <div class="hero2-route"><span>Beijing</span><span>Guizhou</span><span>New York</span></div>
    </div>
  </section>`;

  const head=`<div class="tl-head reveal"><h2>${T('時間軸','Timeline')}</h2>
    <span class="sub">${T('1994 → 2025 · 油畫與綜合媒材','1994 → 2025 · painting & mixed media')}</span></div>`;

  // interleave series stations with award markers anchored to the right era
  const awards=C.cv.awards;
  let html='';
  D.series.forEach((s,i)=>{
    const chap=(C.chapters||[]).find(c=>c.at===s.id);
    if(chap) html+=chapterHeader(chap);
    const wsAll=worksOf(s.id);
    const isFeat=s.feature;
    const essay = essaysFor(s.id)[0];
    const sd=(C.seriesDesc&&C.seriesDesc[s.id])||{};
    // content-driven variation: featured + land art lead with a big image
    const bigLead = isFeat || s.kind==='landart';
    const lead = bigLead ? (allOf(s.id).find(w=>w.role==='site') || wsAll[0]) : null;
    const strip = (lead ? wsAll.filter(w=>w.id!==lead.id) : wsAll).slice(0,8);
    const variant = isFeat?'st-v-feature':(s.kind==='landart'?'st-v-land':(s.kind==='mixed'?'st-v-craft':(s.kind==='performance'?'st-v-perf':(s.kind==='photo'?'st-v-photo':'st-v-paint'))));
    html+=`<article class="station ${isFeat?'st-feature':''} ${variant}" style="--st:${s.accent}" data-series="${s.id}">
      <div class="st-year">${yrs(s.years)}</div>
      <h2 class="st-title" data-open="${s.id}">${T(s.zh,s.en)}
        ${s.feature?`<span class="st-kind">${T('重點','Featured')}</span>`:''}
        <span class="en">${T(s.en,s.zh)}</span></h2>
      ${(s.show_zh||s.show_en)?`<div class="st-show">${T(s.show_zh,s.show_en)}</div>`:''}
      <p class="st-desc">${T(sd.zh||s.desc_zh,sd.en||s.desc_en)}</p>
      ${lead?`<button class="st-lead" data-work="${lead.id}"><img loading="lazy" src="${lead.web}" alt="${esc(T(s.zh,s.en))}"><span class="st-lead-cap">${T(s.zh,s.en)} · ${yrs(s.years)}</span></button>`:''}
      <div class="st-strip" data-kind="${s.kind}">${strip.map(w=>card(w,s.blurred)).join('')}</div>
      <div class="st-actions">
        <a class="st-more" data-open="${s.id}">${T('查看全部 '+allOf(s.id).length+' 件','View all '+allOf(s.id).length)} →</a>
        ${essay?`<a class="st-essay" data-open="${s.id}">${T('文章與作品同看','Read with the works')} · ${T(essay.title_zh,essay.title_en)}</a>`:''}
      </div>
    </article>`;
    // drop award markers anchored to this era's series
    awards.filter(a=>a.after===s.id).forEach(aw=>{
      html+=`<div class="cv-mark"><b>${aw.y}</b><span>★ ${T(aw.zh,aw.en)}</span></div>`;});
    // big Siren Studio feature, founded 1998 (right after 粉臉譜系)
    if(s.id==='fenlian') html+=studioStation();
  });

  const fn=C.futureNote;
  const future = fn?`<article class="station future-note" style="--st:var(--muted)">
    <div class="st-year">${fn.years}</div>
    <h2 class="st-title" style="cursor:default">${T(fn.zh,fn.en)}</h2>
    <p class="st-desc">${T(fn.zh2,fn.en2)}</p></article>`:'';
  app.innerHTML=`${hero}<div class="view view-home">${head}<div class="timeline">${html}${future}</div>
    <aside id="nowbar" aria-hidden="true"><i></i><span id="nowlabel"></span></aside></div>`;
  document.body.style.setProperty('--now', D.series[0].accent);
  observeStations();
}

/* ---------- Timeline chapter header (MOMA-style narrative divider) ---------- */
function chapterHeader(c){
  return `<section class="chapter reveal" style="--st:${c.accent}">
    <span class="chapter-no">${c.no}</span>
    <div class="chapter-body">
      <div class="chapter-meta">${c.years}</div>
      <h2 class="chapter-title">${T(c.zh,c.en)}<span>${T(c.en,c.zh)}</span></h2>
      <p class="chapter-intro">${T(c.intro_zh,c.intro_en)}</p>
    </div>
  </section>`;
}

/* ---------- Siren Studio: large timeline feature (1998) ---------- */
function studioStation(){
  const posters=(D.posters||[]).filter(p=>p.tag==='siren');
  const strip=posters.length?`<div class="siren-strip">${posters.map(p=>`<button class="pbtn" data-img="${p.web}" aria-label="${T('塞壬工作室照片','Siren Studio photo')}"><img loading="lazy" src="${p.web}" alt="Siren Studio poster"></button>`).join('')}</div>`:'';
  return `<article class="station siren-feat" style="--st:var(--pink)" data-series="studio">
    <div class="st-year">1998</div>
    <h2 class="st-title" data-nav-to="#studio">${T('塞壬藝術工作室','Siren Art Studio')}
      <span class="st-kind">${T('工作室','Studio')}</span>
      <span class="en">${T('Siren Art Studio','塞壬藝術工作室')}</span></h2>
    <p class="st-desc siren-lede">${T('1998 年，奉家麗與同道女藝術家在北京成立「塞壬」藝術工作室，以實踐女性主義藝術爲志業。塞壬之名取自海妖的歌聲。那是女性的聲音，召喚、質詢、改變。這一年，她也在中國美術館的《世紀·女性》展上獲女性藝術學社獎。','In 1998 Feng Jiali and fellow women artists founded the Siren Studio in Beijing, devoted to feminist art. The name comes from the song of the sirens, a female voice that summons, questions and changes things. That same year she won the Women Artists’ Academic Award at the Century Women exhibition, National Art Museum of China.')}</p>
    ${strip}
    <a class="st-more" data-nav-to="#studio">${T('進入工作室','Enter the studio')} →</a>
  </article>`;
}

/* ---------- Essay + works, read together (for series with articles) ---------- */
function essayReadBlock(e, imgs){
  const body=(lang==='zh'?(e.body_zh||e.body_en):(e.body_en||e.body_zh))||[];
  const acc=e.series?seriesById(e.series).accent:'var(--pink)';
  let html=`<section class="series-essay reveal" style="--st:${acc}">
    <div class="se-head"><span class="se-tag">${T('文章','Essay')}</span>
      <h3>${T(e.title_zh,e.title_en)}</h3><div class="se-meta">${T(e.meta_zh,e.meta_en)}</div></div>
    <div class="se-body">`;
  let im=0;
  body.forEach((p,i)=>{
    html+=`<p>${esc(p)}</p>`;
    if(imgs && imgs[im] && (i===0||i===2||i===4)){
      const w=imgs[im]; const {title,bits}=workCaption(w);
      html+=`<figure class="se-fig-wrap"><button class="se-fig" data-work="${w.id}"><img loading="lazy" src="${w.web}" alt="${esc(title)}"></button>
        <figcaption class="se-fig-cap"><b>${esc(title)}</b>${bits?' · '+esc(bits):''}</figcaption></figure>`; im++;
    }
  });
  html+=`</div></section>`;
  return html;
}

/* ---------- WORKS grid (filterable) ---------- */
function viewWorks(filter){
  const chips=`<div class="chips"><button class="chip ${!filter?'active':''}" data-filter="">${T('全部','All')}</button>`+
    D.series.map(s=>`<button class="chip ${filter===s.id?'active':''}" data-filter="${s.id}" style="--c:${s.accent}"><i></i>${T(s.zh,s.en)}</button>`).join('')+`</div>`;
  const list = filter ? D.works.filter(w=>w.series===filter) : D.works.filter(w=>w.role==='work');
  const fs = filter ? seriesById(filter) : null;
  const sd = fs ? ((C.seriesDesc&&C.seriesDesc[filter])||{}) : null;
  const head=`<div class="gridhead" ${fs?`style="border-color:${fs.accent}"`:''}><h2>${fs?T(fs.zh,fs.en):T('全部作品','All Works')}</h2>
    <span class="sub" style="color:var(--muted)">${fs?yrs(fs.years)+' · ':''}${list.length} ${T('件','works')}</span></div>`;
  const intro = fs ? `<p class="works-intro" style="--st:${fs.accent}">${T(sd.zh||fs.desc_zh,sd.en||fs.desc_en)}</p>` : '';
  // 自然復魅: a large exhibition-site photo with the source text over its shadow
  let feature='', heroId=null;
  if(filter==='fumei'){
    const hero=list.find(w=>w.role==='site');
    if(hero){ heroId=hero.id;
      const zh="野生草木、花卉草蟲、中藥本草盡被收拾囊中，畫室幾乎變成植物標本陳列室。這一「述行」，旨在復魅自然本真，斷然擯除那種將自然對象化的因襲。";
      const en="The stone walls may look dead. For Feng they are very much alive. The crevices teem with life: insects, lizards, plants, many of them with folk and medicinal use. Each one turns up in her work.";
      const by=T("島子《以自然復魅重構風景詩學》","Christopher Pelley, “Post-Feminism”, 2019");
      feature=`<figure class="fumei-hero reveal" style="--st:${fs.accent}">
        <img src="${hero.web}" alt="${T('自然復魅 展覽現場','Re-enchantment of Nature, installation view')}">
        <figcaption><p>${T(zh,en)}</p><cite>${by}</cite></figcaption></figure>
        <div class="fumei-label">${T('展覽現場','Installation view')}</div>`;
    }
  }
  // series with essays: read the article and view the works together
  const workImgs = fs ? list.filter(w=>w.role==='work') : list;
  let essayHtml='';
  if(fs){
    const essays=essaysFor(filter);
    essayHtml=essays.map((e,k)=>essayReadBlock(e, workImgs.slice(k*2))).join('');
  }
  // labeled blocks: 局部 / 展覽現場 / 工作照 / 手帕 / 石墟 / 花絮 (item 7,8)
  const roleLabel={detail:['局部','Details'],site:['展覽現場','Installation views'],studio:['工作照','In the studio'],kerchief:['手帕','Kerchiefs'],shixu:['石墟','Stone Ruins'],bts:['花絮','Behind the scenes']};
  const acc = fs?fs.accent:'var(--pink)';
  const secTitle=(zh,en)=>`<div class="sec-title" style="color:${acc};--st:${acc}">${T(zh,en)}</div>`;
  const gridOf=imgs=>`<div class="grid" data-kind="${fs?fs.kind:''}">${imgs.map(w=>card(w,fs?fs.blurred:seriesById(w.series).blurred)).join('')}</div>`;
  const roleBlock=r=>{const imgs=list.filter(w=>w.role===r && w.id!==heroId); const L=roleLabel[r]; return imgs.length?secTitle(L[0],L[1])+gridOf(imgs):'';};
  const worksBlock=(fs&&(essayHtml||feature)?secTitle('全部作品','All works'):'')+gridOf(workImgs);
  // block order: 墓园 wants 局部 → 展览现场 → 工作照 → 全部作品(last); others show works first
  let order = filter==='muyuan' ? ['detail','site','studio','work'] : ['work','detail','site','studio','kerchief','shixu','bts'];
  const bodyBlocks = order.map(k=> k==='work'?worksBlock:roleBlock(k)).join('');
  // critic's review at the very end of the series (item: 口罩呤 卢文竞 评价)
  const rv = (C.reviews||{})[filter];
  const reviewBlock = rv ? secTitle('評價','Review') +
    `<blockquote class="series-review reveal" style="--st:${acc}"><p>${esc(T(rv.zh,rv.en))}</p><cite>${esc(T(rv.by_zh,rv.by_en))}，${esc(rv.date)}</cite></blockquote>` : '';
  app.innerHTML=`<div class="view">${head}${chips}${intro}${feature}${essayHtml}${bodyBlocks}${reviewBlock}</div>`;
}

/* ---------- PROJECT 鄉拉岜 before/after ---------- */
function viewProject(){
  const pairs=D.xianglaba||[];
  const P=C.project||{};
  const intro=`<div class="gridhead reveal"><h2>${T('空間藝術 · 鄉拉岜','Space Art · Xianglaba')}</h2>
    <span class="sub" style="color:var(--muted)">${P.years||'2017 → 2026'}</span></div>`;
  const ba=p=>`<div class="ba-stage" data-ba>
        <img class="ba-before" src="${p.before}" alt="${T('改造前','Before')} ${p.n}">
        <img class="ba-after" src="${p.after}" alt="${T('改造後','After')} ${p.n}">
        <div class="ba-divider"></div></div>
      <div class="ba-tags"><span>${T('改造前','Before')}</span><span>№ ${p.n}</span><span>${T('改造後','After')}</span></div>`;
  // rhythm: every 5th pair runs full-width (large), the rest in a flowing grid
  let grid='', i=0;
  while(i<pairs.length){
    if(i%5===0){ grid+=`<div class="ba ba-wide reveal">${ba(pairs[i])}</div>`; i++; }
    else{
      grid+=`<div class="ba-row">`;
      for(let k=0;k<2&&i<pairs.length&&i%5!==0;k++,i++) grid+=`<div class="ba reveal">${ba(pairs[i])}</div>`;
      grid+=`</div>`;
    }
  }
  const map=`<div class="map-block reveal">
    <div id="gzmap" aria-label="${T('荔波洪江村地圖','Map of Hongjiang, Libo')}"></div>
    <div class="map-side">
      <span class="se-tag" style="--st:var(--pink)">${T('鄉拉岜藝術美學空間','Xianglaba Art Aesthetic Space')}</span>
      <p>${T(P.space_zh,P.space_en)}</p>
      <p class="map-loc">${T(P.location_zh,P.location_en)}</p>
      <p class="map-residency">${T(P.residency_zh,P.residency_en)}</p>
      <a class="map-ctrip" href="${P.ctrip}" target="_blank" rel="noopener">${T(P.ctrip_label_zh,P.ctrip_label_en)}</a>
    </div></div>`;
  const bg=`<div class="proj-bg reveal">
    <div class="proj-col"><h3>${T('什麼是「自然復魅」','On re-enchantment')}</h3><p>${T(P.reenchant_zh,P.reenchant_en)}</p></div>
    <div class="proj-col"><h3>${T('幹欄式老屋','The stilt houses')}</h3><p>${T(P.ganlan_zh,P.ganlan_en)}</p></div>
  </div>`;
  const compare=`<div class="sec-title">${T('改造前後 · 拖動滑塊對比','Before & after · drag the slider')}</div>`;
  app.innerHTML=`<div class="view">${intro}${map}${bg}${compare}<div class="ba-flow">${grid}</div></div>`;
  initBA(); initMap(); observeReveal();
}
function initBA(){
  document.querySelectorAll('[data-ba]').forEach(stage=>{
    const after=stage.querySelector('.ba-after'), div=stage.querySelector('.ba-divider');
    const set=x=>{const r=stage.getBoundingClientRect();let p=(x-r.left)/r.width;p=Math.max(0,Math.min(1,p));
      after.style.clipPath=`inset(0 0 0 ${p*100}%)`;div.style.left=p*100+'%';};
    let drag=false;
    const down=e=>{drag=true;set((e.touches?e.touches[0]:e).clientX);};
    const move=e=>{if(drag)set((e.touches?e.touches[0]:e).clientX);};
    stage.addEventListener('mousedown',down);stage.addEventListener('touchstart',down,{passive:true});
    window.addEventListener('mousemove',move);stage.addEventListener('touchmove',move,{passive:true});
    window.addEventListener('mouseup',()=>drag=false);stage.addEventListener('touchend',()=>drag=false);
    stage.addEventListener('mousemove',e=>{if(!drag)set(e.clientX);});
  });
}
let _map;
function initMap(){
  const el=document.getElementById('gzmap'); if(!el||!window.L)return;
  if(_map){_map.remove();_map=null;}
  const site=[25.46,107.78]; // Hongjiang village, Chaoyang, Libo county, Guizhou (approx.)
  _map=L.map(el,{scrollWheelZoom:false,attributionControl:false}).setView(site,10);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',{maxZoom:14,minZoom:5}).addTo(_map);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',{maxZoom:14,minZoom:5}).addTo(_map);
  const pin=L.divIcon({className:'gz-pin',html:'<span></span>',iconSize:[18,18],iconAnchor:[9,9]});
  L.marker(site,{icon:pin}).addTo(_map)
    .bindTooltip(T('鄉拉岜 · 洪江村，荔波','Xianglaba · Hongjiang, Libo'),{permanent:true,direction:'right',className:'gz-tip',offset:[10,0]});
  setTimeout(()=>_map&&_map.invalidateSize(),200);
}

/* ---------- WORDS / essays ---------- */
function viewWords(){
  const es=C.essays;
  const list=es.map((e,i)=>`<article class="essay-card ${e.featured?'feat':''}" data-essay="${e.id}">
    <div class="num">${e.featured?'★':String(i).padStart(2,'0')}</div>
    <div><h3>${T(e.title_zh,e.title_en)}<span class="em">${T(e.title_en,e.title_zh)}</span></h3>
    <div class="mt">${T(e.meta_zh,e.meta_en)}</div></div></article>`).join('');
  app.innerHTML=`<div class="view"><div class="gridhead reveal"><h2>${T('文章','Words')}</h2>
    <span class="sub" style="color:var(--muted)">${T('自述 · 評論 · 文獻','statements · criticism · documents')}</span></div>
    <div class="words-list">${list}</div></div>`;
  observeReveal();
}
function viewEssay(id){
  const e=C.essays.find(x=>x.id===id); if(!e)return go('words');
  const body = (lang==='zh'? (e.body_zh||e.body_en) : (e.body_en||e.body_zh))||[];
  app.innerHTML=`<div class="view"><article class="reader reveal">
    <a class="back" data-nav href="#words">← ${T('返回文章','Back to Words')}</a>
    <h2>${T(e.title_zh,e.title_en)}</h2>
    <div class="meta">${T(e.meta_zh,e.meta_en)}</div>
    ${body.map(p=>`<p>${esc(p)}</p>`).join('')}
    ${e.series?`<a class="st-more" data-open="${e.series}" style="--st:${seriesById(e.series).accent}">${T('查看 '+T(seriesById(e.series).zh,seriesById(e.series).en)+' 作品','View the '+T(seriesById(e.series).zh,seriesById(e.series).en)+' works')} →</a>`:''}
  </article></div>`;
  observeReveal();window.scrollTo(0,0);
}

/* ---------- STUDIO 塞壬 ---------- */
function viewStudio(){
  const M=C.manifesto||{};
  const posters=(D.posters||[]).filter(p=>p.tag==='siren');
  const hero=D.sirenPhoto||(posters.length?posters[posters.length-1].web:'');
  const others=posters.filter(p=>p.web!==hero);
  app.innerHTML=`<div class="view studio-view">
    ${hero?`<figure class="studio-hero-img reveal"><img src="${hero}" alt="${T('塞壬藝術工作室合影','Siren Art Studio, the four founding artists')}">
      <figcaption><b>${T('塞壬藝術工作室','Siren Art Studio')}</b> · 1998</figcaption></figure>`:''}
    <div class="studio-head reveal">
      <div class="studio-yr">1998</div>
      <h1>${T('塞壬藝術工作室','Siren Art Studio')}</h1>
      <p>${T('1998 年，奉家麗與同道女藝術家成立「塞壬」藝術工作室，以實踐女性主義藝術爲志業。塞壬之名取自海妖的歌聲。那是女性的聲音，召喚、質詢、改變。她們一同展出繪畫、影像、綜合材料與行爲，把女性的經驗放回畫面的中心。','In 1998 Feng Jiali and fellow women artists founded the Siren Studio in Beijing, devoted to feminist art. The name comes from the song of the sirens, a female voice that summons, questions and changes things. Together they showed painting, video, mixed media and performance, and put women’s experience back at the centre of the picture.')}</p>
      <p class="studio-quote">${T('「奉家麗屬於實踐女性主義藝術的塞壬藝術工作室。豔俗的形、色和特殊的選材，共同構成對當代女性生存狀態的溫和嘲諷。」水天中','“Feng Jiali belongs to the Siren Studio, which practises feminist art. Her gaudy forms and colours and her unusual choice of material together make a gentle satire on the condition of contemporary women.” Shui Tianzhong')}</p>
    </div>
    ${M.origin_zh?`<div class="sec-title">${T('緣起','Origin')}</div>
    <div class="manifesto reveal"><p class="mf-body">${T(M.origin_zh,M.origin_en)}</p></div>`:''}
    ${M.zh?`<div class="sec-title">${T('宣言與立場','Manifesto & Position')}</div>
    <div class="manifesto reveal">
      <p class="mf-lede">${T(M.zh_lede,M.en_lede)}</p>
      <p class="mf-body">${T(M.zh,M.en)}</p>
      <ol class="mf-aims">${(lang==='zh'?M.aims_zh:M.aims_en).map(x=>`<li>${esc(x)}</li>`).join('')}</ol>
    </div>`:''}
    ${others.length?`<div class="sec-title">${T('工作室招貼與文獻','Studio posters and documents')}</div>
    <div class="grid studio-grid">${others.map(p=>`<button class="card studio-card" data-img="${p.web}"><img loading="lazy" src="${p.web}" alt="Siren Studio poster"></button>`).join('')}</div>`:''}
  </div>`;
  observeReveal();
}

/* ---------- ABOUT ---------- */
function viewAbout(){
  const a=C.artist;
  const press=C.press.map(q=>`<div class="quote"><p>${T(q.zh,q.en)}</p><cite>${T(q.by_zh,q.by_en)}</cite></div>`).join('');
  const solo=C.cv.solo.map(r=>`<div class="cv-row"><b>${r.y}</b><span>${T(r.zh,r.en)}</span></div>`).join('');
  const aw=C.cv.awards.map(r=>`<div class="cv-row"><b>${r.y}</b><span>${T(r.zh,r.en)}</span></div>`).join('');
  const grp=(C.cv.group||[]).map(r=>`<div class="cv-row"><b>${r.y}</b><span>${T(r.zh,r.en)}</span></div>`).join('');
  const posters=(D.posters||[]).filter(p=>p.tag==='exhibition');
  app.innerHTML=`<div class="view">
    <div class="about-grid">
      <div class="about-portrait reveal">${D.portrait?`<img src="${D.portrait}" alt="${T('奉家麗','Feng Jiali')}">`:''}
        <div class="pmeta">${T(a.born_zh,a.born_en)}<br>${T(a.based_zh,a.based_en)}<br>
        <a href="mailto:${a.email}">${a.email}</a></div>
      </div>
      <div class="about-bio reveal"><h2>${T('關於','About')}</h2>
        <p>${T(a.bio_zh,a.bio_en)}</p></div>
    </div>
    <div class="sec-title">${T('評論','Press')}</div>
    <div class="press-grid">${press}</div>
    <div class="sec-title">${T('展覽招貼','Exhibition Posters')}</div>
    <div class="poster-strip">${posters.map(p=>`<button class="pbtn" data-img="${p.web}" aria-label="${T('展覽招貼','exhibition poster')}"><img loading="lazy" src="${p.web}" alt="exhibition poster"></button>`).join('')}</div>
    <div class="sec-title">${T('簡歷','Curriculum Vitae')}</div>
    <div class="cv-cols">
      <div><h4 style="margin-bottom:1rem;font-family:var(--serif)">${T('個展','Solo Exhibitions')}</h4><div class="cv-list">${solo}</div></div>
      <div><h4 style="margin-bottom:1rem;font-family:var(--serif)">${T('獲獎','Awards')}</h4><div class="cv-list">${aw}</div>
        <h4 style="margin:1.8rem 0 1rem;font-family:var(--serif)">${T('聯展（精選）','Group Exhibitions (Selected)')}</h4><div class="cv-list">${grp}</div></div>
    </div>
  </div>`;
  observeReveal();
}

/* ---------- CONTACT ---------- */
let contactPrefill=null;
function viewContact(){
  const a=C.artist;
  const pf=contactPrefill||{}; contactPrefill=null;
  const cfg=C.contact||{};
  app.innerHTML=`<div class="view contact-view">
    <div class="gridhead reveal"><h2>${T('聯繫','Contact')}</h2></div>
    <div class="contact-info reveal">
      <p class="contact-lead">${T('歡迎來信。收藏、展覽、約稿，或希望觀看攝影作品的原作，請直接郵件聯繫奉家麗。','For acquisition, exhibition, commissions, or to view the original photographs, please write to Feng Jiali directly.')}</p>
      <ul class="contact-list">
        <li><span>Email</span><a href="mailto:${a.email}">${a.email}</a></li>
        <li><span>Instagram</span><a href="${a.instagram}" target="_blank" rel="noopener">@jialistudio ↗</a></li>
        <li><span>WeChat</span><b>${a.wechat}</b></li>
        <li><span>${T('工作生活','Based')}</span><b>${T('北京 · 貴州 · 紐約','Beijing · Guizhou · New York')}</b></li>
      </ul>
    </div>
    <div class="sec-title">${T('給奉家麗留言','Write to Feng Jiali')}</div>
    <form id="contactform" class="contact-form reveal">
      <div class="cf-row">
        <label>${T('稱呼','Name')}<input name="name" required autocomplete="name"></label>
        <label>${T('你的郵箱','Your email')}<input type="email" name="email" required autocomplete="email"></label>
      </div>
      <label>${T('主題','Subject')}<input name="subject" value="${esc(pf.subject||'')}"></label>
      <label>${T('留言','Message')}<textarea name="message" rows="6" required></textarea></label>
      <input type="checkbox" name="botcheck" tabindex="-1" style="position:absolute;left:-9999px" aria-hidden="true">
      <button type="submit">${T('發送','Send')} →</button>
      <p class="contact-note">${T('留言會通過郵件發送給奉家麗，她會盡快回復你。','Your message is emailed to Feng Jiali, who will reply to you soon.')}${cfg.qq?T('　如未能聯繫上，也可發送 QQ 郵箱 ','　If you cannot reach her, you may also write to her QQ email ')+cfg.qq+'。':''}</p>
      <p id="contactmsg" class="submsg"></p>
    </form>
  </div>`;
  const f=document.getElementById('contactform');
  const msg=t=>{document.getElementById('contactmsg').textContent=t;};
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    const fd=new FormData(f);
    if(fd.get('botcheck')) return; // honeypot
    const subj=(fd.get('subject')||'').trim()||T('網站留言 · fengjiali76.com','Message via fengjiali76.com');
    if(cfg.web3formsKey){
      msg(T('正在發送…','Sending…'));
      try{
        const payload={access_key:cfg.web3formsKey, from_name:'fengjiali76.com', subject:subj,
          name:fd.get('name'), email:fd.get('email'), message:fd.get('message'), replyto:fd.get('email')};
        if(cfg.cc) payload.cc=cfg.cc;
        const r=await fetch('https://api.web3forms.com/submit',{method:'POST',
          headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload)});
        const j=await r.json();
        if(j.success){ f.reset(); msg(T('已發送，謝謝！奉家麗會盡快回復你。','Sent, thank you. Feng Jiali will reply soon.')); }
        else msg(T('發送失敗，請直接郵件聯繫 ','Could not send. Please email ')+a.email);
      }catch(err){ msg(T('發送失敗，請直接郵件聯繫 ','Could not send. Please email ')+a.email); }
    } else {
      const body=`${T('稱呼','Name')}: ${fd.get('name')}\n${T('郵箱','Email')}: ${fd.get('email')}\n\n${fd.get('message')}`;
      location.href=`mailto:${a.email}?cc=${encodeURIComponent(cfg.cc||'')}&subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
      msg(T('正在打開你的郵件應用…','Opening your email app…'));
    }
  });
  observeReveal();
}

/* ---------- LIGHTBOX ---------- */
let lbList=[], lbIdx=0;
function openWork(id){
  const w=D.works.find(x=>x.id===id); if(!w)return;
  const s=seriesById(w.series);
  if(s.blurred){ contactPrefill={subject:(lang==='zh'?'攝影作品觀看請求':'Request to view a photograph')+': '+T(s.zh,s.en)}; go('contact'); return; }
  lbList=allOf(w.series); lbIdx=lbList.findIndex(x=>x.id===id);
  showLB();
}
function showLB(){
  const w=lbList[lbIdx], {title,bits}=workCaption(w);
  const lb=document.getElementById('lightbox');
  const img=document.getElementById('lb-img');
  const run=()=>{img.src=w.web;img.alt=title;
    document.getElementById('lb-cap').innerHTML=`<b>${esc(title)}</b><span class="en">${esc(lang==='zh'?(w.title_en||''):(w.title_zh||''))}</span> ${bits?'<br>'+esc(bits):''}`;};
  lb.hidden=false;
  document.getElementById('lb-prev').style.display=lbList.length>1?'':'none';
  document.getElementById('lb-next').style.display=lbList.length>1?'':'none';
  if(document.startViewTransition && img.src) document.startViewTransition(run); else run();
}
// single-image lightbox (posters / studio photos): opens on this page, close with ✕
function openImg(src, cap){
  lbList=[];
  const lb=document.getElementById('lightbox');
  const img=document.getElementById('lb-img');
  document.getElementById('lb-prev').style.display='none';
  document.getElementById('lb-next').style.display='none';
  const run=()=>{img.src=src;img.alt=cap||'';document.getElementById('lb-cap').innerHTML=cap?`<b>${esc(cap)}</b>`:'';};
  lb.hidden=false;
  if(document.startViewTransition && img.src) document.startViewTransition(run); else run();
}
function lbNav(d){if(lbList.length<2)return;lbIdx=(lbIdx+d+lbList.length)%lbList.length;showLB();}
document.getElementById('lb-close').onclick=()=>document.getElementById('lightbox').hidden=true;
document.getElementById('lb-prev').onclick=()=>lbNav(-1);
document.getElementById('lb-next').onclick=()=>lbNav(1);
document.getElementById('lightbox').addEventListener('click',e=>{if(e.target.id==='lightbox')e.currentTarget.hidden=true;});
window.addEventListener('keydown',e=>{const lb=document.getElementById('lightbox');if(lb.hidden)return;
  if(e.key==='Escape')lb.hidden=true;if(e.key==='ArrowLeft')lbNav(-1);if(e.key==='ArrowRight')lbNav(1);});

/* ---------- routing ---------- */
function go(route){location.hash=route;}
function render(){
  const h=(location.hash||'#home').slice(1);
  const [base,arg]=h.split('/');
  if(base==='home')viewHome();
  else if(base==='works')viewWorks(arg||'');
  else if(base==='project')viewProject();
  else if(base==='words')viewWords();
  else if(base==='essay')viewEssay(arg);
  else if(base==='studio')viewStudio();
  else if(base==='about')viewAbout();
  else if(base==='contact')viewContact();
  else viewHome();
  // active nav
  document.querySelectorAll('#mainnav a').forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href')==='#'+base ||
      (base==='works'&&a.getAttribute('href')==='#works')||
      (base==='essay'&&a.getAttribute('href')==='#words'));
  });
  document.getElementById('mainnav').classList.remove('open');
  if(base!=='essay')window.scrollTo(0,0);
  observeReveal();
}

/* ---------- global click delegation ---------- */
document.addEventListener('click',e=>{
  const nt=e.target.closest('[data-nav-to]'); if(nt){location.hash=nt.dataset.navTo;return;}
  const open=e.target.closest('[data-open]'); if(open){go('works/'+open.dataset.open);return;}
  const es=e.target.closest('[data-essay]'); if(es){go('essay/'+es.dataset.essay);return;}
  const im=e.target.closest('[data-img]'); if(im){openImg(im.dataset.img, im.dataset.cap||'');return;}
  const wk=e.target.closest('[data-work]'); if(wk){openWork(wk.dataset.work);return;}
  const ch=e.target.closest('[data-filter]'); if(ch){go(ch.dataset.filter?'works/'+ch.dataset.filter:'works');return;}
});

/* ---------- language ---------- */
function applyLang(){
  body.dataset.lang=lang;
  document.documentElement.lang=lang;
  document.getElementById('langtoggle').textContent= lang==='zh'?'EN':'中';
  document.querySelectorAll('[data-zh][data-en]').forEach(el=>{el.textContent=el.dataset[lang];});
  render();
}
document.getElementById('langtoggle').onclick=()=>{lang=lang==='zh'?'en':'zh';localStorage.setItem('fj-lang',lang);applyLang();};

/* ---------- reveal observers ---------- */
let io;
function observeReveal(){
  io && io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal,.station,.cv-mark').forEach(el=>io.observe(el));
}
/* active-series color wash: as each station crosses center, tint --now */
let nowIO;
function observeStations(){
  observeReveal();
  nowIO && nowIO.disconnect();
  nowIO=new IntersectionObserver(es=>{
    es.forEach(en=>{
      if(en.isIntersecting){
        const s=seriesById(en.target.dataset.series);
        if(s){document.body.style.setProperty('--now',s.accent);
          const lab=document.getElementById('nowlabel');
          if(lab)lab.textContent=T(s.zh,s.en)+' · '+s.years;}
      }
    });
  },{rootMargin:'-45% 0px -45% 0px',threshold:0});
  document.querySelectorAll('.station[data-series]').forEach(el=>nowIO.observe(el));
}

/* ---------- cursor ---------- */
const dot=document.getElementById('cursor-dot');
if(matchMedia('(hover:hover) and (pointer:fine)').matches){
  window.addEventListener('mousemove',e=>{dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';});
  document.addEventListener('mouseover',e=>{dot.classList.toggle('big',!!e.target.closest('a,button,.card,.st-title'));});
}

/* ---------- subscribe ---------- */
document.getElementById('subform').addEventListener('submit',e=>{
  e.preventDefault();
  const email=e.target.querySelector('input').value;
  const subs=JSON.parse(localStorage.getItem('fj-subs')||'[]'); subs.push({email,at:Date.now()});
  localStorage.setItem('fj-subs',JSON.stringify(subs));
  document.getElementById('submsg').textContent=T('已訂閱，謝謝！','Subscribed — thank you!');
  e.target.reset();
});

/* ---------- nav burger ---------- */
document.getElementById('navburger').onclick=()=>document.getElementById('mainnav').classList.toggle('open');

/* ---------- init ---------- */
if(D.navicon)document.getElementById('brand-icon').src=D.navicon;
document.getElementById('yr').textContent=new Date().getFullYear();
window.addEventListener('hashchange',render);
applyLang();
})();

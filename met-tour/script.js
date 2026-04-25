/* ════════════════════════════════════════════════════════════════
   ART TOUR — SCRIPT.JS  v2.0
   Multi-museum · Three-role auth · TTS audio · IDB persistence
   Dark mode · Notes panel · Behavior tracking · Password gen
════════════════════════════════════════════════════════════════ */

'use strict';

/* ── CONSTANTS ────────────────────────────────────────────────── */

// Analytics backend — paste your Google Apps Script web-app URL here.
// Leave empty to record events locally only (IndexedDB).
const ANALYTICS_ENDPOINT = '';

const CN_PROVINCES = [
  '北京市','天津市','上海市','重庆市',
  '河北省','山西省','辽宁省','吉林省','黑龙江省',
  '江苏省','浙江省','安徽省','福建省','江西省','山东省',
  '河南省','湖北省','湖南省','广东省','海南省',
  '四川省','贵州省','云南省','陕西省','甘肃省','青海省',
  '内蒙古自治区','广西壮族自治区','西藏自治区',
  '宁夏回族自治区','新疆维吾尔自治区',
  '香港特别行政区','澳门特别行政区'
];

const PASSWORDS = {
  lecturer: 'lecturer2026',
  admin:    'metadmin2026'
};

const ROLE_META = {
  visitor:  { label: '普通访客', labelEn: 'Visitor',  cls: 'visitor'  },
  lecturer: { label: '讲解员',   labelEn: 'Lecturer', cls: 'lecturer' },
  admin:    { label: '博物馆方',  labelEn: 'Admin',    cls: 'admin'    }
};

// Simplified world continent outlines — equirectangular 1000×500
// Points pre-computed: x = (lng+180)/360*1000, y = (90−lat)/180*500
const WORLD_CONTINENTS = [
  // North America
  '30,66 115,50 295,15 352,119 325,125 289,153 278,181 231,178 265,222 194,186 156,117 122,92',
  // South America
  '265,222 325,220 403,236 403,272 381,314 311,406 292,378 275,264',
  // Greenland
  '350,25 383,14 417,19 417,50 400,67 372,72 350,56',
  // British Isles
  '483,92 492,83 500,89 494,103',
  // Europe mainland (Scandinavia + central + Balkans)
  '503,78 519,72 533,67 572,53 583,83 567,92 550,89 528,97 514,103 506,114 489,117 486,108 494,97',
  // Iberian Peninsula
  '475,125 494,119 503,133 494,147 486,153 475,144',
  // Italy
  '519,122 536,122 544,144 536,153 527,144 519,133',
  // Africa
  '486,150 528,147 536,158 581,164 597,169 608,192 625,217 642,218 611,208 589,194 575,222 550,311 511,389 500,397 475,350 450,261 436,194 453,153 475,144',
  // Asia (mainland + Arabian Peninsula + Indian Peninsula + SE Asia)
  '578,114 572,53 612,39 700,28 780,28 861,42 942,50 978,67 978,97 939,108 900,125 861,161 833,172 806,183 789,222 750,211 747,189 717,228 703,197 692,186 667,181 625,217 608,192 597,169 603,153 578,114',
  // Japan
  '864,164 878,150 892,125 900,131 892,136 878,158',
  // Australia
  '750,242 819,233 877,228 908,272 914,294 908,333 872,350 833,350 794,333 764,308',
];

const PWD_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no confusable chars

/* ── STATE ────────────────────────────────────────────────────── */
let currentRole         = null;
let currentLang         = 'zh';
let selectorLang        = 'zh';    // language on the museum selector screen
let currentMuseumId     = 'met';
let currentMuseum       = null;    // full MUSEUMS_REGISTRY entry
let currentMuseumWorks  = {};
let currentMuseumPeriods= [];
let currentAcc          = null;
let currentPeriod       = null;
let ttsUtterance        = null;
let ttsRate             = 1.0;
let ttsPaused           = false;
let visitStats          = {};
let visitedNodes        = new Set();
let worksDbData         = {};      // Met IDB edits merged
let deferInstall        = null;
let voiceMode           = 'tts';
let elAudio             = null;
let visitorSession      = {};
let sessionId           = Date.now().toString(36);
let notesContext        = '';      // current note key: museumId:acc or museumId:general
let selectorMode        = 'region'; // 'map' | 'region' | 'list'
let onsiteSelectedOnCard = false;  // on-site toggle state from museum card

/* ── IDB v4 ───────────────────────────────────────────────────── */
let db = null;
function initIDB() {
  return new Promise((res, rej) => {
    const req = indexedDB.open('ArtTourDB', 4);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('works'))    d.createObjectStore('works',    { keyPath: 'acc' });
      if (!d.objectStoreNames.contains('notes'))    d.createObjectStore('notes',    { keyPath: 'id'  });
      if (!d.objectStoreNames.contains('stats'))    d.createObjectStore('stats',    { keyPath: 'acc' });
      if (!d.objectStoreNames.contains('settings')) d.createObjectStore('settings', { keyPath: 'key' });
      if (!d.objectStoreNames.contains('visitors')) d.createObjectStore('visitors', { keyPath: 'id', autoIncrement: true });
      if (!d.objectStoreNames.contains('events'))   d.createObjectStore('events',   { keyPath: 'id' });
    };
    req.onsuccess = e => { db = e.target.result; res(db); };
    req.onerror   = () => res(null);
  });
}

function idbGet(store, key) {
  return new Promise(res => {
    if (!db) return res(null);
    const req = db.transaction(store, 'readonly').objectStore(store).get(key);
    req.onsuccess = () => res(req.result || null);
    req.onerror   = () => res(null);
  });
}

function idbPut(store, obj) {
  return new Promise(res => {
    if (!db) return res();
    const req = db.transaction(store, 'readwrite').objectStore(store).put(obj);
    req.onsuccess = () => res();
    req.onerror   = () => res();
  });
}

function idbGetAll(store) {
  return new Promise(res => {
    if (!db) return res([]);
    const req = db.transaction(store, 'readonly').objectStore(store).getAll();
    req.onsuccess = () => res(req.result || []);
    req.onerror   = () => res([]);
  });
}

function idbAddVisitor(obj) {
  return new Promise(res => {
    if (!db) return res();
    const req = db.transaction('visitors', 'readwrite').objectStore('visitors').add(obj);
    req.onsuccess = () => res(req.result);
    req.onerror   = () => res(null);
  });
}

/* ── BEHAVIOR TRACKING ────────────────────────────────────────── */
function track(type, data = {}) {
  const event = {
    id:        Date.now() + '-' + Math.random().toString(36).slice(2),
    type,
    museum:    currentMuseumId || 'met',
    acc:       data.acc || currentAcc || null,
    role:      currentRole || 'visitor',
    lang:      currentLang,
    timestamp: Date.now(),
    sessionId,
    visitorId: visitorSession?.password || null,
    visitorName: visitorSession?.name   || null,
    ...data
  };
  idbPut('events', event);
  if (ANALYTICS_ENDPOINT) scheduleEventFlush();
}

let _flushTimer = null;
function scheduleEventFlush() {
  if (_flushTimer) return;
  _flushTimer = setTimeout(flushEventsToBackend, 8000);
}
async function flushEventsToBackend() {
  _flushTimer = null;
  if (!ANALYTICS_ENDPOINT) return;
  try {
    const events = await idbGetAll('events');
    const batch  = events.filter(e => !e._sent).slice(-60);
    if (!batch.length) return;
    await postToBackend({ type: 'events', events: batch });
    for (const e of batch) idbPut('events', { ...e, _sent: true });
  } catch {}
}
async function postToBackend(payload) {
  if (!ANALYTICS_ENDPOINT) return;
  await fetch(ANALYTICS_ENDPOINT, {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

/* ── DARK MODE ────────────────────────────────────────────────── */
function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.dataset.theme === 'dark';
  root.dataset.theme = isDark ? 'light' : 'dark';
  localStorage.setItem('artTourTheme', root.dataset.theme);
}

function applyTheme() {
  const saved = localStorage.getItem('artTourTheme');
  if (saved) document.documentElement.dataset.theme = saved;
}

/* ── MUSEUM SELECTOR ──────────────────────────────────────────── */
function renderMuseumGrid(region = 'all') {
  const grid = document.getElementById('museum-grid');
  if (!grid) return;

  const list = region === 'all'
    ? MUSEUMS_REGISTRY
    : MUSEUMS_REGISTRY.filter(m => m.region === region);

  grid.innerHTML = list.map(m => {
    const name = selectorLang === 'zh' ? m.name.zh : m.name.en;
    const city = selectorLang === 'zh' ? m.city.zh : m.city.en;
    const vt   = selectorLang === 'zh' ? (m.visitTime?.zh || '') : (m.visitTime?.en || '');
    const exName = m.hasExhibition && m.exhibitionName
      ? (selectorLang === 'zh' ? m.exhibitionName.zh : m.exhibitionName.en)
      : null;

    // Background image from first bgAcc
    let bgImg = '';
    if (m.bgAccs && m.bgAccs.length) {
      const works = getMuseumWorks(m.id);
      const first = m.bgAccs.find(a => works[a]?.img);
      if (first) bgImg = works[first].img;
    }

    const soonLabel = selectorLang === 'zh' ? '即将开放' : 'Coming Soon';
    const enterLabel = selectorLang === 'zh' ? '进入导览' : 'Enter Guide';

    const onsiteNote = selectorLang === 'zh'
      ? '请如实选择，以便提供更合适的参观建议'
      : 'Please answer honestly so we can tailor your experience';
    const onsiteLabel = selectorLang === 'zh' ? '我现在在馆内' : 'I am currently on-site';

    return `
      <div class="museum-card ${m.comingSoon ? 'museum-card--soon' : ''} ${m.hasExhibition ? 'museum-card--exhibition' : ''}"
           style="--museum-accent:${m.accentColor}">
        ${bgImg ? `<div class="museum-card-bg" style="background-image:url('${bgImg}')"></div>` : '<div class="museum-card-bg museum-card-bg--empty"></div>'}
        <div class="museum-card-overlay"></div>
        <div class="museum-card-body" onclick="${m.comingSoon ? 'showComingSoon()' : `selectMuseum('${m.id}')`}">
          <div class="museum-card-icon-wrap">${m.icon}</div>
          ${exName ? `<div class="museum-card-exhibition-tag">${exName}</div>` : ''}
          <h3 class="museum-card-name">${name}</h3>
          <p class="museum-card-city">${city}</p>
          ${vt ? `<p class="museum-card-vt">${vt}</p>` : ''}
          ${m.comingSoon
            ? `<div class="museum-card-soon">${soonLabel}</div>`
            : `<div class="museum-card-enter">${enterLabel}</div>`
          }
        </div>
        ${!m.comingSoon ? `
        <div class="museum-card-onsite" onclick="event.stopPropagation()">
          <label class="onsite-card-label">
            <input type="checkbox" class="onsite-chk" id="onsite-${m.id}" />
            <span>${onsiteLabel}</span>
          </label>
          <p class="onsite-card-note">${onsiteNote}</p>
        </div>` : ''}
      </div>
    `;
  }).join('');
}

function filterMuseums(region, btn) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMuseumGrid(region);
}

function showComingSoon() {
  showToast(selectorLang === 'zh' ? '该博物馆导览即将推出，敬请期待' : 'This museum guide is coming soon — stay tuned');
}

function toggleSelectorLang() {
  selectorLang = selectorLang === 'zh' ? 'en' : 'zh';
  document.getElementById('selector-lang-btn').textContent = selectorLang === 'zh' ? 'EN' : '中';
  applyDataLangText(document.querySelector('.museum-selector'));
  // Re-render whichever view is currently active
  if (selectorMode === 'map')    renderMuseumMap();
  else if (selectorMode === 'list') renderMuseumList();
  else renderMuseumGrid(document.querySelector('.filter-tab.active')?.dataset.region || 'all');
}

/* ── SELECTOR MODES ───────────────────────────────────────────── */
function switchSelectorMode(mode) {
  selectorMode = mode;

  document.querySelectorAll('.mode-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.mode === mode));

  const filterBar = document.getElementById('selector-filter-bar');
  if (filterBar) filterBar.style.display = mode === 'region' ? 'flex' : 'none';

  document.getElementById('museum-map-view').classList.toggle('hidden', mode !== 'map');
  document.getElementById('museum-grid').classList.toggle('hidden', mode !== 'region');
  document.getElementById('museum-list-view').classList.toggle('hidden', mode !== 'list');

  if (mode === 'map')         renderMuseumMap();
  else if (mode === 'region') renderMuseumGrid(document.querySelector('.filter-tab.active')?.dataset.region || 'all');
  else                        renderMuseumList();
}

function latLngToSVG(lat, lng) {
  return [(lng + 180) / 360 * 1000, (90 - lat) / 180 * 500];
}

function renderMuseumMap() {
  const container = document.getElementById('museum-map-view');
  if (!container) return;

  const continentsSVG = WORLD_CONTINENTS.map(pts =>
    `<polygon class="continent" points="${pts}"/>`
  ).join('');

  // Slight offsets for NYC cluster so markers don't perfectly overlap
  const NYC_OFFSETS = { met: [0,0], moma: [-10,9], mcny: [10,-9], broadway: [-10,18] };

  const markersSVG = MUSEUMS_REGISTRY.map(m => {
    let [x, y] = latLngToSVG(m.lat, m.lng);
    const off = NYC_OFFSETS[m.id];
    if (off) { x += off[0]; y += off[1]; }
    x = Math.round(x); y = Math.round(y);

    const name    = selectorLang === 'zh' ? m.name.zh : m.name.en;
    const soon    = m.comingSoon;
    const exhb    = m.hasExhibition;
    const markerCls = soon ? 'marker-soon' : (exhb ? 'marker-exhibition' : 'marker-active');
    const onclick = soon ? 'showComingSoon()' : `selectMuseum('${m.id}')`;
    const r = soon ? 4 : 6;

    return `<g class="map-museum-group ${markerCls}" onclick="${onclick}" tabindex="0" role="button" aria-label="${escHtml(name)}">
      <circle cx="${x}" cy="${y}" r="${r + 5}" class="marker-halo"/>
      <circle cx="${x}" cy="${y}" r="${r}" class="marker-dot"/>
      ${!soon ? `<text x="${x}" y="${y - 12}" class="marker-name" text-anchor="middle">${escHtml(name)}</text>` : ''}
    </g>`;
  }).join('');

  const L = selectorLang;
  const legendItems = [
    { cls: 'marker-active',    label: L === 'zh' ? '可导览' : 'Available' },
    { cls: 'marker-exhibition',label: L === 'zh' ? '特别展览' : 'Special Exhibition' },
    { cls: 'marker-soon',      label: L === 'zh' ? '即将开放' : 'Coming Soon' },
  ];
  const legendSVG = legendItems.map((item, i) => `
    <g transform="translate(${i * 160}, 0)">
      <circle cx="8" cy="8" r="5" class="${item.cls} marker-dot legend-dot"/>
      <text x="20" y="13" class="legend-label">${item.label}</text>
    </g>`).join('');

  container.innerHTML = `
    <svg class="world-map-svg" viewBox="0 0 1000 500"
         xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"
         role="img" aria-label="${L === 'zh' ? '博物馆世界地图' : 'World map of museums'}">
      <g class="continents">${continentsSVG}</g>
      <g class="museum-markers">${markersSVG}</g>
      <g class="map-legend" transform="translate(24, 468)">${legendSVG}</g>
    </svg>`;
}

function renderMuseumList() {
  const container = document.getElementById('museum-list-view');
  if (!container) return;
  const L = selectorLang;

  container.innerHTML = MUSEUMS_REGISTRY.map(m => {
    const name   = L === 'zh' ? m.name.zh : m.name.en;
    const city   = L === 'zh' ? m.city.zh : m.city.en;
    const hl     = L === 'zh' ? (m.highlight?.zh || '') : (m.highlight?.en || '');
    const vt     = L === 'zh' ? (m.visitTime?.zh || '') : (m.visitTime?.en || '');
    const exName = m.hasExhibition && m.exhibitionName
      ? (L === 'zh' ? m.exhibitionName.zh : m.exhibitionName.en) : '';
    const soonLabel  = L === 'zh' ? '即将开放' : 'Coming Soon';
    const enterLabel = L === 'zh' ? '进入' : 'Enter';
    const onclick = m.comingSoon ? 'showComingSoon()' : `selectMuseum('${m.id}')`;

    return `
      <div class="museum-list-item ${m.comingSoon ? 'list-item--soon' : ''} ${m.hasExhibition ? 'list-item--exhibition' : ''}"
           onclick="${onclick}" style="--museum-accent:${m.accentColor}">
        <div class="list-item-icon">${escHtml(String(m.icon))}</div>
        <div class="list-item-body">
          <div class="list-item-name">${escHtml(name)}</div>
          <div class="list-item-city">${escHtml(city)}</div>
          <div class="list-item-hl">${escHtml(hl)}</div>
          ${exName ? `<div class="list-item-ex">${escHtml(exName)}</div>` : ''}
        </div>
        <div class="list-item-right">
          ${vt ? `<div class="list-item-vt">${escHtml(vt)}</div>` : ''}
          <div class="${m.comingSoon ? 'list-item-soon' : 'list-item-enter'}">
            ${m.comingSoon ? soonLabel : enterLabel}
          </div>
        </div>
      </div>`;
  }).join('');
}

// Updates all [data-zh] / [data-en] elements in a container
function applyDataLangText(root = document) {
  const lang = root === document ? currentLang : selectorLang;
  root.querySelectorAll('[data-zh],[data-en]').forEach(el => {
    const txt = lang === 'zh' ? el.dataset.zh : el.dataset.en;
    if (txt !== undefined) el.textContent = txt;
  });
}

function selectMuseum(museumId) {
  // Read on-site toggle from card before switching screen
  const onsiteChk = document.getElementById(`onsite-${museumId}`);
  onsiteSelectedOnCard = onsiteChk?.checked || false;

  currentMuseumId = museumId;
  currentMuseum   = getMuseumById(museumId);

  // Update login screen for this museum
  const m = currentMuseum;
  if (!m) return;

  const nameEl = document.getElementById('login-museum-name');
  const cityEl = document.getElementById('login-museum-city');
  const hlEl   = document.getElementById('login-museum-highlight');
  const iconEl = document.getElementById('login-logo-icon');

  if (nameEl) nameEl.textContent = selectorLang === 'zh' ? m.name.zh : m.name.en;
  if (cityEl) cityEl.textContent = selectorLang === 'zh' ? m.city.zh : m.city.en;
  if (hlEl)   hlEl.textContent   = selectorLang === 'zh' ? (m.highlight?.zh || '') : (m.highlight?.en || '');
  if (iconEl) iconEl.textContent = m.icon;

  // Exhibition badge
  const badge     = document.getElementById('login-exhibition-badge');
  const badgeName = document.getElementById('login-exhibition-name');
  const badgeDates= document.getElementById('login-exhibition-dates');
  if (m.hasExhibition && m.exhibitionName) {
    badge.classList.remove('hidden');
    if (badgeName)  badgeName.textContent  = selectorLang === 'zh' ? m.exhibitionName.zh : m.exhibitionName.en;
    if (badgeDates) badgeDates.textContent = m.exhibitionDates || '';
  } else {
    badge.classList.add('hidden');
  }

  // Visitor code hint
  const todayCode = todayVisitorCode(museumId);
  const hintEl = document.getElementById('login-hint');
  if (hintEl) {
    hintEl.textContent = `访客码：${todayCode} | 或输入 "yuetong" 快速进入 | 讲解员：lecturer2026`;
  }

  // Set login background painting
  setLoginBgPainting(museumId);

  document.getElementById('museum-selector').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');

  track('museum_selected', { museum: museumId });
}

function backToSelector() {
  stopAudio();
  document.getElementById('app').classList.add('hidden');
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('visitor-reg').classList.add('hidden');
  document.getElementById('museum-selector').classList.remove('hidden');
  currentRole = null;
  currentMuseumId = 'met';
  currentMuseum = null;
}

/* ── AUTH ─────────────────────────────────────────────────────── */
function todayVisitorCode(museumId) {
  const d  = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return mm + dd + (museumId || 'met');
}

function generateVisitorPassword() {
  let code = 'VIS-';
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-';
    code += PWD_CHARS[Math.floor(Math.random() * PWD_CHARS.length)];
  }
  return code; // format: VIS-XXXX-XXXX
}

function login(role, pwd) {
  const val = pwd.trim();

  if (role === 'visitor') {
    // Quick dev bypass
    if (/^(\d{4}-\d{2}-\d{2}\s+)?yuetong$/i.test(val)) {
      visitorSession = {
        name: 'Yuetong Visitor', city: 'Auto', country: 'Auto',
        museum: currentMuseum?.name?.en || 'Unknown',
        museumId: currentMuseumId,
        date: new Date().toISOString().split('T')[0],
        source: 'yuetong', onsite: false,
        password: 'YUETONG', timestamp: Date.now()
      };
      currentRole = 'visitor';
      startApp();
      return;
    }

    // Accept generated visitor codes: VIS-XXXX-XXXX (returning visitors)
    if (/^VIS-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(val)) {
      currentRole = 'visitor';
      initIDB().then(() =>
        idbGetAll('visitors').then(all => {
          const sess = all.find(v => v.password === val.toUpperCase());
          if (sess) visitorSession = sess;
          startApp();
        })
      );
      return;
    }

    // Legacy daily code or open-register flow
    const correct = val === todayVisitorCode(currentMuseumId);
    if (!correct) {
      showLoginError(role);
      return;
    }
    currentRole = 'visitor';
    showVisitorForm();
    return;
  }

  // Lecturer / Admin
  if (val !== PASSWORDS[role]) {
    showLoginError(role);
    return;
  }
  localStorage.setItem('artTourRole',   role);
  localStorage.setItem('artTourAuthed', '1');
  localStorage.setItem('artTourMuseum', currentMuseumId);
  currentRole = role;
  startApp();
}

function showLoginError(role) {
  const errEl = document.getElementById('login-error');
  errEl.textContent = role === 'visitor'
    ? `访客码错误 · 格式：${todayVisitorCode(currentMuseumId)} · 或输入 "yuetong"`
    : '密码错误，请重试 / Incorrect password';
  setTimeout(() => { errEl.textContent = ''; }, 4000);
}

function checkAutoLogin() {
  const saved  = localStorage.getItem('artTourRole');
  const authed = localStorage.getItem('artTourAuthed');
  const museum = localStorage.getItem('artTourMuseum');
  if (saved && saved !== 'visitor' && authed === '1') {
    currentRole     = saved;
    currentMuseumId = museum || 'met';
    currentMuseum   = getMuseumById(currentMuseumId);
    return true;
  }
  if (saved === 'visitor') {
    localStorage.removeItem('artTourRole');
    localStorage.removeItem('artTourAuthed');
  }
  return false;
}

function hasRole(minRole) {
  const h = { visitor: 0, lecturer: 1, admin: 2 };
  return (h[currentRole] || 0) >= (h[minRole] || 0);
}

function logout() {
  if (!confirm('确定登出？/ Confirm logout?')) return;
  localStorage.removeItem('artTourRole');
  localStorage.removeItem('artTourAuthed');
  stopAudio();
  document.getElementById('app').classList.add('hidden');
  document.getElementById('museum-selector').classList.remove('hidden');
  currentRole = null;
  visitorSession = {};
  track('session_end');
}

/* ── VISITOR REGISTRATION ─────────────────────────────────────── */

// Called from visitor card "注册获取密码" button — no daily code required
function openVisitorRegDirect() {
  currentRole = 'visitor';
  document.getElementById('login-screen').classList.add('hidden');
  showVisitorForm();
}

// Country dropdown change — show/hide province selector
function onRegCountryChange() {
  const val = (document.getElementById('reg-country')?.value || '').toUpperCase();
  const pg  = document.getElementById('reg-province-group');
  if (!pg) return;
  if (val === 'CN') {
    pg.style.display = '';
    const sel = document.getElementById('reg-province');
    if (sel && sel.options.length <= 1) {
      CN_PROVINCES.forEach(p => {
        const o = document.createElement('option');
        o.value = p; o.textContent = p;
        sel.appendChild(o);
      });
    }
  } else {
    pg.style.display = 'none';
    const sel = document.getElementById('reg-province');
    if (sel) sel.value = '';
  }
}

function showVisitorForm() {
  const overlay = document.getElementById('visitor-reg');
  overlay.classList.remove('hidden');
  document.getElementById('visitor-password-panel').classList.add('hidden');
  document.getElementById('visitor-reg-form').classList.remove('hidden');

  // Pre-fill
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('reg-date').value  = today;
  const musNameEl = document.getElementById('reg-museum');
  if (musNameEl && currentMuseum) {
    musNameEl.value = currentMuseum.address || '';
  }
  const musHeaderEl = document.getElementById('visitor-reg-museum-name');
  if (musHeaderEl && currentMuseum) {
    musHeaderEl.textContent = currentMuseum.name.en;
  }

  // Pre-fill on-site toggle from card selection
  const onsiteEl = document.getElementById('reg-onsite');
  if (onsiteEl) onsiteEl.checked = onsiteSelectedOnCard;

  // Set background painting
  const works = getMuseumWorks(currentMuseumId);
  const bgAcc = currentMuseum?.bgAccs?.find(a => works[a]?.img) || Object.values(works).find(w => w.img);
  const imgUrl = (bgAcc && typeof bgAcc === 'string') ? works[bgAcc]?.img : bgAcc?.img;
  if (imgUrl) {
    document.getElementById('visitor-reg-bg-img').style.backgroundImage = `url('${imgUrl}')`;
    const strip = document.getElementById('visitor-reg-art-strip');
    if (strip) strip.style.backgroundImage = `url('${imgUrl}')`;
  }
}

async function submitVisitorForm(e) {
  e.preventDefault();
  const name     = document.getElementById('reg-name').value.trim();
  const city     = document.getElementById('reg-city').value.trim();
  const countryEl= document.getElementById('reg-country');
  const country  = countryEl?.selectedOptions?.[0]?.text || countryEl?.value?.trim() || '';
  const countryCode = countryEl?.value || '';
  const province = document.getElementById('reg-province')?.value || '';
  const date     = document.getElementById('reg-date').value;
  const source   = document.querySelector('input[name="reg-source"]:checked')?.value || 'other';
  const onsite   = document.getElementById('reg-onsite')?.checked || false;
  if (!name || !city || !country || !date) return;

  const password = generateVisitorPassword();
  const now      = new Date();

  visitorSession = {
    name, city, province, country, countryCode, date, source, onsite,
    museum:    currentMuseum?.name?.en || currentMuseumId,
    museumId:  currentMuseumId,
    address:   currentMuseum?.address || '',
    password,
    time:      now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    timestamp: now.getTime()
  };

  await initIDB();
  await idbAddVisitor(visitorSession);
  track('visitor_registered', { source, onsite, country, province, city });

  // POST registration to backend for admin visibility
  postToBackend({ type: 'registration', ...visitorSession }).catch(() => {});

  // Populate hidden credential fields — triggers browser/Apple Save Password prompt
  const unField  = document.getElementById('auth-username-field');
  const pwdField = document.getElementById('auth-password-field');
  if (unField)  unField.value  = name;
  if (pwdField) pwdField.value = password;

  // Also try Credential Management API (Chrome/Safari/Edge)
  if (window.PasswordCredential) {
    navigator.credentials.store(new PasswordCredential({
      id: name, password, name,
      iconURL: location.origin + (location.pathname.replace(/\/[^/]*$/, '/')) + 'icons/icon-192.png'
    })).catch(() => {});
  }

  // Show password panel
  document.getElementById('visitor-reg-form').classList.add('hidden');
  const pwdPanel = document.getElementById('visitor-password-panel');
  const pwdEl    = document.getElementById('visitor-generated-pwd');
  pwdPanel.classList.remove('hidden');
  if (pwdEl) pwdEl.textContent = password;
}

function handleCredentialSave(event) {
  event.preventDefault();
  startAppAfterReg();
}

function startAppAfterReg() {
  if (!currentRole) currentRole = 'visitor';
  document.getElementById('visitor-reg').classList.add('hidden');
  startApp();
}

/* ── APP INIT ─────────────────────────────────────────────────── */
async function startApp() {
  await initIDB();

  // Load museum-specific works + periods
  if (currentMuseumId === 'met') {
    await loadIDBWorks();
    currentMuseumWorks = worksDbData;
  } else {
    currentMuseumWorks  = getMuseumWorks(currentMuseumId);
  }
  currentMuseumPeriods = getMuseumPeriods(currentMuseumId);
  if (!currentMuseum) currentMuseum = getMuseumById(currentMuseumId);

  await loadStats();
  await loadNotesForContext('general');

  document.getElementById('visitor-reg').classList.add('hidden');
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');

  document.body.className = `role-${currentRole}`;
  currentLang = localStorage.getItem('artTourLang') || 'zh';
  document.body.setAttribute('data-lang', currentLang);

  updateNavForMuseum();
  renderNavPeriods();
  renderRoleBanner();
  renderRouteMap();
  renderPeriodsContent();
  applyRoleUI();
  populateVisitorFilter();
  updateAdminStats();
  initScrollSpy();
  applyDataLangText();

  document.getElementById('lang-btn').textContent = currentLang === 'zh' ? 'EN' : '中文';
  track('session_start');
}

async function loadIDBWorks() {
  worksDbData = typeof WORKS_DATA !== 'undefined' ? JSON.parse(JSON.stringify(WORKS_DATA)) : {};
  if (!db) return;
  const edits = await idbGetAll('works');
  edits.forEach(w => { if (worksDbData[w.acc]) Object.assign(worksDbData[w.acc], w); });
}

async function loadStats() {
  const all = await idbGetAll('stats');
  all.forEach(s => { visitStats[s.acc] = s.count; });
}

async function loadNotesForContext(contextKey) {
  notesContext = `${currentMuseumId}:${contextKey}`;
  const saved  = await idbGet('notes', notesContext);
  const ta     = document.getElementById('notes-textarea');
  if (ta) ta.value = saved?.text || '';
}

function updateNavForMuseum() {
  const m = currentMuseum;
  if (!m) return;
  const logoM = document.getElementById('nav-logo-m');
  const titleText = document.getElementById('nav-title-text');
  if (logoM)     logoM.textContent     = m.icon;
  if (titleText) titleText.textContent = currentLang === 'zh' ? m.name.zh : m.name.en;

  const heroTitle = document.getElementById('hero-title');
  const heroSub   = document.getElementById('hero-sub');
  if (heroTitle) heroTitle.textContent = currentLang === 'zh' ? m.name.zh : m.name.en;
  if (heroSub)   heroSub.textContent   = currentLang === 'zh' ? (m.highlight?.zh||'') : (m.highlight?.en||'');

  const footerLine = document.getElementById('footer-museum-line');
  if (footerLine) footerLine.textContent = m.address;

  // Show exhibition badge in hero if applicable
  if (m.hasExhibition && m.exhibitionName) {
    const exBadge = document.querySelector('.hero-exhibition-badge');
    if (!exBadge && heroSub) {
      const badge = document.createElement('div');
      badge.className = 'hero-exhibition-badge';
      badge.textContent = `${currentLang === 'zh' ? m.exhibitionName.zh : m.exhibitionName.en} · ${m.exhibitionDates}`;
      heroSub.parentNode.insertBefore(badge, heroSub.nextSibling);
    }
  }
}

/* ── ROLE UI ──────────────────────────────────────────────────── */
function applyRoleUI() {
  const isLec   = hasRole('lecturer');
  const isAdmin = hasRole('admin');

  if (isLec) document.getElementById('visitor-log').classList.remove('hidden');
  if (isAdmin) document.getElementById('btn-admin-panel').classList.remove('hidden');
  if (isLec) document.getElementById('route-progress').classList.remove('hidden');
  if (isAdmin || isLec) document.getElementById('admin-panel').classList.toggle('hidden', !isAdmin);

  const meta = ROLE_META[currentRole];
  document.getElementById('nav-role-label').textContent = currentLang === 'zh' ? meta.label : meta.labelEn;

  if (isLec) loadVisitorLog();
}

function setLoginBgPainting(museumId) {
  const works = getMuseumWorks(museumId || 'met');
  const m     = getMuseumById(museumId || 'met');
  const bgAcc = m?.bgAccs?.find(a => works[a]?.img);
  const img   = (bgAcc && works[bgAcc]?.img) || Object.values(works).find(w => w.img)?.img;
  const el    = document.getElementById('login-bg-painting');
  if (el && img) el.style.backgroundImage = `url('${img}')`;
}

function renderRoleBanner() {
  const meta    = ROLE_META[currentRole];
  const banner  = document.getElementById('role-banner');
  if (!banner) return;
  const musName = currentLang === 'zh' ? currentMuseum?.name?.zh : currentMuseum?.name?.en;
  const msgs    = {
    visitor:  { zh: `欢迎来到 ${musName || ''}！输入作品名或Acc号即可搜索`, en: `Welcome to ${musName || ''}! Search by title or Acc# for audio guide` },
    lecturer: { zh: `讲解员模式 · ${musName} · 全部内容可见`, en: `Lecturer Mode · ${musName} · Full content visible` },
    admin:    { zh: `管理员模式 · ${musName} · 内容编辑已启用`, en: `Admin Mode · ${musName} · Content editing enabled` }
  };
  banner.textContent = currentLang === 'zh' ? msgs[currentRole].zh : msgs[currentRole].en;
  banner.className   = `role-banner ${meta.cls}`;
}

/* ── NAV PERIODS ──────────────────────────────────────────────── */
function renderNavPeriods() {
  const container = document.getElementById('nav-periods');
  if (!container) return;
  container.innerHTML = '';
  currentMuseumPeriods.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'nav-period-btn';
    btn.textContent = currentLang === 'zh' ? p.labelZh : p.label;
    btn.dataset.period = p.id;
    btn.onclick = () => scrollToPeriod(p.id);
    container.appendChild(btn);
  });

  const mobileScroll = document.getElementById('mobile-period-scroll');
  if (mobileScroll) {
    mobileScroll.innerHTML = '';
    currentMuseumPeriods.forEach(p => {
      const chip = document.createElement('button');
      chip.className = 'mobile-period-chip';
      chip.textContent = currentLang === 'zh' ? p.labelZh : p.label;
      chip.dataset.period = p.id;
      chip.onclick = () => scrollToPeriod(p.id);
      mobileScroll.appendChild(chip);
    });
  }
}

/* ── ROUTE MAP SVG ────────────────────────────────────────────── */
function renderRouteMap() {
  const svg  = document.getElementById('route-svg');
  if (!svg) return;
  svg.innerHTML = '';

  // Use ROUTE if Met, otherwise use periods as nodes
  const nodes = (currentMuseumId === 'met' && typeof ROUTE !== 'undefined')
    ? ROUTE
    : currentMuseumPeriods.map(p => ({
        label: p.label, labelZh: p.labelZh,
        gal: p.galleries || '', period: p.id, duration: p.duration
      }));

  if (!nodes.length) return;
  const n  = nodes.length;
  const xs = nodes.map((_, i) => 60 + i * ((900 - 120) / Math.max(n - 1, 1)));

  const line = document.createElementNS('http://www.w3.org/2000/svg','line');
  line.setAttribute('x1', xs[0]); line.setAttribute('y1', 60);
  line.setAttribute('x2', xs[n-1]); line.setAttribute('y2', 60);
  line.setAttribute('stroke','rgba(255,255,255,0.15)');
  line.setAttribute('stroke-width','2');
  line.setAttribute('stroke-dasharray','6,4');
  svg.appendChild(line);

  nodes.forEach((node, i) => {
    const x = xs[i];
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('class','route-node');
    g.setAttribute('transform',`translate(${x},60)`);
    if (node.period) {
      g.dataset.period = node.period;
      g.addEventListener('click', () => scrollToPeriod(node.period));
    }

    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('r','20');
    circle.setAttribute('class','route-node-circle');
    g.appendChild(circle);

    const icon = document.createElementNS('http://www.w3.org/2000/svg','text');
    icon.setAttribute('text-anchor','middle');
    icon.setAttribute('dominant-baseline','central');
    icon.setAttribute('class','route-node-icon');
    icon.setAttribute('font-size','14');
    icon.textContent = node.icon || (i + 1);
    g.appendChild(icon);

    const lbl = document.createElementNS('http://www.w3.org/2000/svg','text');
    lbl.setAttribute('text-anchor','middle');
    lbl.setAttribute('y','34');
    lbl.setAttribute('class','route-node-label');
    lbl.textContent = currentLang === 'zh' ? (node.labelZh || node.label) : (node.label?.split(' ').slice(-1)[0] || '');
    g.appendChild(lbl);

    if (node.duration) {
      const dur = document.createElementNS('http://www.w3.org/2000/svg','text');
      dur.setAttribute('text-anchor','middle');
      dur.setAttribute('y','-30');
      dur.setAttribute('class','route-node-duration');
      dur.textContent = node.duration;
      g.appendChild(dur);
    }

    svg.appendChild(g);
  });
}

/* ── PERIOD INTRO BLOCK ───────────────────────────────────────── */
function renderPeriodIntro(period) {
  if (!period.intro) return '';
  const i = period.intro;
  const isZh = currentLang === 'zh';
  const bio   = isZh ? (i.bioZh   || '') : (i.bioEn   || i.bioZh   || '');
  const style = isZh ? (i.styleZh || '') : (i.styleEn || i.styleZh || '');
  const name  = isZh ? (i.nameZh  || '') : (i.nameEn  || i.nameZh  || '');
  const alt   = isZh ? (i.nameZh  || period.labelZh || period.label)
                     : (i.nameEn  || period.label);
  return `
    <div class="period-intro-block">
      ${i.portraitImg ? `<img class="period-intro-portrait" src="${escHtml(i.portraitImg)}" alt="${escHtml(alt)}" loading="lazy">` : ''}
      <div class="period-intro-text">
        ${name ? `<div class="period-intro-name">${name}</div>` : ''}
        ${bio   ? `<p class="period-intro-bio">${bio}</p>`   : ''}
        ${style ? `<p class="period-intro-style">${style}</p>` : ''}
        ${i.quote ? `<blockquote class="period-intro-quote">${escHtml(i.quote)}<cite> — ${escHtml(i.quoteAuthor || '')}</cite></blockquote>` : ''}
      </div>
    </div>`;
}

/* ── PERIOD SECTIONS ──────────────────────────────────────────── */
function renderPeriodsContent() {
  const container = document.getElementById('periods-container');
  if (!container) return;
  container.innerHTML = '';

  currentMuseumPeriods.forEach(period => {
    const worksInPeriod = Object.entries(currentMuseumWorks)
      .filter(([, w]) => w.period === period.id)
      .sort(([,a],[,b]) => (a.routePos||99) - (b.routePos||99));

    const section = document.createElement('section');
    section.className = 'period-section';
    section.id        = `period-${period.id}`;
    section.dataset.period = period.id;

    if (currentRole === 'visitor') section.classList.add('collapsed');

    const desc  = currentLang === 'zh' ? (period.desc  || '') : (period.descEn  || period.desc || '');
    const title = currentLang === 'zh' ? (period.labelZh || period.label) : period.label;
    const exInfo = period.id === 'early_monet' && currentMuseumId === 'hkmoa' && currentMuseum?.exhibitionDesc
      ? `<div class="period-exhibition-note">${currentLang === 'zh' ? currentMuseum.exhibitionDesc.zh : currentMuseum.exhibitionDesc.en}</div>`
      : '';

    section.innerHTML = `
      <div class="period-header" onclick="togglePeriod('${period.id}')">
        <div class="period-header-stripe" style="background:${period.color || '#888'}"></div>
        <div class="period-header-text">
          <div class="period-label">${period.galleries || ''} · ${period.duration || ''}</div>
          <div class="period-title">${title}</div>
          ${period.years ? `<div class="period-years">${period.years}${period.chineseDynasty ? ' · ' + period.chineseDynasty : ''}</div>` : ''}
          <div class="period-desc">${desc}</div>
          ${exInfo}
          <div class="period-meta">
            <span class="period-badge">${worksInPeriod.length} works</span>
            ${period.duration ? `<span class="period-badge">${period.duration}</span>` : ''}
          </div>
        </div>
        <div class="period-toggle"></div>
      </div>
      <div class="period-body">
        ${renderPeriodIntro(period)}
        ${period.painters ? `<div class="painters-strip">${period.painters.map(p => `<div class="painter-chip">${p}</div>`).join('')}</div>` : ''}
        <div class="works-grid" id="grid-${period.id}">
          ${worksInPeriod.map(([acc, w]) => renderWorkCard(acc, w)).join('')}
        </div>
      </div>
    `;
    container.appendChild(section);
  });
}

function renderWorkCard(acc, w) {
  const isZh = currentLang === 'zh';
  const titlePrimary = isZh && w.titleZh ? w.titleZh : w.title;
  const titleAlt     = isZh ? w.title : (w.titleZh || '');
  const painterDisplay = w.painterZh
    ? (isZh ? `${w.painterZh}  ${w.painter}` : `${w.painter}  ${w.painterZh}`)
    : w.painter;
  const desc = isZh ? (w.desc || '') : (w.descEn || w.desc || '');
  const editBtn = hasRole('admin')
    ? `<button class="work-card-edit-btn" onclick="event.stopPropagation();openAccOverlay('${acc}',true)"
              data-zh="编辑" data-en="Edit">Edit</button>` : '';

  return `
    <div class="work-card" onclick="openAccOverlay('${acc}',false)" data-acc="${acc}">
      <div class="work-card-img-wrap">
        ${w.img
          ? `<img class="work-card-img" src="${w.img}" alt="${escHtml(w.title)}" loading="lazy"
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
             <div class="work-card-img-placeholder" style="display:none"></div>`
          : `<div class="work-card-img-placeholder"></div>`}
        <div class="work-card-acc">${acc}</div>
        <button class="work-card-play" onclick="event.stopPropagation();quickPlay('${acc}')"
                data-zh="播放" data-en="Play">Play</button>
        ${editBtn}
      </div>
      <div class="work-card-body">
        <div class="work-card-title">${escHtml(titlePrimary)}</div>
        ${titleAlt && titleAlt !== titlePrimary ? `<div class="work-card-title-alt">${escHtml(titleAlt)}</div>` : ''}
        <div class="work-card-painter">${escHtml(painterDisplay)} · ${w.dates || ''}</div>
        <div class="work-card-desc">${escHtml(desc).slice(0,120)}${desc.length>120?'…':''}</div>
      </div>
    </div>
  `;
}

function togglePeriod(periodId) {
  document.getElementById(`period-${periodId}`)?.classList.toggle('collapsed');
}

/* ── ACC SEARCH ───────────────────────────────────────────────── */
function accSearch(query) {
  if (!query) return;
  query = query.trim();

  // Exact acc match
  if (currentMuseumWorks[query]) {
    openAccOverlay(query, false);
    document.getElementById('nav-acc-input').value = '';
    track('search', { query, method: 'acc_exact' });
    return;
  }

  // Title search (case-insensitive, ZH or EN)
  const lower = query.toLowerCase();
  const found = Object.entries(currentMuseumWorks).find(([, w]) =>
    w.title?.toLowerCase().includes(lower) ||
    w.titleZh?.includes(query) ||
    w.painter?.toLowerCase().includes(lower)
  );
  if (found) {
    openAccOverlay(found[0], false);
    document.getElementById('nav-acc-input').value = '';
    track('search', { query, method: 'title_match' });
    return;
  }

  showToast(currentLang === 'zh' ? `未找到"${query}"` : `Not found: "${query}"`);
}

function recordVisit(acc) {
  visitStats[acc] = (visitStats[acc] || 0) + 1;
  idbPut('stats', { acc, count: visitStats[acc] });
  updateAdminStats();
}

function openAccOverlay(acc, editMode = false) {
  currentAcc = acc;
  const w    = currentMuseumWorks[acc];
  if (!w) return;

  recordVisit(acc);
  track('artwork_open', { acc });

  // Update notes context to this artwork
  loadNotesForContext(acc);
  updateNotesContext();

  const isZh = currentLang === 'zh';
  const titlePrimary = isZh && w.titleZh ? w.titleZh : w.title;
  const titleAlt     = isZh ? w.title : (w.titleZh || '');
  const painterDisplay = w.painterZh
    ? (isZh ? `${w.painterZh}  ${w.painter}` : `${w.painter}  ${w.painterZh}`)
    : w.painter;
  const desc   = isZh ? (w.desc || '') : (w.descEn || w.desc || '');
  const audio  = isZh ? (w.audioText || '') : (w.audioTextEn || w.audioText || '');

  const periodDef = currentMuseumPeriods.find(p => p.id === w.period);
  const periodLabel = periodDef
    ? (isZh ? periodDef.labelZh : periodDef.label)
    : (w.periodLabel || '');

  const canEdit  = hasRole('admin') || hasRole('lecturer');
  const editAttr = (editMode && canEdit) ? 'contenteditable="true"' : '';
  const editBtns = canEdit ? `
    ${editMode
      ? `<button class="acc-btn acc-btn-save" onclick="saveWorkEdit('${acc}')" data-zh="保存" data-en="Save">保存</button>`
      : `<button class="acc-btn acc-btn-edit" onclick="openAccOverlay('${acc}',true)" data-zh="编辑" data-en="Edit">编辑</button>`}` : '';

  const prevNext = getAdjacentWorks(acc);
  const prevW    = currentMuseumWorks[prevNext.prev];
  const nextW    = currentMuseumWorks[prevNext.next];
  const prevTitle = prevW ? (isZh && prevW.titleZh ? prevW.titleZh : prevW.title) : '';
  const nextTitle = nextW ? (isZh && nextW.titleZh ? nextW.titleZh : nextW.title) : '';

  const card     = document.getElementById('acc-card');
  card.innerHTML = `
    <div class="acc-card-header">
      <span class="acc-period-tag">${escHtml(periodLabel)}</span>
      ${w.gal ? `<span class="acc-gal-tag">${escHtml(w.gal)}</span>` : ''}
      <span class="acc-gal-tag" style="font-family:monospace">${acc}</span>
    </div>

    ${w.img ? `<img class="acc-card-img" src="${w.img}" alt="${escHtml(w.title)}"
                    onerror="this.style.display='none'" />` : ''}

    <h2 class="acc-title" id="edit-title">${escHtml(titlePrimary)}</h2>
    ${titleAlt && titleAlt !== titlePrimary ? `<div class="acc-title-alt">${escHtml(titleAlt)}</div>` : ''}
    <div class="acc-painter">${escHtml(painterDisplay)}</div>
    <div class="acc-dates">${w.dates || ''}</div>

    <div class="acc-desc" id="edit-desc" ${editAttr}>${escHtml(desc)}</div>

    <div class="acc-actions">
      <button class="acc-btn acc-btn-play" onclick="playAcc('${acc}')"
              data-zh="播放讲解" data-en="Play Audio">播放讲解</button>
      <button class="acc-btn" onclick="openMapForWork('${acc}')"
              data-zh="前往展厅" data-en="Navigate">前往展厅</button>
      ${editBtns}
    </div>

    ${hasRole('lecturer') ? `
    <details style="margin-top:12px">
      <summary style="color:rgba(255,255,255,0.5);font-size:0.82rem;cursor:pointer" data-zh="完整讲解脚本" data-en="Full Script">完整讲解脚本</summary>
      <div class="acc-audio-script" id="edit-audio" ${editAttr && hasRole('admin') ? 'contenteditable="true"' : ''}>${escHtml(audio)}</div>
    </details>` : ''}

    <div class="acc-nav">
      ${prevNext.prev ? `<button class="acc-nav-btn acc-nav-prev" onclick="openAccOverlay('${prevNext.prev}',false)"><span class="acc-nav-dir" data-zh="上一件" data-en="Prev">上一件</span> ${escHtml(prevTitle)}</button>` : '<div></div>'}
      ${prevNext.next ? `<button class="acc-nav-btn acc-nav-next" onclick="openAccOverlay('${prevNext.next}',false)">${escHtml(nextTitle)} <span class="acc-nav-dir" data-zh="下一件" data-en="Next">下一件</span></button>` : '<div></div>'}
    </div>
  `;

  document.getElementById('acc-overlay').classList.remove('hidden');
  setTimeout(() => playAcc(acc), 400);
  highlightRouteNode(w.period);
}

function closeAccOverlay() {
  document.getElementById('acc-overlay').classList.add('hidden');
  currentAcc = null;
  loadNotesForContext('general');
  updateNotesContext();
}

function getAdjacentWorks(acc) {
  const w = currentMuseumWorks[acc];
  if (!w) return { prev: null, next: null };
  const same = Object.entries(currentMuseumWorks)
    .filter(([, w2]) => w2.period === w.period)
    .sort(([,a],[,b]) => (a.routePos||99) - (b.routePos||99));
  const idx = same.findIndex(([a]) => a === acc);
  return {
    prev: idx > 0 ? same[idx - 1][0] : null,
    next: idx < same.length - 1 ? same[idx + 1][0] : null
  };
}

function openMapForWork() {
  if (!currentMuseum?.mapsUrl) return;
  window.open(currentMuseum.mapsUrl, '_blank');
}

/* ── NOTES PANEL (all users) ──────────────────────────────────── */
function toggleNotesPanel() {
  const panel = document.getElementById('notes-panel');
  if (!panel) return;
  const isOpen = panel.dataset.state === 'open';
  panel.dataset.state = isOpen ? 'closed' : 'open';
  track('notes_toggle', { action: isOpen ? 'close' : 'open' });
}

function updateNotesContext() {
  const ctxEl = document.getElementById('notes-context');
  if (!ctxEl) return;
  if (currentAcc && currentMuseumWorks[currentAcc]) {
    const w = currentMuseumWorks[currentAcc];
    ctxEl.textContent = currentLang === 'zh' && w.titleZh ? w.titleZh : w.title;
  } else {
    const m = currentMuseum;
    ctxEl.textContent = m ? (currentLang === 'zh' ? m.name.zh : m.name.en) : '';
  }
}

async function saveNotes() {
  const ta   = document.getElementById('notes-textarea');
  if (!ta) return;
  const text = ta.value;
  await initIDB();
  await idbPut('notes', {
    id: notesContext,
    text,
    museum: currentMuseumId,
    acc:    currentAcc || null,
    saved:  new Date().toISOString()
  });
  const statusEl = document.getElementById('notes-save-status');
  if (statusEl) statusEl.textContent = currentLang === 'zh' ? '已保存' : 'Saved';
  setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 2000);
  track('notes_save', { contextKey: notesContext });
}

async function exportNotes() {
  await initIDB();
  const all = await idbGetAll('notes');
  if (!all.length) {
    showToast(currentLang === 'zh' ? '笔记为空' : 'No notes to export');
    return;
  }
  const m = currentMuseum;
  const header = [
    '═══════════════════════════════════════',
    '  Art Tour — 导览笔记 / Tour Notes',
    `  博物馆：${m ? (currentLang === 'zh' ? m.name.zh : m.name.en) : currentMuseumId}`,
    `  导览：yuetong`,
    `  开发：Ma Yuetong`,
    `  导出时间：${new Date().toLocaleString()}`,
    '═══════════════════════════════════════',
    ''
  ].join('\n');

  const body = all.map(n => {
    const works = getMuseumWorks(n.museum || 'met');
    const w     = n.acc ? works[n.acc] : null;
    return [
      `--- ${n.museum || 'met'} · ${n.acc ? (w?.title || n.acc) : 'General'} ---`,
      `    ${new Date(n.saved || 0).toLocaleString()}`,
      n.text || '',
      ''
    ].join('\n');
  }).join('\n');

  downloadFile(`art-tour-notes-${new Date().toISOString().slice(0,10)}.txt`, header + body, 'text/plain');
  track('notes_export');
}

// Auto-save notes every minute
setInterval(async () => {
  const ta = document.getElementById('notes-textarea');
  if (ta && ta.value && document.getElementById('notes-panel')?.dataset.state === 'open') {
    await saveNotes();
  }
}, 60000);

/* ── VOICE / TTS ──────────────────────────────────────────────── */
function setVoiceMode(mode) {
  voiceMode = mode;
  document.getElementById('voice-tts-btn')?.classList.toggle('active', mode === 'tts');
  const status = document.getElementById('voice-status');
  if (status) status.textContent = currentLang === 'zh' ? '系统语音 — 合成' : 'Synthetic voice';
  showToast(currentLang === 'zh' ? '已切换到系统TTS' : 'TTS mode active');
}

function playAcc(acc) {
  const w = currentMuseumWorks[acc];
  if (!w) return;
  const text = currentLang === 'zh' ? (w.audioText || w.desc || '') : (w.audioTextEn || w.audioText || w.descEn || '');
  const lang = currentLang === 'zh' ? 'zh-CN' : 'en-US';
  track('audio_play', { acc });
  playTTS(text, lang, w);
}

function quickPlay(acc) {
  currentAcc = acc;
  playAcc(acc);
}

function playTTS(text, lang, work) {
  if (!text) return;
  if (!window.speechSynthesis) { showToast('此浏览器不支持语音合成'); return; }
  speechSynthesis.cancel();
  ttsPaused = false;

  ttsUtterance      = new SpeechSynthesisUtterance(text);
  ttsUtterance.lang = lang;
  ttsUtterance.rate = ttsRate;

  const voices   = speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.lang === lang && (v.name.includes('Natural') || v.name.includes('Siri') || v.name.includes('Ting'))
  ) || voices.find(v => v.lang === lang);
  if (preferred) ttsUtterance.voice = preferred;

  ttsUtterance.onend = () => document.getElementById('audio-player').classList.add('hidden');
  speechSynthesis.speak(ttsUtterance);
  showAudioPlayer(work);
}

function showAudioPlayer(work) {
  const player = document.getElementById('audio-player');
  player.classList.remove('hidden');
  document.getElementById('audio-playing-title').textContent   = work ? (currentLang === 'zh' && work.titleZh ? work.titleZh : work.title) : '';
  document.getElementById('audio-playing-painter').textContent  = work?.painter || '';
  const pauseBtn = document.getElementById('audio-pause-btn');
  if (pauseBtn) pauseBtn.textContent = currentLang === 'zh' ? '暂停' : 'Pause';
  ttsPaused = false;
}

function pauseAudio() {
  if (!window.speechSynthesis) return;
  const pauseBtn = document.getElementById('audio-pause-btn');
  if (ttsPaused) {
    speechSynthesis.resume();
    if (pauseBtn) pauseBtn.textContent = currentLang === 'zh' ? '暂停' : 'Pause';
    ttsPaused = false;
  } else {
    speechSynthesis.pause();
    if (pauseBtn) pauseBtn.textContent = currentLang === 'zh' ? '继续' : 'Resume';
    ttsPaused = true;
  }
}

function stopAudio() {
  if (elAudio)  { elAudio.pause(); elAudio = null; }
  if (window.speechSynthesis) speechSynthesis.cancel();
  document.getElementById('audio-player').classList.add('hidden');
  ttsPaused = false;
}

function setRate(val) {
  ttsRate = parseFloat(val);
  document.getElementById('rate-val').textContent = `${ttsRate.toFixed(1)}x`;
}

function prevWork() {
  if (!currentAcc) return;
  const { prev } = getAdjacentWorks(currentAcc);
  if (prev) openAccOverlay(prev, false);
}

function nextWork() {
  if (!currentAcc) return;
  const { next } = getAdjacentWorks(currentAcc);
  if (next) openAccOverlay(next, false);
}

/* ── NAVIGATION ───────────────────────────────────────────────── */
function scrollToPeriod(periodId) {
  const el = document.getElementById(`period-${periodId}`);
  if (!el) return;
  el.classList.remove('collapsed');
  currentPeriod = periodId;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setActivePeriodUI(periodId);
  track('zone_click', { zone: periodId });
}

function setActivePeriodUI(periodId) {
  document.querySelectorAll('.nav-period-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.period === periodId));
  document.querySelectorAll('.mobile-period-chip').forEach(c =>
    c.classList.toggle('active', c.dataset.period === periodId));
  document.querySelector(`.mobile-period-chip[data-period="${periodId}"]`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function highlightRouteNode(periodId) {
  document.querySelectorAll('.route-node').forEach(n => n.classList.remove('active'));
  document.querySelector(`.route-node[data-period="${periodId}"]`)?.classList.add('active');
  visitedNodes.add(periodId);
  updateProgress();
}

function updateProgress() {
  const total = currentMuseumPeriods.length || 1;
  const done  = visitedNodes.size;
  const pct   = Math.round((done / total) * 100);
  const pctEl = document.getElementById('progress-pct');
  const fillEl= document.getElementById('progress-fill');
  const statEl= document.getElementById('progress-status');
  if (pctEl)  pctEl.textContent  = `${pct}%`;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (statEl) {
    const names = [...visitedNodes].map(id => {
      const p = currentMuseumPeriods.find(x => x.id === id);
      return p ? (currentLang === 'zh' ? (p.labelZh||p.label) : p.label) : id;
    });
    statEl.textContent = done === 0 ? (currentLang === 'zh' ? '尚未开始导览' : 'Tour not started')
      : done === total ? (currentLang === 'zh' ? `导览完成！全部 ${total} 个展区已访问` : `Tour complete! All ${total} zones visited`)
      : `${names.join('、')} (${done}/${total})`;
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── VISITOR LOG ──────────────────────────────────────────────── */
async function loadVisitorLog() {
  const all = await idbGetAll('visitors');
  renderVisitorLog(all);
  drawSourcePieChart(all);
  drawMuseumPieChart(all);
}

function renderVisitorLog(records) {
  const tbody = document.getElementById('visitor-table-body');
  if (!tbody) return;
  const today = new Date().toISOString().split('T')[0];

  const el = id => document.getElementById(id);
  if (el('vstat-total'))     el('vstat-total').textContent    = records.length;
  if (el('vstat-today'))     el('vstat-today').textContent    = records.filter(r => r.date === today).length;
  if (el('vstat-countries')) el('vstat-countries').textContent = new Set(records.map(r => (r.country||'').trim())).size;
  if (el('vstat-cities'))    el('vstat-cities').textContent   = new Set(records.map(r => (r.city||'').trim())).size;

  drawCityPieChart(records);

  if (!records.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="visitor-empty">暂无访客记录 · No visitors yet</td></tr>';
    return;
  }
  tbody.innerHTML = [...records].reverse().map((r, i) => `
    <tr>
      <td class="vrow-num">${records.length - i}</td>
      <td class="vrow-name">${escHtml(r.name || '')}</td>
      <td>${escHtml(r.museum || r.museumId || 'met')}</td>
      <td>${escHtml(r.city || '')}</td>
      <td class="vrow-country">${escHtml(r.country || '')}</td>
      <td>${escHtml(r.source || '')}</td>
      <td>${r.date || ''}</td>
      <td style="font-family:monospace;font-size:0.8em">${r.password || ''}</td>
    </tr>
  `).join('');
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function populateVisitorFilter() {
  const sel = document.getElementById('visitor-filter-museum');
  if (!sel) return;
  MUSEUMS_REGISTRY.forEach(m => {
    if (sel.querySelector(`[value="${m.id}"]`)) return;
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = m.name.zh;
    sel.appendChild(opt);
  });
}

async function filterVisitorLog() {
  const date    = document.getElementById('visitor-filter-date')?.value;
  const museum  = document.getElementById('visitor-filter-museum')?.value;
  let all       = await idbGetAll('visitors');
  if (date)             all = all.filter(r => r.date === date);
  if (museum && museum !== 'all') all = all.filter(r => (r.museumId || 'met') === museum);
  renderVisitorLog(all);
}

function clearVisitorFilter() {
  const d = document.getElementById('visitor-filter-date');
  const m = document.getElementById('visitor-filter-museum');
  if (d) d.value = '';
  if (m) m.value = 'all';
  loadVisitorLog();
}

async function exportVisitorCSV() {
  const all = await idbGetAll('visitors');
  if (!all.length) { showToast('暂无访客数据'); return; }
  const rows = [['#','姓名','博物馆','城市','国家','来源','日期','时间','访问码']];
  all.forEach((r, i) => rows.push([
    i+1, r.name, r.museum||r.museumId||'met', r.city, r.country,
    r.source||'', r.date, r.time||'', r.password||''
  ]));
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  downloadFile(`art-tour-visitors-${new Date().toISOString().slice(0,10)}.csv`, csv, 'text/csv');
  showToast('访客记录已导出');
}

/* ── PIE CHARTS ───────────────────────────────────────────────── */
function drawPieChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const entries = Object.entries(data).filter(([,v]) => v > 0).sort((a,b) => b[1]-a[1]).slice(0,8);
  if (!entries.length) return;

  const total  = entries.reduce((s,[,v]) => s+v, 0);
  const colors = ['#c9a84c','#8e354a','#4a6fa5','#5b8a6e','#a05a2c','#6b2d8b','#4a7fb5','#8b6914'];
  let angle    = -Math.PI / 2;
  const cx = W/2, cy = H/2, r = Math.min(W,H)/2 - 6;

  entries.forEach(([label, val], i) => {
    const slice = (val / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    angle += slice;
  });

  // Legend (truncated labels)
  ctx.font = '10px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  entries.slice(0,5).forEach(([label, val], i) => {
    const pct = Math.round((val/total)*100);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(W + 4, i * 16, 10, 10);
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fillText(`${label.slice(0,10)} ${pct}%`, W + 18, i * 16 + 9);
  });
}

function drawCityPieChart(records) {
  const counts = {};
  records.forEach(r => { const k = r.city?.trim()||'Unknown'; counts[k] = (counts[k]||0)+1; });
  drawPieChart('city-pie-chart', counts);
}

function drawSourcePieChart(records) {
  const counts = {};
  records.forEach(r => { const k = r.source||'unknown'; counts[k] = (counts[k]||0)+1; });
  drawPieChart('source-pie-chart', counts);
}

function drawMuseumPieChart(records) {
  const counts = {};
  records.forEach(r => { const k = r.museumId||r.museum||'met'; counts[k] = (counts[k]||0)+1; });
  drawPieChart('museum-pie-chart', counts);
}

function drawEventsPieChart(events) {
  const counts = {};
  events.forEach(e => { counts[e.type] = (counts[e.type]||0)+1; });
  drawPieChart('events-pie-chart', counts);
}

/* ── ADMIN ────────────────────────────────────────────────────── */
function togglePanel(type) {
  const panel = document.getElementById(`${type}-panel`);
  if (!panel) return;
  panel.classList.toggle('hidden');
  if (!panel.classList.contains('hidden') && type === 'admin') updateAdminStats();
  if (!panel.classList.contains('hidden') && type === 'visitor-log') loadVisitorLog();
}

function updateAdminStats() {
  if (!hasRole('admin')) return;
  const total = Object.values(visitStats).reduce((a,b) => a+b, 0);
  const el    = document.getElementById('stat-visits-num');
  if (el) el.textContent = total;

  const topList = document.getElementById('top-works-list');
  if (!topList) return;
  const sorted = Object.entries(visitStats).sort((a,b) => b[1]-a[1]).slice(0,5);
  topList.innerHTML = sorted.map(([acc, cnt]) => {
    const w = currentMuseumWorks[acc] || {};
    return `<li>${acc} — ${w.title||'?'} (${cnt})</li>`;
  }).join('') || '<li>暂无数据</li>';

  idbGetAll('events').then(events => drawEventsPieChart(events));
}

async function saveWorkEdit(acc) {
  const w = currentMuseumWorks[acc];
  if (!w) return;
  const descEl  = document.getElementById('edit-desc');
  const audioEl = document.getElementById('edit-audio');
  if (descEl)  { if (currentLang === 'zh') w.desc    = descEl.innerText; else w.descEn    = descEl.innerText; }
  if (audioEl) { if (currentLang === 'zh') w.audioText = audioEl.innerText; else w.audioTextEn = audioEl.innerText; }
  await idbPut('works', { ...w, acc });
  if (currentMuseumId === 'met') worksDbData[acc] = w;
  const cardEl = document.querySelector(`.work-card[data-acc="${acc}"]`);
  if (cardEl) cardEl.outerHTML = renderWorkCard(acc, w);
  openAccOverlay(acc, false);
  showToast('内容已保存');
}

function exportCSV() {
  const rows = [['Acc','Title','Painter','Period','Museum','Visits']];
  Object.entries(visitStats).forEach(([acc, cnt]) => {
    const w = currentMuseumWorks[acc] || {};
    rows.push([acc, w.title||'', w.painter||'', w.period||'', currentMuseumId, cnt]);
  });
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  downloadFile('art-tour-stats.csv', csv, 'text/csv');
}

function exportAllData() {
  const data = JSON.stringify({ works: currentMuseumWorks, stats: visitStats, museum: currentMuseumId }, null, 2);
  downloadFile('art-tour-data.json', data, 'application/json');
}

function resetStats() {
  if (!confirm('确定重置所有访问统计？')) return;
  visitStats = {};
  if (db) db.transaction('stats','readwrite').objectStore('stats').clear();
  updateAdminStats();
}

/* ── LANGUAGE TOGGLE ──────────────────────────────────────────── */
function toggleLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('artTourLang', currentLang);
  document.body.setAttribute('data-lang', currentLang);
  document.getElementById('lang-btn').textContent = currentLang === 'zh' ? 'EN' : '中文';
  applyDataLangText();
  renderNavPeriods();
  renderRoleBanner();
  renderRouteMap();
  renderPeriodsContent();
  updateProgress();
  updateNavForMuseum();
  updateNotesContext();
  if (currentAcc) openAccOverlay(currentAcc, false);
}

/* ── SCROLL SPY ───────────────────────────────────────────────── */
function initScrollSpy() {
  const sections = document.querySelectorAll('.period-section');
  if (!sections.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) setActivePeriodUI(e.target.dataset.period); });
  }, { rootMargin: '-60px 0px -40% 0px' });
  sections.forEach(s => obs.observe(s));
}

/* ── UTILS ────────────────────────────────────────────────────── */
function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:120px; left:50%; transform:translateX(-50%);
      background:rgba(253,245,247,0.97); color:#1a1a1a; padding:10px 22px;
      border-radius:30px; font-size:0.85rem; z-index:9000; font-family:sans-serif;
      border:1px solid #ede5e8; backdrop-filter:blur(12px);
      box-shadow:0 4px 24px rgba(142,53,74,0.12); transition:opacity 0.3s;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.display = 'block';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.style.display = 'none'; }, 300);
  }, 2500);
}

/* ── PWA INSTALL ──────────────────────────────────────────────── */
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferInstall = e;
  document.getElementById('install-banner')?.classList.remove('hidden');
});

function installPWA() {
  if (!deferInstall) return;
  deferInstall.prompt();
  deferInstall.userChoice.then(() => { deferInstall = null; dismissInstall(); });
}

function dismissInstall() {
  document.getElementById('install-banner')?.classList.add('hidden');
}

/* ── KEYBOARD ─────────────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeAccOverlay();
    if (document.getElementById('notes-panel')?.dataset.state === 'open') toggleNotesPanel();
  }
  if (e.key === ' ' && currentAcc && !e.target.matches('input,textarea,[contenteditable]')) {
    e.preventDefault(); pauseAudio();
  }
  if (e.key === 'ArrowRight' && currentAcc) { e.preventDefault(); nextWork(); }
  if (e.key === 'ArrowLeft'  && currentAcc) { e.preventDefault(); prevWork(); }
  if (e.key === '/' && !e.target.matches('input,textarea,[contenteditable]')) {
    e.preventDefault();
    document.getElementById('nav-acc-input')?.focus();
  }
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    e.preventDefault(); saveNotes();
  }
});

/* ── SERVICE WORKER ───────────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

/* ── BOOTSTRAP ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();

  if (window.speechSynthesis) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }

  // Init selector lang from saved lang
  const savedLang = localStorage.getItem('artTourLang') || 'zh';
  selectorLang = savedLang;
  currentLang  = savedLang;
  document.body.setAttribute('data-lang', currentLang);

  // Auto-login for non-visitor roles
  if (checkAutoLogin()) {
    startApp().then(() => initScrollSpy());
  } else {
    // Show museum selector
    renderMuseumGrid();
  }
});

/* ════════════════════════════════════════════════════════════════
   MET ART TOUR — SCRIPT.JS
   Three-role auth · TTS audio guide · IndexedDB persistence
   Acc# search · Route navigation · Admin CRUD
════════════════════════════════════════════════════════════════ */

'use strict';

/* ── CONSTANTS ────────────────────────────────────────────────── */
const PASSWORDS = {
  visitor:  '',
  lecturer: 'lecturer2026',
  admin:    'metadmin2026'
};

const ROLE_META = {
  visitor:  { icon: '👤', label: '普通用户', labelEn: 'Visitor',  cls: 'visitor'  },
  lecturer: { icon: '🎓', label: '讲解员',  labelEn: 'Lecturer', cls: 'lecturer' },
  admin:    { icon: '🏛️', label: '博物馆方', labelEn: 'Admin',    cls: 'admin'    }
};

/* ── STATE ────────────────────────────────────────────────────── */
let currentRole    = null;
let currentLang    = 'zh';
let currentAcc     = null;
let currentPeriod  = null;
let ttsUtterance   = null;
let ttsRate        = 1.0;
let ttsPaused      = false;
let visitStats     = {};  // acc -> count
let visitedNodes   = new Set();
let worksDbData    = {};  // merged: WORKS_DATA + IndexedDB edits
let deferInstall   = null;
let voiceMode      = 'tts';  // 'tts' | 'elevenlabs'
let elAudio        = null;   // current ElevenLabs HTMLAudioElement

/* ── IDB ──────────────────────────────────────────────────────── */
let db = null;
function initIDB() {
  return new Promise((res, rej) => {
    const req = indexedDB.open('MetTourDB', 2);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('works'))   d.createObjectStore('works',   { keyPath: 'acc' });
      if (!d.objectStoreNames.contains('notes'))   d.createObjectStore('notes',   { keyPath: 'id'  });
      if (!d.objectStoreNames.contains('stats'))   d.createObjectStore('stats',   { keyPath: 'acc' });
      if (!d.objectStoreNames.contains('settings'))d.createObjectStore('settings',{ keyPath: 'key' });
    };
    req.onsuccess = e => { db = e.target.result; res(db); };
    req.onerror   = e => { console.warn('IDB error', e); res(null); };
  });
}

function idbGet(store, key) {
  return new Promise(res => {
    if (!db) return res(null);
    const tx  = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => res(req.result || null);
    req.onerror   = () => res(null);
  });
}

function idbPut(store, obj) {
  return new Promise(res => {
    if (!db) return res();
    const tx  = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(obj);
    req.onsuccess = () => res();
    req.onerror   = () => res();
  });
}

function idbGetAll(store) {
  return new Promise(res => {
    if (!db) return res([]);
    const tx  = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => res(req.result || []);
    req.onerror   = () => res([]);
  });
}

/* ── AUTH ─────────────────────────────────────────────────────── */
function login(role, pwd) {
  if (role !== 'visitor' && pwd !== PASSWORDS[role]) {
    const errEl = document.getElementById('login-error');
    errEl.textContent = '密码错误，请重试 / Incorrect password';
    setTimeout(() => { errEl.textContent = ''; }, 2500);
    return;
  }
  localStorage.setItem('metTourRole', role);
  localStorage.setItem('metTourAuthed', '1');
  currentRole = role;
  startApp();
}

function logout() {
  if (!confirm('确定登出？/ Confirm logout?')) return;
  localStorage.removeItem('metTourRole');
  localStorage.removeItem('metTourAuthed');
  stopAudio();
  document.getElementById('app').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
  document.body.className = 'role-visitor';
}

function checkAutoLogin() {
  const saved = localStorage.getItem('metTourRole');
  const authed = localStorage.getItem('metTourAuthed');
  if (saved && authed === '1') {
    currentRole = saved;
    return true;
  }
  return false;
}

function hasRole(minRole) {
  const hierarchy = { visitor: 0, lecturer: 1, admin: 2 };
  return hierarchy[currentRole] >= hierarchy[minRole];
}

/* ── APP INIT ─────────────────────────────────────────────────── */
async function startApp() {
  await initIDB();
  await loadIDBWorks();
  await loadStats();
  await loadNotes();

  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');

  document.body.className = `role-${currentRole}`;
  currentLang = localStorage.getItem('metTourLang') || 'zh';
  document.body.setAttribute('data-lang', currentLang);

  renderNavPeriods();
  renderRoleBanner();
  renderRouteMap();
  renderPeriodsContent();
  applyRoleUI();
  updateAdminStats();
  document.getElementById('lang-btn').textContent = currentLang === 'zh' ? 'EN' : '中文';
}

async function loadIDBWorks() {
  worksDbData = JSON.parse(JSON.stringify(WORKS_DATA));
  if (!db) return;
  const edits = await idbGetAll('works');
  edits.forEach(w => {
    if (worksDbData[w.acc]) {
      Object.assign(worksDbData[w.acc], w);
    }
  });
}

async function loadStats() {
  const all = await idbGetAll('stats');
  all.forEach(s => { visitStats[s.acc] = s.count; });
}

async function loadNotes() {
  if (!hasRole('lecturer')) return;
  const saved = await idbGet('notes', 'main');
  if (saved) document.getElementById('notes-textarea').value = saved.text;
}

/* ── ROLE UI ──────────────────────────────────────────────────── */
function applyRoleUI() {
  const isLec   = hasRole('lecturer');
  const isAdmin = hasRole('admin');

  // Notes pad
  if (isLec) document.getElementById('notes-pad').classList.remove('hidden');
  // Admin panel + button
  if (isAdmin) {
    document.getElementById('btn-admin-panel').classList.remove('hidden');
  }
  // Route progress
  if (isLec) document.getElementById('route-progress').classList.remove('hidden');
  // Nav role badge
  const meta = ROLE_META[currentRole];
  document.getElementById('nav-role-icon').textContent  = meta.icon;
  document.getElementById('nav-role-label').textContent = meta.label;
}

function renderRoleBanner() {
  const meta = ROLE_META[currentRole];
  const banner = document.getElementById('role-banner');
  const messages = {
    visitor:  { zh: `欢迎！您正在以 ${meta.label} 身份导览 · 输入Acc号即可自助讲解`, en: `Welcome! Browse as Visitor · Enter Acc# for audio guide` },
    lecturer: { zh: `讲解员模式 · 全部内容可见 · 实时笔记已启用`, en: `Lecturer Mode · Full content · Live notes enabled` },
    admin:    { zh: `管理员模式 · 内容编辑已启用 · 点击作品卡可编辑文本`, en: `Admin Mode · Content editing enabled · Click artwork to edit` }
  };
  const msg = messages[currentRole];
  banner.textContent = currentLang === 'zh' ? msg.zh : msg.en;
  banner.className = `role-banner ${meta.cls}`;
}

function renderNavPeriods() {
  const container = document.getElementById('nav-periods');
  container.innerHTML = '';
  PERIODS.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'nav-period-btn';
    btn.textContent = currentLang === 'zh' ? p.labelZh : p.label;
    btn.dataset.period = p.id;
    btn.onclick = () => scrollToPeriod(p.id);
    container.appendChild(btn);
  });

  // Mobile period bar chips
  const mobileScroll = document.getElementById('mobile-period-scroll');
  if (mobileScroll) {
    mobileScroll.innerHTML = '';
    PERIODS.forEach(p => {
      const chip = document.createElement('button');
      chip.className = 'mobile-period-chip';
      chip.textContent = (currentLang === 'zh' ? p.labelZh : p.label);
      chip.dataset.period = p.id;
      chip.onclick = () => scrollToPeriod(p.id);
      mobileScroll.appendChild(chip);
    });
  }
}

/* ── ROUTE MAP SVG ────────────────────────────────────────────── */
function renderRouteMap() {
  const svg = document.getElementById('route-svg');
  svg.innerHTML = '';

  const n = ROUTE.length;
  const xs = ROUTE.map((_, i) => 60 + i * ((900 - 120) / (n - 1)));

  // Connecting line
  const line = document.createElementNS('http://www.w3.org/2000/svg','line');
  line.setAttribute('x1', xs[0]); line.setAttribute('y1', 60);
  line.setAttribute('x2', xs[n-1]); line.setAttribute('y2', 60);
  line.setAttribute('stroke','rgba(255,255,255,0.15)');
  line.setAttribute('stroke-width','2');
  line.setAttribute('stroke-dasharray','6,4');
  svg.appendChild(line);

  ROUTE.forEach((node, i) => {
    const x = xs[i];
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('class','route-node');
    g.setAttribute('transform',`translate(${x},60)`);
    if (node.period) {
      g.setAttribute('data-period', node.period);
      g.addEventListener('click', () => scrollToPeriod(node.period));
    }

    // Circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('r','20');
    circle.setAttribute('class','route-node-circle');
    g.appendChild(circle);

    // Icon text
    const icon = document.createElementNS('http://www.w3.org/2000/svg','text');
    icon.setAttribute('text-anchor','middle');
    icon.setAttribute('dominant-baseline','central');
    icon.setAttribute('class','route-node-icon');
    icon.setAttribute('font-size','16');
    icon.textContent = node.icon;
    g.appendChild(icon);

    // Label
    const lbl = document.createElementNS('http://www.w3.org/2000/svg','text');
    lbl.setAttribute('text-anchor','middle');
    lbl.setAttribute('y','34');
    lbl.setAttribute('class','route-node-label');
    lbl.textContent = currentLang === 'zh' ? node.labelZh : node.label.split(' ').slice(-1)[0];
    g.appendChild(lbl);

    // Gallery sub
    const sub = document.createElementNS('http://www.w3.org/2000/svg','text');
    sub.setAttribute('text-anchor','middle');
    sub.setAttribute('y','44');
    sub.setAttribute('class','route-node-sub');
    sub.textContent = node.gal;
    g.appendChild(sub);

    // Duration
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

/* ── PERIOD SECTIONS ──────────────────────────────────────────── */
function renderPeriodsContent() {
  const container = document.getElementById('periods-container');
  container.innerHTML = '';

  PERIODS.forEach(period => {
    const worksInPeriod = Object.entries(worksDbData)
      .filter(([acc, w]) => w.period === period.id)
      .sort(([,a],[,b]) => (a.routePos||99) - (b.routePos||99));

    const section = document.createElement('section');
    section.className = 'period-section';
    section.id = `period-${period.id}`;
    section.dataset.period = period.id;

    // Visitor collapses non-impressionism by default
    if (currentRole === 'visitor' && period.id !== 'gothic') {
      section.classList.add('collapsed');
    }

    const desc = currentLang === 'zh' ? period.desc : period.descEn;
    const title = currentLang === 'zh' ? period.labelZh : period.label;

    section.innerHTML = `
      <div class="period-header"
           onclick="togglePeriod('${period.id}')">
        <div class="period-header-stripe"></div>
        <div class="period-icon">${period.id === 'gothic' ? '⛪' : period.id === 'renaissance' ? '🎨' : period.id === 'baroque' ? '🕯️' : period.id === 'rococo' ? '🌸' : period.id === 'neoclassical' ? '🏛️' : period.id === 'romanticism' ? '🌪️' : '🌅'}</div>
        <div class="period-header-text">
          <div class="period-label">${period.galleries} · ${period.duration}</div>
          <div class="period-title">${title}</div>
          <div class="period-years">${period.years} · ${period.chineseDynasty}</div>
          <div class="period-desc">${desc}</div>
          <div class="period-meta">
            <span class="period-badge">🖼️ ${worksInPeriod.length} works</span>
            <span class="period-badge">⏱ ${period.duration}</span>
            <span class="period-badge">🏛️ Gal ${period.galleries}</span>
          </div>
        </div>
        <div class="period-toggle">▼</div>
      </div>
      <div class="period-body">
        <div class="painters-strip">
          ${period.painters.map(p => `<div class="painter-chip">🎨 ${p}</div>`).join('')}
        </div>
        <div class="works-grid" id="grid-${period.id}">
          ${worksInPeriod.map(([acc, w]) => renderWorkCard(acc, w)).join('')}
        </div>
      </div>
    `;

    container.appendChild(section);
  });
}

function renderWorkCard(acc, w) {
  const title   = currentLang === 'zh' && w.titleZh ? w.titleZh : w.title;
  const desc    = currentLang === 'zh' ? w.desc : (w.descEn || w.desc);
  const editBtn = hasRole('admin') ? `<button class="work-card-edit-btn" onclick="event.stopPropagation(); openAccOverlay('${acc}', true)">✏️</button>` : '';

  return `
    <div class="work-card" onclick="openAccOverlay('${acc}', false)" data-acc="${acc}">
      <div class="work-card-img-wrap">
        ${w.img
          ? `<img class="work-card-img" src="${w.img}" alt="${w.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div class="work-card-img-placeholder" style="display:none;">🖼️</div>`
          : `<div class="work-card-img-placeholder">🖼️</div>`
        }
        <div class="work-card-acc">${acc}</div>
        <button class="work-card-play" onclick="event.stopPropagation(); quickPlay('${acc}')" title="播放讲解">▶</button>
        ${editBtn}
      </div>
      <div class="work-card-body">
        <div class="work-card-title">${title}</div>
        <div class="work-card-painter">${w.painter} · ${w.dates || ''}</div>
        <div class="work-card-desc">${desc}</div>
      </div>
    </div>
  `;
}

function togglePeriod(periodId) {
  const section = document.getElementById(`period-${periodId}`);
  section.classList.toggle('collapsed');
}

/* ── ACC SEARCH ───────────────────────────────────────────────── */
function accSearch(acc) {
  if (!acc) return;
  const work = worksDbData[acc];
  if (!work) {
    alert(`未找到 Acc# ${acc}\nNot found. Please verify the accession number.`);
    return;
  }
  recordVisit(acc);
  openAccOverlay(acc, false);
  document.getElementById('nav-acc-input').value = '';
}

function recordVisit(acc) {
  visitStats[acc] = (visitStats[acc] || 0) + 1;
  idbPut('stats', { acc, count: visitStats[acc] });
  updateAdminStats();
}

function openAccOverlay(acc, editMode = false) {
  currentAcc = acc;
  const w = worksDbData[acc];
  if (!w) return;

  recordVisit(acc);

  const title  = currentLang === 'zh' && w.titleZh ? w.titleZh : w.title;
  const desc   = currentLang === 'zh' ? w.desc : (w.descEn || w.desc);
  const audio  = currentLang === 'zh' ? w.audioText : (w.audioTextEn || w.audioText);
  const period = PERIODS.find(p => p.id === w.period);

  const canEdit  = hasRole('admin') || hasRole('lecturer');
  const editAttr = (editMode && canEdit) ? 'contenteditable="true"' : '';
  const editBtns = canEdit ? `
    ${editMode
      ? `<button class="acc-btn acc-btn-save" onclick="saveWorkEdit('${acc}')">💾 保存编辑</button>`
      : `<button class="acc-btn acc-btn-edit" onclick="openAccOverlay('${acc}', true)">✏️ 编辑</button>`
    }` : '';

  const prevNext = getAdjacentWorks(acc);

  const card = document.getElementById('acc-card');
  card.innerHTML = `
    <div class="acc-card-header">
      <span class="acc-period-tag">
        ${period ? (currentLang === 'zh' ? period.labelZh : period.label) : w.periodLabel}
      </span>
      <span class="acc-gal-tag">📍 Gallery ${w.gal}</span>
      <span class="acc-gal-tag" style="font-family: monospace;">${acc}</span>
    </div>

    ${w.img ? `<img class="acc-card-img" src="${w.img}" alt="${w.title}" onerror="this.style.display='none'" />` : ''}

    <h2 class="acc-title" id="edit-title">${title}</h2>
    <div class="acc-painter">${w.painter}</div>
    <div class="acc-dates">${w.dates || ''}</div>

    <div class="acc-desc" id="edit-desc" ${editAttr}>${desc}</div>

    <div class="acc-actions">
      <button class="acc-btn acc-btn-play" onclick="playAcc('${acc}')">▶ 播放讲解 / Play</button>
      ${editBtns}
    </div>

    ${(hasRole('lecturer') || hasRole('admin')) ? `
    <details style="margin-top:12px;">
      <summary style="color:rgba(255,255,255,0.5);font-size:0.82rem;cursor:pointer;">🔊 完整音频脚本 / Full Audio Script</summary>
      <div class="acc-audio-script" id="edit-audio" ${editAttr && hasRole('admin') ? 'contenteditable="true"' : ''}>${audio}</div>
    </details>
    ` : ''}

    <div class="acc-nav">
      ${prevNext.prev ? `<button class="acc-nav-btn" onclick="openAccOverlay('${prevNext.prev}', false)">⏮ ${worksDbData[prevNext.prev]?.title || ''}</button>` : '<div></div>'}
      ${prevNext.next ? `<button class="acc-nav-btn" onclick="openAccOverlay('${prevNext.next}', false)" style="text-align:right">${worksDbData[prevNext.next]?.title || ''} ⏭</button>` : '<div></div>'}
    </div>
  `;

  document.getElementById('acc-overlay').classList.remove('hidden');

  // Auto-play TTS on open
  setTimeout(() => playAcc(acc), 400);

  // Highlight route node
  highlightRouteNode(w.period);
}

function closeAccOverlay() {
  document.getElementById('acc-overlay').classList.add('hidden');
  currentAcc = null;
}

function getAdjacentWorks(acc) {
  const w = worksDbData[acc];
  const sameperiod = Object.entries(worksDbData)
    .filter(([a, w2]) => w2.period === w.period)
    .sort(([,a],[,b]) => (a.routePos||99) - (b.routePos||99));
  const idx = sameperiod.findIndex(([a]) => a === acc);
  return {
    prev: idx > 0 ? sameperiod[idx-1][0] : null,
    next: idx < sameperiod.length - 1 ? sameperiod[idx+1][0] : null
  };
}

/* ── VOICE MODE ───────────────────────────────────────────────── */
function setVoiceMode(mode) {
  voiceMode = mode;
  document.getElementById('voice-tts-btn').classList.toggle('active', mode === 'tts');
  document.getElementById('voice-ai-btn').classList.toggle('active', mode === 'elevenlabs');

  if (mode === 'elevenlabs') {
    const apiKey  = localStorage.getItem('elApiKey');
    const voiceId = localStorage.getItem('elVoiceId');
    if (!apiKey || !voiceId) {
      promptElevenLabsConfig();
    } else {
      document.getElementById('voice-status').textContent = 'AI 语音已激活';
      showToast('✨ AI语音已启用 — 将使用ElevenLabs合成');
    }
  } else {
    document.getElementById('voice-status').textContent = '系统语音';
    showToast('🔊 已切换到系统TTS');
  }
}

function promptElevenLabsConfig() {
  const apiKey = prompt('请输入ElevenLabs API Key:\n(可在 elevenlabs.io 获取)');
  if (!apiKey) { setVoiceMode('tts'); return; }
  const voiceId = prompt('请输入Voice ID:\n(在ElevenLabs控制台 My Voices 中找到)');
  if (!voiceId) { setVoiceMode('tts'); return; }
  localStorage.setItem('elApiKey', apiKey.trim());
  localStorage.setItem('elVoiceId', voiceId.trim());
  document.getElementById('voice-status').textContent = 'AI 语音已激活';
  showToast('✅ ElevenLabs配置已保存 — AI语音已启用');
}

async function playElevenLabs(text, work) {
  const apiKey  = localStorage.getItem('elApiKey');
  const voiceId = localStorage.getItem('elVoiceId');
  if (!apiKey || !voiceId) { promptElevenLabsConfig(); return; }

  document.getElementById('voice-status').textContent = '合成中…';
  document.getElementById('audio-pause-btn').textContent = '⏳';

  try {
    const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.2, use_speaker_boost: true }
      })
    });

    if (!resp.ok) throw new Error(`ElevenLabs error ${resp.status}`);

    const blob = await resp.blob();
    const url  = URL.createObjectURL(blob);

    if (elAudio) { elAudio.pause(); URL.revokeObjectURL(elAudio.src); }
    elAudio = new Audio(url);
    elAudio.play();
    document.getElementById('audio-pause-btn').textContent = '⏸';
    document.getElementById('voice-status').textContent = 'AI 语音';
    showAudioPlayer(work);

    elAudio.onended = () => {
      document.getElementById('audio-player').classList.add('hidden');
      URL.revokeObjectURL(url);
    };
  } catch (err) {
    console.error('ElevenLabs failed:', err);
    document.getElementById('voice-status').textContent = '合成失败，回退TTS';
    showToast('⚠️ AI语音失败，使用系统TTS');
    const lang = currentLang === 'zh' ? 'zh-CN' : 'en-US';
    playTTS(text, lang, work);
  }
}

/* ── TTS AUDIO ────────────────────────────────────────────────── */
function playAcc(acc) {
  const w = worksDbData[acc];
  if (!w) return;
  const text = currentLang === 'zh' ? w.audioText : (w.audioTextEn || w.audioText);
  const lang = currentLang === 'zh' ? 'zh-CN' : 'en-US';
  if (voiceMode === 'elevenlabs') {
    playElevenLabs(text, w);
  } else {
    playTTS(text, lang, w);
  }
}

function quickPlay(acc) {
  currentAcc = acc;
  playAcc(acc);
}

function playTTS(text, lang, work) {
  if (!window.speechSynthesis) { alert('此浏览器不支持语音合成 / Speech synthesis not supported'); return; }
  speechSynthesis.cancel();
  ttsPaused = false;

  ttsUtterance = new SpeechSynthesisUtterance(text);
  ttsUtterance.lang  = lang;
  ttsUtterance.rate  = ttsRate;
  ttsUtterance.pitch = 1.0;

  // Prefer a natural voice
  const voices = speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.lang === lang && (v.name.includes('Natural') || v.name.includes('Siri') || v.name.includes('Ting'))
  ) || voices.find(v => v.lang === lang);
  if (preferred) ttsUtterance.voice = preferred;

  ttsUtterance.onend = () => {
    document.getElementById('audio-player').classList.add('hidden');
  };

  speechSynthesis.speak(ttsUtterance);
  showAudioPlayer(work);
}

function showAudioPlayer(work) {
  const player = document.getElementById('audio-player');
  player.classList.remove('hidden');
  document.getElementById('audio-playing-title').textContent  = work ? (currentLang === 'zh' && work.titleZh ? work.titleZh : work.title) : '';
  document.getElementById('audio-playing-painter').textContent = work?.painter || '';
  document.getElementById('audio-pause-btn').textContent = '⏸';
  ttsPaused = false;
}

function pauseAudio() {
  if (elAudio && !elAudio.paused) {
    elAudio.pause();
    document.getElementById('audio-pause-btn').textContent = '▶';
    return;
  }
  if (elAudio && elAudio.paused) {
    elAudio.play();
    document.getElementById('audio-pause-btn').textContent = '⏸';
    return;
  }
  if (!window.speechSynthesis) return;
  if (ttsPaused) {
    speechSynthesis.resume();
    document.getElementById('audio-pause-btn').textContent = '⏸';
    ttsPaused = false;
  } else {
    speechSynthesis.pause();
    document.getElementById('audio-pause-btn').textContent = '▶';
    ttsPaused = true;
  }
}

function stopAudio() {
  if (elAudio) { elAudio.pause(); elAudio = null; }
  if (window.speechSynthesis) speechSynthesis.cancel();
  document.getElementById('audio-player').classList.add('hidden');
  ttsPaused = false;
}

function setRate(val) {
  ttsRate = parseFloat(val);
  document.getElementById('rate-val').textContent = `${ttsRate.toFixed(1)}x`;
  if (ttsUtterance && speechSynthesis.speaking && !ttsPaused) {
    // Re-speak with new rate (Safari/Chrome don't support dynamic rate)
    const currentAcc2 = currentAcc;
    speechSynthesis.cancel();
    if (currentAcc2) setTimeout(() => playAcc(currentAcc2), 100);
  }
}

function prevWork() {
  if (!currentAcc) return;
  const { prev } = getAdjacentWorks(currentAcc);
  if (prev) { openAccOverlay(prev, false); }
}

function nextWork() {
  if (!currentAcc) return;
  const { next } = getAdjacentWorks(currentAcc);
  if (next) { openAccOverlay(next, false); }
}

/* ── NAVIGATION ───────────────────────────────────────────────── */
function scrollToPeriod(periodId) {
  const el = document.getElementById(`period-${periodId}`);
  if (!el) return;
  el.classList.remove('collapsed');
  currentPeriod = periodId;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setActivePeriodUI(periodId);
}

function setActivePeriodUI(periodId) {
  document.querySelectorAll('.nav-period-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.period === periodId);
  });
  const mobileChips = document.querySelectorAll('.mobile-period-chip');
  mobileChips.forEach(c => {
    c.classList.toggle('active', c.dataset.period === periodId);
  });
  // Scroll active chip into view in mobile bar
  const activeChip = document.querySelector(`.mobile-period-chip[data-period="${periodId}"]`);
  if (activeChip) activeChip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function highlightRouteNode(periodId) {
  document.querySelectorAll('.route-node').forEach(n => n.classList.remove('active'));
  const node = document.querySelector(`.route-node[data-period="${periodId}"]`);
  if (node) node.classList.add('active');
  visitedNodes.add(periodId);
  updateProgress();
}

function updateProgress() {
  const total = PERIODS.length;
  const done  = visitedNodes.size;
  const pct   = Math.round((done / total) * 100);
  document.getElementById('progress-pct').textContent  = `${pct}%`;
  document.getElementById('progress-fill').style.width = `${pct}%`;

  const periodNames = [...visitedNodes].map(id => {
    const p = PERIODS.find(x => x.id === id);
    return p ? (currentLang === 'zh' ? p.labelZh : p.label) : id;
  });
  document.getElementById('progress-status').textContent =
    done === 0 ? '尚未开始导览' :
    done === total ? '🎉 导览完成！全部 ' + total + ' 个时期已访问' :
    `已访问：${periodNames.join('、')} (${done}/${total})`;
}

/* ── ADMIN: EDIT / CRUD ──────────────────────────────────────── */
async function saveWorkEdit(acc) {
  const w = worksDbData[acc];
  if (!w) return;

  const descEl  = document.getElementById('edit-desc');
  const audioEl = document.getElementById('edit-audio');

  if (descEl)  { if (currentLang === 'zh') w.desc  = descEl.innerText; else w.descEn  = descEl.innerText; }
  if (audioEl) { if (currentLang === 'zh') w.audioText = audioEl.innerText; else w.audioTextEn = audioEl.innerText; }

  await idbPut('works', { ...w, acc });
  worksDbData[acc] = w;

  // Re-render the card in its grid
  const cardEl = document.querySelector(`.work-card[data-acc="${acc}"]`);
  if (cardEl) cardEl.outerHTML = renderWorkCard(acc, w);

  openAccOverlay(acc, false);
  showToast('✅ 内容已保存到IndexedDB / Content saved');
}

function togglePanel(type) {
  const panel = document.getElementById(`${type}-panel`);
  panel.classList.toggle('hidden');
  if (!panel.classList.contains('hidden')) updateAdminStats();
}

function updateAdminStats() {
  if (!hasRole('admin')) return;
  const total = Object.values(visitStats).reduce((a,b) => a+b, 0);
  const el = document.getElementById('stat-visits-num');
  if (el) el.textContent = total;

  const topList = document.getElementById('top-works-list');
  if (!topList) return;
  const sorted = Object.entries(visitStats).sort((a,b) => b[1]-a[1]).slice(0,5);
  topList.innerHTML = sorted.map(([acc, cnt]) => {
    const w = worksDbData[acc];
    return `<li>${acc} — ${w?.title || '?'} (${cnt}次)</li>`;
  }).join('') || '<li>暂无数据</li>';
}

function exportCSV() {
  const rows = [['Acc', 'Title', 'Painter', 'Period', 'Visits']];
  Object.entries(visitStats).forEach(([acc, cnt]) => {
    const w = worksDbData[acc] || {};
    rows.push([acc, w.title||'', w.painter||'', w.period||'', cnt]);
  });
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  downloadFile('met-tour-stats.csv', csv, 'text/csv');
}

function exportAllData() {
  const data = JSON.stringify({ works: worksDbData, stats: visitStats }, null, 2);
  downloadFile('met-tour-data.json', data, 'application/json');
}

function resetStats() {
  if (!confirm('确定重置所有访问统计？')) return;
  visitStats = {};
  if (db) {
    const tx = db.transaction('stats','readwrite');
    tx.objectStore('stats').clear();
  }
  updateAdminStats();
}

/* ── NOTES (Lecturer) ─────────────────────────────────────────── */
async function saveNotes() {
  const text = document.getElementById('notes-textarea').value;
  await idbPut('notes', { id: 'main', text, saved: new Date().toLocaleString() });
  document.getElementById('notes-stamp').textContent = `已保存 · ${new Date().toLocaleString()}`;
  showToast('📝 笔记已保存');
}

function exportNotes() {
  const text = document.getElementById('notes-textarea').value;
  if (!text) { alert('笔记为空'); return; }
  const header = `大都会博物馆导览笔记\nMet Tour Notes\n讲解员：${ROLE_META.lecturer.label}\n日期：${new Date().toLocaleDateString()}\n${'─'.repeat(40)}\n\n`;
  downloadFile('met-tour-notes.txt', header + text, 'text/plain');
}

function exportNotesPDF() {
  window.print();
}

/* ── LANGUAGE TOGGLE ──────────────────────────────────────────── */
function toggleLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('metTourLang', currentLang);
  document.body.setAttribute('data-lang', currentLang);
  document.getElementById('lang-btn').textContent = currentLang === 'zh' ? 'EN' : '中文';

  // Re-render dynamic content
  renderNavPeriods();
  renderRoleBanner();
  renderRouteMap();
  renderPeriodsContent();
  updateProgress();
  if (currentAcc) openAccOverlay(currentAcc, false);
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
      border-radius:30px; font-size:0.85rem; z-index:900; font-family:sans-serif;
      border:1px solid #ede5e8; backdrop-filter:blur(12px);
      box-shadow:0 4px 24px rgba(142,53,74,0.12);
      transition:opacity 0.3s;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.display = 'block';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => { toast.style.display = 'none'; }, 300); }, 2500);
}

/* ── PWA INSTALL ──────────────────────────────────────────────── */
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferInstall = e;
  const banner = document.getElementById('install-banner');
  if (banner) banner.classList.remove('hidden');
});

function installPWA() {
  if (!deferInstall) return;
  deferInstall.prompt();
  deferInstall.userChoice.then(() => { deferInstall = null; dismissInstall(); });
}

function dismissInstall() {
  const banner = document.getElementById('install-banner');
  if (banner) banner.classList.add('hidden');
}

/* ── SCROLL SPY ────────────────────────────────────────────────── */
function initScrollSpy() {
  const sections = document.querySelectorAll('.period-section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setActivePeriodUI(e.target.dataset.period);
      }
    });
  }, { rootMargin: '-60px 0px -40% 0px' });
  sections.forEach(s => observer.observe(s));
}

/* ── KEYBOARD SHORTCUTS ──────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAccOverlay();
  if (e.key === ' ' && currentAcc && !e.target.matches('input,textarea')) {
    e.preventDefault();
    pauseAudio();
  }
  if (e.key === 'ArrowRight' && currentAcc) { e.preventDefault(); nextWork(); }
  if (e.key === 'ArrowLeft'  && currentAcc) { e.preventDefault(); prevWork(); }
  // Acc quick search: /
  if (e.key === '/' && !e.target.matches('input,textarea,[contenteditable]')) {
    e.preventDefault();
    document.getElementById('nav-acc-input')?.focus();
  }
});

/* ── SERVICE WORKER ─────────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ── BOOTSTRAP ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Load voices async (Chrome needs this)
  if (window.speechSynthesis) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }

  if (checkAutoLogin()) {
    startApp().then(() => initScrollSpy());
  }

  // Auto-save notes every 60s for lecturers
  setInterval(() => {
    if (hasRole('lecturer') && document.getElementById('notes-textarea')) {
      saveNotes();
    }
  }, 60000);
});

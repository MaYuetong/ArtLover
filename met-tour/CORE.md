# MET TOUR — CORE DESIGN DOCUMENT
_Art/met-tour/ · Multi-museum PWA guide · Last updated 2026-04-24_

---

## §1 Project Overview

A bilingual (ZH/EN) progressive web app for guided museum visits. Supports offline use (service worker), three user roles (visitor / lecturer / admin), TTS audio guides, dark mode, notes panel, and accessibility navigation. Museums: Met, AIC, KHM, HKMoA, DIA (content complete); MoMA, Van Gogh Museum, Louvre, Vatican, Tokyo, others (coming soon).

---

## §2 File Architecture

| File | Role |
|---|---|
| `index.html` | Shell, PWA meta, install banner |
| `style.css` | All styles — light + dark mode, responsive |
| `script.js` | App logic: routing, rendering, TTS, auth, IDB |
| `data.js` | Met works (WORKS_DATA), Met periods (PERIODS), route map (ROUTE) |
| `museums.js` | All other museums: registry, works, periods, helpers |
| `sw.js` | Service worker: cache-first core, stale-while-revalidate images |
| `manifest.json` | PWA manifest |

---

## §3 Data Structures

### WORKS_DATA / museum works (per work key)
```js
"acc.key": {
  title, titleZh, painter, painterZh, dates, gal,
  period,          // matches PERIODS[].id
  periodLabel,
  routePos,        // numeric sort order within period
  img,             // CC0 Wikimedia / Met CDN URL
  desc, descEn,
  audioText, audioTextEn,
  tags: []
}
```

### PERIODS / museum periods (per period)
```js
{
  id, label, labelZh, years, chineseDynasty?, galleries,
  duration, color,
  desc, descEn,
  painters: [],
  intro: {           // §6a — artist intro block
    portraitImg,     // CC0 Wikimedia Commons URL
    nameZh, nameEn,  // caption for portrait
    bioZh, bioEn,    // 2–3 paragraph biography
    styleZh, styleEn, // movement overview
    quote, quoteAuthor
  }
}
```

### ROUTE (Met only)
```js
{ label, labelZh, gal, icon, period?, duration? }
// icon: two-letter text code (Go, Re, Ba, Ro, Rm, Im, In, Ex)
// NO emoji — zero decorative symbols rule
```

---

## §4 UI Rules

### §4a Zero Decorative Symbols Rule
**No emoji, arrow HTML entities, ✗, or decorative unicode anywhere in the UI.**
- Buttons use bilingual text spans: `<span data-zh="上一件" data-en="Prev">上一件</span>`
- ROUTE icon field uses two-letter codes only (rendered in SVG text)
- PWA install banner close button: text "关闭 / Close" not ✗
- Acc-nav prev/next: text not `&larr;`/`&rarr;`

### §4b Visitor Form Address Field
First field of visitor form is **museum address** (pre-filled from `currentMuseum.address`), not museum name.

### §4c Bilingual Pattern
All dynamic content uses `data-zh` / `data-en` attributes on spans, or JS `currentLang === 'zh' ? zhString : enString` checks.

---

## §5 Period Intro Block

### §5a Design
Each period section opens with an artist intro block before the painters strip and works grid. Rendered by `renderPeriodIntro(period)` in script.js.

Layout:
- Portrait image (110×134px, sepia-tinted) — left
- Text column — right: name caption, biography paragraph, style overview paragraph, blockquote with cite

### §5b CSS Classes
```
.period-intro-block       flex container
.period-intro-portrait    portrait image
.period-intro-text        text column
.period-intro-name        caption / credit line
.period-intro-bio         biography paragraph (serif, 1.05rem)
.period-intro-style       style overview (0.875rem, secondary color)
.period-intro-quote       blockquote with gold left-border
```

### §5c Portrait Sources (CC0 / public domain)
All portraits from Wikimedia Commons. Key images:
- Giotto: `Ritratto_di_Giotto_da_Bondone.jpg`
- Raphael: `Raffaello_Sanzio.jpg` (self-portrait, Uffizi)
- Rembrandt: `Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg`
- Watteau: `Antoine_Watteau_-_Self-portrait_(1718-1719).jpg`
- David: `Jacques-Louis_David_-_Self-portrait_-_Google_Art_Project.jpg`
- Goya: `Goya_Selfportrait_1795-edit.jpg`
- Monet: `Claude_Monet_1899_Nadar_crop.jpg` (early/series) + `Claude_Monet_-_Self-Portrait_-_1917.jpg` (late)
- Seurat: `Georges_Seurat_-_Self-portrait_(1883).jpg`
- Hopper: `Edward_Hopper_self_portrait.jpg`
- El Greco: portrait via Met open access
- Bruegel: `Pieter_Bruegel_d._%C3%84._-_Selbstbildnis_(1565).jpg`
- Titian: `Tizian_083.jpg`
- Rubens (KHM): `Peter_Paul_Rubens_-_Self-Portrait_-_Kunsthistorisches_Museum_Wien.jpg`
- Vermeer: Art of Painting detail (no verified self-portrait)
- Holbein: `Holbein-d-j-selbstbildnis.jpg`
- Caravaggio: `Caravaggio_ottavio_leoni.jpg` (Leoni drawing)
- Delacroix: `Eug%C3%A8ne_Delacroix_-_Self-Portrait_-_WGA6235.jpg`
- Rivera: `Diego_Rivera_portrait.jpg`

---

## §6 Raphael Special Exhibition Module

Period id: `raphael_exhibition`  
Galleries: 619–621 · Duration: 30 min · Color: #1a3a6b  
Work "16.30ab" (Madonna and Child Enthroned with Saints) assigned to this period.

The Raphael exhibition is a distinct period entry in the PERIODS array, separate from `renaissance`. It has its own intro block with full biographical content about Raffaello Sanzio da Urbino.

---

## §7 Service Worker

Cache name: `met-tour-v2.2` (bump on every content deployment)  
Strategy:
- Core assets: cache-first
- Met CDN + Wikimedia + AIC IIIF images: stale-while-revalidate
- Everything else: network-first with cache fallback

---

## §8 Museum Content Status

| Museum | Works | Periods | Intros |
|---|---|---|---|
| Met (MET) | 25 | 8 (incl. Raphael exhibition) | All complete |
| AIC | 10 | 4 | All complete |
| KHM | 13 | 4 | All complete |
| HKMoA | 13 | 3 | All complete |
| DIA | 8 | 4 | All complete |

---

## §9 Deployment

Repo: `https://github.com/MaYuetong/ArtLover`  
Live: `https://mayuetong.github.io/ArtLover/`  
Branches: `main` → source, `gh-pages` → live  
Deploy: `git push origin main && git push origin main:gh-pages`

---

## §10 Analytics Backend — Google Apps Script Setup

### Step 1: Create Google Sheet
1. Go to sheets.google.com → New Sheet
2. Rename Sheet1 to **Registrations**
3. Add headers in row 1: `timestamp | password | name | country | province | city | visitDate | source | museum | address | onsite`
4. Add a second sheet named **Events**
5. Headers: `timestamp | sessionId | visitorId | visitorName | type | museum | acc | lang | details`
6. Add a third sheet named **Feedback**
7. Headers: `timestamp | visitorId | visitorName | museum | ratingOverall | ratingAudio | ratingContent | recommend | favorite | suggestions | email | worksViewed | lang`

### Step 2: Create Apps Script
1. In the Sheet: Extensions → Apps Script
2. Delete default code, paste this:

```javascript
const SS_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss   = SpreadsheetApp.openById(SS_ID);

    if (data.type === 'registration') {
      const sheet = ss.getSheetByName('Registrations');
      sheet.appendRow([
        new Date(data.timestamp).toISOString(),
        data.password, data.name, data.country,
        data.province || '', data.city, data.date,
        data.source, data.museum, data.address || '',
        data.onsite ? 'yes' : 'no'
      ]);
    } else if (data.type === 'events' && Array.isArray(data.events)) {
      const sheet = ss.getSheetByName('Events');
      data.events.forEach(ev => {
        const { id, timestamp, sessionId, visitorId, visitorName,
                type, museum, acc, lang, ...rest } = ev;
        sheet.appendRow([
          new Date(timestamp).toISOString(),
          sessionId || '', visitorId || '', visitorName || '',
          type, museum || '', acc || '', lang || '',
          JSON.stringify(rest)
        ]);
      });
    } else if (data.type === 'feedback') {
      const sheet = ss.getSheetByName('Feedback');
      sheet.appendRow([
        new Date(data.timestamp).toISOString(),
        data.visitorId || '', data.visitorName || '', data.museum || '',
        data.ratingOverall || '', data.ratingAudio || '', data.ratingContent || '',
        data.recommend === true ? 'yes' : data.recommend === false ? 'no' : '',
        data.favorite || '', data.suggestions || '', data.email || '',
        data.worksViewed || 0, data.lang || ''
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy
1. Click **Deploy** → **New deployment**
2. Type: **Web App**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy** → copy the URL (ends in `/exec`)

### Step 4: Configure
In `script.js` line 11:
```js
const ANALYTICS_ENDPOINT = 'https://script.google.com/macros/s/YOUR_ID/exec';
```

### What you'll see in the Sheet
- **Registrations** tab: one row per new visitor, with name/country/city/channel/museum
- **Events** tab: all behavior events — artwork views, audio plays, notes, period clicks, session duration

---

## §11 Visitor Registration Flow (v2.2+)

**New visitor:**
1. Visitor sees login screen → clicks "注册获取专属访客码"
2. Fills: museum address (pre-filled), visit date, name, country (+province if China), city, source channel
3. Clicks submit → receives unique code `VIS-XXXX-XXXX`
4. Browser prompts to save password (standard HTTP form + Credential Management API)
5. Clicks "进入导览" → enters the app

**Returning visitor:**
1. Browser auto-fills the saved `VIS-XXXX-XXXX` code
2. Click "进入" → app restores visitor session from IndexedDB

**Password format:** `VIS-XXXX-XXXX` (8 chars from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`)

**Tracking:** Every action post-login is tracked with `visitorId = password`, enabling per-visitor behavior analysis in Google Sheets.

---

## §12 Implementation Log

| Date | Change |
|---|---|
| 2026-04-24 | Artist/movement intro sections (§5) added to all 8 Met periods and 13 museum periods |
| 2026-04-24 | Raphael special exhibition module (§6) created as separate period |
| 2026-04-24 | Visitor form address field fixed (§4b) |
| 2026-04-24 | Zero decorative symbols: acc-nav arrows, PWA close button, ROUTE icons |
| 2026-04-24 | `renderPeriodIntro()` function added to script.js |
| 2026-04-24 | Service worker bumped to v2.2 |

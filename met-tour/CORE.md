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

## §10 Implementation Log

| Date | Change |
|---|---|
| 2026-04-24 | Artist/movement intro sections (§5) added to all 8 Met periods and 13 museum periods |
| 2026-04-24 | Raphael special exhibition module (§6) created as separate period |
| 2026-04-24 | Visitor form address field fixed (§4b) |
| 2026-04-24 | Zero decorative symbols: acc-nav arrows, PWA close button, ROUTE icons |
| 2026-04-24 | `renderPeriodIntro()` function added to script.js |
| 2026-04-24 | Service worker bumped to v2.2 |

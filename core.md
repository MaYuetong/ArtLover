# CORE.md — Art Tour · Multi-Museum International Guide
# Repository: https://github.com/MaYuetong/ArtLover
# Working path: Art/met-tour/
# Rule: Extend in place. Never rebuild from scratch.

## 0. Core principle

Extend the existing `Art/met-tour/` codebase. Do not delete existing structure.
Read the current code first. Improve and extend in place.
Keep the app production-like, modular, and legally compliant.
If a feature creates legal or review risk, implement a safe compliant alternative
and explain the reason briefly.

---

## 1. Product goal

A premium international museum audio guide and exhibition platform.
Works on mobile, tablet, and desktop.
Feel: elegant, calm, minimal, museum-grade.
No emoji. No decorative symbols anywhere in the UI.
Colors: clean, semi-transparent whites, refined text colors.
Think: MoMA.org meets Apple Museum app. Not dark medieval.

---

## 2. Museums — 12 total

| # | Museum | City | Special |
|---|---|---|---|
| 1 | The Metropolitan Museum of Art | New York | European paintings, Raphael exhibition |
| 2 | Museum of Modern Art (MoMA) | New York | — |
| 3 | Art Institute of Chicago | Chicago | — |
| 4 | Detroit Institute of Arts | Detroit | Rivera murals, Flemish Renaissance |
| 5 | Hong Kong Museum of Art | Hong Kong | Monet: Light & Shadow, 2026.4.24–7.29 |
| 6 | Van Gogh Museum | Amsterdam | — |
| 7 | Museum of the City of New York | New York | NYC 250th Anniversary exhibition |
| 8 | Museum of Broadway | New York | — |
| 9 | Kunsthistorisches Museum | Vienna | Habsburg Imperial Collection |
| 10 | Musée du Louvre | Paris | — |
| 11 | Vatican Museums | Vatican City | — |
| 12 | Tokyo National Museum | Tokyo | — |

Each museum entry must include:
- Name in Chinese and English
- Full address (pre-filled in visitor form)
- Recommended visit duration
- Google Maps navigation link (opens in new tab on mobile)
- Blurred representative artwork as background
- On-site toggle visible on the museum selection card itself
  (not hidden inside the form — ask the visitor here, with the note:
  "Please answer honestly / 请如实选择，以便为您提供更合适的参观建议")

Museums with full content: Met, AIC, KHM, HKMoA, DIA.
Others: show placeholder card with "Coming Soon / 即将开放".

---

## 3. Museum selection — three modes

The entry screen must support three modes switchable from the top navigation:

### 3a. Map mode (default)
- SVG or canvas world map
- Only mark the 12 museums we support (no other museums)
- Include a visible legend explaining what the markers mean
- Clicking a marker opens the museum detail / selection card
- Clean, minimal cartographic style (no country fills, just outlines)

### 3b. Region / City mode
- Group by: Americas · Europe · Asia
- Filter tabs at top
- Cards in a clean grid

### 3c. Museum list mode
- Simple vertical list
- Name, city, one-line highlight, visit time
- Alphabetical or by region

Switching between modes is smooth (no page reload).
All three modes support Chinese and English.
On mobile, map mode degrades gracefully (tap marker → bottom sheet with info).

---

## 4. Visitor form and password generation

After selecting a museum, the visitor fills a form:

Fields (in order):
1. Museum address — pre-filled from registry, read-only
2. Visit date — today's date pre-filled
3. Name — text input
4. Country — text input with autocomplete
5. Province / State / City — text input
6. Source channel — radio: Xiaohongshu / Museum official website / LinkedIn / Friend / Other

After form submission:
- Generate a unique visitor password: `MMDD-XXXX` (4 uppercase alphanumeric, no I/O/0/1/l)
- Display the password prominently
- Trigger browser/Apple credential save:
  Use a hidden `<input type="text" name="username" autocomplete="username">` with the visitor's name,
  and a visible `<input type="password" name="password" autocomplete="new-password">` showing the
  generated code, inside a proper `<form>` with `method="post"` action="#". This reliably triggers
  Safari and Chrome's "Save Password" prompt.
- Bind password to visitor record in IDB
- After showing the password, show "Enter Guide / 进入导览" button

---

## 5. Visitor behavior tracking

Track all events in IDB `events` store after password entry.
Each event: `{ id, type, museum, acc, role, lang, sessionId, timestamp, data }`

Event types to track:
- `session_start` — when visitor enters the app
- `session_end` — when visitor exits or logs out
- `zone_click` — which exhibition zone was opened
- `artwork_open` — which artwork was opened, how long viewed
- `audio_play` — audio narration started
- `audio_pause` / `audio_stop`
- `search` — search query used
- `notes_open` / `notes_edit` / `notes_save` / `notes_export`
- `nav_forward` / `nav_back` — next/previous artwork navigation
- `map_open` — Maps link tapped
- `page_transition` — which screen transitions happened

Tracking must be:
- Separated from display logic
- Privacy-aware (no PII in event data beyond session ID)
- Surfaced in the admin dashboard as charts and summaries

---

## 6. Exhibition zones — internal structure

### 6a. Artist-focused exhibitions (e.g., Van Gogh, Monet, Raphael)
Opening section must include:
- Artist portrait or self-portrait image (verified, public domain)
- Biography: birth, death, nationality, major life events
- Style overview: what makes their work distinctive
- One signature quote by the artist (if available and verifiable)
- Then: chronological or thematic works

### 6b. Style/movement exhibitions (e.g., Impressionism, Baroque)
Opening section must include:
- Movement description: period, geography, defining characteristics
- List of representative artists in the movement
- Each artist then gets the same structure as 6a (portrait, bio, style, works)

### 6c. Met Raphael Exhibition (special module)
- Separate exhibition zone in the Met museum section
- Opens with Raphael biography and self-portrait
- Includes verified works from the current Met Raphael exhibition
- Bilingual, same content quality standard as other zones

### 6d. HKMoA Monet Exhibition
- Exhibition dates: 2026.4.24 – 2026.7.29
- Name: Monet: Light & Shadow / 莫奈光影传奇
- Zone structure: Early Monet / The Series Paintings / The Water Garden
- Each zone opens with a period-specific essay, then works

---

## 7. Artwork content standard

### 7a. Information accuracy
All artwork facts must be verified against multiple sources.
Never invent dates, accession numbers, or provenance.
Use the institution's own collection records as primary source.

### 7b. Content for each work (required)
1. What the painting depicts (scene, figures, objects)
2. When and why it was created (historical/personal context)
3. What makes it special (technique, significance, innovation)
4. Why it is worth seeing in person
5. Key visual details, hidden symbols, or clues in the image
6. What those details suggest or mean

### 7c. Chinese writing style
Model: Ba Jin (巴金).
Qualities: plain, sincere, emotionally direct, quietly literary.
Not academic. Not ornate. Each sentence earns its place.
Example tone: "这幅画让我想起了一个冬天的下午，光线就这样落在窗台上，什么也不说。"

### 7d. English writing style
Model: Jean-Jacques Rousseau.
Qualities: contemplative, philosophical, personal, connected to nature and feeling.
Not academic. Not museum-label neutral. Let the viewer feel something.
Example tone: "He did not paint the haystack. He painted the hour — that particular angle of autumn light that exists once and never returns."

---

## 8. Audio narration

### 8a. Voice presets per museum region
Do not use real public figures' voices (politicians, royalty, celebrities).
Reasons: Right of Publicity law, Apple App Store policy, legal liability.

Instead, define a voice character per region:
- Americas (Met, MoMA, AIC, DIA, MCNY, Broadway): authoritative, warm American English
- Hong Kong (HKMoA): clear, gentle Cantonese-accented Mandarin or English
- Europe (KHM, Louvre, Vatican): measured British English with classical gravitas
- Japan (Tokyo National): precise, respectful Japanese-style English or Mandarin

### 8b. Disclosure requirement (non-negotiable)
All narration must be clearly labeled: "AI synthesized voice / AI 合成语音"
This is required by Apple App Store guidelines and emerging AI transparency law.

### 8c. TTS implementation
Use Web Speech API (browser TTS) as the base.
Allow optional integration with ElevenLabs for higher-quality voices.
If ElevenLabs is integrated: show explicit user consent flow before sending any text.

### 8d. Language
Chinese narration: `lang="zh-CN"` (or `zh-HK` for HKMoA)
English narration: `lang="en-US"` (Americas) or `lang="en-GB"` (Europe)

---

## 9. Visual design language

### 9a. Global principles
- Zero emoji anywhere in the UI (no ✓ ▶ ← 🎨 etc.)
- Zero decorative symbols
- Typography: Cormorant Garamond (serif headings) + Instrument Sans (body)
- Colors: transparent and semi-transparent white surfaces, refined text colors
- Light mode is the default aesthetic — clean, gallery-white
- Dark mode available via toggle, persisted in localStorage

### 9b. Museum-specific design echoes
Each museum's page should respectfully echo its official design language:
- Met: warm cream, classical serif headings, generous margins
- MoMA: pure white, Helvetica-adjacent sans, minimal
- AIC: architectural, warm stone tones
- KHM: imperial gold accents, slightly formal
- HKMoA (Monet exhibition): soft blue-green, watercolor-adjacent
- Van Gogh Museum: warm ochre, energetic rhythm
- Louvre: French neoclassical, ivory and gold
Do not copy protected brand assets or trademarked identity.

### 9c. Language switching
Full Chinese / English toggle.
When English is active, the entire UI is English-only — no Chinese mixed in.
When Chinese is active, default labels are Chinese.

---

## 10. Notes system

### 10a. Availability
Available to all users (visitor, lecturer, admin).

### 10b. Behavior
- Floating panel on the right side of the screen on desktop and tablet
- Bottom sheet on mobile
- Always visible as a small tab on the right edge even when closed
- When an artwork is open, the note context switches to that artwork automatically
- When no artwork is open, note context is the current museum (general)
- Notes are stored per context key: `museumId:accession` or `museumId:general`

### 10c. Export format
Exported notes file must include:
- Museum name (Chinese + English)
- Exhibition name if applicable
- Artwork accession and title if applicable
- Note content
- Guide credit: yuetong
- Developer credit: Ma Yuetong
- Export timestamp

### 10d. Persistence
Notes saved to IDB `notes` store.
Auto-save every 60 seconds when panel is open.
Cmd+S / Ctrl+S triggers manual save.

---

## 11. Password / credential save trigger

To trigger Safari and Chrome's native "Save Password" prompt:

```html
<form id="visitor-auth-form" method="post" action="#">
  <input type="text" name="username" autocomplete="username"
         style="display:none" value="{visitorName}" />
  <input type="password" name="password" autocomplete="new-password"
         id="generated-password-field" value="{generatedPassword}"
         readonly style="..." />
</form>
```

On form submit, call `event.preventDefault()` then proceed with JS logic.
The browser sees a valid username+password form submission and offers to save.

---

## 12. Admin / curator dashboard

Accessible only to admin role.

### 12a. Visitor analytics
- Total visitors, today's count, country count, city count
- Source channel breakdown (pie chart)
- Museum distribution (pie chart)
- City distribution (pie chart)

### 12b. Behavior analytics
- Event type distribution (artwork opens, searches, audio plays, etc.)
- Top 5 most viewed artworks
- Session duration (when available)
- Filter by museum, date range

### 12c. Export
- Visitor CSV: name, museum, city, country, source, date, time, password
- Stats CSV: acc, title, painter, museum, view count

### 12d. Content update section (curator view)
A read-only panel showing:
- Last content update timestamp per museum
- Links to official museum exhibition pages for manual review

---

## 13. Content update sub-agent (future / scheduled)

Design the structure so a scheduled agent can later:
- Query recent (last 6 months) exhibition data per museum
- Flag new exhibitions worth adding as modules
- Draft Xiaohongshu copy (Chinese, visual-first, 500–800 characters)
- Draft LinkedIn post (English, professional tone, 200–300 words)
- Send a digest to yuetong's admin dashboard

If automation is not immediately practical, provide the data structure
and a manual "refresh" button in the admin panel that displays what
would be auto-generated.

---

## 14. Legal and app store compliance

### 14a. App Store evaluation
PWA-first architecture significantly reduces review risk.
No native app required unless offline maps or camera features are needed.

**If submitting to Apple App Store as a native wrapper (WKWebView):**
- Privacy policy required — visitor data handling must be explicit
- No deceptive use of real persons' names, voices, or likenesses
- Analytics disclosure required
- All AI-generated content (text, voice) must be disclosed to users

**If publishing on Google Play:**
- Same privacy disclosure requirements
- Voice synthesis disclosure required

**Highest risk items (address before any store submission):**
1. Voice impersonation of real people — NOT permitted; use anonymous TTS presets
2. Museum artwork images — only use CC0 / public domain / open-access images
   (Met Open Access, Wikimedia Commons, AIC IIIF open-access)
3. Museum brand names / logos — use only for identification, not in a way that suggests
   official endorsement

### 14b. PWA-first benefits
- No app store review required for initial distribution
- Shareable as URL (ideal for Xiaohongshu and LinkedIn links)
- iOS Safari supports PWA install + offline cache
- No commission on any future ticketing or donation integration

---

## 15. Implementation status (as of 2026-04-24)

### Completed
- museums.js: 12-museum registry + full artwork data for Met, AIC, KHM, HKMoA, DIA
- Museum selector screen with region filter
- Visitor registration form with source channel, onsite toggle, password generation
- Floating notes panel (all users, IDB-backed, export with guide/developer credit)
- Dark mode
- Bilingual ZH/EN toggle
- Behavior tracking (IDB events store)
- TTS audio narration
- Service worker v2.0 (offline cache)
- Admin dashboard with 3 pie charts and CSV export

### Next implementation priorities (in order)
1. Museum selector: add map mode + list mode + make on-site toggle visible on card
2. Visual redesign: remove all emoji/symbols, lighter cleaner palette, museum-specific accents
3. Artwork content rewrite: Ba Jin style (ZH), Rousseau style (EN), new content format
4. Artist intro sections with portrait/biography before works
5. Raphael special exhibition module at Met
6. Password credential save trigger (proper form autocomplete)
7. Voice preset characters per museum region (with AI disclosure)
8. Admin content update panel (manual curator digest)

---

## 16. Output requirements after implementation

When each batch of work is done, provide:
- List of files modified or added
- Summary of what changed and why
- Any assumptions made
- Any risky requirements replaced with safe alternatives and reason

---

## 17. Final instruction

Preserve existing Art/met-tour/ structure.
This is always an extension task, never a rebuild.
Every implementation step must keep the app working.

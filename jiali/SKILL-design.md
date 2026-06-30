# SKILL · 网站设计 (2026 前沿手法 → 可执行规则)

> 给奉家丽建艺术家网站时遵循。原则：**作品是主角，设计是隐形的画框。**
> 下面每条「趋势」都已翻译成「我具体怎么做」。研究来源见文末。

---

## 0. 核心心法 (Non-negotiables)

1. **画廊优先 (Gallery-driven)** —— 画面留白、低饱和 UI、零花哨干扰，让画自己说话。
2. **以人为本 (Human-centered)** —— 2026 已经过了「炫技动画」时代；好设计是「感觉对」而非「看起来酷」。先快、先清楚、先能用，再谈惊艳。
3. **克制的动效 (Motion with restraint)** —— 动效用来「引导注意力 + 叙事」，不是装饰。每个动画都要有理由。
4. **性能即设计** —— 慢 = 烂。响应式图片、懒加载、首屏 < 2.5s LCP。
5. **无障碍不可选** —— 对比度 ≥ 4.5:1、键盘可达、`alt` 写清楚、`prefers-reduced-motion` 必须尊重。

---

## 1. 三套方向（建站前先和艺术家选一套）

| 方向 | 气质 | 适合 | 关键手法 |
|---|---|---|---|
| **A. 美术馆极简** | 安静、高级、白盒子 | 写实 / 古典 / 工笔 | 大留白、网格画廊、细衬线标题、几乎无色 |
| **B. 暗黑大片** | 戏剧、沉浸、聚光灯 | 油画 / 浓色 / 抽象 | 深背景让色彩跳出、单画全屏、微光晕 |
| **C. 滚动叙事** | 故事性、策展感 | 有系列 / 有创作脉络 | scrollytelling，一屏一段，图文随滚动揭示 |

> 默认推荐 **A**，除非作品色彩很重（选 B）或她想讲创作故事（选 C）。可混合。

---

## 2. 2026 趋势 → 落地清单

### 🅐 动态排版 (Kinetic Typography)
- 标题用**变量字体 (variable font)**，hero 标题做轻微的字重 / 字宽过渡。
- 文字可随滚动 / 光标轻微位移，但正文绝不动。
- 中文标题推荐：思源宋体 / 仓耳今楷；英文：Fraunces、Instrument Serif（可变衬线）。

### 🅑 滚动叙事 (Scrollytelling)
- 把「关于 / 创作自述 / 系列介绍」拆成节奏化的小段，随滚动逐段揭示。
- 用 `IntersectionObserver` 触发淡入 / 位移，时间轴 0.4–0.6s，缓动 `cubic-bezier(.16,1,.3,1)`。
- 数据：滚动叙事平均带来更深的滚动深度与更长停留。别滥用——只在叙事区用。

### 🅒 View Transitions（画廊 → 详情 丝滑切换）
- 用 **View Transitions API** 做缩略图 → 大图的形变过渡（点画作时图无缝放大）。
- 这是 2026 让普通画廊「贵」起来的最低成本招数，必做。
- 降级：不支持的浏览器直接跳转，不报错。

### 🅓 Bento 网格
- 「关于」「展览」「联系」「精选系列」这类混合内容，用不对称卡片格（便当格）排，既有秩序又有变化。
- 作品主画廊**不要**用便当格——主画廊保持规整网格 / 瀑布流，尊重画的比例。

### 🅔 微交互 (Micro-interactions)
- hover：缩略图轻微提升 + 阴影加深（≤ 1.03 scale），光标变「查看」。
- 图片加载用模糊占位 (LQIP / blur-up)，不要白闪。
- 所有交互给 150–250ms 反馈。

### 🅕 WebGL / 3D（可选，谨慎）
- 仅当艺术家想要「数字艺术感」或有装置 / 雕塑作品时才上。
- 默认**不用**——对写实绘画反而喧宾夺主，且伤性能 / 无障碍。

### 🅖 暗黑美学（方向 B 时）
- 背景 `#0a0a0b`，正文 `#e8e8ea`，强调色取自画作主色。
- 画作四周留呼吸空间 + 极淡 inner glow，像美术馆射灯。

---

## 3. 信息架构 (IA)

```
首页 (Hero + 精选)
├── 作品 Works          ← 主画廊，可按 系列 / 年份 / 媒材 筛选
│   └── 作品详情 Work    ← 大图 + 元数据 + 上一张/下一张
├── 系列 Series（可选）  ← 如果作品成系列
├── 关于 About          ← 肖像 + 自述 + 简历/展览年表
├── 展览 Exhibitions    ← 时间轴
└── 联系 Contact        ← 邮件 + 社媒 +（可选）询价表单
```

- 作品详情页元数据直接读 `works.json`（见 SKILL-archive.md）。
- 上一张/下一张 + 键盘 ←/→ 导航 + ESC 返回画廊。

---

## 4. 技术栈与产物

- **单页静态站**，参照 `met-tour/` 模式：`index.html` + `style.css` + `script.js` + `works.json` +（可选）`sw.js` + `manifest.json`。
- 无构建步骤、纯静态、可直接 GitHub Pages / Vercel 部署。能跑 = 能改。
- 写一份 `CORE.md` 当作这个站的规格 + 版本日志（学 met-tour）。
- 双语：`lang` 切换 + 文案存 `i18n` 对象，不复制两份页面。

### 图片规则（硬性）
- 提供 `srcset` 多尺寸（420 / 800 / 1600 / 原图）+ `loading="lazy"` + `decoding="async"`。
- 缩略图 WebP/AVIF，详情大图保留高质量 JPG。
- 每张图 `alt` = 「标题，年份，媒材」。

---

## 5. 验收门槛 (Definition of Done)
- [ ] 手机 / 平板 / 桌面三档都顺（手机优先设计）
- [ ] Lighthouse：性能 ≥ 90，无障碍 ≥ 95
- [ ] 键盘可走完全部流程；`prefers-reduced-motion` 下动画关闭
- [ ] 所有图懒加载 + 响应式，无白闪、无布局抖动 (CLS≈0)
- [ ] 没有死链、没有占位文字、没有重复作品

---

### 研究来源 (2026)
- [Figma — Top Web Design Trends 2026](https://www.figma.com/resource-library/web-design-trends/)
- [Studio Meyer — Web Design Trends 2026 + Code Examples](https://studiomeyer.io/en/blog/webdesign-trends-2026)
- [Awwwards — Best Portfolio Websites](https://www.awwwards.com/websites/portfolio/)
- [Muzli — 100 Best Designer Portfolios 2026](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/)
- [Pixpa — 19 Artist Portfolio Websites 2026](https://www.pixpa.com/blog/artist-portfolio-websites)
- [Sitebuilder Report — Art Portfolios 2026](https://www.sitebuilderreport.com/inspiration/art-portfolios)

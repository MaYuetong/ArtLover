# SKILL · 作品档案整理 (Catalogue Raisonné 标准)

> 给奉家丽整理作品时遵循。目标：不只是一堆图，而是一份**可检索、可追溯、可传世**的学术级作品全集。
> 网站的数据直接来自这里产出的 `works.json`。

---

## 0. 原则
1. **稳定 ID** —— 每件作品一个永不变的编号 `Jiali-001`，是它一生的身份证。改标题、换系列，ID 不变。
2. **零重复** —— 全量两两比对 + 视觉确认，不只比相邻图。([[dedup-thoroughness]])
3. **事件式溯源** —— 来源 / 展览每发生一次就记一条，而不是写成一段模糊的话。
4. **可空但不可假** —— 信息缺就留空 + 标 `needs-confirm`，绝不编造年份 / 尺寸。

---

## 1. 文件处理流水线

```
assets/raw/            原始照片（HEIC/JPG/PNG，可乱序、可重复）
   │  ① 格式归一 HEIC→JPG，EXIF 保留拍摄日期
   ▼
Jiali-Archive/         统一命名 Jiali-001.jpg … 去重后的全集
   │  ② 裁切去背景/桌面、校正梯形、校色（贴近原作）
   ▼
Jiali-Archive-Edited/  母版（高清，存档 + 详情大图来源）
   │  ③ 生成网站多尺寸 WebP/AVIF
   ▼
web/img/{id}-{420,800,1600}.webp + {id}.jpg
```

去重流程（严格）：
1. 用感知哈希 (pHash) 全量两两比对，列出相似对。
2. **人眼复核**每一对（同一张不同光线 ≠ 重复；同系列相似构图 ≠ 重复）。
3. 重复的移到 `_duplicates/`，不删，留痕。
4. 记录最终唯一件数。

---

## 2. 元数据 Schema (`works.json`)

每件作品一条记录。`*` = 核心必填（缺则标 needs-confirm）。

```json
{
  "id": "Jiali-001",
  "title":      { "zh": "标题", "en": "Title" },     // *
  "year":       "2023",                               // * 或 "c.2023" / "2019–2021"
  "medium":     { "zh": "布面油画", "en": "Oil on canvas" }, // *
  "dimensions": { "h_cm": 120, "w_cm": 90, "d_cm": null },   // * 高×宽(×深)
  "series":     "夜行 / Nocturne",                    // 所属系列，可空
  "status":     "available",  // available | sold | nfs(非卖) | collection | commission
  "signature":  "右下角签名并标注年份",                // 签名/题识/钤印
  "edition":    null,          // 版画/复数作品填 "3/10"，独件留 null
  "location":   "艺术家工作室",  // 现藏地
  "provenance": [              // 事件式溯源，按时间
    { "year": "2023", "event": "艺术家创作", "owner": "艺术家" }
  ],
  "exhibitions":[             // 展览史
    { "year": "2024", "title": "群展名", "venue": "美术馆", "city": "北京" }
  ],
  "literature": [            // 著录/艺评/出版
    { "year": "2024", "ref": "《画册名》, 出版社, p.42" }
  ],
  "description":{ "zh": "创作背景 / 作品阐释", "en": "" },
  "tags":       ["人物", "夜景", "暖色"],
  "images": {
    "master": "Jiali-Archive-Edited/Jiali-001.jpg",
    "web":    "web/img/Jiali-001",     // 程序拼尺寸后缀
    "details":["web/img/Jiali-001-detail-1.webp"]  // 局部特写，可空
  },
  "flags": ["needs-confirm:dimensions"]   // 待核实项，建完站前要清空
}
```

> 受控词表 (controlled vocabulary)：`status`、`medium`（中英对照表）、`tags` 都用固定集合，方便筛选和一致性。

---

## 3. 顶层档案信息 (`artist.json`)

艺术家本人 + 全集层面的信息（关于页 / SEO 用）：
- 姓名（中/英/拼音）、生年、籍贯、现居地
- 一句话定位 + 长自述 (artist statement)
- 教育 / 经历 / 个展 / 群展 / 获奖 / 收藏（年表）
- 联系方式、社媒、代理画廊（如有）
- 媒材中英对照表、系列总览

---

## 4. 验收门槛
- [ ] 每件作品有稳定 ID，命名连续无跳号
- [ ] 唯一件数确认，`_duplicates/` 留痕，零重复
- [ ] 核心字段（标题/年份/媒材/尺寸/图）齐全，未知项标 `needs-confirm`
- [ ] 母版高清 + 网站多尺寸 WebP/AVIF 都已生成
- [ ] `works.json` + `artist.json` 通过 JSON 校验，能被网站直接读取

---

### 研究来源
- [Navigating.art — Demystifying metadata for art researchers](https://www.navigating.art/articles-from-navigatingart/demystifying-metadata-a-practical-introduction-for-art-researchers)
- [Journal Panorama — Digital Catalogues Raisonnés](https://journalpanorama.org/article/more-than-just-a-database/)
- [Artwork Archive — Documenting Provenance in the 21st Century](https://www.artworkarchive.com/blog/unconventional-provenance-documenting-art-ownership-in-the-21st-century)
- 内部模式参考：`evan/` 档案 + `met-tour/` 数据驱动站

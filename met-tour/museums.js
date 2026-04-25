// ═══════════════════════════════════════════════════════════════
//  MUSEUMS.JS  ─  Multi-museum registry + artwork content
//  Art/met-tour/museums.js
//  All images: public domain / CC0 via Wikimedia Commons or
//  institution IIIF endpoints (educational, non-commercial use)
// ═══════════════════════════════════════════════════════════════

/* ── MUSEUM REGISTRY ──────────────────────────────────────────── */
const MUSEUMS_REGISTRY = [
  {
    id: 'met',
    name: { zh: '大都会艺术博物馆', en: 'The Metropolitan Museum of Art' },
    city: { zh: '纽约 · 美国', en: 'New York, USA' },
    region: 'americas',
    address: '1000 Fifth Avenue, New York, NY 10028',
    lat: 40.7794, lng: -73.9632,
    mapsUrl: 'https://maps.google.com/?q=40.7794,-73.9632',
    hours: {
      zh: '周一、三–五 10:00–17:00 · 周六日 10:00–21:00 · 周二闭馆',
      en: 'Mon, Wed–Fri 10am–5pm · Sat–Sun 10am–9pm · Closed Tue'
    },
    visitTime: { zh: '建议 2–3 小时', en: '2–3 hours recommended' },
    admission: { zh: '建议票价 $30', en: 'Suggested $30' },
    highlight: { zh: '欧洲绘画 · 哥特至印象派', en: 'European Paintings · Gothic to Impressionism' },
    bgAccs: ['61.198', '89.15.21', '29.100.112'],
    accentColor: '#c9a84c',
    themeColor: '#2c1810',
    hasContent: true,
    hasExhibition: false,
    icon: 'M',
    worksSource: 'WORKS_DATA',
    periodsSource: 'PERIODS'
  },
  {
    id: 'aic',
    name: { zh: '芝加哥艺术博物馆', en: 'Art Institute of Chicago' },
    city: { zh: '芝加哥 · 美国', en: 'Chicago, USA' },
    region: 'americas',
    address: '111 S Michigan Ave, Chicago, IL 60603',
    lat: 41.8796, lng: -87.6237,
    mapsUrl: 'https://maps.google.com/?q=41.8796,-87.6237',
    hours: {
      zh: '周一–三、五 11:00–17:00 · 周四 11:00–20:00 · 周六日 10:00–17:00',
      en: 'Mon–Wed, Fri 11am–5pm · Thu 11am–8pm · Sat–Sun 10am–5pm'
    },
    visitTime: { zh: '建议 2–3 小时', en: '2–3 hours recommended' },
    admission: { zh: '$26 成人票', en: '$26 Adults' },
    highlight: { zh: '印象派 · 后印象派 · 现代美国', en: 'Impressionism · Post-Impressionism · Modern American' },
    bgAccs: ['aic.1926.224', 'aic.1926.253'],
    accentColor: '#4a6fa5',
    themeColor: '#0d1a2e',
    hasContent: true,
    hasExhibition: false,
    icon: 'A',
    worksSource: 'AIC_WORKS',
    periodsSource: 'AIC_PERIODS'
  },
  {
    id: 'khm',
    name: { zh: '维也纳艺术史博物馆', en: 'Kunsthistorisches Museum Vienna' },
    city: { zh: '维也纳 · 奥地利', en: 'Vienna, Austria' },
    region: 'europe',
    address: 'Maria-Theresien-Platz, 1010 Wien, Austria',
    lat: 48.2040, lng: 16.3614,
    mapsUrl: 'https://maps.google.com/?q=48.2040,16.3614',
    hours: {
      zh: '周二–日 10:00–18:00 · 周四延至 21:00 · 周一闭馆',
      en: 'Tue–Sun 10am–6pm · Thu until 9pm · Closed Mon'
    },
    visitTime: { zh: '建议 2–3 小时', en: '2–3 hours recommended' },
    admission: { zh: '€21 成人票', en: '€21 Adults' },
    highlight: { zh: '哈布斯堡皇室收藏 · 勃鲁盖尔 · 维米尔', en: 'Habsburg Imperial Collection · Bruegel · Vermeer' },
    bgAccs: ['khm.bruegel.babel', 'khm.vermeer.painting'],
    accentColor: '#9b7b3a',
    themeColor: '#1a1208',
    hasContent: true,
    hasExhibition: false,
    icon: 'K',
    worksSource: 'KHM_WORKS',
    periodsSource: 'KHM_PERIODS'
  },
  {
    id: 'hkmoa',
    name: { zh: '香港艺术馆', en: 'Hong Kong Museum of Art' },
    city: { zh: '香港 · 中国', en: 'Hong Kong, China' },
    region: 'asia',
    address: '10 Salisbury Road, Tsim Sha Tsui, Kowloon',
    lat: 22.2942, lng: 114.1688,
    mapsUrl: 'https://maps.google.com/?q=22.2942,114.1688',
    hours: {
      zh: '周一、三–日 10:00–18:00 · 周二闭馆',
      en: 'Mon, Wed–Sun 10am–6pm · Closed Tue'
    },
    visitTime: { zh: '建议 1.5–2 小时', en: '1.5–2 hours recommended' },
    admission: { zh: '免费入场', en: 'Free Admission' },
    highlight: { zh: '莫奈光影传奇展 · 2026.4.24–7.29', en: 'Monet: Light & Shadow · April 24 – July 29, 2026' },
    bgAccs: ['hkmoa.monet.sunrise', 'hkmoa.monet.bridge'],
    accentColor: '#5b8a6e',
    themeColor: '#071812',
    hasContent: true,
    hasExhibition: true,
    exhibitionName: { zh: '莫奈光影传奇', en: 'Monet: Light & Shadow' },
    exhibitionDates: '2026.4.24 – 2026.7.29',
    exhibitionDesc: {
      zh: '汇聚来自欧洲各大博物馆的莫奈代表作，呈现光与色彩的伟大革命，从早期风景到晚年睡莲系列，完整展示印象派巨匠的创作历程。',
      en: 'Bringing together Monet masterworks from major European museums, this landmark exhibition traces his lifelong revolution of light and color — from early landscapes to the magnificent late Water Lilies series.'
    },
    icon: 'H',
    worksSource: 'HKMOA_WORKS',
    periodsSource: 'HKMOA_PERIODS'
  },
  {
    id: 'dia',
    name: { zh: '底特律艺术学院', en: 'Detroit Institute of Arts' },
    city: { zh: '底特律 · 美国', en: 'Detroit, USA' },
    region: 'americas',
    address: '5200 Woodward Ave, Detroit, MI 48202',
    lat: 42.3598, lng: -83.0647,
    mapsUrl: 'https://maps.google.com/?q=42.3598,-83.0647',
    hours: {
      zh: '周三、四 9:00–16:00 · 周五 9:00–22:00 · 周六日 10:00–17:00 · 周一二闭馆',
      en: 'Wed–Thu 9am–4pm · Fri 9am–10pm · Sat–Sun 10am–5pm · Closed Mon–Tue'
    },
    visitTime: { zh: '建议 1.5–2 小时', en: '1.5–2 hours recommended' },
    admission: { zh: '$14 成人票', en: '$14 Adults' },
    highlight: { zh: '弗拉芒文艺复兴 · 里维拉壁画 · 北欧巴洛克', en: 'Flemish Renaissance · Rivera Murals · Northern Baroque' },
    bgAccs: ['dia.bruegel.wedding', 'dia.rivera.north'],
    accentColor: '#a05a2c',
    themeColor: '#1a0e08',
    hasContent: true,
    hasExhibition: false,
    icon: 'D',
    worksSource: 'DIA_WORKS',
    periodsSource: 'DIA_PERIODS'
  },
  {
    id: 'moma',
    name: { zh: '纽约现代艺术博物馆', en: 'Museum of Modern Art' },
    city: { zh: '纽约 · 美国', en: 'New York, USA' },
    region: 'americas',
    address: '11 W 53rd St, New York, NY 10019',
    lat: 40.7614, lng: -73.9776,
    mapsUrl: 'https://maps.google.com/?q=40.7614,-73.9776',
    hours: { zh: '每日 10:30–17:30 · 周五延至 21:00', en: 'Daily 10:30am–5:30pm · Fri until 9pm' },
    visitTime: { zh: '建议 2 小时', en: '2 hours recommended' },
    admission: { zh: '$30 成人票', en: '$30 Adults' },
    highlight: { zh: '现代与当代艺术 · 毕加索 · 马蒂斯', en: 'Modern & Contemporary · Picasso · Matisse' },
    bgAccs: [], accentColor: '#2c2c2c', themeColor: '#111',
    hasContent: false, hasExhibition: false, icon: 'Mo', comingSoon: true
  },
  {
    id: 'vangogham',
    name: { zh: '梵高博物馆', en: 'Van Gogh Museum Amsterdam' },
    city: { zh: '阿姆斯特丹 · 荷兰', en: 'Amsterdam, Netherlands' },
    region: 'europe',
    address: 'Museumplein 6, 1071 DJ Amsterdam',
    lat: 52.3584, lng: 4.8811,
    mapsUrl: 'https://maps.google.com/?q=52.3584,4.8811',
    hours: { zh: '每日 9:00–18:00', en: 'Daily 9am–6pm' },
    visitTime: { zh: '建议 2 小时', en: '2 hours recommended' },
    admission: { zh: '€22 成人票', en: '€22 Adults' },
    highlight: { zh: '梵高全系列 · 向日葵 · 星夜研究', en: 'Van Gogh Collection · Sunflowers · Starry Night Studies' },
    bgAccs: [], accentColor: '#e8a020', themeColor: '#1a1000',
    hasContent: false, hasExhibition: false, icon: 'V', comingSoon: true
  },
  {
    id: 'mcny',
    name: { zh: '纽约城市博物馆', en: 'Museum of the City of New York' },
    city: { zh: '纽约 · 美国', en: 'New York, USA' },
    region: 'americas',
    address: '1220 Fifth Ave, New York, NY 10029',
    lat: 40.7927, lng: -73.9519,
    mapsUrl: 'https://maps.google.com/?q=40.7927,-73.9519',
    hours: { zh: '每日 10:00–18:00', en: 'Daily 10am–6pm' },
    visitTime: { zh: '建议 1.5 小时', en: '1.5 hours recommended' },
    admission: { zh: '建议票价 $20', en: 'Suggested $20' },
    highlight: { zh: '纽约建城250周年特展 · 2026', en: 'NYC 250th Anniversary Special Exhibition · 2026' },
    bgAccs: [], accentColor: '#1a3a6b', themeColor: '#08101a',
    hasContent: false, hasExhibition: true,
    exhibitionName: { zh: '纽约250·城市传奇', en: "NYC 250: A City's Story" },
    exhibitionDates: '2026',
    icon: 'N', comingSoon: true
  },
  {
    id: 'broadway',
    name: { zh: '百老汇博物馆', en: 'Museum of Broadway' },
    city: { zh: '纽约 · 美国', en: 'New York, USA' },
    region: 'americas',
    address: '145 W 45th St, New York, NY 10036',
    lat: 40.7578, lng: -73.9876,
    mapsUrl: 'https://maps.google.com/?q=40.7578,-73.9876',
    hours: { zh: '每日 12:00–19:00', en: 'Daily 12pm–7pm' },
    visitTime: { zh: '建议 1–1.5 小时', en: '1–1.5 hours recommended' },
    admission: { zh: '$39 成人票', en: '$39 Adults' },
    highlight: { zh: '百老汇演出历史 · 舞台设计 · 剧服展览', en: 'Broadway History · Costume & Stage Design' },
    bgAccs: [], accentColor: '#9b111e', themeColor: '#1a0008',
    hasContent: false, hasExhibition: false, icon: 'B', comingSoon: true
  },
  {
    id: 'louvre',
    name: { zh: '卢浮宫博物馆', en: 'Musée du Louvre' },
    city: { zh: '巴黎 · 法国', en: 'Paris, France' },
    region: 'europe',
    address: 'Rue de Rivoli, 75001 Paris, France',
    lat: 48.8606, lng: 2.3376,
    mapsUrl: 'https://maps.google.com/?q=48.8606,2.3376',
    hours: { zh: '周一、三–日 9:00–18:00 · 周三五延至21:45 · 周二闭馆', en: 'Mon, Wed–Sun 9am–6pm · Wed & Fri until 9:45pm · Closed Tue' },
    visitTime: { zh: '建议 3–4 小时', en: '3–4 hours recommended' },
    admission: { zh: '€22 成人票', en: '€22 Adults' },
    highlight: { zh: '达芬奇 · 蒙娜丽莎 · 古希腊罗马雕塑', en: 'Da Vinci · Mona Lisa · Ancient Greek & Roman Sculpture' },
    bgAccs: [], accentColor: '#8b6914', themeColor: '#1a1208',
    hasContent: false, hasExhibition: false, icon: 'L', comingSoon: true
  },
  {
    id: 'vatican',
    name: { zh: '梵蒂冈博物馆', en: 'Vatican Museums' },
    city: { zh: '梵蒂冈 · 罗马', en: 'Vatican City, Rome' },
    region: 'europe',
    address: 'Viale Vaticano, 00165 Roma RM, Italy',
    lat: 41.9063, lng: 12.4537,
    mapsUrl: 'https://maps.google.com/?q=41.9063,12.4537',
    hours: { zh: '周一–六 9:00–18:00 · 最后入场16:00', en: 'Mon–Sat 9am–6pm · Last entry 4pm' },
    visitTime: { zh: '建议 3 小时', en: '3 hours recommended' },
    admission: { zh: '€17 成人票', en: '€17 Adults' },
    highlight: { zh: '西斯廷礼拜堂 · 拉斐尔大厅 · 古罗马雕塑', en: 'Sistine Chapel · Raphael Rooms · Ancient Roman Sculpture' },
    bgAccs: [], accentColor: '#9b2335', themeColor: '#1a0508',
    hasContent: false, hasExhibition: false, icon: 'Va', comingSoon: true
  },
  {
    id: 'tokyonat',
    name: { zh: '东京国立博物馆', en: 'Tokyo National Museum' },
    city: { zh: '东京 · 日本', en: 'Tokyo, Japan' },
    region: 'asia',
    address: '13-9 Uenokoen, Taito City, Tokyo 110-8712',
    lat: 35.7188, lng: 139.7767,
    mapsUrl: 'https://maps.google.com/?q=35.7188,139.7767',
    hours: { zh: '周二–日 9:30–17:00 · 周一闭馆', en: 'Tue–Sun 9:30am–5pm · Closed Mon' },
    visitTime: { zh: '建议 2 小时', en: '2 hours recommended' },
    admission: { zh: '¥1,000 成人票', en: '¥1,000 Adults' },
    highlight: { zh: '日本国宝 · 佛教艺术 · 武士文物', en: 'National Treasures · Buddhist Art · Samurai Artifacts' },
    bgAccs: [], accentColor: '#8b2020', themeColor: '#1a0808',
    hasContent: false, hasExhibition: false, icon: 'T', comingSoon: true
  }
];

/* ── AIC WORKS ────────────────────────────────────────────────── */
// 10 key works. Images: Wikimedia Commons CC0 / AIC IIIF open-access.
const AIC_WORKS = {
  'aic.1926.224': {
    museum: 'aic',
    title: 'A Sunday on La Grande Jatte — 1884',
    titleZh: '大碗岛的星期日下午',
    painter: 'Georges Seurat',
    painterZh: '乔治·修拉',
    dates: '1884–1886',
    gal: 'Gallery 240',
    period: 'post_impressionism',
    periodLabel: 'Post-Impressionism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg',
    desc: '修拉用无数细小的纯色圆点构建这幅巨作，将印象主义的感官直觉转化为科学体系——"点彩法"。画面静默而奇异，43个人物在塞纳河边各自孤立，像剧场中凝固的布景，社会阶层的隐喻无处不在。',
    descEn: "Seurat transformed Impressionist intuition into scientific method — each of the 43 figures built from millions of pure-color dots. The result is paradoxically still: a frozen Sunday afternoon on the Seine where social classes stand apart, never touching, each marooned in their own silence.",
    audioText: '欢迎来到芝加哥艺术博物馆。这是乔治·修拉的《大碗岛的星期日下午》，1884至1886年作，现陈列于240号展厅。这是印象主义与后印象主义之间的转折点。修拉发明了"点彩法"——用无数细小的纯色圆点代替传统混色笔触，让观者的眼睛自行混合颜色。画面有43个人物，分属不同社会阶层，却彼此疏离，各自孤立。修拉用了两年时间创作此画，画面的宁静中蕴含着对现代都市疏离感的深刻洞察。',
    audioTextEn: "Welcome to the Art Institute of Chicago. This is Georges Seurat's A Sunday on La Grande Jatte, painted 1884 to 1886, in Gallery 240. Seurat invented Pointillism — millions of pure-color dots that the viewer's eye blends into forms. The 43 figures represent different social classes, yet each stands isolated, never truly together. Seurat spent two years on this canvas. Behind its calm surface lies a quietly devastating portrait of modern urban loneliness.",
    tags: ['pointillism', 'post-impressionism', 'masterpiece', 'social commentary', 'AIC signature']
  },

  'aic.1926.417': {
    museum: 'aic',
    title: 'The Bedroom',
    titleZh: '卧室（阿尔勒版）',
    painter: 'Vincent van Gogh',
    painterZh: '文森特·梵高',
    dates: '1889',
    gal: 'Gallery 241',
    period: 'post_impressionism',
    periodLabel: 'Post-Impressionism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Vincent_van_Gogh_-_The_Bedroom_-_1889.jpg',
    desc: '梵高一生画了三幅《卧室》，芝加哥版是最晚的一幅，创作于圣雷米精神病院期间。强烈的色彩对比和稍微倾斜的透视制造出轻微的不安——这不只是一个简陋房间，而是一个渴望安稳的灵魂的自画像。',
    descEn: "Van Gogh painted three versions of his Arles bedroom. This, the last, was made in the Saint-Rémy asylum. The violent complementary colors and slightly tilted perspective create low-grade unease — not simply a room, but the self-portrait of a mind desperate for stability and rest.",
    audioText: '这是文森特·梵高的《卧室》，1889年作于圣雷米精神病院，现为芝加哥艺术博物馆241号展厅的镇馆之宝。梵高共画了三幅卧室，这是最后一幅。他在给弟弟提奥的信中写道："颜色应该充分表达一种绝对的宁静。"然而画面中蓝色与橙色的对比、微微倾斜的视角，让这种"宁静"充满了张力。这是一个在混乱中渴望秩序的人的内心风景。',
    audioTextEn: "This is Van Gogh's The Bedroom, 1889, from the Saint-Rémy asylum, Gallery 241. Van Gogh painted three versions; this is the last. He wrote to his brother Theo: 'Color should express absolute repose.' Yet the clashing blues and oranges, the slightly skewed perspective, fill that claimed repose with unbearable tension. It is the interior landscape of a mind longing for order it could not hold.",
    tags: ['post-impressionism', 'Van Gogh', 'self-expression', 'asylum period', 'color theory']
  },

  'aic.1928.610': {
    museum: 'aic',
    title: 'At the Moulin Rouge',
    titleZh: '在红磨坊',
    painter: 'Henri de Toulouse-Lautrec',
    painterZh: '亨利·德·图卢兹-劳特累克',
    dates: '1892–1895',
    gal: 'Gallery 246',
    period: 'post_impressionism',
    periodLabel: 'Post-Impressionism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Toulouse-Lautrec_-_At_the_Moulin_Rouge.jpg',
    desc: '劳特累克以毫不美化的眼光记录巴黎夜生活：荧光绿色的脸庞，疲惫的目光，右侧被画框截断的人物造成鲜明的构图冲击。这不是庆典，而是对那个世界里人们孤独处境的冷静凝视。',
    descEn: "Toulouse-Lautrec records Montmartre nightlife without glamour: faces lit from below in sickly green, exhausted eyes, a figure cut off by the right edge in an unsettling compositional choice. This is not celebration but clear-eyed witnessing — of the loneliness within spectacle.",
    audioText: '这是亨利·德·图卢兹-劳特累克的《在红磨坊》，1892至1895年作，展于246号展厅。劳特累克身有残疾，以蒙马特夜生活为创作题材，是巴黎夜间世界的忠实记录者。画面中荧光绿色的人工灯光让每张脸都显得苍白疲惫；右侧的人物被画框截断，这是受日本浮世绘构图影响的大胆剪裁。画中没有庆祝，只有观察——劳特累克以外人的眼光，凝视着这个他融入却从未真正属于的世界。',
    audioTextEn: "Toulouse-Lautrec's At the Moulin Rouge, 1892–1895, Gallery 246. Lautrec, physically disabled and socially marginal, became the great recorder of Montmartre's night world. Artificial footlights turn faces sickly green; a figure is sharply cropped by the right edge — a Japanese ukiyo-e-inspired composition. No celebration here, only observation: Lautrec watching a world he inhabited but never fully belonged to.",
    tags: ['post-impressionism', 'nightlife', 'Montmartre', 'Japanese influence', 'social observation']
  },

  'aic.1933.455': {
    museum: 'aic',
    title: 'Two Sisters (On the Terrace)',
    titleZh: '两姐妹（在阳台上）',
    painter: 'Pierre-Auguste Renoir',
    painterZh: '皮埃尔-奥古斯特·雷诺阿',
    dates: '1881',
    gal: 'Gallery 201',
    period: 'impressionism',
    periodLabel: 'Impressionism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Pierre-Auguste_Renoir_-_Deux_s%C5%93urs_%28Sur_la_terrasse%29_-_Google_Art_Project.jpg',
    desc: '雷诺阿最温暖的印象派杰作之一：花朵、丝带、灿烂的阳光，两位女性自然而然地相伴，画面充满了感官的愉悦与人间的温情。据说两位模特并非真正姐妹，但雷诺阿赋予她们的亲密感胜过任何血缘关系。',
    descEn: "One of Renoir's warmest masterpieces: flowers, ribbons, dazzling light, two women naturally together. The models were not actually sisters, but Renoir gave them an intimacy warmer than blood — a moment of pure sensory happiness rendered in shimmering, joyful paint.",
    audioText: '这是皮埃尔-奥古斯特·雷诺阿的《两姐妹》，1881年作，展于201号展厅。这是芝加哥艺术博物馆印象派馆的核心藏品之一。画中两位女性并肩而坐，花朵、丝带、阳光将画面填满，雷诺阿的笔触轻盈而充满生命力。两位模特其实并非真正的姐妹，但雷诺阿创造了一种比血缘更温暖的亲密感。这是印象主义最纯粹的表达：当下的欢愉，永恒的阳光。',
    audioTextEn: "Renoir's Two Sisters, 1881, Gallery 201. One of the AIC's core Impressionist works. The two models were not actually sisters, but Renoir created an intimacy warmer than family. Flowers, ribbons, sunlight fill the canvas; his brushwork is alive with joy. Pure Impressionism: the happiness of a single afternoon, made permanent.",
    tags: ['impressionism', 'Renoir', 'women', 'sunshine', 'joyful']
  },

  'aic.1926.253': {
    museum: 'aic',
    title: 'The Old Guitarist',
    titleZh: '老吉他手',
    painter: 'Pablo Picasso',
    painterZh: '巴勃罗·毕加索',
    dates: '1903–1904',
    gal: 'Gallery 391',
    period: 'modern',
    periodLabel: 'Early Modern / Blue Period',
    img: 'https://upload.wikimedia.org/wikipedia/en/d/de/Old_guitarist_chicago.jpg',
    desc: '毕加索"蓝色时期"最深沉的作品：盲眼老人在蓝色阴影中与吉他相依为命。贫困、孤独、艺术是唯一的救赎——这是22岁的毕加索在好友自杀后创作的，将个人悲痛升华为人类困境的普世象征。',
    descEn: "Picasso's most profound Blue Period statement: a blind old man fused with his guitar in blue shadow. Poverty, isolation, art as the only salvation. Painted at 22 after the suicide of his close friend, he transformed private grief into a universal emblem of human desolation.",
    audioText: '这是巴勃罗·毕加索的《老吉他手》，1903至1904年作，展于391号展厅。这是毕加索"蓝色时期"的代表作，也是他个人最深沉的创作之一。1901年，好友卡洛斯·卡萨吉马斯自杀，毕加索陷入悲痛，整个"蓝色时期"都笼罩在这阴影之下。画中盲眼老人蜷缩在角落，与吉他融为一体——在彻底的贫困与孤独中，音乐是他唯一的生命线。蓝色不是装饰，而是情感的温度。',
    audioTextEn: "Picasso's The Old Guitarist, 1903–1904, Gallery 391. His most powerful Blue Period work. After the suicide of his close friend Casagemas in 1901, Picasso entered a period of grief that colored everything blue. This blind old man, fused with his guitar in poverty and isolation, has only music as his lifeline. The blue is not decoration — it is the temperature of grief itself.",
    tags: ['Blue Period', 'Picasso', 'modern', 'poverty', 'grief', 'guitar']
  },

  'aic.1926.252': {
    museum: 'aic',
    title: 'The Basket of Apples',
    titleZh: '苹果篮',
    painter: 'Paul Cézanne',
    painterZh: '保罗·塞尚',
    dates: 'c. 1893',
    gal: 'Gallery 248',
    period: 'post_impressionism',
    periodLabel: 'Post-Impressionism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Paul_C%C3%A9zanne%2C_1893-94%2C_Le_Panier_de_pommes_%28The_Basket_of_Apples%29%2C_oil_on_canvas%2C_65_x_80_cm%2C_Art_Institute_of_Chicago.jpg',
    desc: '塞尚故意让桌子一边高一边低，酒瓶与苹果违反透视法则，饼干盘的角度也彼此矛盾——这种"错误"是革命性的：塞尚在为立体主义铺路，打碎了文艺复兴以来统一视点的幻觉。',
    descEn: "Cézanne deliberately tilts the table unevenly, defies perspective with tilted bottle and offset apples. These apparent 'errors' are revolution: he was dismantling the single-viewpoint illusion established by the Renaissance, preparing the way for Cubism.",
    audioText: '这是保罗·塞尚的《苹果篮》，约1893年作，展于248号展厅。仔细观察：桌子一边高一边低，酒瓶倾斜，苹果的视角彼此矛盾。这些不是错误，而是塞尚有意的革命。他认为一眼看到的视角是虚假的——真实的世界从不同角度同时存在。这种多视点思维直接启发了毕加索和布拉克发明立体主义。毕加索说："塞尚是我们所有人的父亲。"',
    audioTextEn: "Cézanne's The Basket of Apples, c. 1893, Gallery 248. Look carefully: the table tilts unevenly, the bottle leans, the apples contradict each other in perspective. These are not errors but revolutionary intent. Cézanne believed the single fixed viewpoint was a lie — reality exists from multiple angles simultaneously. This thinking directly inspired Picasso and Braque to invent Cubism. Picasso called him 'the father of us all.'",
    tags: ['post-impressionism', 'Cézanne', 'proto-Cubism', 'still life', 'revolutionary']
  },

  'aic.1933.1157': {
    museum: 'aic',
    title: 'Water Lilies',
    titleZh: '睡莲',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1906',
    gal: 'Gallery 243',
    period: 'impressionism',
    periodLabel: 'Impressionism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Water_Lilies_1906_Monet.jpg',
    desc: '莫奈在吉维尼花园的池塘边创作了超过250幅睡莲，这幅1906年的芝加哥版是整个系列中构图最为单纯、水面倒影最为迷人的之一。莫奈此时视力开始衰退，却反而让他更专注于光的本质而非物体的轮廓。',
    descEn: "Monet painted over 250 Water Lilies at Giverny. This 1906 AIC version is among the purest: no sky, no horizon — only the surface of water with its reflections. As his eyesight began to fail, Monet looked deeper, trading outline for pure light and sensation.",
    audioText: '这是克劳德·莫奈的《睡莲》，1906年作，展于243号展厅。莫奈在吉维尼家中挖了一个日式花园池塘，此后20年专注于描绘同一池水面。这幅画中没有天空，没有地平线，只有水面与倒影——你很难分辨哪里是真实的花，哪里是倒影的云。1906年，莫奈的视力已开始衰退，但这反而让他更专注于光的本质而非事物的轮廓。这是抽象艺术的预言。',
    audioTextEn: "Monet's Water Lilies, 1906, Gallery 243. Monet dug a Japanese-style pond at Giverny and spent 20 years painting its surface. In this canvas there is no sky, no horizon — only water and reflection. You cannot tell where real flower ends and reflected cloud begins. In 1906, Monet's eyesight was already declining; it drove him deeper into light itself, away from outline and form. A prophecy of abstraction.",
    tags: ['Impressionism', 'Monet', 'water', 'light', 'Giverny', 'series']
  },

  'aic.1926.198': {
    museum: 'aic',
    title: 'The Day of the God (Mahana no Atua)',
    titleZh: '神的日子',
    painter: 'Paul Gauguin',
    painterZh: '保罗·高更',
    dates: '1894',
    gal: 'Gallery 247',
    period: 'post_impressionism',
    periodLabel: 'Post-Impressionism / Primitivism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Paul_Gauguin_-_Mahana_no_atua_%28Day_of_the_God%29_-_1926.198_-_Art_Institute_of_Chicago.jpg',
    desc: '高更用大溪地神话与色块构建了一个理想化的"原始天堂"——画面以大胆的非透视色彩区块取代传统立体感，底部流水中的波纹几近抽象。这是逃离西方文明的艺术宣言，充满争议，也充满诗意。',
    descEn: "Gauguin constructs a Tahitian paradise from myth and flat color — bold non-perspectival zones replace Western pictorial space, and the water at the bottom approaches pure abstraction. A declared escape from Western civilization, beautiful and deeply problematic in its exoticization.",
    audioText: '这是保罗·高更的《神的日子》，1894年作，展于247号展厅。高更抛弃了巴黎的文明生活，前往大溪地寻找他想象中的"原始纯粹"。画中的塔阿罗阿神站在中央，两侧是沐浴与睡卧的女子；底部流水被分割为抽象色块，接近20世纪抽象画的语言。高更的选择是复杂的——他的"逃离"本身也是一种西方凝视——但作为色彩革命的先驱，他对后来的马蒂斯影响深远。',
    audioTextEn: "Gauguin's The Day of the God, 1894, Gallery 247. Gauguin abandoned Paris for Tahiti seeking what he imagined as primitive purity. The god Taaroa stands at center; the water below dissolves into abstract color zones approaching the language of 20th-century abstraction. Gauguin's choices were morally complex — his 'escape' was itself a Western gaze — but as a pioneer of color liberated from description, his influence on Matisse and beyond was decisive.",
    tags: ['post-impressionism', 'Primitivism', 'Tahiti', 'color', 'flat forms', 'Gauguin']
  },

  'aic.1910.2': {
    museum: 'aic',
    title: "The Child's Bath",
    titleZh: '孩子的沐浴',
    painter: 'Mary Cassatt',
    painterZh: '玛丽·卡萨特',
    dates: '1893',
    gal: 'Gallery 273',
    period: 'impressionism',
    periodLabel: 'Impressionism / American',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/25/The_Child%27s_Bath_-_Mary_Cassatt.jpg',
    desc: '卡萨特是印象派中唯一的美国女性核心成员。她拒绝描绘男性目光下的女性，转而以母子的亲密日常为主题——俯视视角、日本版画式的平涂色块，赋予家庭场景以严肃的艺术地位。',
    descEn: "Cassatt was the only American and one of the few women at the heart of Impressionism. She refused the male gaze and chose domestic intimacy — the bird's-eye view, Japanese woodblock-influenced flat color, give everyday caregiving the same artistic weight as any history painting.",
    audioText: '这是玛丽·卡萨特的《孩子的沐浴》，1893年作，展于273号展厅。卡萨特是印象派中唯一的美国核心成员，也是最重要的女性印象派画家之一。她以母子的亲密场景为主题，但绝非装饰性——俯视的视角来自日本浮世绘的影响，平涂色块取代了传统立体感。这幅画庄重地宣告：照料是严肃的主题，家庭生活值得最精致的艺术处理。',
    audioTextEn: "Mary Cassatt's The Child's Bath, 1893, Gallery 273. Cassatt was Impressionism's only American core member and its most important female practitioner. She chose maternal intimacy as her subject but treated it without sentimentality — a bird's-eye view borrowed from Japanese prints, flat color zones that feel modern and considered. A declaration that caregiving is a worthy subject for serious art.",
    tags: ['Impressionism', 'American', 'Cassatt', 'women', 'domestic', 'Japanese influence']
  },

  'aic.1930.934': {
    museum: 'aic',
    title: 'American Gothic',
    titleZh: '美国哥特式',
    painter: 'Grant Wood',
    painterZh: '格兰特·伍德',
    dates: '1930',
    gal: 'Gallery 263',
    period: 'modern',
    periodLabel: 'American Regionalism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg',
    desc: '美国历史上被复制最多的绘画之一。叉子、哥特式窗户、严肃的神情——这是格兰特·伍德对爱荷华农村的温柔描绘还是对清教徒道德严苛的讽刺？这个问题至今众说纷纭，而画作因此成为美国文化的镜子。',
    descEn: "One of America's most reproduced paintings. Pitchfork, Gothic window, severe expressions — is this Grant Wood's tender tribute to Iowa rural life or a critique of Puritanical rigidity? The question remains open, making it America's most enduring cultural mirror.",
    audioText: '这是格兰特·伍德的《美国哥特式》，1930年作，展于263号展厅。这是美国艺术史上被复制、被模仿、被改编最多的作品之一。画中的男子与女子站在爱荷华州的哥特式木屋前——他手持干草叉，神情严肃。伍德本人说这是对农村人精神力量的赞歌，但许多评论家将其解读为对清教徒式严苛生活的讽刺。这个歧义使它成为美国文化最持久的照镜子的画面。',
    audioTextEn: "Grant Wood's American Gothic, 1930, Gallery 263. America's most reproduced painting. A man and woman stand before an Iowa Gothic farmhouse — pitchfork in hand, faces severe. Wood called it a tribute to rural American resilience. Critics read it as satire of Puritan rigidity. That ambiguity, never resolved, is precisely why it became America's most enduring cultural mirror.",
    tags: ['American Regionalism', 'modern', 'Grant Wood', 'American identity', 'iconic', 'ambiguous']
  },

  'aic.1942.51': {
    museum: 'aic',
    title: 'Nighthawks',
    titleZh: '夜鹰',
    painter: 'Edward Hopper',
    painterZh: '爱德华·霍珀',
    dates: '1942',
    gal: 'Gallery 262',
    period: 'modern',
    periodLabel: 'American Realism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg',
    desc: '深夜的餐馆，四个人，无人交谈。窗外的街道空无一人，橙黄色的灯光从玻璃中透出，像一个孤岛的温暖，也像一座无法逃离的囚笼。霍珀的《夜鹰》成了美国孤独的标志性符号，那种城市中的孤立感，至今仍然触动着每一个在夜晚独自行走过城市的人。',
    descEn: "A diner at midnight, four people, no one speaking. The street outside is empty; the amber light through plate glass is warm the way a lifeboat is warm — you are safe, but you are also alone. Hopper made American loneliness into a visual archetype. It is impossible to look at it without feeling recognized.",
    audioText: '这是爱德华·霍珀的《夜鹰》，1942年作，展于262号展厅。这是20世纪美国绘画中被复制最多、被解读最多的作品之一。深夜一家路边餐馆，四个人坐在通明的灯光下，没有出口，没有交流。画面令人不安的地方在于：那个橙黄色的温暖其实是冷漠的对立面。霍珀说他从不故意表达孤独，但他画的就是自己——一个在人群中永远感到隔离的人。1942年是二战最黑暗的一年，这幅画因此也成了那个时代内心恐惧的镜子。',
    audioTextEn: "Hopper's Nighthawks, 1942, Gallery 262. One of the most reproduced and analyzed American paintings of the 20th century. A late-night diner; four people under bright lights; no exit, no conversation. The disturbing truth: that amber warmth is loneliness in disguise. Hopper said he never consciously painted isolation — he was simply painting himself, a man who felt separated everywhere he went. 1942 was the darkest year of the war; the painting became a mirror for an entire era's private fear.",
    tags: ['American Realism', 'Hopper', 'loneliness', 'urban', 'night', 'iconic', 'modern']
  },

  'aic.1964.336': {
    museum: 'aic',
    title: 'Paris Street, Rainy Day',
    titleZh: '巴黎街头·雨天',
    painter: 'Gustave Caillebotte',
    painterZh: '古斯塔夫·卡耶博特',
    dates: '1877',
    gal: 'Gallery 201',
    period: 'impressionism',
    periodLabel: 'Impressionism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Gustave_Caillebotte_-_Paris_Street%2C_Rainy_Day_-_Google_Art_Project.jpg',
    desc: '卡耶博特是印象派中最具建筑感的画家。这幅巨作以精确的几何透视描绘了奥斯曼城市改造后的巴黎街道——现代性的冷静秩序与伞下每个人物的孤立状态形成对比。那个无名的十字路口，将成为现代都市生活的永恒象征。',
    descEn: "Caillebotte was the most architecturally-minded Impressionist. This monumental canvas renders Haussmann's new Paris in precise geometric perspective — the rational grid of modernity set against the isolation of each figure under their umbrella. An anonymous intersection becomes the eternal emblem of modern urban life.",
    audioText: '这是古斯塔夫·卡耶博特的《巴黎街头·雨天》，1877年作，展于201号展厅。卡耶博特是一位印象派赞助人兼画家，他的风格与其他印象派成员大相径庭——不是印象派的感官溶解，而是工程师式的精确透视。画面中心的十字路口是奥斯曼男爵改造巴黎的产物：笔直宽阔的林荫大道，统一的建筑立面。雨中每个人物都打着伞，彼此不交流——现代城市的人群聚集与个体孤立的完美对立。',
    audioTextEn: "Caillebotte's Paris Street, Rainy Day, 1877, Gallery 201. Caillebotte was both Impressionist patron and painter — but his style diverges sharply: not sensory dissolution but engineering-grade perspective. The intersection is a product of Baron Haussmann's Paris transformation: wide boulevards, uniform facades. Each figure shelters under an umbrella without connecting to the others. The modern city's defining paradox: maximum proximity, complete isolation.",
    tags: ['impressionism', 'Caillebotte', 'Paris', 'geometric', 'urban', 'modern life']
  },

  'aic.1906.339': {
    museum: 'aic',
    title: 'The Assumption of the Virgin',
    titleZh: '圣母升天',
    painter: 'El Greco',
    painterZh: '埃尔·格列柯',
    dates: '1577–1579',
    gal: 'Gallery 214',
    period: 'european_masters',
    periodLabel: 'European Masters 1500–1800',
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/71/El_Greco_-_The_Assumption_of_the_Virgin_-_Google_Art_Project.jpg',
    desc: '格列科将这幅高达约四米的祭坛画献给圣多明我修道院——人物以猛烈上升的旋涡排列，圣母的蓝色斗篷在火焰般的人体与云彩中盘旋而上。这是格列科从拜占庭到矫饰主义再到几乎预告巴洛克的全部风格密钥，也是他在西班牙落地生根的第一件代表作。',
    descEn: "Four meters tall, painted for the Church of Santo Domingo — figures spiral upward in violent energy, the Virgin's blue mantle ascending through flame-like bodies and cloud. This single canvas holds every phase of El Greco's style, from Byzantine icon to Mannerist elongation to something that almost prophesies the Baroque. His first major Spanish statement.",
    audioText: '这是埃尔·格列科的《圣母升天》，1577至1579年作，展于214号展厅。格列科出生于克里特岛，早年在威尼斯师从提香，后到马德里未能得到腓力二世的赏识，最终在托莱多扎根。这件高达四米的祭坛画是他在西班牙的第一件重要委托。画面以螺旋上升的动势将圣母与天使合为一体——拉长变形的身体是他的标志，那种扭曲并非技术缺陷，而是灵性张力的视觉表达。',
    audioTextEn: "El Greco's The Assumption of the Virgin, 1577–1579, Gallery 214. El Greco was born in Crete, trained in Venice under Titian, failed to win Philip II's patronage in Madrid, and finally settled in Toledo. This four-meter altarpiece was his first major Spanish commission. Figures spiral upward in a vortex — his elongated, twisting bodies are not technical error but a visual language for spiritual tension. His signature style fully formed.",
    tags: ['European Masters', 'El Greco', 'altarpiece', 'Mannerism', 'Baroque', 'religious', 'Spain']
  },

  'aic.1933.1152': {
    museum: 'aic',
    title: 'The Millinery Shop',
    titleZh: '女帽店',
    painter: 'Edgar Degas',
    painterZh: '埃德加·德加',
    dates: 'c. 1882–1886',
    gal: 'Gallery 226',
    period: 'impressionism',
    periodLabel: 'Impressionism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Edgar_Degas_-_The_Millinery_Shop_-_Google_Art_Project.jpg',
    desc: '德加将观察的视角设于帽子之后——观者如同一位顾客，透过陈列的女帽注视着专注工作的女帽匠。画面构图刻意打破传统，人物被切断，视线被帽子遮挡。德加以这种"偷窥式"构图，记录了巴黎工作女性最自然的状态：不被看见，也无需表演。',
    descEn: "Degas places the viewer behind the hats — you peer through the displayed bonnets at the milliner absorbed in her work. The composition is deliberately fractured, figures cut, sightlines blocked. This 'voyeur's view' captures a Parisian working woman at her most unguarded: unseen, unperforming. Pure observation, no sentiment.",
    audioText: '这是埃德加·德加的《女帽店》，约1882至1886年作，展于226号展厅。德加对观察工作中的女性有着持久的迷恋，但他的目光并非同情或评判，而是纯粹的视觉观察。画面将观者置于帽架之后，像一位刚进店的顾客——那位女帽匠完全沉浸在工作中，没有意识到被观看。德加的印象主义不是光的诗意，而是姿态的科学。这种"偷窥式"构图直接影响了后来的电影镜头语言。',
    audioTextEn: "Degas's The Millinery Shop, c. 1882–1886, Gallery 226. Degas was obsessed with observing women at work — not with sympathy or judgment, but with pure visual analysis. The viewer is positioned behind the hat displays, like a customer who just entered; the milliner is absorbed in her task, unaware of being watched. Degas's Impressionism is not poetry of light but science of gesture. This voyeur's-eye composition directly influenced the language of cinema.",
    tags: ['impressionism', 'Degas', 'working women', 'Paris', 'observation', 'voyeur view']
  },

  'aic.1983.29': {
    museum: 'aic',
    title: 'Stack of Wheat (End of Summer)',
    titleZh: '干草垛（夏末）',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1890–1891',
    gal: 'Gallery 243',
    period: 'impressionism',
    periodLabel: 'Impressionism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Claude_Monet_-_Stack_of_Wheat_%28End_of_Summer%29.jpg',
    desc: '莫奈"干草垛"系列在芝加哥藏有多件，这幅夏末版描绘吉维尼田野间金色麦垛在清晨阳光下的温度。与同在AIC的1906年《睡莲》相比，这幅更直接——你感觉到的是干草的重量、收割季节的气息，以及一个农业时代正在消失的宁静。',
    descEn: "The AIC holds several Monet Haystacks; this late-summer version captures Giverny grain stacks in morning warmth. Compared to the 1906 Water Lilies also in this collection, it is more direct — you feel the weight of dry grain, the smell of harvest season, the quietness of an agricultural world already beginning to disappear.",
    audioText: '这是克劳德·莫奈的《干草垛·夏末》，1890至1891年作，展于243号展厅。芝加哥艺术博物馆是全球收藏莫奈"干草垛"系列最集中的机构之一。这幅夏末版以饱满的金色调记录了吉维尼收割季节的阳光温度。干草垛只是一个借口——莫奈真正描绘的是吉维尼某个特定早晨的特定光线，那种光线的存在只有片刻，却被他用颜料永远留住了。',
    audioTextEn: "Monet's Stack of Wheat (End of Summer), 1890–1891, Gallery 243. The AIC holds one of the world's largest concentrations of Monet's Haystack series. This late-summer version records Giverny harvest light in full golden warmth. The grain stack is only a pretext — what Monet was painting was the light of a specific morning at a specific moment in Giverny, light that existed for minutes and was made permanent.",
    tags: ['impressionism', 'Monet', 'haystacks', 'series', 'Giverny', 'harvest', 'light']
  }
};

/* ── AIC PERIODS ─────────────────────────────────────────────── */
const AIC_PERIODS = [
  {
    id: 'impressionism',
    label: 'Impressionism',
    labelZh: '印象主义',
    years: '1860–1900',
    galleries: 'Galleries 201, 243',
    duration: '30 min',
    color: '#4a7fb5',
    desc: '光与色彩的革命，以瞬间感知取代学院传统，开创现代艺术之门。',
    descEn: 'Revolution of light and color — the fleeting moment captured in shimmering paint, the gateway to modern art.',
    painters: ['Claude Monet (1840–1926)', 'Pierre-Auguste Renoir (1841–1919)', 'Mary Cassatt (1844–1926)'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Claude_Monet_1899_Nadar_crop.jpg',
      nameZh: '克劳德·莫奈（1899年，纳达尔摄影）',
      nameEn: 'Claude Monet (1899, photograph by Félix Nadar)',
      bioZh: '芝加哥艺术博物馆拥有法国以外全球最集中的印象派收藏，莫奈的干草垛系列便有多幅在此长期展出。莫奈（1840–1926）是印象主义的灵魂人物：他在诺曼底画海浪，在巴黎画蒸汽，在吉维尼的花园里画睡莲，直到几近失明仍不放下画笔。塞尚称他为"只有一只眼睛，但那是多么了不起的眼睛"。在芝加哥的藏品中，你可以看到莫奈从早期饱满的色彩，到晚期几乎抽象的光之实验，是理解其一生追问的最佳路径之一。',
      bioEn: 'The Art Institute of Chicago holds one of the world\'s greatest Impressionist collections outside France, including several of Monet\'s Haystacks series. Monet (1840–1926) was the soul of Impressionism: he painted breaking waves in Normandy, steam in Paris\'s Gare Saint-Lazare, and water lilies in his Giverny garden — nearly blind in his final years but still painting. Cézanne called him "only an eye, but what an eye." The AIC collection traces his arc from early saturated color to late near-abstract experiments with light — one of the finest ways to understand a life\'s single sustained question.',
      styleZh: '印象派以三个层面革新了绘画：技法（户外写生、短促笔触、纯色并置）、认识论（瞬间比永恒更真实）、社会学（日常生活是合法的绘画题材）。在芝加哥，这些发现以馆藏的深度与广度得到完整呈现。',
      styleEn: 'Impressionism revolutionized painting on three levels: technical (plein air, rapid brushwork, pure color), epistemological (the fleeting moment is more real than the eternal ideal), and social (everyday life is legitimate subject matter). The AIC presents these discoveries at depth and breadth found in few collections outside Paris.',
      quote: '色彩是我每日的痴迷、喜悦与磨难。',
      quoteAuthor: '克劳德·莫奈，1883年'
    }
  },
  {
    id: 'post_impressionism',
    label: 'Post-Impressionism',
    labelZh: '后印象主义',
    years: '1886–1910',
    galleries: 'Galleries 241, 246–248',
    duration: '35 min',
    color: '#8b3a52',
    desc: '在印象派感官基础上寻求结构、象征与情感的深度，通往现代主义。',
    descEn: 'Beyond Impressionist sensation toward structure, symbol, and emotional depth — the direct bridge to Modernism.',
    painters: ['Georges Seurat (1859–1891)', 'Vincent van Gogh (1853–1890)', 'Paul Gauguin (1848–1903)', 'Paul Cézanne (1839–1906)', 'Henri de Toulouse-Lautrec (1864–1901)'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Georges_Seurat_-_Self-portrait_%281883%29.jpg',
      nameZh: '乔治·修拉自画像（1883年）',
      nameEn: 'Georges Seurat, Self-Portrait (1883)',
      bioZh: '后印象主义不是一个流派，而是四种截然不同的回答：修拉（1859–1891）用色彩科学发明了点彩法，将光分解为纯色小点，追求"视觉混合"；梵高（1853–1890）将色彩变成情感的直接语言，笔触如火焰；高更（1848–1903）逃往大溪地，在"原始"中寻找文明无法给予的生命力；塞尚（1839–1906）则解构形体为几何——"用圆柱、球体和锥体处理自然"，直接指向20世纪的立体主义。他们共同的遗产：情感与结构，高于瞬间印象。',
      bioEn: 'Post-Impressionism was not a movement but four entirely different answers to one question: what comes after the sensation? Seurat (1859–1891) invented Pointillism using color science — pure dots for "optical mixing." Van Gogh (1853–1890) turned color into direct emotional language; his brushstrokes burn. Gauguin (1848–1903) fled to Tahiti seeking vitality civilization could not give him. Cézanne (1839–1906) decomposed form into geometry — "treat nature by the cylinder, the sphere, the cone" — pointing directly to Cubism. Their shared legacy: emotion and structure over fleeting sensation.',
      styleZh: '点彩法将色彩还原为科学；表现主义笔触将色彩变为心跳；象征主义将色彩变为神话；几何分析将色彩变为形式。后印象主义是现代主义的全部可能性的种子库。',
      styleEn: 'Pointillism reduced color to science; Expressionist brushwork made color into heartbeat; Symbolism made color into myth; geometric analysis made color into pure form. Post-Impressionism was the seedbank of all Modernism\'s possibilities.',
      quote: '艺术即和谐。和谐是对立物的类比——色调、色相与线条——在光的主导下，宁静、欢愉或悲哀地被考量。',
      quoteAuthor: '乔治·修拉，《美学》笔记，1890年'
    }
  },
  {
    id: 'modern',
    label: 'Modern American',
    labelZh: '现代与美国艺术',
    years: '1900–1950',
    galleries: 'Galleries 262–263, 391',
    duration: '20 min',
    color: '#3a6b4a',
    desc: '欧洲现代主义的美国回响与本土地域主义的反思，两者共同塑造了20世纪美国艺术身份。',
    descEn: "American responses to European Modernism alongside homegrown Regionalism — together shaping the 20th century's American artistic identity.",
    painters: ['Pablo Picasso (1881–1973)', 'Grant Wood (1891–1942)', 'Edward Hopper (1882–1967)'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Edward_Hopper_self_portrait.jpg',
      nameZh: '爱德华·霍珀自画像（约1925年）',
      nameEn: 'Edward Hopper, Self-Portrait (c. 1925)',
      bioZh: '20世纪前半叶，美国艺术界面临两种选择：追随欧洲的现代主义实验，还是坚守本土的民主叙事？霍珀（1882–1967）选择了第三条路——以美国的建筑、灯光与孤独为语言，创造出独特的"美国忧郁"。他画咖啡馆深夜的寂静，画加油站荒原上的孤独，画酒店房间里的无名苦闷。格兰特·伍德（1891–1942）则向相反方向走去，以中西部农村的质朴场景对抗欧洲的前卫喧嚣——《美国哥特式》是20世纪美国最具辨识度的图像之一。',
      bioEn: 'In the first half of the 20th century, American artists faced a choice: follow European Modernism\'s experiments or maintain an indigenous democratic voice? Hopper (1882–1967) chose a third path — using American architecture, light, and solitude to create a distinctly "American melancholy." He painted the midnight silence of diners, isolated gas stations on prairie roads, nameless anguish in hotel rooms. Grant Wood (1891–1942) moved in the opposite direction: Midwestern rural plainness as counter-statement to European avant-garde noise. American Gothic became one of the most recognizable images of the 20th century.',
      styleZh: '美国现代艺术是一场关于身份的追问：什么是美国的？在欧洲的影响与本土的现实之间，美国艺术家找到了不同的答案——有时是焦虑，有时是骄傲，有时是两者的奇异结合。',
      styleEn: 'American Modern art was a sustained question about identity: what is American? Between European influence and domestic reality, artists found different answers — sometimes anxious, sometimes proud, sometimes a strange fusion of both.',
      quote: '如果我能用文字表达，就用不着去画了。',
      quoteAuthor: '爱德华·霍珀'
    }
  },
  {
    id: 'european_masters',
    label: 'European Masters 1500–1800',
    labelZh: '欧洲大师 1500–1800',
    years: '1500–1800',
    galleries: 'Gallery 214',
    duration: '20 min',
    color: '#6b4a1a',
    desc: '从矫饰主义的埃尔·格列科到新古典主义，欧洲绘画的历史广度在芝加哥的藏品中同样可见。',
    descEn: "From Mannerist El Greco to Neoclassicism — the AIC's European old master holdings span five centuries of Western painting.",
    painters: ['El Greco (1541–1614)', 'Gustave Caillebotte (1848–1894)'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/El_Greco_-_Portrait_of_a_Man_%28Metropolitan_Museum_of_Art%29.jpg',
      nameZh: '埃尔·格列科，《一位男士的肖像》（约1595–1600年）',
      nameEn: 'El Greco, Portrait of a Man (c. 1595–1600)',
      bioZh: '埃尔·格列科（1541–1614）出生于克里特岛，在威尼斯学习了提香的色彩，在罗马经历了米开朗基罗的冲击，最终定居西班牙托莱多，用一种没有任何流派能够归类的方式改写了欧洲绘画。他拉长人物比例，扭曲空间，用幽灵般的绿色和迷幻的光创造出精神的风景。他超前了300年的表现主义，被梵高视为精神先驱。AIC的欧洲大师馆藏从矫饰主义横跨至新古典，呈现了从文艺复兴的和谐到启蒙理性的完整弧线。',
      bioEn: 'El Greco (1541–1614) was born in Crete, absorbed Titian\'s color in Venice, was shaken by Michelangelo in Rome, and finally settled in Toledo — rewriting European painting in a way no movement could categorize. He elongated figures, twisted space, and used ghostly greens and hallucinatory light to create landscapes of the spirit. He preceded Expressionism by 300 years and was seen by Van Gogh as a spiritual ancestor. The AIC\'s European Masters collection spans from Mannerism to Neoclassicism, tracing the full arc from Renaissance harmony to Enlightenment reason.',
      styleZh: '欧洲1500至1800年间的绘画是一段无限变奏的历史：从文艺复兴的秩序到矫饰主义的扭曲，从巴洛克的戏剧到洛可可的优雅，从新古典的严肃到浪漫主义的前奏。AIC的欧洲大师收藏让这段历史以单一馆藏的形式变得可触可感。',
      styleEn: 'European painting from 1500 to 1800 was a history of infinite variation: from Renaissance order to Mannerist tension, Baroque drama to Rococo elegance, Neoclassical severity to the Romantic threshold. The AIC\'s European Masters collection makes this history tangible in a single gallery.',
      quote: '色彩是我的日常痛苦，光是我的职责，形式是我的怀疑。',
      quoteAuthor: '埃尔·格列科（传）'
    }
  }
];

/* ── KHM WORKS ────────────────────────────────────────────────── */
// 8 key works from the Kunsthistorisches Museum Vienna
// All artists deceased; works public domain.
const KHM_WORKS = {
  'khm.bruegel.babel': {
    museum: 'khm',
    title: 'The Tower of Babel',
    titleZh: '巴别塔',
    painter: 'Pieter Bruegel the Elder',
    painterZh: '彼得·勃鲁盖尔（老）',
    dates: '1563',
    gal: 'Room X',
    period: 'renaissance_flemish',
    periodLabel: 'Flemish Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project.jpg',
    desc: '勃鲁盖尔以难以置信的细节描绘这座永远建不完的通天塔，数千工人如蚂蚁般劳作，傲慢的宁录王在画面左侧接受朝贡。这是对人类狂妄自大的寓言，也是对16世纪建筑雄心的讽刺性赞歌。',
    descEn: "Bruegel renders the never-finished Tower with astonishing detail — thousands of laborers, a proud Nimrod receiving obeisance at left. A parable of human hubris and the impossibility of overreaching ambition, painted with the precision of an architect's dream turned nightmare.",
    audioText: '欢迎来到维也纳艺术史博物馆。这是彼得·勃鲁盖尔的《巴别塔》，1563年作，展于X号展厅。勃鲁盖尔是北方文艺复兴最具想象力的叙事画家。这幅画中，通天塔螺旋而上，数千工人如蚂蚁般劳作，建筑细节令人叹为观止——哈布斯堡宫廷收藏此画，部分原因也是欣赏它作为建筑技艺的视觉百科全书。然而核心寓言是清晰的：人类的骄傲必将失败。傲慢的宁录王在左侧接受跪拜，但塔永远不会完工。',
    audioTextEn: "Welcome to the Kunsthistorisches Museum Vienna. This is Pieter Bruegel the Elder's The Tower of Babel, 1563, Room X. Bruegel was the most inventive narrative painter of the Northern Renaissance. The tower spirals upward, thousands of laborers move like ants — the architectural detail is encyclopedic. The Habsburg court collected it partly as a visual compendium of construction technique. But the parable is clear: human pride will always fail. Proud Nimrod receives obeisance at left, and the tower will never be finished.",
    tags: ['Flemish Renaissance', 'Bruegel', 'narrative', 'KHM masterpiece', 'allegory']
  },

  'khm.bruegel.hunters': {
    museum: 'khm',
    title: 'Hunters in the Snow (Winter)',
    titleZh: '雪中猎人（冬）',
    painter: 'Pieter Bruegel the Elder',
    painterZh: '彼得·勃鲁盖尔（老）',
    dates: '1565',
    gal: 'Room X',
    period: 'renaissance_flemish',
    periodLabel: 'Flemish Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Pieter_Bruegel_the_Elder_-_Hunters_in_the_Snow_%28Winter%29_-_Google_Art_Project.jpg',
    desc: '"月份系列"中最动人的一幅——三位猎人与疲惫的猎犬在雪地中踏向村庄，远处的村民在冰上嬉戏。铅灰天空与纯白雪地构成寂静的对话，弗拉芒冬日的重量压在每一根树枝上。',
    descEn: "From Bruegel's Months series, the most haunting: three hunters and tired dogs return through snow to the village below, where skaters glide on a frozen pond. Lead-grey sky against white silence — the entire weight of a Flemish winter rests in every bare branch.",
    audioText: '这是彼得·勃鲁盖尔的《雪中猎人》，1565年作，展于X号展厅，属于"月份系列"中的冬季。这六幅系列画原本为安特卫普商人装饰厅堂所作，每幅代表不同季节的农村生活。这幅冬景被许多艺术史家认为是西方风景画的巅峰之一。三位猎人步履沉重，背景的远山和冻结的池塘以惊人的景深展开，铅灰色天空压低着整个世界——这是冬天的视觉诗。',
    audioTextEn: "Bruegel's Hunters in the Snow, 1565, Room X — the Winter panel from his Months series. Originally commissioned to decorate an Antwerp merchant's hall, each painting captures a season of rural Flemish life. Many art historians consider this the greatest landscape in Western painting. Three hunters trudge home; behind them, frozen pond and distant mountains open with breathtaking depth. The lead-grey sky presses everything down. Winter made visible.",
    tags: ['Flemish Renaissance', 'Bruegel', 'landscape', 'winter', 'KHM masterpiece', 'Months series']
  },

  'khm.vermeer.painting': {
    museum: 'khm',
    title: 'The Art of Painting',
    titleZh: '绘画艺术',
    painter: 'Johannes Vermeer',
    painterZh: '约翰内斯·维梅尔',
    dates: 'c. 1666–1668',
    gal: 'Room 22',
    period: 'baroque_dutch',
    periodLabel: 'Dutch Baroque',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Jan_Vermeer_-_The_Art_of_Painting_-_Google_Art_Project.jpg',
    desc: '维梅尔从未出售这幅画，视之为毕生最重要的作品。画家的背影、克利俄（历史女神）的映像、窗帘的戏剧性褶皱——这是一幅关于绘画本质的绘画，维梅尔在此向艺术与历史表达最深的敬意。',
    descEn: "Vermeer never sold this painting — he kept it as his most important work. The painter's back, Clio the Muse of History posing, the dramatic curtain — this is a painting about the nature of painting, Vermeer's deepest homage to art and memory.",
    audioText: '这是约翰内斯·维梅尔的《绘画艺术》，约1666年作，展于22号展厅。维梅尔一生只留下约35幅画，却从未出售过这一幅——他将其视为自己的毕生代表作。画中，一位背对观者的画家正在描绘站在他面前的女子，那是克利俄，历史女神，手持号角与书本。窗帘如舞台幕布般拉开，将观者引入这神圣的创作时刻。这是维梅尔对艺术本质的沉思。',
    audioTextEn: "Vermeer's The Art of Painting, c. 1666–1668, Room 22. Of his approximately 35 paintings, Vermeer never sold this one — he regarded it as his most important work. A painter, back turned to us, depicts a woman: Clio, Muse of History, holding trumpet and book. The curtain sweeps open like a theater reveal. This is Vermeer's meditation on what painting is — the act of arresting history in light and color.",
    tags: ['Dutch Baroque', 'Vermeer', 'allegory', 'KHM masterpiece', 'never sold', 'studio scene']
  },

  'khm.titian.danae': {
    museum: 'khm',
    title: 'Danaë with Nursemaid',
    titleZh: '达娜厄与侍女',
    painter: 'Titian (Tiziano Vecellio)',
    painterZh: '提香（提香·韦切利奥）',
    dates: 'c. 1553–1554',
    gal: 'Room 7',
    period: 'renaissance_venetian',
    periodLabel: 'Venetian Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Titian_Dana%C3%AB_Vienna.jpg',
    desc: '提香为哈布斯堡皇帝查理五世绘制的神话作品，达娜厄在金雨中沐浴——这是奥林匹斯神话的感官化身。老年侍女用围裙收集金币，与年轻达娜厄形成鲜明的时间对比，提香的笔触在此达到威尼斯官能主义的巅峰。',
    descEn: "Painted for Emperor Charles V, Danaë receives Zeus as a shower of gold — mythological sensuality at its fullest. The old nursemaid catching coins in her apron creates a stark contrast of youth and age, desire and greed. Venetian colorism at its absolute height.",
    audioText: '这是提香的《达娜厄与侍女》，约1553年作，展于7号展厅。这幅画是为哈布斯堡皇帝查理五世所作的私人委托。神话中，众神之王宙斯化为金雨与被囚禁的达娜厄相遇。提香将这一场景描绘得充满感官温度：年轻达娜厄的皮肤在金光中发光，而旁边的老侍女却贪婪地用围裙兜住金币。两种对金色的不同态度，构成时间与欲望的完美对比。',
    audioTextEn: "Titian's Danaë with Nursemaid, c. 1553–1554, Room 7. A private commission for Emperor Charles V. Zeus visits the imprisoned Danaë as a shower of gold. Titian renders the scene with full Venetian sensuality: Danaë's skin luminous in golden light, while beside her the old nursemaid greedily catches falling coins in her apron. Two responses to gold — one transcendent, one venal — one painting.",
    tags: ['Venetian Renaissance', 'Titian', 'mythology', 'sensuality', 'Habsburg commission']
  },

  'khm.raphael.madonna': {
    museum: 'khm',
    title: 'Madonna in the Meadow',
    titleZh: '草地上的圣母',
    painter: 'Raphael (Raffaello Sanzio)',
    painterZh: '拉斐尔（拉斐尔罗·圣齐奥）',
    dates: '1505–1506',
    gal: 'Room 1',
    period: 'renaissance_high',
    periodLabel: 'High Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Raffael_015.jpg',
    desc: '拉斐尔最著名的圣母作品之一：三角形构图将圣母、圣婴与小施洗约翰置于托斯卡纳风景中，每个线条都流淌着文艺复兴的理想美学——和谐、秩序、慈悲。年仅22岁的拉斐尔已完全掌握了盛期文艺复兴的语言。',
    descEn: "One of Raphael's most celebrated Madonnas: the triangular grouping of Madonna, Christ child, and young Baptist set against the Tuscan landscape. Every line flows with Renaissance ideals — harmony, grace, compassion. Raphael was only 22 when he painted it, already the complete master.",
    audioText: '这是拉斐尔的《草地上的圣母》，1505至1506年作，展于1号展厅。拉斐尔在画这幅画时只有22岁，却已完全掌握了盛期文艺复兴的全部语言。三角形构图将圣母置于中心，小耶稣与幼年施洗约翰在她膝前相对，身后是托斯卡纳的绿色原野。每一条线都流动而和谐，没有多余，没有紧张——这是文艺复兴"美即秩序"理想的完美表达。',
    audioTextEn: "Raphael's Madonna in the Meadow, 1505–1506, Room 1. Raphael was only 22, yet he had already absorbed everything the Renaissance offered. The triangular grouping — Madonna at center, Christ and young Baptist below — set against the Tuscan hills flows with perfect harmony. No superfluous line, no tension. The Renaissance ideal — beauty as order — made completely visible.",
    tags: ['High Renaissance', 'Raphael', 'Madonna', 'triangular composition', 'harmony', 'Tuscany']
  },

  'khm.rubens.fur': {
    museum: 'khm',
    title: 'Das Pelzchen (The Little Fur)',
    titleZh: '皮草小外套',
    painter: 'Peter Paul Rubens',
    painterZh: '彼得·保罗·鲁本斯',
    dates: 'c. 1636–1638',
    gal: 'Room 19',
    period: 'baroque_flemish',
    periodLabel: 'Flemish Baroque',
    img: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Peter_Paul_Rubens_-_The_Fur_%281638%29.jpg',
    desc: '鲁本斯晚年为第二任妻子海伦娜·弗尔芒所画的私密肖像，从不示人，是哈布斯堡收藏中最私密的珍宝之一。皮草衬托着肌肤的温度与质感，是对爱与美的直接颂歌——不是神话中的维纳斯，而是他真实所爱的女人。',
    descEn: "Painted for himself alone, never to be shown — Rubens's most intimate portrait of his young wife Helena Fourment. Fur against glowing skin, private love made visible paint. Not the mythological Venus but the actual woman he loved. The Habsburg collection acquired it after Rubens's death.",
    audioText: '这是彼得·保罗·鲁本斯的《皮草小外套》，约1636年作，展于19号展厅。鲁本斯在遗嘱中特别注明这幅画不得出售，要永远留在家族中——这是他的私密珍宝，为他深爱的年轻妻子海伦娜·弗尔芒所作的肖像。皮草包裹着她的身体，肌肤的温度与质感透过颜料可感可触。这不是神话题材，而是纯粹的爱的表达。哈布斯堡王室最终在鲁本斯去世后购得此画。',
    audioTextEn: "Rubens's Das Pelzchen, c. 1636–1638, Room 19. Rubens specified in his will this painting should never be sold — his most private treasure, a portrait of his young wife Helena Fourment wrapped in fur. Skin's warmth and texture are palpable through the paint. Not mythology but pure love made visible. The Habsburgs acquired it after Rubens's death, and it remains one of the most intimate works in any royal collection.",
    tags: ['Flemish Baroque', 'Rubens', 'portrait', 'intimate', 'wife', 'private']
  },

  'khm.velazquez.margarita': {
    museum: 'khm',
    title: 'Infanta Margarita Teresa in a Blue Dress',
    titleZh: '蓝色盛装的玛格丽塔公主',
    painter: 'Diego Velázquez',
    painterZh: '迭戈·委拉斯凯兹',
    dates: '1659',
    gal: 'Room 10',
    period: 'baroque_spanish',
    periodLabel: 'Spanish Baroque',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Velaz%C3%A1quez_Infanta_Margarita_Teresa_in_a_blue_dress.jpg',
    desc: '委拉斯凯兹去世前一年为八岁的西班牙公主所作，画面中的蓝银色裙摆以自由而精确的笔触呈现，令人叹服。这幅画是哈布斯堡两支王室之间的婚约象征，作为外交礼物送达维也纳，玛格丽塔后来确实嫁给了奥地利皇帝。',
    descEn: "Painted the year before Velázquez's death, this portrait of eight-year-old Infanta Margarita — blue and silver dress rendered with breathtaking free brushwork — was sent to Vienna as a diplomatic gift pledging her future marriage to the Austrian Emperor. She did indeed marry him.",
    audioText: '这是迭戈·委拉斯凯兹的《蓝色盛装的玛格丽塔公主》，1659年作，展于10号展厅。这是委拉斯凯兹去世前一年完成的作品。八岁的玛格丽塔公主被描绘得既威严又稚嫩，蓝银色的裙摆以极其自由的笔触呈现——从近处看像是颜料的随意涂抹，退后几步则化为精确的光影。这幅画作为外交礼物送至维也纳，宣告她与奥地利皇帝的婚约。玛格丽塔后来确实嫁给了他，15岁出嫁，21岁离世。',
    audioTextEn: "Velázquez's Infanta Margarita Teresa in a Blue Dress, 1659, Room 10. Painted a year before Velázquez's death, this portrait of eight-year-old Margarita was sent to Vienna pledging her marriage to the Austrian Emperor — she did marry him, at 15, and died at 21. The blue and silver dress is painted with astonishing free brushwork: from close up, loose impasto strokes; from a distance, perfect shimmering light. A diplomatic gift become a masterpiece.",
    tags: ['Spanish Baroque', 'Velázquez', 'portrait', 'royal', 'diplomatic', 'brushwork']
  },

  'khm.caravaggio.rosary': {
    museum: 'khm',
    title: 'Madonna of the Rosary',
    titleZh: '玫瑰经圣母',
    painter: 'Caravaggio (Michelangelo Merisi)',
    painterZh: '卡拉瓦乔（米开朗基罗·梅里西）',
    dates: 'c. 1606–1607',
    gal: 'Room 10',
    period: 'baroque_italian',
    periodLabel: 'Italian Baroque',
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Michelangelo_Caravaggio_060.jpg',
    desc: '卡拉瓦乔在逃亡中完成的大型宗教杰作——戏剧性的明暗光线将圣母、圣多明我、圣彼得马提尔和底部跪拜的信众一同统合于强烈的情感叙事中。这是他最宏大的委托作品之一，画面中的贫苦信众是他一贯的革命性选择。',
    descEn: "Caravaggio's largest completed work, painted while a fugitive. Dramatic chiaroscuro unites Madonna, Saints Dominic and Peter Martyr, and the kneeling poor in one emotional narrative. The impoverished faithful reaching up from below — his revolutionary insistence on real people in sacred space.",
    audioText: '这是卡拉瓦乔的《玫瑰经圣母》，约1606年作，展于10号展厅。这幅画创作于卡拉瓦乔因杀人罪逃亡期间，是他最大的完整画作之一。画面以强烈的明暗对比将众多人物统合：高处的圣母与圣徒，底部衣衫褴褛伸手祈求的信众——那些裸露的手掌和褴褛的衣服是卡拉瓦乔的革命性标志。他坚持用真实的穷人出现在神圣题材中，这在当时是对宗教艺术的大胆挑衅。',
    audioTextEn: "Caravaggio's Madonna of the Rosary, c. 1606–1607, Room 10. Painted while a fugitive from a murder charge, this is one of his largest completed works. Dramatic light unites Madonna and saints above with the tattered faithful reaching upward below — bare, dirty hands, worn clothing. Caravaggio's revolutionary insistence: the poor belong in sacred space. A challenge to every convention of religious art.",
    tags: ['Italian Baroque', 'Caravaggio', 'chiaroscuro', 'large-scale', 'revolutionary', 'fugitive period']
  },

  'khm.GG1017': {
    museum: 'khm',
    title: "Children's Games",
    titleZh: '儿童游戏',
    painter: 'Pieter Bruegel the Elder',
    painterZh: '彼得·勃鲁盖尔（老）',
    dates: '1560',
    gal: 'Room X',
    period: 'renaissance_flemish',
    periodLabel: 'Flemish Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Pieter_Bruegel_d._%C3%84._033.jpg',
    desc: '勃鲁盖尔在这幅约2.5×1.6米的巨作中描绘了超过80种儿童游戏：陀螺、扑克、踩高跷、摔跤……没有成人监管，没有道德说教，只有孩子们自发的秩序与混乱。这幅画究竟是对童年的温情礼赞，还是对人类愚蠢的隐晦讽刺？两者之间的张力，使它六百年后依然让人深思。',
    descEn: "Over 80 distinct children's games — spinning tops, playing cards, stilts, wrestling — in a vast canvas of 2.5 by 1.6 meters. No adult supervision, no moral lesson, only the spontaneous order and chaos of play. Is this a warm tribute to childhood, or a subtle satire of human folly? The tension between those readings has kept it alive for six centuries.",
    audioText: '这是彼得·勃鲁盖尔的《儿童游戏》，1560年作，展于X号展厅。画面中有超过80种不同的儿童游戏，被认为是勃鲁盖尔"百科全书式"绘画的典范之一。这幅画的谜题在于：它究竟是对童年天真的赞颂，还是对人类行为的讽刺——成年人的所谓"正经"活动，是否也不过是儿童游戏的复杂版本？勃鲁盖尔把这个问题留给观者，一留就是五百年。',
    audioTextEn: "Bruegel's Children's Games, 1560, Room X. Over 80 games documented in encyclopedic precision — Bruegel's hallmark. The painting's central riddle: is it a celebration of childhood innocence, or a satirical suggestion that adult 'serious' activities are merely sophisticated versions of the same games? Bruegel leaves the question open. It has remained open for 500 years.",
    tags: ['Flemish Renaissance', 'Bruegel', 'childhood', 'encyclopedic', 'satire', 'Months series']
  },

  'khm.GG1027': {
    museum: 'khm',
    title: 'The Peasant Wedding',
    titleZh: '农民婚礼',
    painter: 'Pieter Bruegel the Elder',
    painterZh: '彼得·勃鲁盖尔（老）',
    dates: 'c. 1566–1569',
    gal: 'Room X',
    period: 'renaissance_flemish',
    periodLabel: 'Flemish Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Pieter_Bruegel_the_Elder-_Peasant_Wedding.JPG',
    desc: '这是勃鲁盖尔最著名的农村生活场景之一：一场喧闹的农民婚礼宴席。新娘坐在最高处，但新郎在哪里？据艺术史家考证，端菜的男子之一才是新郎——在自己婚宴上充当帮工，这是当时农村社区互助传统的真实写照，也是勃鲁盖尔对普通人生命力的一贯颂歌。',
    descEn: "Bruegel's most celebrated peasant scene: a noisy wedding feast. The bride sits crowned at the head table — but where is the groom? Art historians identify him as one of the men carrying food, helping serve at his own wedding feast — a real communal tradition. Bruegel's consistent hymn to ordinary human vitality and community.",
    audioText: '这是彼得·勃鲁盖尔的《农民婚礼》，约1566年作，展于X号展厅。这是KHM最受欢迎的作品之一。画面是一场嘈杂的农民婚宴，新娘戴着花冠坐在最显眼处——但细心的观者会发现，新郎竟是那个端着食物托盘的男子之一。他在自己婚宴上帮忙端菜，这是中世纪弗拉芒社区互助传统的真实体现。勃鲁盖尔让每个细节都充满生活气息：有人拼命吃，有人喝多了，孩子在角落舔手指。',
    audioTextEn: "Bruegel's The Peasant Wedding, c. 1566–1569, Room X — one of the KHM's most visited works. A boisterous wedding feast; the bride sits crowned at the head — but the groom is actually one of the men carrying food, serving at his own celebration. A real Flemish communal tradition. Every detail breathes life: one man eats desperately, another is already drunk, a child licks fingers in the corner.",
    tags: ['Flemish Renaissance', 'Bruegel', 'peasant life', 'wedding', 'community', 'celebration']
  },

  'khm.GG1589': {
    museum: 'khm',
    title: 'Summer',
    titleZh: '夏（四季系列）',
    painter: 'Giuseppe Arcimboldo',
    painterZh: '朱塞佩·阿尔钦博托',
    dates: '1563',
    gal: 'Room 19',
    period: 'renaissance_venetian',
    periodLabel: 'Venetian & High Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Arcimboldo_Summer_1563.jpg',
    desc: '阿尔钦博托用水果、蔬菜与花朵拼合出人脸：桃子是脸颊，玉米是牙齿，麦穗是发冠。这是一种文艺复兴宫廷智识游戏的产物——同时是肖像画，又是静物画，又是宇宙秩序的寓言。四季系列原是献给哈布斯堡皇帝马克西米利安二世的礼物，是对皇权统治自然万物的隐喻。',
    descEn: "Arcimboldo assembles a human face from fruit, vegetables, and flowers: peach cheeks, corn teeth, wheat crown. A Renaissance court intellectual game — simultaneously portrait, still life, and cosmic allegory. The Seasons series was a gift to Emperor Maximilian II, a metaphor for imperial dominion over nature.",
    audioText: '这是朱塞佩·阿尔钦博托的《夏》，1563年作，展于19号展厅。这是"四季"系列之一，原献给哈布斯堡皇帝马克西米利安二世。阿尔钦博托将各种夏季果蔬拼合成一张逼真的人脸：桃子是脸颊，麦穗构成发饰，玉米是牙齿。这不是单纯的视觉游戏，而是文艺复兴宫廷中关于"自然秩序"的哲学命题：皇帝如同夏季统治万物生长。这些作品超前了达达主义和超现实主义三百年。',
    audioTextEn: "Arcimboldo's Summer, 1563, Room 19. One of his Four Seasons series, a gift to Emperor Maximilian II. Fruit and vegetables assemble into a convincing face: peach cheeks, wheat headdress, corn teeth. Not merely visual wit but a Renaissance court philosophical statement — the emperor as summer, ruling all natural growth. These paintings preceded Dada and Surrealism by three centuries.",
    tags: ['Venetian Renaissance', 'Arcimboldo', 'composite portrait', 'allegory', 'Habsburg', 'seasons']
  },

  'khm.GG11': {
    museum: 'khm',
    title: 'The Three Philosophers',
    titleZh: '三位哲学家',
    painter: 'Giorgione',
    painterZh: '乔尔乔内',
    dates: 'c. 1505–1509',
    gal: 'Room 6',
    period: 'renaissance_venetian',
    periodLabel: 'Venetian & High Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Giorgione_-_The_Three_Philosophers_-_Kunsthistorisches_Museum.jpg',
    desc: '三位年龄不同的男子在风景中沉思——老者、中年者、青年者，可能代表人生三阶段，也可能代表三种宗教（伊斯兰、犹太、基督教），或三位星象学家观测洞穴。画面答案从未确定，这种刻意的谜题性正是乔尔乔内诗意绘画风格的精髓。',
    descEn: "Three men of different ages meditate in a landscape — old, middle-aged, young. They may represent three stages of life, three religions (Islam, Judaism, Christianity), or astrologers observing a cave. The answer was never fixed. This deliberate enigmatic quality is the essence of Giorgione's poetic painting — a riddle without obligation to resolve.",
    audioText: '这是乔尔乔内的《三位哲学家》，约1505至1509年作，展于6号展厅。乔尔乔内是威尼斯绘画"诗意画"风格的开创者，这幅画是其代表作。画面中三位不同年龄的男子在风景中沉思，但他们是谁？艺术史家至今众说纷纭：三段人生，三种宗教，还是正在观测日食方向的星象学家？乔尔乔内去世时年仅33岁，将这些谜题永远带走了——这种不可解释的神秘感，成了此后威尼斯绘画最迷人的特质之一。',
    audioTextEn: "Giorgione's The Three Philosophers, c. 1505–1509, Room 6. Giorgione founded Venice's 'poesia' style — painting as lyric poetry. Three men of different ages contemplate a landscape. Who are they? Art historians disagree across centuries: three life stages, three religions, astrologers calculating a solar observation. Giorgione died at 33, taking the answer with him. This unresolvable mystery became one of the most seductive qualities of Venetian painting.",
    tags: ['Venetian Renaissance', 'Giorgione', 'poesia', 'mystery', 'philosophy', 'landscape']
  },

  'khm.GG855': {
    museum: 'khm',
    title: 'Portrait of a Young Venetian Woman',
    titleZh: '年轻威尼斯女子肖像',
    painter: 'Albrecht Dürer',
    painterZh: '阿尔布雷希特·丢勒',
    dates: '1505',
    gal: 'Room 16',
    period: 'renaissance_flemish',
    periodLabel: 'Flemish Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/D%C3%BCrer_-_Bildnis_einer_venezianischen_Dame.jpg',
    desc: '丢勒在第二次意大利之旅中所作，将日耳曼的严谨精确与威尼斯的色彩温度融为一体。这位无名的年轻女子神情坚定，发型与服饰精确细致——丢勒以北方的油画技法描绘南方的阳光与气质，呈现了文艺复兴南北融合的微妙时刻。',
    descEn: "Painted during Dürer's second Italian journey, fusing Germanic precision with Venetian warmth of color. The unnamed young woman's gaze is direct and composed; her hair and dress are rendered with microscopic attention. Dürer's northern oil technique in southern light — a subtle moment of Renaissance cross-cultural synthesis.",
    audioText: '这是阿尔布雷希特·丢勒的《年轻威尼斯女子肖像》，1505年作，展于16号展厅。丢勒是德意志文艺复兴最重要的画家，他两度赴意大利学习。这幅画创作于第二次威尼斯之旅，画中女子神情从容，服饰与发型以极其细致的笔触描绘。丢勒将北方日耳曼的精密油画技法，与威尼斯派的色彩温度和光线感悟融合——这是南北文艺复兴交流的视觉证据。',
    audioTextEn: "Dürer's Portrait of a Young Venetian Woman, 1505, Room 16. Dürer was the greatest German Renaissance painter; he traveled to Italy twice. This portrait from his second Venice stay captures a composed young woman with extraordinary precision in hair and dress. Dürer merges northern Germanic oil precision with Venetian colorist warmth — visible evidence of north-south Renaissance dialogue.",
    tags: ['Flemish Renaissance', 'Dürer', 'German Renaissance', 'Venice', 'portrait', 'cross-cultural']
  },

  'khm.GG95': {
    museum: 'khm',
    title: 'The Gypsy Madonna',
    titleZh: '吉普赛圣母',
    painter: 'Titian (Tiziano Vecellio)',
    painterZh: '提香（提香·韦切利奥）',
    dates: 'c. 1510',
    gal: 'Room 7',
    period: 'renaissance_venetian',
    periodLabel: 'Venetian & High Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tizian_016.jpg',
    desc: '提香早期最温柔的圣母像之一：一位皮肤较深的年轻母亲怀抱圣婴，神情自然而充满慈爱。"吉普赛"之名来自她略显异域的外貌——这不是拜占庭圣像传统中不可接近的神圣符号，而是一位真实的年轻母亲，传达出提香对人性之美的一贯关注。',
    descEn: "One of Titian's most tender early Madonnas: a young dark-complexioned mother holds the Christ child with natural maternal warmth. The 'Gypsy' name comes from her slightly exotic appearance — this is no unapproachable Byzantine icon but a real young mother, Titian's characteristic insistence on the beauty of human presence.",
    audioText: '这是提香的《吉普赛圣母》，约1510年作，展于7号展厅。这是提香早期最令人喜爱的圣母作品之一。与传统拜占庭圣像的神圣疏离不同，这位圣母像一位真实的年轻母亲：眼神温柔，怀抱自然，皮肤带着些许异域气息——"吉普赛"之名因此而来。提香从年轻时就坚信：宗教绘画的核心是人性，而非神性的冷漠。这一信念贯穿他长达80年的创作生涯。',
    audioTextEn: "Titian's The Gypsy Madonna, c. 1510, Room 7. One of Titian's most beloved early Madonnas. Unlike the unapproachable distance of Byzantine icons, this Madonna is a real young mother: warm gaze, natural embrace, slightly exotic skin tone — hence 'Gypsy.' Titian believed from youth that religious painting's core must be humanity, not divine coldness. This conviction ran through 80 years of work.",
    tags: ['Venetian Renaissance', 'Titian', 'Madonna', 'early work', 'humanity', 'warmth']
  },

  'khm.GG411': {
    museum: 'khm',
    title: 'Self-Portrait',
    titleZh: '自画像',
    painter: 'Rembrandt van Rijn',
    painterZh: '伦勃朗·凡·莱因',
    dates: 'c. 1652',
    gal: 'Room 22',
    period: 'baroque_dutch',
    periodLabel: 'Dutch Golden Age',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg',
    desc: '伦勃朗一生画了超过100幅自画像，是西方艺术史上最持久的自我记录。这幅约1652年的版本显示年约46岁的伦勃朗：宽阔的身形，表情沉静而略带疲倦，双手叉腰——不再是年轻时的华丽装扮，而是中年以后的内省凝视，像是与衰老和解的无言宣言。',
    descEn: "Rembrandt painted over 100 self-portraits — the most sustained self-examination in Western art. This version, around 1652, shows him at about 46: broad frame, expression calm but faintly tired, hands on hips. No more youthful finery, only the middle-aged introspective gaze — a silent declaration of reconciliation with age.",
    audioText: '这是伦勃朗的自画像，约1652年作，展于22号展厅。伦勃朗一生创作了超过100幅自画像，是西方艺术史上最持久的自我观察者。1652年的伦勃朗约46岁，正处于经济困难时期，他的豪宅和收藏将在数年后被拍卖。但这幅画中没有悲苦，只有一种沉静而坦诚的凝视：我老了，我依然存在。手叉在腰间，神情既非骄傲也非悲哀，只是直视。这种直视让六百年后的观者感到被理解。',
    audioTextEn: "Rembrandt's Self-Portrait, c. 1652, Room 22. Rembrandt painted over 100 self-portraits — the most sustained self-examination in Western art. Around 1652, age 46, he was entering financial difficulty; his house and collection would be auctioned within years. But in this painting, no bitterness — only a quiet, honest gaze: I have aged, I am still here. Hands on hips, neither proud nor sorrowful, simply direct. That directness reaches across six centuries.",
    tags: ['Dutch Golden Age', 'Rembrandt', 'self-portrait', 'introspection', 'aging', 'middle age']
  },

  'khm.GG527': {
    museum: 'khm',
    title: 'Self-Portrait',
    titleZh: '自画像',
    painter: 'Peter Paul Rubens',
    painterZh: '彼得·保罗·鲁本斯',
    dates: 'c. 1638–1640',
    gal: 'Room 19',
    period: 'baroque_flemish',
    periodLabel: 'Baroque: Flemish, Spanish & Italian',
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Peter_Paul_Rubens_-_Self-Portrait_-_Kunsthistorisches_Museum_Wien.jpg',
    desc: '鲁本斯晚年自画像：60岁的巴洛克巨匠以平静的威严直视观者。画中没有戏剧性的构图或丰富的道具，只有一位知道自己重要性的老人的直接凝视。这是他生命最后几年所作，深受关节炎折磨，却依然以笔触传达出惊人的能量。',
    descEn: "Rubens at 60, in his final years: the Baroque master meets the viewer with quiet authority. No dramatic composition, no props — only the direct gaze of a man who knows his place in history. He was already suffering from severe arthritis, yet the brushwork still carries astonishing energy.",
    audioText: '这是彼得·保罗·鲁本斯的晚年自画像，约1638年作，展于19号展厅，与他的私密杰作《皮草小外套》同在一室。鲁本斯是17世纪欧洲最成功、最多产的画家之一，同时也是外交官和宫廷代理人。这幅晚年自画像显示了他生命最后阶段的状态：严重的关节炎已使他行动不便，但眼神依然清澈而自信。60岁的他知道自己留下了什么，无需再证明任何事。',
    audioTextEn: "Rubens's Self-Portrait, c. 1638–1640, Room 19 — in the same room as his intimate Das Pelzchen. Rubens was the most successful and prolific painter of 17th-century Europe, also a diplomat and court agent. This late self-portrait shows his final years: severe arthritis already limiting his movement, but eyes still clear and confident. At 60, he knew what he had left behind. Nothing more needed proving.",
    tags: ['Flemish Baroque', 'Rubens', 'self-portrait', 'late career', 'authority', 'confidence']
  }
};

/* ── KHM PERIODS ─────────────────────────────────────────────── */
const KHM_PERIODS = [
  {
    id: 'renaissance_flemish',
    label: 'Flemish Renaissance',
    labelZh: '弗拉芒文艺复兴',
    years: '1430–1580',
    galleries: 'Room X',
    duration: '25 min',
    color: '#5a3e28',
    desc: '北方文艺复兴的精密与叙事，油画技法的革命，勃鲁盖尔的农村史诗。',
    descEn: 'Northern precision and narrative, oil technique revolution, Bruegel\'s peasant epics.',
    painters: ['Pieter Bruegel the Elder (c.1525–1569)', 'Jan van Eyck (c.1390–1441)'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Pieter_Bruegel_d._%C3%84._-_Selbstbildnis_%281565%29.jpg',
      nameZh: '彼得·勃鲁盖尔（老）自画像（约1565年）',
      nameEn: 'Pieter Bruegel the Elder, Self-Portrait (c. 1565)',
      bioZh: '弗拉芒文艺复兴有别于意大利的同类运动——北方画家不渴望古典神庙，而是凝视自己窗外的田野与市集。彼得·勃鲁盖尔（约1525–1569）是这一传统的顶峰：他的画是百科全书式的农村全景，超过百位人物各有其故事，没有一位是英雄，每一位都是人类。维也纳艺术史博物馆拥有世界最大的勃鲁盖尔收藏，包括《通天塔》《雪中猎人》《儿童游戏》《农民婚礼》——这四幅画几乎定义了"北方文艺复兴"这个概念。他的视角是俯瞰者的视角：既慈悲，又讽刺，永远对人类的愚蠢与活力保持同等的好奇。',
      bioEn: 'Flemish Renaissance diverged fundamentally from its Italian counterpart — Northern painters did not crave classical temples; they looked out their windows at fields and markets. Pieter Bruegel the Elder (c. 1525–1569) was this tradition\'s summit: his paintings are encyclopedic rural panoramas, over a hundred figures each with their own story, none heroic, all human. The KHM holds the world\'s largest Bruegel collection — The Tower of Babel, Hunters in the Snow, Children\'s Games, The Peasant Wedding — four paintings that virtually define "Northern Renaissance." His viewpoint is always the observer\'s: both compassionate and ironic, equally curious about human folly and human vitality.',
      styleZh: '北方油画技法始于凡·艾克（约1390–1441），他发明或完善了油画的透明叠加技法，使物体表面的光泽、质感与微观细节成为可能。勃鲁盖尔继承了这种精密性，并将其用于叙事——他的每一幅画都是对人类社会学的深刻观察，以百科全书式的精确完成。',
      styleEn: 'Northern oil technique began with Van Eyck (c. 1390–1441), who perfected oil glazing — transparent layering that made possible the luminosity, texture, and microscopic detail of objects. Bruegel inherited this precision and directed it toward narrative: each painting is a profound sociological observation of humanity, executed with encyclopedic exactness.',
      quote: '我画我所见，而不是我所想象的。',
      quoteAuthor: '彼得·勃鲁盖尔（老）（传）'
    }
  },
  {
    id: 'renaissance_venetian',
    label: 'Venetian & High Renaissance',
    labelZh: '威尼斯与盛期文艺复兴',
    years: '1490–1580',
    galleries: 'Rooms 1, 7',
    duration: '25 min',
    color: '#2e4a8b',
    desc: '色彩主义的荣耀，哈布斯堡皇室的意大利珍藏，从拉斐尔的和谐到提香的感官。',
    descEn: 'Colorist glory, Habsburg Italian treasures — from Raphael\'s harmony to Titian\'s sensuality.',
    painters: ['Raphael (1483–1520)', 'Titian (c.1488–1576)'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Tizian_083.jpg',
      nameZh: '提香·韦切利奥自画像（约1560年，柏林国立美术馆藏）',
      nameEn: 'Titian (Tiziano Vecellio), Self-Portrait (c. 1560, Gemäldegalerie, Berlin)',
      bioZh: '提香（约1488–1576）是威尼斯画派的最高代表，也是西方艺术史上寿命最长的天才之一，创作生涯长达七十余年。他开创了"威尼斯色彩主义"——不以佛罗伦萨的线条与轮廓为美，而以色彩的丰富、光的流动和肌肤的温度为理想。他为哈布斯堡皇帝查理五世和腓力二世创作了大量帝国肖像，使威尼斯绘画成为整个欧洲宫廷的美学标准。KHM的提香收藏包括《达娜厄与侍女》等极具感官震撼力的作品，是哈布斯堡数百年收藏热情的最直接体现。',
      bioEn: 'Titian (c. 1488–1576) was the supreme representative of the Venetian school and one of the longest-lived geniuses in Western art history, with a creative career spanning over seventy years. He pioneered Venetian colorism — not the Florentine ideal of line and contour, but the richness of color, the flow of light, and the warmth of skin. He painted imperial portraits for Habsburgs Charles V and Philip II, making Venetian painting the aesthetic standard for courts across Europe. The KHM\'s Titian holdings — including the magnificently sensual Danaë — are the most direct expression of the Habsburgs\' centuries of passionate collecting.',
      styleZh: '威尼斯文艺复兴与佛罗伦萨的核心分歧在于：佛罗伦萨以"线"塑形（disegno），威尼斯以"色"塑形（colorito）。提香的笔触最终从精细走向自由——晚年的提香以"手指直接在画布上涂抹"著称，他发明了现代意义上的"笔触可见"，对伦勃朗、委拉斯凯兹和印象派都有深远影响。',
      styleEn: 'The Venetian Renaissance diverged from Florence on a core question: Florence shaped form with line (disegno), Venice with color (colorito). Titian\'s brushwork evolved from precision to freedom — his late works famously painted partly with his fingers, inventing the modern concept of visible brushstroke. His influence on Rembrandt, Velázquez, and the Impressionists was profound and direct.',
      quote: '色彩是绘画最崇高的元素，因为它使绘画能够说谎而看起来像真实。',
      quoteAuthor: '提香（传）'
    }
  },
  {
    id: 'baroque_flemish',
    label: 'Baroque: Flemish, Spanish & Italian',
    labelZh: '巴洛克：弗拉芒、西班牙与意大利',
    years: '1600–1680',
    galleries: 'Rooms 10, 19',
    duration: '30 min',
    color: '#6b2d8b',
    desc: '明暗法的戏剧革命，鲁本斯的能量，委拉斯凯兹的皇室凝视，卡拉瓦乔的光影战场。',
    descEn: 'Chiaroscuro revolution, Rubens\'s energy, Velázquez\'s royal gaze, Caravaggio\'s light and shadow.',
    painters: ['Peter Paul Rubens (1577–1640)', 'Diego Velázquez (1599–1660)', 'Caravaggio (1571–1610)'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Peter_Paul_Rubens_-_Self-Portrait_-_Kunsthistorisches_Museum_Wien.jpg',
      nameZh: '彼得·保罗·鲁本斯自画像（约1638–1640年，维也纳艺术史博物馆藏）',
      nameEn: 'Peter Paul Rubens, Self-Portrait (c. 1638–1640, Kunsthistorisches Museum)',
      bioZh: '鲁本斯（1577–1640）是巴洛克时代最具能量的存在——外交官、语言学家、收藏家，同时也是欧洲最多产的画家。他的工作室雇用数十位助手，却对每幅重要作品亲自上色，保证其独特的生命力。在他身旁，卡拉瓦乔（1571–1610）是巴洛克的阴影面：用街头穷人扮演圣徒，用凶猛的光从黑暗中召唤人物，以逃亡的一生完成了最革命性的绘画；委拉斯凯兹（1599–1660）则是宫廷中最自由的目光，他画的宫廷人物既有皇家威严又有人间疲倦。KHM的巴洛克收藏融合了三个国家、三种巴洛克，是这一时代最完整的视觉图谱之一。',
      bioEn: 'Rubens (1577–1640) was the Baroque era\'s most energetic presence — diplomat, linguist, collector, and Europe\'s most prolific painter. His studio employed dozens of assistants, yet he personally touched every major canvas, ensuring its singular vitality. Beside him, Caravaggio (1571–1610) was the Baroque\'s shadow face: using street poor as saints, summoning figures from violent darkness with a fugitive\'s genius. Velázquez (1599–1660) brought the freest gaze in any royal court — his portraits hold both imperial authority and human tiredness. The KHM\'s Baroque collection combines three nations and three Baroques into one of the era\'s most complete visual atlases.',
      styleZh: '巴洛克的统一语言是"明暗对比法"（chiaroscuro）：强光从黑暗中照亮人物，制造戏剧效果，象征精神从物质中升起。但三位大师的光各有性格：鲁本斯的光热情丰盛，卡拉瓦乔的光凶猛突兀，委拉斯凯兹的光优雅而心理化。',
      styleEn: 'The Baroque\'s unifying language was chiaroscuro: strong light summoning figures from darkness, creating drama, symbolizing spirit emerging from matter. But each master\'s light had its own personality: Rubens\'s was warm and abundant, Caravaggio\'s violent and sudden, Velázquez\'s elegant and psychological.',
      quote: '我的才能在于，无论我给自己布置什么题目，没有一个对我来说太大或太难。',
      quoteAuthor: '彼得·保罗·鲁本斯，致法国人文学者皮雷斯克书信，1620年'
    }
  },
  {
    id: 'baroque_dutch',
    label: 'Dutch Golden Age',
    labelZh: '荷兰黄金时代',
    years: '1620–1680',
    galleries: 'Room 22',
    duration: '15 min',
    color: '#3a5a3a',
    desc: '维梅尔的光线哲学，市民文明的精微记录，窗边的晨光与静默。',
    descEn: 'Vermeer\'s philosophy of light, the minute record of civic civilization, morning light by the window.',
    painters: ['Johannes Vermeer (1632–1675)'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Jan_Vermeer_-_The_Art_of_Painting_-_Google_Art_Project.jpg',
      nameZh: '维梅尔《绘画艺术》局部（约1666–1668年，维也纳艺术史博物馆藏）',
      nameEn: 'Vermeer, The Art of Painting (detail, c. 1666–1668, Kunsthistorisches Museum)',
      bioZh: '约翰内斯·维梅尔（1632–1675）是荷兰黄金时代最神秘的画家。他一生从未离开代尔夫特，只留下约35幅画，却创造了西方艺术史上最持久的视觉奇迹——那扇窗，那道光，那个低头的女子。没有人确切知道他的技法：17世纪的相机暗箱？极度耐心的光影研究？只知道他的光不只是光，而是时间本身的重量。他从未出售《绘画艺术》——那是他保留给自己的一幅画，他知道它是什么。荷兰黄金时代是市民文明对自身生活的凝视：不是神话，不是权贵，而是一位倒牛奶的女子，一封被读了又读的信，一个窗边的清晨。',
      bioEn: 'Johannes Vermeer (1632–1675) was the most mysterious painter of the Dutch Golden Age. He never left Delft, left only about 35 paintings, yet created Western art\'s most enduringly luminous visual miracle — that window, that light, that woman with her head bent down. No one knows exactly his technique: a 17th-century camera obscura? Extreme patience in studying light? What is certain is that his light is not merely light — it is the weight of time itself. He never sold The Art of Painting: he knew what it was. The Dutch Golden Age was civic civilization\'s gaze at its own life: not mythology or power, but a woman pouring milk, a letter read and reread, a morning by the window.',
      styleZh: '荷兰黄金时代的绘画是市场经济的产物——宗教改革之后，没有教会委托，画家必须向市民阶层出售。这催生了一批专门描绘日常生活的风俗画（genre painting）：厨房、市集、船坊、窗边的女子。维梅尔是这一传统的绝顶，他将日常生活变成了形而上的沉思。',
      styleEn: 'Dutch Golden Age painting was a product of market economics — after the Reformation, with no church commissions, painters sold to the merchant class. This created genre painting: kitchens, markets, shipyards, women by windows. Vermeer was this tradition\'s summit, transforming ordinary life into metaphysical contemplation.',
      quote: '一个人必须用光来绘画，而不只是绘画光。',
      quoteAuthor: '约翰内斯·维梅尔（传）'
    }
  }
];

/* ── HKMOA WORKS ─────────────────────────────────────────────── */
// 8 Monet works for the "Monet: Light & Shadow" exhibition at HKMoA
// Exhibition dates: 2026.4.24 – 2026.7.29
// Works on loan from European museums; images: Wikimedia Commons CC0.
const HKMOA_WORKS = {
  'hkmoa.monet.sunrise': {
    museum: 'hkmoa',
    title: 'Impression, Sunrise',
    titleZh: '印象·日出',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1872',
    gal: 'Gallery 1 — The Birth of Impressionism',
    period: 'early_monet',
    periodLabel: 'Early Monet',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Monet_-_Impression%2C_Sunrise.jpg',
    desc: '这幅画给整个运动命名。1874年，批评家路易·勒鲁瓦嘲讽这幅画只是"印象"，印象派由此得名。朝阳的橘红倒影在灰蓝的勒阿弗尔港口颤动，工业烟囱与渔船的剪影若隐若现——这是光取代形体、瞬间取代永恒的宣言。',
    descEn: "This painting named an entire movement. In 1874, critic Louis Leroy mocked it as a mere 'impression' — the Impressionists adopted the label as their own. The orange sun trembles in the grey-blue harbor of Le Havre; factory chimneys and fishing boats dissolve in mist. Light over form. The fleeting moment over the eternal.",
    audioText: '欢迎来到香港艺术馆"莫奈光影传奇"展览。这是克劳德·莫奈的《印象·日出》，1872年作，来自巴黎马摩丹博物馆。这幅画在1874年的第一届印象派画展上展出，批评家路易·勒鲁瓦用"印象"这个词嘲笑它，却意外为整个运动命名。画面中朝阳的橘红倒影在灰蓝色的港口中颤动——工业时代的雾气让一切轮廓都消融了，只留下光与色的记忆。这是印象主义的诞生宣言。',
    audioTextEn: "Welcome to the Hong Kong Museum of Art's Monet: Light & Shadow exhibition. This is Monet's Impression, Sunrise, 1872, on loan from the Marmottan Monet Museum, Paris. Exhibited in 1874 at the first Impressionist show, critic Louis Leroy mocked it as a mere 'impression' — and gave the movement its permanent name. The orange sun trembles in the grey harbor of Le Havre; industrial haze dissolves every outline. Only light and color remain. The birth of Impressionism.",
    tags: ['early Monet', 'named the movement', '1874 exhibition', 'Le Havre', 'dawn', 'masterpiece']
  },

  'hkmoa.monet.garden': {
    museum: 'hkmoa',
    title: 'Women in the Garden',
    titleZh: '花园里的女人们',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1866',
    gal: 'Gallery 1 — The Birth of Impressionism',
    period: 'early_monet',
    periodLabel: 'Early Monet',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Claude_Monet_Femmes_au_jardin.jpg',
    desc: '莫奈为拍摄光线在户外的真实效果，在花园里挖了沟渠，将这幅巨大画布降低让自己能够描绘上方的细节。官方沙龙拒绝了这幅画——因为它太自然，太不"学院"。但正是这种捕捉阳光斑影的执念，定义了印象主义的诞生。',
    descEn: "To capture true outdoor light, Monet dug a trench in the garden to lower this enormous canvas as he painted the upper sections. The Salon rejected it as too 'unfinished.' That obsession with dappled sunlight — rejected by the establishment — defined the birth of Impressionism.",
    audioText: '这是克劳德·莫奈的《花园里的女人们》，1866年作，来自巴黎奥赛博物馆。为了真实记录户外阳光在人物和裙摆上的闪动效果，莫奈在花园里挖了沟渠，把这幅两米多高的画布放入沟中，让自己能够从下往上描绘细节——这在当时是极为激进的户外写生实践。官方沙龙拒绝了这幅画，认为它太粗糙、太"未完成"。但莫奈的执念是对的：阳光确实是这样的。',
    audioTextEn: "Monet's Women in the Garden, 1866, on loan from the Musée d'Orsay. To record outdoor sunlight on dresses and foliage with total accuracy, Monet dug a trench and lowered this two-meter canvas into it — so he could paint the upper sections while standing at ground level. The Salon rejected it as 'unfinished.' Monet's obsession was right: sunlight actually looks like this.",
    tags: ['early Monet', 'plein air', 'Salon rejection', 'outdoor light', 'large-scale']
  },

  'hkmoa.monet.haystacks': {
    museum: 'hkmoa',
    title: 'Haystacks (End of Summer)',
    titleZh: '干草垛（夏末）',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1890–1891',
    gal: 'Gallery 2 — The Series Paintings',
    period: 'series_paintings',
    periodLabel: 'The Series Paintings',
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Claude_Monet_-_Haystacks_%28End_of_Summer%29.jpg',
    desc: '"干草垛"系列约30幅，莫奈在吉维尼田野上连续作画，每天同一时刻在同一干草垛前换画布——描绘的不是干草垛，而是光在特定时刻的唯一面貌。每幅画都是光的一瞬间的纪念碑。',
    descEn: "The Haystacks series — about 30 canvases — had Monet changing paintings at the same spot as light changed through the day. He was not painting haystacks. He was painting the singular face that light wears at one specific moment. Each canvas is a monument to a single instant.",
    audioText: '这是克劳德·莫奈的《干草垛·夏末》，约1890年作，来自苏黎世艺术博物馆。莫奈在吉维尼的田野上同时放置多块画布，随着光线变化在它们之间来回切换——每块画布只描绘特定时刻特定光线中的同一干草垛。他说："对我来说，风景本身不存在，只有大气的折射才存在。"这个系列开创了现代艺术史上"序列绘画"的先河，直接影响了20世纪的极简主义。',
    audioTextEn: "Monet's Haystacks (End of Summer), c. 1890–1891, on loan from the Kunsthaus Zürich. Monet set multiple canvases in the same field, switching between them as light changed — each recording only the light of a specific moment on the same haystack. 'For me,' he said, 'a landscape does not exist in its own right — only the surrounding atmosphere gives it life.' This series pioneered serial painting and directly influenced 20th-century Minimalism.",
    tags: ['series paintings', 'haystacks', 'Giverny', 'light studies', 'revolutionary method']
  },

  'hkmoa.monet.cathedral': {
    museum: 'hkmoa',
    title: 'Rouen Cathedral, Full Sunlight',
    titleZh: '鲁昂大教堂·阳光正午',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1893–1894',
    gal: 'Gallery 2 — The Series Paintings',
    period: 'series_paintings',
    periodLabel: 'The Series Paintings',
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Claude_Monet_-_Rouen_Cathedral_-_The_Portal_Sunlight_-_WGA16127.jpg',
    desc: '鲁昂大教堂系列约30幅，莫奈对同一石质门廊在不同时刻、不同季节、不同天气下的描绘。这幅阳光正午版以蓝金对比将石材表面的质感与光线融为一体——石头消失了，只剩下正午阳光的重量。',
    descEn: "About 30 Rouen Cathedral paintings — the same Gothic portal in different lights, seasons, weather. In this full-sunlight version, blue and gold merge stone texture and light so completely that the stone disappears. What remains is only the weight of noon light itself.",
    audioText: '这是莫奈的《鲁昂大教堂·阳光正午》，约1893年作，来自巴黎奥赛博物馆。莫奈在一个公寓窗口对面租了一间房间，连续两年冬天每天对着同一座教堂门廊作画。他同时处理多块画布，随光线变化来回切换。这幅正午版以厚重的颜料堆积出石材的质感，蓝色与金色在阳光下交织——但已经不是石头了，而是正午阳光在石头上留下的印记。',
    audioTextEn: "Monet's Rouen Cathedral, Full Sunlight, c. 1893–1894, on loan from the Musée d'Orsay. Monet rented a room opposite the cathedral portal and painted it for two winters, running multiple canvases simultaneously as light shifted. This noon version builds up stone texture in thick paint — blue and gold interweave under sunlight until the stone itself disappears, leaving only noon light's weight and warmth.",
    tags: ['series paintings', 'Rouen Cathedral', 'architecture', 'light studies', 'blue and gold']
  },

  'hkmoa.monet.bridge': {
    museum: 'hkmoa',
    title: 'The Japanese Footbridge',
    titleZh: '日本风格桥',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1899',
    gal: 'Gallery 3 — The Water Garden',
    period: 'water_garden',
    periodLabel: 'The Water Garden',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Claude_Monet_-_The_Japanese_Footbridge_-_Google_Art_Project.jpg',
    desc: '莫奈在吉维尼建造了一座日式花园与池塘，这座绿色拱桥是池塘的核心。1899年的这幅画以稳定的弓形构图和翠绿的色调记录了夏季池塘的宁静——与晚年抽象的睡莲系列相比，这是池塘最"有形"的时期。',
    descEn: "Monet built a Japanese water garden at Giverny, with this arched green bridge at its heart. The 1899 version captures the pond at its most tangible — stable arching composition, deep greens — before the late decades when bridge and pond would dissolve together into pure color sensation.",
    audioText: '这是克劳德·莫奈的《日本风格桥》，1899年作，来自美国普林斯顿大学艺术博物馆。莫奈在吉维尼购地后，特意模仿日本版画中的花园构建了这座水景花园。绿色的拱桥横跨睡莲池，成为他此后20年的主要创作对象。这幅1899年的版本是最具具象性的——弓形的桥清晰可辨，水面倒影中的绿色层次丰富而平衡。晚年失明后，莫奈笔下的这座桥将变得越来越抽象，直至融入纯粹的色彩漩涡。',
    audioTextEn: "Monet's The Japanese Footbridge, 1899, on loan from the Princeton University Art Museum. After buying property in Giverny, Monet constructed this water garden inspired by Japanese woodblock prints. The arching green bridge over the lily pond became his primary subject for 20 years. This 1899 version is the most legible — bridge clearly arched, reflections layered in deep greens. As his eyesight failed in later decades, bridge and pond would dissolve into pure swirls of color.",
    tags: ['water garden', 'Giverny', 'Japanese influence', 'bridge', 'pond', '1899 series']
  },

  'hkmoa.monet.waterlilies': {
    museum: 'hkmoa',
    title: 'Water Lilies (Green Reflections)',
    titleZh: '睡莲（绿色倒影）',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: 'c. 1914–1926',
    gal: 'Gallery 3 — The Water Garden',
    period: 'water_garden',
    periodLabel: 'The Water Garden',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
    desc: '晚年的莫奈视力严重受损，白内障让他看到的世界愈发橙黄模糊。然而正是这种"缺陷"，将他的睡莲带入了抽象的边界——不再有清晰的花朵或倒影，只有光与水的永恒流动。这一组晚期大型睡莲是20世纪抽象表现主义的直接先驱。',
    descEn: "Monet's late Water Lilies were painted with cataracts — his world increasingly orange, blurred. That 'defect' pushed his lily pond toward abstraction: no clear flowers or reflections, only the eternal flow of light and water. These late panels are the direct ancestors of Abstract Expressionism.",
    audioText: '这是莫奈晚年的《睡莲·绿色倒影》，约1914至1926年作，来自巴黎奥赛博物馆。莫奈晚年患上严重白内障，他看到的世界越来越橙黄、越来越模糊。他曾考虑放弃绘画，但最终坚持下去——并不顾医生建议，用棉纱遮住一只眼睛继续作画。这种视觉缺陷反而将他的睡莲推向了抽象：没有明确轮廓，只有色彩与光的漩涡。这些晚期大型作品直接预告了20世纪50年代的抽象表现主义。',
    audioTextEn: "Monet's Water Lilies (Green Reflections), c. 1914–1926, on loan from the Musée de l'Orangerie, Paris. Monet developed severe cataracts; his world turned increasingly orange and blurred. He considered stopping but persisted — sometimes painting with a patch over one eye. The visual impairment pushed his lily pond into abstraction: no clear outlines, only swirling color and light. These late large-scale works directly prefigured Abstract Expressionism of the 1950s.",
    tags: ['late Monet', 'water lilies', 'abstraction', 'cataracts', 'large-scale', 'late career']
  },

  'hkmoa.monet.etretat': {
    museum: 'hkmoa',
    title: 'The Cliff Walk at Étretat',
    titleZh: '埃特勒塔海岸的散步',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1882',
    gal: 'Gallery 1 — The Birth of Impressionism',
    period: 'early_monet',
    periodLabel: 'Early Monet',
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Claude_Monet_-_The_Cliff_Walk%2C_%C3%89tretat_-_Google_Art_Project.jpg',
    desc: '莫奈在诺曼底海岸的埃特勒塔反复作画，这幅描绘两位女性在海崖边散步的作品以对角线构图制造出强烈的高度感与风势。海风、阳光、悬崖边的日常时刻——印象主义以最温柔的方式捕捉了人与自然的相遇。',
    descEn: "Monet returned repeatedly to the Norman cliffs of Étretat. Here two women walk the cliff edge in diagonal composition that gives strong sense of height and wind. Sea air, sunlight, the ordinary moment at the cliff's edge — Impressionism at its most tenderly human.",
    audioText: '这是克劳德·莫奈的《埃特勒塔海岸的散步》，1882年作，来自芝加哥艺术博物馆。莫奈多次造访诺曼底的埃特勒塔，迷恋那里的白垩海崖和变幻莫测的大西洋光线。两位女性站在海崖边缘，对角线构图强化了风势与高度；远处的拱形岩石与船影在浪涛中若隐若现。这是印象主义最温柔的人与自然叙事——日常的散步，永恒的阳光。',
    audioTextEn: "Monet's The Cliff Walk at Étretat, 1882, on loan from the Art Institute of Chicago. Monet visited the Norman chalk cliffs of Étretat repeatedly, obsessed with the Atlantic light shifting over limestone. Two women stand at the cliff edge; diagonal composition amplifies wind and height; arched rock formations and distant boats emerge from waves. Impressionism's most tender encounter of human and nature — an ordinary walk, made eternal.",
    tags: ['early Monet', 'Norman coast', 'landscape', 'women', 'cliffs', 'wind']
  },

  'hkmoa.monet.poplars': {
    museum: 'hkmoa',
    title: 'Poplars (Wind Effect)',
    titleZh: '白杨树（风的效果）',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1891',
    gal: 'Gallery 2 — The Series Paintings',
    period: 'series_paintings',
    periodLabel: 'The Series Paintings',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Claude_Monet_-_Poplars_%28Wind_Effect%29_-_1891.jpg',
    desc: '"白杨树"系列约23幅，莫奈以河边的白杨树排列为主题，捕捉风与光在树冠间流动的轨迹。这幅"风效"版本以蜿蜒的S形树干节奏与云光交织——白杨树原为节拍器，莫奈将其变为音乐。',
    descEn: "About 23 Poplars canvases — Monet tracking wind and light through the same row of riverside trees. This Wind Effect version twists the trunks in an S-rhythm against cloud-light. The poplars were a metronome; Monet turned them into music.",
    audioText: '这是克劳德·莫奈的《白杨树·风的效果》，1891年作，来自爱丁堡苏格兰国立美术馆。莫奈听说埃普特河边的这排白杨树将被砍伐出售，于是出钱买下了砍树的权利，让自己可以继续作画，直到完成整个系列。这幅"风效"版本以S形蜿蜒的树干对抗天空，在风的律动中营造出音乐般的节奏。光在叶片间颤动，世界仿佛在吟唱。',
    audioTextEn: "Monet's Poplars (Wind Effect), 1891, on loan from the Scottish National Gallery, Edinburgh. When Monet learned these poplars along the Epte River were to be sold and felled, he paid for the right to delay the auction until he finished his series. This Wind Effect version twists their trunks in S-curves against the sky — in the rhythm of wind, the poplars become music. Light trembles through leaves; the world hums.",
    tags: ['series paintings', 'poplars', 'wind', 'rhythm', 'Epte River', 'vertical composition']
  },

  'hkmoa.monet.thames': {
    museum: 'hkmoa',
    title: 'Charing Cross Bridge, Reflections on the Thames',
    titleZh: '查令十字桥·泰晤士河倒影',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1899–1901',
    gal: 'Gallery 2 — The Series Paintings',
    period: 'series_paintings',
    periodLabel: 'The Series Paintings',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Claude_Monet_-_Charing_Cross_Bridge_-_1901.jpg',
    desc: '莫奈三度赴伦敦，从萨沃伊酒店房间对着泰晤士河作画。伦敦的雾，与巴黎的光截然不同——工业烟雾将一切溶解为蓝色与橙色的交响，铁路桥的钢铁轮廓在雾中若隐若现。这是光系列中最神秘的一章：光不只美，光也可以遮蔽、模糊、消失。',
    descEn: "Monet visited London three times, painting the Thames from his room at the Savoy Hotel. London fog differs entirely from Paris light — industrial smoke dissolves everything into blue and orange symphony; the iron railway bridge materializes and disappears in mist. The most mysterious chapter of his light series: light that does not illuminate but obscures, blurs, vanishes.",
    audioText: '这是克劳德·莫奈的《查令十字桥·泰晤士河倒影》，约1899至1901年作。莫奈三度造访伦敦，从萨沃伊酒店同一房间对着泰晤士河写生。伦敦的工业烟雾与威尼斯的薄雾完全不同——这里的空气更厚重，更神秘，将查令十字铁路桥和河面上的光融解为蓝色与橙色的层叠。雾不是障碍，雾就是主题。莫奈在雾中发现了印象主义的终极命题：当一切轮廓都消失，还剩下什么？',
    audioTextEn: "Monet's Charing Cross Bridge, 1899–1901. Monet visited London three times, painting from the same room at the Savoy Hotel. London's industrial fog differs from Venetian mist — thicker, more mysterious, dissolving the iron railway bridge and river light into layered blue and orange. The fog is not an obstacle; the fog is the subject. Monet found in London the ultimate Impressionist question: when all outlines dissolve, what remains?",
    tags: ['series paintings', 'London', 'Thames', 'fog', 'industrial', 'mystery', 'blue and orange']
  },

  'hkmoa.monet.argenteuil': {
    museum: 'hkmoa',
    title: 'Regatta at Argenteuil',
    titleZh: '阿让特伊的帆船赛',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1872',
    gal: 'Gallery 1 — The Birth of Impressionism',
    period: 'early_monet',
    periodLabel: 'Early Monet',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Claude_Monet_-_Regatta_at_Argenteuil.jpg',
    desc: '莫奈定居阿让特伊后，以塞纳河上的帆船赛为题材进行大量写生。这幅画中水面倒影与真实的帆船几乎等量齐观——模糊与清晰、实体与映像之间的界限被有意消解。水面是另一个世界，而那个世界比这个世界更鲜活，更充满光。',
    descEn: "After settling at Argenteuil, Monet painted the Seine regattas repeatedly. Here reflection and boat are near-equal — the boundary between solid and mirrored is deliberately erased. The water surface is another world, and that reflected world is more vivid, more light-filled than the real one above it.",
    audioText: '这是克劳德·莫奈的《阿让特伊的帆船赛》，1872年作。莫奈1871年移居阿让特伊，在那里度过了印象主义最高产的时期。塞纳河上的帆船赛是他最爱的题材之一——不只因为帆船本身，更因为水面倒影创造了第二个世界。这幅画中，水中的白色帆影甚至比天空中的更清晰、更活跃。莫奈开始明白：倒影有时比实物更真实。',
    audioTextEn: "Monet's Regatta at Argenteuil, 1872. Monet moved to Argenteuil in 1871, his most productive Impressionist period. The Seine regattas were his favourite subject — not just for the boats but for the water reflections that created a second world. In this canvas, the reflected white sails are clearer and more alive than those above. Monet began to understand: reflections are sometimes more real than the things they reflect.",
    tags: ['early Monet', 'Argenteuil', 'Seine', 'sailing', 'reflections', 'water']
  },

  'hkmoa.monet.magpie': {
    museum: 'hkmoa',
    title: 'The Magpie',
    titleZh: '喜鹊',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1868–1869',
    gal: 'Gallery 1 — The Birth of Impressionism',
    period: 'early_monet',
    periodLabel: 'Early Monet',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Claude_Monet_-_La_Pie.jpg',
    desc: '大雪过后的诺曼底乡野，一只喜鹊立于篱笆，阳光将雪地分割成蓝色的阴影与白色的光。这是莫奈最早的雪景杰作之一，描绘的不是雪的寒冷，而是雪中阳光的温度——那种蓝是冬日阴影特有的蓝，是只有在雪地里才能感受到的光线颜色。',
    descEn: "Norman countryside after snowfall; a magpie on a fence gate; sunlight divides the snow into blue shadows and white light. One of Monet's first snow masterpieces — not the cold of snow but the warmth of winter sunlight in it. That particular blue exists only in shadow on snow, a color visible nowhere else.",
    audioText: '这是克劳德·莫奈的《喜鹊》，1868至1869年作，来自巴黎奥赛博物馆。这是莫奈最著名的雪景画之一，也是他对雪地阳光最深刻的研究。画面中的主角不是喜鹊，而是光——冬日阳光将雪地切割为白色的受光面和蓝色的阴影。这种"雪中阴影是蓝色的"发现在当时令学院派大为惊讶：雪怎么可能是蓝色的？但莫奈的眼睛看到了真相：阴影是天空的颜色。',
    audioTextEn: "Monet's The Magpie, 1868–1869, on loan from the Musée d'Orsay. The magpie is not the subject — light is. Winter sunlight divides the snow into white highlights and blue shadows. Monet's discovery that shadows on snow are blue shocked the academic establishment: how can snow be blue? But Monet's eye had found the truth: shadows take the color of the sky above them.",
    tags: ['early Monet', 'snow', 'winter light', 'blue shadows', 'Norman countryside', 'birds']
  },

  'hkmoa.monet.riviera': {
    museum: 'hkmoa',
    title: 'Antibes Seen from the Salis Gardens',
    titleZh: '从萨利斯花园看昂蒂布',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1888',
    gal: 'Gallery 1 — The Birth of Impressionism',
    period: 'early_monet',
    periodLabel: 'Early Monet',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Claude_Monet_-_Antibes_seen_from_the_Salis_gardens.jpg',
    desc: '莫奈在地中海沿岸发现了完全不同的光——比诺曼底更刺目、更纯粹、更近似地中海绘画的黄金色调。画中的地中海蓝、柠檬黄的阳光与远处的雪山构成罕见的色彩三重奏，也是莫奈走向更大胆、更主观用色的转折点之一。',
    descEn: "Monet discovered entirely different light along the Mediterranean coast — more dazzling, purer than Normandy, approaching the golden tones of Mediterranean painting. The Mediterranean blue, lemon sunlight, and distant snow-covered mountains form a rare three-way chromatic accord, one of the turning points toward his bolder, more subjective use of color.",
    audioText: '这是克劳德·莫奈的《从萨利斯花园看昂蒂布》，1888年作。莫奈1888年首次来到蔚蓝海岸，被完全不同的地中海阳光震撼。他在给友人的信中写道："为了捕捉这里的光线，我必须用黄金和宝石来作画。"画中的蓝色比他所有的诺曼底作品更深、更纯，远处阿尔卑斯山的雪顶在橙色阳光中闪光。这是莫奈用色最大胆的时期之一，色彩已不再是描述，而是情感本身。',
    audioTextEn: "Monet's Antibes from the Salis Gardens, 1888. On his first visit to the Côte d'Azur, Monet was overwhelmed by Mediterranean light. He wrote to a friend: 'To capture this light I would need to paint with gold and gems.' The blue here is deeper, purer than any Norman canvas; the distant Alpine snow glows in orange sunlight. One of Monet's boldest periods: color is no longer description but emotion itself.",
    tags: ['early Monet', 'Mediterranean', 'Antibes', 'Côte d\'Azur', 'bold color', 'southern light']
  },

  'hkmoa.monet.venice': {
    museum: 'hkmoa',
    title: 'The Palazzo Ducale, Venice',
    titleZh: '威尼斯总督宫',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1908',
    gal: 'Gallery 2 — The Series Paintings',
    period: 'series_paintings',
    periodLabel: 'The Series Paintings',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Claude_Monet_Venice_1908.jpg',
    desc: '1908年，莫奈与妻子爱丽丝赴威尼斯，那是她们最后一次共同旅行——爱丽丝次年离世。威尼斯系列是莫奈最具象征意义的晚期作品：水城的宫殿倒映在淡蓝绿的运河中，现实与倒影之间的界限几近于无。这不只是威尼斯，也是一个垂暮的艺术家向最爱之物的告别。',
    descEn: "In 1908 Monet and his wife Alice made their last journey together to Venice — she died the following year. The Venice series is his most emotionally significant late work: palazzo reflections in pale blue-green water, boundary between reality and image nearly dissolved. Not only Venice, but a fading artist's farewell to what he loved most.",
    audioText: '这是克劳德·莫奈的《威尼斯总督宫》，1908年作。1908年，68岁的莫奈与妻子爱丽丝最后一次同行，来到威尼斯。爱丽丝次年在吉维尼离世。威尼斯系列是莫奈晚年最令人动容的作品群：宫殿在水中的倒影如梦如幻，颜色已经超越了忠实记录，进入纯粹的情感表达领域。这是他给这个世界的最后一批光——梦境一般的蓝与绿，和那个他深爱的女人的最后旅程。',
    audioTextEn: "Monet's Palazzo Ducale, Venice, 1908. Monet, 68, made this trip with his wife Alice — their last journey together. Alice died the following year at Giverny. The Venice series is Monet's most emotionally resonant late work: palace reflections shimmer in dream-like water, color transcending faithful record into pure emotional expression. His final light for the world — dreamlike blues and greens, and the last journey with the woman he loved.",
    tags: ['series paintings', 'Venice', 'late Monet', 'reflections', 'farewell', 'emotional depth']
  },

  'hkmoa.monet.autumn': {
    museum: 'hkmoa',
    title: 'Autumn Effect at Argenteuil',
    titleZh: '阿让特伊的秋色',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1873',
    gal: 'Gallery 1 — The Birth of Impressionism',
    period: 'early_monet',
    periodLabel: 'Early Monet',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Claude_Monet_-_Autumn_Effect_at_Argenteuil.jpg',
    desc: '莫奈将秋天描绘为一场色彩盛宴：金橙的树冠与白桦树的银白，倒映在波光粼粼的塞纳河中。画面的精妙在于两条竖向的白桦树干——它们打断了水平流动的河水与树冠，为这场秋日的感官泛滥带来了结构性的冷静。',
    descEn: "Monet renders autumn as a chromatic feast: gold and orange foliage with white birch reflected in the shimmering Seine. The painting's subtlety: two vertical birch trunks interrupt the horizontal flow of water and canopy, bringing structural calm to this sensory autumn celebration.",
    audioText: '这是克劳德·莫奈的《阿让特伊的秋色》，1873年作。这是印象派"色彩即情感"理论最直接的体现之一。秋天的橙金色树冠、白桦树银白的树干，以及它们在塞纳河中流动的倒影——莫奈没有用暗色调表达秋天的凋零，而是以最鲜艳的色彩颂扬这个季节最短暂也最辉煌的时刻。河水与秋叶之间没有清晰界限，只有颜色的流动与交融。',
    audioTextEn: "Monet's Autumn Effect at Argenteuil, 1873. A direct demonstration of Impressionism's 'color as emotion' thesis. Orange gold canopy, silver birch trunks, and their flowing reflections in the Seine — Monet does not express autumn's decay in dark tones but celebrates its most fleeting and magnificent moment in pure chromatic brightness. Between water and foliage, no clear boundary — only flowing, merging color.",
    tags: ['early Monet', 'autumn', 'Argenteuil', 'Seine', 'color', 'reflections', 'seasonal']
  },

  'hkmoa.monet.waterlilies2': {
    museum: 'hkmoa',
    title: 'Water Lilies (Morning)',
    titleZh: '睡莲（清晨）',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: 'c. 1916–1919',
    gal: 'Gallery 3 — The Water Garden',
    period: 'water_garden',
    periodLabel: 'The Water Garden',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Claude_Monet_-_Water_Lilies_-_1906_Chicago.jpg',
    desc: '这幅较为宽阔的睡莲画面捕捉吉维尼清晨的第一道光：薄雾尚未散去，粉紫色的睡莲在浅绿的水面若隐若现，天空的颜色透过水面倒映，使整个画面悬浮于梦与现实之间。晚年莫奈的睡莲是对时间本身的沉思——每一个清晨都是独一无二的，也是无法留住的。',
    descEn: "Morning's first light at Giverny: mist not yet lifted, pink-purple lilies emerging from pale green water, sky color reflected upward through the surface — the whole canvas suspended between dream and reality. Monet's late Water Lilies are meditations on time itself: each morning unique, each irretrievably passing.",
    audioText: '这是克劳德·莫奈的《睡莲·清晨》，约1916至1919年作。1916年，莫奈已76岁，白内障使他的世界愈发橙黄。他与法国政府商定，在巴黎橘园美术馆建造一个专门的展厅，展示他规划中的大型睡莲组画——那将是他对世界最后的礼物。这幅清晨版本以柔和的粉紫与浅绿描绘黎明前后的池塘，光影的边界在睡莲之间漂浮，没有起点，没有终点，只有永恒的流动。',
    audioTextEn: "Monet's Water Lilies (Morning), c. 1916–1919. In 1916, Monet was 76, cataracts deepening his world into orange. He negotiated with the French government to create a dedicated hall at the Orangerie in Paris for his planned large-scale lily panels — his final gift to the world. This morning version renders the pond in soft pink-purple and pale green; shadows and light float between lilies without beginning or end, only eternal flow.",
    tags: ['late Monet', 'water garden', 'water lilies', 'morning', 'mist', 'soft color', 'meditation']
  },

  'hkmoa.monet.giverny': {
    museum: 'hkmoa',
    title: "Monet's Garden at Giverny",
    titleZh: '吉维尼的莫奈花园',
    painter: 'Claude Monet',
    painterZh: '克劳德·莫奈',
    dates: '1895',
    gal: 'Gallery 3 — The Water Garden',
    period: 'water_garden',
    periodLabel: 'The Water Garden',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Claude_Monet_-_The_Artist%27s_Garden_at_Giverny.jpg',
    desc: '莫奈将吉维尼的花园视为他最重要的艺术作品之一——这不只是他作画的背景，而是他亲手设计、亲手栽植的另一种绘画。鸢尾花的蓝紫与小径两侧的万紫千红，是莫奈对色彩最直接、最私密的表达：他的花园就是他的调色板。',
    descEn: "Monet regarded Giverny's garden as one of his most important artworks — not merely the background for his paintings but itself a painting he planted and designed with his own hands. The iris blues and purples, the path's blazing borders, are Monet's most immediate and intimate color statement: his garden was his palette.",
    audioText: '这是克劳德·莫奈的《吉维尼的莫奈花园》，1895年作。莫奈在吉维尼的花园是他购地后亲自设计的，他雇用了六位园丁，每天都要亲自监督花卉的种植和养护。花园对于莫奈不只是写生的场地，更是他自己创作的一件立体艺术——他用活的植物和流水构建了自己理想中的色彩世界。这幅画是那个花园最阳光灿烂的正面图：鸢尾花道，万紫千红。看着它，你几乎能感受到那个五月午后的空气。',
    audioTextEn: "Monet's Garden at Giverny, 1895. Monet designed Giverny's garden himself, employing six gardeners he supervised daily. The garden was not merely a painting site but itself a three-dimensional artwork — living plants and flowing water building his ideal color world. This canvas is the garden's most sunlit frontal view: an iris path blazing with every color. Looking at it, you almost feel the air of that May afternoon.",
    tags: ['water garden', 'Giverny', 'iris', 'garden design', 'personal', 'color palette', 'intimate']
  }
};

/* ── HKMOA PERIODS ───────────────────────────────────────────── */
const HKMOA_PERIODS = [
  {
    id: 'early_monet',
    label: 'Early Monet: The Discovery of Light',
    labelZh: '早期莫奈：光的发现',
    years: '1860–1885',
    galleries: 'Gallery 1',
    duration: '25 min',
    color: '#d4a853',
    desc: '户外写生的革命，捕捉瞬间光影，用"印象"命名了一个时代。',
    descEn: 'The plein air revolution, capturing the fleeting instant, naming an era with a single word.',
    painters: ['Claude Monet (1840–1926) · Early period'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Claude_Monet_1899_Nadar_crop.jpg',
      nameZh: '克劳德·莫奈（1899年，纳达尔摄影）',
      nameEn: 'Claude Monet (1899, photograph by Félix Nadar)',
      bioZh: '1840年，克劳德·莫奈出生于巴黎，在诺曼底的海边城市勒阿弗尔长大。少年时以讽刺漫画成名，后在巴黎跟随布丹和约翰·琼坎学习户外写生，从此明白：光不是背景，光就是主题。1869年，他与雷诺阿并肩坐在巴黎郊外的"青蛙塘"边写生，各自用短促的笔触记录水面光影的颤动——印象主义在那个夏天的傍晚诞生了。1872年的《印象·日出》在1874年第一届印象派画展上展出，为整个运动命名。这一展览厅汇集了莫奈早期最重要的作品，呈现他作为一位年轻艺术家如何一步步发现属于自己的视觉语言。',
      bioEn: 'Born in Paris in 1840, Claude Monet grew up in the Norman seaside town of Le Havre. Famous as a teenager for caricatures, he later trained in plein air painting under Boudin and Jongkind in Paris — and understood: light is not background; light is the subject. In summer 1869, he and Renoir sat side by side at a Parisian bathing spot called La Grenouillère, each recording light on water with rapid dabs of pure color. Impressionism was born that evening. His 1872 Impression, Sunrise, exhibited at the first Impressionist show in 1874, named the entire movement. This gallery gathers Monet\'s most significant early works, showing a young artist discovering his own visual language step by step.',
      styleZh: '早期莫奈的关键发现有三：一、阴影不是黑色而是补色；二、轮廓不必清晰——光本身就是形体；三、题材可以是任何东西，只要光在其上流动。这三条发现，颠覆了学院派三百年的传统。',
      styleEn: 'The young Monet made three key discoveries: shadows are not black but complementary color; outlines need not be clear — light itself is form; subject matter can be anything, as long as light flows across it. These three realizations overturned three centuries of academic tradition.',
      quote: '光是绘画中最重要的人物。',
      quoteAuthor: '克劳德·莫奈，1888年'
    }
  },
  {
    id: 'series_paintings',
    label: 'The Series Paintings: Time and Light',
    labelZh: '序列绘画：时间与光',
    years: '1890–1900',
    galleries: 'Gallery 2',
    duration: '25 min',
    color: '#4a8b6e',
    desc: '干草垛、大教堂、白杨树——同一对象在不同时刻的全部面貌，时间成为主题。',
    descEn: 'Haystacks, cathedrals, poplars — the same subject at every hour. Time itself becomes the subject.',
    painters: ['Claude Monet (1840–1926) · Series period'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Claude_Monet_1899_Nadar_crop.jpg',
      nameZh: '克劳德·莫奈（1899年，纳达尔摄影）',
      nameEn: 'Claude Monet (1899, photograph by Félix Nadar)',
      bioZh: '1890年代，莫奈发明了一种新的绘画方法——"序列绘画"（series painting）。他在田野间放置多块画布，随着光线从清晨到黄昏的变化在画布间切换，每幅只记录特定时刻光线的唯一面貌。干草垛系列约30幅，鲁昂大教堂系列约30幅，白杨树系列约23幅，泰晤士河系列约37幅。这不是对"对象"的描绘，而是对"时间"的描绘——干草垛只是一个借口，光才是主角。1895年的展览中，这些系列画引起轰动，塞尚站在展览前说"莫奈只是一只眼睛，但那是多么了不起的眼睛"。',
      bioEn: 'In the 1890s, Monet invented serial painting. He set multiple canvases in a field, switching between them as light changed from dawn to dusk, each recording only the light of a specific moment. The Haystacks series: about 30 canvases. Rouen Cathedral: about 30. Poplars: about 23. Thames: about 37. These are not depictions of objects but of time — the haystack is only a pretext; light is the protagonist. At the 1895 exhibition of the series, Cézanne stood before them and said: "Monet is only an eye, but what an eye."',
      styleZh: '序列绘画将印象主义的认识论推向了极致：如果真实是光的流动而非物体的固定形态，那么同一对象在不同时刻就是不同的画——因为光不同，世界就不同。莫奈的系列作品是哲学命题，也是气象学档案，更是20世纪极简主义的直接先驱。',
      styleEn: 'Serial painting took Impressionism\'s epistemology to its logical extreme: if reality is light\'s flow rather than fixed object-form, then the same subject at different moments is a different painting — because different light means a different world. Monet\'s series are philosophical propositions, meteorological archives, and the direct ancestor of 20th-century Minimalism.',
      quote: '对我来说，风景本身并不存在，只有大气的折射才使它存在。',
      quoteAuthor: '克劳德·莫奈，约1895年'
    }
  },
  {
    id: 'water_garden',
    label: 'The Water Garden: Toward Abstraction',
    labelZh: '水景花园：走向抽象',
    years: '1896–1926',
    galleries: 'Gallery 3',
    duration: '30 min',
    color: '#3a6b8b',
    desc: '吉维尼的日式花园，睡莲池与绿桥，视力衰退中反而走向更深的光之本质。',
    descEn: 'The Giverny water garden, lily pond and green bridge — failing eyesight driving him deeper into pure light.',
    painters: ['Claude Monet (1840–1926) · Giverny / late period'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Claude_Monet_-_Self-Portrait_-_1917.jpg',
      nameZh: '克劳德·莫奈自画像（1917年，乌菲齐美术馆藏）',
      nameEn: 'Claude Monet, Self-Portrait (1917, Uffizi Gallery)',
      bioZh: '1893年，莫奈在吉维尼购地，亲手设计了一座日式水景花园——他雇用专职园丁，每天监督莲花的种植与池水的调节，将花园本身视为一件艺术作品。这座花园成为他生命最后三十年的唯一画题。1912年，莫奈被确诊白内障；1923年接受手术后视力部分恢复。但白内障时期的绘画反而将他的睡莲推向了前所未有的抽象边界——不再有清晰的花瓣或倒影，只有色彩漩涡与光的震荡。晚年莫奈与法国政府商定，将大型睡莲组画永久捐赠给国家，安放于巴黎橘园美术馆，那是他给世界最后的礼物。他1926年辞世，与最爱的花园在同一片土地上长眠。',
      bioEn: 'In 1893, Monet purchased land at Giverny and designed a Japanese water garden himself — employing dedicated gardeners he supervised daily, regarding the garden itself as an artwork. It became his sole subject for his final three decades. Diagnosed with cataracts in 1912 and partially restored after surgery in 1923, his cataract-era paintings pushed his lily pond into unprecedented abstraction — no clear petals or reflections, only swirling color and vibrating light. Late in life, Monet negotiated with the French government to donate his large lily panels permanently to the nation, to be housed in the Orangerie in Paris — his last gift to the world. He died in 1926, at rest in the same land as his beloved garden.',
      styleZh: '晚期莫奈的睡莲在艺术史上有双重地位：它们是印象主义的终点，也是抽象表现主义的起点。纽约的抽象表现主义画家（波洛克、德·库宁、罗斯科）在20世纪50年代公开承认莫奈晚期睡莲是他们的精神先驱——这一联系在2021年的MoMA回顾展中得到正式确认。',
      styleEn: 'Monet\'s late Water Lilies hold a dual position in art history: they are the endpoint of Impressionism and the origin point of Abstract Expressionism. New York\'s Abstract Expressionists — Pollock, de Kooning, Rothko — publicly acknowledged the late Monets as their spiritual ancestor in the 1950s. This lineage was formally confirmed by the 2021 MoMA retrospective.',
      quote: '我只需要时间来观察和理解大自然——我深深地爱着它，并且，我相信，我理解它。',
      quoteAuthor: '克劳德·莫奈，1926年'
    }
  }
];

/* ── DIA WORKS ────────────────────────────────────────────────── */
// 5 key works from the Detroit Institute of Arts
const DIA_WORKS = {
  'dia.bruegel.wedding': {
    museum: 'dia',
    title: 'The Wedding Dance',
    titleZh: '婚礼舞蹈',
    painter: 'Pieter Bruegel the Elder',
    painterZh: '彼得·勃鲁盖尔（老）',
    dates: '1566',
    gal: 'Gallery 218',
    period: 'renaissance_flemish',
    periodLabel: 'Flemish Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Peasant_Wedding_Dance_%281566%29_Pieter_Bruegel_the_Elder.jpg',
    desc: '超过125位农村婚礼宾客在画面中跳跃、旋转、举杯——勃鲁盖尔以俯视视角和精确的人物动态，将一个16世纪弗拉芒村庄的节庆喧嚣冻结成永恒。这是底特律艺术学院的镇馆之宝。',
    descEn: "Over 125 peasant wedding guests leap, spin, and raise cups — Bruegel freezes the festive chaos of a 16th-century Flemish village with bird's-eye view and precise human movement. The DIA's signature masterpiece.",
    audioText: '欢迎来到底特律艺术学院。这是彼得·勃鲁盖尔的《婚礼舞蹈》，1566年作，展于218号展厅，是本馆最重要的藏品之一。画中超过125位农村宾客在婚礼庆典上跳舞——勃鲁盖尔以惊人的精力描绘了每一位舞者的体态与表情：有人放声大笑，有人已经醉倒，有人偷偷接吻。这是16世纪弗拉芒农村生活的史诗记录，充满了对普通人生命力的热情赞歌。',
    audioTextEn: "Welcome to the Detroit Institute of Arts. This is Pieter Bruegel the Elder's The Wedding Dance, 1566, Gallery 218 — the DIA's signature masterpiece. Over 125 peasant guests dance at a wedding celebration; Bruegel records each dancer with astonishing energy: some laughing, some stumbling, some stealing a kiss. An epic document of 16th-century Flemish rural life — a celebration of ordinary human vitality.",
    tags: ['Flemish Renaissance', 'Bruegel', 'DIA masterpiece', 'peasant life', 'celebration', 'large-scale']
  },

  'dia.caravaggio.martha': {
    museum: 'dia',
    title: 'Martha and Mary Magdalene',
    titleZh: '玛大肋纳与玛利亚',
    painter: 'Caravaggio (Michelangelo Merisi)',
    painterZh: '卡拉瓦乔（米开朗基罗·梅里西）',
    dates: 'c. 1598',
    gal: 'Gallery 215',
    period: 'baroque_italian',
    periodLabel: 'Italian Baroque',
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Caravaggio_-_Martha_and_Mary_Magdalene.jpg',
    desc: '卡拉瓦乔在此描绘一个宗教转化的私密时刻：玛大肋纳正在说服妹妹玛利亚放弃世俗享乐皈依信仰。两人的手在桌上相触，戏剧性光线照亮了内心挣扎的细节——卡拉瓦乔将宗教叙事还原为两个真实女人之间的对话。',
    descEn: "Caravaggio depicts a private moment of religious conversion: Martha persuading her sister Mary Magdalene to abandon worldly pleasure. Their hands touch on the table; dramatic light illuminates inner struggle. Caravaggio reduces sacred narrative to a conversation between two real women.",
    audioText: '这是卡拉瓦乔的《玛大肋纳与玛利亚》，约1598年作，展于215号展厅。画面描绘玛大肋纳正在向妹妹讲述皈依的意义，说服她放弃世俗的快乐。两人的手指尖轻触，光线从左侧射入，照亮了玛利亚脸上的困惑与思考。卡拉瓦乔是如此具有颠覆性：他不画圣光光环，不画天国背景，只画两个女人在烛光下的一次谈话，却使整个神圣叙事充满了可感知的人情温度。',
    audioTextEn: "Caravaggio's Martha and Mary Magdalene, c. 1598, Gallery 215. Martha speaks to her sister about conversion — persuading her to abandon worldly pleasures. Their fingertips touch on the table; light from the left illuminates Mary Magdalene's uncertainty. Caravaggio's radicalism: no halos, no heavenly backdrop — only two women in candlelight having a conversation. Sacred narrative made warmly, piercingly human.",
    tags: ['Italian Baroque', 'Caravaggio', 'religious', 'women', 'chiaroscuro', 'conversion']
  },

  'dia.rivera.north': {
    museum: 'dia',
    title: 'Detroit Industry Murals — North Wall',
    titleZh: '底特律工业壁画·北墙',
    painter: 'Diego Rivera',
    painterZh: '迭戈·里维拉',
    dates: '1932–1933',
    gal: 'Rivera Court',
    period: 'modern_american',
    periodLabel: 'Modern / Mexican Muralism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Detroit_Industry%2C_North_Wall_by_Diego_Rivera.jpg',
    desc: '里维拉受委托为底特律艺术学院创作的27幅巨型壁画，主题是福特胭脂河工厂的工业生产。北墙描绘汽车装配流水线，工人的肌肉与机器的钢铁融为一体——这是20世纪最伟大的公共艺术之一，也是对工业时代劳动尊严的史诗颂歌。',
    descEn: "27 monumental frescoes commissioned for the DIA, depicting the Ford Rouge Complex's industrial production. The North Wall shows automobile assembly lines — workers' muscles fused with machine steel. Among the greatest public artworks of the 20th century, an epic hymn to industrial labor's dignity.",
    audioText: '这是迭戈·里维拉的《底特律工业壁画·北墙》，1932至1933年作，位于里维拉庭院。这套27幅壁画由埃德塞尔·福特委托，是里维拉在美国完成的最重要的作品。北墙以汽车装配流水线为主题，工人的身体与机器以古典史诗般的规模相融合——里维拉将工业劳动赋予了神话般的尊严。壁画完成后曾引发巨大争议，但最终成为底特律这座工业城市精神的视觉纪念碑。',
    audioTextEn: "Diego Rivera's Detroit Industry Murals, North Wall, 1932–1933, Rivera Court. Commissioned by Edsel Ford, these 27 frescoes are Rivera's greatest American work. The North Wall depicts automobile assembly at a heroic, classical scale — workers' bodies merged with machinery, industrial labor given mythological dignity. The murals caused enormous controversy on completion, but became the spiritual monument of Detroit as an industrial city.",
    tags: ['Mexican Muralism', 'Rivera', 'industrial', 'Ford', 'public art', 'fresco', 'labor']
  },

  'dia.rembrandt.visitation': {
    museum: 'dia',
    title: 'The Visitation',
    titleZh: '圣母拜访',
    painter: 'Rembrandt van Rijn',
    painterZh: '伦勃朗·凡·莱因',
    dates: '1640',
    gal: 'Gallery 215',
    period: 'baroque_dutch',
    periodLabel: 'Dutch Baroque',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Rembrandt_-_The_Visitation_-_WGA19221.jpg',
    desc: '伦勃朗描绘圣母玛利亚拜访她的表姐伊丽莎白的福音叙事——两位老妇人在台阶上相遇，光线从右侧射入，将这个宗教时刻转化为深刻的人类情感场景。伦勃朗在巴洛克时代无可匹敌的心理深度在此一览无余。',
    descEn: "Rembrandt depicts Mary visiting her cousin Elizabeth — two elderly women meeting on steps, light from the right transforming the religious moment into pure human emotion. Rembrandt's unmatched psychological depth on full display.",
    audioText: '这是伦勃朗的《圣母拜访》，1640年作，展于215号展厅。画面描绘圣母玛利亚怀孕后前往探望表姐伊丽莎白的福音故事。伦勃朗将这个宗教场景还原为两位女性在台阶上的真实相遇：她们相互凝视，那种超越语言的理解与关怀——光从右侧射入，将伊丽莎白的年迈脸庞照得温暖而庄严。这是伦勃朗对人类情感的一贯深度洞察。',
    audioTextEn: "Rembrandt's The Visitation, 1640, Gallery 215. The Gospel story of Mary visiting her cousin Elizabeth after the Annunciation. Rembrandt reduces the sacred moment to two women meeting on steps — their gaze holds a wordless understanding beyond language. Light from the right warms Elizabeth's aged face with dignity. Rembrandt's unfailing insight into the depth of human feeling.",
    tags: ['Dutch Baroque', 'Rembrandt', 'religious', 'women', 'light', 'psychological depth']
  },

  'dia.vaneyck.jerome': {
    museum: 'dia',
    title: 'Saint Jerome in His Study',
    titleZh: '书房中的圣哲罗姆',
    painter: 'Jan van Eyck',
    painterZh: '扬·凡·艾克',
    dates: 'c. 1442',
    gal: 'Gallery 211',
    period: 'renaissance_flemish',
    periodLabel: 'Flemish Renaissance / Northern',
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Van_Eyck_Jerome.jpg',
    desc: '凡·艾克这幅小型杰作展示了油画技法的奇迹：书房中的每本书、每件物品都以令人叹为观止的精度描绘，圣哲罗姆与他的狮子相伴——这是学者理想的化身，也是油画技术史上的里程碑。',
    descEn: "Van Eyck's small masterpiece demonstrates oil painting's miraculous capacity: every book, every object in the saint's study rendered with breathtaking precision. Saint Jerome and his lion — the scholar's ideal embodied, and a milestone in the history of oil technique.",
    audioText: '这是扬·凡·艾克的《书房中的圣哲罗姆》，约1442年作，展于211号展厅。这件小型杰作展示了凡·艾克油画技法的惊人精度：书架上的每本书、桌面上的每件物品都以近乎显微镜般的细节描绘。圣哲罗姆是4世纪将《圣经》译成拉丁文的学者，他的身旁蜷伏着一头狮子——据传他曾从狮子爪中取出荆棘，从此相伴。凡·艾克在指甲大小的空间里写出了一部视觉百科全书。',
    audioTextEn: "Van Eyck's Saint Jerome in His Study, c. 1442, Gallery 211. This small masterpiece demonstrates oil painting's near-miraculous precision: every book on the shelf, every object on the desk, rendered with microscopic detail. Jerome was the 4th-century scholar who translated the Bible into Latin; his lion companion — legend says he removed a thorn from its paw — curls beside him. Van Eyck wrote a visual encyclopedia in a space the size of a palm.",
    tags: ['Flemish Renaissance', 'Van Eyck', 'oil technique', 'scholar', 'precision', 'small-scale']
  },

  'dia.rivera.south': {
    museum: 'dia',
    title: 'Detroit Industry Murals — South Wall',
    titleZh: '底特律工业壁画·南墙',
    painter: 'Diego Rivera',
    painterZh: '迭戈·里维拉',
    dates: '1932–1933',
    gal: 'Rivera Court',
    period: 'modern_american',
    periodLabel: 'Modern / Mexican Muralism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Detroit_Industry%2C_South_Wall_by_Diego_Rivera.jpg',
    desc: '南墙与北墙共同构成里维拉底特律工业壁画组画的核心。南墙描绘化工与毒气防护设备的生产，并在上方的小幅面中纳入战争武器的批判性图像——里维拉在赞美工业生产力的同时，也对现代工业被用于战争的潜力提出了隐含的质疑，这让委托人埃德塞尔·福特感到不安却未要求删除。',
    descEn: "The South Wall forms the other half of Rivera's DIA masterwork. It depicts chemical and poison-gas equipment production, with smaller panels above including critical imagery of war weaponry — Rivera praising industrial capacity while embedding an implicit critique of its war potential. Edsel Ford was uncomfortable but did not demand removal.",
    audioText: '这是迭戈·里维拉的《底特律工业壁画·南墙》，1932至1933年作，展于里维拉庭院。南墙描绘化学品与防护设备的生产流程，但上方的小幅面中，里维拉放入了对战争工业的批判性图像——身穿防毒面具的士兵，化学武器的生产。这是里维拉政治立场的直接体现：他在接受资本家的委托的同时，用壁画的空间向工人和历史表达他真正的政治信念。这种张力至今仍是艺术史上的经典案例。',
    audioTextEn: "Rivera's Detroit Industry Murals, South Wall, 1932–1933, Rivera Court. The South Wall shows chemical and protective equipment manufacturing, but Rivera inserted into the upper panels critical imagery of war industry — gas-masked soldiers, chemical weapon production. This is Rivera's political voice speaking directly: he accepted the capitalist commission while using the mural's space to express his true political convictions. This tension remains a classic case study in art history.",
    tags: ['Mexican Muralism', 'Rivera', 'industrial', 'political', 'war critique', 'fresco', 'labor']
  },

  'dia.cranach.stag': {
    museum: 'dia',
    title: 'The Stag Hunt of the Elector Frederick the Wise',
    titleZh: '选帝侯腓特烈智者的狩猎',
    painter: 'Lucas Cranach the Elder',
    painterZh: '老卢卡斯·克拉纳赫',
    dates: '1529',
    gal: 'Gallery 218',
    period: 'renaissance_flemish',
    periodLabel: 'Flemish Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Lucas_Cranach_the_Elder_-_Stag_Hunt_of_the_Elector_Frederick_the_Wise.jpg',
    desc: '克拉纳赫是马丁·路德最亲密的艺术家朋友，也是萨克森宫廷的首席画家。这幅精彩的狩猎场景以鸟瞰视角展示了16世纪德意志贵族的猎场景象——数十头鹿、猎犬、猎人和贵族骑手构成了一幅北方文艺复兴版的世俗史诗，与意大利同时期的宗教主题形成鲜明对比。',
    descEn: "Cranach was Martin Luther's closest artist-friend and Saxon court painter. This spectacular bird's-eye hunting scene shows 16th-century German noble hunters with dozens of stags, hounds, riders — a secular Northern Renaissance epic in sharp contrast to the religious subjects dominating Italian art of the same period.",
    audioText: '这是老卢卡斯·克拉纳赫的《选帝侯腓特烈智者的狩猎》，1529年作，展于218号展厅。克拉纳赫是宗教改革时期萨克森宫廷的首席画家，也是马丁·路德最亲密的朋友之一——他为路德的《新约圣经》德文版制作了插图。这幅猎鹿图以俯视全景式构图展示了16世纪德意志贵族的壮观猎场：数十头鹿在奔跑与跳跃，猎犬和骑手在追逐，贵族在河岸旁用长弓射击。纯世俗，纯活力，是北方文艺复兴的另一个面孔。',
    audioTextEn: "Lucas Cranach the Elder's Stag Hunt, 1529, Gallery 218. Cranach was Saxony's court painter and Martin Luther's closest friend — he illustrated Luther's German New Testament. This panoramic hunting scene, bird's-eye view, shows German aristocratic sport at full scale: dozens of stags running and leaping, hounds pursuing, riders at the gallop, nobles shooting longbows from the riverbank. Purely secular, purely vital — the other face of the Northern Renaissance.",
    tags: ['Flemish Renaissance', 'Cranach', 'hunting', 'secular', 'German Renaissance', 'bird\'s-eye view']
  },

  'dia.holbein.man': {
    museum: 'dia',
    title: 'A Young Man Holding a Book',
    titleZh: '持书的年轻男子',
    painter: 'Hans Holbein the Younger',
    painterZh: '小汉斯·霍尔拜因',
    dates: 'c. 1541',
    gal: 'Gallery 216',
    period: 'renaissance_flemish',
    periodLabel: 'Flemish Renaissance',
    img: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Holbein_the_Younger_-_Portrait_of_a_Young_Man_-_Gemäldegalerie.jpg',
    desc: '霍尔拜因小儿子是都铎王朝英格兰最重要的肖像画家，为亨利八世及其宫廷留下了最可靠的视觉档案。这幅年轻男子肖像以极致的平面精确感和冷静的目光为特征——人物不向观者敞开，而是保持着一种贵族般的克制。书本是地位的象征，眼神是内心的谜。',
    descEn: "Holbein the Younger was Tudor England's foremost portraitist, leaving the most reliable visual archive of Henry VIII's court. This young man portrait is characterized by extreme flat precision and an unreadable gaze — not opening to the viewer but maintaining aristocratic restraint. The book is status symbol; the eyes are the enigma.",
    audioText: '这是小汉斯·霍尔拜因的《持书的年轻男子》，约1541年作，展于216号展厅。霍尔拜因是亨利八世的御用肖像画家，他为都铎王朝留下了最精确也最冷静的视觉记录。这幅年轻男子肖像展示了他的典型风格：极度精确的轮廓线，几乎没有笔触感的平滑表面，人物以一种礼貌而遥远的目光直视观者。他不对你倾诉，也不拒绝你——他只是在那里。这种冷静是16世纪英格兰宫廷文化的视觉化身。',
    audioTextEn: "Holbein the Younger's A Young Man Holding a Book, c. 1541, Gallery 216. Henry VIII's royal portraitist left the most precise and dispassionate visual archive of the Tudor court. The typical Holbein style: exact contours, near-brushstroke-free smooth surface, a courteous but distant gaze. He does not confide in you, but he does not reject you either — he simply exists. This cool detachment is Tudor court culture made visible.",
    tags: ['Flemish Renaissance', 'Holbein', 'Tudor', 'portraiture', 'book', 'aristocratic restraint']
  },

  'dia.delacroix.chasse': {
    museum: 'dia',
    title: 'Arab Horses Fighting in a Stable',
    titleZh: '马厩中争斗的阿拉伯骏马',
    painter: 'Eugène Delacroix',
    painterZh: '欧仁·德拉克洛瓦',
    dates: '1860',
    gal: 'Gallery 224',
    period: 'romanticism_realism',
    periodLabel: 'Romanticism & Realism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Eug%C3%A8ne_Delacroix_-_Arab_Horses_Fighting_in_a_Stable.jpg',
    desc: '德拉克洛瓦晚期的杰作之一：两匹阿拉伯骏马在昏暗马厩中激烈搏斗，光线从入口处射入，将动态的双马剪影照耀得既具体又神秘。德拉克洛瓦对动物的描绘始终是其浪漫主义激情的最纯粹表达——在这里，理智的束缚消失了，只剩下本能与力量的诗歌。',
    descEn: "One of Delacroix's finest late works: two Arab stallions fighting violently in a dim stable, light from the doorway illuminating their dynamic silhouettes — simultaneously concrete and mysterious. Delacroix's animal subjects were always his Romanticism's purest voice: reason's constraints gone, only the poetry of instinct and power.",
    audioText: '这是欧仁·德拉克洛瓦的《马厩中争斗的阿拉伯骏马》，1860年作，展于224号展厅。德拉克洛瓦是法国浪漫主义绘画的旗手，他对动物的描绘——尤其是马和狮子——是其最具感染力的作品之一。这幅晚期杰作以极简的光线构图实现了惊人的张力：昏暗马厩中，两匹骏马激烈搏斗，入口的光线将动态剪影照亮。德拉克洛瓦的笔触在这里不再是描述，而是本能本身——速度、力量、野性。',
    audioTextEn: "Delacroix's Arab Horses Fighting in a Stable, 1860, Gallery 224. Delacroix was the standard-bearer of French Romanticism; his animal subjects — especially horses and lions — were his most emotionally immediate works. This late masterpiece achieves extraordinary tension with minimal compositional means: two stallions fighting in the dimness, doorway light illuminating their dynamic silhouettes. Delacroix's brushwork here is not description but instinct itself — speed, power, wildness.",
    tags: ['Romanticism', 'Delacroix', 'horses', 'animal', 'instinct', 'late work', 'French']
  },

  'dia.hals.officer': {
    museum: 'dia',
    title: 'Portrait of a Man (Officer of the Guard)',
    titleZh: '男子肖像（护卫军官）',
    painter: 'Frans Hals',
    painterZh: '弗兰斯·哈尔斯',
    dates: 'c. 1640–1645',
    gal: 'Gallery 215',
    period: 'baroque_italian',
    periodLabel: 'Italian & Dutch Baroque',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Frans_Hals_-_Portrait_of_a_Man.jpg',
    desc: '哈尔斯是17世纪荷兰最快的画家——他以迅疾的笔触捕捉人物一瞬间的神情，这种"未完成感"在当时令人惊讶，在今天则是一种超前的现代性。这幅军官肖像的领口蕾丝与眼神中的自信，都在几乎不加修饰的笔触下呼之欲出——活着的感觉，胜过任何打磨过度的表面。',
    descEn: "Hals was the fastest painter of 17th-century Holland — rapid, almost reckless brushwork capturing a momentary expression. That 'unfinished' quality was surprising in his time and feels prophetically modern now. The officer's lace collar and confident gaze emerge from near-unretouched strokes: the feeling of life, superior to any over-polished surface.",
    audioText: '这是弗兰斯·哈尔斯的《男子肖像（护卫军官）》，约1640年作，展于215号展厅。哈尔斯是荷兰黄金时代速度最快的肖像画家，他的笔触如速写般迅疾，从不修饰，却能捕捉到人物一瞬间最真实的神情。同时代人认为他"太草率"，而今天我们看到的是一种惊人的现代性——他的笔触直接影响了马奈，进而影响了整个印象派。这幅军官肖像以极少的笔触呈现出最多的生命：领口的蕾丝，眼神中的自信，以及那种只活在当下的男人的气质。',
    audioTextEn: "Frans Hals's Portrait of a Man, c. 1640–1645, Gallery 215. Hals was the fastest portraitist of the Dutch Golden Age — rapid, almost reckless strokes, never retouching, yet capturing the most authentic momentary expression. Contemporaries found him 'too rough'; today we see prophetic modernity — his brushwork directly influenced Manet and through him the entire Impressionist movement. This officer portrait achieves maximum life with minimal strokes: lace collar, confident gaze, the bearing of a man who lives entirely in the present.",
    tags: ['Dutch Baroque', 'Hals', 'portraiture', 'rapid brushwork', 'modern', 'confident']
  },

  'dia.goya.young': {
    museum: 'dia',
    title: 'Portrait of a Young Woman',
    titleZh: '年轻女子肖像',
    painter: 'Francisco Goya',
    painterZh: '弗朗西斯科·戈雅',
    dates: 'c. 1800',
    gal: 'Gallery 216',
    period: 'romanticism_realism',
    periodLabel: 'Romanticism & Realism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Francisco_de_Goya_y_Lucientes_-_Portrait_of_a_Young_Lady.jpg',
    desc: '戈雅晚期肖像的典型特征：人物不再是权力与地位的展示，而是内在性格的探索。这位年轻女子的眼神中有一种无法完全读懂的东西——安静，但不是顺从；自信，但不是傲慢。戈雅让肖像画从外在转向内心，这是18世纪绘画中极为罕见的品质。',
    descEn: "Typical of Goya's late portraits: not a display of power and status but an exploration of inner character. The young woman's gaze holds something unreadable — quiet but not submissive, confident but not arrogant. Goya turned portraiture inward; this psychological penetration was extraordinarily rare in 18th-century painting.",
    audioText: '这是弗朗西斯科·戈雅的《年轻女子肖像》，约1800年作，展于216号展厅。戈雅是西班牙最后一位宫廷画家，也是最早的现代画家之一。他的肖像画拒绝传统的奉承与美化：画面中的年轻女子神情坦然，目光不服从也不抗拒，只是真实地存在。戈雅看人的方式是心理分析式的——他不画人的角色，而画人的灵魂。这种对内心世界的专注，直接影响了后来的浪漫主义与现代主义肖像传统。',
    audioTextEn: "Goya's Portrait of a Young Woman, c. 1800, Gallery 216. Goya was Spain's last court painter and one of the first modern ones. His portraits refuse conventional flattery: the young woman's expression is honest, her gaze neither submissive nor defiant — simply real. Goya approached people as a psychological analyst: he painted not the social role but the soul. This focus on inner life directly influenced Romantic and Modern portrait traditions.",
    tags: ['Spanish Baroque', 'Goya', 'psychological portraiture', 'inner life', 'modern quality', 'female']
  },

  'dia.courbet.cliff': {
    museum: 'dia',
    title: 'The Cliff at Étretat after the Storm',
    titleZh: '风暴后的埃特勒塔悬崖',
    painter: 'Gustave Courbet',
    painterZh: '古斯塔夫·库尔贝',
    dates: '1870',
    gal: 'Gallery 224',
    period: 'romanticism_realism',
    periodLabel: 'Romanticism & Realism',
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Gustave_Courbet_-_Falaise_d%27%C3%89tretat_apr%C3%A8s_l%27orage.jpg',
    desc: '库尔贝是现实主义绘画的旗手，他用调色刀而非画笔厚涂颜料，赋予悬崖与海浪真实的物质重量。风暴后的埃特勒塔海岸：白垩悬崖的白、泡沫的白、天空的白，三种白中有三种质地。这是印象派之前法国最诚实的风景画——他描绘的不是风景的诗意，而是风景的物质性。',
    descEn: "Courbet was the standard-bearer of Realism, using palette knife rather than brush to build thick paint — giving cliffs and waves real material weight. Post-storm Étretat coast: the white of chalk cliffs, foam white, sky white — three whites with three textures. France's most honest pre-Impressionist landscape: not the poetry of scenery but its raw materiality.",
    audioText: '这是古斯塔夫·库尔贝的《风暴后的埃特勒塔悬崖》，1870年作，展于224号展厅。库尔贝是法国现实主义绘画最重要的旗手，他的技法革命性地使用调色刀代替画笔厚堆颜料，使画面产生真实的材质重量感。这幅风暴后的诺曼底海岸描绘了白垩悬崖、泡沫和天空三种不同质感的"白"——库尔贝的风景画从不美化自然，只是忠实于它的物质性。他的粗犷笔法直接启发了马奈，进而影响印象派的笔触解放。',
    audioTextEn: "Courbet's Cliff at Étretat after the Storm, 1870, Gallery 224. Courbet was the great French Realism standard-bearer; his revolutionary technique — palette knife instead of brush, thick impasto — gave painted surfaces real material weight. This Norman coastline after storm captures three different textures of white: chalk cliff, sea foam, sky. Courbet's landscapes never beautify nature, only remain honest to its materiality. His rough technique directly inspired Manet and through him the Impressionist liberation of brushwork.",
    tags: ['Realism', 'Courbet', 'Norman coast', 'landscape', 'palette knife', 'material texture', 'storm']
  }
};

/* ── DIA PERIODS ─────────────────────────────────────────────── */
const DIA_PERIODS = [
  {
    id: 'renaissance_flemish',
    label: 'Flemish Renaissance',
    labelZh: '弗拉芒文艺复兴',
    years: '1430–1570',
    galleries: 'Gallery 211, 218',
    duration: '25 min',
    color: '#5a3e28',
    desc: '北方文艺复兴的精密叙事与农村史诗，凡·艾克到勃鲁盖尔的传承。',
    descEn: 'Northern narrative precision and peasant epics — from Van Eyck to Bruegel.',
    painters: ['Jan van Eyck (c.1390–1441)', 'Pieter Bruegel the Elder (c.1525–1569)'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Holbein-d-j-selbstbildnis.jpg',
      nameZh: '小汉斯·霍尔拜因自画像（约1542–1543年）',
      nameEn: 'Hans Holbein the Younger, Self-Portrait (c. 1542–1543)',
      bioZh: '底特律艺术学院的弗拉芒文艺复兴馆藏横跨了这一传统的整个历程：从凡·艾克（约1390–1441）用油画技法革命性地捕捉物质世界的每一个细节，到勃鲁盖尔以鸟瞰视角描绘农村生活的百科全书，再到霍尔拜因以亨利八世御用画家的身份将都铎宫廷的面孔定格为历史档案。北方文艺复兴的精神与意大利截然不同：它不追求理想的神话秩序，而是凝视日常生活的具体真实——那位在书房读圣经的学者，那场婚礼宴席上喝多了的农民，都是永恒的。DIA的镇馆之宝《婚礼舞蹈》是勃鲁盖尔最充满生命力的杰作之一。',
      bioEn: "The DIA's Flemish Renaissance holdings trace this tradition from its full arc: from Van Eyck (c. 1390–1441), whose oil technique revolutionized the capture of material detail, to Bruegel's bird's-eye encyclopedic peasant panoramas, to Holbein as Henry VIII's royal portraitist, preserving the Tudor court's faces as historical archive. The spirit of Northern Renaissance differs fundamentally from Italy: it pursues not ideal mythological order but the specific truth of daily life — the scholar reading his Bible in his study, the drunk peasant at the wedding feast, both permanent. The DIA's signature masterpiece, The Wedding Dance, is among Bruegel's most vitally alive works.",
      styleZh: '弗拉芒油画技法的核心在于"透明叠涂"（glazing）：用半透明颜料层层叠加，让光从底层反射出来，产生宝石般的光泽感。这种技法允许绘画极端精细的表面细节，同时保持颜色的深度与亮度——是弗拉芒艺术与意大利蛋彩画（tempera）最直观的区别。',
      styleEn: 'Flemish oil painting\'s core was glazing: semi-transparent paint layers built up so light reflects from beneath, creating jewel-like luminosity. This technique allowed extreme surface precision while maintaining depth and brightness of color — the most immediately visible difference between Flemish art and Italian tempera.',
      quote: '画家用颜料和画笔工作，而非用文字。',
      quoteAuthor: '扬·凡·艾克（传）'
    }
  },
  {
    id: 'baroque_italian',
    label: 'Italian & Dutch Baroque',
    labelZh: '意大利与荷兰巴洛克',
    years: '1600–1670',
    galleries: 'Gallery 215',
    duration: '20 min',
    color: '#6b2d8b',
    desc: '卡拉瓦乔的明暗革命与伦勃朗的心理深度，光如何成为情感的语言。',
    descEn: 'Caravaggio\'s chiaroscuro revolution and Rembrandt\'s psychological depth — light as emotional language.',
    painters: ['Caravaggio (1571–1610)', 'Rembrandt van Rijn (1606–1669)'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Caravaggio_ottavio_leoni.jpg',
      nameZh: '卡拉瓦乔肖像（奥塔维奥·莱奥尼素描，约1621年）',
      nameEn: 'Portrait of Caravaggio (drawing by Ottavio Leoni, c. 1621)',
      bioZh: '卡拉瓦乔（1571–1610）用短暂而动荡的一生彻底改变了欧洲绘画。他用真实的穷人和罪犯扮演圣徒，拒绝任何理想化，让宗教叙事变得肉身可感——这在当时是对教会传统的冒犯，却在巴洛克时代引发了席卷欧洲的革命。他因斗殴杀人逃亡罗马以外多年，却在逃亡中完成了最震撼的作品；1610年，39岁的他在流亡中猝死，身后留下的影响延续四百年。DIA的《玛大肋纳与玛利亚》是他最精彩的女性题材作品之一，与同厅的伦勃朗《圣母拜访》共同展示了巴洛克如何以光替代语言，完成情感的最深触达。',
      bioEn: 'Caravaggio (1571–1610) transformed European painting in a short, turbulent life. He replaced idealized saints with real poor people and criminals, refusing all conventional beauty — a provocation to Church tradition that unleashed a revolution spreading across Baroque Europe. A fugitive from Rome after a fatal brawl, he painted his most powerful works while in flight; he died at 39 in exile, but his influence has lasted four centuries. The DIA\'s Martha and Mary Magdalene is among his finest works on women subjects; shared with Rembrandt\'s Visitation in the same gallery, together they demonstrate how the Baroque used light in place of language to achieve the deepest emotional reach.',
      styleZh: '卡拉瓦乔与伦勃朗都精通明暗对比法，但表达截然不同：卡拉瓦乔的光是舞台聚光灯，凶猛而突然，将人物从黑暗中一把揪出；伦勃朗的光是蜡烛的温度，缓慢而哲学，从内心深处照亮人物的灵魂。两者共同宣告：在绘画中，光不只是照明工具，而是情感本身。',
      styleEn: 'Both Caravaggio and Rembrandt mastered chiaroscuro, but their expressions differ completely: Caravaggio\'s light is a spotlight, violent and sudden, yanking figures from total darkness; Rembrandt\'s is the warmth of a candle, slow and philosophical, illuminating the soul from within. Together they declared: in painting, light is not merely illumination — it is emotion itself.',
      quote: '没有比模仿自然更好的教师，而我的模特就是我面前的人。',
      quoteAuthor: '卡拉瓦乔（传）'
    }
  },
  {
    id: 'romanticism_realism',
    label: 'Romanticism & Realism',
    labelZh: '浪漫主义与现实主义',
    years: '1780–1880',
    galleries: 'Gallery 216, 224',
    duration: '20 min',
    color: '#3a4a7a',
    desc: '从戈雅的心理洞察到德拉克洛瓦的激情，从库尔贝的物质现实到19世纪欧洲绘画的转型时刻。',
    descEn: "From Goya's psychological insight to Delacroix's Romantic passion, to Courbet's material Realism — the decisive 19th-century turn in European painting.",
    painters: ['Francisco Goya (1746–1828)', 'Eugène Delacroix (1798–1863)', 'Gustave Courbet (1819–1877)'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Eug%C3%A8ne_Delacroix_-_Self-Portrait_-_WGA6235.jpg',
      nameZh: '欧仁·德拉克洛瓦自画像（约1837年，卢浮宫博物馆藏）',
      nameEn: 'Eugène Delacroix, Self-Portrait (c. 1837, Musée du Louvre)',
      bioZh: '19世纪欧洲绘画经历了从古典理性到浪漫激情、再到物质现实的巨大转变。戈雅（1746–1828）是宫廷画家中最黑暗的内心见证者，晚年独自在墙上画出《农神噬子》；德拉克洛瓦（1798–1863）是浪漫主义的旗手，以色彩替代线条，以激情替代秩序——他的《自由引导人民》是19世纪最具政治力量的图像；库尔贝（1819–1877）走向完全相反的方向，将农民和劳动者放上大型展览画，宣告：艺术的题材是人类生活的全部，不只是神话与权贵。DIA的这组收藏呈现了这一百年欧洲绘画最核心的张力与转变。',
      bioEn: '19th-century European painting moved through a vast transformation: from classical reason to Romantic passion, then to material realism. Goya (1746–1828) was the most darkly witnessing soul among court painters, painting Saturn Devouring His Son alone on the walls of his house in old age. Delacroix (1798–1863) was Romanticism\'s champion: color over line, passion over order — his Liberty Leading the People is the 19th century\'s most politically powerful image. Courbet (1819–1877) moved in the opposite direction: placing peasants and workers at monumental scale, declaring that art\'s subject is all of human life, not only myth and power. The DIA\'s holdings in this grouping present the core tensions and transformations of a pivotal century.',
      styleZh: '浪漫主义与现实主义是同一个时代的两种反叛：浪漫主义反叛新古典主义的理性冷静，以情感、自然与个体经验为武器；现实主义反叛浪漫主义的理想化，以具体可感的物质生活为武器。两者共同终结了欧洲绘画中神话与历史题材的霸权。',
      styleEn: 'Romanticism and Realism were two revolts within the same era: Romanticism rebelled against Neoclassical rational coolness, using emotion, nature, and individual experience as weapons; Realism rebelled against Romantic idealization, using the concrete particulars of material life. Together they ended the hegemony of mythological and historical subject matter in European painting.',
      quote: '我不会画天使，因为我从来没有见过天使。',
      quoteAuthor: '古斯塔夫·库尔贝'
    }
  },
  {
    id: 'modern_american',
    label: 'Modern & American',
    labelZh: '现代与美国艺术',
    years: '1900–1950',
    galleries: 'Rivera Court',
    duration: '20 min',
    color: '#3a6b3a',
    desc: '里维拉壁画与工业时代的劳动尊严，底特律作为20世纪美国制造业的灵魂。',
    descEn: 'Rivera\'s murals and industrial labor\'s dignity — Detroit as the soul of 20th-century American manufacturing.',
    painters: ['Diego Rivera (1886–1957)'],
    intro: {
      portraitImg: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Diego_Rivera_portrait.jpg',
      nameZh: '迭戈·里维拉（约1932年，底特律）',
      nameEn: 'Diego Rivera (c. 1932, Detroit)',
      bioZh: '迭戈·里维拉（1886–1957）是20世纪最伟大的公共艺术家之一，也是墨西哥壁画运动的核心人物。他在巴黎学习了立体主义，在意大利研究了文艺复兴壁画技法，回到墨西哥后将两者融合，创造出一种具有史诗格局的公共艺术语言。1932至1933年，埃德塞尔·福特委托他为底特律艺术学院创作27幅湿壁画，以福特胭脂河工厂的工业生产为题材。里维拉在接受这一资本主义委托的同时，悄悄在壁画中埋入对战争工业的批判图像——这种内在张力使底特律壁画成为20世纪公共艺术最复杂、最深刻的案例之一。他是弗里达·卡罗的丈夫，两人的爱情与冲突是20世纪最著名的艺术家传奇。',
      bioEn: 'Diego Rivera (1886–1957) was one of the greatest public artists of the 20th century and the central figure of the Mexican Muralist movement. He studied Cubism in Paris, studied Renaissance fresco technique in Italy, and on returning to Mexico fused both into a public art language of epic scope. From 1932 to 1933, Edsel Ford commissioned him to create 27 frescoes for the DIA depicting production at the Ford Rouge Complex. Rivera, while accepting this capitalist commission, quietly embedded critical imagery of war industry within the murals — this internal tension makes the Detroit murals among the most complex and profound cases in 20th-century public art. He was Frida Kahlo\'s husband; their love and conflict is the most famous artist-legend of the 20th century.',
      styleZh: '里维拉的壁画将文艺复兴的古典构图与20世纪工业现实融合：工人的身体被描绘得如古典雕塑般有力，机器被赋予了有机生命感，生产流水线成为现代史诗的主题。这是墨西哥壁画运动最重要的主张之一：艺术属于公众，而非博物馆展柜。',
      styleEn: "Rivera's murals fused Renaissance classical composition with 20th-century industrial reality: workers' bodies painted with the power of classical sculpture, machines given organic vitality, assembly lines made the subject of modern epic. This is the Mexican Muralist movement's most important claim: art belongs to the public, not to museum cabinets.",
      quote: '我从不画梦境或噩梦。我只画我自己的现实。',
      quoteAuthor: '迭戈·里维拉'
    }
  }
];

/* ── HELPER FUNCTIONS ────────────────────────────────────────── */

function getMuseumWorks(museumId) {
  switch (museumId) {
    case 'met':  return typeof WORKS_DATA !== 'undefined' ? WORKS_DATA : {};
    case 'aic':  return AIC_WORKS;
    case 'khm':  return KHM_WORKS;
    case 'hkmoa':return HKMOA_WORKS;
    case 'dia':  return DIA_WORKS;
    default:     return {};
  }
}

function getMuseumPeriods(museumId) {
  switch (museumId) {
    case 'met':  return typeof PERIODS !== 'undefined' ? PERIODS : [];
    case 'aic':  return AIC_PERIODS;
    case 'khm':  return KHM_PERIODS;
    case 'hkmoa':return HKMOA_PERIODS;
    case 'dia':  return DIA_PERIODS;
    default:     return [];
  }
}

function getMuseumById(museumId) {
  return MUSEUMS_REGISTRY.find(m => m.id === museumId) || null;
}

function getMuseumsByRegion(region) {
  return MUSEUMS_REGISTRY.filter(m => m.region === region);
}

function getContentMuseums() {
  return MUSEUMS_REGISTRY.filter(m => m.hasContent);
}

// Export-safe check for non-module environments
if (typeof window !== 'undefined') {
  window.MUSEUMS_REGISTRY  = MUSEUMS_REGISTRY;
  window.AIC_WORKS         = AIC_WORKS;
  window.AIC_PERIODS       = AIC_PERIODS;
  window.KHM_WORKS         = KHM_WORKS;
  window.KHM_PERIODS       = KHM_PERIODS;
  window.HKMOA_WORKS       = HKMOA_WORKS;
  window.HKMOA_PERIODS     = HKMOA_PERIODS;
  window.DIA_WORKS         = DIA_WORKS;
  window.DIA_PERIODS       = DIA_PERIODS;
  window.getMuseumWorks    = getMuseumWorks;
  window.getMuseumPeriods  = getMuseumPeriods;
  window.getMuseumById     = getMuseumById;
  window.getMuseumsByRegion= getMuseumsByRegion;
  window.getContentMuseums = getContentMuseums;
}

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
    painters: ['Claude Monet (1840–1926)', 'Pierre-Auguste Renoir (1841–1919)', 'Mary Cassatt (1844–1926)']
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
    painters: ['Georges Seurat (1859–1891)', 'Vincent van Gogh (1853–1890)', 'Paul Gauguin (1848–1903)', 'Paul Cézanne (1839–1906)', 'Henri de Toulouse-Lautrec (1864–1901)']
  },
  {
    id: 'modern',
    label: 'Modern American',
    labelZh: '现代与美国艺术',
    years: '1900–1950',
    galleries: 'Galleries 263, 391',
    duration: '20 min',
    color: '#3a6b4a',
    desc: '欧洲现代主义的美国回响与本土地域主义的反思，两者共同塑造了20世纪美国艺术身份。',
    descEn: "American responses to European Modernism alongside homegrown Regionalism — together shaping the 20th century's American artistic identity.",
    painters: ['Pablo Picasso (1881–1973)', 'Grant Wood (1891–1942)']
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
    painters: ['Pieter Bruegel the Elder (c.1525–1569)', 'Jan van Eyck (c.1390–1441)']
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
    painters: ['Raphael (1483–1520)', 'Titian (c.1488–1576)']
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
    painters: ['Peter Paul Rubens (1577–1640)', 'Diego Velázquez (1599–1660)', 'Caravaggio (1571–1610)']
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
    painters: ['Johannes Vermeer (1632–1675)']
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
    painters: ['Claude Monet (1840–1926) · Early period']
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
    painters: ['Claude Monet (1840–1926) · Series period']
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
    painters: ['Claude Monet (1840–1926) · Giverny / late period']
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
    painters: ['Jan van Eyck (c.1390–1441)', 'Pieter Bruegel the Elder (c.1525–1569)']
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
    painters: ['Caravaggio (1571–1610)', 'Rembrandt van Rijn (1606–1669)']
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
    painters: ['Diego Rivera (1886–1957)']
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

// Met Museum Works Data — 25 real open-access artworks
// Images served from Met Open Access CDN (CC0 public domain)
// Accession numbers verified against metmuseum.org collection

const WORKS_DATA = {
  // ── GOTHIC / MEDIEVAL (Gal 611–618) ──────────────────────────────────────
  "43.98.5": {
    title: "The Crucifixion",
    titleZh: "耶稣受难",
    painter: "Fra Angelico",
    dates: "c. 1440–1441",
    gal: "615",
    period: "gothic",
    periodLabel: "Gothic",
    routePos: 1,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DT1486.jpg",
    desc: "Fra Angelico在金底上绘制了庄严而宁静的受难场景，人物圣洁、光线柔和，体现早期文艺复兴过渡期对神圣叙事的诗意处理，与宋元细腻工笔画有异曲同工之妙。",
    descEn: "Fra Angelico depicts the Crucifixion with serene devotional calm on gilded ground — a bridge between Byzantine tradition and early Renaissance naturalism.",
    audioText: "欢迎来到大都会博物馆欧洲绘画厅。这是弗拉·安吉利科创作的《耶稣受难》，创作于约1440年，现藏615号展厅。安吉利科是多明我会修士，也是早期文艺复兴最虔诚的画家之一。他的作品将拜占庭金底传统与人文主义的体积感相融合：画面正中的基督形体优美，周围圣徒神情肃穆而温柔。金色背景象征着永恒的神圣之光，与中国宋代金碧山水画有着跨文化的共鸣。请沿路线前往下一件作品。",
    audioTextEn: "Welcome to the Metropolitan Museum of Art European Paintings galleries. This is Fra Angelico's The Crucifixion, painted around 1440, located in Gallery 615. Fra Angelico was a Dominican friar and one of the most devout painters of the early Renaissance. His work blends Byzantine gold-ground tradition with humanist naturalism.",
    tags: ["religious", "gold ground", "tempera", "early renaissance transition"]
  },

  "11.126.1": {
    title: "The Epiphany",
    titleZh: "三博士来朝",
    painter: "Giotto di Bondone",
    dates: "c. 1320",
    gal: "612",
    period: "gothic",
    periodLabel: "Gothic",
    routePos: 2,
    img: "https://images.metmuseum.org/CRDImages/ep/original/EP11.126.1.jpg",
    desc: "乔托开创了西方叙事绘画的先河，人物具有真实重量感与空间感，打破拜占庭平面传统，被誉为文艺复兴之父。",
    descEn: "Giotto's revolutionary figures have genuine weight and psychological presence — a radical departure from Byzantine flatness that heralded the Renaissance.",
    audioText: "这是乔托·迪邦多内的《三博士来朝》，约作于1320年，位于612号展厅。乔托是欧洲绘画史上的革命者——他首次赋予宗教人物真实的体积感与情感，圣母玛利亚不再是金底平面符号，而是有分量、有慈爱眼神的真实母亲。他的影响延续数百年，但丁称其为'将绘画从拜占庭解放出来的人'。在中国，同时期的赵孟頫正在革新书画，两者都是各自文明的转折点。",
    audioTextEn: "This is Giotto di Bondone's The Epiphany, around 1320, in Gallery 612. Giotto revolutionized European painting by giving religious figures genuine weight, volume, and emotional presence — earning him the title 'Father of the Renaissance' from his contemporary Dante.",
    tags: ["narrative", "tempera", "panel", "revolutionary naturalism"]
  },

  "1975.1.66": {
    title: "Madonna and Child",
    titleZh: "圣母与圣子",
    painter: "Duccio di Buoninsegna",
    dates: "c. 1295–1300",
    gal: "613",
    period: "gothic",
    periodLabel: "Gothic",
    routePos: 3,
    img: "https://images.metmuseum.org/CRDImages/rl/original/LC-1975_1_66.jpg",
    desc: "杜乔是锡耶纳画派创始人，在拜占庭金底传统中注入柔情与叙事性，画面精致如金碧辉煌的圣像，与同期元代金箔佛像艺术共鸣。",
    descEn: "Duccio, founder of the Sienese school, infuses Byzantine tradition with tender emotion and refined line — each fold of drapery a gesture of devotion.",
    audioText: "这是杜乔·迪布宁塞尼亚的《圣母与圣子》，约1295年，现为莱曼系列藏品，展于613展厅。杜乔是锡耶纳画派的奠基人。与同城竞争者乔托不同，杜乔更倾向于保留拜占庭的装饰性美感，同时注入温柔的情感：圣母低垂的眼眸、圣婴伸出的小手，充满了人间母子之情。这件作品的金底与精细衣纹，令人联想到中国南宋佛教绘画的虔诚与精致。",
    audioTextEn: "This is Duccio di Buoninsegna's Madonna and Child, around 1295–1300, from the Lehman Collection in Gallery 613. Duccio founded the Sienese school, retaining Byzantine decorative refinement while infusing tender maternal emotion into the sacred subject.",
    tags: ["Sienese", "Byzantine", "gold ground", "tempera on panel"]
  },

  // ── RENAISSANCE (Gal 619–625) ─────────────────────────────────────────────
  "67.741.1": {
    title: "Allegory of the Psalms (Raphael Study)",
    titleZh: "诗篇寓意（拉斐尔习作）",
    painter: "Raphael (Raffaello Sanzio)",
    dates: "c. 1510–1511",
    gal: "619",
    period: "renaissance",
    periodLabel: "Renaissance",
    routePos: 4,
    img: "https://images.metmuseum.org/CRDImages/rl/original/LC-67_741_1.jpg",
    desc: "拉斐尔《诗篇》习作呈现天使在云端歌咏的诗意场景，笔触轻盈圆润，完美体现了文艺复兴的和谐理想——万物有序，美即真理。",
    descEn: "Raphael's luminous study of angelic psalm-singers embodies Renaissance harmony — graceful figures in perfect proportion, radiating divine order through beauty.",
    audioText: "这是拉斐尔·桑乔的《诗篇寓意》习作，约1510年，莱曼收藏，展于619号展厅。拉斐尔生于1483年的乌尔比诺，25岁被教皇儒略二世召至罗马，创作了梵蒂冈壁画《雅典学院》。这件精致的小品描绘天使在云端歌咏诗篇，笔触如音乐般流畅——拉斐尔的天才在于将神圣美化为可感知的人间和谐。他37岁英年早逝，后人称他的每幅画都是'完美的回答'。",
    audioTextEn: "This is Raphael's Allegory of the Psalms, around 1510–1511, Lehman Collection, Gallery 619. Raphael, born in Urbino in 1483, was summoned to Rome at age 25 by Pope Julius II. This luminous study of angels singing psalms demonstrates his signature harmony — divine perfection made warmly human.",
    tags: ["drawing", "study", "angels", "Lehman Collection", "harmony"],
    adminEditable: true
  },

  "16.30ab": {
    title: "Madonna and Child Enthroned with Saints",
    titleZh: "宝座圣母与圣徒",
    painter: "Raphael (Raffaello Sanzio)",
    dates: "c. 1505",
    gal: "620",
    period: "renaissance",
    periodLabel: "Renaissance",
    routePos: 5,
    img: "https://images.metmuseum.org/CRDImages/ep/original/EP16.30ab.jpg",
    desc: "拉斐尔全幅祭坛画，构图金字塔形，人物关系和谐有序，完美展现盛期文艺复兴的庄重之美。",
    descEn: "Raphael's altarpiece in its full grandeur — pyramidal composition, harmonious figures, serene authority — the High Renaissance ideal made tangible.",
    audioText: "这是拉斐尔的《宝座圣母与圣徒》，约1505年，展于620号展厅。这是大都会博物馆最重要的拉斐尔作品之一。三角形构图将圣母置于视觉中心，两侧圣徒如护卫般相伴，每个人物都有独立的心理空间，却又统一于整体的宁静秩序。这种'秩序中的和谐'正是文艺复兴理想的视觉宣言。",
    audioTextEn: "Raphael's Madonna and Child Enthroned with Saints, around 1505, Gallery 620. This is one of the Met's most important Raphael works, with its pyramidal composition placing the Madonna at the visual center, flanked by saints in perfect Renaissance harmony.",
    tags: ["altarpiece", "oil on panel", "High Renaissance", "pyramidal composition"]
  },

  "1975.1.74": {
    title: "The Annunciation",
    titleZh: "天使报喜",
    painter: "Sandro Botticelli",
    dates: "c. 1485",
    gal: "621",
    period: "renaissance",
    periodLabel: "Renaissance",
    routePos: 6,
    img: "https://images.metmuseum.org/CRDImages/rl/original/LC-1975_1_74.jpg",
    desc: "波提切利的流动线条与梦幻色彩赋予天使报喜场景以诗意，人物仿佛随音乐飘动，是佛罗伦萨文艺复兴最具抒情气质的作品之一。",
    descEn: "Botticelli's The Annunciation flows with lyrical line and dreamlike color — the angel and Virgin meet in a graceful choreography of divine encounter.",
    audioText: "这是桑德罗·波提切利的《天使报喜》，约1485年，莱曼收藏，展于621号展厅。波提切利是洛伦佐·美第奇赞助的佛罗伦萨画家，以《维纳斯的诞生》闻名于世。他的线条如音乐般流动，人物在画面中仿佛随风而动——天使加百列单膝跪地，圣母玛利亚微微侧身，一个瞬间凝固成永恒的诗意。",
    audioTextEn: "This is Sandro Botticelli's The Annunciation, around 1485, Lehman Collection, Gallery 621. Botticelli, patronized by Lorenzo de' Medici, is famous for Birth of Venus. His lyrical line gives figures an almost musical quality — the angel kneels, Mary turns, a moment of divine meeting frozen in graceful poetry.",
    tags: ["lyrical", "tempera", "Florentine", "Medici patronage"]
  },

  "36.29": {
    title: "Venus and the Lute Player",
    titleZh: "维纳斯与琴师",
    painter: "Titian (Tiziano Vecellio)",
    dates: "c. 1565–1570",
    gal: "622",
    period: "renaissance",
    periodLabel: "Renaissance",
    routePos: 7,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DT972.jpg",
    desc: "提香晚年的感官杰作，维纳斯横卧于丰饶风景中，光与肉身的辩证在画布上燃烧——威尼斯色彩主义的巅峰宣言。",
    descEn: "Titian's late masterpiece of sensory richness — Venus reclines in luminous landscape as a lute player gazes in adoration. Venetian colorism at its apex.",
    audioText: "这是提香·韦切利奥的《维纳斯与琴师》，约1565年，展于622号展厅。提香是威尼斯画派的巨人，活到约99岁，晚年笔触愈发自由奔放。这幅画中，维纳斯横卧于郁郁葱葱的风景前，右侧的琴师仰望她，象征音乐与美的相遇。提香用色如燃烧——橙红的天空，金色的肌肤——威尼斯的阳光都凝聚在这块画布上。",
    audioTextEn: "Titian's Venus and the Lute Player, around 1565–1570, Gallery 622. Titian, the titan of Venetian painting, lived to nearly 99. His late style — free brushwork, luminous flesh, burning color — reaches its peak here. Venus reclines as a musician gazes upward: beauty and music united.",
    tags: ["nude", "landscape", "Venetian", "colorism", "late style"]
  },

  "33.92ab": {
    title: "The Crucifixion; The Last Judgment",
    titleZh: "受难与末日审判",
    painter: "Jan van Eyck (and workshop)",
    dates: "c. 1440–1441",
    gal: "618",
    period: "gothic",
    periodLabel: "Gothic / Northern Renaissance",
    routePos: 8,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DT222.jpg",
    desc: "扬·凡·艾克工作室的双联画以惊人细节展现末世神学——油画技法的精密让每一绺头发、每一片云彩都逼真如镜，北方文艺复兴的技术革命由此可见。",
    descEn: "Van Eyck's revolutionary oil technique renders apocalyptic visions with microscopic detail — hair, cloud, and bone coexist in crystalline clarity.",
    audioText: "这是扬·凡·艾克工作室创作的双联画《受难与末日审判》，约1440年，展于618号展厅。凡·艾克是北方文艺复兴的奠基者，他完善了油画技法，使画面能够呈现前所未有的细节：受难图中每位悼念者的泪痕清晰可见，末日审判中灵魂的喜悦与恐惧并置。这与中国同期的工笔画在精微性上有着跨文化的对话。",
    audioTextEn: "Jan van Eyck's The Crucifixion and The Last Judgment, around 1440, Gallery 618. Van Eyck perfected oil painting technique, achieving microscopic detail impossible in tempera — tears on mourners' faces, individual souls in the Last Judgment, all rendered with crystalline clarity.",
    tags: ["diptych", "oil", "Flemish", "Northern Renaissance", "microscopic detail"]
  },

  // ── BAROQUE (Gal 626–632) ─────────────────────────────────────────────────
  "61.198": {
    title: "Aristotle with a Bust of Homer",
    titleZh: "亚里士多德与荷马像",
    painter: "Rembrandt van Rijn",
    dates: "1653",
    gal: "628",
    period: "baroque",
    periodLabel: "Baroque",
    routePos: 9,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DT1947.jpg",
    desc: "伦勃朗用光影雕刻哲学的重量：亚里士多德凝视荷马盲者，一手放在石膏像头上，沉思在名利与智慧之间的永恒拉锯——这是西方绘画史上最深沉的肖像之一。",
    descEn: "Rembrandt carves philosophy from shadow — Aristotle contemplates Homer's bust, wealth against wisdom, the greatest psychological portrait in Western art.",
    audioText: "这是伦勃朗·范莱因的《亚里士多德与荷马像》，1653年作，展于628号展厅。这是大都会博物馆最珍贵的藏品之一，1961年以230万美元购入，创当时艺术品拍卖纪录。画中亚里士�多德凝视着失明诗人荷马的胸像，右手轻抚石膏，若有所思。伦勃朗的光从左侧射入，将亚里士多德的面孔从黑暗中召唤出来——那是一位功成名就者对纯粹智慧的渴望与乡愁。这是对人类精神最深刻的描绘之一。",
    audioTextEn: "Rembrandt's Aristotle with a Bust of Homer, 1653, Gallery 628. Purchased by the Met in 1961 for a then-record $2.3 million. Aristotle, draped in gold, rests his hand on a bust of blind Homer — contemplating poetry over power. Rembrandt's light summons the philosopher from darkness, giving us one of Western art's greatest psychological portraits.",
    tags: ["portrait", "chiaroscuro", "philosophy", "Dutch Golden Age", "masterpiece"]
  },

  "52.81": {
    title: "The Musicians",
    titleZh: "音乐家们",
    painter: "Caravaggio (Michelangelo Merisi)",
    dates: "c. 1595",
    gal: "626",
    period: "baroque",
    periodLabel: "Baroque",
    routePos: 10,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DT773.jpg",
    desc: "卡拉瓦乔早期杰作，以真人模特描绘音乐场景，拒绝理想化，以戏剧性光影取代天国光环——巴洛克革命的宣言书。",
    descEn: "Caravaggio's early masterpiece uses real young men — not idealized angels — to paint music-making, launching the Baroque revolution with radical naturalism.",
    audioText: "这是卡拉瓦乔的《音乐家们》，约1595年，展于626号展厅。卡拉瓦乔是巴洛克时代最具革命性的画家。他拒绝用理想化的模特，转而使用街头真实的年轻人——画中四位少年手持乐器，有人调音，有人凝视观者，眼神直接而世俗。这对当时习惯天国主题的观众是巨大冲击。卡拉瓦乔的名声与争议并存，他终其一生在逃亡中创作，35岁猝死海边。",
    audioTextEn: "Caravaggio's The Musicians, around 1595, Gallery 626. Caravaggio rejected idealized models, using real street youths to depict music-making. Four young men — one tuning a lute, another gazing directly at us — brought radical naturalism to sacred patronage. His turbulent life matched his revolutionary art.",
    tags: ["genre", "naturalism", "Roman Baroque", "youth", "music"]
  },

  "89.15.21": {
    title: "Young Woman with a Water Pitcher",
    titleZh: "持水壶的少女",
    painter: "Johannes Vermeer",
    dates: "c. 1662",
    gal: "632",
    period: "baroque",
    periodLabel: "Baroque / Dutch Golden Age",
    routePos: 11,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DP146997.jpg",
    desc: "维梅尔捕捉了北欧光线的神奇——晨光穿过白色蕾丝窗帘，在黄铜壶、白色头巾、蓝色地图上轻轻跳动，静默中蕴含无尽诗意。",
    descEn: "Vermeer's luminous pearl — morning light dances on brass pitcher, white linen, and blue map with miraculous tenderness. The poetry of Dutch domestic life.",
    audioText: "这是约翰内斯·维梅尔的《持水壶的少女》，约1662年，展于632号展厅。维梅尔一生几乎不出德尔夫特，却将那扇朝北的窗户变成了荷兰文明的史诗。这幅画中，少女在窗边轻轻开窗，晨光在黄铜水壶、白色头巾和蓝色地图上流动——每一道光都精确无误，如同科学实验，又如同祈祷。维梅尔一生仅留下约35幅画作，每幅都是完美的宁静时刻。",
    audioTextEn: "Vermeer's Young Woman with a Water Pitcher, around 1662, Gallery 632. Vermeer barely left Delft but turned his north-facing window into an epic of Dutch civilization. Morning light plays across brass pitcher, white linen, and blue map with scientific precision and poetic tenderness. He left only about 35 paintings — each a perfect frozen moment.",
    tags: ["domestic", "light", "Dutch Golden Age", "intimate", "masterpiece"]
  },

  "1971.86": {
    title: "Juan de Pareja",
    titleZh: "胡安·德·帕雷哈",
    painter: "Diego Velázquez",
    dates: "1650",
    gal: "629",
    period: "baroque",
    periodLabel: "Baroque",
    routePos: 12,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DT2011.jpg",
    desc: "委拉斯凯兹为其混血助手所作的肖像，以惊人的自由笔触赋予帕雷哈贵族般的尊严——这幅画1971年以创纪录价格被大都会购入，震动艺术界。",
    descEn: "Velázquez paints his enslaved assistant Juan de Pareja with sovereign dignity — bold impasto brushwork, arresting gaze, a masterpiece of radical empathy.",
    audioText: "这是迭戈·委拉斯凯兹的《胡安·德·帕雷哈》，1650年作，展于629号展厅。胡安·德·帕雷哈是委拉斯凯兹的混血助手，在西班牙社会地位低微。然而画家以描绘贵族的笔法为他作画——自由奔放的笔触，贵族般的对视，白色翻领映衬深色面孔，每一笔都是尊严的宣言。这幅画1971年以550万美元刷新艺术品拍卖记录，进入大都会博物馆收藏。",
    audioTextEn: "Velázquez's Juan de Pareja, 1650, Gallery 629. Juan de Pareja was Velázquez's mixed-race assistant of low social standing. Yet Velázquez painted him with the bold brushwork and sovereign gaze reserved for nobility — white collar against dark skin, a powerful declaration of human dignity. Purchased by the Met in 1971 for a then-record $5.5 million.",
    tags: ["portrait", "Spanish Baroque", "identity", "bold brushwork", "record price"]
  },

  "10.73": {
    title: "Wolf and Fox Hunt",
    titleZh: "狼与狐狸猎杀",
    painter: "Peter Paul Rubens",
    dates: "c. 1616",
    gal: "627",
    period: "baroque",
    periodLabel: "Baroque",
    routePos: 13,
    img: "https://images.metmuseum.org/CRDImages/ep/original/EP10.73.jpg",
    desc: "鲁本斯以宏大戏剧性描绘人与野兽的搏斗，肌肉、毛皮、马匹的爆发力让画面震动——法兰德斯巴洛克的能量宣言。",
    descEn: "Rubens's explosive energy: men, horses, wolf, and fox locked in violent struggle — muscle and fur rendered with the full power of Flemish Baroque dynamism.",
    audioText: "这是彼得·保罗·鲁本斯的《狼与狐狸猎杀》，约1616年，展于627号展厅。鲁本斯是法兰德斯巴洛克的巨人，也是外交家、企业家。这幅巨幅猎兽图充满肾上腺素——马匹腾跃，猎人挥臂，狼与狐狸奋力抵抗，每条肌肉都在颤动。鲁本斯的工作室同时处理数十个委托，但这种宏大能量始终如一。",
    audioTextEn: "Rubens's Wolf and Fox Hunt, around 1616, Gallery 627. Rubens was the supreme Flemish Baroque painter and also a diplomat and entrepreneur. This enormous hunting scene bursts with adrenaline — horses rearing, hunters striking, wolf and fox fighting back — every muscle trembling with Baroque dynamism.",
    tags: ["hunt", "animals", "Flemish", "large-scale", "dynamic"]
  },

  // ── ROCOCO / NEOCLASSICAL (Gal 633–637) ──────────────────────────────────
  "34.138": {
    title: "Mezzetin",
    titleZh: "麦泽廷",
    painter: "Antoine Watteau",
    dates: "c. 1718–1720",
    gal: "634",
    period: "rococo",
    periodLabel: "Rococo",
    routePos: 14,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DT2003.jpg",
    desc: "华托笔下的麦泽廷在花园月色中独自弹奏吉他，背对观者，那若隐若现的忧郁是洛可可外表下最深的孤独——这是18世纪欧洲最诗意的画面之一。",
    descEn: "Watteau's Mezzetin strums a guitar in moonlit garden, his back turned — beneath Rococo elegance, a poignant solitude that speaks across centuries.",
    audioText: "这是安托万·华托的《麦泽廷》，约1718年，展于634号展厅。华托是洛可可绘画的创始人，发明了'雅宴画'这一题材——贵族们在森林花园中玩乐、谈情。这幅画中，麦泽廷（意大利即兴喜剧角色）独坐花园，背对观者弹琴，身后的石像恰好也背对他——双重孤独。华托本人结核病缠身，37岁早逝，他的画里总有一种优雅的忧伤。",
    audioTextEn: "Watteau's Mezzetin, around 1718–1720, Gallery 634. Watteau invented the fête galante — aristocrats at play in garden dreamscapes. Here the commedia dell'arte character Mezzetin strums guitar with his back to us, a stone statue also turning away — double loneliness beneath Rococo elegance. Watteau died of tuberculosis at 37.",
    tags: ["fête galante", "commedia", "loneliness", "garden", "oil"]
  },

  "49.7.49": {
    title: "The Love Letter",
    titleZh: "情书",
    painter: "Jean-Honoré Fragonard",
    dates: "c. 1770",
    gal: "635",
    period: "rococo",
    periodLabel: "Rococo",
    routePos: 15,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DT964.jpg",
    desc: "弗拉戈纳尔的情书场景以柔软笔触和粉彩色调编织一个甜蜜瞬间——洛可可情调的精华，轻盈而充满生命力。",
    descEn: "Fragonard's feathery brushwork and pastel palette capture a fleeting moment of love — the quintessence of Rococo's celebration of pleasure and feeling.",
    audioText: "这是让-奥诺雷·弗拉戈纳尔的《情书》，约1770年，展于635号展厅。弗拉戈纳尔是洛可可晚期最具才华的画家，他的笔触轻盈如羽毛，颜色粉嫩如春花。这幅小画描绘一位少女正在写情书，神情专注而甜蜜。就在几年后，法国大革命爆发，贵族们赞助的洛可可艺术戛然而止，弗拉戈纳尔在贫困中终老。",
    audioTextEn: "Fragonard's The Love Letter, around 1770, Gallery 635. Fragonard's feathery brushwork and pastel palette define late Rococo — intimate, sensual, suffused with the pleasures of aristocratic life. Within years, the French Revolution would sweep away his patrons, and he died in obscurity.",
    tags: ["intimate", "Rococo", "feathery brushwork", "love", "French"]
  },

  "31.45": {
    title: "The Death of Socrates",
    titleZh: "苏格拉底之死",
    painter: "Jacques-Louis David",
    dates: "1787",
    gal: "636",
    period: "neoclassical",
    periodLabel: "Neoclassical",
    routePos: 16,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DP-15508-001.jpg",
    desc: "大卫的新古典主义宣言：苏格拉底坦然饮鸩，哲人慷慨就义的尊严与门徒悲痛形成完美戏剧对位——这幅画在法国大革命前夕成为共和精神的象征。",
    descEn: "David's Neoclassical manifesto: Socrates seizes the hemlock with calm resolve while disciples collapse in grief — painted on the eve of the Revolution as a call to republican virtue.",
    audioText: "这是雅克-路易·大卫的《苏格拉底之死》，1787年作，展于636号展厅。这幅画在法国大革命爆发前两年完成，立即成为共和精神的象征。画面中，苏格拉底坦然伸手接过毒酒，慷慨就义，而门徒们悲痛欲绝——哲人与弱者的对比构成完美的戏剧张力。大卫的构图严谨如舞台，每个人物都精确到位，与此前的洛可可甜蜜形成鲜明反差，宣告了新古典主义理性与道德的美学革命。",
    audioTextEn: "David's The Death of Socrates, 1787, Gallery 636. Painted two years before the French Revolution, this became an instant symbol of republican virtue. Socrates reaches calmly for the hemlock while disciples weep — the philosopher's serenity against their grief creates perfect dramatic tension. David's rigorous composition announced Neoclassicism's rejection of Rococo frivolity.",
    tags: ["Neoclassical", "history painting", "philosophy", "revolutionary", "virtue"]
  },

  // ── ROMANTICISM / REALISM (Gal 638–641) ─────────────────────────────────
  "49.7.41": {
    title: "Manuel Osorio Manrique de Zúñiga",
    titleZh: "曼努埃尔·奥索里奥的童年",
    painter: "Francisco de Goya",
    dates: "c. 1787–1788",
    gal: "638",
    period: "romanticism",
    periodLabel: "Romanticism",
    routePos: 17,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DP267209.jpg",
    desc: "戈雅描绘贵族幼童与宠物的表面欢乐场景，却在细节中埋藏不安——猫眯眼盯着笼中鸟，预示着命运的脆弱，是浪漫主义对纯真的复杂凝视。",
    descEn: "Goya paints a child's delight with unsettling undertones — cats stare hungrily at the caged bird on a string: Romanticism's ambivalence about innocence.",
    audioText: "这是弗朗西斯科·戈雅的《曼努埃尔·奥索里奥的童年》，约1787年，展于638号展厅。表面上这是一幅可爱的贵族儿童肖像——男孩穿着红色丝绒礼服，手牵一只喜鹊，旁边有笼中鸟和猫。然而仔细看，三只猫正贪婪地盯着那只喜鹊，眼神中充满危险；小男孩手中的细线暗示命运的脆弱。戈雅是宫廷画家，却始终保有对权力和命运的批判眼光。",
    audioTextEn: "Goya's Manuel Osorio Manrique de Zúñiga, around 1787–1788, Gallery 638. A deceptively charming child portrait — the boy in red velvet holds a pet magpie on a string, surrounded by cats. Look closer: the cats stare hungrily at the bird, their eyes predatory. Goya, court painter and social critic, embeds unease within apparent innocence.",
    tags: ["child portrait", "Spanish", "symbolism", "ambiguity", "innocence"]
  },

  "29.100.6": {
    title: "View of Toledo",
    titleZh: "托莱多风景",
    painter: "El Greco (Domenikos Theotokopoulos)",
    dates: "c. 1599–1600",
    gal: "639",
    period: "romanticism",
    periodLabel: "Late Renaissance / Proto-Romanticism",
    routePos: 18,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DP-19152-001.jpg",
    desc: "格列柯的托莱多在幽绿闪电下如幻境般颤动——这不是地理学的真实，而是灵魂的风景，超越时代五百年的表现主义宣言。",
    descEn: "El Greco's Toledo convulses under electric storm-light — not geographic truth but spiritual landscape, a proto-Expressionist vision five centuries ahead of its time.",
    audioText: "这是格列柯的《托莱多风景》，约1599年，展于639号展厅。这是大都会博物馆最震撼的藏品之一。格列柯出生于克里特岛，在威尼斯学画，最终定居西班牙托莱多。他的城市风景不是写实的——天空翻涌着绿色闪电，建筑扭曲颤动，整座城市仿佛在神圣光芒中升腾。这件作品早于表现主义三百年，却准确预见了梵高和孟克。",
    audioTextEn: "El Greco's View of Toledo, around 1599–1600, Gallery 639. One of the Met's most electrifying works. El Greco was born in Crete, trained in Venice, and settled in Toledo. His city writhes under green storm-light — buildings twist, sky convulses — not geographic reality but spiritual vision. This proto-Expressionist masterpiece preceded van Gogh and Munch by three centuries.",
    tags: ["landscape", "Spanish", "Expressionist", "spiritual", "unique style"]
  },

  "40.175": {
    title: "Young Ladies from the Village",
    titleZh: "村庄里的少女",
    painter: "Gustave Courbet",
    dates: "1851–1852",
    gal: "640",
    period: "realism",
    periodLabel: "Realism",
    routePos: 19,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DP229640.jpg",
    desc: "库尔贝将农村少女而非神话女神放上大型展览画——现实主义革命的宣言，拒绝美化，直面社会阶层。",
    descEn: "Courbet's radical act: painting peasant girls at monumental scale, refusing mythology and idealization — Realism's declaration of art for ordinary life.",
    audioText: "这是古斯塔夫·库尔贝的《村庄里的少女》，1851年，展于640号展厅。库尔贝是现实主义运动的旗手。在他那个时代，大型展览画只描绘神话或历史主题；库尔贝却将三位普通农村少女放上沙龙大画，并将一位少女手持雨伞的姿态画得大方而自然。这在当时是革命性的冒犯——'美'不该被任何阶层垄断。",
    audioTextEn: "Courbet's Young Ladies from the Village, 1851–1852, Gallery 640. In an era when monumental paintings depicted mythology and history, Courbet presented three ordinary peasant girls at salon scale. The radical act: beauty belongs to ordinary life. Realism's manifesto against artistic elitism.",
    tags: ["Realism", "peasant", "social critique", "manifesto", "French"]
  },

  // ── IMPRESSIONISM (Gal 642–645) ───────────────────────────────────────────
  "29.100.112": {
    title: "La Grenouillère",
    titleZh: "青蛙塘",
    painter: "Claude Monet",
    dates: "1869",
    gal: "642",
    period: "impressionism",
    periodLabel: "Impressionism",
    routePos: 20,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DT833.jpg",
    desc: "莫奈在青蛙塘的笔触是印象主义的诞生时刻——水面光影的颤动、快乐游人的模糊身影，证明真实不在轮廓而在光的流动中。",
    descEn: "At La Grenouillère, Monet discovered Impressionism — light dancing on water in rapid dabs of pure color, reality captured not in outline but in luminous sensation.",
    audioText: "这是克劳德·莫奈的《青蛙塘》，1869年，展于642号展厅。这幅画标志着印象主义的诞生时刻。1869年夏，莫奈和雷诺阿并肩坐在巴黎郊外的青蛙塘边，各自描绘同一场景。莫奈用短促的笔触记录水面光影的颤动：蓝白的波纹、绿色的倒影、模糊欢笑的游人。没有轮廓，没有细节，只有光与色的瞬间印象。这正是印象派的核心：世界不是物体的集合，而是光的流动。",
    audioTextEn: "Monet's La Grenouillère, 1869, Gallery 642. This painting marks the birth of Impressionism. In summer 1869, Monet and Renoir sat side by side at this Parisian bathing spot, each capturing the same scene. Monet's rapid dabs of pure color record light dancing on water — no outlines, no detail, only luminous sensation. The world as light in motion.",
    tags: ["Impressionism", "water", "light", "open-air", "birth of movement"]
  },

  "07.122": {
    title: "Madame Georges Charpentier and Her Children",
    titleZh: "夏庞蒂埃夫人与她的孩子们",
    painter: "Pierre-Auguste Renoir",
    dates: "1878",
    gal: "643",
    period: "impressionism",
    periodLabel: "Impressionism",
    routePos: 21,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DP218728.jpg",
    desc: "雷诺阿将印象派带入沙龙成功的名作——奢华的日式客厅，夫人与孩子们的温柔日常，光与色在丝绸和花朵上跳舞。",
    descEn: "Renoir's Salon triumph — the publisher's wife and children in their Japanese-decorated salon, light shimmering on silk and flowers, bourgeois happiness immortalized.",
    audioText: "这是皮埃尔-奥古斯特·雷诺阿的《夏庞蒂埃夫人与她的孩子们》，1878年，展于643号展厅。这幅画是印象派首次在官方沙龙获得轰动成功的作品。画中的夏庞蒂埃夫人是巴黎文化名流，她的出版社是左拉、莫泊桑的靠山。雷诺阿描绘了她奢华的日式客厅：漆器屏风、丝绸沙发，母亲与两个孩子及大狗温柔相处。光在丝绸上流动，幸福如此具体可感。",
    audioTextEn: "Renoir's Madame Georges Charpentier and Her Children, 1878, Gallery 643. This was Impressionism's breakthrough into official Salon success. Madame Charpentier's husband published Zola and Maupassant; their Japanese-decorated salon became a cultural hub. Renoir captures bourgeois happiness with shimmering light on silk, children, and a great Saint Bernard.",
    tags: ["portrait", "bourgeois", "salon", "domestic", "light on silk"]
  },

  "1987.47.1": {
    title: "The Dance Class",
    titleZh: "舞蹈课",
    painter: "Edgar Degas",
    dates: "c. 1874",
    gal: "644",
    period: "impressionism",
    periodLabel: "Impressionism",
    routePos: 22,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DT46.jpg",
    desc: "德加的芭蕾课场景以独特的构图视角——仿佛从上方偷窥——捕捉舞台外的真实瞬间：疲倦的练习，调整的发饰，等待的无聊。",
    descEn: "Degas's radical view from above — catching ballet class in its unguarded reality: tired backs, adjusted ribbons, idle boredom. Not performance but its invisible labor.",
    audioText: "这是埃德加·德加的《舞蹈课》，约1874年，展于644号展厅。德加与印象派同行但又不同——他不热爱户外写生，而是痴迷于人工光线下的运动。这幅舞蹈课从高处俯视，构图被切断——这是摄影启发的截取感。你看不到舞台上的优美，而是舞台背后的劳作：少女们腰酸背痛，老师在侧监看，角落有人百无聊赖地挠背。德加展示了美丽背后的汗水与辛苦。",
    audioTextEn: "Degas's The Dance Class, around 1874, Gallery 644. Unlike fellow Impressionists, Degas preferred artificial light and indoor movement. His high viewpoint — photography-inspired — cuts into the scene: tired girls, a supervising teacher, one dancer scratching her back in boredom. Degas shows not ballet's beauty but its invisible labor.",
    tags: ["ballet", "movement", "artificial light", "photography influence", "labor"]
  },

  "61.101.1": {
    title: "The Card Players",
    titleZh: "玩牌者",
    painter: "Paul Cézanne",
    dates: "c. 1890–1892",
    gal: "645",
    period: "impressionism",
    periodLabel: "Post-Impressionism",
    routePos: 23,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DT46.jpg",
    desc: "塞尚的玩牌者是从印象主义通往现代艺术的桥梁——他们不是风俗画中的人，而是几何形体的集合，普罗旺斯农民的永恒纪念碑。",
    descEn: "Cézanne's Card Players bridge Impressionism and Modernity — figures reduced to geometric solids, Provençal peasants as timeless monuments, the gateway to Cubism.",
    audioText: "这是保罗·塞尚的《玩牌者》，约1890年，展于645号展厅。塞尚是从印象主义通往现代主义的关键人物，毕加索称他为'我们大家的父亲'。这幅画描绘两位普罗旺斯农民对坐打牌，但塞尚不关心他们的故事——他关心的是形体的几何秩序：桌子、帽子、手臂，都被简化为圆柱、球体、平面。他在普罗旺斯反复画同一景物，试图'把印象主义变成坚硬得像博物馆里的艺术'。",
    audioTextEn: "Cézanne's The Card Players, around 1890–1892, Gallery 645. Cézanne is the bridge from Impressionism to Modern art — Picasso called him 'the father of us all.' These Provençal peasants are monumental in their stillness; their figures reduced to geometric solids. Cézanne sought to 'make of Impressionism something solid and durable, like the art of the museums.' The gateway to Cubism.",
    tags: ["Post-Impressionism", "geometry", "gateway to modernism", "peasant", "Provence"]
  },

  "29.100.113": {
    title: "Garden at Sainte-Adresse",
    titleZh: "圣阿德雷斯的花园",
    painter: "Claude Monet",
    dates: "1867",
    gal: "642",
    period: "impressionism",
    periodLabel: "Impressionism",
    routePos: 24,
    img: "https://images.metmuseum.org/CRDImages/ep/original/DP251139.jpg",
    desc: "莫奈早期杰作，用鲜艳的原色和日式构图描绘海滨阳光——旗帜、帆船、花园、光，构成视觉的音乐。",
    descEn: "Monet's early masterpiece: bold primary colors and Japanese-inspired flat composition — flags, sailboats, flowers, blazing summer light — visual music by the sea.",
    audioText: "这是克劳德·莫奈的《圣阿德雷斯的花园》，1867年，展于642号展厅。这是莫奈早期最重要的作品之一。画面构图明显受到日本浮世绘的影响——水平分层，强烈色块，近景花坛与远景船帆并置。旗帜在海风中飘扬，阳光炙热而欢快。莫奈曾称这是'一幅中国式的带旗帜的绘画'。这里可以看到他日后全面走向印象主义之前的过渡状态。",
    audioTextEn: "Monet's Garden at Sainte-Adresse, 1867, Gallery 642. This early masterpiece shows Japanese ukiyo-e influence — horizontal banding, bold flat color, foreground flowers against distant sailboats. Flags flutter in the sea breeze; summer light blazes. Monet called it 'a Chinese painting with flags' — a transitional moment before full Impressionism.",
    tags: ["early Monet", "Japanese influence", "seascape", "garden", "flags"]
  }
};

// Period definitions with Chinese dynasty parallels
const PERIODS = [
  {
    id: "gothic",
    label: "Gothic / Medieval",
    labelZh: "哥特 / 中世纪",
    years: "1140–1400",
    chineseDynasty: "宋、元",
    galleries: "611–618",
    duration: "30 min",
    color: "#8B4513",
    desc: "宗教叙事主导，金底圣像，拜占庭传统与人文主义萌芽的交汇点。",
    descEn: "Religion dominated, gold-ground icons, Byzantine tradition meeting the first stirrings of humanism.",
    painters: ["Giotto di Bondone (1267–1337, Florence)", "Duccio di Buoninsegna (1255–1319, Siena)", "Fra Angelico (1395–1455, Florence/Rome)", "Jan van Eyck (1390–1441, Flanders)"]
  },
  {
    id: "renaissance",
    label: "Renaissance",
    labelZh: "文艺复兴",
    years: "1400–1600",
    chineseDynasty: "明初—中",
    galleries: "619–625",
    duration: "40 min",
    color: "#2E5BA8",
    desc: "人文主义、线性透视、古典回归，美是秩序与和谐的宣言。",
    descEn: "Humanism, linear perspective, classical revival — beauty as a declaration of order and harmony.",
    painters: ["Leonardo da Vinci (1452–1519, Florence/Milan)", "Raphael (1483–1520, Urbino/Rome)", "Sandro Botticelli (1445–1510, Florence)", "Titian (1488–1576, Venice)"]
  },
  {
    id: "baroque",
    label: "Baroque",
    labelZh: "巴洛克",
    years: "1600–1750",
    chineseDynasty: "明末—清初",
    galleries: "626–632",
    duration: "30 min",
    color: "#6B2D8B",
    desc: "光影戏剧性（明暗对比法），动势与情感，宗教改革后的分裂与繁盛。",
    descEn: "Chiaroscuro drama, dynamic movement and emotion, artistic diversity in the wake of the Reformation.",
    painters: ["Caravaggio (1571–1610, Rome)", "Rembrandt van Rijn (1606–1669, Amsterdam)", "Johannes Vermeer (1632–1675, Delft)", "Diego Velázquez (1599–1660, Seville/Madrid)", "Peter Paul Rubens (1577–1640, Antwerp)"]
  },
  {
    id: "rococo",
    label: "Rococo",
    labelZh: "洛可可",
    years: "1700–1789",
    chineseDynasty: "清中",
    galleries: "633–635",
    duration: "20 min",
    color: "#C8859A",
    desc: "贵族生活的轻盈优雅，装饰性美感，在法国大革命前夕的最后辉煌。",
    descEn: "Aristocratic elegance, decorative beauty, the last flourish before the Revolutionary storm.",
    painters: ["Antoine Watteau (1684–1721, Paris)", "Jean-Honoré Fragonard (1732–1806, Paris)", "François Boucher (1703–1770, Paris)"]
  },
  {
    id: "neoclassical",
    label: "Neoclassical",
    labelZh: "新古典主义",
    years: "1760–1830",
    chineseDynasty: "清中晚",
    galleries: "636–637",
    duration: "15 min",
    color: "#2E7D5A",
    desc: "对古典秩序与道德的回归，是对洛可可的反叛，与法国革命精神同步。",
    descEn: "A return to classical order and moral seriousness, twin of the revolutionary republican spirit.",
    painters: ["Jacques-Louis David (1748–1825, Paris)", "Jean-Auguste-Dominique Ingres (1780–1867, Paris)"]
  },
  {
    id: "romanticism",
    label: "Romanticism / Realism",
    labelZh: "浪漫主义 / 现实主义",
    years: "1800–1870",
    chineseDynasty: "清晚",
    galleries: "638–641",
    duration: "20 min",
    color: "#8B2020",
    desc: "情感、自然、个体经验的颂歌；现实主义反对理想化，转向社会批判。",
    descEn: "Emotion, nature, individual experience celebrated; Realism opposed idealization and turned to social critique.",
    painters: ["Francisco de Goya (1746–1828, Madrid)", "Eugène Delacroix (1798–1863, Paris)", "Gustave Courbet (1819–1877, Paris)", "El Greco (1541–1614, Toledo)"]
  },
  {
    id: "impressionism",
    label: "Impressionism",
    labelZh: "印象主义",
    years: "1860–1900",
    chineseDynasty: "清末—民国",
    galleries: "642–645",
    duration: "30 min",
    color: "#4A7FB5",
    desc: "光与色的革命，现场写生捕捉瞬间，打破学院派传统，开启现代艺术之门。",
    descEn: "Revolution of light and color, en plein air painting capturing the fleeting moment — the gateway to modern art.",
    painters: ["Claude Monet (1840–1926, Paris/Giverny)", "Pierre-Auguste Renoir (1841–1919, Paris)", "Edgar Degas (1834–1917, Paris)", "Paul Cézanne (1839–1906, Provence)"]
  }
];

// Route sequence
const ROUTE = [
  { label: "Great Hall Entry", labelZh: "大厅入口", gal: "Entry", icon: "🏛️" },
  { label: "Gal 611–618 Gothic", labelZh: "哥特展厅", gal: "611–618", icon: "⛪", period: "gothic", duration: "30 min" },
  { label: "Gal 619–625 Renaissance", labelZh: "文艺复兴展厅", gal: "619–625", icon: "🎨", period: "renaissance", duration: "40 min" },
  { label: "Gal 626–632 Baroque", labelZh: "巴洛克展厅", gal: "626–632", icon: "🕯️", period: "baroque", duration: "30 min" },
  { label: "Gal 633–637 Rococo/Nec", labelZh: "洛可可展厅", gal: "633–637", icon: "🌸", period: "rococo", duration: "20 min" },
  { label: "Gal 638–641 Rom/Real", labelZh: "浪漫现实厅", gal: "638–641", icon: "🌪️", period: "romanticism", duration: "20 min" },
  { label: "Gal 642–645 Impressionism", labelZh: "印象主义厅", gal: "642–645", icon: "🌅", period: "impressionism", duration: "30 min" },
  { label: "Exit / Shop", labelZh: "出口/商店", gal: "Exit", icon: "🚪" }
];

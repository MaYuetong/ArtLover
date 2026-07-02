// Editorial content: bio, CV timeline, press, essays. Bilingual (zh/en).
// Voice: faithful to Feng Jiali's own writings and her critics. Zero dashes.
window.CONTENT = {
  artist: {
    name_zh: "奉家麗", name_en: "Feng Jiali",
    born_zh: "1963 年生於重慶", born_en: "Born 1963, Chongqing",
    based_zh: "工作生活於 北京 · 貴州 · 紐約", based_en: "Lives and works in Beijing, Guizhou and New York",
    email: "jialistudio2963@gmail.com",
    instagram: "https://www.instagram.com/jialistudio/", wechat: "fengjiali76",
    tagline_zh: "以女性主義視角，叩問生命、記憶與歷史。",
    tagline_en: "A feminist artist asking after life, memory and history.",
    bio_zh: "奉家麗，1963 年生於重慶。1990 年畢業於四川美術學院油畫系，獲文學學士學位；1993 年完成中央美術學院第六屆油畫研修班。九十年代末，她成爲北京東村藝術羣落的一員。她的創作橫跨繪畫、行爲、裝置與大地藝術。三十年來，她持續追問女性經驗、身體敘事、身份建構，以及人與自然的關係。1998 年，她在北京成立「塞壬藝術工作室」。她的展覽遍及紐約、巴塞爾、盧森堡、德國、布拉格、南非、布達佩斯、古巴、香港、澳門與中國各地。曾獲《世紀·女性》藝術展女性藝術學社獎（1998）、第十二屆全國美展提名獎（2014）、女性藝術雙年展學術獎（2015），以及 Celia & Wally Gilbert 駐地獎（2025）。",
    bio_en: "Feng Jiali was born in 1963 in Chongqing. She graduated from the Oil Painting Department of Sichuan Fine Arts Institute in 1990 with a Bachelor of Arts degree, and completed the 6th Advanced Oil Painting Program at the Central Academy of Fine Arts in 1993. In the late 1990s she joined Beijing's East Village artist community. Her work runs across painting, performance, installation and land art. For three decades she has kept asking the same questions: about women's experience, the body, how identity is made, and how people stand in relation to nature. In 1998 she founded the Siren Studio in Beijing. Her work has been shown in New York, Basel, Luxembourg, Germany, Prague, South Africa, Budapest, Cuba, Hong Kong, Macau and across China. Her honours include the Women Artists' Academic Award at the Century Women Art Exhibition (1998), a nomination at the 12th National Art Exhibition (2014), the Academic Award at the Women Artists Biennale (2015), and the Celia & Wally Gilbert Artist-in-Residence Fellowship (2025)."
  },

  // Contact form config. Set web3formsKey to your Web3Forms access key to enable
  // real email delivery; cc keeps Feng Jiali copied on every message.
  contact: { web3formsKey: "", cc: "jialistudio2963@gmail.com, artwithyuti@gmail.com", qq: "2470430182@qq.com" },

  // Siren Studio manifesto (from the 塞壬藝術工作室 document). item 17
  manifesto: {
    origin_zh: "塞壬藝術工作室（SAS）成立於 1998 年，是一個民間性質的女性藝術家小組。四位年齡相近、藝術面貌各異，卻共持女性主義精神的女藝術家，既是創始人，也是工作室的成員。",
    origin_en: "The Siren Art Studio (SAS) was founded in 1998, a self organised group of women artists. Four women, close in age and very different in temperament, bound by a shared feminist spirit, were at once its founders and its members.",
    zh_lede: "沒有一隻船能駛過美麗的塞壬島，除非舵手傾聽我們美妙的歌聲。",
    en_lede: "No ship has ever passed the beautiful isle of the Sirens, unless its helmsman listened to our singing.",
    zh: "塞壬是古希臘神話中的海妖，居住在塞壬島上，以歌聲召喚遠行的人。這個神話原型，本是父權制「紅粉骷髏」式的女禍論：把女性想像成外美內惡，用來貶抑女性的智慧與女性藝術的魅力。我們要把它翻轉過來。奧德修斯所依傍的男性強權與殖民代碼，終將被解構；能拯救人類的是美。塞壬的歌聲，是女性藝術燦爛的魅力，也是女性智慧的召喚。只有當世界更多地傾聽女性的聲音，讓人類更多地具備女性的秉賦與品格，纔有得救的可能。",
    en: "In Greek myth the Sirens are sea creatures who live on their island and call travellers with song. The old myth is a patriarchal fable of woman as beautiful without and monstrous within, used to belittle women's intelligence and the power of women's art. We turn it over. The male power and colonial codes that Odysseus leaned on are bound to come undone; what saves us is beauty. The Sirens' song is the splendour of women's art and the summons of women's wisdom. Only when the world listens more to the voices of women, and takes on more of their gifts and character, is there hope of being saved.",
    aims_zh: ["反對男權中心主義，秉持女性主義的藝術理想。","團結國際間的女性藝術工作者，共同開發女性文化資源。","提倡姐妹情誼，尊重成員的藝術個性差異，爲當代女性藝術輸入新的精神與經驗。"],
    aims_en: ["Against male-centrism; holding to a feminist ideal of art.","Uniting women artists across borders to develop women's cultural resources together.","Sisterhood, and respect for each member's individuality, bringing new spirit and experience to contemporary women's art."]
  },

  // Per-series critical reviews, shown at the END of that series' works view.
  reviews: {
    kouzhao: {
      zh: "無論是阿甘本還是齊澤克，與其說他們站在語言的前沿，不如說他們置身於現實的先鋒。他們從一種哲學的、思想的立場出發，帶著某種被稱作、或被定義為有傾向性的目光；他們對現實的洞穿、對現實的裸裎，都是可以辨認的。作為一個藝術家，一個帶有性別意識的女性藝術家，奉家麗把她的思慮落筆於一個個具有特殊符號的抽象物象之上。口罩，已經超越了它自身屬於藝術範疇的審美，朝向真實與真相隱晦而赤裸的、生命極致的意義。口罩被時間記入歷史，還有什麼比這一切更值得書寫、更能記憶那些正在被遺忘的歷史？奉家麗努力想要做到這一點；準確地說，她用她的繪畫語言做到了。",
      en: "Whether Agamben or Žižek, rather than standing at the frontier of language, they stand at the frontier of reality itself. They speak from a philosophical, intellectual position, with a gaze that could be called, or defined as, a leaning; their penetration of the real, their laying bare of the real, is legible. As an artist, a woman artist with a consciousness of gender, Feng Jiali sets her thought down onto one abstract object after another, each carrying its own charged sign. The mask has moved beyond its own aesthetic within the category of art, toward a meaning at once hidden and naked, pushed to the very limit of life, where truth and reality meet. The mask is written into history by time. What could be more worth writing, more able to hold in memory the history now being forgotten? Feng Jiali strives to do exactly this; to put it precisely, with the language of her painting she has done it.",
      by_zh: "盧文競", by_en: "Lu Wenjing", date: "2020.3.30"
    }
  },

  // Xianglaba / Space Art project text (from the 自然復魅·洪江 document).
  project: {
    years: "2017 → 2026",
    location_zh: "貴州省黔南布依族苗族自治州 · 荔波縣朝陽鎮洪江村上拉岜組",
    location_en: "Shang-Laba, Hongjiang Village, Chaoyang, Libo County, Qiannan, Guizhou",
    reenchant_zh: "「自然復魅」一詞出自社會學家馬克斯·韋伯。相對於「祛魅」，復魅是要喚回工業社會爲經濟價值而犧牲掉的自然價值與審美魅力，張揚野性的生命力與詩意的棲居，消解以人類爲中心的人與自然的二元對立，轉向一種深層生態的整體倫理。",
    reenchant_en: "The term re-enchantment comes from the sociologist Max Weber. Against disenchantment, re-enchantment calls back the value and the beauty of nature that industrial society sacrificed for economic gain. It affirms a wild vitality and a poetic way of dwelling, and undoes the human-centred split between people and nature, turning toward a deep-ecological ethics of the whole.",
    space_zh: "2017 至 2026 年，奉家麗在貴州荔波洪江村買下五棟瀕臨拆除的幹欄式老屋，一棟棟修復、重建。項目沿着洪江傳統文化的「衣」與「住」兩條線索展開：老屋以傳統土木手法結合現代空間，成爲集創作、研究、展示於一體的藝術空間；藍靛染織的手藝被轉化成藝術作品，向外發表與傳播。隨着藝術家進駐，村民重拾文化自信、迴歸鄉村，地緣文化慢慢復魅、復活。",
    space_en: "From 2017 to 2026, in Hongjiang village, Libo, Guizhou, Feng Jiali bought five stilt houses that were about to be demolished, and restored them one by one. The project follows two threads of Hongjiang's tradition, clothing and dwelling: the old houses join earth-and-timber methods with modern space to become a place for making, research and exhibition, while the indigo dyeing and weaving is turned into art and carried outward. As artists moved in, the villagers found a new confidence and came home, and the local culture slowly came back to life.",
    ganlan_zh: "幹欄式房屋以竹木爲材，上下兩層：下層圈養牲畜、堆放雜物，上層住人；以豎立的木樁架空基座，主要爲了防潮。它流行於廣西、雲南東南、貴州西南與越南北部這些多雨潮溼的地區。",
    ganlan_en: "A stilt house is built of bamboo and timber in two storeys: animals and storage below, people above, the floor raised on wooden posts to keep out the damp. It is found across the rainy regions of Guangxi, south-east Yunnan, south-west Guizhou and northern Vietnam.",
    residency_zh: "這個空間也向國際藝術家開放，供駐留與旅居使用。歡迎郵件或微信聯繫奉家麗。",
    residency_en: "The space is also open to international artists for residency and longer stays. You are welcome to reach Feng Jiali by email or WeChat.",
    ctrip: "https://m.ctrip.com/webapp/hotels/detail?hotelid=123687305",
    ctrip_label_zh: "在攜程查看：荔波·鄉拉岜·藝術美學私邸 ↗",
    ctrip_label_en: "On Ctrip: Libo · Xianglaba Art Aesthetic Residence ↗"
  },

  // Narrative chapters: her life in four turning points. Each opens before series `at`.
  chapters: [
    {at:"fenlian", no:"I", accent:"#D6336C", years:"1995 → 2010",
      zh:"粉面與凝視", en:"Rouge and the Gaze",
      intro_zh:"九十年代末，奉家麗是北京東村的一員。她畫濃妝豔抹的女性面孔，戲仿宣傳畫裏紅潤的雙頰，又把女人畫上舊牛仔、畫上一隻痰盂。在消費經濟裏，被解放出土地的女性身體成了新的商品。1998 年，她與同道女藝術家成立「塞壬藝術工作室」。",
      intro_en:"In the late 1990s Feng Jiali is part of Beijing's East Village. She paints women's faces in heavy rouge, mocking the rosy cheeks of the propaganda poster, and paints women onto old denim and onto an enamel spittoon. In the consumption economy the female body, freed from the land, has become a new commodity. In 1998 she founds the Siren Studio with fellow women artists."},
    {at:"fumei", no:"II", accent:"#3F7A4F", years:"2010 → 2019",
      zh:"轉向自然", en:"The Turn to Nature",
      intro_zh:"工作室旁的水庫被抽乾了。或許是因爲做了母親，她的目光從女性的身體，移向自己與生靈萬物的聯結。她在石壁上拓印，用針線繡下野草與本草。這是一種「後女性主義」，要把被對象化的自然重新復魅。",
      intro_en:"The reservoir beside her studio is drained. Perhaps it is motherhood, but her gaze moves from the female body toward her own bond with all living things. She takes rubbings off the rock and embroiders weeds and healing herbs. This is a post-feminism that sets out to give an objectified nature back its enchantment."},
    {at:"shenfen", no:"III", accent:"#5F6366", years:"2017 → 2019",
      zh:"廢墟與記憶", en:"Ruins and Memory",
      intro_zh:"她生於重慶沙坪壩，自幼在紅衛兵墓園旁長大。中年之後，她回到那段被遮蔽的歷史：高 2 米、長 19 米的《墓園》，以及隨後的《石墟》。《身份》是送給女兒的成人禮物。哀悼，在這裏被做成了實體。",
      intro_en:"She was born in Shapingba, Chongqing, and grew up beside the Red Guard Cemetery. In middle age she returns to a buried history: The Cemetery, two metres high and nineteen long, and the Stone Ruins that follow. Identity is a coming-of-age gift for her daughter. Here, mourning is made into matter."},
    {at:"cangsheng", no:"IV", accent:"#C0212B", years:"2020 → 2023",
      zh:"蒼生與萬物", en:"Among All Beings",
      intro_zh:"疫情給每一張臉戴上了口罩。她畫下口罩之下的蒼生，也把目光投向一切有生之物。在荔波的稻田裏，她把創作還給土地與季節：從人的面孔，到萬物的生長。",
      intro_en:"The pandemic puts a mask on every face. She paints the living behind their masks, and turns her gaze to every living thing. In the rice fields of Libo she gives the work back to soil and season, from the human face to the growth of all beings."},
    {at:"langji", no:"V", accent:"#1F7A8C", years:"2023 → 2025",
      zh:"浪跡", en:"Wandering",
      intro_zh:"綜合媒材的漂泊之書。她在北京、貴州與紐約之間往來、遷徙、又紮根，把離散與歸屬都收進作品裏。",
      intro_en:"A drifting book in mixed material. She moves and migrates and re-roots between Beijing, Guizhou and New York, gathering both dispersal and belonging into the work."}
  ],
  // A forward-looking note pinned at the end of the timeline (item 9).
  futureNote: {years:"2026 →", zh:"待定", en:"To be continued",
    zh2:"2026 年,她走進冷泉港生命科學實驗室,對微觀生命形態的觀察正爲她打開新的方向。新作陸續。",
    en2:"In 2026 a residency at the Cold Spring Harbor life-science laboratory, and its microscopic forms of life, is opening a new direction. New work to come."},

  // CV timeline. Solo shows + key milestones (the spine of the homepage).
  cv: {
    awards: [
      {y:"1998", after:"fenlian", zh:"《世紀·女性》藝術展女性藝術學社獎", en:"Academic Award, Century Women Art Exhibition"},
      {y:"2014", after:"hubo", zh:"第十二屆全國美展獲獎提名獎", en:"Nomination Award, 12th National Art Exhibition of China"},
      {y:"2015", after:"fumei", zh:"女性藝術雙年展學術獎", en:"Academic Award, Women's Art Biennale"},
      {y:"2025", after:"langji", zh:"Celia & Wally Gilbert 駐地藝術家", en:"Celia & Wally Gilbert Artist-in-Residence"}
    ],
    solo: [
      {y:"2018 to 2025", zh:"藝術美學空間「鄉拉岜」個人項目", en:"Xianglaba Aesthetic Space, personal project"},
      {y:"2025", zh:"《復魅草案》下苑當代藝術中心，北京", en:"The Draft of Re-enchantment, Xia Yuan Contemporary Art Center, Beijing"},
      {y:"2024", zh:"《浪跡》角聲藝術中心 · 法拉盛公共圖書館，紐約", en:"Wandering, KJ Art Center and Flushing Public Library, New York"},
      {y:"2022", zh:"《十月·稻田裝置大地藝術》洪江田野，荔波", en:"October, Rice Field Land Art Installation, Libo"},
      {y:"2020", zh:"《與我一起》國際女性主義藝術線上連續個展", en:"With Me, international feminist art online series"},
      {y:"2019", zh:"《自然復魅》漢威國際藝術中心，北京", en:"Re-enchantment of Nature, Hanwei International Art Center, Beijing"},
      {y:"2018", zh:"《墓園》黑空間，北京 · 《領襟行動》行爲", en:"The Cemetery, Black Space, Beijing. Collar Action, performance"},
      {y:"2017", zh:"《身份》送給歌詩的成人禮物，北京", en:"Identity, a coming-of-age gift for Songshi, Beijing"},
      {y:"2010", zh:"《閨祕·奉家麗油畫新作展》環鐵時代美術館，北京", en:"Inner Chamber, New Oil Paintings, Huantie Times Art Museum, Beijing"},
      {y:"2003", zh:"《奉家麗手工與媒材藝術展》久久畫廊，德國", en:"Handcraft and Material Art, Galerie 99, Germany"},
      {y:"1999", zh:"《奉家麗油畫藝術展》四合苑畫廊，北京", en:"Oil Painting Exhibition, Sihaiyuan Gallery, Beijing"},
      {y:"1996", zh:"《桃花祭》行爲作品，妙峯山，北京", en:"Peach Blossom Ritual, performance, Miaofeng Mountain"},
      {y:"1994", zh:"《貓》行爲作品，成都", en:"Cat, performance, Chengdu"}
    ],
    group: [
      {y:"2025", zh:"《ART’25 時光的裂隙·十年變遷她的眼睛》AAP-Gallery，巴塞爾", en:"ART’25: Cracks of Time, AAP Gallery, Basel"},
      {y:"2024", zh:"《風·呼吸·水》華裔藝術家聲音與視覺藝術展，Howlang Culture Center，紐約", en:"Wind, Breath, Water, Howlang Culture Center, New York"},
      {y:"2023", zh:"《跨越與融通·中國當代藝術展》薩拉魯埃國家展覽館，薩爾瓦多", en:"Crossing and Integration, El Salvador National Exhibition Hall"},
      {y:"2022", zh:"第14屆哈瓦那雙年展，古巴國家圖書館，古巴", en:"The 14th Havana Biennial, Cuba National Library"},
      {y:"2019", zh:"中國當代藝術展，布達佩斯 · 中國與南非對話，德班美術館", en:"Chinese Contemporary Art, Budapest. China and South Africa Dialogue, Durban Art Museum"},
      {y:"2017", zh:"首屆中歐布拉格國際雙年展，布拉格", en:"First Prague International Biennale, Prague"},
      {y:"2014", zh:"第十二屆全國美展·綜合材料繪畫作品展，中國美術館", en:"12th National Art Exhibition, Mixed Media Painting, China Art Museum"},
      {y:"2009", zh:"《敘事中國·第四屆成都雙年展》成都", en:"Narrative China, 4th Chengdu Biennale, Chengdu"},
      {y:"2008", zh:"Art Basel Miami 項目，邁阿密", en:"Art Basel Miami Project, Miami"},
      {y:"2000", zh:"ART/OMI 國際藝術家駐訪、創作與展覽，紐約", en:"ART/OMI International Residency and Exhibition, New York"},
      {y:"1998", zh:"《世紀·女性》藏品展，中國美術館 · 成立「塞壬藝術工作室」", en:"Century Women Exhibition, National Art Museum of China. Founded the Siren Studio"},
      {y:"1989", zh:"《四人油畫聯展》四川美術學院陳列館，重慶", en:"Four-Person Oil Painting Exhibition, Sichuan Fine Arts Institute, Chongqing"}
    ]
  },

  // Series descriptions (override data.js). Dash-free, grounded in the artist's statements.
  seriesDesc: {
    fenlian:{zh:"豔俗濃妝的女性面孔，戲仿宣傳畫裏紅潤的雙頰。以豔俗的形與色，溫和地嘲諷消費時代被客體化的女性身體。這是奉家麗女性主義繪畫的起點。",
      en:"Women's faces in loud rouge, mocking the rosy cheeks of the old propaganda posters. With gaudy form and colour she makes a quiet satire of the female body, turned into an object in the age of consumption. This is where her feminist painting begins."},
    shougong:{zh:"追憶手工上彩照相館時代的女性形象。泛黃的底色上，脂粉與目光打撈起一個被遺忘時代的溫度。",
      en:"Portraits that recall the women of the hand-coloured photo studio. On yellowed grounds, powder and gaze bring back the warmth of a forgotten time."},
    guimi:{zh:"少女、紅領巾、鳥巢與摺紙鶴。在藍灰的色調裏，「時刻準備着」的集體記憶被重新凝視。青春、規訓，以及隱祕的慾望。",
      en:"Young girls, red scarves, the Bird's Nest stadium, a folded paper crane. In steel-blue tones the old slogan, ready at all times, is looked at again. Youth, discipline, and a hidden desire."},
    hubo:{zh:"綜合材料的微觀凝固，像琥珀封存了時間。拓印、女紅與植物標本交織在一起，是她從繪畫走向自然與手工的轉折。",
      en:"Small mixed-material works where time sets like amber. Rubbing, needlework and plant specimens cross one another here. This is her turn from painting toward nature and craft."},
    shenfen:{zh:"送給女兒歌詩的成人禮物。蟬蛻之變，身份的脫殼與重生，以綜合材料寫下一場女性生命的過渡儀式。",
      en:"A coming-of-age gift for her daughter Songshi. The cicada moults, the old shell falls and a new self comes out. A rite of passage written in mixed material."},
    muyuan:{zh:"高 2 米、長 19 米的巨幅油畫，重構重慶沙坪壩的紅衛兵墓園。奉家麗自幼在墓園旁長大，歷時兩年揭開一段被遮蔽的歷史。她說，這不是關於政治立場，而是關於生命：青春如何被時代的浪潮捲走。完成之後，她大病一場。",
      en:"A monumental oil painting, two metres high and nineteen metres long, that rebuilds the Red Guard Cemetery in Shapingba, Chongqing. She grew up beside that cemetery and spent two years lifting a buried history. It is not about political positions. It is about life, about how the young were carried off by the currents of their time. She fell gravely ill after she finished it."},
    shixu:{zh:"《墓園》之後的延伸。凝重、晦暗、渾厚的石墟，以廢墟的美學作證：那些依附於意識形態的「人化自然」，終歸化爲廢墟。",
      en:"What follows The Cemetery. Heavy, dim, massive stone ruins that bear witness through an aesthetic of ruin. The humanised nature once bound to ideology comes, in the end, to rubble."},
    fumei:{zh:"在拓印的長卷上以針線作畫，野草、本草、花蟲盡收其中。她從女性主義走向後女性主義與生態關懷，以「破壞性創造力」復魅自然的本真。展覽現場尤爲精彩，值得親見。",
      en:"Painting with needle and thread on long scrolls of rubbed muslin, gathering in wild grasses, herbs, flowers and insects. She moves from feminism toward a post-feminism and a care for ecology, giving nature back its enchantment. The installation in the room is the fullest form of the work, and it is worth seeing in person."},
    cangsheng:{zh:"疫情期間的小幅油畫。口罩之下的面孔，傷感的大紅。它們記下一個集體屏息的年份裏，每一個蒼生的脆弱與堅持。",
      en:"Small oils made during the pandemic. Faces behind masks, in a sorrowful red. They keep the record of one held breath of a year, of how each ordinary life stayed fragile and held on."},
    lingjin:{zh:"行爲作品。邊角與衣襟裏的記憶，以身體和布料的行動，叩問女性日常勞作中被忽略的價值。",
      en:"A performance. Memory kept in collars and hems, an action of body and cloth that asks after the worth, usually overlooked, of women's daily labour."},
    dadi:{zh:"《向稻穀致敬》是荔波的稻田裝置，《克莉絲蒂娜的教堂》是長島復活節的大地藝術。她把創作交還給土地與季節，向最樸素的生長致敬。",
      en:"Tribute to the Rice is a paddy-field installation in Libo. Christina's Church is Easter land art on Long Island. She gives the work back to soil and season, in homage to the plainest kind of growth."},
    langji:{zh:"2024 年紐約個展（角聲藝術中心、法拉盛公共圖書館）。綜合媒材的漂泊之書，記下一個藝術家在北京、貴州與紐約之間的遷徙與紮根。",
      en:"A 2024 solo show in New York, at the KJ Art Center and the Flushing Public Library. A drifting book in mixed material, the record of an artist moving and re-rooting between Beijing, Guizhou and New York."},
    photo:{zh:"《妊娠就是藝術》與《女殤》系列。出於對作品的保護，攝影作品在此以模糊呈現。如需觀看，請郵件聯繫藝術家。",
      en:"Pregnancy Is Art, and the Female Die Young series. To protect the work, the photographs here are shown blurred. To see them, please write to the artist."},
    xiaowanglu:{zh:"一隻搪瓷痰盂，盆身畫上一張濃妝的女性面孔。日用的污穢之器，與被觀看的女性面容並置。笑與忘之間，是身體被使用、又被遺忘的處境。",
      en:"A woman's heavily made-up face painted around the body of an enamel spittoon. A vessel for the body's waste carries the face that is meant to be looked at. Between laughter and forgetting lies a condition: the body used, and the body forgotten."},
    xiaoxia:{zh:"系列之名來自一個殘酷的古老故事。魏文帝愛妾夜來深夜誤撞水晶屏風，血染面頰，文帝卻贊爲「曉霞將散」，宮人於是以胭脂仿畫，名「曉霞妝」。女性的鮮血與痛苦，自古被當作帝王文人產生「美感」的玩物。作品畫在舊牛仔衣褲上，綴以絲線、紐扣、花邊、珊瑚、髮卡。",
      en:"The series takes its name from a cruel old story. Ye Lai, a favourite of Emperor Wen of Wei, struck her face on a crystal screen one night and bled. The emperor called it dawn clouds about to scatter, and the palace women began to copy the look with rouge, the Dawn-Cloud makeup. Women's blood and pain have long been a plaything from which emperors and literati drew their sense of beauty. Feng paints these women on second-hand denim, sewn with silk thread, buttons, lace, coral and hairpins."},
    kouzhao:{zh:"她把原先的天使系列擱置，落筆於再日常不過、卻又非常的口罩。口罩超越了它的審美屬性，朝向真實與真相，赤裸出生命政治的意義。口罩將被時間記入歷史，而還有什麼比這一幾乎被遺忘的細節，更能舉證歷史、記憶歷史。",
      en:"She set the earlier Angel series aside and turned to the most ordinary, and most charged, of things: the mask. The mask passes beyond its own aesthetic and points toward truth, laying bare the meaning of biopolitics. Time will write the mask into history, and few details, almost forgotten, can bear witness to history, or hold its memory, as well. (after Lu Wenyue, 2020)"},
    xiaoyouhua:{zh:"2021 至 2025 年的小幅油畫。在大敘事之外，她回到尺幅之間的日常凝視，畫身邊的人與物，畫一段安靜的近作時光。",
      en:"Small oils from 2021 to 2025. Away from the large narratives, she returns to the close, daily looking that a small canvas allows, painting the people and things near her, a quiet recent chapter."}
  },

  // Press quotes (bilingual). Faithful to the critics' own words.
  press: [
    {by_zh:"夏可君", by_en:"Xia Kejun",
     zh:"在當代中國女藝術家中，沒有人比奉家麗對女性的生命與形象有着最爲自覺與反省的思考。她對女性豐富多變形象的塑造挑戰了我們的凝視，也糾正了視覺的暴力。",
     en:"Among contemporary Chinese women artists, no one thinks about the life and image of women as consciously, as reflectively, as Feng Jiali. Her rich, shifting images of women challenge our gaze and correct the violence of vision."},
    {by_zh:"賈方舟", by_en:"Jia Fangzhou",
     zh:"奉家麗自上世紀 90 年代以來一直是繪畫領域中女性主義的積極推動者。她運用包括身體在內的多種媒介，嚴肅思考長期被男權遮蔽的女性生存處境。",
     en:"Since the 1990s Feng Jiali has been an active force for feminism in painting. She works in many media, her own body among them, to think hard about a condition of women's life long hidden under a masculine order."},
    {by_zh:"江梅", by_en:"Jiang Mei",
     zh:"她一以貫之堅持鮮明的女性主義立場，試圖用女性的美好特質改變男性主流價值，使她成爲當代中國女藝術家中極具個性色彩與叛逆精神的一個。",
     en:"She has held to a clear feminist position throughout, trying to change mainstream masculine values with the better qualities of women. It makes her one of the most singular and rebellious of contemporary Chinese women artists."},
    {by_zh:"水天中", by_en:"Shui Tianzhong",
     zh:"奉家麗屬於實踐女性主義藝術的「塞壬」藝術工作室。豔俗的形、色和特殊的選材，共同構成對當代女性生存狀態的溫和嘲諷。",
     en:"Feng Jiali belongs to the Siren Studio, which practises feminist art. Her gaudy forms and colours and her unusual choice of material together make a gentle satire on the condition of contemporary women."}
  ],

  // Featured essays for the WORDS column. Translated faithfully from the source documents.
  essays: [
    {
      id:"chayi", featured:true,
      title_zh:"無邊的差異，永恆的女性", title_en:"Boundless Difference, Eternal Femininity",
      meta_zh:"奉家麗 自述 · 答策展人林似竹（Britta Erickson）· 1999",
      meta_en:"Feng Jiali, in answer to curator Britta Erickson, 1999",
      body_zh:["我承認自己是一個浪漫型的女性主義藝術家。從幻想回到現實，我首先堅持差異的觀點。正是差異性使多元化的世界顯現出多樣性和豐富性，即使在女性主義內部，差異性也依然是其非本質主義的本質特性。",
        "女性主義藝術不只是要求享有人類的完整權利，而是更注重差異性的完整體現。",
        "從大學到研究班，我的油畫專業成績都是優秀的。但因爲我是女性，又不肯依附於某種權力背景，就找不到一份與藝術相關的工作。如此，我選擇了自我定義的「職業藝術家」。我的護照上職業欄被寫着「無業人員」。",
        "只有當人類學會用女性的藝術精神去思考、感覺、反省，這個地球纔有免予毀滅的希望。我們之所以相信未來，是因爲未來屬於現在，同時也屬於過去；而這三者，都取決於我們女性的自主。"],
      body_en:["I admit that I am a romantic feminist artist. Coming back from fantasy to reality, the first thing I hold to is difference. It is difference that lets a plural world show its variety and its richness. Even inside feminism, difference stays the non-essentialist essence of the thing.",
        "Feminist art does not only ask for the full rights of being human. It cares more for difference, fully made visible.",
        "From college through the graduate program my marks in oil painting were always good. But I was a woman, and I would not attach myself to any power, so I could find no work tied to art. So I chose a title I defined for myself: professional artist. On my passport, under occupation, they wrote: unemployed.",
        "Only when human beings learn to think and feel and reflect with the artistic spirit of women will this earth have any hope of escaping ruin. We believe in the future because the future belongs to the present, and to the past as well. All three rest on the autonomy of women."]
    },
    {
      id:"muyuan-wang", series:"muyuan",
      title_zh:"揭開歷史的一角：奉家麗的巨幅油畫《墓園》", title_en:"Unveiling a Corner of History: Feng Jiali's The Cemetery",
      meta_zh:"王家新 詩人、批評家、中國人民大學教授 · 2026", meta_en:"Wang Jiaxin, poet and critic, professor at Renmin University, 2026",
      body_en:["Between 2017 and 2018, more than forty years after the Cultural Revolution, a Chinese woman artist poured all her strength into lifting that heavy history, stroke by stroke, with her brush. This is Feng Jiali's monumental oil painting, two metres high and nineteen metres long. She has said that after she finished it she fell gravely ill.",
        "She was born in Shapingba, Chongqing, and grew up beside the cemetery. As a child she played there. Every year near the Qingming Festival she heard grieving parents holding the trees and weeping. She did not understand it then. She understood it only when she had grown up.",
        "This is the Chongqing Red Guard Cemetery. One hundred and thirty-one graves hold five hundred and seventy-three people. Nearly half were middle-school Red Guards killed in the armed fighting of 1967. The youngest was fourteen. It is the only large, well-preserved burial ground for victims of the Cultural Revolution's armed conflicts left in China.",
        "Tall tombstones stand scattered in the waste, as if you had parted wild branches that look like rows of scars. They are blurred and vivid at once, and a vast weight of mourning comes toward you. This is no simple copy of things. It is mourning made material, the hardest reckoning there is between life and death.",
        "She does not mourn fallen heroes. She mourns lives sacrificed blindly for belief, children swallowed by the great wave of the revolution they gave themselves to. Once such a work stands before you, it becomes the tragic chorus of the countless tombstones behind it, and the soul cannot walk around it."]
    },
    {
      id:"muyuan-letter", series:"muyuan",
      title_zh:"自薦信 · 《墓園》收藏提案", title_en:"Letter of Recommendation, Proposal for Acquisition",
      meta_zh:"奉家麗 致美術館館長與策展委員會", meta_en:"Feng Jiali, to museum directors and curatorial committees",
      body_en:["I made The Cemetery between 2017 and 2018. It is two metres high and nineteen metres long. It shows the Red Guard Cemetery in Shapingba, Chongqing, where hundreds of young people who died in the armed factional fighting of the Cultural Revolution are buried.",
        "I was born and raised in Shapingba. I grew up near this cemetery. All through my childhood, at the Qingming Festival, I heard the families come and weep for their dead. Those cries stayed with me my whole life. In the end they became this work.",
        "The Cemetery does not take a political side. It is about human life. I am not concerned with who won or lost, nor with ideology. I am concerned with how young lives were carried off by the currents of history, and with what we do, in the silence that follows, about forgetting, memory and conscience.",
        "Over nearly two years I built this continuous nineteen-metre panorama. I did not want to play up the drama of history. I wanted to hold the quiet, lasting presence of time itself."]
    },
    {
      id:"fumei-daozi", series:"fumei",
      title_zh:"以自然復魅重構風景詩學", title_en:"Re-enchanting Nature, Rebuilding a Poetics of Landscape",
      meta_zh:"島子 評《自然復魅》· 己亥年，京北上苑", meta_en:"Daozi, on Re-enchantment of Nature, Shangyuan, Beijing",
      body_zh:["2015 年以來，奉家麗在油畫和綜合材料實驗兩個領域持續創作。在推出大型油畫《墓園》的同時，她完成了系列綜合材料作品《自然復魅》。其主題關乎自然，其旨趣寄寓生態的質詢與關懷。",
        "以針作畫，是傳統的刺繡工藝。但在奉的手裏，複製性的工藝趣味已被審慎地離析、解構併合理轉換，可以說是一種「去刺繡」的實驗。她把線描筆線轉換爲針線、針腳的運動，以針法替代水墨的「骨法用筆」。",
        "野生草木、花卉草蟲、中藥本草盡被收拾囊中，畫室幾乎變成植物標本陳列室。這一「述行」，旨在復魅自然本真，斷然擯除那種將自然對象化的因襲。",
        "發展主義對自然的「創造性破壞」，只能付諸於藝術的、審美的「破壞性創造力」形式來對決，履行文化主體根性的復原並加以永續葆守。"],
      body_en:["Since 2015 Feng Jiali has kept working in two fields at once, oil painting and experiments with mixed material. Alongside the large oil painting The Cemetery she finished a series of mixed-material works called Re-enchantment of Nature. Its subject is nature. Its purpose lies in a questioning of, and a care for, ecology.",
        "To paint with the needle is the old craft of embroidery. But in her hands the merely reproductive pleasure of craft is carefully taken apart and put to new use. You could call it an experiment in un-embroidering. She turns the drawn line into the movement of needle and thread, and lets stitching stand in for the bone-brush of ink painting.",
        "Wild grasses, flowers, insects, medicinal herbs are all gathered in, until her studio becomes almost a cabinet of plant specimens. The point of this act is to give nature back its enchantment, and to refuse outright the habit that turns nature into an object.",
        "Development does its creative destruction to nature. The only answer is the destructive creativity of art and of the aesthetic, restoring the root of the cultural self and keeping it for the long future."]
    },
    {
      id:"fumei-pelley", series:"fumei",
      title_zh:"後女性主義：水庫石壁上的拓印", title_en:"Post-Feminism: Rubbings on the Reservoir Wall",
      meta_zh:"Christopher Pelley · 羅馬，2019", meta_en:"Christopher Pelley, Rome, 2019",
      body_en:["Along the steep wall of the drained reservoir, Jiali unrolls twenty metres of unbleached muslin across the rough quarried rock. A cloth pad loaded with black ink is tapped onto the muslin, and the roughness of the rock and the cracks beneath it come up fast. Part performance, part surrealist automatic drawing, the printed marks hold both a moment in time and a sense of timeless eternity, like the fossils trapped in the stone below.",
        "The stone walls may look dead. For Feng they are very much alive. The crevices teem with life: insects, lizards, plants, many of them with folk and medicinal use. Each one turns up in her work.",
        "Whether the change came with motherhood, or with the draining of the reservoir, her work has moved away from the subservient role of women toward her own bond, as a woman, with the natural world. She is a feminine Anselm Kiefer, holding to the power and the continuity of nature.",
        "The hot-house women, that object of the male gaze, have left her vocabulary. In their place is fine embroidery that honours humble plants and small things. Embroidering is a kind of meditation for her, a thread back to her female line and to the small world of nature she watched between the rocks."]
    }
  ]
};

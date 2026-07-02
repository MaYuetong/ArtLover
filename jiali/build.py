#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build pipeline for Feng Jiali (奉家丽) artist site.
Curates series, parses metadata from filenames, converts+resizes images via sips,
pairs 乡拉岜 before/after, emits site/data.js."""
import os, re, json, subprocess, glob, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(ROOT, "site")
IMG  = os.path.join(SITE, "img")
os.makedirs(IMG, exist_ok=True)

IMG_EXT = (".jpg", ".jpeg", ".png", ".tif", ".tiff", ".JPG", ".JPEG", ".PNG", ".TIF")

def sips(src, dst, maxdim, q=72):
    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", str(q),
                    "-Z", str(maxdim), src, "--out", dst],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

SKIP_EXISTING = os.environ.get("REBUILD") != "1"
def _pil_process(src, dst, maxdim, saturation=None, rotate=0):
    """PIL path: resize + optional saturation boost + optional rotation, save jpg."""
    from PIL import Image, ImageEnhance
    im = Image.open(src).convert("RGB")
    if rotate: im = im.rotate(rotate, expand=True)
    im.thumbnail((maxdim, maxdim), Image.LANCZOS)
    if saturation and saturation != 1.0:
        im = ImageEnhance.Color(im).enhance(saturation)
    im.save(dst, "JPEG", quality=82)

def emit(src, base, web=1600, thumb=720, saturation=None, rotate=0):
    """Create web + thumb jpg. Skips if present (REBUILD=1 forces). saturation/rotate use PIL."""
    webp = os.path.join(IMG, base + ".jpg")
    thp  = os.path.join(IMG, base + "_t.jpg")
    if not (SKIP_EXISTING and os.path.exists(webp) and os.path.exists(thp)):
        if saturation or rotate:
            try:
                _pil_process(src, webp, web, saturation, rotate)
                _pil_process(src, thp, thumb, saturation, rotate)
            except Exception as e:
                print("  PIL failed, sips fallback:", e); sips(src, webp, web); sips(src, thp, thumb)
        else:
            sips(src, webp, web); sips(src, thp, thumb)
    return ("img/" + base + ".jpg", "img/" + base + "_t.jpg")

# item 13: use a pre-edited copy (flag stars blurred out) in place of the original
SRC_OVERRIDE = {
  "星旗 布面油彩 1997 Star Flag  Oil on canvas  130x103cm.JPEG": "_edited/starflag_noflag.jpg",
}
def numkey(fn):
    """Natural sort key from the first #-number (or any number) in a filename."""
    m = re.search(r"(\d+)#", fn) or re.search(r"(\d+)", fn)
    return (int(m.group(1)) if m else 9999, fn)

SPITTOON_SRC = "作品全集/其它作品/综合材料作品/笑忘录2002/笑忘录5#，综合材料，20x25cm,2001年.tif"
def make_cutout():
    """Cut the painted spittoon out of 笑忘录5# (remove magenta silk background).
    Writes img/spittoon.png + img/cursor.png + img/navicon.png. Falls back to sips."""
    try:
        from PIL import Image, ImageFilter
        import numpy as np
        from scipy import ndimage
        im = Image.open(os.path.join(ROOT, SPITTOON_SRC)).convert("RGB")
        a = np.array(im).astype(int); R,G,B = a[:,:,0],a[:,:,1],a[:,:,2]; h,w = R.shape
        pink = (R>70)&(R-G>38)&(B>=G-15)&(G<175)            # broad silk pink/magenta
        lab,n = ndimage.label(pink)
        border = set(lab[0,:])|set(lab[-1,:])|set(lab[:,0])|set(lab[:,-1]); border.discard(0)
        bg = np.isin(lab, list(border))                     # background = pink touching the edge
        obj = ndimage.binary_fill_holes(~bg)
        lab2,n2 = ndimage.label(obj)
        obj = (lab2 == np.argmax(ndimage.sum(np.ones_like(lab2),lab2,range(1,n2+1)))+1)
        obj = ndimage.binary_fill_holes(obj)
        obj = ndimage.binary_opening(ndimage.binary_closing(obj,iterations=2),iterations=1)
        alpha = np.array(Image.fromarray((obj*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8)))
        out = Image.fromarray(np.dstack([np.array(im),alpha]),"RGBA")
        ys,xs = np.where(obj); pad=8
        out = out.crop((max(0,xs.min()-pad),max(0,ys.min()-pad),min(w,xs.max()+pad),min(h,ys.max()+pad)))
        out.save(os.path.join(IMG,"spittoon.png"))
        out.copy().resize((max(1,int(out.width*36/out.height)),36),Image.LANCZOS).save(os.path.join(IMG,"cursor.png"))
        out.copy().resize((max(1,int(out.width*160/out.height)),160),Image.LANCZOS).save(os.path.join(IMG,"navicon.png"))
        return True
    except Exception as e:
        print("  cutout failed, fallback:", e)
        return False

DIM = re.compile(r"(\d+(?:\.\d+)?)\s*[x×X]\s*(\d+(?:\.\d+)?)")
YEAR = re.compile(r"(19|20)\d{2}")
def parse_meta(fn):
    name = re.sub(r"\.[A-Za-z]+$", "", fn)
    parts = re.split(r"[，,]", name)
    parts = [p.strip() for p in parts if p.strip()]
    title_zh = parts[0] if parts else name
    title_zh = re.sub(r"\s*\(\d+\)$", "", title_zh)
    dims = None
    m = DIM.search(name)
    if m: dims = f"{m.group(1)}×{m.group(2)}cm"
    yr = None
    ym = YEAR.search(name)
    if ym: yr = ym.group(0)
    medium = ""
    for p in parts:
        if any(k in p for k in ["布面油", "油彩", "油画", "综合材料", "竹编", "材料", "纸本", "装置"]):
            medium = p; break
    # english title: a part with mostly latin letters, not the medium/year markers
    en = ""
    for p in parts[1:]:
        if re.search(r"[A-Za-z]{3,}", p) and not re.search(r"Oil on|Canvas|material|cm|comprehc", p, re.I):
            en = p.strip(); break
    return {"title_zh": title_zh, "title_en": en, "year": yr, "dims": dims, "medium": medium}

def files_in(rel, exts=IMG_EXT):
    d = os.path.join(ROOT, rel)
    fs = [f for f in os.listdir(d) if f.endswith(exts) and not f.startswith(".") and not f.startswith("~$")]
    return sorted(fs), d

# ---- Series curation config (chronological timeline) ----
SERIES = [
  dict(id="fenlian", zh="粉脸谱系", en="Rouge Masks", years="1995–1999", accent="#E0187A",
       dir="作品全集/油画/a粉脸谱系1995-1998", kind="painting", n=14,
       sat=1.22, tail=["女浴室","浴室","竹枝词"],
       desc_zh="艳俗浓妆的女性面孔，戏仿宣传画式的红润双颊。以艳俗的形与色，温和嘲讽消费时代女性的客体化处境，是奉家丽女性主义绘画的起点。",
       desc_en="Women's faces in lurid rouge, parodying the rosy cheeks of propaganda posters. Through garish form and colour, a gentle satire of women objectified in the age of consumption — the starting point of Feng's feminist painting."),
  dict(id="shougong", zh="手工上彩时代的女性肖像", en="The Hand-Coloured Era", years="2005", accent="#E8802B",
       dir="作品全集/油画/手工上彩时代的女性肖像2005/小图", kind="painting", n=10,
       desc_zh="追忆手工上彩照相馆时代的女性形象，泛黄底色上的脂粉与目光，打捞一个被遗忘时代的温度。",
       desc_en="Portraits recalling the era of hand-tinted studio photography — powder and gaze on yellowed grounds, salvaging the warmth of a forgotten time."),
  dict(id="guimi", zh="闺秘", en="Inner Chamber", years="2007–2010", accent="#2F6E8F",
       dir="作品全集/油画/b闺秘2007-2008/小图,奉家丽新作06-10", kind="painting",
       pick=["《上》，布面油画，2007-8，260x200cm，down,Oil on Canvas,奉家丽.jpg",
             "《下》，布面油画，2007-8，260x200cm，down,Oil on Canvas,奉家丽.jpg",
             "《左》 布面油画 250×200cm 2007-8.jpg",
             "《右》，布面油画，2007-8，250x200cm，Right,Oil on Canvas,奉家丽.jpg",
             "《星.比黑更蓝》 布面油画 1000X260cm 2008.jpeg"],
       desc_zh="少女、红领巾、鸟巢与折纸鹤。在蓝灰色调里，「时刻准备着」的集体记忆被重新凝视——青春、规训与隐秘的欲望。",
       desc_en="Young girls, red scarves, the Bird's Nest and paper cranes. In steel-blue tones the collective slogan 'Ready at all times' is re-gazed — youth, discipline and hidden desire."),
  dict(id="hubo", zh="琥珀", en="Amber", years="2011–2012", accent="#C5862A",
       dir="作品全集/其它作品/综合材料作品/2011琥珀大图/大图36张_副本", kind="mixed", n=8,
       desc_zh="综合材料的微观凝固，如琥珀封存时间。拓印、女红与植物标本交织，开启从绘画走向自然与手工的转折。",
       desc_en="Mixed-media micro-fossils, time sealed as in amber. Rubbing, needlework and botanical specimens interweave — the turn from painting toward nature and craft."),
  dict(id="shenfen", zh="身份", en="Identity", years="2017", accent="#3B3B7A",
       dir="作品全集/其它作品/综合材料作品/身份2017/身份ok", kind="mixed", n=6,
       desc_zh="送给女儿歌诗的成人礼物。蝉蜕之变，身份的脱壳与重生，以综合材料书写女性生命的过渡仪式。",
       desc_en="A coming-of-age gift for her daughter Geshi. The cicada's moult — identity shed and reborn — a rite of passage written in mixed media."),
  dict(id="muyuan", zh="墓园", en="The Cemetery", years="2017–2018", accent="#5F6366", feature=True, dims="200×1900cm",
       dir="作品全集/油画/墓园资料，布面油画，奉家丽，2017-2018/墓园大油画/jpg小文件浏览用 - 复件/jpg小文件浏览用", kind="painting", n=11,
       extra_dirs=[("作品全集/油画/墓园资料，布面油画，奉家丽，2017-2018/墓园大油画/局部","detail",8),
                   ("作品全集/油画/墓园资料，布面油画，奉家丽，2017-2018/工作场景","studio",6),
                   ("作品全集/油画/墓园资料，布面油画，奉家丽，2017-2018/旷野展/展览现场“墓园”","site",6)],
       desc_zh="高2米、长19米的巨幅油画，重构重庆沙坪坝红卫兵墓园。艺术家自幼在墓园旁长大，历两年揭开一段被遮蔽的历史——这不是关于政治立场，而是关于生命：青春如何被时代的浪潮吞没。完成后她大病一场。",
       desc_en="A monumental oil painting, 2 m high and 19 m long, reconstructing the Red Guard Cemetery in Shapingba, Chongqing. Raised beside the cemetery, the artist spent two years unveiling a buried history — not about political positions but about life itself: how youth was swept away by the currents of an era. She fell gravely ill after completing it."),
  dict(id="fumei", zh="自然复魅", en="Re-enchantment of Nature", years="2010–2019", accent="#2E8B57", feature=True,
       dir="作品全集/其它作品/综合材料作品/2010-2019自然复魅/自然复魅作品图片全", kind="mixed", n=10,
       must=["山水长卷，2000x76cm,综合媒材，2000x70cm,2017-2018年,奉家丽.jpg",
             "山水对蒿，综合媒材，233x74cm,2016年,奉家丽.jpg"],
       extra_dirs=[("作品全集/其它作品/综合材料作品/2010-2019自然复魅/手帕","kerchief",10),
                   ("作品全集/其它作品/综合材料作品/2010-2019自然复魅/展览现场精选图片","site",14),
                   ("作品全集/油画/石墟油画局部2019/石墟（油画5张）","shixu",6)],
       desc_zh="在拓印长卷上以针线作画，野草、本草、花虫尽入其中。从女性主义走向后女性主义与生态关怀——以「破坏性创造力」复魅自然本真。展览现场尤为精彩，务必亲见。",
       desc_en="Painting with needle and thread on long scrolls of rubbed muslin — wild grasses, medicinal herbs, insects and flowers. A move from feminism toward post-feminism and ecological care, re-enchanting the truth of nature. The installation in situ is its fullest form."),
  dict(id="cangsheng", zh="苍生", en="Sentient Beings", years="2020", accent="#A21B22",
       dir="作品全集/油画/2020年《苍生》小油画", kind="painting", n=14,
       desc_zh="疫情期间的小幅油画。口罩之下的面孔，伤感的大红，记录一个集体屏息的年份里，每一个苍生的脆弱与坚持。",
       desc_en="Small oils made during the pandemic. Faces behind masks in a sorrowful red — a record of every fragile, enduring life in a year when the whole world held its breath."),
  dict(id="lingjin", zh="领襟行动", en="Collar Action", years="2018", accent="#8A5A83", kind="performance",
       dir="作品全集/其它作品/玲襟行动", n=8,
       desc_zh="行为作品。边角与衣襟的记忆，以身体与布料的行动，叩问女性日常劳作中被忽略的价值。",
       desc_en="A performance work. Memory held in collars and hems — an action of body and cloth questioning the overlooked value of women's daily labour."),
  dict(id="dadi", zh="大地艺术", en="Land Art", years="2022–2023", accent="#7C8A3E", kind="landart",
       dir="作品全集/其它作品/大地艺术作品/向稻谷致敬，2022年，荔波", n=8,
       extra_dirs=[("作品全集/其它作品/大地艺术作品/克莉丝蒂娜的教堂，2023，长岛","",8)],
       desc_zh="《向稻谷致敬》荔波稻田装置，《克莉丝蒂娜的教堂》长岛复活节大地艺术。把创作还给土地与季节，向最朴素的生长致敬。",
       desc_en="'Homage to the Rice' — a paddy-field installation in Libo — and 'Christina's Church', Easter land art on Long Island. Returning the work to soil and season, a homage to the humblest growth."),
  dict(id="langji", zh="浪迹", en="Wandering", years="2024", accent="#2C7A7B", kind="mixed",
       dir="作品全集/其它作品/浪迹，综合媒材，2024年，奉家丽", n=8,
       desc_zh="2024 年纽约个展（角声艺术中心、法拉盛公共图书馆）。综合媒材的漂泊之书，记录一个艺术家跨越北京、贵州与纽约的迁徙与扎根。",
       desc_en="A 2024 solo exhibition in New York (KJ Art Center & Flushing Public Library). A mixed-media book of wandering, charting an artist's migration and re-rooting across Beijing, Guizhou and New York."),
  dict(id="xiaoxia", zh="晓霞装", en="Dawn-Cloud Dress", years="2000–2008", accent="#D6187A", kind="mixed",
       dir="作品全集/其它作品/综合材料作品/晓霞装2001-2008",
       # red-background artworks first (by number), model shots last (item: 曉霞裝 red first, models last)
       pick=["晓霞妆#，综合材料，95x50cm,2001.jpg","晓霞妆1#，综合材料，45x50cm,2001.jpg",
             "晓霞妆2#，综合材料，45x50cm,2001.jpg.jpg","晓霞妆3#，综合材料，80x70cm,2001.jpgjpg.jpg",
             "晓霞妆5#，综合材料，805x70cm,2001.jpg2.jpg","晓霞妆6#，综合材料，65x50cm,2001.jpg.JPG",
             "晓霞妆7#，综合材料，100x60cm,2001.jpg.jpg","晓霞妆8#，综合材料，95x50cm,2001.jpg.jpg",
             "晓霞妆9#，综合材料，80x50cm,2001.jpg.jpg","晓霞妆10#，综合材料，70x50cm,2001.jpg.jpg",
             "晓霞妆11#，综合材料，90x50cm,2001.jpg.jpg","晓霞妆12#，综合材料，95x50cm,2001.jpg.jpg",
             "晓霞妆13#，综合材料，45x50cm,2006.jpg.jpg","晓霞妆14#，综合材料，95x50cm,2006.jpg.jpg",
             "4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg"],
       desc_zh="", desc_en="Rouged women on second-hand denim, after the ancient tale of Dawn-Cloud makeup."),
  dict(id="xiaowanglu", zh="笑忘录", en="Laughter and Forgetting", years="2000–2003", accent="#E0218A", kind="mixed",
       dir="作品全集/其它作品/综合材料作品/笑忘录2002", n=4,
       desc_zh="", desc_en="A woman's face painted on an enamel spittoon."),
  dict(id="kouzhao", zh="口罩呤", en="Mask Chant", years="2020", accent="#C0212B", kind="mixed",
       dir="作品全集/其它作品/综合材料作品/口罩呤2022", n=12,
       extra_dirs=[("工作照/奉家丽近照","bts",4)],
       desc_zh="", desc_en="Painted masks. The mask as a sign of life, politics and history."),
  dict(id="xiaoyouhua", zh="近作小油画", en="Recent Small Oils", years="2021–2025", accent="#C24E3A", kind="painting",
       dir="作品全集/油画/2021-2025年小油画/选上的", n=12,
       desc_zh="", desc_en="Recent small oils, 2021 to 2025."),
]
# chronological timeline order (stable: ties keep insertion order)
SERIES.sort(key=lambda s:int(re.search(r"\d{4}", s["years"]).group()))

PHOTO = dict(id="photo", zh="观念摄影", en="Conceptual Photography", years="1999 · 2013", accent="#555",
    desc_zh="《妊娠就是艺术》《女殇》系列。出于对作品的保护，摄影作品在此以模糊呈现；如需观看，请邮件联系艺术家。",
    desc_en="'Pregnancy Is Art' and the 'Female Die Young' series. For the protection of the work, the photographs are shown blurred here; to view them, please contact the artist by email.",
    dirs=["作品全集/其它作品/观念摄影/妊娠就是艺术1999/摄影作品：妊娠就是艺术",
          "作品全集/其它作品/观念摄影/小图摄影作品：“女殇------天使之抚”，奉家丽作品，2013_副本",
          "作品全集/其它作品/观念摄影/小图小图摄影作品：“女殇-----雏之园 ”，奉家丽，唐小梅联袂创作，2013_副本"])

# Solo-exhibition context per series, drawn from the 2026 CV (个展)
SHOWS = {
 "fenlian": ("个展 1999 ·《奉家丽油画艺术展》四合苑画廊，北京","Solo 1999 · Oil Painting Exhibition, Sihaiyuan Gallery, Beijing"),
 "guimi":   ("个展 2010 ·《闺秘——奉家丽油画新作展》环铁时代美术馆，北京","Solo 2010 · Inner Chamber — New Oil Paintings, Huantie Times Art Museum, Beijing"),
 "shenfen": ("个展 2017 ·《身份》奉家丽艺术工作室，北京","Solo 2017 · Identity, Feng Jiali Studio, Beijing"),
 "muyuan":  ("个展 2018 ·《墓园》黑空间，北京","Solo 2018 · Cemetery, Black Space, Beijing"),
 "lingjin": ("个展 2018 ·《领襟行动》行为，黑空间，北京","Solo 2018 · Collar Action (performance), Black Space, Beijing"),
 "fumei":   ("个展 2019 ·《自然复魅》汉威国际艺术中心，北京","Solo 2019 · Re-enchantment of Nature, Hanwei International Art Center, Beijing"),
 "dadi":    ("个展 2022 ·《十月-稻田装置大地艺术》荔波","Solo 2022 · October — Rice Field Land Art Installation, Libo"),
 "langji":  ("个展 2024 ·《浪迹》角声艺术中心、法拉盛公共图书馆，纽约","Solo 2024 · Wandering, KJ Art Center & Flushing Public Library, New York"),
}

DATA = {"series": [], "works": []}
wid = 0
for s in SERIES:
    fs, d = files_in(s["dir"])
    sat = s.get("sat"); rot = s.get("rot", 0)
    if "pick" in s:
        chosen = [f for f in s["pick"] if os.path.exists(os.path.join(d, f))]
    else:
        ranked = sorted(fs, key=numkey)                    # natural number order (item 6)
        must = [m for m in s.get("must", []) if m in fs]
        rest = [f for f in ranked if f not in must]
        tail = []                                          # push groups to the end, in key order (14,15)
        for key in s.get("tail", []):
            tail += [f for f in rest if key in f and f not in tail]
        head = [f for f in rest if f not in tail]
        chosen = (must + head)[: s.get("n", 8)] + tail
    works = []
    for f in chosen:
        wid += 1
        base = f"{s['id']}-{wid:03d}"
        src_path = os.path.join(ROOT, SRC_OVERRIDE[f]) if f in SRC_OVERRIDE else os.path.join(d, f)
        web, th = emit(src_path, base, saturation=sat, rotate=rot)
        meta = parse_meta(f)
        if not meta.get("dims") and s.get("dims"): meta["dims"] = s["dims"]   # series size fallback (item 7)
        works.append(dict(id=base, web=web, thumb=th, role="work", **meta))
    # extra dirs (details / studio / site / exhibition), natural-sorted
    for ed in s.get("extra_dirs", []):
        edir, role, en = ed
        efs, ad = files_in(edir)
        for f in sorted(efs, key=numkey)[:en]:
            wid += 1
            base = f"{s['id']}-{wid:03d}"
            web, th = emit(os.path.join(ad, f), base)
            works.append(dict(id=base, web=web, thumb=th, role=role or "work", **parse_meta(f)))
    sh = SHOWS.get(s["id"])
    DATA["series"].append({k: s[k] for k in ("id","zh","en","years","accent","desc_zh","desc_en","kind")} |
                          {"feature": s.get("feature", False),
                           "show_zh": sh[0] if sh else "", "show_en": sh[1] if sh else ""})
    DATA["works"] += [dict(series=s["id"], **w) for w in works]
    print(f"  {s['id']}: {len(works)} imgs")

# ---- Photography (blurred) ----
pw = []
for pd in PHOTO["dirs"]:
    fs, d = files_in(pd)
    for f in fs[:6]:
        wid += 1
        base = f"photo-{wid:03d}"
        web, th = emit(os.path.join(d, f), base)
        pw.append(dict(id=base, series="photo", web=web, thumb=th, role="work", **parse_meta(f)))
DATA["series"].append({k: PHOTO[k] for k in ("id","zh","en","years","accent","desc_zh","desc_en")} |
                      {"kind":"photo","blurred":True,"feature":False})
DATA["works"] += pw
print(f"  photo: {len(pw)} imgs")

# ---- 乡拉岜 before/after ----
xfs, xd = files_in("乡拉岜艺术美学空间项目a")
def keynum(fn):
    m = re.search(r"(\d+)#", fn)
    return m.group(1) if m else None
before = {}; after = {}
for f in xfs:
    low = f.lower()
    n = keynum(f)
    if not n: continue
    if low.startswith("xing") or low.startswith("xinbg") or f.startswith("Xing"):
        after.setdefault(n, f)
    elif re.match(r"^\d+#", f):
        before.setdefault(n, f)
pairs = []
for n in sorted(set(before) & set(after), key=lambda x: int(x)):
    b = emit(os.path.join(xd, before[n]), f"xlb-b{n}", 1200, 600)
    a = emit(os.path.join(xd, after[n]),  f"xlb-a{n}", 1200, 600)
    pairs.append(dict(n=int(n), before=b[0], after=a[0]))
DATA["xianglaba"] = pairs
print(f"  乡拉岜 pairs: {len(pairs)}")

# ---- Posters (招贴) ----
posters = []
for pdir, tag in [("塞壬招贴图片","siren"), ("展览招贴","exhibition")]:
    fs, d = files_in(pdir)
    for i, f in enumerate(fs[:18]):
        web, th = emit(os.path.join(d, f), f"poster-{tag}-{i:02d}", 1200, 600)
        posters.append(dict(web=web, thumb=th, tag=tag))
DATA["posters"] = posters
print(f"  posters: {len(posters)}")

# ---- Portrait, cursor, nav icon ----
def one(src, base, dim):
    if os.path.exists(src):
        sips(src, os.path.join(IMG, base + ".jpg"), dim)
        return "img/" + base + ".jpg"
    return None
DATA["portrait"] = one(os.path.join(ROOT, "工作照/奉家丽近照/2222222.tif"), "portrait", 1000)
# Homepage hero: 晓霞妆1# (full-bleed cover). item 1
_hero_src = os.path.join(ROOT, "作品全集/其它作品/综合材料作品/晓霞装2001-2008/晓霞妆1#，综合材料，45x50cm,2001.jpg")
DATA["hero"] = one(_hero_src, "hero", 2200) if os.path.exists(_hero_src) else one(os.path.join(ROOT, SPITTOON_SRC), "hero", 2000)
# Cursor + nav/favicon: the spittoon cut out of 笑忘录5# (background removed)
if make_cutout():
    DATA["cursor"] = "img/cursor.png"
    DATA["navicon"] = "img/navicon.png"
    DATA["spittoon"] = "img/spittoon.png"
else:
    DATA["navicon"] = one(os.path.join(ROOT,"鼠标图像.jpg"), "navicon", 120)
# Siren Studio group photo (b&w circle of four), rotated 180° per item 16
sp_src = os.path.join(ROOT, "塞壬招贴图片/拼图-2.tif")
if os.path.exists(sp_src):
    try:
        _pil_process(sp_src, os.path.join(IMG, "siren-hero.jpg"), 1800, rotate=180)
        DATA["sirenPhoto"] = "img/siren-hero.jpg"
    except Exception as e:
        print("  siren rotate failed:", e); DATA["sirenPhoto"] = one(sp_src, "siren-hero", 1800)
else:
    DATA["sirenPhoto"] = posters[-1]["web"] if posters else None

with open(os.path.join(SITE, "data.js"), "w", encoding="utf-8") as fp:
    fp.write("window.DATA = ")
    json.dump(DATA, fp, ensure_ascii=False, indent=1)
    fp.write(";\n")
print(f"\nTOTAL works: {len(DATA['works'])}  series: {len(DATA['series'])}")
print("data.js written ->", os.path.join(SITE, "data.js"))
# item 11: convert all Chinese in data.js to Traditional (keys/English pass through)
try:
    from opencc import OpenCC; _cc = OpenCC("s2t")
    _p = os.path.join(SITE, "data.js")
    _txt = open(_p, encoding="utf-8").read()          # read FIRST (avoid truncation)
    open(_p, "w", encoding="utf-8").write(_cc.convert(_txt))
    print("data.js -> Traditional Chinese")
except Exception as e:
    print("opencc skip (data.js stays Simplified):", e)

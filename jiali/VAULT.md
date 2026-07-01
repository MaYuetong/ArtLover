# VAULT · 奉家丽 Feng Jiali 网站 · 项目全记录

> 这份文档记录了到目前为止为奉家丽建站做的**所有事情**:结构、决策、数据、部署、域名、以及每一步的来龙去脉。以后想知道「当时都做了什么、为什么这么做、东西在哪」,看这一份就够。
> 最后更新:2026-07-01。

---

## 0. 一句话总览
为当代女性主义艺术家 **奉家丽(Feng Jiali,1963 生于重庆)** 建的**双语(中/英)、时间轴优先的单页作品网站**,已上线到 **https://fengjiali76.com**(GitHub Pages 托管)。套餐 basic_879,原定上线 2026-07-18。

---

## 1. 东西都在哪(仓库与文件)

### 源仓库(私有工作区,不对外)
- **`ArtLover` monorepo**(`github.com/MaYuetong/ArtLover`,public):项目源头。
  - `jiali/site/` = 网站源码(HTML/CSS/JS + 处理好的图片)。
  - `jiali/build.py` = 图片处理 + 数据生成流水线。
  - `jiali/README.md · SKILL-design.md · SKILL-archive.md · LOOP-refinement.md · INTAKE.md` = 前期方法论工具包。
  - `jiali/DEPLOY.md` = 部署说明。`jiali/CORE.md` = 站点规格 + 早期版本日志。
  - `jiali/publish.sh` = 一键发布到 jialifeng 公开仓库。`jiali/deploy.sh` = 发布到 gh-pages(备用)。
  - `.gitignore` **刻意把 6GB 原始素材(`作品全集/` 等)和私人文档挡在公开仓库之外**,只提交网站与脚本。
- **原始素材(不进 git)**:`jiali/作品全集/`、`乡拉岜艺术美学空间项目a/`、`展览招贴/`、`工作照/`、`塞壬招贴图片/`、`文本/`。共约 6GB,含全分辨率原作、简历、评论文档。本地保留。

### 公开站点仓库
- **`jialifeng`**(`github.com/MaYuetong/jialifeng`,public):**只放构建好的网站**,文件在根目录。GitHub Pages 从 `main / (root)` 发布。
- 更新方式:改完 `jiali/site/` 后,`cd jiali && ./publish.sh` 一键重新发布(自动带上 `.nojekyll` 和 `CNAME`)。

---

## 2. 上线与域名

- **托管**:GitHub Pages(`jialifeng` 仓库,main/root)。
- **域名**:`fengjiali76.com`,在 Namecheap 购买(`jiali.com` 已被占,故用此)。
- **DNS 方案 B(不把域名挂在个人名下)**:
  - `@`(主域名)→ 4 条 A 记录指向 GitHub Pages IP `185.199.108–111.153`。
  - `www` → **URL Redirect Record**(Unmasked,301)跳到 `https://fengjiali76.com`。**故意不用 CNAME**,这样客户 DNS 里不出现 `mayuetong.github.io`。
  - Namecheap 那条默认「REDIRECT DOMAIN(主域→www 停放页)」已删。
- **HTTPS**:GitHub 自动签发 Let's Encrypt 证书。⏳ **待办**:证书签好后到 Settings→Pages 勾 "Enforce HTTPS"(可由我用 API 代开)。
- 若日后要彻底归客户名下:把 `jialifeng` 仓库转到客户账号/中性组织,再把 www 改成 `<新名>.github.io`(方案 A)。

---

## 3. 网站结构与功能

单页 SPA,hash 路由,双语切换(右上角,记忆到 localStorage)。导航页:

| 页面 | 内容 |
|---|---|
| **时间轴 Timeline(首页)** | 电影感双图 hero + 四章叙事时间轴 + 塞壬工作室区块 |
| **作品 Works** | 下划线式筛选;每个系列有陈述;有文章的系列(墓园/自然复魅)= 文章与作品交织合读 |
| **空间艺术 Space Art** | 乡拉岜项目:荔波洪江村地图 + 项目介绍 + 「自然复魅/干栏式」背景 + 前后对比滑块 |
| **文章 Words** | 精选评论/自述,带阅读器 |
| **塞壬工作室 Siren Studio** | 大幅黑白四人合影 + 工作室自述 + 招贴文献 |
| **关于 About** | 精简肖像 + 官方简介 + 评论 + 展览招贴 + 完整简历(个展/获奖/联展) |
| **联系 Contact** | 邮箱/IG/微信/所在地 + 留言表单(见下) |

**关键功能**:
- **首页 hero**(演进过程:肖像→左右双图→塞壬满版叠字→**当前:电影感等分双图**)。左《笑忘录5#》(点→作品),右塞壬黑白合影(点→工作室),FENG/JIALI 居中叠加在接缝上。
- **叙事四章**(MOMA 风格半透明色块):I 粉面与凝视 → II 转向自然 → III 废墟与记忆 → IV 苍生与浪迹。依据她一生的风格转折(含 2026 冷泉港实验室新方向)。
- **系列按媒材差异化排版**:绣卷/综合材料=竖长缩略图、大地艺术=横幅、油画=方形、重点系列=大幅引导图。
- **摄影作品**:轻度模糊(10px)+「✉ 联系获得」,点击进联系页(自动带主题)。
- **乡拉岜前后对比**:25 组可拖动滑块 + Leaflet 地图(荔波洪江村标点,需联网加载瓦片)。
- **自定义光标 / 导航图标 / favicon**:从《笑忘录5#》痰盂**抠图去背景**而来。
- **联系表单**:真实服务器端发信(Web3Forms),**cc 备份到 `jialistudio2963@gmail.com, artwithyuti@gmail.com`**;回复地址=访客邮箱。⏳ **待办**:填入 Web3Forms access key 才真正生效(未填时兜底打开邮件应用)。
- **底部订阅**:目前只存 localStorage,**非真订阅**(待接后端)。

---

## 4. 数据流水线(build.py)

`cd jiali && python3 build.py`(跳过已存在图片;`REBUILD=1` 强制重生成)。产出:
- **202 件精选作品 / 17 个系列**,按 2026 简历年代排序。
- 每张图:HEIC/TIF → 网页 JPG(1600px)+ 缩略图(720px);文件名自动解析出中/英标题、年份、媒材、尺寸。
- **17 系列**:粉脸谱系 · 笑忘录 · 晓霞装 · 手工上彩 · 闺秘 · 自然复魅 · 琥珀 · 身份 · 墓园 · 领襟行动 · 石墟 · 苍生 · 口罩呤 · 近作小油画 · 大地艺术 · 浪迹 · 观念摄影。
- 每系列一个强调色(color-bold),用于筛选下划线与叙事色块。
- 乡拉岜 25 组前后对比配对;招贴;肖像;痰盂抠图;塞壬合影(siren-hero)。
- 输出 `site/data.js`(图像+作品)。文字在 `site/content.js`(双语,零破折号)。

---

## 5. 内容来源(读过的文档)

- **2026 中英简历**(.pages → 导出 5 页 PDF 全读):生平、获奖、个展 1994–2025、联展 1989–2025。
- **墓园**:王家新《揭开历史的一角》、《墓园》自荐信(红卫兵墓园,2m×19m 油画)。
- **自然复魅**:岛子《以自然复魅重构风景诗学》、Christopher Pelley《后女性主义》。
- **代表作自述**:《无边的差异,永恒的女性》(1999,答策展人林似竹)。
- **评论短评**:夏可君、贾方舟、江梅、水天中(双语)。
- 系列陈述:晓霞妆(夜来/晓霞妆典故+牛仔布)、笑忘录(痰盂)、口罩呤(卢文悦 2020)。
- **《自然复魅·洪江》PDF**:马克斯·韦伯「复魅」概念、干栏式老屋、乡拉岜项目(买 5 栋老屋、衣+住、荔波朝阳镇洪江村上拉岜组、2017–2026)。

---

## 6. 设计与写作决策

- **字体**:全站 **Hanken Grotesk**(拉丁)+ Noto Sans SC(中文兜底)。
- **排版**:MOMA / MIT Media Lab 风格,大留白、大标题、宽栅格;去掉粗分割线。
- **配色**:白底 + 品红(`#e0218a`)主色 + 每系列专属强调色。
- **文案**:用 **humanize skill 去 AI 化**,**全站零破折号**(— 和 – 一律不用),忠实于原文章/评论的语言,做 jiali 风格翻译。
- **hero**:参考 element brooklyn / 电影海报,做「透明大气」的叠字与等分双图。

---

## 7. 变更日志(按时间)

1. **前期工具包**:调研 2026 设计趋势 + catalogue raisonné 标准,产出 SKILL/LOOP/INTAKE/README。
2. **读全部素材** + 建 build.py 流水线 + 首版时间轴双语站(v1.0)。
3. 依完整简历校正油画系列(闺秘=Inner Chamber、浪迹=Wandering)+ 个展徽标 + 联展全列表。
4. **去 AI 化 + 零破折号**;排版转 MOMA/MIT。
5. **补全时间轴**:新增 笑忘录/晓霞装/口罩呤/近作小油画 + 大篇幅塞壬工作室;去随机色块。
6. **手机适配**(修横向溢出);**自然复魅**大图+原文引文合读;乡拉岜错落网格+地图。
7. **hero 多轮迭代**:痰盂满版 → 双图 → 塞壬满版叠字 → **电影感等分双图**。
8. **导航**:乡拉岜→「空间艺术」;摄影模糊减轻+联系解锁;**新增联系页+表单**。
9. **部署**:ArtLover(源)+ **jialifeng 公开仓库**(站点根目录)+ publish.sh;**绑定域名 fengjiali76.com**(方案 B DNS)。
10. **PDF 内容**入站(空间艺术项目/复魅/干栏式/地点);**联系表单接 Web3Forms + cc 两个备份邮箱**。

---

## 8. 待办 TODO(未完成/需外部动作)

- [ ] **Web3Forms access key** → 填入 `content.js` 的 `contact.web3formsKey`,联系表单才真正服务器端发信(现兜底 mailto)。
- [ ] **HTTPS**:GitHub 证书签好后开启 "Enforce HTTPS"。
- [ ] **底部订阅**若要真收邮箱,接一个后端(可复用 Web3Forms / Buttondown / Mailchimp)。
- [ ] 乡拉岜前后对比:每栋房的**地名/说明**(现为编号 №1…)。
- [ ] 自动从文件名解析的个别**英文标题/年份**人工校对。
- [ ] (可选)域名彻底归客户:仓库转到客户账号/中性组织(方案 A)。

---

## 9. 常用命令

```bash
# 本地预览
cd jiali/site && python3 -m http.server 8080     # 打开 http://localhost:8080

# 改了策展/加新作品后,重生成数据与图片
cd jiali && python3 build.py                       # 跳过已存在图片
cd jiali && REBUILD=1 python3 build.py             # 强制重生成

# 一键发布到线上(jialifeng 公开仓库 → fengjiali76.com)
cd jiali && ./publish.sh

# 备份到源仓库
git add jiali/site jiali/*.py jiali/*.md && git commit -m "..." && git push origin main
```

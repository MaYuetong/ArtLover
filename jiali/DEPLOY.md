# 上线说明 · Deploy guide (Feng Jiali site)

The site lives in `jiali/site/`. It is published to GitHub Pages from a dedicated
**`gh-pages`** branch that holds the site files at the branch root. You do not move
anything into `/docs`. A one-line script (`jiali/deploy.sh`) rebuilds and pushes that
branch whenever you want to publish.

> Why a branch and not a GitHub Action? The token on this machine doesn't have the
> `workflow` permission, so it can't push a `.github/workflows` file. The `gh-pages`
> branch needs no special permission. (If you later want auto-deploy on every push,
> see "Optional: auto-deploy" at the bottom.)

## 一键部署 · One-click deploy
```
cd jiali
./deploy.sh
```
This copies `jiali/site/` to a clean `gh-pages` branch root and force-pushes it.
Run it again any time you change the site.

## 一次性开启 · One-time setup (≈1 min, after the first deploy)
1. Run `./deploy.sh` once (creates the `gh-pages` branch).
2. GitHub: **repo → Settings → Pages → Build and deployment**
   - **Source = "Deploy from a branch"**
   - **Branch = `gh-pages`**, **folder = `/ (root)`** → Save.
3. Wait ~1 min. The site is live at:
   **https://mayuetong.github.io/ArtLover/**

The site uses relative paths, so it works under the `/ArtLover/` sub-path and under a
custom domain at the root.

## 自定义域名 · Custom domain (Namecheap)
`jiali.com` is already registered (taken). Available alternatives I checked:
`jialifengart.com`, `jiali-feng.com`. You can also try `.art` / `.studio` on Namecheap.

After buying a domain, e.g. `www.example.com`:
1. Create `jiali/site/CNAME` containing one line: the domain (e.g. `www.example.com`).
   Then run `./deploy.sh` again so the CNAME ships in the `gh-pages` branch.
2. GitHub: Settings → Pages → Custom domain → enter the same domain → Save, then tick
   "Enforce HTTPS" once the certificate is ready.
3. **Namecheap → Domain → Advanced DNS**:
   - **Subdomain (e.g. www):** `CNAME  www  →  mayuetong.github.io.`
   - **Apex (example.com):** four `A` records to GitHub Pages:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   DNS can take 30 min to a few hours.

## 本地预览 · Local preview
```
cd jiali/site && python3 -m http.server 8080   # open http://localhost:8080
```

## 重新生成图片与数据 · Rebuild data/images
```
cd jiali
python3 build.py            # skips images that already exist
REBUILD=1 python3 build.py  # force re-process every image
```
Regenerates `jiali/site/data.js` and `jiali/site/img/`.

## Optional: auto-deploy on every push (GitHub Action)
If you prefer the site to redeploy automatically, give your GitHub token the `workflow`
scope (github.com → Settings → Developer settings → Personal access tokens), or add the
workflow file through the GitHub web editor (Add file → Create new file →
`.github/workflows/deploy.yml`), using `actions/upload-pages-artifact` with
`path: jiali/site` and `actions/deploy-pages`. Then set Pages Source = "GitHub Actions".

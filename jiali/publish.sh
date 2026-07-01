#!/usr/bin/env bash
# Publish jiali/site to the dedicated public repo MaYuetong/jialifeng
# (branch: main, site files at the repo ROOT, so GitHub Pages serves from main / root).
# Usage:  cd jiali && ./publish.sh
set -euo pipefail

ROOT="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
SITE="$ROOT/jiali/site"
REMOTE="https://github.com/MaYuetong/jialifeng.git"
BRANCH="main"

[ -d "$SITE" ] || { echo "site not found: $SITE"; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cp -R "$SITE/." "$TMP/"
touch "$TMP/.nojekyll"
echo "fengjiali76.com" > "$TMP/CNAME"   # custom domain (GitHub Pages reads this)
cat > "$TMP/README.md" <<'MD'
# 奉家丽 · Feng Jiali

Personal website of contemporary feminist artist Feng Jiali (奉家丽, b.1963, Chongqing).
A timeline of thirty years of work: painting, mixed media, land art and performance.

This repository holds the built static site (served at the repo root). Live via GitHub
Pages. Source archive and build pipeline are maintained privately.
MD

cd "$TMP"
git init -q
git config http.postBuffer 1048576000   # site ~291MB; 400s on the 1MB default
git config http.version HTTP/1.1
git checkout -q -b "$BRANCH"
git add -A
git -c user.email="deploy@local" -c user.name="deploy" commit -q -m "Publish $(date -u +%FT%TZ)"
echo "Pushing $BRANCH to $REMOTE ..."
git push -f "$REMOTE" "$BRANCH"

echo ""
echo "✅ Published to $REMOTE ($BRANCH)."
echo "   Pages: Settings → Pages → Deploy from a branch → main → / (root)."
echo "   URL:   https://mayuetong.github.io/jialifeng/"

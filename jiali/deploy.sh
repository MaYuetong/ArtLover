#!/usr/bin/env bash
# One-click deploy: publish jiali/site to the gh-pages branch (site files at root).
# Usage:  cd jiali && ./deploy.sh
set -euo pipefail

ROOT="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
SITE="$ROOT/jiali/site"
REMOTE="$(git -C "$ROOT" remote get-url origin)"
BRANCH="gh-pages"

[ -d "$SITE" ] || { echo "site not found: $SITE"; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cp -R "$SITE/." "$TMP/"
touch "$TMP/.nojekyll"

cd "$TMP"
git init -q
git config http.postBuffer 1048576000   # 1GB; the site (~291MB) 400s on the 1MB default
git config http.version HTTP/1.1          # avoid HTTP/2 sideband errors on big pushes
git checkout -q -b "$BRANCH"
git add -A
git -c user.email="deploy@local" -c user.name="deploy" commit -q -m "Deploy $(date -u +%FT%TZ)"
echo "Pushing $BRANCH to $REMOTE ..."
git push -f "$REMOTE" "$BRANCH"

echo ""
echo "✅ Deployed to the gh-pages branch."
echo "   One-time: GitHub → Settings → Pages → Deploy from a branch → gh-pages → / (root)."
echo "   URL: https://mayuetong.github.io/ArtLover/"

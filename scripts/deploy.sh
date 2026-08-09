#!/usr/bin/env bash
#
# Publish the built site to the `deploy` branch on GitHub.
#
# Hostinger's Git deployment copies a branch straight into public_html without
# running a build, so it needs a branch whose ROOT is the finished site rather
# than the source. This script builds, then force-pushes the contents of out/
# to `deploy` as a fresh single commit.
#
#   npm run deploy
#
# `main` keeps the full source and history; `deploy` is disposable build output.
#
set -euo pipefail

REMOTE="${DEPLOY_REMOTE:-$(git remote get-url origin)}"
BRANCH="${DEPLOY_BRANCH:-deploy}"
TMP=".deploy-tmp"

echo "==> Building"
npm run build

if [ ! -f out/index.html ]; then
  echo "!! out/index.html missing — the build did not produce a site. Aborting." >&2
  exit 1
fi

echo "==> Staging out/ as a standalone repository"
rm -rf "$TMP"
cp -a out "$TMP"

# .htaccess is hidden; make sure it actually came across before publishing.
for required in index.html .htaccess api/inquiry.php; do
  if [ ! -f "$TMP/$required" ]; then
    echo "!! $required missing from the build output. Aborting." >&2
    rm -rf "$TMP"
    exit 1
  fi
done

cd "$TMP"
git init -q -b "$BRANCH"
git add -A
git \
  -c user.name="$(git -C .. config user.name)" \
  -c user.email="$(git -C .. config user.email)" \
  commit -q -m "Build $(date -u '+%Y-%m-%d %H:%M UTC') from $(git -C .. rev-parse --short HEAD)"

echo "==> Pushing to $BRANCH"
git push -qf "$REMOTE" "$BRANCH:$BRANCH"

cd ..
rm -rf "$TMP"

echo "==> Done. Now trigger the deploy in hPanel (or wait for auto-deploy)."

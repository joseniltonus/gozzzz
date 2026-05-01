#!/usr/bin/env bash
# Uso: bash scripts/git-add-origin-and-push.sh https://github.com/SEU_USER/gozzzz.git
set -euo pipefail
cd "$(dirname "$0")/.."
URL="${1:?Passa a URL HTTPS do repo, ex: https://github.com/teuuser/gozzzz.git}"
if git remote get-url origin &>/dev/null; then
  git remote set-url origin "$URL"
else
  git remote add origin "$URL"
fi
git push -u origin main

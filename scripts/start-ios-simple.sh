#!/usr/bin/env bash
# iOS rápido: porta fixa (8082) evita conflito com outro Metro na 8081; abre o Simulator cedo.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! xcode-select -p &>/dev/null; then
  echo "Xcode / command line tools em falta."
  echo "  1) Instala o Xcode (App Store)"
  echo "  2) sudo xcode-select -s /Applications/Xcode.app/Contents/Developer"
  exit 1
fi

PORT="${EXPO_IOS_PORT:-8082}"
echo "GoZzzz iOS — Metro na porta ${PORT} (altera com EXPO_IOS_PORT=8083 npm run ios)"
echo "Para parar: Ctrl+C"
echo ""

# Abre o Simulator já; reduz espera quando o Expo liga ao simulador.
open -a Simulator 2>/dev/null || true

exec npx expo start --ios --port "$PORT" "$@"

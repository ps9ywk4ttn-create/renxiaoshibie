#!/bin/zsh
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
NODE_BIN="/Users/kakarot/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
NODE_MODULES="/Users/kakarot/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules"

cd "$ROOT_DIR"
if [[ -f .license.env ]]; then
  set -a
  source ./.license.env 2>/dev/null || true
  set +a
fi
unset LICENSE_API_URL
unset AUTH_API_URL
if [[ ! -e node_modules ]]; then
  ln -sfn "$NODE_MODULES" node_modules
fi
exec "$NODE_BIN" tools/wms_export_server.mjs

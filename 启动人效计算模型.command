#!/bin/zsh
cd "$(dirname "$0")"
ln -sfn "/Users/kakarot/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules" node_modules
echo "启动 人效计算模型..."
echo "地址: http://127.0.0.1:5317"
"/Users/kakarot/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node" tools/wms_export_server.mjs

#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
VERSION="$(date +%Y%m%d-%H%M%S)"
BUILD_ROOT="$ROOT_DIR/dist"
PACKAGE_NAME="renxiaoshibie-macos-$VERSION"
PACKAGE_DIR="$BUILD_ROOT/$PACKAGE_NAME"
RUNTIME_SRC="/Users/kakarot/.cache/codex-runtimes/codex-primary-runtime/dependencies/node"

rm -rf "$PACKAGE_DIR"
mkdir -p "$PACKAGE_DIR"

copy_item() {
  local src="$1"
  local dst="$2"
  mkdir -p "$(dirname "$dst")"
  ditto "$src" "$dst"
}

copy_item "$ROOT_DIR/README.md" "$PACKAGE_DIR/README.md"
copy_item "$ROOT_DIR/实时人效看板/README.md" "$PACKAGE_DIR/实时人效看板/README.md"
copy_item "$ROOT_DIR/实时人效看板/VERSION" "$PACKAGE_DIR/实时人效看板/VERSION"
copy_item "$ROOT_DIR/实时人效看板/app" "$PACKAGE_DIR/实时人效看板/app"
copy_item "$ROOT_DIR/实时人效看板/tools" "$PACKAGE_DIR/实时人效看板/tools"
copy_item "$ROOT_DIR/实时人效看板/license-worker" "$PACKAGE_DIR/实时人效看板/license-worker"
copy_item "$ROOT_DIR/实时人效看板/.license.env.example" "$PACKAGE_DIR/实时人效看板/.license.env.example"
copy_item "$ROOT_DIR/app" "$PACKAGE_DIR/人效计算模型/app"
copy_item "$ROOT_DIR/tools" "$PACKAGE_DIR/人效计算模型/tools"
copy_item "$RUNTIME_SRC" "$PACKAGE_DIR/runtime/node"

rm -f "$PACKAGE_DIR/实时人效看板/license-worker/.license-admin.env"
rm -f "$PACKAGE_DIR/实时人效看板/license-worker/wrangler.toml"
rm -rf "$PACKAGE_DIR/实时人效看板/license-worker/.wrangler"
rm -f "$PACKAGE_DIR/人效计算模型/tools/build_macos_release.zsh"
find "$PACKAGE_DIR" -name ".DS_Store" -delete
find "$PACKAGE_DIR" -name "node_modules" -type l -delete
find "$PACKAGE_DIR" -name "node_modules *" -type l -delete

cat > "$PACKAGE_DIR/启动实时人效看板.command" <<'EOF'
#!/bin/zsh
set -euo pipefail

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$BASE_DIR/实时人效看板"
NODE_BIN="$BASE_DIR/runtime/node/bin/node"
NODE_MODULES="$BASE_DIR/runtime/node/node_modules"
PORT="${PORT:-5317}"

cd "$APP_DIR"
ln -sfn "$NODE_MODULES" "$APP_DIR/node_modules"

mkdir -p \
  "导入分析文件" \
  "入库实时看板导入" \
  "入库实效看板导入" \
  "打包状态分析导入" \
  "放单助手导入" \
  "空库位导出" \
  "导出文件" \
  "day-1人效" \
  "拣选数量走势汇总"

if [[ -f .license.env ]]; then
  set -a
  source ./.license.env 2>/dev/null || true
  set +a
fi

if lsof -ti tcp:"$PORT" >/dev/null 2>&1; then
  for pid in $(lsof -ti tcp:"$PORT" 2>/dev/null); do
    kill "$pid" 2>/dev/null || true
  done
  sleep 1
fi

nohup "$NODE_BIN" tools/wms_export_server.mjs > .server.log 2>&1 &

for _ in {1..30}; do
  if curl -fsS "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
    open "http://127.0.0.1:$PORT/"
    exit 0
  fi
  sleep 0.3
done

echo "启动失败，请查看：$APP_DIR/.server.log"
read -k 1 "?按任意键退出..."
EOF

cat > "$PACKAGE_DIR/停止实时人效看板.command" <<'EOF'
#!/bin/zsh
PORT="${PORT:-5317}"
if lsof -ti tcp:"$PORT" >/dev/null 2>&1; then
  for pid in $(lsof -ti tcp:"$PORT" 2>/dev/null); do
    kill "$pid" 2>/dev/null || true
  done
  echo "已停止实时人效看板"
else
  echo "实时人效看板没有运行"
fi
read -k 1 "?按任意键退出..."
EOF

cat > "$PACKAGE_DIR/使用说明.txt" <<'EOF'
实时人效看板 macOS 运行包

使用步骤：
1. 解压 zip。
2. 第一次打开如果提示“Apple 无法验证”，不要点“移到废纸篓”。
3. 按住 Control 键点“启动实时人效看板.command”，选择“打开”，再点“打开”。
4. 浏览器会打开 http://127.0.0.1:5317。
5. 使用 WMS 拉取功能前，请先在本机 Safari 打开并登录 WMS。
6. 第一次拉取 WMS 时，macOS 可能会要求允许终端控制 Safari，请允许。

如果右键打开仍被拦截：
1. 打开“系统设置”。
2. 进入“隐私与安全性”。
3. 在安全提示里找到“启动实时人效看板.command 已被阻止”。
4. 点“仍要打开”。

如果会用终端，也可以在解压后的文件夹里执行：

xattr -dr com.apple.quarantine .

注意：
- 这个包是 macOS 版，因为完整 WMS 功能依赖 Safari 和 AppleScript。
- 每台电脑都要在本机运行这个包，才能控制本机 Safari/WMS。
- 不要把自己的 .license.env、Excel 导入数据、日志文件发给别人。
EOF

chmod +x "$PACKAGE_DIR/启动实时人效看板.command"
chmod +x "$PACKAGE_DIR/停止实时人效看板.command"
chmod +x "$PACKAGE_DIR/实时人效看板/tools/"*.zsh 2>/dev/null || true
chmod +x "$PACKAGE_DIR/实时人效看板/tools/"*.mjs 2>/dev/null || true

cd "$BUILD_ROOT"
ditto -c -k --sequesterRsrc --keepParent "$PACKAGE_NAME" "$PACKAGE_NAME.zip"

echo "$BUILD_ROOT/$PACKAGE_NAME.zip"

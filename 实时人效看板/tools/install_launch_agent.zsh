#!/bin/zsh
set -e

LABEL="com.kakarot.realtime-efficiency-dashboard"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ASCII_ROOT="$HOME/.realtime_efficiency_dashboard"
SERVICE_DIR="$HOME/.realtime_efficiency_dashboard_service"
RUNNER="$SERVICE_DIR/run_server.zsh"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
UID_VALUE="$(id -u)"

mkdir -p "$HOME/Library/LaunchAgents"
mkdir -p "$SERVICE_DIR"
ln -sfn "$ROOT_DIR" "$ASCII_ROOT"
ln -sfn "/Users/kakarot/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules" "$ROOT_DIR/node_modules"

/bin/cat > "$RUNNER" <<RUNNER
#!/bin/zsh
set -e

ROOT_DIR="$ASCII_ROOT"
NODE_BIN="/Users/kakarot/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
NODE_MODULES="/Users/kakarot/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules"

cd "\$ROOT_DIR"
if [[ -f .license.env ]]; then
  set -a
  source ./.license.env 2>/dev/null || true
  set +a
fi
if [[ ! -e node_modules ]]; then
  ln -sfn "\$NODE_MODULES" node_modules
fi
exec "\$NODE_BIN" tools/wms_export_server.mjs
RUNNER

chmod +x "$RUNNER"

/bin/cat > "$PLIST" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/zsh</string>
    <string>$RUNNER</string>
  </array>
  <key>WorkingDirectory</key>
  <string>$SERVICE_DIR</string>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>$HOME</string>
    <key>PATH</key>
    <string>/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
    <key>PORT</key>
    <string>5317</string>
  </dict>
  <key>StandardOutPath</key>
  <string>/tmp/realtime-efficiency-dashboard.log</string>
  <key>StandardErrorPath</key>
  <string>/tmp/realtime-efficiency-dashboard.err.log</string>
</dict>
</plist>
PLIST

chmod +x "$ROOT_DIR/tools/run_dashboard_server.zsh"
plutil -lint "$PLIST" >/dev/null

launchctl bootout "gui/$UID_VALUE" "$PLIST" 2>/dev/null || true
launchctl bootstrap "gui/$UID_VALUE" "$PLIST" 2>/dev/null || true
launchctl enable "gui/$UID_VALUE/$LABEL"
launchctl kickstart -k "gui/$UID_VALUE/$LABEL"

echo "实时人效看板后台服务已启动: http://127.0.0.1:5317"

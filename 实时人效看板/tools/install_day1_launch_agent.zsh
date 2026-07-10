#!/bin/zsh
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
NODE_BIN="/Users/kakarot/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
PLIST="$HOME/Library/LaunchAgents/com.kakarot.realtime-efficiency.day1.plist"
DAY1_DIR="$ROOT_DIR/day-1人效"

mkdir -p "$HOME/Library/LaunchAgents" "$DAY1_DIR"

cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.kakarot.realtime-efficiency.day1</string>
  <key>ProgramArguments</key>
  <array>
    <string>$NODE_BIN</string>
    <string>$ROOT_DIR/tools/day1_productivity_job.mjs</string>
  </array>
  <key>WorkingDirectory</key>
  <string>$ROOT_DIR</string>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key>
    <integer>4</integer>
    <key>Minute</key>
    <integer>0</integer>
  </dict>
  <key>StandardOutPath</key>
  <string>$DAY1_DIR/launchd.out.log</string>
  <key>StandardErrorPath</key>
  <string>$DAY1_DIR/launchd.err.log</string>
</dict>
</plist>
EOF

UID_VALUE="$(id -u)"
launchctl bootout "gui/$UID_VALUE" "$PLIST" >/dev/null 2>&1 || true
launchctl bootstrap "gui/$UID_VALUE" "$PLIST"

echo "day-1人效自动任务已安装：每天 04:00 运行"
echo "$PLIST"

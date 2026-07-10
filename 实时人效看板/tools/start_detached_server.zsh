#!/bin/zsh
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LABEL="com.kakarot.realtime-efficiency-dashboard"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
PORT="${PORT:-5317}"
LOG="/tmp/realtime-efficiency-dashboard.direct.log"
ERR="/tmp/realtime-efficiency-dashboard.direct.err.log"
SCREEN_NAME="realtime_efficiency_dashboard_5317"

launchctl bootout "gui/$(id -u)" "$PLIST" 2>/dev/null || true
launchctl disable "gui/$(id -u)/$LABEL" 2>/dev/null || true

if lsof -ti tcp:"$PORT" >/dev/null 2>&1; then
  for pid in $(lsof -ti tcp:"$PORT" 2>/dev/null); do
    args="$(ps -p "$pid" -o args= 2>/dev/null || true)"
    if [[ "$args" == *"tools/wms_export_server.mjs"* || "$args" == *"run_dashboard_server.zsh"* ]]; then
      kill "$pid" 2>/dev/null || true
    fi
  done
  sleep 0.4
fi

if lsof -ti tcp:"$PORT" >/dev/null 2>&1; then
  echo "端口 $PORT 已被其他程序占用，未启动新服务"
  exit 1
fi

/usr/bin/screen -S "$SCREEN_NAME" -X quit >/dev/null 2>&1 || true
: >"$LOG"
: >"$ERR"
/usr/bin/screen -dmS "$SCREEN_NAME" /bin/zsh -lc "cd '$ROOT_DIR' && exec tools/run_dashboard_server.zsh >>'$LOG' 2>>'$ERR'"

for _ in {1..30}; do
  if curl -fsS "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
    echo "实时人效看板后台服务已启动: http://127.0.0.1:$PORT"
    exit 0
  fi
  if ! /usr/bin/screen -list | grep -q "$SCREEN_NAME"; then
    echo "实时人效看板后台服务启动失败，错误日志: $ERR"
    exit 1
  fi
  sleep 0.2
done

echo "实时人效看板后台服务启动超时，错误日志: $ERR"
exit 1

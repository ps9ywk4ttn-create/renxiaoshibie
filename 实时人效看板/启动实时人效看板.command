#!/bin/zsh
cd "$(dirname "$0")"
echo "启动 实时人效看板..."
tools/start_detached_server.zsh
open "http://127.0.0.1:5317"

/usr/bin/nohup /usr/bin/osascript \
  -e 'delay 1' \
  -e 'tell application "Terminal" to activate' \
  -e 'tell application "System Events" to keystroke "w" using command down' \
  >/dev/null 2>&1 &
disown

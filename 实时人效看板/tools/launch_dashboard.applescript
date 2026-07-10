set dashboardRoot to "/Users/kakarot/Documents/人效识别/实时人效看板"
set startScript to dashboardRoot & "/tools/start_detached_server.zsh"

do shell script "/bin/zsh " & quoted form of startScript & " >/tmp/realtime-efficiency-dashboard-launcher.log 2>&1"
open location "http://127.0.0.1:5317/"

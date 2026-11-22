#!/usr/bin/env bash
# Trigger/inspect the weekly Kakuyomu/Syosetu background update (runs inside the prod backend container).
# Usage: weekly-update.sh [--run] [--dry-run] [--status]     flags combine, e.g. `--run --status`
#   (no flag = --run). Order: dry-run, then run, then status.
# A run is refused if one is already in progress (backend guard + flock on this script).
# Progress: `weekly-update.sh --status`, the blue "Updating novel #N" banner on the novel list
# (http://<host>:8800), last summary file storage-prod/app/node-cache/weekly-update/last-run.json
set -uo pipefail
C=mtltools-prod-backend-1
do_run=0 do_dry=0 do_status=0
[ $# -eq 0 ] && set -- --run
for a in "$@"; do
  case "$a" in
    --run) do_run=1 ;; --dry-run) do_dry=1 ;; --status) do_status=1 ;;
    *) echo "usage: $0 [--run] [--dry-run] [--status]" >&2; exit 2 ;;
  esac
done
if [ $do_run = 1 ] && [ $do_dry = 1 ]; then echo "--run and --dry-run cannot be combined" >&2; exit 2; fi

# Only one trigger at a time (timer + manual); the backend refuses a second run anyway.
exec 9>"${XDG_RUNTIME_DIR:-/tmp}/mtltools-weekly-update.lock"
if ! flock -n 9; then echo "weekly-update: another trigger is running right now, try again in a moment"; exit 0; fi

for _ in $(seq 1 60); do
  [ "$(docker inspect -f '{{.State.Running}}' "$C" 2>/dev/null || true)" = true ] && break
  sleep 3
done

call() { # method path -> prints "status body", returns 0 ok / 3 conflict / 1 error
  docker exec "$C" node -e '
    const [m,p]=process.argv.slice(1);
    fetch("http://127.0.0.1:3000"+p,{method:m}).then(async r=>{
      const t=await r.text(); console.log(r.status+" "+t); process.exit(r.status<300?0:(r.status===409?3:1));
    }).catch(e=>{console.error("request failed: "+e.message);process.exit(1)});' "$1" "$2"
}

rc_total=0
if [ $do_dry = 1 ]; then call POST "/api/internal/weekly-update?dryRun=1" || rc_total=1; fi
if [ $do_run = 1 ]; then
  out=$(call POST /api/internal/weekly-update); rc=$?
  if [ $rc = 3 ]; then
    echo "weekly-update: a run is ALREADY IN PROGRESS, not starting another (see --status)"
  elif [ $rc = 0 ]; then
    echo "weekly-update: run started (${out:0:120}...)"
    echo "Check progress: $0 --status  |  banner on the novel list at :8800"
  else
    echo "weekly-update: failed to start: ${out:0:200}"; rc_total=1
  fi
fi
if [ $do_status = 1 ]; then
  [ $do_run = 1 ] && sleep 3
  call GET /api/internal/weekly-update || rc_total=1
fi
exit $rc_total

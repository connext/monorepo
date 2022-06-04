#!/bin/sh
set -eoux pipefail

dbmate up
pm2 start dist/index.js --source-map-support --kill-timeout 60000 --cron-restart=\"*/10 * * * *\" --time
pm2 logs --json

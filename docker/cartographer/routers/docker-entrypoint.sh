#!/bin/sh
set -eoux pipefail

dbmate up
pm2 start routers.config.js
pm2 logs

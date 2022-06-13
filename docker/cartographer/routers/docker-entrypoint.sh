#!/bin/sh
set -eoux pipefail

dbmate rollback
dbmate rollback
dbmate up
pm2-runtime routers.config.js

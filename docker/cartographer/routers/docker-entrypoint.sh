#!/bin/sh
set -eoux pipefail

dbmate up
pm2-runtime routers.config.js

#!/bin/sh
set -eoux pipefail

dbmate up
pm2 start transfers.config.js
pm2 logs
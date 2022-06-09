#!/bin/sh
set -eoux pipefail

dbmate rollback
dbmate rollback
dbmate up
pm2-runtime cartographer.config.js
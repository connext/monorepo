#!/bin/sh
set -eoux pipefail

dbmate up
pm2-runtime cartographer.config.js
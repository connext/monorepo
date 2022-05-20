#!/bin/sh
set -eoux pipefail

dbmate rollback
dbmate rollback
dbmate rollback
dbmate rollback
dbmate rollback
node --trace-warnings dist/index.js

#!/bin/sh
set -eoux pipefail

dbmate rollback
dbmate rollback
dbmate rollback
dbmate rollback
dbmate rollback

dbmate up
node dist/entryRouters.js

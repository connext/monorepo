#!/bin/sh
set -eoux pipefail

dbmate -d /home/node/packages/adapters/database/db/migrations up
node dist/entryTransfers.js
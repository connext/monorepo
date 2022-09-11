#!/bin/sh
set -eoux pipefail

dbmate up
node dist/entryMessages.js

#!/bin/sh
set -eoux pipefail

dbmate up
node --trace-warnings dist/index.js

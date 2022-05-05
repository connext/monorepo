#!/bin/sh
set -eoux pipefail

dbmate --help
node --trace-warnings dist/index.js

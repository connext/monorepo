#!/bin/sh
set -e

dbmate up
node --trace-warnings dist/index.js

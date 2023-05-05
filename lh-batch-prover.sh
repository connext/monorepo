#!/bin/bash

for i in {2..21}
do
    offset=$(($i * 100))
    osascript -e "tell application \"Terminal\" to do script \"cd InfocomWork/nxtp/packages/agents/lighthouse && LIGHTHOUSE_SERVICE=prover OFFSET=$offset node --enable-source-maps dist/tasks/run.js\"" &
done
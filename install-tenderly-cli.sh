#!/bin/bash

if [ "$(uname)" == "Darwin" ]; then
   curl https://raw.githubusercontent.com/Tenderly/tenderly-cli/master/scripts/install-macos.sh | sh
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
   curl https://raw.githubusercontent.com/Tenderly/tenderly-cli/master/scripts/install-linux.sh | sudo sh
fi


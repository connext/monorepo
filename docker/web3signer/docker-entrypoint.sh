#!/bin/bash

./prepare-config.sh
./bin/web3signer --key-store-path="${KEY_PATH}/local" --logging DEBUG --swagger-ui-enabled eth1
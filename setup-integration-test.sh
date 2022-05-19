#!/bin/bash
##### Contracts
echo "Deploying contracts to 4..."
CHAIN_ID=4 ETH_PROVIDER_URL=http://0.0.0.0:8547 yarn workspace @connext/nxtp-contracts hardhat deploy --network localhost
echo "Deployed contracts to 4"

echo "Deploying contracts to 42..."
CHAIN_ID=42 ETH_PROVIDER_URL=http://0.0.0.0:8546 yarn workspace @connext/nxtp-contracts hardhat deploy --network localhost
echo "Deployed contracts to 42"
#####

##### Subgraph
echo "Deploying subgraph to 1337..."
yarn workspace @connext/nxtp-subgraph prepare:local
yarn workspace @connext/nxtp-subgraph codegen
yarn workspace @connext/nxtp-subgraph create-local-1337
yarn workspace @connext/nxtp-subgraph deploy-local-1337 -l v0.0.1
echo "Deployed subgraph to 1337"

echo "Deploying subgraph to 1338..."
yarn workspace @connext/nxtp-subgraph create-local-1338
yarn workspace @connext/nxtp-subgraph deploy-local-1338 -l v0.0.1
echo "Deployed subgraph to 1338"
#####

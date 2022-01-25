#!/bin/bash
##### Contracts
echo "Deploying contracts to 1337..."
CHAIN_ID=1337 ETH_PROVIDER_URL=http://127.0.0.1:8545 yarn workspace @connext/nxtp-contracts hardhat deploy --network localhost
echo "Deployed contracts to 1337"

echo "Deploying contracts to 1338..."
CHAIN_ID=1338 ETH_PROVIDER_URL=http://127.0.0.1:8546 yarn workspace @connext/nxtp-contracts hardhat deploy --network localhost
echo "Deployed contracts to 1338"
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
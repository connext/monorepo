#!/bin/bash
##### Loading .env file contents
echo "Loading .env contents"
set -a            
source .env
set +a
echo ".env contents loaded"
#####


##### Config Variables
LOCALHOST="127.0.0.1"
NETWORK="devnet"
#####

##### Delete previous local-mainnet, local-optimism and local-arbitrum chain deployment records if they exist.
rm -rf -- packages/deployments/contracts/deployments/local-mainnet
rm -rf -- packages/deployments/contracts/deployments/local-optimism
rm -rf -- packages/deployments/contracts/deployments/local-arbitrum
#####

##### Local chains, graph nodes, and IPFS.
echo "Starting mainnet, optimism, arbitrum local chains..."
docker compose -f docker-compose.chains.yaml up -d --force-recreate
sleep 5
#####

##### Contract Deployments
echo "Deploying contracts to local-mainnet..."
yarn workspace @connext/smart-contracts hardhat deploy --network local-mainnet --tags local
echo "Deployed contracts to local-mainnet"

echo "Deploying contracts to local-optimism..."
yarn workspace @connext/smart-contracts hardhat deploy --network local-optimism --tags local
echo "Deployed contracts to local-optimism"

echo "Deploying contracts to local-arbitrum..."
yarn workspace @connext/smart-contracts hardhat deploy --network local-arbitrum --tags local
echo "Deployed contracts to local-arbtirum"

yarn workspace @connext/smart-contracts run export
#####

##### Contract Deployments
echo "Initializing contracts..."
yarn workspace @connext/smart-contracts run local:init
echo "Initialized contracts..."
#####


##### Subgraph Deployments
echo "Building subgraph..."
yarn workspace @connext/nxtp-subgraph prepare:local_1337
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph"

echo "Deploying subgraph to 1337..."
yarn workspace @connext/nxtp-subgraph create-local-1337
yarn workspace @connext/nxtp-subgraph deploy-local-1337 -l v0.0.1
echo "Deployed subgraph to 1337"

echo "Building subgraph..."
yarn workspace @connext/nxtp-subgraph prepare:local_1338
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph"

echo "Deploying subgraph to 1338..."
yarn workspace @connext/nxtp-subgraph create-local-1338
yarn workspace @connext/nxtp-subgraph deploy-local-1338 -l v0.0.1
echo "Deployed subgraph to 1338"
#####

##### Off-Chain Agents
echo "Starting services and off-chain agents..."
docker compose -f docker-compose.services.yaml up -d --force-recreate
sleep 5
#####

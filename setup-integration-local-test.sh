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
echo "Building subgraph for the hub chain - mainnet-local..."
yarn workspace @connext/nxtp-subgraph prepare:local:hub
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph for the hub chain"

echo "Deploying subgraph to the hub chain - mainnet-devnet..."
yarn workspace @connext/nxtp-subgraph create:local:hub:mainnet
yarn workspace @connext/nxtp-subgraph deploy:local:hub:mainnet

yarn workspace @connext/nxtp-subgraph prepare:local:spoke:mainnet
yarn workspace @connext/nxtp-subgraph codegen
yarn workspace @connext/nxtp-subgraph create:local:spoke:mainnet
yarn workspace @connext/nxtp-subgraph deploy:local:spoke:mainnet
echo "Deployed subgraph to the hub chain - mainnet-local"

echo "Building subgraph for the spoke chain - optimism-local"
yarn workspace @connext/nxtp-subgraph prepare:local:spoke:optimism
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph for the spoke chain - optimism-local"

echo "Deploying subgraph to the spoke chain - optimism-local..."
yarn workspace @connext/nxtp-subgraph create:local:spoke:optimism
yarn workspace @connext/nxtp-subgraph deploy:local:spoke:optimism
echo "Deployed subgraphs to the optimism-local"

echo "Building subgraph for the spoke chain - arbitrum-local"
yarn workspace @connext/nxtp-subgraph prepare:local:spoke:arbitrum
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph for the spoke chain - arbitrum-local"

echo "Deploying subgraph to the spoke chain - arbitrum-local..."
yarn workspace @connext/nxtp-subgraph create:local:spoke:arbitrum
yarn workspace @connext/nxtp-subgraph deploy:local:spoke:arbitrum
echo "Deployed subgraph to the arbitrum-local"
#####


##### Off-Chain Agents
echo "Starting services and off-chain agents..."
docker compose -f docker-compose.services.yaml up -d --force-recreate
sleep 5
#####

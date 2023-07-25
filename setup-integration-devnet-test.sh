#!/bin/bash
##### Config Variables
LOCALHOST="127.0.0.1"

##### Devnet Deployments
echo "Starting devnets..."
yarn workspace @connext/smart-contracts run spawn-devnet
#####

##### IPFS, postgres, graph nodes.
echo "Starting ipfs, postgres and graph-node..."
docker compose -f docker-compose.devnets.yaml up -d --force-recreate
sleep 5
#####

##### Contract Deployments
echo "Deploying contracts to the hub chain - mainnet-devnet"
### TODO: Add a command to apply the necessary changes for mainnet-devnet.
echo "Deployed contracts to mainnet-devnet"

echo "Deploying contracts to the spoke chain - optimism-devnet"
### TODO: Add a command to apply the necessary changes for optimism-devnet.
echo "Deployed contracts to optimism-devnet"

echo "Deploying contracts to the spoke chain - arbitrum-devnet"
### TODO: Add a command to apply the necessary changes for arbitrum-devnet.
echo "Deployed contracts to arbitrum-devnet"
#####

##### Loading .env file contents
echo "Loading .env contents"
source .env
echo ".env contents loaded"
#####

##### Subgraph Deployments
echo "Building subgraph for the hub chain - mainnet-devnet..."
yarn workspace @connext/nxtp-subgraph prepare:devnet:amarok-hub-v0
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph for the hub chain"

echo "Deploying subgraph to the hub chain - mainnet-devnet..."
yarn workspace @connext/nxtp-subgraph create:hub_devnet_mainnet --node MAINNET_DEVNET_RPC_URL
yarn workspace @connext/nxtp-subgraph deploy:hub_devnet_mainnet --node MAINNET_DEVNET_RPC_URL -l v0.0.1
echo "Deployed subgraph to the hub chain - mainnet-devnet"

echo "Building subgraph for the spoke chains - optimism-devnet & arbitrum-devnet..."
yarn workspace @connext/nxtp-subgraph prepare:devnet:amarok-runtime-v0
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph for the spoke chains"

echo "Deploying subgraph to the spoke chain - optimism-devnet..."
yarn workspace @connext/nxtp-subgraph create:spoke_devnet_optimism --node OPTIMISM_DEVNET_RPC_URL
yarn workspace @connext/nxtp-subgraph deploy:spoke_devnet_optimism --node OPTIMISM_DEVNET_RPC_URL -l v0.0.1
echo "Deployed subgraphs to the optimism-devnet"

echo "Deploying subgraph to the hub chain - arbitrum-devnet..."
yarn workspace @connext/nxtp-subgraph create:spoke_devnet_arbitrum --node ARBITRUM_DEVNET_RPC_URL
yarn workspace @connext/nxtp-subgraph deploy:spoke_devnet_arbitrum --node ARBITRUM_DEVNET_RPC_URL -l v0.0.1
echo "Deployed subgraph to the arbitrum-devnet"
#####

##### Off-Chain Agents
echo "Starting services and off-chain agents..."
docker compose -f docker-compose.services.yaml up -d --force-recreate
sleep 5
#####

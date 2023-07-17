#!/bin/bash
##### Config Variables
LOCALHOST="127.0.0.1"
# LOCALHOST="localhost"
SEQUENCER_PORT="8081"
ROUTER_PORT="8080"
DEFAULT_MNEMONIC="candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
router_publisher_image="${ROUTER_PUBLISHER_IMAGE:-'router-publisher:latest'}"
router_subscriber_image="${ROUTER_SUBSCRIBER_IMAGE:-'router-subscriber:latest'}"
router_executor_image="${ROUTER_EXECUTOR_IMAGE:-'router-executor:latest'}"
sequencer_server_image="${SEQUENCER_SERVER_IMAGE:-'sequencer-server:latest'}"
sequencer_publisher_image="${SEQUENCER_PUBLISHER_IMAGE:-'sequencer-publisher:latest'}"
sequencer_subscriber_image="${SEQUENCER_SUBSCRIBER_IMAGE:-'sequencer-subscriber:latest'}"
relayer_image="${RELAYER_IMAGE:-'relayer:latest'}"
cartographer_transfers_image="${CARTOGRAPHER_TRANSFERS_IMAGE:-'cartographer-transfers:latest'}"
cartographer_routers_image="${CARTOGRAPHER_ROUTERS_IMAGE:-'cartographer-routers:latest'}"
lighthouse_image="${LIGHTHOUSE_IMAGE:-'lighthouse:latest'}"
WEB3_SIGNER_PRIVATE_KEY_ROUTER="0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3" # 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
WEB3_SIGNER_PRIVATE_KEY_SEQUENCER="0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f" # 0xf17f52151EbEF6C7334FAD080c5704D77216b732
WEB3_SIGNER_PRIVATE_KEY_RELAYER="0x09ac2359ab897a5ffc47d7c67df32abbf9c006e00fa2ba36580e0cecc58834fe" # 0xc5842D5870622B406a71eeC1EcB2Df01D9dF5C28
RELAYER_URL="http://relayer:8082"
#####

##### Global .env Configuration
echo "
# Global test environment
ROUTER_PORT=${ROUTER_PORT}
SEQUENCER_PORT=${SEQUENCER_PORT}

# Agent configuration
NXTP_SEQUENCER=http://${LOCALHOST}:${SEQUENCER_PORT}
NXTP_MNEMONIC=${DEFAULT_MNEMONIC}
NXTP_SERVER_HOST=http://${LOCALHOST}
NXTP_SERVER_PORT=${ROUTER_PORT}

SEQ_SERVER_HOST=http://${LOCALHOST}
SEQ_SERVER_PORT=${SEQUENCER_PORT}
SEQ_ENVIRONMENT=production
SEQ_RELAYER_URL=${RELAYER_URL}

NXTP_CONFIG=config.local.json
SEQ_CONFIG=config.local.json
RELAYER_CONFIG=config.local.json

NXTP_ENVIRONMENT=local
NXTP_NOMAD_ENVIRONMENT=staging

MNEMONIC=${DEFAULT_MNEMONIC}
WEB3_SIGNER_PRIVATE_KEY_ROUTER=${WEB3_SIGNER_PRIVATE_KEY_ROUTER}
WEB3_SIGNER_PRIVATE_KEY_SEQUENCER=${WEB3_SIGNER_PRIVATE_KEY_SEQUENCER}
WEB3_SIGNER_PRIVATE_KEY_RELAYER=${WEB3_SIGNER_PRIVATE_KEY_RELAYER}

# Images used for building docker containers
ROUTER_PUBLISHER_IMAGE=${router_publisher_image}
ROUTER_SUBSCRIBER_IMAGE=${router_subscriber_image}
ROUTER_EXECUTOR_IMAGE=${router_executor_image}
SEQUENCER_SERVER_IMAGE=${sequencer_server_image}
SEQUENCER_PUBLISHER_IMAGE=${sequencer_publisher_image}
SEQUENCER_SUBSCRIBER_IMAGE=${sequencer_subscriber_image}
RELAYER_IMAGE=${relayer_image}
CARTOGRAPHER_TRANSFERS_IMAGE=${cartographer_transfers_image}
CARTOGRAPHER_ROUTERS_IMAGE=${cartographer_routers_image}
LIGHTHOUSE_IMAGE=${lighthouse_image}

# Optional:
# AUCTION_ROUND_DEPTH
# NXTP_SUBGRAPH_POLL_INTERVAL
# NXTP_CACHE_POLL_INTERVAL
" > .env
#####

##### Delete previous local_1337 and local_1338 chain deployment records if they exist.
rm -rf -- packages/deployments/contracts/deployments/local_1337
rm -rf -- packages/deployments/contracts/deployments/local_1338
#####

##### Local chains, graph nodes, and IPFS.
echo "Starting 1337 and 1338 local chains..."
docker compose -f docker-compose.chains.yaml up -d --force-recreate
sleep 5
#####

##### Contract Deployments
echo "Deploying contracts to 1337..."
# MNEMONIC="candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" ENV=production CHAIN_ID=1338 ETH_PROVIDER_URL=http://localhost:8547 yarn workspace @connext/smart-contracts hardhat deploy --network local_1337 --tags local
MNEMONIC=${DEFAULT_MNEMONIC} ENV=production CHAIN_ID=1337 ETH_PROVIDER_URL=http://${LOCALHOST}:8547 yarn workspace @connext/smart-contracts hardhat deploy --network local_1337 --tags local
echo "Deployed contracts to 1337"

echo "Deploying contracts to 1338..."
# MNEMONIC="candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" ENV=production CHAIN_ID=1338 ETH_PROVIDER_URL=http://localhost:8546 yarn workspace @connext/smart-contracts hardhat deploy --network local_1338 --tags local
MNEMONIC=${DEFAULT_MNEMONIC} ENV=production CHAIN_ID=1338 ETH_PROVIDER_URL=http://${LOCALHOST}:8546 yarn workspace @connext/smart-contracts hardhat deploy --network local_1338 --tags local
echo "Deployed contracts to 1338"
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

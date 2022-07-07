#!/bin/bash
LOCALHOST="127.0.0.1"
# LOCALHOST="localhost"
SEQUENCER_PORT="8081"
ROUTER_PORT="8080"
DEFAULT_MNEMONIC="candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
ROUTER_IMAGE=router:latest
SEQUENCER_IMAGE=sequencer:latest
RELAYER_IMAGE=relayer:latest
WEB3_SIGNER_PRIVATE_KEY="0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"
GRAPH_GOERLI_HANDLER_ENDPOINT="https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-test-goerli"
RELAYER_URL="http://relayer:8082"
# AUCTION_ROUND_DEPTH
# NXTP_SUBGRAPH_POLL_INTERVAL
# NXTP_CACHE_POLL_INTERVAL

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
NXTP_ENVIRONMENT=production
NXTP_NOMAD_ENVIRONMENT=staging

MNEMONIC=${DEFAULT_MNEMONIC}
WEB3_SIGNER_PRIVATE_KEY=${WEB3_SIGNER_PRIVATE_KEY}

ROUTER_IMAGE=${ROUTER_IMAGE}
SEQUENCER_IMAGE=${SEQUENCER_IMAGE}
RELAYER_IMAGE=${RELAYER_IMAGE}
" > .env


# Subgraph Variables
echo "Starting 1337 and 1338 local chains..."
docker compose -f docker-compose.chains.yaml -f docker-compose.services.yaml up -d --force-recreate
sleep 10

##### Contracts
echo "Deploying contracts to 1337..."
MNEMONIC=${DEFAULT_MNEMONIC} ENV=production CHAIN_ID=1337 ETH_PROVIDER_URL=http://${LOCALHOST}:8547 yarn workspace @connext/nxtp-contracts hardhat deploy --network localhost --tags local
echo "Deployed contracts to 1337"

echo "Deploying contracts to 1338..."
MNEMONIC=${DEFAULT_MNEMONIC} ENV=production CHAIN_ID=1338 ETH_PROVIDER_URL=http://${LOCALHOST}:8546 yarn workspace @connext/nxtp-contracts hardhat deploy --network localhost --tags local
echo "Deployed contracts to 1338"
#####

##### Subgraph
echo "Building subgraph..."
GRAPH_1337_ENDPOINT=${GRAPH_GOERLI_HANDLER_ENDPOINT}
GRAPH_1388_ENDPOINT=${GRAPH_GOERLI_HANDLER_ENDPOINT}

yarn workspace @connext/nxtp-subgraph prepare:v0
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph"

echo "Deploying subgraph to 1337..."
yarn workspace @connext/nxtp-subgraph create-local-1337
yarn workspace @connext/nxtp-subgraph deploy-local-1337 -l v0.0.1
echo "Deployed subgraph to 1337"

echo "Deploying subgraph to 1338..."
yarn workspace @connext/nxtp-subgraph create-local-1338
yarn workspace @connext/nxtp-subgraph deploy-local-1338 -l v0.0.1
echo "Deployed subgraph to 1338"
#####
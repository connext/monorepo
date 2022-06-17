#!/bin/bash
LOCALHOST="127.0.0.1"
# LOCALHOST="localhost"
SEQUENCER_PORT="8081"
ROUTER_PORT="8080"
DEFAULT_MNEMONIC="candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"

# AUCTION_ROUND_DEPTH
# NXTP_SUBGRAPH_POLL_INTERVAL
# NXTP_CACHE_POLL_INTERVAL

echo "
# Global test environment
ROUTER_PORT={ROUTER_PORT}
SEQUENCER_PORT={SEQUENCER_PORT}

# Agent configuration
NXTP_SEQUENCER=http://{LOCALHOST}:{SEQUENCER_PORT}
NXTP_MNEMONIC={DEFAULT_MNEMONIC}
NXTP_SERVER_HOST=http://{LOCALHOST}
NXTP_SERVER_PORT={ROUTER_PORT}

SEQ_SERVER_HOST=http://{LOCALHOST}
SEQ_SERVER_PORT={SEQUENCER_PORT}
SEQ_ENVIRONMENT=production
NXTP_ENVIRONMENT=production
NXTP_NOMAD_ENVIRONMENT=staging

# Docker-hosted local chains and services configuration
ROUTER_IMAGE=ghcr.io/connext/router:sha-65da413
SEQUENCER_IMAGE=ghcr.io/connext/sequencer:sha-65da413
WEB3_SIGNER_PRIVATE_KEY=0x40816775943c21f1e8e8569518046476e0a9557c6f71e3b11aae4955823f166d
MNEMONIC={DEFAULT_MNEMONIC}
" > .env

echo "Starting 1337 and 1338 local chains..."
docker compose -f docker-compose.chains.yaml up -d --force-recreate
sleep 4
docker compose -f docker-compose.services.yaml up -d --force-recreate
sleep 10

##### Contracts
echo "Deploying contracts to 1337..."
CHAIN_ID=1337 ETH_PROVIDER_URL=http://{LOCALHOST}:8547 yarn workspace @connext/nxtp-contracts hardhat deploy --network localhost --tags local
echo "Deployed contracts to 1337"

echo "Deploying contracts to 1338..."
CHAIN_ID=1338 ETH_PROVIDER_URL=http://{LOCALHOST}:8546 yarn workspace @connext/nxtp-contracts hardhat deploy --network localhost --tags local
echo "Deployed contracts to 1338"
#####

##### Subgraph
echo "Deploying subgraph to 1337..."
yarn workspace @connext/nxtp-subgraph prepare:v0
yarn workspace @connext/nxtp-subgraph codegen
yarn workspace @connext/nxtp-subgraph create-local-1337
yarn workspace @connext/nxtp-subgraph deploy-local-1337 -l v0.0.1
echo "Deployed subgraph to 1337"

echo "Deploying subgraph to 1338..."
yarn workspace @connext/nxtp-subgraph create-local-1338
yarn workspace @connext/nxtp-subgraph deploy-local-1338 -l v0.0.1
echo "Deployed subgraph to 1338"
#####
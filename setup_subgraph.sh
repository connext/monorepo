#!/bin/sh


    # export GRAPH_1337_ENDPOINT="http://100.26.200.84:8001/subgraphs/name/connext/nxtp"
    # export GRAPH_1338_ENDPOINT="http://54.198.158.253:8001/subgraphs/name/connext/nxtp"
    # bring up chains/graph node/ipfs
    # docker compose -f docker-compose.chains.yaml up -d

echo "Building subgraph..."

# build subgraph
yarn workspace @connext/nxtp-subgraph prepare:v0
yarn workspace @connext/nxtp-subgraph codegen

# create/deploy subgraphs to graph nodes
yarn workspace @connext/nxtp-subgraph create-local-1337
yarn workspace @connext/nxtp-subgraph deploy-local-1337 -l v0.0.1
yarn workspace @connext/nxtp-subgraph create-local-1338
yarn workspace @connext/nxtp-subgraph deploy-local-1338 -l v0.0.1

# generate client
echo "Building graph client..."
yarn workspace @connext/nxtp-adapters-subgraph run build-client

echo "Install DBMate"
sudo curl -fsSL -o /usr/local/bin/dbmate https://github.com/amacneil/dbmate/releases/latest/download/dbmate-linux-amd64 && sudo chmod +x /usr/local/bin/dbmate

echo "Migrating database"
yarn workspace @connext/nxtp-adapters-database dbmate up

while true  
do  
  echo "I'm alive"  
  sleep 300  
done


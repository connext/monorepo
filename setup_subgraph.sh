#!/bin/sh
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
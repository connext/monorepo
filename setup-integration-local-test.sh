#!/bin/bash
##### Loading .env file contents
echo "Loading .env contents"
set -a            
source .env
set +a
echo ".env contents loaded"
#####

#For M* macs set the default platform to linux/amd64
# export DOCKER_DEFAULT_PLATFORM=linux/amd64

##### Config Variables
LOCALHOST="127.0.0.1"
NETWORK="local"
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

echo "Deploying subgraph to the hub chain - mainnet-local..."
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

##### Create config files from the templates.
mainnet_rpcs=("http://local-mainnet:8545")
optimism_rpcs=("http://local-optimism:8545")
arbitrum_rpcs=("http://local-arbitrum:8545")

chains_mainnet=$(jq -n --argjson providers "$(printf '%s\n' "${mainnet_rpcs[@]}" | jq -R . | jq -s .)" '{"providers": $providers}')
chains_optimism=$(jq -n --argjson providers "$(printf '%s\n' "${optimism_rpcs[@]}" | jq -R . | jq -s .)" '{"providers": $providers}')
chains_arbitrum=$(jq -n --argjson providers "$(printf '%s\n' "${arbitrum_rpcs[@]}" | jq -R . | jq -s .)" '{"providers": $providers}')

echo "mainnet: $chains_mainnet" 
echo "optimism: $chains_optimism"
echo "arbitrum: $chains_arbitrum"

chains_json=$(jq -n \
     --argjson chains_mainnet "$chains_mainnet" \
     --argjson chains_optimism "$chains_optimism" \
     --argjson chains_arbitrum "$chains_arbitrum" \
     '{"31337": $chains_mainnet, "31338": $chains_optimism, "31339": $chains_arbitrum}'
     )

echo "chains: $chains_json"
# Add docker paths to replace/add `chains` in config.json
config_dir_paths=("docker/cartographer" "docker/lighthouse" "docker/router" "docker/sequencer" "docker/relayer" "docker/watcher")
template_file="config-template.json"

for dir_path in "${config_dir_paths[@]}"; do
    echo "Finding $template_file in $dir_path"
    template_file_path="$dir_path/$template_file"

    # Check if the config file exists
    if [ -f "$template_file_path" ]; then
        target_file_path="${dir_path}/config.json"
        # Use jq to load the JSON file, add elements, and save the modified content
        jq ". + { "network": \"$NETWORK\", "subgraphPrefix": \"$NETWORK\",  "chains": $chains_json }" "$template_file_path" > "$target_file_path"
    else
        echo "$template_file_path not found"
    fi
done
#####

# Extract deployed addresses into docker config
echo "Updating docker config with the deployed contract addresses for router, sequencer and lighthouse"
yarn workspace @connext/nxtp-integration gen:config router local
yarn workspace @connext/nxtp-integration gen:config sequencer local
yarn workspace @connext/nxtp-integration gen:config lighthouse local
echo "Updating docker config done"
#####

##### Off-Chain Agents
echo "Starting services and off-chain agents..."
docker compose -f docker-compose.services.yaml up -d --force-recreate
sleep 5
#####

# Setup db schema
echo "Setup db schema..."
yarn workspace @connext/nxtp-adapters-database dbmate -url $DATABASE_URL up
#####
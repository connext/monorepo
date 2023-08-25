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

#For M* macs set the default platform to linux/amd64 
# export DOCKER_DEFAULT_PLATFORM=linux/amd64



##### Devnet Deployments
echo "Starting devnets..."
MAINNET_DEVNET_RPC_URL=$(tenderly devnet spawn-rpc --project $TENDERLY_PROJECT_SLUG --template $TENDERLY_MAINNET_DEVNET_TEMPLATE --account $TENDERLY_ACCOUNT_ID  --access_key $TENDERLY_ACCESS_KEY 2>&1)
OPTIMISM_DEVNET_RPC_URL=$(tenderly devnet spawn-rpc --project $TENDERLY_PROJECT_SLUG --template $TENDERLY_OPTIMISM_DEVNET_TEMPLATE --account $TENDERLY_ACCOUNT_ID  --access_key $TENDERLY_ACCESS_KEY 2>&1)
GNOSIS_DEVNET_RPC_URL=$(tenderly devnet spawn-rpc --project $TENDERLY_PROJECT_SLUG --template $TENDERLY_GNOSIS_DEVNET_TEMPLATE --account $TENDERLY_ACCOUNT_ID  --access_key $TENDERLY_ACCESS_KEY 2>&1)
echo "Mainnet devnet rpc url: $MAINNET_DEVNET_RPC_URL"
echo "Optimism devnet rpc url: $OPTIMISM_DEVNET_RPC_URL"
echo "Gnosis devnet rpc url: $GNOSIS_DEVNET_RPC_URL"
export MAINNET_DEVNET_RPC_URL
export OPTIMISM_DEVNET_RPC_URL
export GNOSIS_DEVNET_RPC_URL

#####

##### Create config files from the templates.
mainnet_rpcs=("$MAINNET_DEVNET_RPC_URL")
optimism_rpcs=("$OPTIMISM_DEVNET_RPC_URL")
gnosis_rpcs=("$GNOSIS_DEVNET_RPC_URL")

chains_mainnet=$(jq -n --argjson providers "$(printf '%s\n' "${mainnet_rpcs[@]}" | jq -R . | jq -s .)" '{"providers": $providers}')
chains_optimism=$(jq -n --argjson providers "$(printf '%s\n' "${optimism_rpcs[@]}" | jq -R . | jq -s .)" '{"providers": $providers}')
chains_gnosis=$(jq -n --argjson providers "$(printf '%s\n' "${gnosis_rpcs[@]}" | jq -R . | jq -s .)" '{"providers": $providers}')

echo "mainnet: $chains_mainnet" 
echo "optimism: $chains_optimism"
echo "gnosis: $chains_gnosis"

chains_json=$(jq -n \
     --argjson chains_mainnet "$chains_mainnet" \
     --argjson chains_optimism "$chains_optimism" \
     --argjson chains_gnosis "$chains_gnosis" \
     '{"1": $chains_mainnet, "10": $chains_optimism, "100": $chains_gnosis}'
     )

echo "chains: $chains_json"
# Add docker paths to replace/add `chains` in config.json
config_dir_paths=("docker/cartographer" "docker/lighthhouse" "docker/router" "docker/sequencer" "docker/relayer" "docker/watcher")
template_file="config-template.json"

for dir_path in "${config_dir_paths[@]}"; do
    echo "Finding $template_file in $dir_path"
    template_file_path="$dir_path/$template_file"

    # Check if the config file exists
    if [ -f "$template_file_path" ]; then
        target_file_path="${dir_path}/config.json"
        # Use jq to load the JSON file, add elements, and save the modified content
        jq ". + { "chains": $chains_json }" "$template_file_path" > "$target_file_path"
    else
        echo "$template_file_path not found"
    fi
done
#####

##### IPFS, postgres, graph nodes.
echo "Starting ipfs, postgres and graph-node..."
docker compose -f docker-compose.devnets.yaml up -d --force-recreate
sleep 5
#####

# ##### Delete previous devnet deployment records if they exist.
# rm -rf -- packages/deployments/contracts/deployments/tenderly-mainnet
# rm -rf -- packages/deployments/contracts/deployments/tenderly-optimism
# rm -rf -- packages/deployments/contracts/deployments/tenderly-gnosis
# #####

# ##### Contract Deployments
# echo "Deploying contracts to the devnet"
# yarn workspace @connext/smart-contracts devnet:deploy --network all
# echo "Deployed contracts to the devnet"

# echo "Initializing contracts - devnet"
# yarn workspace @connext/smart-contracts devnet:init --network all
# echo "Initialized contracts - devnet"
# #####

##### Subgraph Deployments
echo "Building subgraph for the hub chain - mainnet-devnet..."
yarn workspace @connext/nxtp-subgraph prepare:devnet:amarok-hub-v0
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph for the hub chain"

echo "Deploying subgraph to the hub chain - mainnet-devnet..."
yarn workspace @connext/nxtp-subgraph create:hub_devnet_mainnet --node http://localhost:8020/
yarn workspace @connext/nxtp-subgraph deploy:hub_devnet_mainnet --node http://localhost:8020/ -l v0.0.1
echo "Deployed subgraph to the hub chain - mainnet-devnet"

echo "Building subgraph for the spoke chain - optimism-devnet"
yarn workspace @connext/nxtp-subgraph prepare:devnet:amarok-runtime-v0 optimism
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph for the spoke chain - optimism-devnet"

echo "Deploying subgraph to the spoke chain - optimism-devnet..."
yarn workspace @connext/nxtp-subgraph create:devnet_v0_optimism --node http://localhost:9020/
yarn workspace @connext/nxtp-subgraph deploy:devnet_v0_optimism --node http://localhost:9020/ -l v0.0.1
echo "Deployed subgraphs to the optimism-devnet"

echo "Building subgraph for the spoke chain - gnosis-devnet"
yarn workspace @connext/nxtp-subgraph prepare:devnet:amarok-runtime-v0 gnosis
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph for the spoke chain - gnosis-devnet"

echo "Deploying subgraph to the hub chain - gnosis-devnet..."
yarn workspace @connext/nxtp-subgraph create:devnet_v0_gnosis --node http://localhost:7020/
yarn workspace @connext/nxtp-subgraph deploy:devnet_v0_gnosis --node http://localhost:7020/ -l v0.0.1
echo "Deployed subgraph to the gnosis-devnet"
#####

##### Off-Chain Agents
echo "Starting services and off-chain agents..."
docker compose -f docker-compose.devnet-services.yaml up -d --force-recreate
sleep 5
#####

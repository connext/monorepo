#!/bin/bash

network="${NETWORK:-testnets}"
deployment="${DEPLOYMENT:-staging}"

# Validation
if [ "${deployment}" != "staging" ] && [ "${deployment}" != "prod" ]
then
  echo "Deployment must be 'prod' or 'staging'"
fi

echo "Deploying $deployment to $network..."

if [ "$network" = "testnets" ]
then
  chains=("ropsten" "rinkeby" "goerli" "kovan" "chapel" "mumbai", "arbitrum-rinkeby", "fuji")
elif [ "$network" = "mainnets" ]
then
  chains=("xdai" "bsc" "fantom" "matic" "arbitrum-one" "avalanche" "mainnet")
else
  echo "Network must be 'testnets' or 'mainnets'"
  exit 1
fi

for chain in ${chains[*]}
do
  echo "Deploying to $chain"
  yarn workspace @connext/nxtp-subgraph deploy:$chain:$deployment --access-token "$GRAPH_API_KEY"
  echo "Deployed to $chain"
done

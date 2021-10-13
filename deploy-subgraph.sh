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
  echo "Deploying to ropsten"
  yarn workspace @connext/nxtp-subgraph deploy:ropsten:$deployment --access-token "$GRAPH_API_KEY"
  echo "Deployed to ropsten"

  echo "Deploying to rinkeby"
  yarn workspace @connext/nxtp-subgraph deploy:rinkeby:$deployment --access-token "$GRAPH_API_KEY"
  echo "Deployed to rinkeby"

  echo "Deploying to goerli"
  yarn workspace @connext/nxtp-subgraph deploy:goerli:$deployment --access-token "$GRAPH_API_KEY"
  echo "Deployed to goerli"

  echo "Deploying to kovan"
  yarn workspace @connext/nxtp-subgraph deploy:kovan:$deployment --access-token "$GRAPH_API_KEY"
  echo "Deployed to kovan"

  echo "Deploying to chapel"
  yarn workspace @connext/nxtp-subgraph deploy:chapel:$deployment --access-token "$GRAPH_API_KEY"
  echo "Deployed to chapel"

  echo "Deploying to mumbai"
  yarn workspace @connext/nxtp-subgraph deploy:mumbai:$deployment --access-token "$GRAPH_API_KEY"
  echo "Deployed to mumbai"

  echo "Deploying to arbitrum-rinkeby"
  yarn workspace @connext/nxtp-subgraph deploy:arbitrum-rinkeby:$deployment --access-token "$GRAPH_API_KEY"
  echo "Deployed to arbitrum-rinkeby"

  echo "Deploying to fuji"
  yarn workspace @connext/nxtp-subgraph deploy:fuji:$deployment --access-token "$GRAPH_API_KEY"
  echo "Deployed to fuji"

elif [ "$network" != "mainnets" ]
then
  echo "Network must be 'testnets' or 'mainnets'"
  exit 1
fi

echo "FIXME: deploy to mainnets"
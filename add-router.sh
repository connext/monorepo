#!/bin/bash

network="${NETWORK:-testnets}"
router="${ROUTER}"
mnemonic="${MNEMONIC}"

# Validation
if [ -z "${router}" ]
then
  echo "Must specify router"
  exit 1;
fi

if [ -z "${mnemonic}" ]
then
  echo "Must specify router"
  exit 1;
fi

echo "Adding $router to $network..."

# Network names must match whats in the packages/contracts/hardhat.config.ts
# to be used correctly.
if [ "$network" = "testnets" ]
then
  chains=("ropsten" "rinkeby" "goerli" "kovan" "chapel" "mumbai" "arbitrum-rinkeby" "fuji" "optimism-kovan" "mbase")
elif [ "$network" = "mainnets" ]
then
  chains=("xdai" "bsc" "ftm" "matic" "arbitrum-one" "avalanche" "mainnet" "moonriver", "optimism")
else
  echo "Network must be 'testnets' or 'mainnets'"
  exit 1
fi

for chain in ${chains[*]}
do
  echo "Adding router to $chain"
  MNEMONIC="${mnemonic}" yarn workspace @connext/nxtp-contracts hardhat add-router --router "${router}" --network "${chain}"
  echo "Added router to $chain"
  echo ""
done

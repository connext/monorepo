#!/bin/bash
echo "Deploying to ropsten"
yarn workspace @connext/nxtp-contracts hardhat deploy --network ropsten
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --network ropsten
echo "Deployed to ropsten"

echo "Deploying to rinkeby"
yarn workspace @connext/nxtp-contracts hardhat deploy --network rinkeby
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --network rinkeby
echo "Deployed to rinkeby"

echo "Deploying to ropsten"
yarn workspace @connext/nxtp-contracts hardhat deploy --network goerli
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --network goerli
echo "Deployed to ropsten"

echo "Deploying to kovan"
yarn workspace @connext/nxtp-contracts hardhat deploy --network kovan
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --network kovan
echo "Deployed to kovan"

echo "Deploying to chapel"
yarn workspace @connext/nxtp-contracts hardhat deploy --network chapel
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --network chapel --api-key "$BSC_ETHERSCAN_API_KEY"
echo "Deployed to chapel"

echo "Deploying to mumbai"
yarn workspace @connext/nxtp-contracts hardhat deploy --network mumbai
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --network mumbai --api-key "$POLYGON_ETHERSCAN_API_KEY"
echo "Deployed to mumbai"

echo "Deploying to arbitrum-rinkeby"
yarn workspace @connext/nxtp-contracts hardhat deploy --network arbitrum-rinkeby
echo "Deployed to arbitrum-rinkeby"

# Needs to be done separetely 
# yarn workspace @connext/nxtp-contracts hardhat deploy --network optimism-kovan

yarn workspace @connext/nxtp-contracts export
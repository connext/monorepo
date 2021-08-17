#!/bin/bash
yarn workspace @connext/nxtp-contracts hardhat deploy --network ropsten
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --network ropsten

yarn workspace @connext/nxtp-contracts hardhat deploy --network rinkeby
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --network rinkeby

yarn workspace @connext/nxtp-contracts hardhat deploy --network goerli
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --network goerli

yarn workspace @connext/nxtp-contracts hardhat deploy --network kovan
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --network chapel

yarn workspace @connext/nxtp-contracts hardhat deploy --network chapel
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --network chapel --api-key "$BSC_ETHERSCAN_API_KEY"

yarn workspace @connext/nxtp-contracts hardhat deploy --network mumbai
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --network mumbai

yarn workspace @connext/nxtp-contracts hardhat deploy --network arbitrum-rinkeby

# Needs to be done separetely 
# yarn workspace @connext/nxtp-contracts hardhat deploy --network optimism-kovan
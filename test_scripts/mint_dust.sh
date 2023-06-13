#!/bin/zsh

# READ
yarn workspace @connext/smart-contracts hardhat read-balances --env "production"  --network arbitrum-goerli
yarn workspace @connext/smart-contracts hardhat read-balances --env "production"  --network optimism-goerli
yarn workspace @connext/smart-contracts hardhat read-balances --env "production"  --network goerli
yarn workspace @connext/smart-contracts hardhat read-balances --env "production"  --network mumbai
yarn workspace @connext/smart-contracts hardhat read-balances --env "production"  --network consensys

# DUST
yarn workspace @connext/smart-contracts hardhat dust --amount 0.5 --network "goerli" --minimum-only true
yarn workspace @connext/smart-contracts hardhat dust --amount 0.5 --network "mumbai" --minimum-only true
yarn workspace @connext/smart-contracts hardhat dust --amount 0.5 --network "consensys" --minimum-only true
yarn workspace @connext/smart-contracts hardhat dust --amount 0.5 --network "arbitrum-goerli" --minimum-only true
yarn workspace @connext/smart-contracts hardhat dust --amount 0.5 --network "optimism-goerli" --minimum-only true


# MINT TEST
yarn workspace @connext/smart-contracts hardhat mint  --amount 100000000 --asset 0xB706319D37b945727E71ae0d4353699d19112576 --network "consensys" --minimum-only true
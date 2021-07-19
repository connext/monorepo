import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "solidity-coverage";

import { HardhatUserConfig } from "hardhat/types";

const urlOverride = process.env.ETH_PROVIDER_URL;
const chainId = parseInt(process.env.CHAIN_ID ?? "1337", 10);

const mnemonic =
  process.env.SUGAR_DADDY ||
  process.env.MNEMONIC ||
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    tests: "./test",
  },
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: { default: 0 },
    alice: { default: 1 },
    bob: { default: 2 },
    rando: { default: 3 },
  },
  networks: {
    localhost: {
      accounts: {
        accountsBalance: "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        mnemonic,
      },
      chainId,
      saveDeployments: false,
      url: urlOverride || "http://localhost:8545",
    },
    mainnet: {
      accounts: { mnemonic },
      chainId: 1,
      url: urlOverride || "http://localhost:8545",
    },
    rinkeby: {
      accounts: { mnemonic },
      chainId: 4,
      url: urlOverride || "http://localhost:8545",
    },
    goerli: {
      accounts: { mnemonic },
      chainId: 5,
      url: urlOverride || "http://localhost:8545",
    },
    kovan: {
      accounts: { mnemonic },
      chainId: 42,
      url: urlOverride || "http://localhost:8545",
    },
    matic: {
      accounts: { mnemonic },
      chainId: 137,
      url: urlOverride || "http://localhost:8545",
    },
    mumbai: {
      accounts: { mnemonic },
      chainId: 80001,
      url: urlOverride || "https://rpc-mumbai.matic.today",
    },
    local_1337: {
      accounts: { mnemonic },
      chainId: 1337,
      url: urlOverride || "http://localhost:8545",
    },
    local_1338: {
      accounts: { mnemonic },
      chainId: 1338,
      url: urlOverride || "http://localhost:8546",
    },
  },
};

export default config;

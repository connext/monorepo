import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "solidity-coverage";

import { config as dotEnvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/types";

import "./src/tasks/addRouter";
import "./src/tasks/addAsset";
import "./src/tasks/addLiquidity";
import "./src/tasks/mintTestToken";
import "./src/tasks/setupTestRouter";
import "./src/tasks/getChainId";
import "./src/tasks/renounceOwnership";

dotEnvConfig();

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
    mainnet: {
      accounts: { mnemonic },
      chainId: 1,
      url: urlOverride || "http://localhost:8545",
    },
    ropsten: {
      accounts: { mnemonic },
      chainId: 3,
      url: urlOverride || process.env.ROPSTEN_ETH_PROVIDER_URL || "http://localhost:8545",
    },
    rinkeby: {
      accounts: { mnemonic },
      chainId: 4,
      url: urlOverride || process.env.RINKEBY_ETH_PROVIDER_URL || "http://localhost:8545",
    },
    goerli: {
      accounts: { mnemonic },
      chainId: 5,
      url: urlOverride || process.env.GOERLI_ETH_PROVIDER_URL || "http://localhost:8545",
    },
    kovan: {
      accounts: { mnemonic },
      chainId: 42,
      url: urlOverride || process.env.KOVAN_ETH_PROVIDER_URL || "http://localhost:8545",
    },
    chapel: {
      accounts: { mnemonic },
      chainId: 97,
      url: "https://data-seed-prebsc-2-s1.binance.org:8545/",
    },
    bsc: {
      accounts: { mnemonic },
      chainId: 56,
      url: urlOverride || process.env.BSC_PROVIDER_URL || "http://localhost:8545",
    },
    matic: {
      accounts: { mnemonic },
      chainId: 137,
      url: urlOverride || process.env.MATIC_PROVIDER_URL || "http://localhost:8545",
    },
    fuji: {
      accounts: { mnemonic },
      chainId: 43113,
      url: "https://api.avax-test.network/ext/bc/C/rpc",
    },
    mbase: {
      accounts: { mnemonic },
      chainId: 1287,
      url: "https://moonbeam-alpha.api.onfinality.io/public",
    },
    mumbai: {
      accounts: { mnemonic },
      chainId: 80001,
      url: "https://rpc-mumbai.matic.today",
    },
    "arbitrum-rinkeby": {
      accounts: { mnemonic },
      chainId: 421611,
      url: urlOverride || process.env.ARB_RINK_ETH_PROVIDER_URL || "https://rinkeby.arbitrum.io/rpc",
    },
    ftm: {
      accounts: { mnemonic },
      chainId: 250,
      url: urlOverride || process.env.FTM_PROVIDER_URL || "https://rpcapi.fantom.network/",
    },
    xdai: {
      accounts: { mnemonic },
      chainId: 100,
      url: urlOverride || process.env.XDAI_PROVIDER_URL || "https://rpc.xdaichain.com/",
    },
  },
};

export default config;

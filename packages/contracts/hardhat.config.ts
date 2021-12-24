import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "solidity-coverage";
import "@tenderly/hardhat-tenderly";
import "@nomiclabs/hardhat-etherscan";

import { config as dotEnvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/types";

import "./src/tasks/addRouter";
import "./src/tasks/addAsset";
import "./src/tasks/createRouter";
import "./src/tasks/addLiquidity";
import "./src/tasks/mintTestToken";
import "./src/tasks/setupTestRouter";
import "./src/tasks/getChainId";
import "./src/tasks/renounceOwnership";
import "./src/tasks/proposeTransferOwnership";
import "./src/tasks/setAggregator";
import "./src/tasks/setDexPrice";
import "./src/tasks/setDirectPrice";
import "./src/tasks/decodeInputData";
import "./src/tasks/removeRouter";

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
      url: urlOverride || process.env.ETH_PROVIDER_URL || "https://cloudflare-eth.com",
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
    optimism: {
      accounts: { mnemonic },
      chainId: 10,
      url: "https://mainnet.optimism.io",
    },
    kovan: {
      accounts: { mnemonic },
      chainId: 42,
      url: urlOverride || process.env.KOVAN_ETH_PROVIDER_URL || "http://localhost:8545",
    },
    "optimism-kovan": {
      accounts: { mnemonic },
      chainId: 69,
      url: "https://kovan.optimism.io",
    },
    bsc: {
      accounts: { mnemonic },
      chainId: 56,
      url: urlOverride || process.env.BSC_PROVIDER_URL || "https://bsc-dataseed.binance.org/",
    },
    chapel: {
      accounts: { mnemonic },
      chainId: 97,
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    },
    xdai: {
      accounts: { mnemonic },
      chainId: 100,
      url: urlOverride || process.env.XDAI_PROVIDER_URL || "https://xdai.poanetwork.dev/",
    },
    fuse: {
      accounts: { mnemonic },
      chainId: 122,
      url: "https://rpc.fuse.io/",
    },
    matic: {
      accounts: { mnemonic },
      chainId: 137,
      url: urlOverride || process.env.MATIC_PROVIDER_URL || "https://polygon-rpc.com",
    },
    ftm: {
      accounts: { mnemonic },
      chainId: 250,
      url: urlOverride || process.env.FTM_PROVIDER_URL || "https://rpcapi.fantom.network/",
    },
    moonriver: {
      accounts: { mnemonic },
      chainId: 1285,
      url: "https://rpc.moonriver.moonbeam.network",
      gasPrice: 5000000000,
    },
    mbase: {
      accounts: { mnemonic },
      chainId: 1287,
      url: "https://moonbeam-alpha.api.onfinality.io/public",
    },
    "arbitrum-one": {
      accounts: { mnemonic },
      chainId: 42161,
      url: "https://arb1.arbitrum.io/rpc",
    },
    fuji: {
      accounts: { mnemonic },
      chainId: 43113,
      url: "https://api.avax-test.network/ext/bc/C/rpc",
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: { mnemonic },
    },
    mumbai: {
      accounts: { mnemonic },
      chainId: 80001,
      url: "https://matic-testnet-archive-rpc.bwarelabs.com",
    },
    "arbitrum-rinkeby": {
      accounts: { mnemonic },
      chainId: 421611,
      url: urlOverride || process.env.ARB_RINK_ETH_PROVIDER_URL || "https://rinkeby.arbitrum.io/rpc",
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;

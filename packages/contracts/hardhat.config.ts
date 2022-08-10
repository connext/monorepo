import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "solidity-coverage";
import "@tenderly/hardhat-tenderly";
import "@nomiclabs/hardhat-etherscan";
import path from "path";

import { config as dotEnvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/types";
import { TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD } from "hardhat/builtin-tasks/task-names";
import { subtask } from "hardhat/config";
import { Wallet } from "ethers";

import "./src/tasks/addRouter";
import "./src/tasks/addAsset";
import "./src/tasks/createRouter";
import "./src/tasks/removeRelayerFee";
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

const getAccounts = (_mnemonic: string) =>
  Array(4)
    .fill(0)
    .map((_, index) => {
      return Wallet.fromMnemonic(_mnemonic, `m/44'/60'/0'/0/${index}`).privateKey;
    });

const routerFactoryAccount = process.env.MNEMONIC_ROUTER_FACTORY
  ? [Wallet.fromMnemonic(process.env.MNEMONIC_ROUTER_FACTORY).privateKey]
  : [];

const accounts = getAccounts(mnemonic).concat(routerFactoryAccount);

const testnetAccounts = process.env.MNEMONIC_TESTNET
  ? getAccounts(process.env.MNEMONIC_TESTNET).concat(routerFactoryAccount)
  : accounts;

subtask(TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD, async (args: any, hre, runSuper) => {
  if (args.solcVersion === "0.8.4") {
    const compilerPath = path.join(__dirname, "soljson.js");

    return {
      compilerPath,
      isSolcJs: true, // if you are using a native compiler, set this to false
      version: args.solcVersion,
      // this is used as extra information in the build-info files, but other than
      // that is not important
      longVersion: "0.8.4",
    };
  }

  // we just use the default subtask if the version is not 0.8.5
  return runSuper();
});

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
    routerfactory: {
      default: process.env.MNEMONIC_ROUTER_FACTORY ? "0xFD8c6Ebe0D284f9D2C9665f17BbA47032259E907" : 4,
    },
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
      accounts,
      chainId: 1,
      url: urlOverride || process.env.MAINNET_ETH_PROVIDER_URL || "https://cloudflare-eth.com",
    },
    ropsten: {
      accounts,
      chainId: 3,
      url: urlOverride || process.env.ROPSTEN_ETH_PROVIDER_URL || "http://localhost:8545",
    },
    rinkeby: {
      accounts,
      chainId: 4,
      url: urlOverride || process.env.RINKEBY_ETH_PROVIDER_URL || "http://localhost:8545",
    },
    goerli: {
      accounts,
      chainId: 5,
      url: urlOverride || process.env.GOERLI_ETH_PROVIDER_URL || "http://localhost:8545",
    },
    optimism: {
      accounts,
      chainId: 10,
      url: "https://mainnet.optimism.io",
    },
    cronos: {
      accounts,
      chainId: 25,
      url: "https://evm.cronos.org/",
      gasPrice: 5000000000000,
    },
    kovan: {
      accounts,
      chainId: 42,
      url: urlOverride || process.env.KOVAN_ETH_PROVIDER_URL || "http://localhost:8545",
    },
    "optimism-kovan": {
      accounts,
      chainId: 69,
      url: "https://kovan.optimism.io",
    },
    bsc: {
      accounts,
      chainId: 56,
      url: urlOverride || process.env.BSC_PROVIDER_URL || "https://bsc-dataseed.binance.org/",
    },
    chapel: {
      accounts,
      chainId: 97,
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    },
    xdai: {
      accounts,
      chainId: 100,
      url: urlOverride || process.env.XDAI_PROVIDER_URL || "https://rpc.ankr.com/gnosis",
    },
    fuse: {
      accounts,
      chainId: 122,
      url: "https://rpc.fuse.io/",
    },
    matic: {
      accounts,
      chainId: 137,
      url: urlOverride || process.env.MATIC_PROVIDER_URL || "https://polygon-rpc.com",
    },
    ftm: {
      accounts,
      chainId: 250,
      url: urlOverride || process.env.FTM_PROVIDER_URL || "https://rpcapi.fantom.network/",
    },
    boba: {
      accounts,
      chainId: 288,
      url: "https://mainnet.boba.network/",
    },
    moonriver: {
      accounts,
      chainId: 1285,
      url: "https://rpc.moonriver.moonbeam.network",
      gasPrice: 5000000000,
    },
    moonbeam: {
      accounts,
      chainId: 1284,
      url: "https://rpc.api.moonbeam.network",
    },
    mbase: {
      accounts,
      chainId: 1287,
      url: "https://moonbeam-alpha.api.onfinality.io/public",
    },
    "milkomeda-cardano": {
      accounts,
      chainId: 2001,
      url: "https://rpc.c1.milkomeda.com:8545",
    },
    "kava-alphanet": {
      accounts: testnetAccounts,
      chainId: 2221,
      url: "https://evm.evm-alpha.kava.io",
    },
    evmos: {
      accounts,
      chainId: 9001,
      url: "https://eth.bd.evmos.org:8545",
    },
    "arbitrum-one": {
      accounts,
      chainId: 42161,
      url: "https://arb1.arbitrum.io/rpc",
    },
    "arbitrum-nova": {
      accounts,
      chainId: 42170,
      url: "https://nova.arbitrum.io/rpc",
    },
    fuji: {
      accounts,
      chainId: 43113,
      url: "https://api.avax-test.network/ext/bc/C/rpc",
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts,
    },
    mumbai: {
      accounts,
      chainId: 80001,
      url: "https://matic-testnet-archive-rpc.bwarelabs.com",
    },
    "arbitrum-rinkeby": {
      accounts,
      chainId: 421611,
      url: urlOverride || process.env.ARB_RINK_ETH_PROVIDER_URL || "https://rinkeby.arbitrum.io/rpc",
    },
    gather: {
      accounts,
      chainId: 192837465,
      url: urlOverride || process.env.GATHER_PROVIDER_URL || "https://mainnet.gather.network/",
    },
    harmonyone: {
      accounts,
      chainId: 1666600000,
      url: "https://api.harmony.one",
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;

import { config as envConfig } from "dotenv";
import { utils } from "ethers";

envConfig();
const urlOverride = process.env.ETH_PROVIDER_URL;
const chainId = parseInt(process.env.CHAIN_ID ?? "1337", 10);

const mnemonic =
  process.env.SUGAR_DADDY ||
  process.env.MNEMONIC ||
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

const mainnetMnemonic = process.env.MAINNET_MNEMONIC;

export const hardhatNetworks = {
  hardhat: {
    allowUnlimitedContractSize: true,
  },
  localhost: {
    accounts: {
      accountsBalance: "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      mnemonic,
    },
    chainId,
    saveDeployments: false,
    url: urlOverride || "http://localhost:8545",
    allowUnlimitedContractSize: true,
  },
  local_1337: {
    accounts: { mnemonic },
    chainId: 1337,
    url: "http://localhost:8547",
    saveDeployments: true,
    allowUnlimitedContractSize: true,
  },
  local_1338: {
    accounts: { mnemonic },
    chainId: 1338,
    url: "http://localhost:8546",
    saveDeployments: true,
    allowUnlimitedContractSize: true,
    companionNetworks: {
      hub: "local_1337",
    },
  },
  mainnet: {
    accounts: { mnemonic },
    chainId: 1,
    url: urlOverride || process.env.MAINNET_ETH_PROVIDER_URL || "https://cloudflare-eth.com",
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
    gasPrice: utils.parseUnits("20", "gwei").toNumber(),
  },
  goerli: {
    accounts: { mnemonic },
    chainId: 5,
    url: urlOverride || process.env.GOERLI_ETH_PROVIDER_URL || "http://localhost:8545",
  },
  optimism: {
    accounts: { mnemonic },
    chainId: 10,
    url: "https://rpc.ankr.com/optimism",
    companionNetworks: {
      hub: "mainnet",
    },
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
    companionNetworks: {
      hub: "kovan",
    },
  },
  "optimism-goerli": {
    accounts: { mnemonic },
    chainId: 420,
    url:
      urlOverride ||
      process.env.OPTI_GOERLI_ETH_PROVIDER_URL ||
      "https://optimism-goerli.infura.io/v3/7672e2bf7cbe427e8cd25b0f1dde65cf",
    companionNetworks: {
      hub: "goerli",
    },
    verify: {
      etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY!,
        apiUrl: "https://blockscout.com/optimism/goerli",
      },
    },
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
    companionNetworks: {
      hub: "goerli",
    },
  },
  xdai: {
    accounts: { mnemonic },
    chainId: 100,
    companionNetworks: {
      hub: "mainnet",
    },
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
    companionNetworks: {
      hub: "mainnet",
    },
    gasPrice: utils.parseUnits("200", "gwei").toNumber(),
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
  moonbeam: {
    accounts: { mnemonic: mainnetMnemonic ?? mnemonic },
    chainId: 1284,
    url: "https://rpc.api.moonbeam.network",
  },
  mbase: {
    accounts: { mnemonic },
    chainId: 1287,
    url: "https://moonbeam-alpha.api.onfinality.io/public",
  },
  evmos: {
    accounts: { mnemonic: mainnetMnemonic ?? mnemonic },
    chainId: 9001,
    url: "https://eth.bd.evmos.org:8545",
  },
  "evmos-testnet": {
    accounts: { mnemonic },
    chainId: 9000,
    url: "https://eth.bd.evmos.dev:8545",
  },
  "arbitrum-one": {
    accounts: { mnemonic },
    chainId: 42161,
    url: "https://arb1.arbitrum.io/rpc",
    companionNetworks: {
      hub: "mainnet",
    },
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
    url: "https://rpc.ankr.com/polygon_mumbai",
    companionNetworks: {
      hub: "goerli",
    },
  },
  "arbitrum-rinkeby": {
    accounts: { mnemonic },
    chainId: 421611,
    url: urlOverride || process.env.ARB_RINK_ETH_PROVIDER_URL || "https://rinkeby.arbitrum.io/rpc",
  },
  "arbitrum-goerli": {
    accounts: { mnemonic },
    chainId: 421613,
    url:
      urlOverride ||
      process.env.ARBITRUM_GOERLI_ETH_PROVIDER_URL ||
      "https://arbitrum-goerli.infura.io/v3/7672e2bf7cbe427e8cd25b0f1dde65cf",
    companionNetworks: {
      hub: "goerli",
    },
    verify: {
      etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY!,
        apiUrl: "https://goerli-rollup-explorer.arbitrum.io",
      },
    },
  },
  "gnosis-testnet": {
    accounts: { mnemonic },
    chainId: 10200,
    url: urlOverride || process.env.GNOSIS_TESTNET_PROVIDER_URL || "https://rpc.chiadochain.net",
    companionNetworks: {
      hub: "goerli",
    },
    verify: {
      etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY!,
        apiUrl: "https://blockscout.chiadochain.net/api",
      },
    },
  },
};

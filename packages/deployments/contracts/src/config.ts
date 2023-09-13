import { utils } from "ethers";
import { config as dotenvConfig } from "dotenv";
import { NetworkUserConfig } from "hardhat/types";

dotenvConfig();

export const SUPPORTED_CHAINS = {
  mainnet: [1, 10, 56, 100, 137, 42161],
  testnet: [5, 280, 420, 59140, 80001, 421613],
};

const urlOverride = process.env.ETH_PROVIDER_URL;
const chainId = parseInt(process.env.CHAIN_ID ?? "1337", 10);
const network = process.env.NETWORK ?? "testnet";
const env = process.env.ENV ?? "staging";

const mnemonic =
  process.env.SUGAR_DADDY ||
  process.env.MNEMONIC ||
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

const mainnetMnemonic = process.env.MAINNET_MNEMONIC;

export const getForkPort = (network: "testnet" | "mainnet", chainId: number) => {
  // ensure each chain has a unique port based on position in [...mainnet, ...testnet]
  const shift = network === "mainnet" ? 0 : SUPPORTED_CHAINS["mainnet"].length;
  const idx = SUPPORTED_CHAINS[network].indexOf(chainId);
  if (idx < -1) {
    throw new Error(`Invalid chainId: ${chainId} for network: ${network}`);
  }
  return 8545 + idx + shift;
};

export const getNetworkForkName = (chainId: number) => {
  return `${chainId}_${env}_fork`;
};

export const hardhatForkNetworks: Record<string, NetworkUserConfig> = {};
Object.values(SUPPORTED_CHAINS).forEach((chains) => {
  chains.forEach((chain) => {
    hardhatForkNetworks[getNetworkForkName(chain)] = {
      accounts: { mnemonic },
      chainId: chain,
      url: `http://127.0.0.1:${getForkPort(network as "mainnet" | "testnet", chain)}`,
    };
  });
});

export const hardhatNetworks = {
  ...hardhatForkNetworks,
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
  "tenderly-mainnet": {
    accounts: { mnemonic },
    chainId: 1,
    url: process.env.MAINNET_DEVNET_RPC_URL,
  },
  "tenderly-optimism": {
    accounts: { mnemonic },
    chainId: 10,
    url: process.env.OPTIMISM_DEVNET_RPC_URL,
    companionNetworks: {
      hub: "tenderly-mainnet",
    },
  },
  "tenderly-gnosis": {
    accounts: { mnemonic },
    chainId: 100,
    url: process.env.GNOSIS_DEVNET_RPC_URL,
    companionNetworks: {
      hub: "tenderly-mainnet",
    },
  },
  mainnet: {
    accounts: { mnemonic: mainnetMnemonic ?? mnemonic },
    chainId: 1,
    url: urlOverride || process.env.MAINNET_ETH_PROVIDER_URL || "https://cloudflare-eth.com",
    // gasPrice: utils.parseUnits("15", "gwei").toNumber(),
  },
  goerli: {
    accounts: { mnemonic },
    chainId: 5,
    url:
      urlOverride ||
      process.env.GOERLI_ETH_PROVIDER_URL ||
      "https://goerli.infura.io/v3/7672e2bf7cbe427e8cd25b0f1dde65cf",
    // gasPrice: utils.parseUnits("50", "gwei").toNumber(),
  },
  optimism: {
    accounts: { mnemonic: mainnetMnemonic ?? mnemonic },
    chainId: 10,
    url: urlOverride || process.env.OPTIMISM_MAINNET_PROVIDER_URL || "https://mainnet.optimism.io",
    companionNetworks: {
      hub: "mainnet",
    },
    verify: {
      etherscan: {
        apiKey: process.env.OPTIMISM_ETHERSCAN_API_KEY!,
        apiUrl: "https://api-optimistic.etherscan.io/",
      },
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
        apiKey: process.env.OPTIMISM_ETHERSCAN_API_KEY!,
        apiUrl: "https://api-goerli-optimistic.etherscan.io/",
      },
    },
  },
  bnb: {
    accounts: { mnemonic: mainnetMnemonic ?? mnemonic },
    chainId: 56,
    url: urlOverride || process.env.BNB_PROVIDER_URL || "https://bsc-dataseed.binance.org/",
    companionNetworks: {
      hub: "mainnet",
    },
    verify: {
      etherscan: {
        apiKey: process.env.BNBSCAN_API_KEY!,
      },
    },
  },
  chapel: {
    accounts: { mnemonic },
    chainId: 97,
    url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    companionNetworks: {
      hub: "goerli",
    },
    verify: {
      etherscan: {
        apiKey: process.env.BNBSCAN_API_KEY!,
      },
    },
  },
  xdai: {
    accounts: { mnemonic: mainnetMnemonic ?? mnemonic },
    chainId: 100,
    companionNetworks: {
      hub: "mainnet",
    },
    url: urlOverride || process.env.XDAI_PROVIDER_URL || "https://rpc.ankr.com/gnosis",
    verify: {
      etherscan: {
        apiKey: process.env.GNOSISSCAN_API_KEY!,
        apiUrl: "https://api.gnosisscan.io",
      },
    },
  },
  matic: {
    accounts: { mnemonic: mainnetMnemonic ?? mnemonic },
    chainId: 137,
    url: urlOverride || process.env.MATIC_PROVIDER_URL || "https://rpc.ankr.com/polygon",
    companionNetworks: {
      hub: "mainnet",
    },
    gasPrice: utils.parseUnits("200", "gwei").toNumber(),
    verify: {
      etherscan: {
        apiKey: process.env.POLYGONSCAN_API_KEY!,
      },
    },
  },
  ftm: {
    accounts: { mnemonic: mainnetMnemonic ?? mnemonic },
    chainId: 250,
    url: urlOverride || process.env.FTM_PROVIDER_URL || "https://rpcapi.fantom.network/",
  },
  "arbitrum-one": {
    accounts: { mnemonic: mainnetMnemonic ?? mnemonic },
    chainId: 42161,
    url: urlOverride || process.env.ARB1_PROVIDER_URL || "https://arb1.arbitrum.io/rpc",
    companionNetworks: {
      hub: "mainnet",
    },
    etherscan: {
      apiKey: process.env.ARBISCAN_API_KEY!,
      apiUrl: "https://api.arbiscan.io/",
    },
  },
  mumbai: {
    accounts: { mnemonic },
    chainId: 80001,
    url:
      urlOverride ||
      process.env.POLYGON_MUMBAI_PROVIDER_URL ||
      "https://polygon-mumbai.infura.io/v3/7672e2bf7cbe427e8cd25b0f1dde65cf",
    companionNetworks: {
      hub: "goerli",
    },
    verify: {
      etherscan: {
        apiKey: process.env.POLYGONSCAN_API_KEY!,
      },
    },
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
        apiKey: process.env.ARBISCAN_API_KEY!,
        apiUrl: "https://api-goerli.arbiscan.io/",
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
        apiUrl: "https://blockscout.chiadochain.net",
      },
    },
  },
  "polygonzk-testnet": {
    accounts: { mnemonic },
    chainId: 1442,
    url: urlOverride || process.env.POLYGONZK_TESTNET_PROVIDER_URL || "https://rpc.public.zkevm-test.net",
    companionNetworks: {
      hub: "goerli",
    },
    verify: {
      etherscan: {
        apiKey: process.env.POLYGONZKSCAN_API_KEY!,
        apiUrl: "https://api-testnet-zkevm.polygonscan.com",
      },
    },
  },
  "zksync2-testnet": {
    accounts: { mnemonic },
    chainId: 280,
    url: process.env.ZKSYNC2_TESTNET_PROVIDER_URL || "https://zksync2-testnet.zksync.dev",
    companionNetworks: {
      hub: "goerli",
    },
    zksync: true,
    ethNetwork: "goerli",
    verifyURL: "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
    verify: {
      etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY!,
        apiUrl: "https://zksync2-testnet.zkscan.io",
      },
    },
  },
  consensys: {
    accounts: { mnemonic },
    chainId: 59140,
    // gasPrice: utils.parseUnits("15", "gwei").toNumber(),
    url: urlOverride || process.env.CONSENSYS_PROVIDER_URL || "https://consensys-zkevm-goerli-prealpha.infura.io/v3/",
    companionNetworks: {
      hub: "goerli",
    },
  },
};

import { config as envConfig } from "dotenv";
import "hardhat-diamond-abi";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "solidity-coverage";
import "@tenderly/hardhat-tenderly";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import { HardhatUserConfig } from "hardhat/types";
import { utils } from "ethers";

import "./tasks/setupRouter";
import "./tasks/setupAsset";
import "./tasks/addLiquidity";
import "./tasks/mintTestToken";
import "./tasks/setupTestRouter";
import "./tasks/renounceOwnership";
import "./tasks/proposeTransferOwnership";
import "./tasks/setAggregator";
import "./tasks/setDexPrice";
import "./tasks/setDirectPrice";
import "./tasks/debugCustomError";
import "./tasks/decodeInputData";
import "./tasks/removeRouter";
import "./tasks/enrollHandlers";
import "./tasks/enrollCustom";
import "./tasks/dustSelfAccounts";
import "./tasks/xcall";
import "./tasks/readBalances";
import "./tasks/setLocalDomain";
import "./tasks/traceMessage";
import "./tasks/preflight";
import "./tasks/addRelayer";
import "./tasks/executeEstimateGas";
import "./tasks/exportAbi";
import "./tasks/stableswap/initializeSwap";
import "./tasks/stableswap/addSwapLiquidity";
import "./tasks/stableswap/removeSwapLiquidity";
import "./tasks/stableswap/setSwapFees";
import "./tasks/connector/send";
import "./tasks/rootmanager/propagate";
import "./tasks/setMirrorConnectors";
import "./tasks/addConnextions";
import "./tasks/setBridgeRouter";
import "./tasks/addSequencer";
import "./tasks/setXAppConnectionManager";
import "./tasks/queryRoots";
import "./tasks/submitExitProof";
import "./tasks/addConnectors";
import "./tasks/connector/proveAndProcess";
import "./tasks/addSender";

envConfig();
const urlOverride = process.env.ETH_PROVIDER_URL;
const chainId = parseInt(process.env.CHAIN_ID ?? "1337", 10);

const mnemonic =
  process.env.SUGAR_DADDY ||
  process.env.MNEMONIC ||
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

const mainnetMnemonic = process.env.MAINNET_MNEMONIC;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.15",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.6", // for @suma-tx/memview-sol
        settings: {},
      },
    ],
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
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY!,
      kovan: process.env.ETHERSCAN_API_KEY!,
      mainnet: process.env.ETHERSCAN_API_KEY!,
      ropsten: process.env.ETHERSCAN_API_KEY!,
      goerli: process.env.ETHERSCAN_API_KEY!,
      "optimism-goerli": process.env.ETHERSCAN_API_KEY!,
      mumbai: process.env.POLYGONSCAN_API_KEY!,
    },
    customChains: [
      {
        network: "optimism-goerli",
        chainId: 420,
        urls: {
          apiURL: "https://blockscout.com/optimism/goerli/api",
          browserURL: "https://blockscout.com/optimism/goerli",
        },
      },
    ],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS == "true",
  },
  diamondAbi: {
    // (required) The name of your Diamond ABI.
    name: "ConnextHandler",
    // (optional) An array of strings, matched against fully qualified contract names, to
    // determine which contracts are included in your Diamond ABI.
    include: [
      "AssetFacet",
      "BaseConnextFacet",
      "BridgeFacet",
      "DiamondCutFacet",
      "DiamondLoupeFacet",
      "NomadFacet",
      "ProposedOwnableFacet",
      "RelayerFacet",
      "RoutersFacet",
      "StableSwapFacet",
      "PortalFacet",
    ],
    strict: false,
    filter: function (abiElement, index, fullAbi, fullyQualifiedName) {
      const contractName = fullyQualifiedName.split(":")[1];
      if (abiElement.type === "error" && abiElement.name.includes("Facet") && !abiElement.name.includes(contractName)) {
        return false;
      }

      return true;
    },
  },
  typechain: {
    outDir: "src/typechain-types",
  },
  abiExporter: {
    path: "./abi",
    runOnCompile: true,
    clear: true,
    spacing: 2,
    pretty: true,
  },
};

export default config;

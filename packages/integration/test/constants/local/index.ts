import { Wallet } from "ethers";

// Used in polling loops.
export const SUBG_POLL_PARITY = 5_000;

export const DEPLOYER_WALLET = Wallet.fromMnemonic(
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
);
export const USER_WALLET = Wallet.fromMnemonic(
  "define various win open delay annual edge wait embark fire brain novel",
);

export const PARAMETERS = {
  ENVIRONMENT: "production",
  AGENTS: {
    ROUTER: {
      address: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    },
    SEQUENCER: {
      address: "0xf17f52151EbEF6C7334FAD080c5704D77216b732",
    },
    RELAYER: { address: "0xc5842D5870622B406a71eeC1EcB2Df01D9dF5C28" },
    CARTOGRAPHER: {
      url: "http://localhost:3000",
    },
    USER: {
      address: USER_WALLET.address,
      signer: USER_WALLET,
    },
    DEPLOYER: {
      address: DEPLOYER_WALLET.address,
      signer: DEPLOYER_WALLET,
    },
  },
  A: {
    DOMAIN: "1337",
    CHAIN: 1337,
    RPC: ["http://localhost:8547"],
    DEPLOYMENTS: null, // Must be set at runtime!
  },
  B: {
    DOMAIN: "1338",
    CHAIN: 1338,
    RPC: ["http://localhost:8546"],
    DEPLOYMENTS: null, // Must be set at runtime!
  },
};

export const AmbDeployments = {
  RootManager: {
    domain: "1337",
    address: "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0",
    l1connectors: {
      A: {
        domain: "1337",
        name: "MainnetL1Connector",
        address: "0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da",
      },
      B: {
        domain: "1338",
        name: "OptimismL1Connector",
        address: "0xf25186B5081Ff5cE73482AD761DB0eB0d25abfBF",
      },
    },
  },
  Connectors: {
    A: {
      domain: "1337",
      type: "l1",
      name: "MainnetL1Connector",
      address: "0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da",
    },
    B: {
      domain: "1338",
      type: "l2",
      name: "OptimismL2Connector",
      address: "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0",
    },
  },
};

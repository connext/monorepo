import { Wallet } from "ethers";

// Used in polling loops.
export const SUBG_POLL_PARITY = 5_000;

export const DEPLOYER_WALLET = Wallet.fromMnemonic(
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
);
export const USER_WALLET = Wallet.fromMnemonic(
  "define various win open delay annual edge wait embark fire brain novel",
);
export const ROUTER_WALLET = new Wallet("0xc88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c");

export const PARAMETERS = {
  ENVIRONMENT: "production",
  AGENTS: {
    ROUTER: {
      address: "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544",
    },
    SEQUENCER: {
      address: "0xf17f52151EbEF6C7334FAD080c5704D77216b732",
    },
    RELAYER: { address: "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef" },
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
    DOMAIN: "31338",
    CHAIN: 31338,
    RPC: ["http://localhost:8548"],
    DEPLOYMENTS: null, // Must be set at runtime!
  },
  B: {
    DOMAIN: "31339",
    CHAIN: 31339,
    RPC: ["http://localhost:8549"],
    DEPLOYMENTS: null, // Must be set at runtime!
  },
};

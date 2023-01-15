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
    DOMAIN: "133712",
    CHAIN: 1337,
    RPC: ["http://localhost:8547"],
    DEPLOYMENTS: null, // Must be set at runtime!
  },
  B: {
    DOMAIN: "133812",
    CHAIN: 1338,
    RPC: ["http://localhost:8546"],
    DEPLOYMENTS: null, // Must be set at runtime!
  },
};

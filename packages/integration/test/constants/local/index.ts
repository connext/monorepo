import { Wallet } from "ethers";

// Used in polling loops.
export const SUBG_POLL_PARITY = 5_000;

export const DEPLOYER_WALLET = Wallet.fromMnemonic(
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
);
export const USER_WALLET = Wallet.fromMnemonic(Wallet.createRandom()._mnemonic().phrase);
// export const USER_WALLET = Wallet.createRandom();

export const PARAMETERS = {
  ENVIRONMENT: "production",
  AGENTS: {
    ROUTER: {
      address: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    },
    RELAYER: { address: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57" },
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
  ASSET: {
    address: "0x1411CB266FCEd1587b0AA29E9d5a9Ef3Db64A9C5",
    name: "TEST",
    symbol: "TEST",
  },
  A: {
    DOMAIN: "1337",
    CHAIN: 1337,
    RPC: ["http://localhost:8547"],
    DEPLOYMENTS: {
      ConnextHandler: "0xF08dF3eFDD854FEDE77Ed3b2E515090EEe765154",
      PromiseRouterUpgradeBeaconProxy: "0xbaAA2a3237035A2c7fA2A33c76B44a8C6Fe18e87",
      RelayerFeeRouterUpgradeBeaconProxy: "0xEcFcaB0A285d3380E488A39B4BB21e777f8A4EaC",
      TokenRegistry: "0x75c35C980C0d37ef46DF04d31A140b65503c0eEd",
      XAppConnectionManager: "0xFB88dE099e13c3ED21F80a7a1E49f8CAEcF10df6",
    },
  },
  B: {
    DOMAIN: "1338",
    CHAIN: 1338,
    RPC: ["http://localhost:8546"],
    DEPLOYMENTS: {
      ConnextHandler: "0xF08dF3eFDD854FEDE77Ed3b2E515090EEe765154",
      PromiseRouterUpgradeBeaconProxy: "0xbaAA2a3237035A2c7fA2A33c76B44a8C6Fe18e87",
      RelayerFeeRouterUpgradeBeaconProxy: "0xEcFcaB0A285d3380E488A39B4BB21e777f8A4EaC",
      TokenRegistry: "0x75c35C980C0d37ef46DF04d31A140b65503c0eEd",
      XAppConnectionManager: "0xFB88dE099e13c3ED21F80a7a1E49f8CAEcF10df6",
    },
  },
};

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
  A: {
    DOMAIN: "1337",
    CHAIN: 1337,
    RPC: ["http://localhost:8547"],
    DEPLOYMENTS: {
      ConnextHandler: "0x98d9f9e8DEbd4A632682ba207670d2a5ACD3c489",
      PromiseRouterUpgradeBeaconProxy: "0x82D50AD3C1091866E258Fd0f1a7cC9674609D254",
      RelayerFeeRouterUpgradeBeaconProxy: "0xEcFcaB0A285d3380E488A39B4BB21e777f8A4EaC",
      BridgeRouterUpgradeBeaconProxy: "0x13274Fe19C0178208bCbee397af8167A7be27f6f",
      TokenRegistryUpgradeBeaconProxy: "0xAa588d3737B611baFD7bD713445b314BD453a5C8",
      TestERC20: "0x855d1c79Ad3fb086D516554Dc7187E3Fdfc1C79a",
    },
  },
  B: {
    DOMAIN: "1338",
    CHAIN: 1338,
    RPC: ["http://localhost:8546"],
    DEPLOYMENTS: {
      ConnextHandler: "0xF08dF3eFDD854FEDE77Ed3b2E515090EEe765154",
      PromiseRouterUpgradeBeaconProxy: "0xf204a4Ef082f5c04bB89F7D5E6568B796096735a",
      RelayerFeeRouterUpgradeBeaconProxy: "0xeec918d74c746167564401103096D45BbD494B74",
      BridgeRouterUpgradeBeaconProxy: "0x4E72770760c011647D4873f60A3CF6cDeA896CD8",
      TokenRegistryUpgradeBeaconProxy: "0x30753E4A8aad7F8597332E813735Def5dD395028",
      TestERC20: "0x1411CB266FCEd1587b0AA29E9d5a9Ef3Db64A9C5",
    },
  },
};

import { Wallet } from "ethers";

export const enrollHandlers = async (
  handlers: {
    domain: string;
    connextHandler: string;
    promiseRouterUpgradeBeaconProxy: string;
    relayerFeeRouterUpgradeBeaconProxy: string;
  }[],
  wallet: Wallet,
) => {
  for (const handler of ["ConnextHandler", "PromiseRouterUpgradeBeaconProxy", "RelayerFeeRouterUpgradeBeaconProxy"]) {
  }
};

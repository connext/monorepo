// Local 1338 deployment imports:
import ConnextHandler_DiamondProxy_1338 from "@connext/nxtp-contracts/deployments/local_1338/ConnextHandler_DiamondProxy.json";
import PromiseRouterUpgradeBeaconProxy_1338 from "@connext/nxtp-contracts/deployments/local_1338/PromiseRouterUpgradeBeaconProxy.json";
import RelayerFeeRouterUpgradeBeaconProxy_1338 from "@connext/nxtp-contracts/deployments/local_1338/RelayerFeeRouterUpgradeBeaconProxy.json";
import BridgeRouterUpgradeBeaconProxy_1338 from "@connext/nxtp-contracts/deployments/local_1338/BridgeRouterUpgradeBeaconProxy.json";
import TokenRegistryUpgradeBeaconProxy_1338 from "@connext/nxtp-contracts/deployments/local_1338/TokenRegistryUpgradeBeaconProxy.json";
import TestERC20_1338 from "@connext/nxtp-contracts/deployments/local_1338/TestERC20.json";
// Local 1337 deployment imports:
import ConnextHandler_DiamondProxy_1337 from "@connext/nxtp-contracts/deployments/local_1337/ConnextHandler_DiamondProxy.json";
import PromiseRouterUpgradeBeaconProxy_1337 from "@connext/nxtp-contracts/deployments/local_1337/PromiseRouterUpgradeBeaconProxy.json";
import RelayerFeeRouterUpgradeBeaconProxy_1337 from "@connext/nxtp-contracts/deployments/local_1337/RelayerFeeRouterUpgradeBeaconProxy.json";
import BridgeRouterUpgradeBeaconProxy_1337 from "@connext/nxtp-contracts/deployments/local_1337/BridgeRouterUpgradeBeaconProxy.json";
import TokenRegistryUpgradeBeaconProxy_1337 from "@connext/nxtp-contracts/deployments/local_1337/TokenRegistryUpgradeBeaconProxy.json";
import TestERC20_1337 from "@connext/nxtp-contracts/deployments/local_1337/TestERC20.json";

type Deployments = {
  ConnextHandler: string;
  PromiseRouterUpgradeBeaconProxy: string;
  RelayerFeeRouterUpgradeBeaconProxy: string;
  BridgeRouterUpgradeBeaconProxy: string;
  TokenRegistryUpgradeBeaconProxy: string;
  TestERC20: string;
};

/**
 * Get deployments needed for E2E test for the specified chain.
 * @param _chain - Local chain for which we are getting deployment addresses.
 * @returns Deployments object.
 */
export const getDeployments = (_chain: string | number): Deployments => {
  const chain = _chain.toString();
  if (chain === "1337") {
    return {
      ConnextHandler: ConnextHandler_DiamondProxy_1338.address,
      PromiseRouterUpgradeBeaconProxy: PromiseRouterUpgradeBeaconProxy_1338.address,
      RelayerFeeRouterUpgradeBeaconProxy: RelayerFeeRouterUpgradeBeaconProxy_1338.address,
      BridgeRouterUpgradeBeaconProxy: BridgeRouterUpgradeBeaconProxy_1338.address,
      TokenRegistryUpgradeBeaconProxy: TokenRegistryUpgradeBeaconProxy_1338.address,
      TestERC20: TestERC20_1338.address,
    };
  } else if (chain === "1338") {
    return {
      ConnextHandler: ConnextHandler_DiamondProxy_1337.address,
      PromiseRouterUpgradeBeaconProxy: PromiseRouterUpgradeBeaconProxy_1337.address,
      RelayerFeeRouterUpgradeBeaconProxy: RelayerFeeRouterUpgradeBeaconProxy_1337.address,
      BridgeRouterUpgradeBeaconProxy: BridgeRouterUpgradeBeaconProxy_1337.address,
      TokenRegistryUpgradeBeaconProxy: TokenRegistryUpgradeBeaconProxy_1337.address,
      TestERC20: TestERC20_1337.address,
    };
  } else {
    throw new Error(`Chain ${chain} not supported! Cannot retrieve contract deployment addresses for that chain.`);
  }
};

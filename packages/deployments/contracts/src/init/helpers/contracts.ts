import { Contract, Wallet } from "ethers";

import { ConnextHandlerInterface } from "../../contracts";
import { Connector__factory, RootManager__factory } from "../../typechain-types";

import { HubMessagingDeployments, NetworkStack, SpokeMessagingDeployments } from "./types";

export const getConnextContract = (args: { deployer: Wallet; network: NetworkStack }): Contract => {
  const { network, deployer } = args;
  const connextDeployment = network.deployments.Connext;

  // Set up Connext contract with connected deployer signer.
  return new Contract(connextDeployment.address, ConnextHandlerInterface, deployer.connect(network.rpc));
};

export const getRootManagerContract = (args: { deployer: Wallet; hub: NetworkStack }): Contract => {
  const { hub, deployer } = args;
  const _RootManager = (hub.deployments.messaging as HubMessagingDeployments).RootManager;
  if (!_RootManager) {
    throw new Error("RootManager was not configured correctly for the hub network.");
  }
  const iface = RootManager__factory.createInterface();
  return new Contract(_RootManager.address, iface, deployer.connect(hub.rpc));
};

export const getConnectorContract = (args: { deployer: Wallet; network: NetworkStack; address?: string }): Contract => {
  const { network, deployer, address: _address } = args;
  let address = _address;
  if (!address) {
    const connectorDeployment =
      (network.deployments.messaging as SpokeMessagingDeployments).SpokeConnector ??
      (network.deployments.messaging as HubMessagingDeployments).HubConnectors[0];
    if (!connectorDeployment) {
      throw new Error(`No Connector address trying to whitelist senders for chain ${network.chain}!`);
    }
    address = connectorDeployment.address;
  }

  const iface = Connector__factory.createInterface();
  return new Contract(address, iface, deployer.connect(network.rpc));
};

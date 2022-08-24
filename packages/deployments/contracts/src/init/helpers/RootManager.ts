import { Contract, providers, Wallet } from "ethers";

import { RootManager__factory } from "../../typechain-types";

import { waitForTx } from "./tx";
import { HubMessagingDeployments, NetworkStack, SpokeMessagingDeployments } from "./types";

export const whitelistWatcher = async (args: {
  deployer: Wallet;
  watcher: string;
  hub: NetworkStack;
}): Promise<void> => {
  const { hub, watcher, deployer } = args;
  const _RootManager = (hub.deployments.messaging as HubMessagingDeployments).RootManager;
  if (!_RootManager) {
    throw new Error("RootManager was not configured correctly for the hub network.");
  }

  const iface = RootManager__factory.createInterface();
  const RootManager = new Contract(_RootManager.address, iface, deployer.connect(hub.rpc));

  const isWhitelisted = await RootManager.callStatic.watchers(watcher);
  if (isWhitelisted) {
    console.log(`Watcher ${watcher.slice(0, 8)} whitelisted: ${isWhitelisted}`);
  } else {
    // Call `addWatcher` to whitelist the new Watcher agent address.
    const tx = (await RootManager.addWatcher(watcher)) as providers.TransactionResponse;
    await waitForTx({
      tx,
      name: "addWatcher",
      checkResult: {
        method: async () => (await RootManager.callStatic.watchers(watcher)) as boolean,
        desired: true,
      },
    });
    console.log(`\tWatcher ${watcher.slice(0, 8)} whitelisted: ${isWhitelisted} !!!`);
  }
};

export const setRootManagerConnector = async (args: {
  deployer: Wallet;
  hub: NetworkStack;
  remote: NetworkStack;
}): Promise<void> => {
  const { hub, remote, deployer } = args;
  const _RootManager = (hub.deployments.messaging as HubMessagingDeployments).RootManager;
  const RemoteConnector = (remote.deployments.messaging as SpokeMessagingDeployments).SpokeConnector;
  if (!_RootManager || !RemoteConnector) {
    throw new Error("RootManager or SpokeConnector were not configured correctly.");
  }
  const desiredAddress = RemoteConnector.address;

  const iface = RootManager__factory.createInterface();
  const RootManager = new Contract(_RootManager.address, iface, deployer.connect(hub.rpc));

  const connector = await RootManager.callStatic.connectors(remote.domain);
  if (connector === desiredAddress) {
    console.log(`\t ${remote.domain} (${remote.chain}) => ${connector}`);
  } else {
    const tx = (await RootManager.addConnector(remote.domain, desiredAddress)) as providers.TransactionResponse;
    await waitForTx({
      tx,
      name: "addConnector",
      checkResult: {
        method: async () => await RootManager.callStatic.connectors(remote.domain),
        desired: desiredAddress,
      },
    });
    console.log(`\t ${remote.domain} (${remote.chain}) => ${desiredAddress}`);
  }
};

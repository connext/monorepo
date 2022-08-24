import { Contract, providers, Wallet } from "ethers";

import { RootManager__factory } from "../../typechain-types";

import { waitForTx } from "./tx";
import { HubMessagingDeployments, NetworkStack, SpokeMessagingDeployments } from "./types";

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
    console.log(`\t ${remote.domain} (${remote.chain}) => ${desiredAddress} !!!`);
  }
};

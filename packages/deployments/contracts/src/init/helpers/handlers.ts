import { BytesLike, Contract, utils } from "ethers";

import { ConnextHandlerInterface } from "../../contracts";
import { canonizeId } from "../../nomad";
import { Router__factory } from "../../typechain-types";

import { Deployment, NetworkStack, ProtocolStack } from "./types";
import { updateIfNeeded } from "./tx";

export const enrollHandlers = async (args: { protocol: ProtocolStack }) => {
  const { protocol } = args;
  const RouterInterface = Router__factory.createInterface();
  // Each handler will need to have enrolled the handlers of all other domains.
  // For example, each BridgeRouter should have enrolled the BridgeRouter of every other domain.
  for (const handlerName of ["BridgeRouter", "PromiseRouter", "RelayerFeeRouter"]) {
    // Round up the specific Handler type we're concerned with for each domain.
    // e.g. Get every BridgeRouter for every domain.
    const handlers: { deployment: Deployment; network: NetworkStack }[] = [];
    for (const network of protocol.networks) {
      handlers.push({
        deployment: (network.deployments.handlers as any)[handlerName] as Deployment,
        network,
      });
    }

    // For every Handler contract in the list, enroll every other Handler.
    for (let i = 0; i < handlers.length; i++) {
      const targetHandler = handlers[i];
      const remoteHandlers = handlers.filter((_, j) => j !== i);

      console.log(`\n* (${targetHandler.network.chain}) ${handlerName}: ${targetHandler.deployment.address}`);
      for (const remoteHandler of remoteHandlers) {
        // Get the canonized address of the Handler we want to enroll (will be padded with 0-bytes).
        const canonized = utils.hexlify(canonizeId(remoteHandler.deployment.address as BytesLike));
        await updateIfNeeded({
          scheme: {
            contract: new Contract(
              targetHandler.deployment.address,
              RouterInterface,
              protocol.deployer.connect(targetHandler.network.rpc),
            ),
            desired: canonized,
            read: { method: "remotes", args: [remoteHandler.network.domain] },
            write: { method: "enrollRemoteRouter", args: [remoteHandler.network.domain, canonized] },
          },
        });
      }
    }

    // TODO: If Connext === bridge router, this contract property will be removed; remove the following code in that case!
    // Set the bridge router in Connext contract, if applicable.
    if (handlerName === "BridgeRouter") {
      for (const network of protocol.networks) {
        const connextDeployment = network.deployments.Connext;
        const bridgeRouterDeployment = network.deployments.handlers.BridgeRouter;

        // If bridge router is not set, we need to set it to be the BridgeRouterUpgradeBeaconProxy address.
        console.log("\tChecking bridgeRouter for Connext contract...");
        await updateIfNeeded({
          scheme: {
            contract: new Contract(
              connextDeployment.address,
              ConnextHandlerInterface,
              protocol.deployer.connect(network.rpc),
            ),
            desired: bridgeRouterDeployment.address,
            read: "bridgeRouter",
            write: { method: "setBridgeRouter", args: [bridgeRouterDeployment.address] },
          },
        });
      }
    }
  }
};

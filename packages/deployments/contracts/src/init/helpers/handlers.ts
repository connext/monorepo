import { BytesLike, utils } from "ethers";

import { canonizeId } from "../../domain";

import { Deployment, NetworkStack, ProtocolStack } from "./types";
import { updateIfNeeded } from "./tx";

export const enrollHandlers = async (args: { protocol: ProtocolStack }) => {
  const { protocol } = args;
  // Each Connext will need to have enrolled other connext instances of all other domains.
  for (const handlerName of ["Connext"]) {
    // Round up the specific Handler type we're concerned with for each domain.
    // e.g. Get every BridgeRouter for every domain.
    const handlers: { deployment: Deployment; network: NetworkStack }[] = [];
    for (const network of protocol.networks) {
      handlers.push({
        deployment: (network.deployments as any)[handlerName] as Deployment,
        network,
      });
    }

    // For every Handler contract in the list, enroll every other Handler.
    for (let i = 0; i < handlers.length; i++) {
      const targetHandler = handlers[i];
      const remoteHandlers = handlers.filter((_, j) => j !== i);

      for (const remoteHandler of remoteHandlers) {
        // Get the canonized address of the Handler we want to enroll (will be padded with 0-bytes).
        const canonized = utils.hexlify(canonizeId(remoteHandler.deployment.address as BytesLike));
        await updateIfNeeded({
          deployment: targetHandler.deployment,
          desired: remoteHandler.deployment.address,
          read: { method: "remote", args: [remoteHandler.network.domain] },
          write: { method: "enrollRemoteRouter", args: [remoteHandler.network.domain, canonized] },
        });
      }
    }
  }
};

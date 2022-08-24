import { ConnextHandlerInterface } from "@connext/nxtp-contracts";
import { Contract } from "ethers";

import { updateIfNeeded } from "./tx";
import { ProtocolStack } from "./types";

export const setConnextions = async (args: { protocol: ProtocolStack }) => {
  const { protocol } = args;

  for (let i = 0; i < protocol.networks.length; i++) {
    const targetNetwork = protocol.networks[i];
    const connextDeployment = targetNetwork.deployments.Connext;

    const remoteNetworks = protocol.networks.filter((_, j) => j !== i);
    for (const remoteNetwork of remoteNetworks) {
      const desiredConnextion = remoteNetwork.deployments.Connext.address;
      await updateIfNeeded({
        scheme: {
          contract: new Contract(
            connextDeployment.address,
            ConnextHandlerInterface,
            protocol.deployer.connect(targetNetwork.rpc),
          ),
          desired: desiredConnextion,
          read: { method: "connextion", args: [remoteNetwork.domain] },
          write: { method: "addConnextion", args: [remoteNetwork.domain, desiredConnextion] },
        },
      });
    }
  }
};

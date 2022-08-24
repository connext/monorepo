import { ConnextHandlerInterface } from "@connext/nxtp-contracts";
import { Contract, providers } from "ethers";

import { waitForTx } from "./tx";
import { ProtocolStack } from "./types";

export const setConnextions = async (args: { protocol: ProtocolStack }) => {
  const { protocol } = args;

  for (let i = 0; i < protocol.networks.length; i++) {
    const targetNetwork = protocol.networks[i];
    const connextDeployment = targetNetwork.deployments.Connext;

    console.log(`\n* [${targetNetwork.chain}] Connext: ${connextDeployment.address}`);

    // Set up Connext contract with connected deployer signer.
    const Connext = new Contract(
      connextDeployment.address,
      ConnextHandlerInterface,
      protocol.deployer.connect(targetNetwork.rpc),
    );

    const remoteNetworks = protocol.networks.filter((_, j) => j !== i);
    for (const remoteNetwork of remoteNetworks) {
      const desiredConnextion = remoteNetwork.deployments.Connext.address;
      // Check to see if the connextion is already set (correctly).
      const connextion: string = await Connext.callStatic.connextion(remoteNetwork.domain);
      if (connextion === desiredConnextion) {
        console.log(`\t ${remoteNetwork.domain} (${remoteNetwork.chain}) => ${connextion}`);
      } else {
        const tx = (await Connext.addConnextion(
          remoteNetwork.domain,
          desiredConnextion,
        )) as providers.TransactionResponse;
        await waitForTx({
          tx,
          name: "addConnextion",
          checkResult: {
            method: async () => await Connext.callStatic.connextion(remoteNetwork.domain),
            desired: desiredConnextion,
          },
        });
        console.log(`\t (${remoteNetwork.chain} | ${remoteNetwork.domain}) => ${desiredConnextion} !!!`);
      }
    }
  }
};

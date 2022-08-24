import { ConnextHandlerInterface } from "@connext/nxtp-contracts";
import { Contract, providers, Wallet } from "ethers";

import { waitForTx } from "./tx";
import { NetworkStack, ProtocolStack } from "./types";

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
        console.log(`\t ${remoteNetwork.domain} (${remoteNetwork.chain}) => ${desiredConnextion} !!!`);
      }
    }
  }
};

export const getConnextContract = (args: { deployer: Wallet; network: NetworkStack }): Contract => {
  const { network, deployer } = args;
  const connextDeployment = network.deployments.Connext;

  // Set up Connext contract with connected deployer signer.
  return new Contract(connextDeployment.address, ConnextHandlerInterface, deployer.connect(network.rpc));
};

// export const whitelistSequencer = async (args: {
//   deployer: Wallet;
//   sequencer: string;
//   network: NetworkStack;
// }): Promise<void> => {
//   const { network, sequencer, deployer } = args;
//   const connextDeployment = network.deployments.Connext;

//   // Set up Connext contract with connected deployer signer.
//   const Connext = new Contract(connextDeployment.address, ConnextHandlerInterface, deployer.connect(network.rpc));

//   // await permissionAgent({
//   //   agent: sequencer,
//   //   whitelist: true,
//   //   scheme: {
//   //     contract: new Contract(connextDeployment.address, ConnextHandlerInterface, deployer.connect(network.rpc)),
//   //     read: { method: "sequencers", args: [sequencer] },
//   //     write: { method: "addSequencer", args: [sequencer] },
//   //   }
//   // })

//   const isWhitelisted = await Connext.callStatic.sequencers(sequencer);
//   if (isWhitelisted) {
//     console.log(`Sequencer ${sequencer.slice(0, 8)} whitelisted: ${isWhitelisted}`);
//   } else {
//     // Call `addSequencer` to whitelist the new sequencer agent address.
//     const tx = (await Connext.addSequencer(sequencer)) as providers.TransactionResponse;
//     await waitForTx({
//       tx,
//       name: "addSequencer",
//       checkResult: {
//         method: async () => (await Connext.callStatic.sequencers(sequencer)) as boolean,
//         desired: true,
//       },
//     });
//     console.log(`\tWatcher ${sequencer.slice(0, 8)} whitelisted: true !!!`);
//   }
// };

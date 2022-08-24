import { providers } from "ethers";

import { log } from "./log";
import { waitForTx } from "./tx";
import { UpdateScheme } from "./types";

// export const permissionAgent = async (args: { agent: string; whitelist: boolean; scheme: UpdateScheme<boolean> }) => {
//   const { agent, scheme, whitelist } = args;

//   const slicedAgent = agent.slice(0, 8);
//   const isWhitelisted = await scheme.read();
//   if (isWhitelisted === whitelist) {
//     console.log(`\tAgent ${slicedAgent} whitelisted: ${isWhitelisted}`);
//   } else {
//     const tx = await scheme.write();
//     await waitForTx({
//       tx,
//       name: "addSequencer",
//       checkResult: {
//         method: scheme.read,
//         desired: true,
//       },
//     });
//     console.log(`\tAgent ${slicedAgent} whitelisted: true !!!`);
//   }
// };

export const updateIfNeeded = async <T>(args: { scheme: UpdateScheme<T> }) => {
  const {
    scheme: { contract, read, write, desired },
  } = args;

  // Sanity check: contract has methods.
  const callable = Object.keys(contract.functions).concat(Object.keys(contract.callStatic));
  if (!callable.includes(read.method)) {
    throw new Error(`Read method ${read.method} not found in contract functions!`);
  }
  if (!callable.includes(write.method)) {
    throw new Error(`Write method ${write.method} not found in contract functions!`);
  }

  const readCall = async (): Promise<T> => {
    return await contract.callStatic[read.method](...read.args);
  };
  const writeCall = async (): Promise<providers.TransactionResponse> => {
    return await contract[write.method](...write.args);
  };

  const network = await contract.provider.getNetwork();
  const address = contract.address;

  const value = await readCall();
  log.value({ network, address, call: read, value, updated: false });
  if (value !== desired) {
    const tx = await writeCall();
    await waitForTx({
      tx,
      name: write.method,
      checkResult: {
        method: readCall,
        desired,
      },
    });
    log.value({ network, address, call: read, value, updated: true });
  }
};

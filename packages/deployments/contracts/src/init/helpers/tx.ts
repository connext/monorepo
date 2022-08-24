import { providers } from "ethers";
import { getChainData } from "@connext/nxtp-utils";

const DEFAULT_CONFIRMATIONS = 5;

export const waitForTx = async (args: {
  tx: providers.TransactionResponse;
  name: string;
  checkResult?: {
    method: () => Promise<any>;
    desired: any;
  };
}): Promise<providers.TransactionReceipt> => {
  const { tx, name: _name, checkResult } = args;
  // Try to get the desired amount of confirmations from chain data.
  const chainData = await getChainData();
  const info = chainData.get(tx.chainId.toString());

  const name = `[${_name}] `;
  console.log(`\t${name}Transaction sent: ${tx.hash}`);
  const receipt = await tx.wait(info?.confirmations ?? DEFAULT_CONFIRMATIONS);
  console.log(`\tTransaction mined:`, receipt.transactionHash);

  if (checkResult && typeof checkResult.method === "function") {
    const value = await checkResult.method();
    if (value !== checkResult.desired) {
      throw new Error(`${name}Checking result of update failed: ${value} !== ${checkResult.desired}`);
    }
  }

  return receipt;
};

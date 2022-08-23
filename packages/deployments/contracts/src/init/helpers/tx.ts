import { providers } from "ethers";
import { getChainData } from "@connext/nxtp-utils";

const DEFAULT_CONFIRMATIONS = 5;

export const waitForTx = async (
  tx: providers.TransactionResponse,
  name?: string,
): Promise<providers.TransactionReceipt> => {
  // Try to get the desired amount of confirmations from chain data.
  const chainData = await getChainData();
  const info = chainData.get(tx.chainId.toString());

  console.log(`${name ? name + " " : ""}Transaction sent: ${tx.hash}`);
  const receipt = await tx.wait(info?.confirmations ?? DEFAULT_CONFIRMATIONS);
  console.log(`Transaction mined:`, receipt.transactionHash);
  return receipt;
};

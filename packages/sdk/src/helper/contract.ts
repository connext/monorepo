import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import { providers } from "ethers";
import { TransactionPreparedEvent } from "@connext/nxtp-utils";

export const getTransactionManagerContractAddress = (chainId: number): string => {
  // just for testing
  let address: string;
  if ([1337, 1338].includes(chainId)) {
    address = "0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da";
  } else {
    const record = (contractDeployments as any)[String(chainId)] ?? {};
    const name = Object.keys(record)[0];
    if (!name) {
      throw new Error("Chain not supported yet, please contact connext team");
    }

    address = record[name]?.contracts?.TransactionManager?.address;
  }

  return address;
};

export const getActiveTransactionsByUser = async (
  _chainId: number,
  _userAddress: string,
  _provider: providers.JsonRpcProvider,
): Promise<TransactionPreparedEvent[]> => {
  throw new Error("Needs subgraph implementation");
};

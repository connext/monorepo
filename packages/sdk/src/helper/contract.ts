import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import { providers } from "ethers";
import { TransactionPreparedEvent } from "@connext/nxtp-utils";

export const getTransactionManagerContractAddress = (chainId: number): string => {
  // just for testing
  let address: string;
  if ([1337, 1338].includes(chainId)) {
    address = "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0";
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

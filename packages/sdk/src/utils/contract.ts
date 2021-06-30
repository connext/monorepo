import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { Contract, providers, constants, BigNumberish } from "ethers";

export const getTransactionManagerContract = (
  chainId: number,
  userWebProvider?: providers.JsonRpcProvider,
): { address: string; abi: any; instance: Contract } => {
  const record = (contractDeployments as any)[String(chainId)] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    throw new Error("Chain not supported yet, please contact connext team");
  }

  // TODO: fix me!
  if (name === "hardhat") {
    return {
      address: constants.AddressZero,
      abi: TransactionManagerArtifact.abi,
      instance: ({ test: "test" } as unknown) as Contract,
    };
  }

  const abi = record[name]?.contracts?.TransactionManager?.abi;
  const address = record[name]?.contracts?.TransactionManager?.address;

  const instance = new Contract(address, abi, userWebProvider);

  return { address, abi, instance };
};

export type VariableTransactionData = {
  user: string;
  amount: BigNumberish;
  expiry: string;
  blockNumber: string;
  digest: string;
};

export const getActiveTransactionsByUser = async (
  chainId: number,
  userAddress: string,
): Promise<VariableTransactionData[]> => {
  const { instance } = getTransactionManagerContract(chainId);

  const res = await instance.getActiveTransactionsByUser(userAddress);

  return res;
};

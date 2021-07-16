import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager } from "@connext/nxtp-contracts/typechain";
import { Contract, providers } from "ethers";
import { getInvariantTransactionDigest, InvariantTransactionData, TransactionPreparedEvent } from "@connext/nxtp-utils";

// TODO: refactor to use tx service

export const getTransactionManagerContract = (
  chainId: number,
  userWebProvider?: providers.JsonRpcProvider,
): { address: string; abi: any; instance: TransactionManager } => {
  // just for testing
  let address: string;
  let abi: any;
  if ([1337, 1338].includes(chainId)) {
    address = "0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da";
    abi = TransactionManagerArtifact.abi;
  } else {
    const record = (contractDeployments as any)[String(chainId)] ?? {};
    const name = Object.keys(record)[0];
    if (!name) {
      throw new Error("Chain not supported yet, please contact connext team");
    }

    abi = record[name]?.contracts?.TransactionManager?.abi;
    address = record[name]?.contracts?.TransactionManager?.address;
  }

  const instance = new Contract(address, abi, userWebProvider) as TransactionManager;

  return { address, abi, instance };
};

export const getActiveTransactionsByUser = async (
  chainId: number,
  userAddress: string,
  provider: providers.JsonRpcProvider,
): Promise<TransactionPreparedEvent[]> => {
  throw new Error("Needs subgraph implementation");
};

export const getVariantHashByInvariantData = async (
  chainId: number,
  data: InvariantTransactionData,
  provider: providers.JsonRpcProvider,
): Promise<string> => {
  const { instance } = getTransactionManagerContract(chainId);
  const txManager = instance.connect(provider);
  const invariantDigest = getInvariantTransactionDigest(data);
  const hash = await txManager.variantTransactionData(invariantDigest);
  // will be bytes0 if it doesnt exist
  // TODO: is there a better way to construct the variant hash
  return hash;
};

import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager } from "@connext/nxtp-contracts/typechain";
import { Contract, providers } from "ethers";
import {
  getInvariantTransactionDigest,
  InvariantTransactionData,
  TransactionData,
  TransactionPreparedEvent,
} from "@connext/nxtp-utils";

// TODO: refactor to use tx service

export const getTransactionManagerContract = (
  chainId: number,
  userWebProvider?: providers.JsonRpcProvider,
): { address: string; abi: any; instance: TransactionManager } => {
  // just for testing
  let address: string;
  let abi: any;
  if ([1337, 1338].includes(chainId)) {
    address = "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0";
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
  const { instance } = getTransactionManagerContract(chainId);
  const txManager = instance.connect(provider);
  const blocks = await txManager.getActiveTransactionBlocks(userAddress);
  const events = await Promise.all(
    blocks.map(async (block) => {
      const e = await txManager.queryFilter(
        txManager.filters.TransactionPrepared(userAddress),
        block.toNumber(),
        block.toNumber(),
      );
      return e;
    }),
  );
  const flattenedEvents = events.flat();
  const mappedEvents = flattenedEvents.map((event) => {
    const {
      args: { txData, bidSignature, caller, encryptedCallData, encodedBid },
    } = event;
    return {
      txData: {
        user: txData.user,
        router: txData.router,
        sendingAssetId: txData.sendingAssetId,
        receivingAssetId: txData.receivingAssetId,
        sendingChainFallback: txData.sendingChainFallback,
        callTo: txData.callTo,
        receivingAddress: txData.receivingAddress,
        sendingChainId: txData.sendingChainId.toNumber(),
        receivingChainId: txData.receivingChainId.toNumber(),
        callDataHash: txData.callDataHash,
        transactionId: txData.transactionId,
        amount: txData.amount.toString(),
        expiry: txData.expiry.toNumber(),
        preparedBlockNumber: txData.preparedBlockNumber.toNumber(),
      } as TransactionData,
      bidSignature,
      caller,
      encryptedCallData,
      encodedBid,
    };
  });
  return mappedEvents;
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

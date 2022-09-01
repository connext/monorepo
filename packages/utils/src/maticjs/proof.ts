import { getChainData, initMatic, MaticJsErrorType, InfoError } from "..";

/**
 * generateExitPayload
 * @param {String} domain
 * @param {String} mirrorDomain
 * @param {String} burnTxHash
 * @param {String} eventSignature
 * @param {Map<String, string[]>} providers
 * @returns {string}
 */
export const generateExitPayload = async (
  domain: string,
  mirrorDomain: string,
  burnTxHash: string,
  eventSignature: string,
  providers?: Map<string, string[]>,
): Promise<string | undefined> => {
  const allChainData = await getChainData();

  if (!allChainData.has(domain)) {
    throw new Error(`ChainData doesn't have a record for domain: ${domain}`);
  }
  if (!allChainData.has(mirrorDomain)) {
    throw new Error(`ChainData doesn't have a record for mirrorDomain: ${mirrorDomain}`);
  }

  const chainData = allChainData.get(domain)!;
  const mirrorChainData = allChainData.get(mirrorDomain)!;
  const isMainnet = chainData.type === "mainnet";

  const maticRPC = providers?.get(domain) ?? chainData.rpc;
  const ethereumRPC = providers?.get(mirrorDomain) ?? mirrorChainData.rpc;
  const rpcLength = Math.min(maticRPC.length, ethereumRPC.length);
  const maxRetries = rpcLength * 2;
  const initialRpcIndex = 0;

  let result;
  let isCheckpointed;

  // loop over rpcs to retry in case of an in case of an rpc error
  for (let i = 0; i < maxRetries; i++) {
    const rpcIndex = (initialRpcIndex + i) % rpcLength;
    try {
      // initialize matic client
      const maticClient = await initMatic(isMainnet, maticRPC[rpcIndex], ethereumRPC[rpcIndex]);

      // check for checkpoint
      try {
        // Checking for checkpoint status
        isCheckpointed = await maticClient.exitUtil.isCheckPointed(burnTxHash);
      } catch (error: any) {
        if (i === maxRetries - 1) {
          throw new InfoError(MaticJsErrorType.IncorrectTx, "Incorrect burn transaction");
        }
        throw new Error("Null receipt received");
      }
      if (!isCheckpointed) {
        throw new InfoError(MaticJsErrorType.TxNotCheckpointed, "Burn transaction has not been checkpointed yet");
      }

      // build payload for exit
      try {
        result = await maticClient.exitUtil.buildPayloadForExit(burnTxHash, eventSignature, false);
      } catch (error: any) {
        if (error?.message === "Index is grater than the number of tokens in this transaction") {
          throw new InfoError(MaticJsErrorType.BlockNotIncluded, error.message as string);
        }
        if (i === maxRetries - 1) {
          throw new InfoError(MaticJsErrorType.BlockNotIncluded, "Event Signature log not found in tx receipt");
        }
        throw new Error("Null receipt received");
      }

      if (!result) {
        throw new Error("Null result received");
      }

      break;
    } catch (error: any) {
      if (
        error.type === MaticJsErrorType.TxNotCheckpointed ||
        error.type === MaticJsErrorType.IncorrectTx ||
        error.type === MaticJsErrorType.BlockNotIncluded ||
        i === maxRetries - 1
      ) {
        throw error;
      }
    }
  }
  return result;
};

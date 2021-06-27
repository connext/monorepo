import { BigNumber, constants, Contract, providers } from "ethers";
import { InvariantTransactionData, signFulfillTransactionPayload } from "@connext/nxtp-utils";
import Ajv from "ajv";
import { BaseLogger } from "pino";

import { validateAndParseAddress, getRandomBytes32 } from "./utils";
import { PrepareParams, HandleReceiverPrepareParams } from "./types";

export const ajv = new Ajv();

const verifyCorrectChain = async (expectedChain: number, provider: providers.JsonRpcProvider) => {
  // Make sure user is on the correct chain
  const { chainId } = await provider.getNetwork();

  if (chainId !== expectedChain) {
    throw new Error(`user is on ${chainId} and should be on ${expectedChain}`);
  }
};

export const prepare = async (
  params: PrepareParams,
  transactionManager: Contract,
  logger: BaseLogger,
): Promise<providers.TransactionReceipt> => {
  const method = "prepare";
  const methodId = getRandomBytes32();
  logger.info({ method, methodId, params }, "Method start");

  const { sendingProvider, signer, amount, expiry, callData, sendingChainId, receivingChainId, transactionId } = params;

  const user = await signer.getAddress();

  await verifyCorrectChain(sendingChainId, sendingProvider);

  // Properly checksum all addresses
  const router = validateAndParseAddress(params.router);
  const sendingAssetId = validateAndParseAddress(params.sendingAssetId);
  const receivingAssetId = validateAndParseAddress(params.receivingAssetId);
  const receivingAddress = validateAndParseAddress(params.receivingAddress);

  // TODO: validate expiry
  const transaction: InvariantTransactionData = {
    user,
    router,
    sendingAssetId,
    receivingAssetId,
    receivingAddress,
    callData: callData ?? "0x",
    transactionId,
    sendingChainId,
    receivingChainId,
  };

  logger.info({ method, methodId, transactionId }, "Preparing tx");

  const prepareTx = await transactionManager
    .connect(signer)
    .prepare(
      transaction,
      amount,
      expiry,
      transaction.sendingAssetId === constants.AddressZero ? { value: amount } : {},
    );

  // TODO: fix block confs for chains
  logger.info({ method, methodId, transactionId, transactionHash: prepareTx.hash }, "Submitted prepare tx");
  const prepareReceipt = await prepareTx.wait(1);
  if (prepareReceipt.status === 0) {
    throw new Error("Prepare transaction reverted onchain");
  }
  logger.info({ method, methodId, transactionId, transactionHash: prepareReceipt.transactionHash }, "Mined prepare tx");
  logger.info({ method, methodId }, "Method complete");
  return prepareReceipt;
};

export type TransactionPrepareEvent = {
  txData: InvariantTransactionData;
  amount: BigNumber;
  expiry: BigNumber;
  blockNumber: BigNumber;
  caller: string;
};

export const handleReceiverPrepare = async (
  params: HandleReceiverPrepareParams,
  transactionManager: Contract, // TODO: remove me
  logger: BaseLogger,
): Promise<void> => {
  const method = "handleReceiverPrepare";
  const methodId = getRandomBytes32();
  logger.info({ method, methodId, txData: params.txData, relayerFee: params.relayerFee }, "Method start");

  const { txData, receivingProvider, relayerFee, signer } = params;

  // Generate signature
  logger.info({ method, methodId }, "Generating fulfill signature");
  const signature = await signFulfillTransactionPayload(txData, relayerFee, signer);

  // Make sure user is on the receiving chain
  // TODO: remove this check when messaging in place
  await verifyCorrectChain(txData.receivingChainId, receivingProvider);

  // Submit fulfill to receiver chain
  logger.info({ method, methodId }, "Preparing fulfill tx");

  const fulfillTx = await transactionManager.connect(signer).fulfill(txData, relayerFee, signature);
  logger.info({ method, methodId, transactionHash: fulfillTx.hash }, "Fulfill tx submitted");

  const receipt = await fulfillTx.wait(1);
  if (receipt.status === 0) {
    throw new Error("Fulfill transaction reverted onchain");
  }
  logger.info({ method, methodId, transactionHash: receipt.transactionHash }, "Mined fulfill tx");

  // TODO: broadcast from messaging service here and add logic to wait
  // for relayer submission or submit it on our own before expiry
};

import { BigNumber, constants, Contract, providers } from "ethers";
import {
  generateMessagingInbox,
  InvariantTransactionData,
  MetaTxResponse,
  signFulfillTransactionPayload,
  UserNxtpNatsMessagingService,
} from "@connext/nxtp-utils";
import Ajv from "ajv";
import { BaseLogger } from "pino";

import { validateAndParseAddress, getRandomBytes32 } from "./utils";
import { PrepareParams, HandleReceiverPrepareParams } from "./types";

export const ajv = new Ajv();

export const verifyCorrectChain = async (expectedChain: number, provider: providers.JsonRpcProvider): Promise<void> => {
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

  const { signer, amount, expiry, callData, sendingChainId, receivingChainId, transactionId } = params;

  const user = await signer.getAddress();

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

  // TODO: bid stuff
  const encodedBid = "0x";
  const bidSignature = "0x";

  logger.info({ method, methodId, transactionId, transactionManager: transactionManager.address }, "Preparing tx");

  const prepareTx = await transactionManager
    .connect(signer)
    .prepare(
      transaction,
      amount,
      expiry,
      encodedBid,
      bidSignature,
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
  return prepareReceipt as providers.TransactionReceipt;
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
  transactionManager: Contract,
  messaging: UserNxtpNatsMessagingService,
  logger: BaseLogger,
): Promise<void> => {
  const method = "handleReceiverPrepare";
  const methodId = getRandomBytes32();
  logger.info({ method, methodId, txData: params.txData, relayerFee: params.relayerFee }, "Method start");

  const { txData, relayerFee, signer } = params;

  // Generate signature
  logger.info(
    { method, methodId, transactionId: params.txData.transactionId, relayerFee },
    "Generating fulfill signature",
  );
  const signature = await signFulfillTransactionPayload(txData, relayerFee, signer);
  logger.info({ method, methodId }, "Generated signature");

  // Make sure user is on the receiving chain

  // Submit fulfill to receiver chain
  logger.info({ method, methodId, transactionId: txData.transactionId, relayerFee }, "Preparing fulfill tx");

  const data = transactionManager.interface.encodeFunctionData("fulfill", [
    {
      ...txData,
    },
    relayerFee,
    signature,
  ]);

  const inbox = generateMessagingInbox();
  const responseInbox = generateMessagingInbox();
  const responsePromise = new Promise<MetaTxResponse>(async (resolve, reject) => {
    await messaging.subscribeToMetaTxResponse(responseInbox, (data, err) => {
      logger.info({ method, methodId, data, err }, "MetaTx response received");
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
  await messaging.publishMetaTxRequest(
    {
      relayerFee,
      to: transactionManager.address,
      chainId: txData.receivingChainId,
      data,
      responseInbox,
    },
    inbox,
  );
  logger.info({ method, methodId, inbox }, "Fulfill metaTx request published");

  // TODO: fix relayer responses?
  responsePromise.then((response) => {
    logger.info({ method, methodId, inbox, response }, "Fulfill metaTx response received");
  });
  // add logic to submit it on our own before expiry
  // or some timeout
};

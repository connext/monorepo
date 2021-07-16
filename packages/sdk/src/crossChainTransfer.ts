import { constants, Contract, providers, Signer, utils } from "ethers";
import {
  CancelParams,
  generateMessagingInbox,
  InvariantTransactionData,
  MetaTxResponse,
  PrepareParams,
  getRandomBytes32,
  signFulfillTransactionPayload,
  TransactionPreparedEvent,
  UserNxtpNatsMessagingService,
} from "@connext/nxtp-utils";
import Ajv from "ajv";
import { BaseLogger } from "pino";
import { TransactionManager, IERC20Minimal } from "@connext/nxtp-contracts/typechain";
import { Evt } from "evt";

import { NxtpSdkEvent, NxtpSdkEventPayloads } from "./sdk";

declare const ethereum: any;

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
  transactionManager: TransactionManager,
  signer: Signer,
  evts: { [K in NxtpSdkEvent]: Evt<NxtpSdkEventPayloads[K]> },
  logger: BaseLogger,
  erc20Contract?: IERC20Minimal,
  infiniteApprove = false,
): Promise<providers.TransactionReceipt> => {
  const method = "prepare";
  const methodId = getRandomBytes32();
  logger.info({ method, methodId, params }, "Method start");

  const {
    txData: {
      user,
      router,
      sendingAssetId,
      receivingAssetId,
      sendingChainFallback,
      callTo,
      receivingAddress,
      sendingChainId,
      receivingChainId,
      callDataHash,
      transactionId,
    },
    amount,
    expiry,
    encodedBid,
    bidSignature,
    encryptedCallData,
  } = params;

  // TODO: validate expiry
  const transaction: InvariantTransactionData = {
    user,
    router,
    sendingAssetId,
    receivingAssetId,
    sendingChainFallback,
    callTo,
    receivingAddress,
    sendingChainId,
    receivingChainId,
    callDataHash,
    transactionId,
  };

  // TODO: validate bid stuff

  logger.info(
    {
      method,
      methodId,
      transaction,
      amount,
      expiry,
      encodedBid,
      bidSignature,
      transactionManager: transactionManager.address,
    },
    "Preparing tx!",
  );

  if (transaction.sendingAssetId !== constants.AddressZero) {
    if (!erc20Contract) {
      throw new Error("No ERC20 contract provided");
    }
    const signerAddress = await signer.getAddress();
    logger.info({ method, methodId, transactionId, assetId: transaction.sendingAssetId, amount }, "Approving tokens");
    const connected = erc20Contract.connect(signer);
    const approved = await connected.allowance(signerAddress, transactionManager.address);
    logger.info({ method, methodId, transactionId, approved: approved.toString() }, "Got approved tokens");

    if (approved.lt(amount)) {
      const approveTx = await connected.approve(
        transactionManager.address,
        infiniteApprove ? constants.MaxUint256 : amount,
      );
      logger.info({ method, methodId, transactionId, transactionHash: approveTx.hash }, "Submitted approve tx");
      evts.SenderTokenApprovalSubmitted.post({
        assetId: sendingAssetId,
        chainId: sendingChainId,
        transactionResponse: approveTx,
      });

      const approveReceipt = await approveTx.wait(1);
      if (approveReceipt.status === 0) {
        throw new Error("Approve transaction reverted onchain");
      }
      logger.info(
        { method, methodId, transactionId, transactionHash: approveReceipt.transactionHash },
        "Mined approve tx",
      );
      evts.SenderTokenApprovalMined.post({
        assetId: sendingAssetId,
        chainId: sendingChainId,
        transactionReceipt: approveReceipt,
      });
    }
  }

  const prepareTx = await transactionManager
    .connect(signer)
    .prepare(
      transaction,
      amount,
      expiry,
      encryptedCallData,
      encodedBid,
      bidSignature,
      transaction.sendingAssetId === constants.AddressZero ? { value: amount } : { value: 0 },
    );
  evts.SenderTransactionPrepareSubmitted.post({
    prepareParams: params,
    transactionResponse: prepareTx,
  });

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

export const cancel = async (
  params: CancelParams,
  transactionManager: TransactionManager,
  signer: Signer,
  logger: BaseLogger,
): Promise<providers.TransactionReceipt> => {
  const method = "cancel";
  const methodId = getRandomBytes32();
  logger.info({ method, methodId, params }, "Method start");

  const { txData, relayerFee, signature } = params;

  // TODO: validate bid stuff

  logger.info(
    {
      method,
      methodId,
      txData,
      transactionManager: transactionManager.address,
    },
    "Cancelling tx!",
  );

  const cancelTx = await transactionManager.connect(signer).cancel(txData, relayerFee, signature);

  // TODO: fix block confs for chains
  logger.info(
    { method, methodId, transactionId: txData.transactionId, transactionHash: cancelTx.hash },
    "Submitted cancel tx",
  );
  const cancelReceipt = await cancelTx.wait(1);
  if (cancelReceipt.status === 0) {
    throw new Error("cancel transaction reverted onchain");
  }
  logger.info(
    { method, methodId, transactionId: txData.transactionId, transactionHash: cancelReceipt.transactionHash },
    "Mined cancel tx",
  );
  logger.info({ method, methodId }, "Method complete");
  return cancelReceipt as providers.TransactionReceipt;
};

export const handleReceiverPrepare = async (
  params: TransactionPreparedEvent,
  transactionManager: Contract,
  signer: Signer,
  messaging: UserNxtpNatsMessagingService,
  logger: BaseLogger,
): Promise<void> => {
  const method = "handleReceiverPrepare";
  const methodId = getRandomBytes32();
  logger.info({ method, methodId, txData: params.txData, encryptedCallData: params.encryptedCallData }, "Method start");

  const { txData, encryptedCallData } = params;

  // TODO
  const relayerFee = "0";

  // Generate signature
  logger.info({ method, methodId, transactionId: params.txData.transactionId }, "Generating fulfill signature");
  const signature = await signFulfillTransactionPayload(txData, relayerFee, signer);
  logger.info({ method, methodId }, "Generated signature");

  // Make sure user is on the receiving chain

  // Submit fulfill to receiver chain
  logger.info({ method, methodId, transactionId: txData.transactionId, relayerFee }, "Preparing fulfill tx");

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

  let callData = "0x";
  if (txData.callDataHash !== utils.keccak256(callData)) {
    callData = await ethereum.request({
      method: "eth_decrypt",
      params: [encryptedCallData, txData.user],
    });
  }

  await messaging.publishMetaTxRequest(
    {
      type: "Fulfill",
      relayerFee,
      to: transactionManager.address,
      chainId: txData.receivingChainId,
      data: {
        relayerFee,
        signature,
        txData,
        callData,
      },
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

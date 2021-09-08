import {
  CancelParams,
  createLoggingContext,
  FulfillParams,
  PrepareParams,
  RequestContext,
  getInvariantTransactionDigest,
  getVariantTransactionDigest,
  InvariantTransactionData,
  TransactionData,
} from "@connext/nxtp-utils";
import { constants, providers } from "ethers/lib/ethers";
import { Interface } from "ethers/lib/utils";
import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";

import { getContext } from "../../router";

export const getContractAddress = (chainId: number): string => {
  const { config } = getContext();
  const nxtpContractAddress = config.chainConfig[chainId]?.transactionManagerAddress;
  if (!nxtpContractAddress) {
    throw new Error(`No contract exists for chain ${chainId}`);
  }
  return nxtpContractAddress;
};

export const getTxManagerInterface = () =>
  new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];

export const prepareSanitationCheck = async (
  chainId: number,
  nxtpContractAddress: string,
  invariantTransactionData: InvariantTransactionData,
) => {
  const { txService, logger } = getContext();

  const invariantDigest = getInvariantTransactionDigest(invariantTransactionData);
  const encodeVariantTransactionData = getTxManagerInterface().encodeFunctionData("variantTransactionData", [
    invariantDigest,
  ]);

  const variantTransactionDigest = await txService.readTx({
    chainId,
    to: nxtpContractAddress,
    data: encodeVariantTransactionData,
  });

  // variantTransactionDigest exist then transaction is already prepared
  if (variantTransactionDigest) {
    logger.error("FAILED prepareSanitationCheck THIS SHOULD NOT HAPPEN, FIGURE THIS OUT");
    throw new Error("Transaction is already prepared");
  }
};

export const cancelAndFullfillSanitationCheck = async (
  chainId: number,
  nxtpContractAddress: string,
  transactionData: TransactionData,
) => {
  const { txService, logger } = getContext();

  const invariantDigest = getInvariantTransactionDigest({
    receivingChainTxManagerAddress: transactionData.receivingChainTxManagerAddress,
    user: transactionData.user,
    router: transactionData.router,
    sendingAssetId: transactionData.sendingAssetId,
    receivingAssetId: transactionData.receivingAssetId,
    sendingChainFallback: transactionData.sendingChainFallback,
    callTo: transactionData.callTo,
    receivingAddress: transactionData.receivingAddress,
    sendingChainId: transactionData.sendingChainId,
    receivingChainId: transactionData.receivingChainId,
    callDataHash: transactionData.callDataHash,
    transactionId: transactionData.transactionId,
  });
  const expectedVariantDigest = getVariantTransactionDigest({
    amount: transactionData.amount,
    expiry: transactionData.expiry,
    preparedBlockNumber: transactionData.preparedBlockNumber,
  });
  const encodeVariantTransactionData = getTxManagerInterface().encodeFunctionData("variantTransactionData", [
    invariantDigest,
  ]);

  const variantTransactionDigest = await txService.readTx({
    chainId,
    to: nxtpContractAddress,
    data: encodeVariantTransactionData,
  });

  // transaction should be prepared before fulfill
  if (!variantTransactionDigest) {
    logger.error(
      "FAILED cancelAndFullfillSanitationCheck THIS SHOULD NOT HAPPEN, FIGURE THIS OUT: Transaction isn't prepared yet",
    );
    throw new Error("Transaction isn't prepared yet");
  }

  // transaction is already fulfilled
  if (expectedVariantDigest !== variantTransactionDigest) {
    logger.error(
      "FAILED cancelAndFullfillSanitationCheck THIS SHOULD NOT HAPPEN, FIGURE THIS OUT: Transaction is already fulfilled or canceled",
    );
    throw new Error("Transaction is already fulfilled or canceled");
  }
};
/**
 * Method calls `prepare` on the `TransactionManager` on the given chain. Should be used to `prepare` the receiver-side transaction. Resolves when the transaction has been mined.
 *
 * @param chainId - The chain you are preparing a transaction on
 * @param prepareParams - Arguments to supply to contract
 * @param prepareParams.txData - The `InvariantTransactionData` for the transaction being prepared
 * @param prepareParams.amount - The amount to be deducted from the liquidity held by the router on the TransactionManager
 * @param prepareParams.expiry - The timestamp the transaction will expire by
 * @param prepareParams.encryptedCallData - The user-encrypted calldata to be executed on the receiving chain
 * @param prepareParams.encodedBid - The encoded auction bid
 * @param prepareParams.bidSignature - The signature on the winning bid
 *
 * @returns If successful, returns `TransactionReceipt` from the prepare transaction sent to the `TransactionManager.sol`. If it fails, returns a `TransactionManagerError`
 *
 */
export const prepare = async (
  chainId: number,
  prepareParams: PrepareParams,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(prepare.name);

  const { logger, txService, wallet } = getContext();
  logger.info("Method start", requestContext, methodContext, { prepareParams });

  const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

  const nxtpContractAddress = getContractAddress(chainId);

  await prepareSanitationCheck(chainId, nxtpContractAddress, txData);

  const encodedData = getTxManagerInterface().encodeFunctionData("prepare", [
    txData,
    amount,
    expiry,
    encryptedCallData,
    encodedBid,
    bidSignature,
  ]);

  return await txService.sendTx(
    {
      to: nxtpContractAddress,
      data: encodedData,
      value: constants.Zero,
      chainId,
      from: wallet.address,
    },
    requestContext,
  );
};

export const fulfill = async (
  chainId: number,
  fulfillParams: FulfillParams,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(fulfill.name);

  const { logger, txService, wallet } = getContext();
  logger.info("", requestContext, methodContext);

  const { txData, relayerFee, signature, callData } = fulfillParams;

  const nxtpContractAddress = getContractAddress(chainId);

  await cancelAndFullfillSanitationCheck(chainId, nxtpContractAddress, txData);

  const encodedData = getTxManagerInterface().encodeFunctionData("fulfill", [txData, relayerFee, signature, callData]);

  return await txService.sendTx(
    {
      to: nxtpContractAddress,
      data: encodedData,
      value: constants.Zero,
      chainId,
      from: wallet.address,
    },
    requestContext,
  );
};

export const cancel = async (
  chainId: number,
  cancelParams: CancelParams,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(cancel.name);

  const { logger, txService, wallet } = getContext();
  logger.info("Method start", requestContext, methodContext, { cancelParams });

  const { txData, signature } = cancelParams;

  const nxtpContractAddress = getContractAddress(chainId);

  await cancelAndFullfillSanitationCheck(chainId, nxtpContractAddress, txData);

  const encodedData = getTxManagerInterface().encodeFunctionData("cancel", [txData, signature]);

  return await txService.sendTx(
    {
      to: nxtpContractAddress,
      data: encodedData,
      value: constants.Zero,
      chainId,
      from: wallet.address,
    },
    requestContext,
  );
};

/**
 * Removes liquidity from the `TransactionManager` on the provided chain.
 *
 * @param chainId - The chain to interact with
 * @param amount - The amount of liquidity you want to remove
 * @param assetId - The assetId (token address or address(0) for native asset) of the asset you'd like to remove liquidity from onchain.
 * @param recipientAddress - The address you'd like the funds to be sent to
 * @returns If successful, returns `TransactionReceipt` for the removeLiquidity transaction. If it fails, returns a `TransactionManagerError`
 */
export const removeLiquidity = async (
  chainId: number,
  amount: string,
  assetId: string,
  recipientAddress: string | undefined,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(removeLiquidity.name);

  const { logger, txService, wallet } = getContext();

  logger.info("Method start", requestContext, methodContext, { amount, assetId, recipientAddress });

  if (!recipientAddress) {
    recipientAddress = wallet.address;
  }

  const nxtpContractAddress = getContractAddress(chainId);

  const encodedData = getTxManagerInterface().encodeFunctionData("removeLiquidity", [
    amount,
    assetId,
    recipientAddress,
  ]);
  return await txService.sendTx(
    {
      to: nxtpContractAddress,
      data: encodedData,
      value: constants.Zero,
      chainId,
      from: wallet.address,
    },
    requestContext,
  );
};

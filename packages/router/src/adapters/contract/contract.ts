import { CancelParams, FulfillParams, getUuid, PrepareParams, RequestContext } from "@connext/nxtp-utils";
import { constants, providers } from "ethers/lib/ethers";
import { Interface } from "ethers/lib/utils";
import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";

import { getContext } from "../..";
import { TransactionManagerError } from "../../contract";

const getContractAddress = (chainId: number): string => {
  const method = "getContractAddress ";
  const methodId = getUuid();
  const { config } = getContext();
  const nxtpContractAddress = config.chainConfig[chainId].transactionManagerAddress;
  if (!nxtpContractAddress) {
    throw new TransactionManagerError(TransactionManagerError.reasons.NoTransactionManagerAddress, {
      chainId,
      configError: "No contract exists for chain",
      methodId,
      method,
    });
  }
  return nxtpContractAddress;
};

const txManagerInterface = new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];

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
  const method = "prepare ";
  const methodId = getUuid();

  const { logger, txService, wallet } = getContext();
  logger.info({ method, methodId, requestContext, prepareParams }, "Method start");

  const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

  const nxtpContractAddress = getContractAddress(chainId);

  const encodedData = txManagerInterface.encodeFunctionData("prepare", [
    {
      user: txData.user,
      router: txData.router,
      sendingAssetId: txData.sendingAssetId,
      receivingAssetId: txData.receivingAssetId,
      sendingChainFallback: txData.sendingChainFallback,
      callTo: txData.callTo,
      receivingAddress: txData.receivingAddress,
      sendingChainId: txData.sendingChainId,
      receivingChainId: txData.receivingChainId,
      callDataHash: txData.callDataHash,
      transactionId: txData.transactionId,
    },
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
  const method = "prepare ";
  const methodId = getUuid();

  const { logger, txService, wallet } = getContext();
  logger.info({ method, methodId, fulfillParams }, "Method start");

  const { txData, relayerFee, signature, callData } = fulfillParams;

  const nxtpContractAddress = getContractAddress(chainId);

  const encodedData = txManagerInterface.encodeFunctionData("fulfill", [txData, relayerFee, signature, callData]);

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
  const method = "prepare ";
  const methodId = getUuid();

  const { logger, txService, wallet } = getContext();
  logger.info({ method, methodId, cancelParams }, "Method start");

  const { txData, relayerFee, signature } = cancelParams;

  const nxtpContractAddress = getContractAddress(chainId);

  const encodedData = txManagerInterface.encodeFunctionData("cancel", [txData, relayerFee, signature]);

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

import {
  CancelParams,
  createLoggingContext,
  FulfillParams,
  PrepareParams,
  RequestContext,
  isChainSupportedByGelato,
  gelatoSend,
  signRouterPrepareTransactionPayload,
  NxtpError,
} from "@connext/nxtp-utils";
import { BigNumber, constants, providers } from "ethers/lib/ethers";

import { getContext } from "../../router";
import {
  getContractAddress,
  getTxManagerInterface,
  sanitationCheck,
  getRouterContractInterface,
  prepareEvt,
} from "../../lib/helpers";

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

  const { logger, txService, wallet, config } = getContext();
  logger.info("Method start", requestContext, methodContext, { prepareParams });

  const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

  // send to gelato service
  const routerContractAddress = config.chainConfig[chainId]?.routerContractAddress;
  if (
    routerContractAddress &&
    routerContractAddress === txData.router &&
    isChainSupportedByGelato(chainId) &&
    chainId === txData.receivingChainId
  ) {
    const signature = await signRouterPrepareTransactionPayload(
      txData,
      amount,
      expiry,
      encryptedCallData,
      encodedBid,
      bidSignature,
      "0x",
      wallet,
    );
    const encodedData = getRouterContractInterface().encodeFunctionData("prepare", [
      {
        invariantData: txData,
        amount,
        expiry,
        encryptedCallData,
        encodedBid,
        bidSignature,
        encodedMeta: "0x",
      },
      signature,
    ]);

    try {
      await gelatoSend(chainId, routerContractAddress, encodedData, txData.receivingAssetId, "0");
    } catch (err) {
      logger.error("gelato send failed", requestContext, methodContext, err as NxtpError, { prepareParams });

      /// TODO fallback to metaTx routerContractPrepare
    }

    // listen for event on contract
    const { event } = await prepareEvt
      .pipe(({ args }) => args.txData.transactionId === txData.transactionId)
      .waitFor(300_000);
    const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
    return receipt;
  } else {
    const nxtpContractAddress = getContractAddress(chainId);
    const encodedData = getTxManagerInterface().encodeFunctionData("prepare", [
      {
        invariantData: txData,
        amount,
        expiry,
        encryptedCallData,
        encodedBid,
        bidSignature,
        encodedMeta: "0x",
      },
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
  }
};

export const fulfill = async (
  chainId: number,
  fulfillParams: FulfillParams,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(fulfill.name);

  const { logger, txService, wallet } = getContext();
  logger.info("Method start", requestContext, methodContext);

  const { txData, relayerFee, signature, callData } = fulfillParams;

  const nxtpContractAddress = getContractAddress(chainId);

  await sanitationCheck(chainId, txData, "fulfill");

  const encodedData = getTxManagerInterface().encodeFunctionData("fulfill", [
    { txData, relayerFee, signature, callData, encodedMeta: "0x" },
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

  await sanitationCheck(chainId, txData, "cancel");

  const encodedData = getTxManagerInterface().encodeFunctionData("cancel", [{ txData, signature, encodedMeta: "0x" }]);

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
  const { methodContext } = createLoggingContext(removeLiquidity.name, requestContext);

  const { logger, txService, wallet } = getContext();

  logger.info("Method start", requestContext, methodContext, { amount, assetId, recipientAddress });

  if (!recipientAddress) {
    recipientAddress = await wallet.getAddress();
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

export const getRouterBalance = async (chainId: number, router: string, assetId: string): Promise<BigNumber> => {
  const { txService } = getContext();

  const nxtpContractAddress = getContractAddress(chainId);

  const encodedData = getTxManagerInterface().encodeFunctionData("routerBalances", [router, assetId]);
  const ret = await txService.readTx({
    to: nxtpContractAddress,
    data: encodedData,
    chainId,
  });
  return BigNumber.from(ret);
};

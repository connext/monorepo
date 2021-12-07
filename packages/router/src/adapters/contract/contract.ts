import {
  CancelParams,
  createLoggingContext,
  FulfillParams,
  PrepareParams,
  RequestContext,
  isChainSupportedByGelato,
  gelatoSend,
  signRouterPrepareTransactionPayload,
  signRouterCancelTransactionPayload,
  signRouterFulfillTransactionPayload,
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
  cancelEvt,
  fulfillEvt,
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
export const prepareTransactionManager = async (
  chainId: number,
  prepareParams: PrepareParams,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(prepareTransactionManager.name);

  const { logger, txService, wallet } = getContext();
  logger.info("Method start", requestContext, methodContext, {
    prepareParams,
  });

  const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

  await sanitationCheck(chainId, { ...txData, amount: "0", expiry: 0, preparedBlockNumber: 0 }, "prepare");

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
};

export const prepareRouterContract = async (
  chainId: number,
  prepareParams: PrepareParams,
  routerContractAddress: string,
  signature: string,
  routerRelayerFeeAsset: string,
  routerRelayerFee: string,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(prepareRouterContract.name);

  const { logger, txService, wallet } = getContext();
  logger.info("Method start", requestContext, methodContext, {
    prepareParams,
    routerRelayerFeeAsset,
    routerRelayerFee,
  });

  const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

  await sanitationCheck(chainId, { ...txData, amount: "0", expiry: 0, preparedBlockNumber: 0 }, "prepare");

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
    routerRelayerFeeAsset,
    routerRelayerFee,
    signature,
  ]);

  if (isChainSupportedByGelato(chainId) && chainId === txData.receivingChainId) {
    logger.info("gelato prepare", requestContext, methodContext, {
      prepareParams,
      routerRelayerFeeAsset,
      routerRelayerFee,
    });

    try {
      const data = await gelatoSend(
        chainId,
        routerContractAddress,
        encodedData,
        routerRelayerFeeAsset,
        routerRelayerFee,
      );
      if (!data.taskId) {
        throw new Error("No taskId returned");
      }
      logger.info("Submitted prepare using Gelato Relayer", requestContext, methodContext, { data });
    } catch (err) {
      logger.error("gelato send failed", requestContext, methodContext, err as NxtpError, { prepareParams });
      /// TODO fallback to metaTx
    }

    // listen for event on contract
    const { event } = await prepareEvt
      .pipe(({ args }) => args.txData.transactionId === txData.transactionId)
      .waitFor(300_000);
    const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
    return receipt;
  } else {
    logger.info("router contract prepare", requestContext, methodContext, { prepareParams });

    return await txService.sendTx(
      {
        to: routerContractAddress,
        data: encodedData,
        value: constants.Zero,
        chainId,
        from: wallet.address,
      },
      requestContext,
    );
  }
};

export const fulfillTransactionManager = async (
  chainId: number,
  fulfillParams: FulfillParams,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(fulfillTransactionManager.name);

  const { logger, txService, wallet } = getContext();
  logger.info("Method start", requestContext, methodContext);

  const { txData, relayerFee, signature: fulfillSignature, callData } = fulfillParams;

  await sanitationCheck(chainId, txData, "fulfill");

  const nxtpContractAddress = getContractAddress(chainId);

  const encodedData = getTxManagerInterface().encodeFunctionData("fulfill", [
    { txData, relayerFee, signature: fulfillSignature, callData, encodedMeta: "0x" },
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

export const fulfillRouterContract = async (
  chainId: number,
  fulfillParams: FulfillParams,
  routerContractAddress: string,
  signature: string,
  routerRelayerFeeAsset: string,
  routerRelayerFee: string,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(fulfillRouterContract.name);

  const { logger, txService } = getContext();
  logger.info("Method start", requestContext, methodContext);

  const { txData, relayerFee, signature: fulfillSignature, callData } = fulfillParams;

  await sanitationCheck(chainId, txData, "fulfill");

  // if (routerRelayerFeeAsset && routerRelayerFee) {
  // for router contract
  const signature = await signRouterFulfillTransactionPayload(
    txData,
    fulfillSignature,
    callData,
    "0x",
    routerRelayerFeeAsset,
    routerRelayerFee,
    wallet,
  );
  const encodedData = getRouterContractInterface().encodeFunctionData("fulfill", [
    {
      txData,
      relayerFee,
      signature: fulfillSignature,
      callData,
      encodedMeta: "0x",
    },
    routerRelayerFeeAsset,
    routerRelayerFee,
    signature,
  ]);

  if (isChainSupportedByGelato(chainId)) {
    logger.info("submit router contract fulfill using Gelato Relayer", requestContext, methodContext, {
      fulfillParams,
    });
    try {
      const data = await gelatoSend(chainId, routerAddress, encodedData, txData.receivingAssetId, "0");
      if (!data.taskId) {
        throw new Error("No taskId returned");
      }
      logger.info("Submitted router contract fulfill using Gelato Relayer", requestContext, methodContext, {
        data,
      });

      // listen for event on contract
      const { event } = await fulfillEvt
        .pipe(({ args }) => args.txData.transactionId === txData.transactionId)
        .waitFor(300_000);
      const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
      return receipt;
    } catch (err) {
      logger.error(
        "failed router contract fulfill using Gelato Relayer",
        requestContext,
        methodContext,
        err as NxtpError,
        {
          fulfillParams,
        },
      );
    }
  }

  /// TODO fallback to metaTx
  // listen for event on contract
  const { event } = await fulfillEvt
    .pipe(({ args }) => args.txData.transactionId === txData.transactionId)
    .waitFor(300_000);
  const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
  return receipt;
  // }
};

export const cancelTransactionManager = async (
  chainId: number,
  cancelParams: CancelParams,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(cancelTransactionManager.name);

  const { logger, txService, wallet } = getContext();
  logger.info("Method start", requestContext, methodContext, { cancelParams });

  const { txData, signature: cancelSignature } = cancelParams;
  await sanitationCheck(chainId, txData, "cancel");

  const nxtpContractAddress = getContractAddress(chainId);

  const encodedData = getTxManagerInterface().encodeFunctionData("cancel", [
    { txData, signature: cancelSignature, encodedMeta: "0x" },
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

export const cancelRouterContract = async (
  chainId: number,
  cancelParams: CancelParams,
  routerRelayerFeeAsset: string,
  routerRelayerFee: string,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(cancelRouterContract.name);

  const { logger, txService, wallet, routerAddress } = getContext();
  logger.info("Method start", requestContext, methodContext, { cancelParams });

  const { txData, signature: cancelSignature } = cancelParams;
  await sanitationCheck(chainId, txData, "cancel");

  // if (isRouterContract && chainId === txData.receivingChainId) {
  const signature = await signRouterCancelTransactionPayload(
    txData,
    cancelSignature,
    "0x",
    routerRelayerFeeAsset,
    routerRelayerFee,
    wallet,
  );
  const encodedData = getRouterContractInterface().encodeFunctionData("cancel", [
    {
      txData,
      signature: cancelSignature,
      encodedMeta: "0x",
    },
    routerRelayerFeeAsset,
    routerRelayerFee,
    signature,
  ]);

  if (isChainSupportedByGelato(chainId)) {
    logger.info("submit router contract cancel using Gelato Relayer", requestContext, methodContext, {
      cancelParams,
    });
    try {
      const data = await gelatoSend(chainId, routerAddress, encodedData, routerRelayerFeeAsset, routerRelayerFee);
      if (!data.taskId) {
        throw new Error("No taskId returned");
      }
      logger.info("Submitted router contract cancel using Gelato Relayer", requestContext, methodContext, { data });
    } catch (err) {
      logger.error(
        "failed router contract cancel using Gelato Relayer",
        requestContext,
        methodContext,
        err as NxtpError,
        {
          cancelParams,
        },
      );
      /// TODO fallback to metaTx
    }

    // listen for event on contract
    const { event } = await cancelEvt
      .pipe(({ args }) => args.txData.transactionId === txData.transactionId)
      .waitFor(300_000);
    const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
    return receipt;
  } else {
    logger.info("router contract cancel", requestContext, methodContext, { cancelParams });

    return await txService.sendTx(
      {
        to: routerAddress,
        data: encodedData,
        value: constants.Zero,
        chainId,
        from: wallet.address,
      },
      requestContext,
    );
  }
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
export const removeLiquidityTransactionManager = async (
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

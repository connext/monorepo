import {
  CancelParams,
  createLoggingContext,
  FulfillParams,
  PrepareParams,
  RequestContext,
  isChainSupportedByGelato,
  gelatoSend,
  MetaTxTypes,
  jsonifyError,
} from "@connext/nxtp-utils";
import { BigNumber, constants, Contract, providers, utils } from "ethers/lib/ethers";
import { Evt } from "evt";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain";

import { getContext } from "../../router";
import {
  getContractAddress,
  getTxManagerInterface,
  sanitationCheck,
  getRouterContractInterface,
} from "../../lib/helpers";

export const prepareEvt = new Evt<{ event: any; args: PrepareParams; chainId: number }>(); // TODO: fix types
export const fulfillEvt = new Evt<{ event: any; args: FulfillParams; chainId: number }>();
export const cancelEvt = new Evt<{ event: any; args: CancelParams; chainId: number }>();

export const startContractListeners = (): void => {
  const { config, txService, logger } = getContext();
  Object.entries(config.chainConfig).forEach(async ([_chainId, conf]) => {
    const chainId = Number(_chainId);
    if (config.routerContractAddress) {
      // needs event listeners for listening to relayed events
      // TODO remove this when we can query gelato for tx receipts
      // alternatively allow listening on the subgraph
      const contract = new Contract(
        conf.transactionManagerAddress,
        TransactionManagerArtifact.abi,
        txService.getProvider(chainId).fallbackProvider,
      ) as TTransactionManager;
      contract.on("TransactionPrepared", (_user, _router, _transactionId, _txData, _caller, args, event) => {
        if (utils.getAddress(config.routerContractAddress!) === utils.getAddress(_router)) {
          prepareEvt.post({
            event,
            args: {
              amount: args.amount,
              bidSignature: args.bidSignature,
              encodedBid: args.encodedBid,
              encryptedCallData: args.encryptedCallData,
              expiry: args.expiry,
              txData: {
                callDataHash: args.invariantData.callDataHash,
                initiator: args.invariantData.initiator,
                receivingAssetId: args.invariantData.receivingAssetId,
                receivingChainId: args.invariantData.receivingChainId,
                sendingChainId: args.invariantData.sendingChainId,
                callTo: args.invariantData.callTo,
                receivingAddress: args.invariantData.receivingAddress,
                receivingChainTxManagerAddress: args.invariantData.receivingChainTxManagerAddress,
                router: args.invariantData.router,
                sendingAssetId: args.invariantData.sendingAssetId,
                sendingChainFallback: args.invariantData.sendingChainFallback,
                transactionId: args.invariantData.transactionId,
                user: args.invariantData.user,
              },
            },
            chainId,
          });
        }
      });
      contract.on(
        "TransactionFulfilled",
        (_user, _router, _transactionId, args, _success, _isContract, _returnData, _caller, event) => {
          if (utils.getAddress(config.routerContractAddress!) === utils.getAddress(_router)) {
            fulfillEvt.post({
              event,
              args: {
                callData: args.callData,
                signature: args.signature,
                relayerFee: args.relayerFee,
                txData: {
                  callDataHash: args.txData.callDataHash,
                  initiator: args.txData.initiator,
                  receivingAssetId: args.txData.receivingAssetId,
                  receivingChainId: args.txData.receivingChainId,
                  sendingChainId: args.txData.sendingChainId,
                  callTo: args.txData.callTo,
                  receivingAddress: args.txData.receivingAddress,
                  receivingChainTxManagerAddress: args.txData.receivingChainTxManagerAddress,
                  router: args.txData.router,
                  sendingAssetId: args.txData.sendingAssetId,
                  sendingChainFallback: args.txData.sendingChainFallback,
                  transactionId: args.txData.transactionId,
                  user: args.txData.user,
                  amount: args.txData.amount,
                  expiry: args.txData.expiry,
                  preparedBlockNumber: args.txData.preparedBlockNumber,
                },
              },
              chainId,
            });
          }
        },
      );
      contract.on("TransactionCancelled", (_user, _router, _transactionId, args, _caller, event) => {
        if (utils.getAddress(config.routerContractAddress!) === utils.getAddress(_router)) {
          cancelEvt.post({
            event,
            args: {
              signature: args.signature,
              txData: {
                callDataHash: args.txData.callDataHash,
                initiator: args.txData.initiator,
                receivingAssetId: args.txData.receivingAssetId,
                receivingChainId: args.txData.receivingChainId,
                sendingChainId: args.txData.sendingChainId,
                callTo: args.txData.callTo,
                receivingAddress: args.txData.receivingAddress,
                receivingChainTxManagerAddress: args.txData.receivingChainTxManagerAddress,
                router: args.txData.router,
                sendingAssetId: args.txData.sendingAssetId,
                sendingChainFallback: args.txData.sendingChainFallback,
                transactionId: args.txData.transactionId,
                user: args.txData.user,
                amount: args.txData.amount,
                expiry: args.txData.expiry,
                preparedBlockNumber: args.txData.preparedBlockNumber,
              },
            },
            chainId,
          });
        }
      });
    }
  });
  logger.info("Started listening for events on TransactionManager");
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
  useRelayer: boolean,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(prepareRouterContract.name);

  const { logger, txService, wallet, messaging } = getContext();
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

  if (useRelayer) {
    if (isChainSupportedByGelato(chainId)) {
      logger.info("Gelato prepare", requestContext, methodContext, {
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

        // listen for event on contract
        const { event } = await prepareEvt
          .pipe(({ args }) => args.txData.transactionId === txData.transactionId)
          .waitFor(300_000);
        const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
        return receipt;
      } catch (err) {
        logger.warn("gelato send failed, falling back to router network", requestContext, methodContext, {
          err: jsonifyError(err),
        });
      }
    }

    await messaging.publishMetaTxRequest({
      chainId,
      to: routerContractAddress,
      type: MetaTxTypes.RouterContractPrepare,
      data: { params: prepareParams, signature, relayerFee: routerRelayerFee, relayerFeeAsset: routerRelayerFeeAsset },
    });

    // listen for event on contract
    const { event } = await prepareEvt
      .pipe(({ args }) => args.txData.transactionId === txData.transactionId)
      .waitFor(300_000);
    const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
    return receipt;
  } else {
    logger.info("Router contract prepare", requestContext, methodContext, { prepareParams });

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
  useRelayer: boolean,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(fulfillRouterContract.name);

  const { logger, txService, wallet, messaging } = getContext();
  logger.info("Method start", requestContext, methodContext, {
    fulfillParams,
    routerRelayerFeeAsset,
    routerRelayerFee,
  });

  const { txData, relayerFee, signature: fulfillSignature, callData } = fulfillParams;

  await sanitationCheck(chainId, { ...txData, amount: "0", expiry: 0, preparedBlockNumber: 0 }, "fulfill");

  const encodedData = getRouterContractInterface().encodeFunctionData("fulfill", [
    { txData, relayerFee, signature: fulfillSignature, callData, encodedMeta: "0x" },
    routerRelayerFeeAsset,
    routerRelayerFee,
    signature,
  ]);

  if (useRelayer) {
    if (isChainSupportedByGelato(chainId)) {
      logger.info("Gelato fulfill", requestContext, methodContext, {
        fulfillParams,
        routerContractAddress,
        signature,
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
        logger.info("Submitted fulfill using Gelato Relayer", requestContext, methodContext, { data });

        // listen for event on contract
        const { event } = await fulfillEvt
          .pipe(({ args }) => args.txData.transactionId === txData.transactionId)
          .waitFor(300_000);
        const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
        return receipt;
      } catch (err) {
        logger.warn("Gelato send failed, falling back to router network", requestContext, methodContext, {
          err: jsonifyError(err),
        });
      }
    }

    await messaging.publishMetaTxRequest({
      chainId,
      to: routerContractAddress,
      type: MetaTxTypes.RouterContractFulfill,
      data: { params: fulfillParams, signature, relayerFee: routerRelayerFee, relayerFeeAsset: routerRelayerFeeAsset },
    });

    // listen for event on contract
    const { event } = await fulfillEvt
      .pipe(({ args }) => args.txData.transactionId === txData.transactionId)
      .waitFor(300_000);
    const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
    return receipt;
  } else {
    logger.info("Router contract fulfill", requestContext, methodContext, { fulfillParams });

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
  routerContractAddress: string,
  signature: string,
  routerRelayerFeeAsset: string,
  routerRelayerFee: string,
  useRelayer: boolean,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(cancelRouterContract.name);

  const { logger, txService, wallet, messaging } = getContext();
  logger.info("Method start", requestContext, methodContext, {
    cancelParams,
    routerRelayerFeeAsset,
    routerRelayerFee,
  });

  const { txData, signature: cancelSignature } = cancelParams;

  await sanitationCheck(chainId, { ...txData, amount: "0", expiry: 0, preparedBlockNumber: 0 }, "prepare");

  const encodedData = getRouterContractInterface().encodeFunctionData("cancel", [
    { txData, signature: cancelSignature, encodedMeta: "0x" },
    routerRelayerFeeAsset,
    routerRelayerFee,
    signature,
  ]);

  if (useRelayer) {
    if (isChainSupportedByGelato(chainId)) {
      logger.info("Gelato cancel", requestContext, methodContext, {
        cancelParams,
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
        logger.info("Submitted cancel using Gelato Relayer", requestContext, methodContext, { data });

        // listen for event on contract
        const { event } = await cancelEvt
          .pipe(({ args }) => args.txData.transactionId === txData.transactionId)
          .waitFor(300_000);
        const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
        return receipt;
      } catch (err) {
        logger.warn("Gelato send failed, falling back to router network", requestContext, methodContext, {
          err: jsonifyError(err),
        });
      }
    }

    await messaging.publishMetaTxRequest({
      chainId,
      to: routerContractAddress,
      type: MetaTxTypes.RouterContractCancel,
      data: {
        params: cancelParams,
        signature,
        relayerFee: routerRelayerFee,
        relayerFeeAsset: routerRelayerFeeAsset,
      },
    });

    // listen for event on contract
    const { event } = await cancelEvt
      .pipe(({ args }) => args.txData.transactionId === txData.transactionId)
      .waitFor(300_000);
    const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
    return receipt;
  } else {
    logger.info("Router contract cancel", requestContext, methodContext, { cancelParams });

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
  const { methodContext } = createLoggingContext(removeLiquidityTransactionManager.name, requestContext);

  const { logger, txService, wallet, signerAddress } = getContext();

  logger.info("Method start", requestContext, methodContext, { amount, assetId, recipientAddress });

  if (!recipientAddress) {
    recipientAddress = signerAddress;
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

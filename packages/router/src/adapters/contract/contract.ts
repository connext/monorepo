import {
  CancelParams,
  createLoggingContext,
  FulfillParams,
  PrepareParams,
  RequestContext,
  isChainSupportedByGelato as _isChainSupportedByGelato,
  gelatoSend as _gelatoSend,
  MetaTxTypes,
  jsonifyError,
  MetaTxPayloads,
  RemoveLiquidityParams,
  InvariantTransactionData,
  TransactionData,
  MethodContext,
} from "@connext/nxtp-utils";
import { BigNumber, constants, Contract, providers, utils } from "ethers";
import { Evt } from "evt";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain";

import { getContext } from "../../router";
import {
  getContractAddress,
  getTxManagerInterface,
  getErc20ContractInterface,
  sanitationCheck,
  isRouterWhitelisted,
  getRouterContractInterface,
  incrementGasConsumed,
} from "../../lib/helpers";
import { TransactionReason, TransactionReasons } from "../../lib/entities";
import { incrementRelayerFeesPaid } from "../../lib/helpers/metrics";

export const prepareEvt = new Evt<{ event: any; args: PrepareParams; chainId: number }>(); // TODO: fix types
export const fulfillEvt = new Evt<{ event: any; args: FulfillParams; chainId: number }>();
export const cancelEvt = new Evt<{ event: any; args: CancelParams; chainId: number }>();
export const removeLiquidityEvt = new Evt<{
  event: any;
  args: RemoveLiquidityParams;
  chainId: number;
}>();

// FOR MOCK TEST
export const isChainSupportedByGelato = _isChainSupportedByGelato;
export const gelatoSend = _gelatoSend;

/**
 * Helper method for waiting for relayer transaction go through using event handling. Retrieves the receipt afterwards
 * and increments the amount spent on relayer fees.
 *
 * @param chainId - Chain ID of the transaction.
 * @param transactionId - Transaction ID of the transaction to wait for.
 * @param evt - Event to wait for.
 * @param relayerFee - Relayer fee amount.
 * @param relayerFeeAsset - Relayer fee asset ID.
 * @param reason - Reason for the transaction (i.e. transaction type).
 * @param requestContext - Request context.
 * @returns TransactionReceipt of the transaction (if it's successful).
 * @throws Timeout error if the event is not emitted within the timeout period.
 */
const waitForRelayer = async (
  chainId: number,
  transactionId: string | undefined,
  evt: Evt<any>,
  relayerFee: {
    asset: string;
    amount: string;
  },
  reason: TransactionReason,
  requestContext: RequestContext,
) => {
  const { txService } = getContext();
  // Listen for event on contract.
  const { event } = transactionId
    ? await evt.pipe(({ args }) => args.txData.transactionId === transactionId).waitFor(300_000)
    : await evt.waitFor(300_000);
  // Retrieve the receipt.
  const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
  // If we get a receipt back, then the relayer tx was successful (and the relayer got paid).
  incrementRelayerFeesPaid(chainId, relayerFee.amount, relayerFee.asset, reason, requestContext);
  return receipt;
};

/**
 * Helper to execute a router contract transaction, first trying relayers (if applicable) and then
 * resorting to using the router signer with txservice to send if relayers are unavailable.
 *
 * @param args.chainId - Chain ID of the transaction.
 * @param args.routerContractAddress - Address of the router contract.
 * @param args.encodedData - Encoded data belonging to the transaction.
 * @param args.params - Params for the transaction's metatx payload.
 * @param args.signature - Router's signature to relay.
 * @param args.relayerFee (optional) - Relayer fee info. If undefined, we assume relayers will not be used.
 * @param args.relayerFee.amount - Relayer fee amount to be paid.
 * @param args.relayerFee.asset - Relayer fee asset ID.
 * @param args.reason - Reason for the transaction (i.e. transaction type).
 * @param methodContext - Method context used for logging.
 * @param requestContext - Request context used for logging.
 *
 * @returns TransactionReceipt of the transaction (if it's successful).
 * @throws Errors if the trasnsaction failed to execute with relayer network and txservice (our last resort).
 */
const sendRouterContractTx = async (
  args: {
    chainId: number;
    routerContractAddress: string;
    encodedData: string;
    params: PrepareParams | FulfillParams | CancelParams | RemoveLiquidityParams;
    signature: string;
    relayerFee?: {
      amount: string;
      asset: string;
    };
    reason: TransactionReason;
  },
  methodContext: MethodContext,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { txService, wallet, logger, messaging } = getContext();
  const { chainId, routerContractAddress, encodedData, params, signature, relayerFee, reason } = args;

  // Determine which event and payload type to use based on the transaction type.
  let evt: Evt<any>;
  let type: keyof typeof MetaTxTypes;
  let transactionId: string | undefined = undefined;
  switch (reason) {
    case TransactionReasons.PrepareReceiver:
      evt = prepareEvt;
      type = MetaTxTypes.RouterContractPrepare;
      transactionId = (params as PrepareParams).txData.transactionId;
      break;
    case TransactionReasons.FulfillSender:
      evt = fulfillEvt;
      type = MetaTxTypes.RouterContractFulfill;
      transactionId = (params as FulfillParams).txData.transactionId;
      break;
    case TransactionReasons.CancelReceiver:
    case TransactionReasons.CancelSender:
      evt = cancelEvt;
      type = MetaTxTypes.RouterContractCancel;
      transactionId = (params as CancelParams).txData.transactionId;
      break;
    case TransactionReasons.RemoveLiquidity:
      evt = removeLiquidityEvt;
      type = MetaTxTypes.RouterContractRemoveLiquidity;
      break;
    default:
      throw new Error(`Unsupported reason: ${reason}`);
  }

  // Important to relay this information in all the logging calls below.
  const loggingContext = {
    chainId,
    params,
    relayerFee,
    reason,
    type,
  };
  logger.info("Method start", requestContext, methodContext, loggingContext);

  const onchainTx = {
    chainId,
    to: routerContractAddress,
    data: encodedData,
    value: constants.Zero,
    from: wallet.address,
  };

  if (relayerFee !== undefined) {
    // If we are will be using relayers below, check to make sure the transaction is valid first (before relaying it)
    // by running an estimateGas check. This method will throw a TransactionReverted error (with the contract error code)
    // if the transaction would fail on chain.
    // TODO: Would be nice to recycle the gasLimit we get back from this call in the event that we end up
    // using txservice.
    await txService.getGasEstimate(chainId, onchainTx);

    // 1. Prepare tx using relayer if chain is supported by gelato.
    if (isChainSupportedByGelato(chainId)) {
      logger.info("Router contract: sending using Gelato relayer", requestContext, methodContext, loggingContext);
      try {
        const data = await gelatoSend(chainId, routerContractAddress, encodedData, relayerFee.asset, relayerFee.amount);
        if (!data.taskId) {
          throw new Error("No taskId returned");
        }
        logger.info("Router contract: sent using Gelato relayer", requestContext, methodContext, {
          ...loggingContext,
          data,
        });
        return await waitForRelayer(chainId, transactionId, evt, relayerFee, reason, requestContext);
      } catch (err: any) {
        logger.warn("Router contract: Gelato send failed", requestContext, methodContext, {
          ...loggingContext,
          err: jsonifyError(err),
        });
      }
    }

    // 2. If gelato is not supported, or gelato send failed, try using the router network.
    logger.info("Router contract: sending using router network", requestContext, methodContext, loggingContext);
    try {
      const payload = {
        chainId,
        to: routerContractAddress,
        type,
        data: {
          params,
          signature,
          relayerFeeAsset: relayerFee.asset,
          relayerFee: relayerFee.amount,
        } as MetaTxPayloads[typeof type],
      };
      await messaging.publishMetaTxRequest(payload);
      return await waitForRelayer(
        chainId,
        transactionId,
        evt,
        relayerFee,
        TransactionReasons.PrepareReceiver,
        requestContext,
      );
    } catch (err: any) {
      // NOTE: It is possible that the actual error was in the subscriber, and the above event's timeout
      // (see waitFor) is the error we actually caught in this block.
      logger.warn("Router contract prepare: router network failed", requestContext, methodContext, {
        ...loggingContext,
        err: jsonifyError(err),
      });
    }
  }

  // 3. If all of the above failed or was otherwise not supported, use txservice to send the transaction.
  logger.info("Router contract: sending using txservice", requestContext, methodContext, loggingContext);
  const receipt = await txService.sendTx(onchainTx, requestContext);
  incrementGasConsumed(chainId, receipt, reason, requestContext);
  return receipt;
};

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
          const invariantData: InvariantTransactionData = {
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
          };
          prepareEvt.post({
            event,
            args: {
              amount: args.amount,
              bidSignature: args.bidSignature,
              encodedBid: args.encodedBid,
              encryptedCallData: args.encryptedCallData,
              expiry: args.expiry,
              txData: invariantData,
            },
            chainId,
          });
        }
      });
      contract.on(
        "TransactionFulfilled",
        (_user, _router, _transactionId, args, _success, _isContract, _returnData, _caller, event) => {
          if (utils.getAddress(config.routerContractAddress!) === utils.getAddress(_router)) {
            const txData: TransactionData = {
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
            };
            fulfillEvt.post({
              event,
              args: {
                callData: args.callData,
                signature: args.signature,
                relayerFee: args.relayerFee,
                txData,
              },
              chainId,
            });
          }
        },
      );
      contract.on("TransactionCancelled", (_user, _router, _transactionId, args, _caller, event) => {
        if (utils.getAddress(config.routerContractAddress!) === utils.getAddress(_router)) {
          const txData: TransactionData = {
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
          };
          cancelEvt.post({
            event,
            args: {
              signature: args.signature,
              txData,
            },
            chainId,
          });
        }
      });

      contract.on("LiquidityRemoved", (router, assetId, amount, recipient, event) => {
        if (utils.getAddress(config.routerContractAddress!) === utils.getAddress(router)) {
          removeLiquidityEvt.post({
            event,
            args: { amount, router, assetId, recipient },
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

  const addr = wallet.address ?? (await wallet.getAddress());
  const receipt = await txService.sendTx(
    {
      to: nxtpContractAddress,
      data: encodedData,
      value: constants.Zero,
      chainId,
      from: addr,
    },
    requestContext,
  );

  // increment fees sent (no need to await)
  incrementGasConsumed(
    chainId,
    receipt,
    txData.router.toLowerCase() === addr.toLowerCase() ? TransactionReasons.PrepareReceiver : TransactionReasons.Relay,
    requestContext,
  );

  return receipt;
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

  return await sendRouterContractTx(
    {
      chainId,
      routerContractAddress,
      encodedData,
      params: prepareParams,
      signature,
      relayerFee: useRelayer
        ? {
            asset: routerRelayerFeeAsset,
            amount: routerRelayerFee,
          }
        : undefined,
      reason: TransactionReasons.PrepareReceiver,
    },
    methodContext,
    requestContext,
  );
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

  const addr = wallet.address ?? (await wallet.getAddress());
  const receipt = await txService.sendTx(
    {
      to: nxtpContractAddress,
      data: encodedData,
      value: constants.Zero,
      chainId,
      from: addr,
    },
    requestContext,
  );

  // increment fees sent (no need to await)
  incrementGasConsumed(
    chainId,
    receipt,
    txData.router.toLowerCase() === addr.toLowerCase() ? TransactionReasons.FulfillSender : TransactionReasons.Relay,
    requestContext,
  );

  return receipt;
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

  const { logger, txService } = getContext();
  logger.info("Method start", requestContext, methodContext, {
    fulfillParams,
    routerRelayerFeeAsset,
    routerRelayerFee,
  });

  const { txData, relayerFee, signature: fulfillSignature, callData } = fulfillParams;

  await sanitationCheck(chainId, { ...txData, amount: "0", expiry: 0, preparedBlockNumber: 0 }, "fulfill");

  const routerEncoded = await txService.readTx({
    to: txData.router,
    data: getRouterContractInterface().encodeFunctionData("routerSigner"),
    chainId,
  });
  const [router] = getRouterContractInterface().decodeFunctionResult("routerSigner", routerEncoded);

  logger.info("Generating encoded data", requestContext, methodContext, {
    function: "fulfill",
    txData,
    relayerFee,
    fulfillSignature,
    callData,
    encodedMeta: "0x",
    routerRelayerFeeAsset,
    routerRelayerFee,
    signature,
    routerSigner: router,
  });

  const encodedData = getRouterContractInterface().encodeFunctionData("fulfill", [
    { txData, relayerFee, signature: fulfillSignature, callData, encodedMeta: "0x" },
    routerRelayerFeeAsset,
    routerRelayerFee,
    signature,
  ]);

  return await sendRouterContractTx(
    {
      chainId,
      routerContractAddress,
      encodedData,
      params: fulfillParams,
      signature,
      relayerFee: useRelayer
        ? {
            asset: routerRelayerFeeAsset,
            amount: routerRelayerFee,
          }
        : undefined,
      reason: TransactionReasons.FulfillSender,
    },
    methodContext,
    requestContext,
  );
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

  const addr = wallet.address ?? (await wallet.getAddress());
  const receipt = await txService.sendTx(
    {
      to: nxtpContractAddress,
      data: encodedData,
      value: constants.Zero,
      chainId,
      from: addr,
    },
    requestContext,
  );

  incrementGasConsumed(
    chainId,
    receipt,
    addr.toLowerCase() !== txData.router.toLowerCase()
      ? TransactionReasons.Relay
      : chainId === txData.sendingChainId
      ? TransactionReasons.CancelSender
      : TransactionReasons.CancelReceiver,
    requestContext,
  );

  return receipt;
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

  const { logger } = getContext();
  logger.info("Method start", requestContext, methodContext, {
    cancelParams,
    routerRelayerFeeAsset,
    routerRelayerFee,
  });

  const { txData, signature: cancelSignature } = cancelParams;

  await sanitationCheck(chainId, { ...txData, amount: "0", expiry: 0, preparedBlockNumber: 0 }, "cancel");

  const encodedData = getRouterContractInterface().encodeFunctionData("cancel", [
    { txData, signature: cancelSignature, encodedMeta: "0x" },
    routerRelayerFeeAsset,
    routerRelayerFee,
    signature,
  ]);

  return await sendRouterContractTx(
    {
      chainId,
      routerContractAddress,
      encodedData,
      params: cancelParams,
      signature,
      relayerFee: useRelayer
        ? {
            asset: routerRelayerFeeAsset,
            amount: routerRelayerFee,
          }
        : undefined,
      reason: chainId === txData.sendingChainId ? TransactionReasons.CancelSender : TransactionReasons.CancelReceiver,
    },
    methodContext,
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

export const removeLiquidityRouterContract = async (
  chainId: number,
  amount: string,
  assetId: string,
  routerContractAddress: string,
  signature: string,
  routerRelayerFeeAsset: string,
  routerRelayerFee: string,
  useRelayer: boolean,
  requestContext: RequestContext,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(removeLiquidityRouterContract.name);

  const { logger } = getContext();
  logger.info("Method start", requestContext, methodContext, {
    amount,
    assetId,
    routerRelayerFeeAsset,
    routerRelayerFee,
  });

  const encodedData = getRouterContractInterface().encodeFunctionData("removeLiquidity", [
    amount,
    assetId,
    routerRelayerFeeAsset,
    routerRelayerFee,
    signature,
  ]);

  return await sendRouterContractTx(
    {
      chainId,
      routerContractAddress,
      encodedData,
      params: { router: routerContractAddress, amount, assetId } as RemoveLiquidityParams,
      signature,
      relayerFee: useRelayer
        ? {
            asset: routerRelayerFeeAsset,
            amount: routerRelayerFee,
          }
        : undefined,
      reason: TransactionReasons.RemoveLiquidity,
    },
    methodContext,
    requestContext,
  );
};

export const addLiquidityForTransactionManager = async (
  chainId: number,
  amount: string,
  assetId: string,
  routerAddress: string | undefined,
  requestContext: RequestContext,
  infiniteApprove = true,
): Promise<providers.TransactionReceipt> => {
  const { methodContext } = createLoggingContext(addLiquidityForTransactionManager.name, requestContext);

  const { logger, txService, wallet, signerAddress } = getContext();

  logger.info("Method start", requestContext, methodContext, { amount, assetId, routerAddress });

  if (!routerAddress) {
    routerAddress = signerAddress;
  }

  const nxtpContractAddress = getContractAddress(chainId);

  if (assetId !== constants.AddressZero) {
    const approvedData = getErc20ContractInterface().encodeFunctionData("allowance", [
      signerAddress,
      nxtpContractAddress,
    ]);
    const approvedEncoded = await txService.readTx({
      to: assetId,
      data: approvedData,
      chainId,
    });

    const [approved] = getErc20ContractInterface().decodeFunctionResult("allowance", approvedEncoded);

    logger.info("Got approved tokens", requestContext, methodContext, { approved: approved.toString() });

    if (BigNumber.from(approved).lt(amount)) {
      const data = getErc20ContractInterface().encodeFunctionData("approve", [
        nxtpContractAddress,
        infiniteApprove ? constants.MaxUint256 : amount,
      ]);
      logger.info("Approve transaction created", requestContext, methodContext);
      const approveTx = await txService.sendTx(
        { to: assetId, data, from: signerAddress, chainId, value: constants.Zero },
        requestContext,
      );
      logger.info("Approved Transaction", requestContext, methodContext, {
        approveTx,
      });
    } else {
      logger.info("Allowance sufficient", requestContext, methodContext, {
        approved: approved.toString(),
        amount,
      });
    }
  }

  const encodedData = getTxManagerInterface().encodeFunctionData("addLiquidityFor", [amount, assetId, routerAddress]);
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

export const migrateLiquidity = async (
  chainId: number,
  assetId: string,
  requestContext: RequestContext,
  routerAddress?: string,
  amount?: string,
): Promise<
  { removeLiqudityTx: providers.TransactionReceipt; addLiquidityForTx: providers.TransactionReceipt } | undefined
> => {
  const { methodContext } = createLoggingContext(migrateLiquidity.name, requestContext);
  const { logger, signerAddress, contractReader } = getContext();

  if (routerAddress) {
    const res = await isRouterWhitelisted(routerAddress, chainId);
    if (!res) {
      logger.warn("router isn't whitelisted", requestContext, methodContext, { routerAddress: routerAddress, chainId });
      return;
    }
  }

  if (!amount) {
    amount = (await contractReader.getAssetBalance(assetId, chainId)).toString();
    logger.info("Got amount from contract reader", requestContext, methodContext, {
      amount,
    });
  }

  if (BigNumber.from(amount).isZero()) {
    logger.warn("Amount is zero, nothing to migrate", requestContext, methodContext, { amount });
    return;
  }

  logger.info("Method start", requestContext, methodContext, {
    chainId,
    amount,
    assetId,
    signerAddress,
    routerAddress,
  });

  const removeLiqudityTx = await removeLiquidityTransactionManager(
    chainId,
    amount,
    assetId,
    signerAddress,
    requestContext,
  );

  logger.info("Removed Liquidity", requestContext, methodContext, {
    chainId,
    amount,
    assetId,
    receiverAddress: signerAddress,
    removeLiqudityTx,
  });

  const addLiquidityForTx = await addLiquidityForTransactionManager(
    chainId,
    amount,
    assetId,
    routerAddress,
    requestContext,
  );

  logger.info("Added Liquidity", requestContext, methodContext, {
    chainId,
    amount,
    assetId,
    routerAddress,
    addLiquidityForTx,
  });

  return {
    removeLiqudityTx,
    addLiquidityForTx,
  };
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

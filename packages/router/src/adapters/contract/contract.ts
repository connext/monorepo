import {
  CancelParams,
  createLoggingContext,
  FulfillParams,
  PrepareParams,
  RequestContext,
  getInvariantTransactionDigest,
  getVariantTransactionDigest,
  TransactionData,
  isChainSupportedByGelato,
  gelatoSend,
  MetaTxTypes,
} from "@connext/nxtp-utils";
import { BigNumber, constants, Contract, providers } from "ethers/lib/ethers";
import { Interface } from "ethers/lib/utils";
import {
  TransactionManager as TTransactionManager,
  ConnextPriceOracle as TConnextPriceOracle,
} from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import PriceOracleArtifact from "@connext/nxtp-contracts/artifacts/contracts/ConnextPriceOracle.sol/ConnextPriceOracle.json";
import { Evt } from "evt";

import { getContext } from "../../router";
import { TransactionStatus } from "../../adapters/subgraph/graphqlsdk";
import { NotExistPriceOracle, SanitationCheckFailed } from "../../lib/errors/contracts";

const { HashZero } = constants;

const prepareEvt = new Evt<{ event: any; args: PrepareParams }>(); // TODO: fix types
const fulfillEvt = new Evt<{ event: any; args: FulfillParams }>();
const cancelEvt = new Evt<{ event: any; args: CancelParams }>();

export const startContractListeners = async (): Promise<void> => {
  const { config, txService } = getContext();
  Object.entries(config.chainConfig).forEach(async ([_chainId, conf]) => {
    const chainId = Number(_chainId);
    if (conf.routerContractAddress) {
      // needs event listeners for listening to relayed events
      // TODO remove this when we can query gelato for tx receipts
      // alternatively allow listening on the subgraph
      const contract = new Contract(
        conf.transactionManagerAddress,
        TransactionManagerArtifact.abi,
        txService.getProvider(chainId).provider,
      ) as TTransactionManager;

      contract.on("TransactionPrepared", (_user, _router, _transactionId, _txData, _caller, args, event) => {
        prepareEvt.post({ event, args });
      });

      contract.on(
        "TransactionFulfilled",
        (_user, _router, _transactionId, args, _success, _isContract, _returnData, _caller, event) => {
          fulfillEvt.post({ event, args });
        },
      );

      contract.on("TransactionCancelled", (_user, _router, _transactionId, args, _caller, event) => {
        cancelEvt.post({ event, args });
      });
    }
  });
};

export const getContractAddress = (chainId: number): string => {
  const { config } = getContext();
  const nxtpContractAddress = config.chainConfig[chainId]?.transactionManagerAddress;
  if (!nxtpContractAddress) {
    throw new Error(`No contract exists for chain ${chainId}`);
  }
  return nxtpContractAddress;
};

export const getOracleContractAddress = (chainId: number, requestContext: RequestContext): string => {
  const { config } = getContext();
  const oracleContractAddress = config.chainConfig[chainId]?.priceOracleAddress;
  if (!oracleContractAddress) {
    throw new NotExistPriceOracle(chainId, requestContext);
  }
  return oracleContractAddress;
};

export const getTxManagerInterface = () =>
  new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];

export const getPriceOracleInterface = () => new Interface(PriceOracleArtifact.abi) as TConnextPriceOracle["interface"];

export const sanitationCheck = async (
  chainId: number,
  transactionData: TransactionData,
  functionCall: "prepare" | "fulfill" | "cancel",
  _requestContext?: RequestContext<string>,
) => {
  const { txService, contractReader } = getContext();

  const { requestContext, methodContext } = createLoggingContext(
    sanitationCheck.name,
    _requestContext,
    transactionData.transactionId,
  );

  const nxtpContractAddress = getContractAddress(chainId);

  const invariantDigest = getInvariantTransactionDigest({
    receivingChainTxManagerAddress: transactionData.receivingChainTxManagerAddress,
    user: transactionData.user,
    router: transactionData.router,
    initiator: transactionData.initiator,
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

  const encodeVariantTransactionData = getTxManagerInterface().encodeFunctionData("variantTransactionData", [
    invariantDigest,
  ]);

  const variantTransactionDigest = await txService.readTx({
    chainId,
    to: nxtpContractAddress,
    data: encodeVariantTransactionData,
  });

  if (functionCall === "prepare") {
    // variantTransactionDigest exist then transaction is already prepared
    if (variantTransactionDigest !== HashZero) {
      throw new SanitationCheckFailed(functionCall, transactionData.transactionId, chainId, {
        requestContext,
        methodContext,
        variantTransactionDigest,
      });
    }
  } else {
    const expectedVariantDigest = getVariantTransactionDigest({
      amount: transactionData.amount,
      expiry: transactionData.expiry,
      preparedBlockNumber: transactionData.preparedBlockNumber,
    });

    if (expectedVariantDigest === variantTransactionDigest) {
      // All is good, no issues
      return;
    }

    // transaction should be prepared before fulfill
    if (variantTransactionDigest === HashZero) {
      throw new SanitationCheckFailed(functionCall, transactionData.transactionId, chainId, {
        requestContext,
        methodContext,
        variantTransactionDigest,
      });
    }

    // transaction is already fulfilled
    // get expected fulfilled/cancelled variant hash
    const fulfilledOrCancelledVariant = getVariantTransactionDigest({
      amount: transactionData.amount,
      expiry: transactionData.expiry,
      preparedBlockNumber: 0,
    });

    if (variantTransactionDigest === fulfilledOrCancelledVariant) {
      throw new SanitationCheckFailed(functionCall, transactionData.transactionId, chainId, {
        requestContext,
        methodContext,
        variantTransactionDigest,
        fulfilledOrCancelledVariant,
      });
    }

    if (functionCall === "cancel" && chainId === transactionData.sendingChainId) {
      const receivingChainNxtpContractAddress = getContractAddress(transactionData.receivingChainId);

      const receivingChainVariantTransactionDigest = await txService.readTx({
        chainId: transactionData.receivingChainId,
        to: receivingChainNxtpContractAddress,
        data: encodeVariantTransactionData,
      });

      if (receivingChainVariantTransactionDigest === HashZero) {
        // cancel is allowed when no transaction is prepared
        return;
      } else {
        const receivingChainTransaction = await contractReader.getTransactionForChain(
          transactionData.transactionId,
          transactionData.user,
          transactionData.receivingChainId,
        );

        if (receivingChainTransaction?.status === TransactionStatus.Cancelled) {
          // cancel is allowed when transaction is cancelled on receiving chain
          return;
        } else {
          throw new SanitationCheckFailed(functionCall, transactionData.transactionId, chainId, {
            requestContext,
            methodContext,
          });
        }
      }
    }
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

  const { logger, txService, wallet, config, messaging } = getContext();
  logger.info("Method start", requestContext, methodContext, { prepareParams });

  const { txData, amount, expiry, encodedBid, bidSignature, encryptedCallData } = prepareParams;

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

  if (config.chainConfig[chainId].routerContractAddress) {
    if (isChainSupportedByGelato(chainId)) {
      try {
        await gelatoSend(
          chainId,
          nxtpContractAddress,
          encodedData,
          chainId === txData.sendingChainId ? txData.sendingAssetId : txData.receivingAssetId,
          "0",
        );
      } catch (err) {}
    } else {
      await messaging.publishMetaTxRequest({
        type: MetaTxTypes.Prepare,
        relayerFee: "0",
        to: nxtpContractAddress,
        chainId,
        data: {
          txData,
          amount,
          expiry,
          encryptedCallData,
          encodedBid,
          bidSignature,
        },
      });
    }
    // listen for event on contract
    const { event } = await prepareEvt
      .pipe(({ args }) => args.txData.transactionId === txData.transactionId)
      .waitFor(300_000);
    const receipt = await txService.getTransactionReceipt(chainId, event.transactionHash);
    return receipt;
  } else {
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

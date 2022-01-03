import {
  ajv,
  createLoggingContext,
  MetaTxFulfillPayload,
  MetaTxPayload,
  MetaTxRouterContractCancelPayload,
  MetaTxRouterContractFulfillPayload,
  MetaTxRouterContractPreparePayload,
  MetaTxType,
  MetaTxTypes,
  RequestContext,
} from "@connext/nxtp-utils";
import { BigNumber, providers } from "ethers/lib/ethers";

import { getContext } from "../../router";
import { MetaTxInputSchema } from "../entities";
import {
  InvalidMetaTxType,
  NoChainConfig,
  NotAllowedFulfillRelay,
  NotEnoughRelayerFee,
  ParamsInvalid,
} from "../errors";

export const sendMetaTx = async <T extends MetaTxType>(
  input: MetaTxPayload<T>,
  _requestContext: RequestContext<string>,
): Promise<providers.TransactionReceipt | undefined> => {
  const { requestContext, methodContext } = createLoggingContext(sendMetaTx.name, _requestContext);

  const { logger, contractWriter, config, chainData, txService, isRouterContract } = getContext();
  logger.debug("Method start", requestContext, methodContext, { input });

  // Validate Input schema
  const validateInput = ajv.compile(MetaTxInputSchema);
  const validInput = validateInput(input);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      methodContext,
      requestContext,
      paramsError: msg,
    });
  }

  const { chainId, data, type, to } = input;

  let receipt;

  if (!config.chainConfig[chainId]) {
    throw new NoChainConfig(chainId, { methodContext, requestContext, input });
  }

  const relayerFeeLowerBound = config.chainConfig[chainId].relayerFeeThreshold;
  if (!config.allowRelay && !config.chainConfig[chainId].allowRelay) {
    // TODO: should we throwing error if relayer is not allowed?
    // router shouldn't listen to metaTx request in first place if it's not allowed to relay
    throw new NotAllowedFulfillRelay(chainId, {
      methodContext,
      requestContext,
      data,
      input,
    });
  }

  // receiver fulfill, done directly on contract using user's sig broadcast
  if (type === MetaTxTypes.Fulfill) {
    const { txData, signature, relayerFee, callData } = data as MetaTxFulfillPayload;
    // Send to tx service
    logger.info("Sending fulfill tx", requestContext, methodContext, { signature });

    let outputDecimals = chainData.get(txData.receivingChainId.toString())?.assetId[txData.receivingAssetId]?.decimals;
    if (!outputDecimals) {
      outputDecimals = await txService.getDecimalsForAsset(txData.receivingChainId, txData.receivingAssetId);
    }
    logger.info("Got output decimals", requestContext, methodContext, { outputDecimals });
    const expectedFulfillFee = await txService.calculateGasFeeInReceivingTokenForFulfill(
      txData.receivingChainId,
      txData.receivingAssetId,
      outputDecimals,
      chainData,
      requestContext,
    );
    logger.info("Expected Fulfill fee in router side", requestContext, methodContext, {
      expectedFulfillFee: expectedFulfillFee.toString(),
    });

    const recvAmountLowerBound = expectedFulfillFee.mul(100 - relayerFeeLowerBound).div(100);
    if (BigNumber.from(data.relayerFee).lt(recvAmountLowerBound)) {
      throw new NotEnoughRelayerFee(chainId, {
        methodContext,
        requestContext,
        relayerFee: data.relayerFee,
        recvAmountLowerBound: recvAmountLowerBound.toString(),
        input,
        type,
      });
    }

    receipt = await contractWriter.fulfillTransactionManager(
      chainId,
      {
        txData,
        signature: signature,
        relayerFee: relayerFee,
        callData: callData,
      },
      requestContext,
    );

    logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
  } else {
    const { relayerFeeAsset } = data as
      | MetaTxRouterContractPreparePayload
      | MetaTxRouterContractFulfillPayload
      | MetaTxRouterContractCancelPayload;

    // router contract methods
    let relayerFeeAssetDecimal = chainData.get(chainId.toString())?.assetId[relayerFeeAsset]?.decimals;
    if (!relayerFeeAssetDecimal) {
      relayerFeeAssetDecimal = await txService.getDecimalsForAsset(chainId, relayerFeeAsset);
    }

    if (type === MetaTxTypes.RouterContractPrepare) {
      const {
        params: { txData, amount, bidSignature, encodedBid, encryptedCallData, expiry },
        signature,
        relayerFee,
      } = data as MetaTxRouterContractPreparePayload;

      const routerRelayerFee = await txService.calculateGasFee(
        chainId,
        relayerFeeAsset,
        relayerFeeAssetDecimal,
        "prepare",
        isRouterContract,
        chainData,
        requestContext,
      );

      const recvAmountLowerBound = routerRelayerFee.mul(100 - relayerFeeLowerBound).div(100);

      if (BigNumber.from(relayerFee).lt(recvAmountLowerBound)) {
        throw new NotEnoughRelayerFee(chainId, {
          methodContext,
          requestContext,
          relayerFee,
          recvAmountLowerBound: recvAmountLowerBound.toString(),
          type,
          input,
        });
      }

      receipt = await contractWriter.prepareRouterContract(
        chainId,
        {
          txData,
          amount,
          expiry,
          bidSignature,
          encodedBid,
          encryptedCallData,
        },
        to,
        signature,
        relayerFeeAsset,
        relayerFee,
        false,
        requestContext,
      );
      logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
    } else if (type === MetaTxTypes.RouterContractFulfill) {
      const {
        params: { txData, callData, signature: fulfillSignature, relayerFee: fulfillRelayerFee },
        signature,
        relayerFee,
        relayerFeeAsset,
      } = data as MetaTxRouterContractFulfillPayload;

      const routerRelayerFee = await txService.calculateGasFee(
        chainId,
        relayerFeeAsset,
        relayerFeeAssetDecimal,
        "fulfill",
        isRouterContract,
        chainData,
        requestContext,
      );

      const recvAmountLowerBound = routerRelayerFee.mul(100 - relayerFeeLowerBound).div(100);

      if (BigNumber.from(relayerFee).lt(recvAmountLowerBound)) {
        throw new NotEnoughRelayerFee(chainId, {
          methodContext,
          requestContext,
          relayerFee: data.relayerFee,
          recvAmountLowerBound: recvAmountLowerBound.toString(),
          type,
          input,
        });
      }

      receipt = await contractWriter.fulfillRouterContract(
        chainId,
        {
          txData,
          signature: fulfillSignature,
          relayerFee: fulfillRelayerFee,
          callData,
        },
        to,
        signature,
        relayerFeeAsset,
        relayerFee,
        false,
        requestContext,
      );
      logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
    } else if (type === MetaTxTypes.RouterContractCancel) {
      const {
        params: { txData, signature: cancelSignature },
        signature,
        relayerFee,
      } = data as MetaTxRouterContractCancelPayload;

      const routerRelayerFee = await txService.calculateGasFee(
        chainId,
        relayerFeeAsset,
        relayerFeeAssetDecimal,
        "cancel",
        isRouterContract,
        chainData,
        requestContext,
      );

      const recvAmountLowerBound = routerRelayerFee.mul(100 - relayerFeeLowerBound).div(100);

      if (BigNumber.from(data.relayerFee).lt(recvAmountLowerBound)) {
        throw new NotEnoughRelayerFee(chainId, {
          methodContext,
          requestContext,
          relayerFee: data.relayerFee,
          recvAmountLowerBound: recvAmountLowerBound.toString(),
          type,
          input,
        });
      }

      receipt = await contractWriter.cancelRouterContract(
        chainId,
        {
          txData,
          signature: cancelSignature,
        },
        to,
        signature,
        relayerFeeAsset,
        relayerFee,
        false,
        requestContext,
      );
      logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
    } else {
      throw new InvalidMetaTxType(type, { requestContext, methodContext });
    }
  }

  return receipt;
};

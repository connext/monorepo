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
import { BigNumber, constants, providers } from "ethers/lib/ethers";

import { getContext } from "../../router";
import { NoChainConfig, NotEnoughRelayerFee } from "../errors";
import { NotAllowedFulfillRelay } from "../errors/fulfill";
import { calculateGasFee, calculateGasFeeInReceivingTokenForFulfill } from "../helpers/shared";

export const metaTx = async <T extends MetaTxType>(
  input: MetaTxPayload<T>,
  _requestContext: RequestContext<string>,
): Promise<providers.TransactionReceipt | undefined> => {
  const { requestContext, methodContext } = createLoggingContext(metaTx.name, _requestContext);

  const { logger, contractWriter, config, chainData, txService, wallet } = getContext();
  logger.debug("Method start", requestContext, methodContext, { input });

  // Validate Input schema
  // const validateInput = ajv.compile(MetaTxInputSchema);
  // const validInput = validateInput(input);
  // if (!validInput) {
  //   const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
  //   throw new ParamsInvalid({
  //     methodContext,
  //     requestContext,
  //     paramsError: msg,
  //   });
  // }

  const { chainId, data, type } = input;

  let receipt;

  if (!config.chainConfig[chainId]) {
    throw new NoChainConfig(chainId, { methodContext, requestContext, input });
  }

  const relayerFeeLowerBound = config.chainConfig[chainId].relayerFeeThreshold;
  if (!config.allowRelay) {
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
    const expectedFulfillFee = await calculateGasFeeInReceivingTokenForFulfill(
      txData.receivingAssetId,
      txData.receivingChainId,
      outputDecimals,
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

    receipt = await contractWriter.fulfill(
      txData.sendingChainId,
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
    // router contract methods
    const relayerFeeAsset = config.chainConfig[chainId].routerContractRelayerAsset ?? constants.AddressZero;
    let relayerFeeAssetDecimal =
      relayerFeeAsset === constants.AddressZero
        ? 18
        : chainData.get(chainId.toString())?.assetId[relayerFeeAsset]?.decimals;
    if (!relayerFeeAssetDecimal) {
      relayerFeeAssetDecimal = await txService.getDecimalsForAsset(chainId, relayerFeeAsset);
    }

    if (type === MetaTxTypes.RouterContractPrepare) {
      const {
        params: { txData, amount, bidSignature, encodedBid, encryptedCallData, expiry },
      } = data as MetaTxRouterContractPreparePayload;

      const routerRelayerFee = await calculateGasFee(
        chainId,
        relayerFeeAsset,
        relayerFeeAssetDecimal,
        "prepare",
        requestContext,
        methodContext,
        "receiving",
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

      receipt = await contractWriter.prepare(
        chainId,
        {
          txData,
          amount,
          expiry,
          bidSignature,
          encodedBid,
          encryptedCallData,
        },
        relayerFeeAsset,
        routerRelayerFee.toString(),
        requestContext,
      );
      logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
    } else if (type === MetaTxTypes.RouterContractFulfill) {
      const {
        params: { txData, callData, signature, relayerFee },
      } = data as MetaTxRouterContractFulfillPayload;

      const routerRelayerFee = await calculateGasFee(
        chainId,
        relayerFeeAsset,
        relayerFeeAssetDecimal,
        "fulfill",
        requestContext,
        methodContext,
        "sending",
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

      receipt = await contractWriter.fulfill(
        chainId,
        {
          txData,
          signature,
          relayerFee,
          callData,
        },
        requestContext,
        relayerFeeAsset,
        routerRelayerFee.toString(),
      );
      logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
    } else if (type === MetaTxTypes.RouterContractCancel) {
      const {
        params: { txData },
        signature,
        side,
      } = data as MetaTxRouterContractCancelPayload;

      const relayerFeeAsset = config.chainConfig[chainId].routerContractRelayerAsset ?? constants.AddressZero;
      const relayerFeeAssetDecimal = await txService.getDecimalsForAsset(chainId, relayerFeeAsset);

      const routerRelayerFee = await calculateGasFee(
        chainId,
        relayerFeeAsset,
        relayerFeeAssetDecimal,
        "cancel",
        requestContext,
        methodContext,
        "sending",
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

      receipt = await contractWriter.cancel(
        chainId,
        {
          txData,
          signature,
        },
        relayerFeeAsset,
        routerRelayerFee.toString(),
        requestContext,
      );
      logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
    }
  }

  return receipt;
};

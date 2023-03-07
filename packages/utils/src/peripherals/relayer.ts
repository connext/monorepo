import { BigNumber, constants } from "ethers";

import { getHardcodedGasLimits } from "../constants";
import { NxtpError } from "../types";
import { getChainIdFromDomain, getDecimalsForAsset } from "../helpers";
import { Logger, createLoggingContext, RequestContext } from "../logging";

import { ChainData } from "./chainData";
import { getConversionRate, getGelatoEstimatedFee } from "./gelato";

const relayerBufferPercentage = 20; // 20% bump on total estimated relayer fee

export const calculateRelayerFee = async (
  params: {
    originDomain: string;
    destinationDomain: string;
    originNativeToken?: string;
    destinationNativeToken?: string;
    callDataGasAmount?: number;
    isHighPriority?: boolean;
    getGasPriceCallback?: (domain: number) => Promise<BigNumber>;
  },
  chainData: Map<string, ChainData>,
  logger?: Logger,
  _requestContext?: RequestContext,
): Promise<BigNumber> => {
  const { requestContext, methodContext } = createLoggingContext(calculateRelayerFee.name, _requestContext);

  if (logger) {
    logger.info("Method Start", requestContext, methodContext, { params });
  }
  const {
    originDomain,
    destinationDomain,
    callDataGasAmount,
    originNativeToken: _originNativeToken,
    destinationNativeToken: _destinationNativeToken,
    isHighPriority: _isHighPriority,
    getGasPriceCallback,
  } = params;

  const originNativeToken = _originNativeToken ?? constants.AddressZero;
  const destinationNativeToken = _destinationNativeToken ?? constants.AddressZero;
  const isHighPriority = _isHighPriority ?? false;

  const [originChainId, destinationChainId] = await Promise.all([
    await getChainIdFromDomain(originDomain, chainData),
    await getChainIdFromDomain(destinationDomain, chainData),
  ]);

  // fetch executeGasAmount from chainData
  const {
    execute: executeGasAmount,
    executeL1: executeL1GasAmount,
    gasPriceFactor,
  } = await getHardcodedGasLimits(destinationDomain, chainData);
  if (logger) {
    logger.debug("Hardcoded gasLimits", requestContext, methodContext, {
      execute: executeGasAmount,
      executeL1: executeL1GasAmount,
      gasPriceFactor,
    });
  }

  const totalGasAmount = callDataGasAmount
    ? Number(executeGasAmount) + Number(callDataGasAmount)
    : Number(executeGasAmount);
  const [estimatedRelayerFee, originTokenPrice, destinationTokenPrice, originTokenDecimals, destinationTokenDecimals] =
    await Promise.all([
      getGelatoEstimatedFee(
        destinationChainId,
        destinationNativeToken,
        Number(totalGasAmount),
        isHighPriority,
        destinationChainId == 10 ? Number(executeL1GasAmount) : undefined,
      ),
      getConversionRate(originChainId, undefined, undefined),
      getConversionRate(destinationChainId, undefined, undefined),
      getDecimalsForAsset(originNativeToken, originChainId, undefined, chainData),
      getDecimalsForAsset(destinationNativeToken, destinationChainId, undefined, chainData),
    ]);

  const shouldFallback = estimatedRelayerFee.eq("0") && getGasPriceCallback;
  if (shouldFallback) {
    let gasPrice = BigNumber.from(0);
    try {
      gasPrice = await getGasPriceCallback(Number(params.destinationDomain));
      estimatedRelayerFee.add(BigNumber.from(totalGasAmount).mul(gasPrice));
    } catch (e: unknown) {
      if (logger) {
        logger.warn("Error getting GasPrice", requestContext, methodContext, {
          error: e as NxtpError,
          domain: params.destinationDomain,
        });
        return BigNumber.from(0);
      }
    }
  }

  if (logger) {
    logger.info("Estimate Relayer Fee", requestContext, methodContext, {
      originNativeToken,
      originChainId,
      destinationNativeToken,
      destinationChainId,
      executeGasAmount,
      callDataGasAmount,
    });
  }

  // add relayerFee bump to estimatedRelayerFee
  const bumpedFee = estimatedRelayerFee.add(estimatedRelayerFee.mul(BigNumber.from(relayerBufferPercentage)).div(100));

  if (originTokenPrice == 0 || destinationTokenPrice == 0) {
    return BigNumber.from(0);
  }

  // converstion rate is float-point number. we multiply by 1000 to be more precise
  const impactedOriginTokenPrice = Math.floor(originTokenPrice * 1000);
  const impactedDestinationTokenPrice = Math.floor(destinationTokenPrice * 1000);

  const relayerFeeInOrginNativeAsset =
    originTokenDecimals >= destinationTokenDecimals
      ? bumpedFee
          .mul(impactedDestinationTokenPrice)
          .div(impactedOriginTokenPrice)
          .mul(BigNumber.from(10).pow(originTokenDecimals - destinationTokenDecimals))
      : bumpedFee
          .mul(impactedDestinationTokenPrice)
          .div(impactedOriginTokenPrice)
          .div(BigNumber.from(10).pow(destinationTokenDecimals - originTokenDecimals));

  if (logger) {
    logger.info("Fee estimation completed!", requestContext, methodContext, {
      bumpedFee: bumpedFee.toString(),
      originTokenPrice,
      destinationTokenPrice,
      relayerFeeInOrginNativeAsset: relayerFeeInOrginNativeAsset.toString(),
    });
  }
  return relayerFeeInOrginNativeAsset;
};

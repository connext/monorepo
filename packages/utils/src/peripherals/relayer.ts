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
    originChainId?: number;
    destinationChainId?: number;
    originNativeToken?: string;
    destinationNativeToken?: string;
    callDataGasAmount?: number;
    isHighPriority?: boolean;
    getGasPriceCallback?: (domain: number) => Promise<BigNumber>;
    originNativeTokenPrice?: number;
    destinationNativeTokenPrice?: number;
    destinationGasPrice?: string;
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
    originChainId: _originChainId,
    destinationChainId: _destinationChainId,
    callDataGasAmount,
    originNativeToken: _originNativeToken,
    destinationNativeToken: _destinationNativeToken,
    isHighPriority: _isHighPriority,
    getGasPriceCallback,
    originNativeTokenPrice,
    destinationNativeTokenPrice,
    destinationGasPrice,
  } = params;

  const originNativeToken = _originNativeToken ?? constants.AddressZero;
  const destinationNativeToken = _destinationNativeToken ?? constants.AddressZero;
  const isHighPriority = _isHighPriority ?? false;

  const [originChainId, destinationChainId] = await Promise.all([
    _originChainId ? Promise.resolve(_originChainId) : getChainIdFromDomain(originDomain, chainData),
    _destinationChainId ? Promise.resolve(_destinationChainId) : getChainIdFromDomain(destinationDomain, chainData),
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
      originNativeTokenPrice
        ? Promise.resolve(originNativeTokenPrice)
        : getConversionRate(originChainId, undefined, undefined),
      destinationNativeTokenPrice
        ? Promise.resolve(destinationNativeTokenPrice)
        : getConversionRate(destinationChainId, undefined, undefined),
      getDecimalsForAsset(originNativeToken, originChainId, undefined, chainData),
      getDecimalsForAsset(destinationNativeToken, destinationChainId, undefined, chainData),
    ]);

  // fallback with passed-in gas price or with callback
  let relayerFee = estimatedRelayerFee;
  if (estimatedRelayerFee.eq("0")) {
    let gasPrice = BigNumber.from(destinationGasPrice ?? 0);
    if (gasPrice.eq("0") && getGasPriceCallback) {
      try {
        gasPrice = await getGasPriceCallback(Number(params.destinationDomain));
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
    relayerFee = estimatedRelayerFee.add(BigNumber.from(totalGasAmount).mul(gasPrice));
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
  const bumpedFee = relayerFee.add(relayerFee.mul(BigNumber.from(relayerBufferPercentage)).div(100));

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

import { BigNumber, constants } from "ethers";

import { getHardcodedGasLimits } from "../constants";
import { NxtpError } from "../types";
import { domainToChainId } from "../helpers";
import { Logger, createLoggingContext, RequestContext } from "../logging";

import { ChainData } from "./chainData";
import { safeGetConversionRate, getGelatoEstimatedFee } from "./gelato";

const relayerBufferPercentage = 20; // 20% bump on total estimated relayer fee

export const calculateRelayerFee = async (
  params: {
    originDomain: string;
    destinationDomain: string;
    priceIn?: "native" | "usd";
    originChainId?: number;
    destinationChainId?: number;
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
  onlyExecute = false,
): Promise<BigNumber> => {
  const { requestContext, methodContext } = createLoggingContext(calculateRelayerFee.name, _requestContext);

  if (logger) {
    logger.info("Method Start", requestContext, methodContext, { params });
  }
  const {
    originDomain,
    destinationDomain,
    priceIn: _priceIn,
    originChainId: _originChainId,
    destinationChainId: _destinationChainId,
    callDataGasAmount,
    isHighPriority: _isHighPriority,
    getGasPriceCallback,
    originNativeTokenPrice,
    destinationNativeTokenPrice,
    destinationGasPrice,
  } = params;

  const isHighPriority = _isHighPriority ?? false;
  const priceIn = _priceIn ?? "native";

  const originChainId = _originChainId ? _originChainId : domainToChainId(Number(originDomain));
  const destinationChainId = _destinationChainId ? _destinationChainId : domainToChainId(Number(destinationDomain));

  // fetch executeGasAmount from chainData
  const {
    execute: executeGasAmount,
    executeL1: executeL1GasAmount,
    proveAndProcess: proveAndProcessGasAmount,
    proveAndProcessL1: proveAndProcessL1GasAmount,
    messaging: messagingGasAmount,
    gasPriceFactor,
  } = await getHardcodedGasLimits(destinationDomain, chainData);
  if (logger) {
    logger.debug("Hardcoded gasLimits", requestContext, methodContext, {
      execute: executeGasAmount,
      executeL1: executeL1GasAmount,
      proveAndProcess: proveAndProcessGasAmount,
      proveAndProcessL1: proveAndProcessL1GasAmount,
      messaging: messagingGasAmount,
      gasPriceFactor,
    });
  }

  const baseGasFees =
    Number(executeGasAmount) +
    Number(onlyExecute ? 0 : proveAndProcessGasAmount) +
    Number(onlyExecute ? 0 : messagingGasAmount);

  const l1GasLimit =
    destinationChainId == 10
      ? Number(executeL1GasAmount) + Number(onlyExecute ? 0 : proveAndProcessL1GasAmount)
      : undefined;

  const totalGasAmount = callDataGasAmount ? Number(baseGasFees) + Number(callDataGasAmount) : Number(executeGasAmount);
  const [estimatedRelayerFee, originTokenPrice, destinationTokenPrice, ethPrice] = await Promise.all([
    // destination native asset fee
    getGelatoEstimatedFee(
      destinationChainId,
      constants.AddressZero,
      Number(totalGasAmount),
      isHighPriority,
      l1GasLimit,
    ),
    // USDC per origin native
    originNativeTokenPrice
      ? Promise.resolve(originNativeTokenPrice)
      : safeGetConversionRate(originChainId, undefined, logger),
    // USDC per destination native
    destinationNativeTokenPrice
      ? Promise.resolve(destinationNativeTokenPrice)
      : safeGetConversionRate(destinationChainId, undefined, logger),
    // USDC per ETH
    safeGetConversionRate(1, undefined, logger),
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
      priceIn,
      originChainId,
      destinationChainId,
      executeGasAmount,
      callDataGasAmount,
      baseGasFees,
    });
  }

  // add relayerFee bump to estimatedRelayerFee
  const bumpedFee = relayerFee.add(relayerFee.mul(BigNumber.from(relayerBufferPercentage)).div(100));

  if (originTokenPrice == 0 || destinationTokenPrice == 0) {
    return BigNumber.from(0);
  }

  // converstion rate is float-point number. we multiply by 1000 to be more precise
  const scale = 1000;
  const impactedOriginTokenPrice = Math.floor(originTokenPrice * scale);
  const impactedDestinationTokenPrice = Math.floor(destinationTokenPrice * scale);

  // convert to usd value
  // fee in USDC
  // fee native destination * (USDC/destination native) = fee in USDC
  const relayerFeeUsd = bumpedFee.mul(impactedDestinationTokenPrice).div(scale);

  // assert the cap
  // get the max fee by destination chain
  const maxFeeEth = BigNumber.from(chainData.get(destinationDomain)?.maxRelayerFeeInEth ?? "0");
  // convert to USDC if cap and price available
  const maxFeeUsd =
    !ethPrice || maxFeeEth.isZero() ? relayerFeeUsd : maxFeeEth.mul(Math.floor(ethPrice * scale)).div(scale);

  const cappedFeeUsd = relayerFeeUsd.gt(maxFeeUsd) ? maxFeeUsd : relayerFeeUsd;
  const final = priceIn !== "native" ? cappedFeeUsd : cappedFeeUsd.mul(scale).div(impactedOriginTokenPrice);

  if (logger) {
    logger.info("Fee estimation completed!", requestContext, methodContext, {
      bumpedFee: bumpedFee.toString(),
      originTokenPrice,
      destinationTokenPrice,
      ethPrice,
      maxFeeEth,
      priceIn,
      relayerFeeUsd: relayerFeeUsd.toString(),
      cappedFeeUsd: cappedFeeUsd.toString(),
      final: final.toString(),
    });
  }

  return final;
};

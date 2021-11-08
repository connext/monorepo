import { getNtpTimeSeconds as _getNtpTimeSeconds, RequestContext, GAS_ESTIMATES } from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";

import { getOracleContractAddress, getPriceOracleInterface } from "../../adapters/contract/contract";
import { getDeployedChainIdsForGasFee } from "../../config";
import { getContext } from "../../router";

/**
 * Helper to allow easy mocking
 */
export const getNtpTimeSeconds = async () => {
  return await _getNtpTimeSeconds();
};

/**
 * Helper to calculate router gas fee in token
 *
 * @param sendingAssetId The asset address on source chain
 * @param sendingChainId The source chain Id
 * @param receivingAssetId The asset address on destination chain
 * @param receivingChainId The destination chain Id
 * @param outputDecimals Decimal number of receiving asset
 * @param requestContext Request context instance
 */
export const calculateGasFeeInReceivingToken = async (
  sendingAssetId: string,
  sendingChainId: number,
  receivingAssetId: string,
  receivingChainId: number,
  outputDecimals: number,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const chaindIdsForGasFee = getChainIdForGasFee();

  if (!chaindIdsForGasFee.includes(sendingChainId) && !chaindIdsForGasFee.includes(receivingChainId))
    return constants.Zero;
  let totalCost = constants.Zero;
  // TODO: this is returning zero when doing a rinkeby to goerli tx. i believe this is because the oracle
  // is not configured for goerli so theres no way to translate the price to goerli
  // TODO: we can combine these into just 2 if statements and remove the repeated logic
  // calculate receiving token amount for gas fee
  // if chaindIdsForGasFee includes only sendingChainId, calculate gas fee for fulfill transactions
  // if chaindIdsForGasFee includes only receivingChainId, calculate gas fee for prepare transactions

  if (chaindIdsForGasFee.includes(sendingChainId)) {
    const gasLimitForFulfill = BigNumber.from(GAS_ESTIMATES.fulfill);
    const [ethPriceInSendingChain, receivingTokenPrice, gasPriceInSendingChain] = await Promise.all([
      getTokenPrice(sendingChainId, constants.AddressZero, requestContext),
      getTokenPrice(sendingChainId, sendingAssetId, requestContext),
      getGasPrice(sendingChainId, requestContext),
    ]);

    const gasAmountInUsd = gasPriceInSendingChain.mul(gasLimitForFulfill).mul(ethPriceInSendingChain);
    const tokenAmountForGasFee = receivingTokenPrice.isZero()
      ? constants.Zero
      : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

    totalCost = totalCost.add(tokenAmountForGasFee);
  }

  if (chaindIdsForGasFee.includes(receivingChainId)) {
    const gasLimitForPrepare = BigNumber.from(GAS_ESTIMATES.prepare);
    const [ethPriceInReceivingChain, receivingTokenPrice, gasPriceInReceivingChain] = await Promise.all([
      getTokenPrice(receivingChainId, constants.AddressZero, requestContext),
      getTokenPrice(receivingChainId, receivingAssetId, requestContext),
      getGasPrice(receivingChainId, requestContext),
    ]);

    const gasAmountInUsd = gasPriceInReceivingChain.mul(gasLimitForPrepare).mul(ethPriceInReceivingChain);
    const tokenAmountForGasFee = receivingTokenPrice.isZero()
      ? constants.Zero
      : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

    totalCost = totalCost.add(tokenAmountForGasFee);
  }

  return totalCost;
};

/**
 * Helper to calculate router gas fee in token for meta transaction
 *
 * @param receivingAssetId The asset address on destination chain
 * @param receivingChainId The destination chain Id
 * @param outputDecimals Decimal number of receiving asset
 * @param requestContext Request context instance
 */
export const calculateGasFeeInReceivingTokenForFulfill = async (
  receivingAssetId: string,
  receivingChainId: number,
  outputDecimals: number,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const chaindIdsForGasFee = getChainIdForGasFee();

  if (!chaindIdsForGasFee.includes(receivingChainId)) return constants.Zero;
  let totalCost = constants.Zero;

  if (chaindIdsForGasFee.includes(receivingChainId)) {
    const gasLimitForFulfill = BigNumber.from(GAS_ESTIMATES.fulfill);
    const [ethPriceInReceivingChain, receivingTokenPrice, gasPriceInReceivingChain] = await Promise.all([
      getTokenPrice(receivingChainId, constants.AddressZero, requestContext),
      getTokenPrice(receivingChainId, receivingAssetId, requestContext),
      getGasPrice(receivingChainId, requestContext),
    ]);

    const gasAmountInUsd = gasPriceInReceivingChain.mul(gasLimitForFulfill).mul(ethPriceInReceivingChain);
    const tokenAmountForGasFee = receivingTokenPrice.isZero()
      ? constants.Zero
      : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

    totalCost = totalCost.add(tokenAmountForGasFee);
  }

  return totalCost;
};

/**
 * Gets token price in usd from price oracle
 *
 * @param chainId The network identifier
 * @param assetId The asset address to get price for
 */
export const getTokenPrice = async (
  chainId: number,
  assetId: string,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const { txService } = getContext();
  const oracleContractAddress = getOracleContractAddress(chainId, requestContext);
  const encodedTokenPriceData = getPriceOracleInterface().encodeFunctionData("getTokenPrice", [assetId]);
  const tokenPrice = await txService.readTx({ chainId, to: oracleContractAddress, data: encodedTokenPriceData });
  return BigNumber.from(tokenPrice);
};

/**
 * Gets gas price in usd
 *
 * @param chainId The network identifier
 * @param requestContext Request context
 * @returns Gas price
 */
export const getGasPrice = async (chainId: number, requestContext: RequestContext): Promise<BigNumber> => {
  const { txService } = getContext();
  const gasPrice = await txService.getGasPrice(chainId, requestContext);
  return gasPrice;
};

/**
 * Gets chain ids to take fee from
 */
export const getChainIdForGasFee = (): number[] => {
  return getDeployedChainIdsForGasFee();
};

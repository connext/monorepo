import {
  getNtpTimeSeconds as _getNtpTimeSeconds,
  RequestContext,
  GAS_ESTIMATES,
  getChainData,
} from "@connext/nxtp-utils";
import { getAddress } from "@ethersproject/address";
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

export const getMainnetEquivalent = async (assetId: string, chainId: number): Promise<string> => {
  const chainData = await getChainData();
  if (!chainData || !chainData.has(chainId.toString())) {
    throw new Error(`No chain data found for ${chainId}`);
  }
  const chain = chainData.get(chainId.toString())!;
  const equiv =
    chain.assetId[getAddress(assetId)]?.mainnetEquivalent ??
    chain.assetId[assetId.toLowerCase()]?.mainnetEquivalent ??
    chain.assetId[assetId.toUpperCase()]?.mainnetEquivalent ??
    chain.assetId[assetId]?.mainnetEquivalent;

  if (!equiv) {
    throw new Error(`No mainnet equivalent found for ${assetId} on ${chainId}`);
  }
  return getAddress(equiv);
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
  // NOTE: hardcoding in optimism to allow for fees before oracle can be
  // properly deployed
  const chaindIdsForGasFee = [...getChainIdForGasFee(), 10];

  if (!chaindIdsForGasFee.includes(sendingChainId) && !chaindIdsForGasFee.includes(receivingChainId))
    return constants.Zero;
  let totalCost = constants.Zero;
  // TODO: this is returning zero when doing a rinkeby to goerli tx. i believe this is because the oracle
  // is not configured for goerli so theres no way to translate the price to goerli
  // TODO: we can combine these into just 2 if statements and remove the repeated logic
  // calculate receiving token amount for gas fee
  // if chaindIdsForGasFee includes only sendingChainId, calculate gas fee for fulfill transactions
  // if chaindIdsForGasFee includes only receivingChainId, calculate gas fee for prepare transactions

  // NOTE: to handle optimism gas fees before oracle is deployed, use mainnet
  // oracle token pricing and optimism gas price
  const tokenPricingSendingChain = sendingChainId === 10 ? 1 : sendingChainId;
  const tokenPricingReceivingChain = receivingChainId === 10 ? 1 : receivingChainId;

  const tokenPricingAssetIdSendingChain =
    sendingChainId === 10 ? await getMainnetEquivalent(sendingAssetId, sendingChainId) : sendingAssetId;
  const tokenPricingAssetIdReceivingChain =
    receivingChainId === 10 ? await getMainnetEquivalent(receivingAssetId, receivingChainId) : receivingAssetId;

  if (chaindIdsForGasFee.includes(sendingChainId)) {
    const gasLimitForFulfill = BigNumber.from(GAS_ESTIMATES.fulfill);
    const [ethPriceInSendingChain, receivingTokenPrice, gasPriceInSendingChain] = await Promise.all([
      getTokenPrice(tokenPricingSendingChain, constants.AddressZero, requestContext),
      getTokenPrice(tokenPricingSendingChain, tokenPricingAssetIdSendingChain, requestContext),
      getGasPrice(sendingChainId, requestContext),
    ]);

    // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
    let l1GasInUsd = BigNumber.from(0);
    if (sendingChainId === 10) {
      const gasPriceMainnet = await getGasPrice(1, requestContext);
      l1GasInUsd = gasPriceMainnet.mul(GAS_ESTIMATES.fulfillL1).mul(ethPriceInSendingChain);
    }
    const gasAmountInUsd = gasPriceInSendingChain.mul(gasLimitForFulfill).mul(ethPriceInSendingChain).add(l1GasInUsd);
    const tokenAmountForGasFee = receivingTokenPrice.isZero()
      ? constants.Zero
      : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

    totalCost = totalCost.add(tokenAmountForGasFee);
  }

  if (chaindIdsForGasFee.includes(receivingChainId)) {
    const gasLimitForPrepare = BigNumber.from(GAS_ESTIMATES.prepare);
    const [ethPriceInReceivingChain, receivingTokenPrice, gasPriceInReceivingChain] = await Promise.all([
      getTokenPrice(tokenPricingReceivingChain, constants.AddressZero, requestContext),
      getTokenPrice(tokenPricingReceivingChain, tokenPricingAssetIdReceivingChain, requestContext),
      getGasPrice(receivingChainId, requestContext),
    ]);

    // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
    let l1GasInUsd = BigNumber.from(0);
    if (receivingChainId === 10) {
      const gasPriceMainnet = await getGasPrice(1, requestContext);
      l1GasInUsd = gasPriceMainnet.mul(GAS_ESTIMATES.prepareL1).mul(ethPriceInReceivingChain);
    }
    const gasAmountInUsd = gasPriceInReceivingChain
      .mul(gasLimitForPrepare)
      .mul(ethPriceInReceivingChain)
      .add(l1GasInUsd);
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

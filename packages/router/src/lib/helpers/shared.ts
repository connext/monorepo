import {
  getNtpTimeSeconds as _getNtpTimeSeconds,
  RequestContext,
  GAS_ESTIMATES,
  getChainData,
  createLoggingContext,
} from "@connext/nxtp-utils";
import { BigNumber, constants, utils } from "ethers";

import { getOracleContractAddress, getPriceOracleInterface } from "../../adapters/contract/contract";
import { cachedPriceMap } from "../../bindings/prices";
import { getDeployedChainIdsForGasFee } from "../../config";
import { getContext } from "../../router";

const NO_ORACLE_CHAINS: number[] = [];

/**
 * Helper to allow easy mocking
 */
export const getNtpTimeSeconds = async () => {
  return await _getNtpTimeSeconds();
};

/**
 * Returns the mainnet equivalent of the given asset on the given chain.
 * @param assetId Address you want mainnet equivalent of
 * @param chainId Chain your asset lives on
 * @returns Address of equivalent asset on mainnet
 */
export const getMainnetEquivalent = async (assetId: string, chainId: number): Promise<string> => {
  const chainData = await getChainData();
  if (!chainData || !chainData.has(chainId.toString())) {
    throw new Error(`No chain data found for ${chainId}`);
  }
  const chain = chainData.get(chainId.toString())!;
  const equiv =
    chain.assetId[utils.getAddress(assetId)] ??
    chain.assetId[assetId.toLowerCase()] ??
    chain.assetId[assetId.toUpperCase()] ??
    chain.assetId[assetId];

  if (!equiv || !equiv.mainnetEquivalent) {
    throw new Error(`No mainnet equivalent found for ${assetId} on ${chainId}`);
  }
  return utils.getAddress(equiv.mainnetEquivalent);
};

/**
 * Returns the decimals of mainnet equivalent of the given asset on the given chain.
 * @param assetId Address you want mainnet equivalent of
 * @param chainId Chain your asset lives on
 * @returns Decimals of equivalent asset on mainnet
 */
export const getMainnetDecimals = async (assetId: string, chainId: number): Promise<number> => {
  const mainnet = await getMainnetEquivalent(assetId, chainId);

  const { txService } = getContext();
  const decimals = await txService.getDecimalsForAsset(1, mainnet);
  return decimals;
};

/**
 * Helper to calculate router gas fee in token
 *
 * @param sendingAssetId The asset address on source chain
 * @param sendingChainId The source chain Id
 * @param receivingAssetId The asset address on destination chain
 * @param receivingChainId The destination chain Id
 * @param _outputDecimals Decimal number of receiving asset
 * @param requestContext Request context instance
 */
export const calculateGasFeeInReceivingToken = async (
  sendingAssetId: string,
  sendingChainId: number,
  receivingAssetId: string,
  receivingChainId: number,
  outputDecimals: number,
  _requestContext: RequestContext,
): Promise<BigNumber> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(calculateGasFeeInReceivingToken.name, _requestContext);
  logger.info("Method start", requestContext, methodContext, {
    sendingChainId,
    sendingAssetId,
    receivingAssetId,
    receivingChainId,
    outputDecimals,
  });

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

  // NOTE: to handle optimism gas fees before oracle is deployed, use mainnet
  // oracle token pricing and optimism gas price
  const tokenPricingSendingChain = NO_ORACLE_CHAINS.includes(sendingChainId) ? 1 : sendingChainId;
  const tokenPricingReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId) ? 1 : receivingChainId;

  const tokenPricingAssetIdSendingChain = NO_ORACLE_CHAINS.includes(sendingChainId)
    ? await getMainnetEquivalent(sendingAssetId, sendingChainId)
    : sendingAssetId;
  const tokenPricingAssetIdReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId)
    ? await getMainnetEquivalent(receivingAssetId, receivingChainId)
    : receivingAssetId;

  logger.info("Getting token prices", requestContext, methodContext, {
    tokenPricingSendingChain,
    tokenPricingReceivingChain,
    tokenPricingAssetIdSendingChain,
    tokenPricingAssetIdReceivingChain,
    outputDecimals,
  });
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
    logger.info("Calculated cost on sending chain", requestContext, methodContext, {
      totalCost: totalCost.toString(),
      l1GasInUsd: l1GasInUsd.toString(),
      ethPriceInSendingChain: ethPriceInSendingChain.toString(),
      receivingTokenPrice: receivingTokenPrice.toString(),
      gasPriceInSendingChain: gasPriceInSendingChain.toString(),
    });
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
    logger.info("Calculated cost on receiving chain", requestContext, methodContext, {
      totalCost: totalCost.toString(),
      tokenAmountForGasFee: tokenAmountForGasFee.toString(),
      l1GasInUsd: l1GasInUsd.toString(),
      ethPriceInSendingChain: ethPriceInReceivingChain.toString(),
      receivingTokenPrice: receivingTokenPrice.toString(),
      gasPriceInSendingChain: gasPriceInReceivingChain.toString(),
    });
  }

  // convert back to the intended decimals
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
  _requestContext: RequestContext,
): Promise<BigNumber> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(calculateGasFeeInReceivingToken.name, _requestContext);
  logger.info("Method start", requestContext, methodContext, {
    receivingAssetId,
    receivingChainId,
    outputDecimals,
  });
  const chaindIdsForGasFee = getChainIdForGasFee();

  if (!chaindIdsForGasFee.includes(receivingChainId)) return constants.Zero;
  let totalCost = constants.Zero;

  const tokenPricingReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId) ? 1 : receivingChainId;

  const tokenPricingAssetIdReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId)
    ? await getMainnetEquivalent(receivingAssetId, receivingChainId)
    : receivingAssetId;

  if (chaindIdsForGasFee.includes(receivingChainId)) {
    const gasLimitForFulfill = BigNumber.from(GAS_ESTIMATES.fulfill);
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
      .mul(gasLimitForFulfill)
      .mul(ethPriceInReceivingChain)
      .add(l1GasInUsd);
    const tokenAmountForGasFee = receivingTokenPrice.isZero()
      ? constants.Zero
      : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

    logger.info("Calculated cost on receiving chain for fulfill", requestContext, methodContext, {
      totalCost: totalCost.toString(),
      tokenAmountForGasFee: tokenAmountForGasFee.toString(),
      l1GasInUsd: l1GasInUsd.toString(),
      ethPriceInReceivingChain: ethPriceInReceivingChain.toString(),
      receivingTokenPrice: receivingTokenPrice.toString(),
      gasPriceInReceivingChain: gasPriceInReceivingChain.toString(),
    });

    totalCost = totalCost.add(tokenAmountForGasFee);
  }

  return totalCost;
};

/**
 * Gets token price in usd from cache first. If its not cached, gets price from price oracle.
 *
 * @param chainId The network identifier
 * @param assetId The asset address to get price for
 */
export const getTokenPrice = async (
  chainId: number,
  assetId: string,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const cachedPriceKey = chainId.toString().concat("-").concat(assetId);
  const cachedTokenPrice = cachedPriceMap.get(cachedPriceKey);
  const curTimeInSecs = await getNtpTimeSeconds();

  // If it's been less than a minute since we retrieved token price, send the last update in token price.
  if (cachedTokenPrice && cachedTokenPrice.timestamp <= curTimeInSecs + 60) {
    return cachedTokenPrice.price;
  }

  // Gets token price from onchain.
  const tokenPrice = await getTokenPriceFromOnChain(chainId, assetId, requestContext);
  cachedPriceMap.set(cachedPriceKey, { timestamp: curTimeInSecs, price: tokenPrice });

  return tokenPrice;
};

export const getTokenPriceFromOnChain = async (
  chainId: number,
  assetId: string,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const { txService } = getContext();
  const oracleContractAddress = getOracleContractAddress(chainId, requestContext);
  const encodedTokenPriceData = getPriceOracleInterface().encodeFunctionData("getTokenPrice", [assetId]);
  const tokenPriceRes = await txService.readTx({ chainId, to: oracleContractAddress, data: encodedTokenPriceData });
  const tokenPrice = BigNumber.from(tokenPriceRes);

  return tokenPrice;
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

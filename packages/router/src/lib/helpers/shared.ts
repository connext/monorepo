import { getNtpTimeSeconds as _getNtpTimeSeconds, RequestContext, getChainData } from "@connext/nxtp-utils";
import { BigNumber, utils } from "ethers";

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
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const { txService } = getContext();
  return txService.calculateGasFeeInReceivingToken(
    sendingChainId,
    sendingAssetId,
    receivingChainId,
    receivingAssetId,
    outputDecimals,
    requestContext,
  );
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
  const { txService } = getContext();
  return txService.calculateGasFeeInReceivingTokenForFulfill(
    receivingChainId,
    receivingAssetId,
    outputDecimals,
    requestContext,
  );
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
  return txService.getTokenPrice(chainId, assetId, requestContext);
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

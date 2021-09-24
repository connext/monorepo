import { getNtpTimeSeconds as _getNtpTimeSeconds, RequestContext, GAS_ESTIMATES } from "@connext/nxtp-utils";
import { BigNumber } from "@ethersproject/bignumber";
import { constants } from "ethers";
import { getOracleContractAddress } from "../../adapters/contract/contract";
import { getContext } from "../../router";
import { ETHEREUM_CHAIN_ID } from "./auction";

/**
 * Helper to allow easy mocking
 */
export const getNtpTimeSeconds = async () => {
  return await _getNtpTimeSeconds();
};

/**
 * Helper to calculate router gas fee in token
 *
 * @param sendingChainId The source chain Id
 * @param receivingAssetId The asset address on destination chain
 * @param receivingChainId The destination chain Id
 * @param outputDecimals Decimal number of receiving asset
 * @param requestContext Request context instance
 */
export const calculateGasFeeInReceivingToken = async (
  sendingChainId: number,
  receivingAssetId: string,
  receivingChainId: number,
  outputDecimals: number,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const chaindIdForGasFee = getChainIdForGasFee();
  if (chaindIdForGasFee != sendingChainId && chaindIdForGasFee != receivingChainId) return constants.Zero;

  const ethPrice = await getTokenPrice(chaindIdForGasFee, constants.AddressZero);
  const receivingTokenPrice = await getTokenPrice(chaindIdForGasFee, receivingAssetId);
  const gasPrice = await getGasPrice(chaindIdForGasFee, requestContext);

  // calculate gas limit for transactions on Ethereum
  // sendingChainId == chaindIdForGasFee, calculate gas fee for fulfill transaction
  // receivingChainId == chaindIdForGasFee, calculate gas fee for prepare transaction
  let gasLimit;
  if (sendingChainId == chaindIdForGasFee) {
    gasLimit = GAS_ESTIMATES.fulfill;
  } else if (receivingChainId == chaindIdForGasFee) {
    gasLimit = GAS_ESTIMATES.prepare;
  } else {
    gasLimit = constants.Zero;
  }

  const gasAmount = gasPrice.mul(gasLimit);

  const gasAmountInUsd = gasAmount
    .mul(ethPrice)
    .div(receivingTokenPrice)
    .div(BigNumber.from(10).pow(18 - outputDecimals));

  return gasAmountInUsd;
};
/**
 * Gets token price in usd from price oracle
 *
 * @param chainId The network identifier
 * @param assetId The asset address to get price for
 */
export const getTokenPrice = async (chainId: number, assetId: string): Promise<BigNumber> => {
  const { txService } = getContext();
  const oracleContractAddress = getOracleContractAddress(chainId);
  const tokenPrice = await txService.getTokenPrice(chainId, oracleContractAddress, assetId);
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
 * Gets chain id to take fee from
 */
export const getChainIdForGasFee = () => {
  return ETHEREUM_CHAIN_ID;
};

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
  const { txService } = getContext();

  const oracleContractAddress = getOracleContractAddress(ETHEREUM_CHAIN_ID);

  const ethPrice = await txService.getTokenPrice(ETHEREUM_CHAIN_ID, oracleContractAddress, constants.AddressZero);
  const receivingTokenPrice = await txService.getTokenPrice(ETHEREUM_CHAIN_ID, oracleContractAddress, receivingAssetId);
  const gasPrice = await txService.getGasPrice(ETHEREUM_CHAIN_ID, requestContext);

  // calculate gas limit for transactions on Ethereum
  // sendingChainId = 1, calculate gas fee for fulfill transaction
  // receivingChainId = 1, calculate gas fee for prepare transaction
  let gasLimit;
  if (sendingChainId == ETHEREUM_CHAIN_ID) {
    gasLimit = GAS_ESTIMATES.fulfill;
  } else if (receivingChainId == ETHEREUM_CHAIN_ID) {
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

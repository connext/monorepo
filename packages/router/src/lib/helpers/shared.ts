import { AuctionPayload, getNtpTimeSeconds as _getNtpTimeSeconds, RequestContext } from "@connext/nxtp-utils";
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
 */
export const calculateGasFeeInReceivingToken = async (
  data: AuctionPayload,
  outputDecimals: number,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const {
    user,
    sendingChainId,
    sendingAssetId,
    amount,
    receivingAssetId,
    receivingChainId,
    expiry,
    encryptedCallData,
    callDataHash,
    callTo,
    transactionId,
    receivingAddress,
    dryRun,
  } = data;

  const { txService } = getContext();

  const oracleContractAddress = getOracleContractAddress(ETHEREUM_CHAIN_ID);

  const ethPrice = await txService.getTokenPrice(ETHEREUM_CHAIN_ID, oracleContractAddress, constants.AddressZero);
  const receivingTokenPrice = await txService.getTokenPrice(ETHEREUM_CHAIN_ID, oracleContractAddress, receivingAssetId);

  // calculate gas fee for transactions on Ethereum
  // sendingChainId = 1, calculate gas fee for fulfill transaction
  // receivingChainId = 1, calculate gas fee for prepare transaction
  let gasAmount;
  if (sendingChainId == ETHEREUM_CHAIN_ID) {
    gasAmount = await calculateGasFeeForFulfill(data);
  } else if (receivingChainId == ETHEREUM_CHAIN_ID) {
    gasAmount = await calculateGasFeeForPrepare(data);
  } else {
    gasAmount = constants.Zero;
  }

  const gasAmountInUsd = gasAmount
    .mul(ethPrice)
    .div(receivingTokenPrice)
    .div(BigNumber.from(10).pow(18 - outputDecimals));

  return gasAmountInUsd;
};

export const calculateGasFeeForPrepare = async (data: AuctionPayload): Promise<BigNumber> => {
  return constants.Zero;
};

export const calculateGasFeeForFulfill = async (data: AuctionPayload): Promise<BigNumber> => {
  return constants.Zero;
};

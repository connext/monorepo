import { WriteTransaction } from "@connext/nxtp-txservice";
import {
  AuctionPayload,
  getNtpTimeSeconds as _getNtpTimeSeconds,
  RequestContext,
  AuctionBid,
  signAuctionBid,
  encodeAuctionBid,
  InvariantTransactionData,
} from "@connext/nxtp-utils";
import { BigNumber } from "@ethersproject/bignumber";
import { constants } from "ethers";
import { getBidExpiry } from ".";
import { getContractAddress, getOracleContractAddress, getTxManagerInterface } from "../../adapters/contract/contract";
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
  const { sendingChainId, receivingAssetId, receivingChainId } = data;

  const { txService } = getContext();

  const oracleContractAddress = getOracleContractAddress(ETHEREUM_CHAIN_ID);

  const ethPrice = await txService.getTokenPrice(ETHEREUM_CHAIN_ID, oracleContractAddress, constants.AddressZero);
  const receivingTokenPrice = await txService.getTokenPrice(ETHEREUM_CHAIN_ID, oracleContractAddress, receivingAssetId);

  // calculate gas fee for transactions on Ethereum
  // sendingChainId = 1, calculate gas fee for fulfill transaction
  // receivingChainId = 1, calculate gas fee for prepare transaction
  let gasAmount;
  if (sendingChainId == ETHEREUM_CHAIN_ID) {
    gasAmount = await calculateGasFeeForFulfill(data, requestContext);
  } else if (receivingChainId == ETHEREUM_CHAIN_ID) {
    gasAmount = await calculateGasFeeForPrepare(data, requestContext);
  } else {
    gasAmount = constants.Zero;
  }

  const gasAmountInUsd = gasAmount
    .mul(ethPrice)
    .div(receivingTokenPrice)
    .div(BigNumber.from(10).pow(18 - outputDecimals));

  return gasAmountInUsd;
};

export const calculateGasFeeForPrepare = async (
  data: AuctionPayload,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const { config, wallet, txService } = getContext();
  const sendingConfig = config.chainConfig[data.sendingChainId];
  const receivingConfig = config.chainConfig[data.receivingChainId];
  const currentTime = await getNtpTimeSeconds();
  const bidExpiry = getBidExpiry(currentTime);
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
  const bid: AuctionBid = {
    user,
    router: wallet.address,
    sendingChainId,
    sendingAssetId,
    amount,
    receivingChainId,
    receivingAssetId,
    amountReceived: amount,
    receivingAddress,
    transactionId,
    expiry,
    callDataHash,
    callTo,
    encryptedCallData,
    sendingChainTxManagerAddress: sendingConfig.transactionManagerAddress,
    receivingChainTxManagerAddress: receivingConfig.transactionManagerAddress,
    bidExpiry,
  };

  const bidSignature = await signAuctionBid(bid, wallet);
  const encodedBid = await encodeAuctionBid(bid);

  const invariantData: InvariantTransactionData = {
    receivingChainTxManagerAddress: receivingConfig.transactionManagerAddress,
    user,
    router: wallet.address,
    sendingAssetId,
    receivingAssetId,
    sendingChainFallback: user,
    callTo,
    receivingAddress,
    sendingChainId,
    receivingChainId,
    callDataHash,
    transactionId,
  };

  const encodedData = getTxManagerInterface().encodeFunctionData("prepare", [
    invariantData,
    amount,
    expiry,
    encryptedCallData,
    encodedBid,
    bidSignature,
  ]);

  const nxtpContractAddress = getContractAddress(ETHEREUM_CHAIN_ID);

  const prepareTransaction: WriteTransaction = {
    to: nxtpContractAddress,
    data: encodedData,
    value: constants.Zero,
    chainId: ETHEREUM_CHAIN_ID,
    from: wallet.address,
  };

  const gasAmount = await txService.getGasForTx(prepareTransaction, requestContext);

  return gasAmount;
};

export const calculateGasFeeForFulfill = async (
  data: AuctionPayload,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  return constants.Zero;
};

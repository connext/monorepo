import {
  AuctionBid,
  recoverAuctionBid as _recoverAuctionBid,
  decodeAuctionBid as _decodeAuctionBid,
  calculateExchangeAmount,
  getRateFromPercentage,
  calculateExchangeWad,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { PriceImpactTooHigh } from "../errors/auction";

import { AmountInvalid } from "../errors/prepare";
import { getSwapRateFromVirutalAMM } from "./shared";

const ROUTER_FEE = "0.05"; // 0.05%
const EXPIRY_DECREMENT = 3600 * 24;
const ONE_DAY_IN_SECONDS = 3600 * 24;
const ONE_WEEK_IN_SECONDS = 3600 * 24 * 7;

/**
 * Determine if expiry is valid
 *
 * @remarks Should use the latest block of the *receiving* chain
 *
 * @param buffer - The expiry buffer to check validity of
 */
export const validExpiryBuffer = (buffer: number) => buffer > ONE_DAY_IN_SECONDS && buffer < ONE_WEEK_IN_SECONDS;

/**
 * Determine if the bid expiry is valid.
 */
export const validBidExpiry = (bidExpiry: number, currentTime: number) => bidExpiry > currentTime;

/**
 * Returns the swapRate
 *
 * @param TODO
 * @returns The swapRate, determined by the AMM
 *
 * @remarks
 * TODO: getSwapRate using AMM
 */
export const getSwapRate = async (
  chainIdForAMM: number,
  amount: BigNumber,
  balances: BigNumber[],
  indexIn: number,
  indexOut: number,
  stableSwapAddress: string,
): Promise<BigNumber> => {
  const amountOut = await getSwapRateFromVirutalAMM(
    chainIdForAMM,
    amount,
    balances,
    indexIn,
    indexOut,
    stableSwapAddress,
  );

  return amountOut;
};

/**
 * Returns the amount * swapRate to deduct fees when going from sending -> recieving chain to incentivize routing.
 *
 * @param amount The amount of the transaction on the sending chain
 * @returns The amount, less fees as determined by the swapRate
 *
 * @remarks
 * Router fulfills on sending chain, so gets `amount`, and user fulfills on receiving chain so gets `amount * swapRate`
 */
export const getReceiverAmount = async (
  amount: string,
  inputDecimals: number,
  outputDecimals: number,
  chainIdForAMM: number,
  stableSwapAddress: string,
  senderBalance: BigNumber,
  receiverBalance: BigNumber,
  maxPriceImpact: number,
): Promise<string> => {
  if (amount.includes(".")) {
    throw new AmountInvalid(amount);
  }

  const convertedSenderBalance = senderBalance.mul(BigNumber.from(10).pow(18 - inputDecimals));
  const convertedReceiverBalance = receiverBalance.mul(BigNumber.from(10).pow(18 - outputDecimals));
  const inputAmount = BigNumber.from(amount).mul(BigNumber.from(10).pow(18 - inputDecimals));
  const balances: BigNumber[] = [convertedSenderBalance, convertedReceiverBalance];
  // 1. swap rate from AMM
  const amountAfterSwapRate = await getSwapRate(
    chainIdForAMM,
    BigNumber.from(inputAmount),
    balances,
    0,
    1,
    stableSwapAddress,
  );

  // check price impact
  const deltaPrice = amountAfterSwapRate.gt(inputAmount)
    ? amountAfterSwapRate.sub(inputAmount)
    : BigNumber.from(inputAmount).sub(amountAfterSwapRate);
  if (deltaPrice > inputAmount.mul(maxPriceImpact).div(100)) {
    throw new PriceImpactTooHigh(inputAmount.toString(), amountAfterSwapRate.toString(), maxPriceImpact, {
      inputDecimals,
      outputDecimals,
    });
  }
  // 2. flat fee by Router
  const outputAmount = amountAfterSwapRate.div(BigNumber.from(10).pow(18 - outputDecimals));
  const routerFeeRate = getRateFromPercentage(ROUTER_FEE);
  const receivingAmount = calculateExchangeAmount(outputAmount.toString(), routerFeeRate);
  return receivingAmount.split(".")[0];
};

/**
 * Returns the expiry - EXPIRY_DECREMENT to ensure the receiving-side transfer expires prior to the sending-side transfer.
 *
 * @param buffer The expiry of the transaction on the sending chain
 * @returns The expiry for the receiving-chain transaction (expires sooner than the sending-chain transaction)
 *
 * @remarks
 * Recieiving chain expires first to force the secret to be revealed on the receiving side before the sending side expires
 */
export const getReceiverExpiryBuffer = (buffer: number): number => {
  const rxExpiry = buffer - EXPIRY_DECREMENT;
  return rxExpiry;
};

/**
 * This is only here to make it easier for sinon mocks to happen in the tests. Otherwise, this is a very dumb thing.
 *
 * @param bid - Bid information that should've been signed
 * @param signature - Signature to recover signer of
 * @returns Recovered signer
 */
export const recoverAuctionBid = (bid: AuctionBid, signature: string): string => {
  return _recoverAuctionBid(bid, signature);
};

export const decodeAuctionBid = _decodeAuctionBid;

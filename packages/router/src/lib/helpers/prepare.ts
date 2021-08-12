import {
  AuctionBid,
  recoverAuctionBid as _recoverAuctionBid,
  decodeAuctionBid as _decodeAuctionBid,
  calculateExchangeWad,
} from "@connext/nxtp-utils";
import { BigNumber } from "@ethersproject/bignumber";
import { AmountInvalid } from "../errors/prepare";

const EXPIRY_DECREMENT = 3600 * 24;
const SWAP_RATE = "0.9995"; // 0.05% fee
const ONE_DAY_IN_SECONDS = 3600 * 24;

/** Determine if expiry is valid */
export const validExpiry = (expiry: number) => expiry - Math.floor(Date.now() / 1000) > ONE_DAY_IN_SECONDS;

/**
 * Returns the amount * SWAP_RATE to deduct fees when going from sending -> recieving chain to incentivize routing.
 *
 * @param amount The amount of the transaction on the sending chain
 * @returns The amount, less fees as determined by the SWAP_RATE
 *
 * @remarks
 * Router fulfills on sending chain, so gets `amount`, and user fulfills on receiving chain so gets `amount * SWAP_RATE`
 */
export const getReceiverAmount = (amount: string, inputDecimals: number, outputDecimals: number) => {
  if (amount.includes(".")) {
    throw new AmountInvalid(amount);
  }
  return calculateExchangeWad(BigNumber.from(amount), inputDecimals, SWAP_RATE, outputDecimals);
};

/**
 * Returns the expiry - EXPIRY_DECREMENT to ensure the receiving-side transfer expires prior to the sending-side transfer.
 *
 * @param expiry The expiry of the transaction on the sending chain
 * @returns The expiry for the receiving-chain transaction (expires sooner than the sending-chain transaction)
 *
 * @remarks
 * Recieiving chain expires first to force the secret to be revealed on the receiving side before the sending side expires
 */
export const getReceiverExpiry = (expiry: number): number => {
  const rxExpiry = expiry - EXPIRY_DECREMENT;
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

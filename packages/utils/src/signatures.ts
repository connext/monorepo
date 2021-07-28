import { Signer, Wallet, utils } from "ethers";

import { encodeAuctionBid, encodeCancelData, encodeFulfillData } from "./encode";
import { AuctionBid } from "./messaging";

/**
 * Generates a signature on an fulfill transaction payload
 *
 * @param transactionId - Transaction ID that was signed
 * @param relayerFee - Relayer fee that was signed
 * @param signature - Signature to recover signer of
 * @returns Signature of the payload from the signer
 */
export const signFulfillTransactionPayload = (
  transactionId: string,
  relayerFee: string,
  signer: Wallet | Signer,
): Promise<string> => {
  const payload = encodeFulfillData(transactionId, relayerFee);
  const hash = utils.solidityKeccak256(["bytes"], [payload]);

  return signer.signMessage(utils.arrayify(hash));
};

/**
 * Returns the recovered signer from the fulfilled transaction
 *
 * @param transactionId - Transaction ID that was signed
 * @param relayerFee - Relayer fee that was signed
 * @param signature - Signature to recover signer of
 * @returns Recovered address of signer
 */
export const recoverFulfilledTransactionPayload = (
  transactionId: string,
  relayerFee: string,
  signature: string,
): string => {
  const payload = encodeFulfillData(transactionId, relayerFee);
  const hashed = utils.solidityKeccak256(["bytes"], [payload]);
  return utils.verifyMessage(utils.arrayify(hashed), signature);
};

/**
 * Generates a signature on an cancel transaction payload
 *
 * @param transactionId - Transaction ID that was signed
 * @param relayerFee - Relayer fee that was signed
 * @param signature - Signature to recover signer of
 * @returns Signature of the payload from the signer
 */
export const signCancelTransactionPayload = async (
  transactionId: string,
  relayerFee: string,
  signer: Signer,
): Promise<string> => {
  const payload = encodeCancelData(transactionId, relayerFee);
  const hashed = utils.solidityKeccak256(["bytes"], [payload]);
  return signer.signMessage(utils.arrayify(hashed));
};

/**
 * Returns the recovered signer from the cancelled transaction
 *
 * @param transactionId - Transaction ID that was signed
 * @param relayerFee - Relayer fee that was signed
 * @param signature - Signature to recover signer of
 * @returns Recovered address of signer
 */
export const recoverCancelTransactionPayload = (
  transactionId: string,
  relayerFee: string,
  signature: string,
): string => {
  const payload = encodeCancelData(transactionId, relayerFee);
  const hashed = utils.solidityKeccak256(["bytes"], [payload]);
  return utils.verifyMessage(utils.arrayify(hashed), signature);
};

/**
 * Generates a signature on an auction bid
 *
 * @param bid - Bid to sign
 * @param signer - Account signing the bid
 * @returns Signature of the bid from the signer
 */
export const signAuctionBid = async (bid: AuctionBid, signer: Signer): Promise<string> => {
  const payload = encodeAuctionBid(bid);
  const hashed = utils.solidityKeccak256(["bytes"], [payload]);
  return signer.signMessage(utils.arrayify(hashed));
};

/**
 * Recovers the signer of a given auction bid
 *
 * @param bid - Bid information that should've been signed
 * @param signature - Signature to recover signer of
 * @returns Recovered signer
 */
export const recoverAuctionBid = (bid: AuctionBid, signature: string): string => {
  const payload = encodeAuctionBid(bid);
  const hashed = utils.solidityKeccak256(["bytes"], [payload]);
  return utils.verifyMessage(utils.arrayify(hashed), signature);
};

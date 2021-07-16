import { Signer, Wallet, utils } from "ethers";

import { encodeAuctionBid, encodeCancelData, encodeFulfillData, encodePrepareData } from "./encode";
import { AuctionBid } from "./messaging";

export const signFulfillTransactionPayload = (
  transactionId: string,
  relayerFee: string,
  signer: Wallet | Signer,
): Promise<string> => {
  const payload = encodeFulfillData(transactionId, relayerFee);
  const hash = utils.solidityKeccak256(["bytes"], [payload]);

  return signer.signMessage(utils.arrayify(hash));
};

export const recoverFulfilledTransactionPayload = (
  transactionId: string,
  relayerFee: string,
  signature: string,
): string => {
  const payload = encodeFulfillData(transactionId, relayerFee);
  const hashed = utils.solidityKeccak256(["bytes"], [payload]);
  return utils.verifyMessage(utils.arrayify(hashed), signature);
};

export const signCancelTransactionPayload = async (
  transactionId: string,
  relayerFee: string,
  signer: Signer,
): Promise<string> => {
  const payload = encodeCancelData(transactionId, relayerFee);
  const hashed = utils.solidityKeccak256(["bytes"], [payload]);
  return signer.signMessage(utils.arrayify(hashed));
};

export const recoverCancelTransactionPayload = (
  transactionId: string,
  relayerFee: string,
  signature: string,
): string => {
  const payload = encodeCancelData(transactionId, relayerFee);
  const hashed = utils.solidityKeccak256(["bytes"], [payload]);
  return utils.verifyMessage(utils.arrayify(hashed), signature);
};

export const signPrepareTransactionPayload = async (
  transactionId: string,
  amount: string,
  signer: Signer,
): Promise<string> => {
  const payload = encodePrepareData(transactionId, amount);
  const hashed = utils.solidityKeccak256(["bytes"], [payload]);
  return signer.signMessage(utils.arrayify(hashed));
};

export const recoverPrepareTransactionPayload = (transactionId: string, amount: string, signature: string): string => {
  const payload = encodePrepareData(transactionId, amount);
  const hashed = utils.solidityKeccak256(["bytes"], [payload]);
  return utils.verifyMessage(utils.arrayify(hashed), signature);
};

export const signAuctionBid = async (bid: AuctionBid, signer: Signer): Promise<string> => {
  const payload = encodeAuctionBid(bid);
  const hashed = utils.solidityKeccak256(["bytes"], [payload]);
  return signer.signMessage(utils.arrayify(hashed));
};

export const recoverAuctionBid = (bid: AuctionBid, signature: string): string => {
  const payload = encodeAuctionBid(bid);
  const hashed = utils.solidityKeccak256(["bytes"], [payload]);
  return utils.verifyMessage(utils.arrayify(hashed), signature);
};

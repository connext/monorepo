import { Signer, Wallet } from "ethers";
import { arrayify, solidityKeccak256, verifyMessage } from "ethers/lib/utils";

import { encodeCancelData, encodeFulfillData, encodePrepareData } from "./encode";

export const signFulfillTransactionPayload = (
  transactionId: string,
  relayerFee: string,
  signer: Wallet | Signer,
): Promise<string> => {
  const payload = encodeFulfillData(transactionId, relayerFee);
  const hash = solidityKeccak256(["bytes"], [payload]);

  return signer.signMessage(arrayify(hash));
};

export const recoverFulfilledTransactionPayload = (
  transactionId: string,
  relayerFee: string,
  signature: string,
): string => {
  const payload = encodeFulfillData(transactionId, relayerFee);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return verifyMessage(arrayify(hashed), signature);
};

export const signCancelTransactionPayload = async (
  transactionId: string,
  relayerFee: string,
  signer: Signer,
): Promise<string> => {
  const payload = encodeCancelData(transactionId, relayerFee);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return signer.signMessage(arrayify(hashed));
};

export const recoverCancelTransactionPayload = (
  transactionId: string,
  relayerFee: string,
  signature: string,
): string => {
  const payload = encodeCancelData(transactionId, relayerFee);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return verifyMessage(arrayify(hashed), signature);
};

export const signPrepareTransactionPayload = async (
  transactionId: string,
  amount: string,
  signer: Signer,
): Promise<string> => {
  const payload = encodePrepareData(transactionId, amount);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return signer.signMessage(arrayify(hashed));
};

export const recoverPrepareTransactionPayload = (transactionId: string, amount: string, signature: string): string => {
  const payload = encodePrepareData(transactionId, amount);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return verifyMessage(arrayify(hashed), signature);
};

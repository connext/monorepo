import { Signer, Wallet } from "ethers";
import { arrayify, solidityKeccak256, verifyMessage } from "ethers/lib/utils";

import { InvariantTransactionData, TransactionData } from "./transactionManager";
import { encodeCancelData, encodeFulfillData, encodePrepareData } from "./encode";

export const signFulfillTransactionPayload = (
  data: TransactionData,
  relayerFee: string,
  signer: Wallet | Signer,
): Promise<string> => {
  const payload = encodeFulfillData(data.transactionId, relayerFee);
  const hash = solidityKeccak256(["bytes"], [payload]);

  return signer.signMessage(arrayify(hash));
};

export const recoverFulfilledTransactionPayload = (
  data: TransactionData,
  relayerFee: string,
  signature: string,
): string => {
  const payload = encodeFulfillData(data.transactionId, relayerFee);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return verifyMessage(arrayify(hashed), signature);
};

export const signCancelTransactionPayload = async (
  txDataParams: InvariantTransactionData,
  relayerFee: string,
  signer: Signer,
): Promise<string> => {
  const payload = encodeCancelData(txDataParams.transactionId, relayerFee);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return signer.signMessage(arrayify(hashed));
};

export const recoverCancelTransactionPayload = (
  txDataParams: InvariantTransactionData,
  relayerFee: string,
  signature: string,
): string => {
  const payload = encodeCancelData(txDataParams.transactionId, relayerFee);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return verifyMessage(arrayify(hashed), signature);
};

export const signPrepareTransactionPayload = async (txDataParams: TransactionData, signer: Signer): Promise<string> => {
  const payload = encodePrepareData(txDataParams.transactionId, txDataParams.amount);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return signer.signMessage(arrayify(hashed));
};

export const recoverPrepareTransactionPayload = (txDataParams: TransactionData, signature: string): string => {
  const payload = encodePrepareData(txDataParams.transactionId, txDataParams.amount);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return verifyMessage(arrayify(hashed), signature);
};

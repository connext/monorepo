import { Signer, Wallet, BigNumber, providers } from "ethers";
import { arrayify, solidityKeccak256, splitSignature, verifyMessage } from "ethers/lib/utils";

import {
  encodeAuctionBid,
  encodeCancelData,
  encodeFulfillData,
  encodeRouterPrepareData,
  encodeRouterFulfillData,
  encodeRouterCancelData,
  encodeRouterRemoveLiquidityData,
} from "./encode";
import { AuctionBid } from "./messaging";
import { InvariantTransactionData, TransactionData } from "./transactionManager";

/**
 * Occasionally have seen metamask return signatures with v = 00 or v = 01.
 * Signatures having these values will revert when used onchain. Ethers handles
 * these cases in the `splitSignature` function, where it regenerates an
 * appropriate `v` value:
 * https://github.com/ethers-io/ethers.js/blob/c2c0ce75039e7256b287f9a764188d08ed0b7296/packages/bytes/src.ts/index.ts#L348-L355
 *
 * This function will rely on the edgecase handling there to ensure any
 * signatures are properly formatted. This has been tested manually against
 * offending signatures.
 *
 * @param sig Signature to sanitize
 */
const sanitizeSignature = (sig: string): string => {
  if (sig.endsWith("1c") || sig.endsWith("1b")) {
    return sig;
  }

  // Must be sanitized
  const { v } = splitSignature(sig);
  const hex = BigNumber.from(v).toHexString();
  return sig.slice(0, sig.length - 2) + hex.slice(2);
};

const sign = async (hash: string, signer: Wallet | Signer): Promise<string> => {
  const msg = arrayify(hash);
  const addr = await signer.getAddress();
  if (typeof (signer.provider as providers.Web3Provider)?.send === "function") {
    try {
      return sanitizeSignature(await (signer.provider as providers.Web3Provider).send("personal_sign", [hash, addr]));
    } catch (err) {
      // console.error("Error using personal_sign, falling back to signer.signMessage: ", err);
    }
  }

  return sanitizeSignature(await signer.signMessage(msg));
};

/**
 * Generates a signature on an fulfill transaction payload
 *
 * @param transactionId - Transaction ID that was signed
 * @param relayerFee - Relayer fee that was signed
 * @param receivingChainId - Chain id for receiving chain
 * @param receivingChainTxManagerAddress - Address of `TransactionManager.sol` on the receiving chain
 * @param signature - Signature to recover signer of
 * @returns Signature of the payload from the signer
 */
export const signFulfillTransactionPayload = async (
  transactionId: string,
  relayerFee: string,
  receivingChainId: number,
  receivingChainTxManagerAddress: string,
  signer: Wallet | Signer,
): Promise<string> => {
  const hash = getFulfillTransactionHashToSign(
    transactionId,
    relayerFee,
    receivingChainId,
    receivingChainTxManagerAddress,
  );

  return sign(hash, signer);
};

/**
 * Generates a hash to sign of an fulfill transaction payload
 *
 * @param transactionId - Transaction ID that was signed
 * @param relayerFee - Relayer fee that was signed
 * @param receivingChainId - Chain id for receiving chain
 * @param receivingChainTxManagerAddress - Address of `TransactionManager.sol` on the receiving chain
 * @returns Hash that should be signed
 */
export const getFulfillTransactionHashToSign = (
  transactionId: string,
  relayerFee: string,
  receivingChainId: number,
  receivingChainTxManagerAddress: string,
): string => {
  const payload = encodeFulfillData(transactionId, relayerFee, receivingChainId, receivingChainTxManagerAddress);
  const hash = solidityKeccak256(["bytes"], [payload]);
  return hash;
};

/**
 * Returns the recovered signer from the fulfilled transaction
 *
 * @param transactionId - Transaction ID that was signed
 * @param relayerFee - Relayer fee that was signed
 * @param receivingChainId - Chain id for receiving chain
 * @param receivingChainTxManagerAddress - Address of `TransactionManager.sol` on the receiving chain
 * @param signature - Signature to recover signer of
 * @returns Recovered address of signer
 */
export const recoverFulfilledTransactionPayload = (
  transactionId: string,
  relayerFee: string,
  receivingChainId: number,
  receivingChainTxManagerAddress: string,
  signature: string,
): string => {
  const payload = encodeFulfillData(transactionId, relayerFee, receivingChainId, receivingChainTxManagerAddress);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return verifyMessage(arrayify(hashed), signature);
};

/**
 * Generates a signature on an cancel transaction payload
 *
 * @param transactionId - Transaction ID that was signed
 * @param receivingChainId - Chain id for receiving chain
 * @param receivingChainTxManagerAddress - Address of `TransactionManager.sol` on the receiving chain
 * @param signature - Signature to recover signer of
 * @returns Signature of the payload from the signer
 */
export const signCancelTransactionPayload = async (
  transactionId: string,
  receivingChainId: number,
  receivingChainTxManagerAddress: string,
  signer: Signer,
): Promise<string> => {
  const payload = encodeCancelData(transactionId, receivingChainId, receivingChainTxManagerAddress);
  const hash = solidityKeccak256(["bytes"], [payload]);
  return sign(hash, signer);
};

/**
 * Returns the recovered signer from the cancelled transaction
 *
 * @param transactionId - Transaction ID that was signed
 * @param receivingChainId - Chain id for receiving chain
 * @param receivingChainTxManagerAddress - Address of `TransactionManager.sol` on the receiving chain
 * @param signature - Signature to recover signer of
 * @returns Recovered address of signer
 */
export const recoverCancelTransactionPayload = (
  transactionId: string,
  receivingChainId: number,
  receivingChainTxManagerAddress: string,
  signature: string,
): string => {
  const payload = encodeCancelData(transactionId, receivingChainId, receivingChainTxManagerAddress);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return verifyMessage(arrayify(hashed), signature);
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
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return sanitizeSignature(await signer.signMessage(arrayify(hashed)));
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
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return verifyMessage(arrayify(hashed), signature);
};

// Router.sol

const getRouterPrepareTransactionHashToSign = (
  invariantData: InvariantTransactionData,
  amount: string,
  expiry: number,
  encryptedCallData: string,
  encodedBid: string,
  bidSignature: string,
  encodedMeta: string,
  relayerFeeAsset: string,
  relayerFee: string,
): string => {
  const payload = encodeRouterPrepareData(
    invariantData,
    amount,
    expiry,
    encryptedCallData,
    encodedBid,
    bidSignature,
    encodedMeta,
    relayerFeeAsset,
    relayerFee,
  );
  const hash = solidityKeccak256(["bytes"], [payload]);
  return hash;
};

export const signRouterPrepareTransactionPayload = async (
  invariantData: InvariantTransactionData,
  amount: string,
  expiry: number,
  encryptedCallData: string,
  encodedBid: string,
  bidSignature: string,
  encodedMeta: string,
  relayerFeeAsset: string,
  relayerFee: string,
  signer: Wallet | Signer,
): Promise<string> => {
  const hash = getRouterPrepareTransactionHashToSign(
    invariantData,
    amount,
    expiry,
    encryptedCallData,
    encodedBid,
    bidSignature,
    encodedMeta,
    relayerFeeAsset,
    relayerFee,
  );

  return sign(hash, signer);
};

const getRouterFulfillTransactionHashToSign = (
  txData: TransactionData,
  fulfillSignature: string,
  callData: string,
  encodedMeta: string,
  relayerFeeAsset: string,
  relayerFee: string,
): string => {
  const payload = encodeRouterFulfillData(txData, fulfillSignature, callData, encodedMeta, relayerFeeAsset, relayerFee);
  const hash = solidityKeccak256(["bytes"], [payload]);
  return hash;
};

export const signRouterFulfillTransactionPayload = async (
  txData: TransactionData,
  fulfillSignature: string,
  callData: string,
  encodedMeta: string,
  relayerFeeAsset: string,
  relayerFee: string,
  signer: Wallet | Signer,
): Promise<string> => {
  const hash = getRouterFulfillTransactionHashToSign(
    txData,
    fulfillSignature,
    callData,
    encodedMeta,
    relayerFeeAsset,
    relayerFee,
  );

  return sign(hash, signer);
};

const getRouterCancelTransactionHashToSign = (
  txData: TransactionData,
  cancelSignature: string,
  encodedMeta: string,
  relayerFeeAsset: string,
  relayerFee: string,
): string => {
  const payload = encodeRouterCancelData(txData, cancelSignature, encodedMeta, relayerFeeAsset, relayerFee);
  const hash = solidityKeccak256(["bytes"], [payload]);
  return hash;
};

export const signRouterCancelTransactionPayload = async (
  txData: TransactionData,
  cancelSignature: string,
  encodedMeta: string,
  relayerFeeAsset: string,
  relayerFee: string,
  signer: Wallet | Signer,
): Promise<string> => {
  const hash = getRouterCancelTransactionHashToSign(txData, cancelSignature, encodedMeta, relayerFeeAsset, relayerFee);

  return sign(hash, signer);
};

const getRouterRemoveLiquidityHashToSign = (
  amount: string,
  assetId: string,
  chainId: number,
  signer: string,
): string => {
  const payload = encodeRouterRemoveLiquidityData(amount, assetId, chainId, signer);
  const hash = solidityKeccak256(["bytes"], [payload]);
  return hash;
};

export const signRemoveLiquidityTransactionPayload = (
  amount: string,
  assetId: string,
  chainId: number,
  signerAddress: string,
  signer: Wallet | Signer,
): Promise<string> => {
  const hash = getRouterRemoveLiquidityHashToSign(amount, assetId, chainId, signerAddress);

  return sign(hash, signer);
};

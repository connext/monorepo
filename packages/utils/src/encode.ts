import { utils } from "ethers";

import { AuctionBid } from "./messaging";
import { InvariantTransactionData, VariantTransactionData } from "./transactionManager";

/**
 * Cleans any strings so they replace the newlines and properly format whitespace. Used to translate human readable encoding to contract-compatible encoding.
 *
 * @param str String to clean
 * @returns Cleaned version of the input
 */
export const tidy = (str: string): string => `${str.replace(/\n/g, "").replace(/ +/g, " ")}`;

export const InvariantTransactionDataEncoding = tidy(`tuple(
  address user,
  address router,
  address sendingAssetId,
  address receivingAssetId,
  address sendingChainFallback,
  address receivingAddress,
  address callTo,
  uint24 sendingChainId,
  uint24 receivingChainId,
  bytes32 callDataHash,
  bytes32 transactionId
)`);

export const VariantTransactionDataEncoding = tidy(`tuple(
  uint256 shares,
  uint256 expiry,
  uint256 preparedBlockNumber
)`);

export const SignedDataEncoding = tidy(`tuple(
  bytes32 transactionId,
  uint256 relayerFee,
  string functionIdentifier
)`);

/**
 * Encodes an InvariantTransactionData object
 *
 * @param txDataParams - Object to encode
 * @returns Encoded version of the params
 */
export const encodeTxData = (txDataParams: InvariantTransactionData): string => {
  return utils.defaultAbiCoder.encode([InvariantTransactionDataEncoding], [txDataParams]);
};

/**
 * Hashes an InvariantTransactionData object
 *
 * @param txDataParams - Object to encode + hash
 * @returns The hash of the encoded object
 */
export const getInvariantTransactionDigest = (txDataParams: InvariantTransactionData): string => {
  const digest = utils.keccak256(encodeTxData(txDataParams));
  return digest;
};

/**
 * Hashes VariantTransactionData object
 *
 * @param txDataParams - Object to encode + hash
 * @returns Hash of the encoded object
 */
export const getVariantTransactionDigest = (txDataParams: VariantTransactionData): string => {
  const digest = utils.keccak256(utils.defaultAbiCoder.encode([VariantTransactionDataEncoding], [txDataParams]));
  return digest;
};

/**
 * Encodes a fulfill payload object, as defined in the TransactionManager contract
 *
 * @param transactionId - Unique identifier to encode
 * @param relayerFee - Fee to encode
 * @returns Encoded fulfill payload
 */
export const encodeFulfillData = (transactionId: string, relayerFee: string): string => {
  return utils.defaultAbiCoder.encode(
    [SignedDataEncoding],
    [{ transactionId, relayerFee, functionIdentifier: "fulfill" }],
  );
};

/**
 * Encode a cancel payload object, as defined in the TransactionManager contract
 *
 * @param transactionId - Unique identifier to encode
 * @param relayerFee - Fee to encode
 * @returns  Encoded cancel payload
 */
export const encodeCancelData = (transactionId: string, relayerFee: string): string => {
  return utils.defaultAbiCoder.encode(
    [SignedDataEncoding],
    [{ transactionId, relayerFee, functionIdentifier: "cancel" }],
  );
};

////// AUCTION
export const AuctionBidEncoding = tidy(`tuple(
  address user,
  address router,
  uint24 sendingChainId,
  address sendingAssetId,
  uint256 amount,
  uint24 receivingChainId,
  address receivingAssetId,
  uint256 amountReceived,
  address receivingAddress,
  bytes32 transactionId,
  uint256 expiry,
  bytes32 callDataHash,
  address callTo,
  bytes encryptedCallData,
  address sendingChainTxManagerAddress,
  address receivingChainTxManagerAddress,
  uint256 bidExpiry
)`);

/**
 * Encodes a bid on a crosschain transaction auction
 *
 * @param bid - Bid to encode
 * @returns Encoded bid
 */
export const encodeAuctionBid = (bid: AuctionBid): string => {
  return utils.defaultAbiCoder.encode([AuctionBidEncoding], [bid]);
};

export const decodeAuctionBid = (data: string): AuctionBid => {
  const [decoded] = utils.defaultAbiCoder.decode([AuctionBidEncoding], data);
  return {
    user: decoded.user,
    router: decoded.router,
    sendingAssetId: decoded.sendingAssetId,
    sendingChainId: decoded.sendingChainId,
    amount: decoded.amount.toString(),
    receivingAssetId: decoded.receivingAssetId,
    receivingChainId: decoded.receivingChainId,
    receivingAddress: decoded.receivingAddress,
    amountReceived: decoded.amountReceived.toString(),
    transactionId: decoded.transactionId,
    callDataHash: decoded.callDataHash,
    encryptedCallData: decoded.encryptedCallData,
    callTo: decoded.callTo,
    bidExpiry: decoded.bidExpiry.toNumber(),
    expiry: decoded.expiry.toNumber(),
    receivingChainTxManagerAddress: decoded.receivingChainTxManagerAddress,
    sendingChainTxManagerAddress: decoded.sendingChainTxManagerAddress,
  };
};

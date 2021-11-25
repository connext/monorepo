import { defaultAbiCoder, keccak256 } from "ethers/lib/utils";

import { AuctionBid } from "./messaging";
import { InvariantTransactionData, TransactionData, VariantTransactionData } from "./transactionManager";

/**
 * Cleans any strings so they replace the newlines and properly format whitespace. Used to translate human readable encoding to contract-compatible encoding.
 *
 * @param str String to clean
 * @returns Cleaned version of the input
 */
export const tidy = (str: string): string => `${str.replace(/\n/g, "").replace(/ +/g, " ")}`;

export const TransactionDataEncoding = tidy(`tuple(
  address receivingChainTxManagerAddress,
  address user,
  address router,
  address initiator,
  address sendingAssetId,
  address receivingAssetId,
  address sendingChainFallback,
  address receivingAddress,
  address callTo,
  bytes32 callDataHash,
  bytes32 transactionId,
  uint256 sendingChainId,
  uint256 receivingChainId,
  uint256 amount,
  uint256 expiry,
  uint256 preparedBlockNumber
)`);

export const InvariantTransactionDataEncoding = tidy(`tuple(
  address receivingChainTxManagerAddress,
  address user,
  address router,
  address initiator,
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
  uint256 amount,
  uint256 expiry,
  uint256 preparedBlockNumber
)`);

export const SignedFulfillDataEncoding = tidy(`tuple(
  bytes32 transactionId,
  uint256 relayerFee,
  string functionIdentifier,
  uint256 receivingChainId,
  address receivingChainTxManagerAddress
)`);

export const SignedCancelDataEncoding = tidy(`tuple(
  bytes32 transactionId,
  string functionIdentifier,
  uint256 receivingChainId,
  address receivingChainTxManagerAddress
)`);

/**
 * Encodes an InvariantTransactionData object
 *
 * @param txDataParams - Object to encode
 * @returns Encoded version of the params
 */
export const encodeTxData = (txDataParams: InvariantTransactionData): string => {
  return defaultAbiCoder.encode([InvariantTransactionDataEncoding], [txDataParams]);
};

/**
 * Hashes an InvariantTransactionData object
 *
 * @param txDataParams - Object to encode + hash
 * @returns The hash of the encoded object
 */
export const getInvariantTransactionDigest = (txDataParams: InvariantTransactionData): string => {
  const digest = keccak256(encodeTxData(txDataParams));
  return digest;
};

/**
 * Hashes VariantTransactionData object
 *
 * @param txDataParams - Object to encode + hash
 * @returns Hash of the encoded object
 */
export const getVariantTransactionDigest = (txDataParams: VariantTransactionData): string => {
  const digest = keccak256(defaultAbiCoder.encode([VariantTransactionDataEncoding], [txDataParams]));
  return digest;
};

/**
 * Encodes a fulfill payload object, as defined in the TransactionManager contract
 *
 * @param transactionId - Unique identifier to encode
 * @param relayerFee - Fee to encode
 * @param receivingChainId - Chain id for receiving chain
 * @param receivingChainTxManagerAddress - Address of `TransactionManager.sol` on the receiving chain
 * @returns Encoded fulfill payload
 */
export const encodeFulfillData = (
  transactionId: string,
  relayerFee: string,
  receivingChainId: number,
  receivingChainTxManagerAddress: string,
): string => {
  return defaultAbiCoder.encode(
    [SignedFulfillDataEncoding],
    [{ transactionId, relayerFee, functionIdentifier: "fulfill", receivingChainId, receivingChainTxManagerAddress }],
  );
};

/**
 * Encode a cancel payload object, as defined in the TransactionManager contract
 *
 * @param transactionId - Unique identifier to encode
 * @param receivingChainId - Chain id for receiving chain
 * @param receivingChainTxManagerAddress - Address of `TransactionManager.sol` on the receiving chain
 * @returns  Encoded cancel payload
 */
export const encodeCancelData = (
  transactionId: string,
  receivingChainId: number,
  receivingChainTxManagerAddress: string,
): string => {
  return defaultAbiCoder.encode(
    [SignedCancelDataEncoding],
    [{ transactionId, functionIdentifier: "cancel", receivingChainId, receivingChainTxManagerAddress }],
  );
};

////// AUCTION
export const AuctionBidEncoding = tidy(`tuple(
  address user,
  address router,
  address initiator,
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
  return defaultAbiCoder.encode([AuctionBidEncoding], [bid]);
};

/**
 * Decode bid
 * @param data - Data to decode
 * @returns Decoded bid
 */
export const decodeAuctionBid = (data: string): AuctionBid => {
  const [decoded] = defaultAbiCoder.decode([AuctionBidEncoding], data);
  return {
    user: decoded.user,
    router: decoded.router,
    initiator: decoded.initiator,
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

// For Router.sol
/**
 * Encoding for a Router.sol prepare call
 */
export const SignedRouterFulfillDataEncoding = tidy(`tuple(
  ${TransactionDataEncoding} txData,
  uint256 relayerFee,
  bytes signature,
  bytes callData,
  bytes encodedMeta
)`);

export const SignedRouterPrepareDataEncoding = tidy(`tuple(
  ${InvariantTransactionDataEncoding} invariantData,
  uint256 amount,
  uint256 expiry,
  bytes encryptedCallData,
  bytes encodedBid,
  bytes bidSignature,
  bytes encodedMeta
)`);

/**
 * Encodes data for prepare function
 * @param invariantData
 * @param amount
 * @param expiry
 * @param encryptedCallData
 * @param encodedBid
 * @param bidSignature
 * @param encodedMeta
 * @returns
 */
export const encodeRouterPrepareData = (
  invariantData: InvariantTransactionData,
  amount: string,
  expiry: number,
  encryptedCallData: string,
  encodedBid: string,
  bidSignature: string,
  encodedMeta: string,
): string => {
  return defaultAbiCoder.encode(
    [SignedRouterPrepareDataEncoding],
    [
      {
        invariantData,
        amount,
        expiry,
        encryptedCallData,
        encodedBid,
        bidSignature,
        encodedMeta,
      },
    ],
  );
};

export const encodeRouterFulfillData = (
  txData: TransactionData,
  fulfillSignature: string,
  callData: string,
  encodedMeta: string,
): string => {
  return defaultAbiCoder.encode(
    [SignedRouterFulfillDataEncoding],
    [
      {
        txData,
        relayerFee: "0",
        signature: fulfillSignature,
        callData,
        encodedMeta,
      },
    ],
  );
};

const SignedRouterCancelDataEncoding = tidy(`tuple(
  ${TransactionDataEncoding} txData,
  bytes signature,
  bytes encodedMeta
)`);

export const encodeRouterCancelData = (
  txData: TransactionData,
  cancelSignature: string,
  encodedMeta: string,
): string => {
  return defaultAbiCoder.encode(
    [SignedRouterCancelDataEncoding],
    [
      {
        txData,
        signature: cancelSignature,
        encodedMeta,
      },
    ],
  );
};

const SignedRouterRemoveLiquidityDataEncoding = tidy(`tuple(
  uint256 amount,
  address assetId,
  uint256 chainId,
  address signer
)`);

export const encodeRouterRemoveLiquidityData = (
  amount: string,
  assetId: string,
  chainId: number,
  signer: string,
): string => {
  return defaultAbiCoder.encode([SignedRouterRemoveLiquidityDataEncoding], [{ amount, assetId, chainId, signer }]);
};

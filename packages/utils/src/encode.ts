import { utils } from "ethers";

import { AuctionBid } from "./messaging";
import { InvariantTransactionData, VariantTransactionData } from "./transactionManager";

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
  uint256 amount,
  uint256 expiry,
  uint256 preparedBlockNumber
)`);

export const FulfillEncoding = tidy(`tuple(
  bytes32 transactionId,
  uint256 relayerFee
)`);

export const CancelEncoding = tidy(`tuple(
  bytes32 transactionId,
  uint256 relayerFee,
  string cancel
)`);

export const encodeTxData = (txDataParams: InvariantTransactionData): string => {
  return utils.defaultAbiCoder.encode([InvariantTransactionDataEncoding], [txDataParams]);
};

export const getInvariantTransactionDigest = (txDataParams: InvariantTransactionData): string => {
  const digest = utils.keccak256(utils.defaultAbiCoder.encode([InvariantTransactionDataEncoding], [txDataParams]));
  return digest;
};

export const getVariantTransactionDigest = (txDataParams: VariantTransactionData): string => {
  const digest = utils.keccak256(utils.defaultAbiCoder.encode([VariantTransactionDataEncoding], [txDataParams]));
  return digest;
};

export const encodeFulfillData = (transactionId: string, relayerFee: string): string => {
  return utils.defaultAbiCoder.encode([FulfillEncoding], [{ transactionId, relayerFee }]);
};

export const encodeCancelData = (transactionId: string, relayerFee: string): string => {
  return utils.defaultAbiCoder.encode([CancelEncoding], [{ transactionId, cancel: "cancel", relayerFee }]);
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

export const encodeAuctionBid = (bid: AuctionBid): string => {
  return utils.defaultAbiCoder.encode([AuctionBidEncoding], [bid]);
};

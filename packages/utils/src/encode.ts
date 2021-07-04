import { utils } from "ethers";

import { InvariantTransactionData, VariantTransactionData } from "./basic";

export const tidy = (str: string): string => `${str.replace(/\n/g, "").replace(/ +/g, " ")}`;

export const InvariantTransactionDataEncoding = tidy(`tuple(
  address user,
  address router,
  address sendingAssetId,
  address receivingAssetId,
  address receivingAddress,
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
  bytes32 txDigest,
  uint256 relayerFee
)`);

export const CancelEncoding = tidy(`tuple(
  bytes32 txDigest,
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

export const encodeFulfillData = (txDataParams: InvariantTransactionData, relayerFee: string): string => {
  const digest = getInvariantTransactionDigest(txDataParams);
  return utils.defaultAbiCoder.encode([FulfillEncoding], [{ txDigest: digest, relayerFee }]);
};

export const encodeCancelData = (txDataParams: InvariantTransactionData, relayerFee: string): string => {
  const digest = getInvariantTransactionDigest(txDataParams);
  return utils.defaultAbiCoder.encode([CancelEncoding], [{ txDigest: digest, cancel: "cancel", relayerFee }]);
};

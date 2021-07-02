import { utils } from "ethers";

import { InvariantTransactionData } from "./transactionManager";

export const tidy = (str: string): string => `${str.replace(/\n/g, "").replace(/ +/g, " ")}`;

export const InvariantTransactionDataEncoding = tidy(`tuple(
  address user,
  address router,
  address sendingAssetId,
  address receivingAssetId,
  address receivingAddress,
  uint24 sendingChainId,
  uint24 receivingChainId,
  bytes callData,
  bytes32 transactionId
)`);

export const FulfillEncoding = tidy(`tuple(
  bytes32 txDigest,
  uint256 relayerFee
)`);

export const CancelEncoding = tidy(`tuple(
  bytes32 txDigest,
  string cancel
)`);

export const encodeTxData = (txDataParams: InvariantTransactionData): string => {
  return utils.defaultAbiCoder.encode([InvariantTransactionDataEncoding], [txDataParams]);
};

export const getTransactionDigest = (txDataParams: InvariantTransactionData): string => {
  const digest = utils.keccak256(utils.defaultAbiCoder.encode([InvariantTransactionDataEncoding], [txDataParams]));
  return digest;
};

export const encodeFulfillData = (txDataParams: InvariantTransactionData, relayerFee: string): string => {
  const digest = getTransactionDigest(txDataParams);
  return utils.defaultAbiCoder.encode([FulfillEncoding], [{ txDigest: digest, relayerFee: relayerFee }]);
};

export const encodeCancelData = (txDataParams: InvariantTransactionData): string => {
  const digest = getTransactionDigest(txDataParams);
  return utils.defaultAbiCoder.encode([CancelEncoding], [{ txDigest: digest, cancel: "cancel" }]);
};

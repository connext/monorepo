import { defaultAbiCoder } from "ethers/lib/utils";
import { keccak256 as solidityKeccak256 } from "@ethersproject/solidity";

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

export type TransactionData = {
  user: string;
  router: string;
  sendingAssetId: string;
  receivingAssetId: string;
  receivingAddress: string;
  sendingChainId: number;
  receivingChainId: number;
  callData: string;
  transactionId: string;
  amount: string;
  expiry: string;
  blockNumber: string;
};

export const encodeTxData = (txDataParams: TransactionData): string => {
  const { amount, expiry, blockNumber, ...invariant } = txDataParams;
  return defaultAbiCoder.encode([InvariantTransactionDataEncoding], [invariant]);
};

export const encodeFulfillData = (txDataParams: TransactionData, relayerFee: string): string => {
  const { amount, expiry, blockNumber, ...invariant } = txDataParams;
  const digest = solidityKeccak256(
    ["bytes"],
    [defaultAbiCoder.encode([InvariantTransactionDataEncoding], [invariant])],
  );
  return defaultAbiCoder.encode([FulfillEncoding], [{ txDigest: digest, relayerFee }]);
};

export const encodeCancelData = (txDataParams: TransactionData): string => {
  const { amount, expiry, blockNumber, ...invariant } = txDataParams;
  const digest = solidityKeccak256(
    ["bytes"],
    [defaultAbiCoder.encode([InvariantTransactionDataEncoding], [invariant])],
  );
  return defaultAbiCoder.encode([FulfillEncoding], [{ txDigest: digest, cancel: "cancel" }]);
};

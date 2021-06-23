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

export type InvariantTransactionData = {
  user: string;
  router: string;
  sendingAssetId: string;
  receivingAssetId: string;
  receivingAddress: string;
  sendingChainId: number;
  receivingChainId: number;
  callData: string;
  transactionId: string;
};

export type VariantTransactionData = {
  amount: string;
  expiry: string;
  blockNumber: string;
};

export const encodeTxData = (txDataParams: InvariantTransactionData): string => {
  return defaultAbiCoder.encode([InvariantTransactionDataEncoding], [txDataParams]);
};

export const encodeFulfillData = (txDataParams: InvariantTransactionData, relayerFee: string): string => {
  const digest = solidityKeccak256(
    ["bytes"],
    [defaultAbiCoder.encode([InvariantTransactionDataEncoding], [txDataParams])],
  );
  return defaultAbiCoder.encode([FulfillEncoding], [{ txDigest: digest, relayerFee }]);
};

export const encodeCancelData = (txDataParams: InvariantTransactionData): string => {
  const digest = solidityKeccak256(
    ["bytes"],
    [defaultAbiCoder.encode([InvariantTransactionDataEncoding], [txDataParams])],
  );
  return defaultAbiCoder.encode([FulfillEncoding], [{ txDigest: digest, cancel: "cancel" }]);
};

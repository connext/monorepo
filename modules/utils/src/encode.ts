import { defaultAbiCoder } from "ethers/lib/utils";

export const tidy = (str: string): string => `${str.replace(/\n/g, "").replace(/ +/g, " ")}`;

export const TransactionDataEncoding = tidy(`tuple(
  address user,
  address router,
  address sendingAssetId,
  address receivingAssetId,
  address receivingAddress,
  bytes callData,
  bytes32 transactionId,
  uint24 sendingChainId,
  uint24 receivingChainId,
  uint256 amount,
  uint256 expiry,
  uint256 blockNumber
`);

export type TransactionData = {
  user: string;
  router: string;
  sendingAssetId: string;
  receivingAssetId: string;
  receivingAddress: string;
  callData: string;
  transactionId: string;
  sendingChainId: number;
  receivingChainId: number;
  amount: string;
  expiry: string;
  blockNumber: string;
};

export const encodeTxData = (txDataParams: TransactionData): string => {
  return defaultAbiCoder.encode([TransactionDataEncoding], [txDataParams]);
};

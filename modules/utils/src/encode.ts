import { Type, Static } from "@sinclair/typebox";
import { defaultAbiCoder } from "ethers/lib/utils";

export const tidy = (str: string): string => `${str.replace(/\n/g, "").replace(/ +/g, " ")}`;

//todo: these types exist in config also need nxtp-types package
export const TAddress = Type.RegEx(/^0x[a-fA-F0-9]{40}$/);
export const TBytes32 = Type.RegEx(/^0x([a-fA-F0-9]{64})$/);
export const TBytes = Type.RegEx(/^0x([a-fA-F0-9])$/);
export const TIntegerString = Type.RegEx(/^([0-9])*$/);
export const TNonzeroNumber = Type.Number({ minimum: 1 });

export const TransactionDataParamsEncoding = tidy(`tuple(
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

export const TransactionDataSchema = Type.Object({
  user: TAddress,
  router: TAddress,
  sendingAssetId: TAddress,
  receivingAssetId: TAddress,
  receivingAddress: TAddress,
  callData: TBytes,
  transactionId: TBytes32,
  sendingChainId: TNonzeroNumber,
  receivingChainId: TNonzeroNumber,
  amount: TIntegerString,
  expiry: TIntegerString,
  blockNumber: TNonzeroNumber,
});

// export type TransactionDataParams = Static<typeof TransactionDataSchema>;

export const encodeTxData = (txDataParams: any): string => {
  return defaultAbiCoder.encode([TransactionDataParamsEncoding], [txDataParams]);
};

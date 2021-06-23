import { Type } from "@sinclair/typebox";
import { defaultAbiCoder } from "ethers/lib/utils";

export const tidy = (str: string): string => `${str.replace(/\n/g, "").replace(/ +/g, " ")}`;

//todo: these types exist in config also need nxtp-types package
export const TAddress = Type.RegEx(/^0x[a-fA-F0-9]{40}$/);

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

export interface TransactionDataParams {
  // user: Static<typeof TAddress>;
  // router: Static<typeof TAddress>;
  // sendingAssetId: Static<typeof TAddress>;
  // receivingAssetId: Static<typeof TAddress>;
  // receivingAddress: Static<typeof TAddress>;
  // callData: string;
  // transactionId: string;
  // sendingChainId: BigNumberish;
  // receivingChainId: BigNumberish;
  // amount: BigNumberish;
  // expiry: BigNumberish;
  // blockNumber: BigNumberish;
}

export const encodeTxData = (txDataParams: TransactionDataParams): string => {
  return defaultAbiCoder.encode([TransactionDataParamsEncoding], [txDataParams]);
};

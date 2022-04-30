import { Type, Static } from "@sinclair/typebox";

import { BidSchema } from "./auctions";
import { NxtpErrorJsonSchema } from "./error";
// import { ExecuteArgsSchema, CallParamsSchema } from "./xtransfers";
import { TAddress, TChainId, TDecimalString } from "./primitives";

/// MARK - Shared API
export const AdminSchema = Type.Object({
  adminToken: Type.String(),
});
export type AdminRequest = Static<typeof AdminSchema>;

export const ClearCacheRequestSchema = AdminSchema;
export type ClearCacheRequest = Static<typeof ClearCacheRequestSchema>;

/// MARK - Sequencer API ----------------------------------------------------------------------------
export const AuctionsApiPostBidReqSchema = BidSchema;

export type AuctionsApiPostBidReq = Static<typeof AuctionsApiPostBidReqSchema>;

export const AuctionsApiBidResponseSchema = Type.Object({
  message: Type.String(),
  transferId: Type.String(),
  router: Type.String(),
  error: Type.Optional(NxtpErrorJsonSchema),
});
export type AuctionsApiBidResponse = Static<typeof AuctionsApiBidResponseSchema>;

export const AuctionsApiGetAuctionsStatusResponseSchema = Type.Object({
  bids: Type.Record(Type.String(), BidSchema),
  status: Type.String(),
  attempts: Type.Optional(Type.Number()),
  taskId: Type.Optional(Type.String()),
  timestamps: Type.Object({
    start: Type.String(),
    sent: Type.Optional(Type.String()),
  }),
});

export type AuctionsApiGetAuctionStatusResponse = Static<typeof AuctionsApiGetAuctionsStatusResponseSchema>;

export const AuctionsApiGetQueuedResponseSchema = Type.Object({
  queued: Type.Array(Type.String()),
});
export type AuctionsApiGetQueuedResponse = Static<typeof AuctionsApiGetQueuedResponseSchema>;

export const AuctionsApiErrorResponseSchema = Type.Object({
  message: Type.String(),
  error: Type.Optional(NxtpErrorJsonSchema),
});
export type AuctionsApiErrorResponse = Static<typeof AuctionsApiErrorResponseSchema>;

/// MARK - Router API -------------------------------------------------------------------------------
export const AddLiquidityForRequestSchema = Type.Intersect([
  AdminSchema,
  Type.Object({
    routerAddress: Type.Optional(TAddress),
    chainId: TChainId,
    assetId: TAddress,
    amount: TDecimalString,
  }),
]);
export type AddLiquidityForRequest = Static<typeof AddLiquidityForRequestSchema>;

export const AddLiquidityForResponseSchema = Type.Object({
  transactionHash: Type.String(),
});
export type AddLiquidityForResponse = Static<typeof AddLiquidityForResponseSchema>;

export const RemoveLiquidityRequestSchema = Type.Intersect([
  AdminSchema,
  Type.Object({
    recipientAddress: Type.Optional(TAddress),
    chainId: TChainId,
    assetId: TAddress,
    amount: TDecimalString,
  }),
]);
export type RemoveLiquidityRequest = Static<typeof RemoveLiquidityRequestSchema>;

export const RemoveLiquidityResponseSchema = Type.Object({
  transactionHash: Type.String(),
});
export type RemoveLiquidityResponse = Static<typeof RemoveLiquidityResponseSchema>;

/// MARK - Relayer API ------------------------------------------------------------------------------

export const RelayerApiFeeSchema = Type.Object({
  chain: Type.Integer(),
  amount: Type.String(),
  token: Type.String(),
});
export type RelayerApiFee = Static<typeof RelayerApiFeeSchema>;

export const RelayerApiPostTaskRequestParamsSchema = Type.Object({
  to: Type.String(),
  data: Type.String(),
  fee: RelayerApiFeeSchema,
});
export type RelayerApiPostTaskRequestParams = Static<typeof RelayerApiPostTaskRequestParamsSchema>;

export const RelayerApiPostTaskResponseSchema = Type.Object({
  message: Type.String(),
  taskId: Type.String(),
});
export type RelayerApiPostTaskResponse = Static<typeof RelayerApiPostTaskResponseSchema>;

export const RelayerApiErrorResponseSchema = Type.Object({
  message: Type.String(),
  error: Type.Optional(NxtpErrorJsonSchema),
});
export type RelayerApiErrorResponse = Static<typeof RelayerApiErrorResponseSchema>;

export enum RelayerTaskStatus {
  None = "None",
  Pending = "Pending",
  Cancelled = "Cancelled",
  Completed = "Completed",
}

export const RelayerApiStatusResponseSchema = Type.Object({
  chain: Type.String(),
  taskId: Type.String(),
  status: Type.Enum(RelayerTaskStatus),
  error: Type.String(),
});
export type RelayerApiStatusResponse = Static<typeof RelayerApiStatusResponseSchema>;

/// MARK - Gelato API -------------------------------------------------------------------------------
export type GelatoApiTaskRequestParams = { dest: string; data: string; token: string; relayerFee: string };

export type GelatoApiStatusResponse = {
  chain: string;
  taskId: string;
  taskState: string;
  lastCheck: {
    taskState: string;
    message: string;
    reason: string;
  };
  lastExecution: string;
};

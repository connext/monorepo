import { Type, Static } from "@sinclair/typebox";

import { BidSchema } from "./auctions";
import { ExecutorDataSchema, RelayerTaskStatus } from "./relayer";
import { NxtpErrorJsonSchema } from "./error";
import { TAddress, TChainId, TDecimalString } from "./primitives";

export enum ExecStatus {
  None = "None",
  Queued = "Queued",
  Sent = "Sent",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

/// MARK - Shared API
export const AdminSchema = Type.Object({
  adminToken: Type.String(),
});
export type AdminRequest = Static<typeof AdminSchema>;

export const ClearCacheRequestSchema = AdminSchema;
export type ClearCacheRequest = Static<typeof ClearCacheRequestSchema>;

/// MARK - Sequencer API ----------------------------------------------------------------------------

export const SequencerApiErrorResponseSchema = Type.Object({
  message: Type.String(),
  error: Type.Optional(NxtpErrorJsonSchema),
});
export type SequencerApiErrorResponse = Static<typeof SequencerApiErrorResponseSchema>;

export const ExecuteFastApiPostBidReqSchema = BidSchema;

export type ExecuteFastApiPostBidReq = Static<typeof ExecuteFastApiPostBidReqSchema>;

export const ExecuteFastApiBidResponseSchema = Type.Object({
  message: Type.String(),
  transferId: Type.String(),
  router: Type.String(),
  error: Type.Optional(NxtpErrorJsonSchema),
});
export type ExecuteFastApiBidResponse = Static<typeof ExecuteFastApiBidResponseSchema>;

export const ExecuteFastApiGetAuctionsStatusResponseSchema = Type.Object({
  bids: Type.Record(Type.String(), BidSchema),
  status: Type.String(),
  attempts: Type.Optional(Type.Number()),
  taskId: Type.Optional(Type.String()),
  timestamps: Type.Object({
    start: Type.String(),
    sent: Type.Optional(Type.String()),
  }),
});

export type ExecuteFastApiGetExecStatusResponse = Static<typeof ExecuteFastApiGetAuctionsStatusResponseSchema>;

export const ExecuteFastApiGetQueuedResponseSchema = Type.Object({
  queued: Type.Array(Type.String()),
});
export type ExecuteFastApiGetQueuedResponse = Static<typeof ExecuteFastApiGetQueuedResponseSchema>;

export const ExecStatusRequestSchema = Type.Object({ transferId: Type.String() });
export type ExecStatusRequest = Static<typeof ExecStatusRequestSchema>;

export const ExecStatusResponseSchema = Type.Object({
  transferId: Type.String(),
  status: Type.Enum(ExecStatus),
});
export type ExecStatusResponse = Static<typeof ExecStatusResponseSchema>;

export type ExecutorPostDataRequest = Static<typeof ExecutorDataSchema>;

export const ExecutorPostDataResponseSchema = Type.Object({
  message: Type.String(),
  transferId: Type.String(),
  error: Type.Optional(NxtpErrorJsonSchema),
});

export type ExecutorPostDataResponse = Static<typeof ExecutorPostDataResponseSchema>;

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
  apiKey: Type.String(),
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

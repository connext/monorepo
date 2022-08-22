import { Type, Static } from "@sinclair/typebox";

import { TIntegerString } from "./primitives";

export const ExecutorDataSchema = Type.Object({
  executorVersion: Type.String(),
  transferId: Type.String(),
  origin: Type.String(),
  relayerFee: Type.Object({
    amount: TIntegerString,
    asset: Type.String(),
  }),
  encodedData: Type.String(),
});

export type ExecutorData = Static<typeof ExecutorDataSchema>;

// Record of important data for any meta tx.
export type MetaTxTask = {
  // Timestamp of when execution meta tx was sent.
  timestamp: string;
  // Gelato task ID.
  // NOTE: Will need to be replaced with a more generic solution when we support relayer aggregation.
  taskId: string;
  // Number of meta tx attempts sent. Should be 1 in 99% of cases.
  attempts: number;
};

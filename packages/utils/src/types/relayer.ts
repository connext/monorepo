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

export enum RelayerTaskStatus {
  CheckPending = "CheckPending",
  ExecPending = "ExecPending",
  ExecSuccess = "ExecSuccess",
  ExecReverted = "ExecReverted",
  WaitingForConfirmation = "WaitingForConfirmation",
  Blacklisted = "Blacklisted",
  Cancelled = "Cancelled",
  NotFound = "NotFound",
}

export enum RelayerType {
  Gelato = "Gelato",
  BackupRelayer = "BackupRelayer",
  Mock = "Mock",
}

// Record of important data for any meta tx.
export type MetaTxTask = {
  // Timestamp of when execution meta tx was sent.
  timestamp: string;
  // task ID.
  taskId: string;
  // The relayer type which can be one of both Backup | Gelato
  relayer: RelayerType;
  // Number of meta tx attempts sent. Should be 1 in 99% of cases.
  attempts: number;
};

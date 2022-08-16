import { Type, Static } from "@sinclair/typebox";

export enum LightHouseDataStatus {
  None = "None",
  Pending = "Pending",
  Sent = "Sent",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export const LightHouseDataSchema = Type.Object({
  lighthouseVersion: Type.String(),
  transferId: Type.String(),
  origin: Type.String(),
  relayerFee: Type.Object({
    amount: Type.String(),
    asset: Type.String(),
  }),
  encodedData: Type.String(),
});

export type LightHouseData = Static<typeof LightHouseDataSchema>;

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

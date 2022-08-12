import { Type, Static } from "@sinclair/typebox";

export enum LightHouseDataStatus {
  None = "None",
  Pending = "Pending",
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

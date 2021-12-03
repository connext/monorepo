import { Type, Static } from "@sinclair/typebox";
import { TBytes32, TIntegerString } from "@connext/nxtp-utils";

export const CancelInputSchema = Type.Object({
  amount: TIntegerString,
  expiry: Type.Number(),
  preparedBlockNumber: Type.Number(),
  preparedTransactionHash: TBytes32,
  side: Type.RegEx(/sender|receiver/),
});

export type CancelInput = Static<typeof CancelInputSchema>;

import { Type, Static } from "@sinclair/typebox";
import { TIntegerString } from "@connext/nxtp-utils";

export const CancelInputSchema = Type.Object({
  amount: TIntegerString,
  expiry: Type.Number(),
  preparedBlockNumber: Type.Number(),
  side: Type.RegEx(/sender|receiver/),
});

export type CancelInput = Static<typeof CancelInputSchema>;

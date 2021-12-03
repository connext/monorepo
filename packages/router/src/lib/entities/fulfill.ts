import { Type, Static } from "@sinclair/typebox";
import { TIntegerString } from "@connext/nxtp-utils";

export const FulfillInputSchema = Type.Object({
  amount: TIntegerString,
  expiry: Type.Number(),
  preparedBlockNumber: Type.Number(),
  signature: Type.RegEx(/^0x[a-fA-F0-9]*$/),
  relayerFee: TIntegerString,
  callData: Type.RegEx(/^0x[a-fA-F0-9]*$/),
  side: Type.RegEx(/sender|receiver/),
});

export type FulfillInput = Static<typeof FulfillInputSchema>;

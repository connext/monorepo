import { Type, Static } from "@sinclair/typebox";
import { TIntegerString } from "@connext/nxtp-utils";

export const PrepareInputSchema = Type.Object({
  senderAmount: TIntegerString,
  senderExpiry: Type.Number(),
  encryptedCallData: Type.RegEx(/^0x[a-fA-F0-9]*$/),
  encodedBid: Type.RegEx(/^0x[a-fA-F0-9]*$/),
  bidSignature: Type.RegEx(/^0x[a-fA-F0-9]*$/),
});

export type PrepareInput = Static<typeof PrepareInputSchema>;

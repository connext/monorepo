import { Type, Static } from "@sinclair/typebox";
import { TAddress, TChainId, TIntegerString } from "@connext/nxtp-utils";

export const MetaTxInputSchema = Type.Object({
  to: TAddress,
  value: TIntegerString,
  data: Type.RegEx(/^0x[a-fA-F0-9]*$/),
  chainId: TChainId,
});

export type MetaTxInput = Static<typeof MetaTxInputSchema>;

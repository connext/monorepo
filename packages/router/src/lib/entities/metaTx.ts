import { Type, Static } from "@sinclair/typebox";
import { TAddress, TChainId, TIntegerString } from "@connext/nxtp-utils";

export const MetaTxInputSchema = Type.Object({
  type: Type.String(),
  to: TAddress,
  data: Type.Any(),
  chainId: TChainId,
});

export type MetaTxInput = Static<typeof MetaTxInputSchema>;

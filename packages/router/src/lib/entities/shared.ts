import { Type, Static } from "@sinclair/typebox";

export const SwapValidInputSchema = Type.Object({
  sendingChainIdx: Type.Number(),
  receivingChainIdx: Type.Number(),
  swapPoolIdx: Type.Number(),
});

export type SwapValidInput = Static<typeof SwapValidInputSchema>;

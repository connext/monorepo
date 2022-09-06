import { Type, Static } from "@sinclair/typebox";

export const XTransferMessageSchema = Type.Object({
  leaf: Type.String(),
  origin: Type.Object({
    index: Type.Number({ minimum: 0 }),
    root: Type.String(),
    message: Type.String(),
  }),
  destination: Type.Optional(
    Type.Object({
      processed: Type.Boolean(),
      returnData: Type.String(),
    }),
  ),
});

export type XTransferMessage = Static<typeof XTransferMessageSchema>;

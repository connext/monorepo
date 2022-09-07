import { Type, Static } from "@sinclair/typebox";

export const XMessageSchema = Type.Object({
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
export type XMessage = Static<typeof XMessageSchema>;

export const OriginMessageSchema = Type.Object({
  leaf: Type.String(),
  index: Type.Number({ minimum: 0 }),
  root: Type.String(),
  message: Type.String(),
});
export type OriginMessage = Static<typeof OriginMessageSchema>;

export const DestinationMessageSchema = Type.Object({
  leaf: Type.String(),
  processed: Type.Boolean(),
  returnData: Type.String(),
});
export type DestinationMessage = Static<typeof DestinationMessageSchema>;

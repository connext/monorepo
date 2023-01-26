import { Type, Static } from "@sinclair/typebox";

export type Values<E> = E[keyof E];

/**
 * Converts an error into a json object
 *
 * @param error - Error to convert
 * @returns An error json
 */
export const jsonifyError = (error: ConnextError | Error): ConnextErrorJson => {
  if ((error as any).toJson && typeof (error as any).toJson === "function") {
    return (error as ConnextError).toJson();
  }
  return {
    message: error.message,
    type: error.name,
    context: {},
    stack: error.stack,
  };
};

export const ConnextErrorJsonSchema = Type.Object({
  message: Type.String(),
  context: Type.Any(),
  type: Type.String(),
  stack: Type.Optional(Type.String()),
});

// Abstract error for package
export type ConnextErrorJson = Static<typeof ConnextErrorJsonSchema>;

/**
 * @classdesc The error class used throughout this repo. Defines a context object in addition to the standard message and name fields. The context can hold any information in json form that is relevant to the error
 *
 * Is also able to be hydrated from a json
 */
export class ConnextError extends Error {
  public readonly isConnextError = true;
  static readonly reasons: { [key: string]: string };

  constructor(
    public readonly msg: Values<typeof ConnextError.reasons>,
    public readonly context: any = {},
    public readonly type = ConnextError.name,
    public readonly level: "debug" | "info" | "warn" | "error" = "error",
  ) {
    super(msg);
  }

  public toJson(): ConnextErrorJson {
    return {
      message: this.msg,
      context: this.context,
      type: this.type,
      stack: this.stack,
    };
  }

  public static fromJson(json: ConnextErrorJson): ConnextError {
    return new ConnextError(json.message, json.context ?? {}, json.type ?? (json as any).name ?? ConnextError.name);
  }
}

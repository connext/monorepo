export type Values<E> = E[keyof E];

/**
 * Converts an error into a json object
 *
 * @param error - Error to convert
 * @returns An error json
 */
export const jsonifyError = (error: NxtpError | Error): NxtpErrorJson => {
  if ((error as any).toJson && typeof (error as any).toJson === "function") {
    return (error as NxtpError).toJson();
  }
  return {
    message: error.message,
    type: error.name,
    context: {},
    stack: error.stack,
  };
};

// Abstract error for package
export type NxtpErrorJson = {
  message: string;
  context: any;
  type: string;
  stack?: string;
};

/**
 * @classdesc The error class used throughout this repo. Defines a context object in addition to the standard message and name fields. The context can hold any information in json form that is relevant to the error
 *
 * Is also able to be hydrated from a json
 */
export class NxtpError extends Error {
  static readonly reasons: { [key: string]: string };

  constructor(
    public readonly msg: Values<typeof NxtpError.reasons>,
    public readonly context: any = {},
    public readonly type = "NxtpError",
  ) {
    super(msg);
  }

  public toJson(): NxtpErrorJson {
    return {
      message: this.msg,
      context: this.context,
      type: this.type,
      stack: this.stack,
    };
  }

  public static fromJson(json: NxtpErrorJson): NxtpError {
    return new NxtpError(json.message, json.context ?? {}, json.type ?? (json as any).name ?? "NxtpError");
  }
}

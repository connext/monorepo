export type Values<E> = E[keyof E];

// Abstract error for package
export type NxtpErrorJson = {
  message: string;
  context: any;
  type: string;
  stack?: string;
};

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
    return new NxtpError(json.message, json.context ?? {}, json.type ?? (json as any).name ?? "VectorError");
  }
}

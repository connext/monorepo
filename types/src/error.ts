export type Values<E> = E[keyof E];

// Abstract error for package
export type VectorErrorJson = {
  message: string;
  context: any;
  type: string;
  stack?: string;
};

export class VectorError extends Error {
  static readonly reasons: { [key: string]: string };

  constructor(
    public readonly msg: Values<typeof VectorError.reasons>,
    public readonly context: any = {},
    public readonly type = "VectorError",
  ) {
    super(msg);
  }

  public toJson(): VectorErrorJson {
    return {
      message: this.msg,
      context: this.context,
      type: this.type,
      stack: this.stack,
    };
  }

  public static fromJson(json: VectorErrorJson): VectorError {
    return new VectorError(json.message, json.context ?? {}, json.type ?? (json as any).name ?? "VectorError");
  }
}

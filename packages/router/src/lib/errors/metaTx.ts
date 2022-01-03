import { NxtpError } from "@connext/nxtp-utils";

export class NoTransactionId extends NxtpError {
  constructor(context: any = {}) {
    super(`No transactionId`, context, "NoTransactionId", "warn");
  }
}

export class InvalidMetaTxType extends NxtpError {
  constructor(type: string, context: any = {}) {
    super(`Invalid metaTx type ${type}`, { ...context, type }, "InvalidMetaTxType", "warn");
  }
}

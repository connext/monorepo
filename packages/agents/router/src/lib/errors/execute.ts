import { NxtpError } from "@connext/nxtp-utils";

export class ParamsInvalid extends NxtpError {
  constructor(context: any = {}) {
    super(`Params invalid`, context, "ParamsInvalid");
  }
}

export class SenderChainDataInvalid extends NxtpError {
  constructor(context: any = {}) {
    super(`Invalid data on sending chain`, context, "SenderChainDataInvalid");
  }
}

export class SlippageInvalid extends NxtpError {
  constructor(context: any = {}) {
    super(`Slippage invalid`, context, "SlippageInvalid");
  }
}

export class ExpiryInvalid extends NxtpError {
  constructor(expiry: number, context: any = {}) {
    super(`Expiry ${expiry} invalid`, context, "ExpiryInvalid");
  }
}

export class BidExpiryInvalid extends NxtpError {
  constructor(expiry: number, current: number, context: any = {}) {
    super(`Bid expiry ${expiry} invalid, current: ${current}`, context, "BidExpiryInvalid");
  }
}

export class AmountInvalid extends NxtpError {
  constructor(amount: string, context: any = {}) {
    super(`Amount (${amount}) is invalid`, context, "AmountInvalid");
  }
}

export class NotEnoughLiquidity extends NxtpError {
  constructor(chainId: number, assetId: string, balance: string, amountRequested: string, context: any = {}) {
    super(
      "Not enough liquidity for bid.",
      { ...context, chainId, assetId, balance, amountRequested },
      "NotEnoughLiquidity",
    );
  }
}

export class NotEnoughAmount extends NxtpError {
  constructor(context: any = {}) {
    super(`Not enough amount for swap`, context, "NotEnoughAmount");
  }
}

export class SequencerResponseInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("sendBid: POST request returned invalid response", context, SequencerResponseInvalid.name);
  }
}

export class SanityCheckFailed extends NxtpError {
  constructor(context: any = {}) {
    super("Sanity check failed", context, SequencerResponseInvalid.name);
  }
}

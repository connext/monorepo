import { NxtpError } from "@connext/nxtp-utils";

export class ParamsInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("Params invalid", context, ParamsInvalid.name);
  }
}

export class MissingXCall extends NxtpError {
  constructor(context: any = {}) {
    super("Transfer is missing XCall information", context, MissingXCall.name);
  }
}

export class SenderChainDataInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("Invalid data on sending chain", context, SenderChainDataInvalid.name);
  }
}

export class SlippageInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("Slippage invalid", context, SlippageInvalid.name);
  }
}

export class ExpiryInvalid extends NxtpError {
  constructor(expiry: number, context: any = {}) {
    super(`Expiry ${expiry} invalid`, context, ExpiryInvalid.name);
  }
}

export class BidExpiryInvalid extends NxtpError {
  constructor(expiry: number, current: number, context: any = {}) {
    super(`Bid expiry ${expiry} invalid, current: ${current}`, context, BidExpiryInvalid.name);
  }
}

export class AmountInvalid extends NxtpError {
  constructor(amount: string, context: any = {}) {
    super(`Amount (${amount}) is invalid`, context, AmountInvalid.name);
  }
}

export class NotEnoughLiquidity extends NxtpError {
  constructor(chainId: number, assetId: string, balance: string, amountRequested: string, context: any = {}) {
    super(
      "Not enough liquidity for bid.",
      { ...context, chainId, assetId, balance, amountRequested },
      NotEnoughLiquidity.name,
    );
  }
}

export class NotEnoughAmount extends NxtpError {
  constructor(context: any = {}) {
    super("Not enough tokens for swap", context, NotEnoughAmount.name);
  }
}

export class RouterNotApproved extends NxtpError {
  constructor(context: any = {}) {
    super("Router not approved", context, RouterNotApproved.name);
  }
}

export class SequencerResponseInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("sendBid: POST request returned invalid response", context, SequencerResponseInvalid.name);
  }
}

export class SanityCheckFailed extends NxtpError {
  constructor(context: any = {}) {
    super("Sanity check failed", context, SanityCheckFailed.name);
  }
}

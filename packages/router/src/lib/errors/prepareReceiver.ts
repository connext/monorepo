import { NxtpError } from "@connext/nxtp-utils";

export class AuctionSignerInvalid extends NxtpError {
  cancellable = true;
  constructor(expected: string, recovered: string, context: any = {}) {
    super(`Auction signer invalid, expected: ${expected} recovered: ${recovered}`, context, "AuctionSignerInvalid");
  }
}

export class SenderChainDataInvalid extends NxtpError {
  cancellable = true;
  constructor(context: any = {}) {
    super(`Invalid data on sender chain`, context, "SenderChainDataInvalid");
  }
}

export class ExpiryInvalid extends NxtpError {
  cancellable = true;
  constructor(expiry: number, context: any = {}) {
    super(`Expiry ${expiry} invalid`, context, "ExpiryInvalid");
  }
}

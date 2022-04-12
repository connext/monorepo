import { AuctionStatus, NxtpError } from "@connext/nxtp-utils";

export class ParamsInvalid extends NxtpError {
  constructor(context: any = {}) {
    super(`Params invalid`, context, ParamsInvalid.name);
  }
}

export class AuctionExpired extends NxtpError {
  constructor(status: AuctionStatus, context: any = {}) {
    super("This auction has already expired.", { status, ...context }, AuctionExpired.name);
  }
}

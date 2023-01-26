import { ExecStatus, ConnextError } from "@connext/utils";

export class ParamsInvalid extends ConnextError {
  constructor(context: any = {}) {
    super(`Params invalid`, context, ParamsInvalid.name);
  }
}

export class AuctionExpired extends ConnextError {
  constructor(status: ExecStatus, context: any = {}) {
    super("This auction has already expired.", { status, ...context }, AuctionExpired.name);
  }
}

export class MissingXCall extends ConnextError {
  constructor(domain: string, transferId: string, context: any = {}) {
    super(
      "No XCall was found in the subgraph for this auction.",
      { domain, transferId, ...context },
      MissingXCall.name,
    );
  }
}

export class RoundInvalid extends ConnextError {
  constructor(context: any = {}) {
    super(`Rounds invalid`, context, RoundInvalid.name);
  }
}

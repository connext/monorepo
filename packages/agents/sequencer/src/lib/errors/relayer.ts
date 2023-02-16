import { NxtpError } from "@connext/nxtp-utils";

export class RelayerSendFailed extends NxtpError {
  constructor(context: any = {}) {
    super(`Relayer Send Failed`, context, RelayerSendFailed.name);
  }
}

export class NotEnoughRelayerFee extends NxtpError {
  constructor(context: any = {}) {
    super(`Relayer fee not enough`, context, NotEnoughRelayerFee.name);
  }
}

export class SlippageToleranceExceeded extends NxtpError {
  constructor(context: any = {}) {
    super(`Slippage tolerance exceeded`, context, SlippageToleranceExceeded.name);
  }
}

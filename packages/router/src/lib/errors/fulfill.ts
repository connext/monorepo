import { NxtpError } from "@connext/nxtp-utils";

export class NoChainConfig extends NxtpError {
  constructor(chainId: number, context: any = {}) {
    super(`No chain config for chainId ${chainId}`, context, "NoChainConfig", "debug");
  }
}

export class NotEnoughRelayerFee extends NxtpError {
  constructor(chainId: number, context: any = {}) {
    super(`Not enough relayer fee, ${chainId}`, context, "NotEnoughRelayerFee");
  }
}

export class NotAllowedFulfillRelay extends NxtpError {
  constructor(chainId: number, context: any = {}) {
    super(`Not allowed fulfill relay, ${chainId}`, context, "NotAllowFulfillRelay", "debug");
  }
}

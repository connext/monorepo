import { LightHouseDataStatus, NxtpError } from "@connext/nxtp-utils";

export class LightHouseVersionInvalid extends NxtpError {
  constructor(context: any = {}) {
    super(`LightHouse version is not supported by this sequencer`, context, LightHouseVersionInvalid.name);
  }
}

export class LightHouseDataExpired extends NxtpError {
  constructor(status: LightHouseDataStatus, context: any = {}) {
    super("This lighthouse data has already expired.", { status, ...context }, LightHouseDataExpired.name);
  }
}

export class InvalidSlowLiqTransfer extends NxtpError {
  constructor(context: any = {}) {
    super("This slow liquidity transfer is no longer valid.", context, InvalidSlowLiqTransfer.name);
  }
}

export class GasEstimationFailed extends NxtpError {
  constructor(context: any = {}) {
    super("Gas estimation failed", context, GasEstimationFailed.name);
  }
}

export class MissingTransfer extends NxtpError {
  constructor(context: any = {}) {
    super("No transfer found in the cache", context, MissingTransfer.name);
  }
}

export class MissingLightHouseData extends NxtpError {
  constructor(context: any = {}) {
    super("No lighthouse data found in the cache", context, MissingLightHouseData.name);
  }
}

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

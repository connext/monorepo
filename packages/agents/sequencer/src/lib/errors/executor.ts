import { ExecStatus, NxtpError } from "@connext/nxtp-utils";

export class ExecutorVersionInvalid extends NxtpError {
  constructor(context: any = {}) {
    super(`LightHouse version is not supported by this sequencer`, context, ExecutorVersionInvalid.name);
  }
}

export class ExecutorDataExpired extends NxtpError {
  constructor(status: ExecStatus, context: any = {}) {
    super("This lighthouse data has already expired.", { status, ...context }, ExecutorDataExpired.name);
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

export class MissingExecutorData extends NxtpError {
  constructor(context: any = {}) {
    super("No lighthouse data found in the cache", context, MissingExecutorData.name);
  }
}

export class ExecuteSlowCompleted extends NxtpError {
  constructor(context: any = {}) {
    super("Slow transfer got already completed", context, ExecuteSlowCompleted.name);
  }
}

import { ExecStatus, ConnextError } from "@connext/utils";

export class ExecutorDataExpired extends ConnextError {
  constructor(status: ExecStatus, context: any = {}) {
    super("This lighthouse data has already expired.", { status, ...context }, ExecutorDataExpired.name);
  }
}

export class InvalidSlowLiqTransfer extends ConnextError {
  constructor(context: any = {}) {
    super("This slow liquidity transfer is no longer valid.", context, InvalidSlowLiqTransfer.name);
  }
}

export class GasEstimationFailed extends ConnextError {
  constructor(context: any = {}) {
    super("Gas estimation failed", context, GasEstimationFailed.name);
  }
}

export class MissingTransfer extends ConnextError {
  constructor(context: any = {}) {
    super("No transfer found in the cache", context, MissingTransfer.name);
  }
}

export class MissingExecutorData extends ConnextError {
  constructor(context: any = {}) {
    super("No lighthouse data found in the cache", context, MissingExecutorData.name);
  }
}

export class ExecuteSlowCompleted extends ConnextError {
  constructor(context: any = {}) {
    super("Slow transfer got already completed", context, ExecuteSlowCompleted.name);
  }
}

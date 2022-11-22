import { NxtpError } from "@connext/nxtp-utils";

export class RelayerSendFailed extends NxtpError {
  constructor(context: any = {}) {
    super(`Relayer Send Failed`, context, RelayerSendFailed.name);
  }
}

export class UnableToGetTaskStatus extends NxtpError {
  constructor(taskId: string, context: any = {}) {
    super(`Unable to get task status`, { ...context, taskId }, UnableToGetTaskStatus.name);
  }
}

export class UnableToGetGelatoSupportedChains extends NxtpError {
  constructor(chainId: number, context: any = {}) {
    super(`Unable to get chains from gelato`, { ...context, chainId }, UnableToGetGelatoSupportedChains.name);
  }
}

export class UnableToGetTransactionHash extends NxtpError {
  constructor(taskId: string, context: any = {}) {
    super(`Unable to get transaction hash`, { ...context, taskId }, UnableToGetTransactionHash.name);
  }
}

export class TransactionHashTimeout extends NxtpError {
  constructor(taskId: string, context: any = {}) {
    super(`Timed out waiting for transaction hash`, { ...context, taskId }, TransactionHashTimeout.name);
  }
}

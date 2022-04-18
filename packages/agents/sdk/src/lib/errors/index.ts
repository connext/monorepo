import { jsonifyError, NxtpError, NxtpErrorJson } from "@connext/nxtp-utils";

/**
 * @classdesc Represents errors having to do with config issues
 */
export abstract class ConfigError extends NxtpError {
  static readonly type = ConfigError.name;
}

/**
 * @classdesc Represents errors having to do with invalid parameter issues
 */
export abstract class ParamsError extends NxtpError {
  static readonly type = ParamsError.name;
}

/**
 * @classdesc Represents errors having to do with an auction
 */
export abstract class AuctionError extends NxtpError {
  static readonly type = AuctionError.name;
}

/**
 * @classdesc Represents errors having to do with relayers
 */
export abstract class RelayerError extends NxtpError {
  static readonly type = RelayerError.name;
}

/**
 * @classdesc Abstract error class thrown by the `TransactionManager` class.
 */
export abstract class TransactionManagerError extends NxtpError {
  static readonly type = TransactionManagerError.name;
}

/**
 * @classdesc Abstract error class thrown by the `Subgraph` class.
 */
export abstract class SubgraphError extends NxtpError {
  static readonly type = SubgraphError.name;
}

/**
 * @classdesc Abstract error class during fulfill.
 */
export abstract class FulfillError extends NxtpError {
  static readonly type = FulfillError.name;
}

/**
 * @classdesc Thrown if no tx manager addr for chain
 */
export class NoTransactionManager extends ConfigError {
  static getMessage() {
    return `No transaction manager found, please provide override`;
  }
  constructor(public readonly chainId: number, public readonly context: any = {}) {
    super(NoTransactionManager.getMessage(), { chainId, ...context }, ConfigError.type);
  }
}

/**
 * @classdesc Thrown if no price oracle addr for chain
 */
export class NoPriceOracle extends ConfigError {
  static getMessage() {
    return `No price oracle found, please provide override`;
  }
  constructor(public readonly chainId: number, public readonly context: any = {}) {
    super(NoPriceOracle.getMessage(), { chainId, ...context }, ConfigError.type);
  }
}

/**
 * @classdesc Thrown if no subgraph addr for chain
 */
export class NoSubgraph extends ConfigError {
  static getMessage() {
    return `No subgraph uri found, please provide override`;
  }
  constructor(public readonly chainId: number, public readonly context: any = {}) {
    super(NoSubgraph.getMessage(), { chainId, ...context }, ConfigError.type);
  }
}

/**
 * @classdesc Thrown if chain not found in config
 */
export class ChainNotConfigured extends ConfigError {
  static getMessage() {
    return `No chain config found, please check config`;
  }
  constructor(public readonly chainId: number, public readonly supported: string[], public readonly context: any = {}) {
    super(ChainNotConfigured.getMessage(), { chainId, supported, ...context }, ConfigError.type);
  }
}

/**
 * @classdesc Thrown if price oracle not configured
 */
export class PriceOracleNotConfigured extends ConfigError {
  static getMessage() {
    return `Price oracle not configured, please check config`;
  }
  constructor(public readonly chainId: number, public readonly assetId: string, public readonly context: any = {}) {
    super(PriceOracleNotConfigured.getMessage(), { chainId, assetId, ...context }, ConfigError.type);
  }
}

/**
 * @classdesc Thrown if ajv validation on external params fails
 */
export class InvalidParamStructure extends ParamsError {
  static getMessage() {
    return `Invalid Params`;
  }
  constructor(
    method: string,
    typename: string,
    public readonly error: string,
    public readonly invalidParams: any,
    public readonly context: any = {},
  ) {
    super(InvalidParamStructure.getMessage(), { error, invalidParams, ...context }, ParamsError.type);
  }
}

/**
 * @classdesc Thrown if slippage is out of bounds
 */
export class InvalidSlippage extends ParamsError {
  static getMessage() {
    return `Invalid slippage`;
  }
  constructor(
    public readonly slippage: string,
    public readonly minSlippage: string,
    public readonly maxSlippage: string,
    public readonly context: any = {},
  ) {
    super(InvalidSlippage.getMessage(), { slippage, min: minSlippage, max: maxSlippage, ...context }, ParamsError.type);
  }
}

/**
 * @classdesc Thrown if expiry is out of bounds
 */
export class InvalidExpiry extends ParamsError {
  static getMessage() {
    return `Invalid expiry`;
  }
  constructor(
    public readonly expiry: number,
    public readonly minExpiryBuffer: number,
    public readonly maxExpiryBuffer: number,
    public readonly timestamp: number,
    public readonly context: any = {},
  ) {
    super(
      InvalidExpiry.getMessage(),
      { expiry, minBuffer: minExpiryBuffer, maxBuffer: maxExpiryBuffer, timestamp, ...context },
      ParamsError.type,
    );
  }
}

/**
 * @classdesc Thrown if there is insufficient balance for transfer of that amount
 */
export class InvalidAmount extends ParamsError {
  static getMessage() {
    return `Insufficient Funds`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly address: string,
    public readonly balance: string,
    public readonly amount: string,
    public readonly chainId: number,
    public readonly assetId: string,
    public readonly context: any = {},
  ) {
    super(
      InvalidAmount.getMessage(),
      {
        address,
        transactionId,
        balance,
        amount,
        chainId,
        assetId,
        ...context,
      },
      InvalidAmount.type,
    );
  }
}

/**
 * @classdesc Thrown if there callTo is not a Contract
 */
export class InvalidCallTo extends ParamsError {
  static getMessage() {
    return `Invalid CallTo`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly callTo: string,
    public readonly context: any = {},
  ) {
    super(
      InvalidCallTo.getMessage(),
      {
        transactionId,
        callTo,
        ...context,
      },
      InvalidCallTo.type,
    );
  }
}

/**
 * @classdesc Thrown if encryption of calldata fails before auction
 */
export class EncryptionError extends NxtpError {
  static readonly type = EncryptionError.name;

  static getMessage(details: string) {
    return `Failed calldata encryption: ${details}`;
  }

  constructor(
    public readonly details: string,
    public readonly error?: NxtpErrorJson,
    public readonly context: any = {},
  ) {
    super(EncryptionError.getMessage(details), { encryptionError: error, ...context }, EncryptionError.type);
  }
}

/**
 * @classdesc Thrown if receiver amount is less than total fee
 */
export class NotEnoughAmount extends NxtpError {
  static readonly type = NotEnoughAmount.name;

  static getMessage() {
    return `Not enough amount for swap`;
  }

  constructor(public readonly context: any = {}) {
    super(NotEnoughAmount.getMessage(), { ...context }, NotEnoughAmount.type);
  }
}

/**
 * @classdesc Defines the error thrown by the `TransactionManager` class when a transaction fails to be submitted.
 */
export class SubmitError extends TransactionManagerError {
  static getMessage() {
    return `failed to submit transaction`;
  }

  constructor(public readonly txserviceError: NxtpErrorJson, public readonly context: any = {}) {
    super(
      SubmitError.getMessage(),
      {
        txserviceError: jsonifyError(txserviceError as NxtpError),
        ...context,
      },
      SubmitError.type,
    );
  }
}

/**
 * @classdesc Thrown when invalid status
 */
export class InvalidTxStatus extends SubgraphError {
  static getMessage() {
    return `Invalid tx status, check subgraph`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly status: string,
    public readonly record: any, //ActiveTransaction,
    public readonly context: any = {},
  ) {
    super(
      InvalidTxStatus.getMessage(),
      {
        transactionId,
        status,
        record,
        ...context,
      },
      SubgraphError.type,
    );
  }
}

/**
 * @classdesc Thrown when polling is not active
 */
export class PollingNotActive extends SubgraphError {
  static getMessage() {
    return `Subgraph polling not active`;
  }

  constructor(public readonly context: any = {}) {
    super(
      PollingNotActive.getMessage(),
      {
        ...context,
      },
      SubgraphError.type,
    );
  }
}

/**
 * @classdesc Thrown when subgraphs are not synced
 */
export class RelayFailed extends FulfillError {
  static getMessage() {
    return `Relay failed!`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly chainId: number,
    public readonly context: any = {},
  ) {
    super(
      RelayFailed.getMessage(),
      {
        ...context,
      },
      FulfillError.type,
    );
  }
}

/**
 * @classdesc Thrown when no responses to meta tx request in some timeframe
 */
export class FulfillTimeout extends FulfillError {
  static getMessage() {
    return `No fulfill response`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly timeout: number,
    public readonly chainId: number,
    public readonly context: any = {},
  ) {
    super(
      FulfillTimeout.getMessage(),
      {
        transactionId,
        timeout,
        ...context,
      },
      FulfillError.type,
    );
  }
}

/**
 * @classdesc Thrown when no responses to meta tx request in some timeframe
 */
export class InvalidRelayerFee extends FulfillError {
  static getMessage(transactionId: string, chainId: number) {
    return `Relayer fee cannot be zero when using relayers for ${transactionId} on chain ${chainId}`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly chainId: number,
    public readonly context: any = {},
  ) {
    super(
      InvalidRelayerFee.getMessage(transactionId, chainId),
      {
        transactionId,
        chainId,
        ...context,
      },
      InvalidRelayerFee.type,
    );
  }
}

import {
  AuctionBid,
  AuctionPayload,
  AuctionResponse,
  jsonifyError,
  NxtpError,
  NxtpErrorJson,
} from "@connext/nxtp-utils";

import { SubgraphSyncRecord } from "./types";

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
 * @classdesc Thrown when bid signature undefined
 */
export class InvalidBidSignature extends ParamsError {
  static getMessage() {
    return `bid signature invalid`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly bid: AuctionBid,
    public readonly router: string,
    public readonly recovered?: string,
    public readonly signature?: string,
    public readonly context: any = {},
  ) {
    super(InvalidBidSignature.getMessage(), {
      transactionId,
      router,
      recovered,
      signature,
      bid,
      ...context,
    });
  }
}

/**
 * @classdesc Thrown if encryption of calldata fails before auction
 */
export class EncryptionError extends NxtpError {
  static readonly type = EncryptionError.name;

  static getMessage() {
    return `Failed to encrypt calldata before auction`;
  }

  constructor(
    public readonly details: string,
    public readonly error?: NxtpErrorJson,
    public readonly context: any = {},
  ) {
    super(EncryptionError.getMessage(), { encryptionError: error, ...context }, EncryptionError.type);
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
 * @classdesc Thrown if no bids received in given timeout
 */
export class NoBids extends AuctionError {
  static getMessage() {
    return `No bids received`;
  }

  constructor(
    public readonly timeout: number,
    public readonly transactionId: string,
    public readonly auction: AuctionPayload,
    public readonly context: any = {},
  ) {
    super(NoBids.getMessage(), { transactionId, auction, ...context }, AuctionError.type);
  }
}

/**
 * @classdesc Thrown if no acceptable bids received in given timeout
 */
export class NoValidBids extends AuctionError {
  static getMessage() {
    return `No valid bids received`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly auction: AuctionPayload,
    public readonly reasons: string,
    public readonly auctionResponses: (AuctionResponse | string)[],
    public readonly context: any = {},
  ) {
    super(
      NoValidBids.getMessage(),
      { transactionId, auction, invalidReasons: reasons, bids: auctionResponses, ...context },
      AuctionError.type,
    );
  }
}

/**
 * @classdesc Thrown when auction fails in unknown way
 */
export class UnknownAuctionError extends AuctionError {
  static getMessage() {
    return `Error validating or retrieving bids`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly error: NxtpErrorJson,
    public readonly auction: AuctionPayload,
    public readonly context: any = {},
  ) {
    super(
      UnknownAuctionError.getMessage(),
      { transactionId, auction, auctionError: error, ...context },
      AuctionError.type,
    );
  }
}

/**
 * @classdesc Defines the error thrown by the `TransactionManager` class when a transaction fails to be submitted.
 */
export class SubmitError extends TransactionManagerError {
  static getMessage() {
    return `failed to submit transaction`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly chainId: number,
    public readonly sender: string,
    public readonly method: string,
    public readonly to: string,
    public readonly params: any,
    public readonly txserviceError: NxtpErrorJson,
    public readonly context: any = {},
  ) {
    super(
      SubmitError.getMessage(),
      {
        transactionId,
        chainId,
        sender,
        method,
        to,
        params,
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
 * @classdesc Thrown when subgraphs are not synced
 */
export class SendingChainSubgraphsNotSynced extends SubgraphError {
  static getMessage() {
    return `Sending Chain Subgraph not synced`;
  }

  constructor(
    public readonly sendingSyncStatus: SubgraphSyncRecord,
    public readonly receivingSyncStatus: SubgraphSyncRecord,
    public readonly context: any = {},
  ) {
    super(
      SendingChainSubgraphsNotSynced.getMessage(),
      {
        sendingSyncStatus,
        receivingSyncStatus,
        ...context,
      },
      SubgraphError.type,
    );
  }
}

export class ReceivingChainSubgraphsNotSynced extends SubgraphError {
  static getMessage() {
    return `Subgraph not synced`;
  }

  constructor(
    public readonly sendingSyncStatus: SubgraphSyncRecord,
    public readonly receivingSyncStatus: SubgraphSyncRecord,
    public readonly context: any = {},
  ) {
    super(
      ReceivingChainSubgraphsNotSynced.getMessage(),
      {
        sendingSyncStatus,
        receivingSyncStatus,
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

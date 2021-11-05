import {
  AuctionBid,
  AuctionPayload,
  AuctionResponse,
  jsonifyError,
  MetaTxPayload,
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
  static getMessage(chainId: number) {
    return `No transaction manager found for ${chainId}, please provide override`;
  }
  constructor(public readonly chainId: number, public readonly context: any = {}) {
    super(NoTransactionManager.getMessage(chainId), { chainId, ...context }, ConfigError.type);
  }
}

/**
 * @classdesc Thrown if no price oracle addr for chain
 */
export class NoPriceOracle extends ConfigError {
  static getMessage(chainId: number) {
    return `No price oracle found for ${chainId}, please provide override`;
  }
  constructor(public readonly chainId: number, public readonly context: any = {}) {
    super(NoPriceOracle.getMessage(chainId), { chainId, ...context }, ConfigError.type);
  }
}

/**
 * @classdesc Thrown if no subgraph addr for chain
 */
export class NoSubgraph extends ConfigError {
  static getMessage(chainId: number) {
    return `No subgraph uri found for ${chainId}, please provide override`;
  }
  constructor(public readonly chainId: number, public readonly context: any = {}) {
    super(NoSubgraph.getMessage(chainId), { chainId, ...context }, ConfigError.type);
  }
}

/**
 * @classdesc Thrown if chain not found in config
 */
export class ChainNotConfigured extends ConfigError {
  static getMessage(chainId: number, supported: string[]) {
    return `No chain config found for ${chainId}, please check config. Configured: ${supported
      .map(Number)
      .sort()
      .join(",")}`;
  }
  constructor(public readonly chainId: number, public readonly supported: string[], public readonly context: any = {}) {
    super(ChainNotConfigured.getMessage(chainId, supported), { chainId, supported, ...context }, ConfigError.type);
  }
}

/**
 * @classdesc Thrown if chain not found in config
 */
export class DefaultInterpreterNotDeployed extends ConfigError {
  static getMessage(chainId: number) {
    return `No default interpreter found for ${chainId}`;
  }
  constructor(public readonly chainId: number, public readonly context: any = {}) {
    super(DefaultInterpreterNotDeployed.getMessage(chainId), { chainId, ...context }, ConfigError.type);
  }
}

/**
 * @classdesc Thrown if price oracle not configured
 */
export class PriceOracleNotConfigured extends ConfigError {
  static getMessage(chainId: number, assetId: string) {
    return `Price oracle not configured for asset ${assetId} on chain ${chainId}, please check config.`;
  }
  constructor(public readonly chainId: number, public readonly assetId: string, public readonly context: any = {}) {
    super(PriceOracleNotConfigured.getMessage(chainId, assetId), { chainId, assetId, ...context }, ConfigError.type);
  }
}

/**
 * @classdesc Thrown if ajv validation on external params fails
 */
export class InvalidParamStructure extends ParamsError {
  static getMessage(method: string, typename: string) {
    return `Invalid "${method}" params. Should use "${typename}" type`;
  }
  constructor(
    method: string,
    typename: string,
    public readonly error: string,
    public readonly invalidParams: any,
    public readonly context: any = {},
  ) {
    super(InvalidParamStructure.getMessage(method, typename), { error, invalidParams, ...context }, ParamsError.type);
  }
}

/**
 * @classdesc Thrown if slippage is out of bounds
 */
export class InvalidSlippage extends ParamsError {
  static getMessage(slippage: string, min: string, max: string) {
    return `Invalid slippage: ${slippage}. Must be between ${min} and ${max}`;
  }
  constructor(
    public readonly slippage: string,
    public readonly minSlippage: string,
    public readonly maxSlippage: string,
    public readonly context: any = {},
  ) {
    super(
      InvalidSlippage.getMessage(slippage, minSlippage, maxSlippage),
      { slippage, min: minSlippage, max: maxSlippage, ...context },
      ParamsError.type,
    );
  }
}

/**
 * @classdesc Thrown if expiry is out of bounds
 */
export class InvalidExpiry extends ParamsError {
  static getMessage(expiry: number, minExpiry: number, maxExpiry: number) {
    return `Invalid expiry: ${expiry}. Must be between ${minExpiry} and ${maxExpiry} from now`;
  }
  constructor(
    public readonly expiry: number,
    public readonly minExpiryBuffer: number,
    public readonly maxExpiryBuffer: number,
    public readonly timestamp: number,
    public readonly context: any = {},
  ) {
    super(
      InvalidExpiry.getMessage(expiry, minExpiryBuffer, maxExpiryBuffer),
      { expiry, minBuffer: minExpiryBuffer, maxBuffer: maxExpiryBuffer, timestamp, ...context },
      ParamsError.type,
    );
  }
}

/**
 * @classdesc Thrown if there is insufficient balance for transfer of that amount
 */
export class InvalidAmount extends ParamsError {
  static getMessage(addr: string, balance: string, amount: string, assetId: string, chainId: number) {
    return `${addr} has insufficient funds of ${assetId} on ${chainId}. Has ${balance}, needs ${amount}`;
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
      InvalidAmount.getMessage(address, balance, amount, assetId, chainId),
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
  static getMessage(callTo: string) {
    return `No contract currently deployed at ${callTo}`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly callTo: string,
    public readonly context: any = {},
  ) {
    super(
      InvalidCallTo.getMessage(callTo),
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
  static getMessage(router: string, recovered?: string, signature?: string) {
    return !signature
      ? `No bid signature provided`
      : `Bid signature recovery failed, got ${recovered} and expected ${router}`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly bid: AuctionBid,
    public readonly router: string,
    public readonly recovered?: string,
    public readonly signature?: string,
    public readonly context: any = {},
  ) {
    super(InvalidBidSignature.getMessage(router, recovered, signature), {
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

  static getMessage(details: string) {
    return `Failed to encrypt calldata before auction: ${details}`;
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
 * @classdesc Thrown if no bids received in given timeout
 */
export class NoBids extends AuctionError {
  static getMessage(timeout: number, transactionId: string) {
    return `No bids received within ${timeout}ms for ${transactionId}`;
  }

  constructor(
    public readonly timeout: number,
    public readonly transactionId: string,
    public readonly auction: AuctionPayload,
    public readonly context: any = {},
  ) {
    super(NoBids.getMessage(timeout, transactionId), { transactionId, auction, ...context }, AuctionError.type);
  }
}

/**
 * @classdesc Thrown if no acceptable bids received in given timeout
 */
export class NoValidBids extends AuctionError {
  static getMessage(transactionId: string) {
    return `No valid bids received for ${transactionId}`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly auction: AuctionPayload,
    public readonly reasons: string,
    public readonly auctionResponses: (AuctionResponse | string)[],
    public readonly context: any = {},
  ) {
    super(
      NoValidBids.getMessage(transactionId),
      { transactionId, auction, invalidReasons: reasons, bids: auctionResponses, ...context },
      AuctionError.type,
    );
  }
}

/**
 * @classdesc Thrown when auction fails in unknown way
 */
export class UnknownAuctionError extends AuctionError {
  static getMessage(transactionId: string) {
    return `Error validating or retrieving bids for ${transactionId}`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly error: NxtpErrorJson,
    public readonly auction: AuctionPayload,
    public readonly context: any = {},
  ) {
    super(
      UnknownAuctionError.getMessage(transactionId),
      { transactionId, auction, auctionError: error, ...context },
      AuctionError.type,
    );
  }
}

/**
 * @classdesc Thrown when no responses to meta tx request in some timeframe
 */
export class MetaTxTimeout extends RelayerError {
  static getMessage(timeout: number) {
    return `No relayer responses within ${timeout}ms`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly timeout: number,
    public readonly request: MetaTxPayload<any>,
    public readonly context: any = {},
  ) {
    super(
      MetaTxTimeout.getMessage(timeout),
      {
        transactionId,
        timeout,
        request,
        ...context,
      },
      RelayerError.type,
    );
  }
}

/**
 * @classdesc Defines the error thrown by the `TransactionManager` class when a transaction fails to be submitted.
 */
export class SubmitError extends TransactionManagerError {
  static getMessage(sender: string, method: string, to: string, chainId: number) {
    return `${sender} failed to submit ${method} transaction to ${to} on chain ${chainId}`;
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
      SubmitError.getMessage(sender, method, to, chainId),
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
  static getMessage(status: string, transactionId: string) {
    return `Invalid tx status (${status}) found for ${transactionId}, check subgraph`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly status: string,
    public readonly record: any, //ActiveTransaction,
    public readonly context: any = {},
  ) {
    super(
      InvalidTxStatus.getMessage(status, transactionId),
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
export class SubgraphsNotSynced extends SubgraphError {
  static getMessage(sendingSyncStatus: SubgraphSyncRecord, receivingSyncStatus: SubgraphSyncRecord) {
    return `Subgraphs not synced! sendingSyncStatus: ${JSON.stringify(
      sendingSyncStatus,
    )}, receivingSyncStatus: ${JSON.stringify(receivingSyncStatus)}`;
  }

  constructor(
    public readonly sendingSyncStatus: SubgraphSyncRecord,
    public readonly receivingSyncStatus: SubgraphSyncRecord,
    public readonly context: any = {},
  ) {
    super(
      SubgraphsNotSynced.getMessage(sendingSyncStatus, receivingSyncStatus),
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
  static getMessage(transactionId: string, chainId: number) {
    return `Relay failed! transactionId: ${transactionId}, chainId: ${chainId}`;
  }

  constructor(
    public readonly transactionId: string,
    public readonly chainId: number,
    public readonly context: any = {},
  ) {
    super(
      RelayFailed.getMessage(transactionId, chainId),
      {
        ...context,
      },
      FulfillError.type,
    );
  }
}

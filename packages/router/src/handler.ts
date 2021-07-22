import { TransactionService } from "@connext/nxtp-txservice";
import {
  RouterNxtpNatsMessagingService,
  MetaTxPayload,
  MetaTxFulfillPayload,
  jsonifyError,
  TransactionPreparedEvent,
  TransactionFulfilledEvent,
  calculateExchangeAmount,
  AuctionPayload,
  AuctionBid,
  signAuctionBid,
  NxtpError,
  Values,
  NxtpErrorJson,
} from "@connext/nxtp-utils";
import { BigNumber, Wallet } from "ethers";
import hyperid from "hyperid";
import { combine, errAsync, okAsync, ResultAsync } from "neverthrow";
import { BaseLogger } from "pino";

import { getConfig } from "./config";
import { TransactionManager } from "./contract";
import { Subgraph } from "./subgraph";

const hId = hyperid();

export const tidy = (str: string): string => `${str.replace(/\n/g, "").replace(/ +/g, " ")}`;
export const EXPIRY_DECREMENT = 3600 * 24;
export const SWAP_RATE = "0.9995"; // 0.05% fee
export const BID_EXPIRY = () => Math.floor(Date.now() / 1000) + 60 * 5;

export interface TransactionDataParams {
  user: string;
  router: string;
  sendingAssetId: string;
  receivingAssetId: string;
  receivingAddress: string;
  callData: string;
  transactionId: string;
  sendingChainId: number;
  receivingChainId: number;
  amount: string;
  expiry: number;
  blockNumber: number;
}

/*
  Handler.ts

  The goal of this file is to handle all inbound events and dispatch messages
  or new onchain txs as needed.

  Each handler method should do the following:
  1. Log what it's doing
  2. Validate the event data (in some cases not necessary if onchain validation)
  3. Prepare parameters for next action
  4. Dispatch a new message or tx to chain
  5. Update metrics
*/

export class HandlerError extends NxtpError {
  static readonly type = "TransactionManagerError";
  static readonly reasons = {
    MessagingError: "Messaging Service error",
    TxServiceError: "Error from Transaction Service",
    TxAlreadyPrepared: "Transaction already prepared",
    AuctionValidationError: "Error validating auction params",
  };

  constructor(
    public readonly message: Values<typeof HandlerError.reasons> | string,
    public readonly context: {
      auctionError?: NxtpErrorJson;
      messagingError?: NxtpErrorJson;
      txServiceError?: NxtpErrorJson;
      methodId: string;
      method: string;
      calling: string;
    },
  ) {
    super(message, context, HandlerError.type);
  }
}

export const mutateAmount = (amount: string) => {
  return calculateExchangeAmount(amount, SWAP_RATE);
};

export const mutateExpiry = (expiry: number) => {
  const rxExpiry = expiry - EXPIRY_DECREMENT;
  if (rxExpiry < Date.now() / 1000) {
    throw new Error("Expiration already happened, cant prepare");
  }
  return rxExpiry;
};

export class Handler {
  constructor(
    private readonly messagingService: RouterNxtpNatsMessagingService,
    private readonly subgraph: Subgraph,
    private readonly txManager: TransactionManager,
    private readonly txService: TransactionService,
    private readonly signer: Wallet,
    private readonly logger: BaseLogger,
  ) {
    // log to get rid of unused build errors
  }

  // HandleNewAuction
  // Purpose: Respond to auction with bid if router has sufficient funds for transfer
  // NOTE: This does not need to be implemented as part of MVP
  public async handleNewAuction(data: AuctionPayload, inbox: string): Promise<void> {
    const method = "handleNewAuction";
    const methodId = hId();
    this.logger.info({ method, methodId, data, inbox }, "Method start");

    const {
      user,
      sendingChainId,
      sendingAssetId,
      amount,
      receivingAssetId,
      receivingChainId,
      expiry,
      encryptedCallData,
      callDataHash,
      callTo,
      transactionId,
      receivingAddress,
    } = data;

    // validate that assets/chains are supported and there is enough liquidity
    // and gas on both sender and receiver side.
    // TODO: will need to track this offchain
    const amountReceived = mutateAmount(amount);

    const config = getConfig();
    const sendingConfig = config.chainConfig[sendingChainId];
    const receivingConfig = config.chainConfig[receivingChainId];
    let bid: AuctionBid;
    const result = await this.subgraph
      .getAssetBalance(receivingAssetId, receivingChainId)
      .andThen((availableLiquidity) => {
        // validate liquidity
        if (availableLiquidity.lt(amountReceived)) {
          return errAsync(
            new HandlerError(HandlerError.reasons.AuctionValidationError, {
              calling: "",
              methodId,
              method,
              auctionError: {
                message: "Not enough availble liquidity for auction",
                type: "Validation",
                context: {
                  availableLiquidity: availableLiquidity.toString(),
                  amount,
                  receivingAssetId,
                  receivingChainId,
                },
              },
            }),
          );
        }

        // validate config
        const config = getConfig();
        const sendingConfig = config.chainConfig[sendingChainId];
        const receivingConfig = config.chainConfig[receivingChainId];
        if (
          !sendingConfig.providers ||
          sendingConfig.providers.length === 0 ||
          !receivingConfig.providers ||
          receivingConfig.providers.length === 0
        ) {
          return errAsync(
            new HandlerError(HandlerError.reasons.AuctionValidationError, {
              calling: "",
              methodId,
              method,
              auctionError: {
                message: "Providers not available for both chains",
                type: "Validation",
                context: {
                  sendingChainId,
                  receivingChainId,
                },
              },
            }),
          );
        }
        return combine([
          ResultAsync.fromPromise(
            this.txService.getBalance(sendingChainId, this.signer.address),
            (err) =>
              new HandlerError(HandlerError.reasons.TxServiceError, {
                calling: "txService.getBalance => sending",
                method,
                methodId,
                txServiceError: jsonifyError(err as NxtpError),
              }),
          ),
          ResultAsync.fromPromise(
            this.txService.getBalance(receivingChainId, this.signer.address),
            (err) =>
              new HandlerError(HandlerError.reasons.TxServiceError, {
                calling: "txService.getBalance => receiving",
                method,
                methodId,
                txServiceError: jsonifyError(err as NxtpError),
              }),
          ),
        ]);
      })
      .andThen((balances) => {
        const [senderBalance, receiverBalance] = balances as BigNumber[];
        if (senderBalance.lt(sendingConfig.minGas) || receiverBalance.lt(receivingConfig.minGas)) {
          return errAsync(
            new HandlerError(HandlerError.reasons.AuctionValidationError, {
              calling: "",
              methodId,
              method,
              auctionError: {
                message: "Not enough gas",
                type: "Validation",
                context: {
                  sendingChainId,
                  receivingChainId,
                },
              },
            }),
          );
        }
        return okAsync({ senderBalance, receiverBalance });
      })
      .andThen(() => {
        this.logger.info({ method, methodId }, "Auction validation complete, generating bid");
        // (TODO in what other scenarios would auction fail here? We should make sure
        // that router does not bid unless it is *sure* it's doing ok)
        // If you can support the transfer:
        // Next, prepare bid
        // - TODO: Get price from AMM
        // - TODO: Get fee rate
        // estimate gas for contract
        // amountReceived = amountReceived.sub(gasFee)

        // - Create bid object
        bid = {
          user,
          router: this.signer.address,
          sendingChainId,
          sendingAssetId,
          amount,
          receivingChainId,
          receivingAssetId,
          amountReceived,
          receivingAddress,
          transactionId,
          expiry,
          callDataHash,
          callTo,
          encryptedCallData,
          sendingChainTxManagerAddress: sendingConfig.transactionManagerAddress,
          receivingChainTxManagerAddress: receivingConfig.transactionManagerAddress,
          bidExpiry: BID_EXPIRY(),
        };

        return ResultAsync.fromPromise(
          signAuctionBid(bid, this.signer),
          (err) =>
            new HandlerError(HandlerError.reasons.AuctionValidationError, {
              calling: "signAuctionBid",
              methodId,
              method,
              auctionError: jsonifyError(err as Error),
            }),
        );
      })
      .andThen((bidSignature) => {
        return ResultAsync.fromPromise(
          this.messagingService.publishAuctionResponse(inbox, { bid, bidSignature }),
          (err) =>
            new HandlerError(HandlerError.reasons.MessagingError, {
              calling: "messagingService.publishAuctionResponse",
              methodId,
              method,
              messagingError: jsonifyError(err as Error),
            }),
        );
      });

    if (result.isOk()) {
      // Last, update metrics
      this.logger.info({ method, methodId, result: result.value }, "Method complete");
    } else {
      this.logger.error({ method, methodId, transactionId, err: result.error });
    }
  }

  // HandleMetatxRequest
  // Purpose: If a user sends a FULFILL payload, submit it to chain on their behalf
  public async handleMetaTxRequest(data: MetaTxPayload<any>, inbox: string): Promise<void> {
    // First log
    const method = "handleMetaTxRequest";
    const methodId = hId();
    this.logger.info({ method, methodId, data }, "Method start");

    const { chainId } = data;

    if (data.type === "Fulfill") {
      const fulfillData: MetaTxFulfillPayload = data.data;
      // Validate that metatx request matches with known data about fulfill
      // Is this needed? Can we just submit to chain without validating?
      // Technically this is ok, but perhaps we want to validate only for our own
      // logging purposes.
      // Would also be bad if router had no gas here
      // Next, prepare the tx object
      // - Get chainId from data
      // - Get fulfill fee from data and validate it covers gas
      // - etc.
      // Send to txService
      // Update metrics

      // TODO: make sure fee is something we want to accept

      this.logger.info({ method, methodId, chainId, data }, "Submitting tx");
      const res = await this.txManager
        .fulfill(chainId, {
          txData: fulfillData.txData,
          relayerFee: fulfillData.relayerFee,
          signature: fulfillData.signature,
          callData: fulfillData.callData,
        })
        .map((tx) => {
          this.logger.info({ method, methodId, transactionHash: tx.transactionHash }, "Relayed transaction");
          return tx;
        })
        .match<{ transactionHash: string; err?: NxtpErrorJson }>(
          (tx) => {
            return { transactionHash: tx.transactionHash };
          },
          (err) => {
            return { transactionHash: "", err };
          },
        );

      try {
        await this.messagingService.publishMetaTxResponse(inbox, { ...res, chainId });
      } catch (err) {
        this.logger.error({ method, methodId, err: jsonifyError(err) }, "Error messaging");
      }
    }
  }

  // HandleSenderPrepare
  // Purpose: On sender PREPARE, router should mirror the data to receiver chain
  public async handleSenderPrepare(inboundData: TransactionPreparedEvent): Promise<void> {
    const method = "handleSenderPrepare";
    const methodId = hId();
    this.logger.info({ method, methodId, inboundData }, "Method start");

    const { txData, bidSignature, encodedBid, encryptedCallData } = inboundData;

    // TODO: what if theres never a fulfill, where does receiver cancellation
    // get handled? sender + receiver cancellation?

    // Validate the prepare data
    // TODO what needs to be validated here? Is this necessary? Assumption
    // that user is only sending stuff that makes sense is possibly ok since otherwise
    // they're losing gas costs

    //calculateExchange

    // Next, prepare the outbound data
    // Must have:
    // - Sending and receiving chainId
    // - Sending and receiving assetId
    // - Sender address
    // - Router address
    // - Unique transferId (TODO: do we need this? How should we create this?)
    // - Price and fee quote (TODO: either we can agree upon this upfront)
    // - Amount sent by user
    // - Recipient (callTo) and callData

    // amount and expiry need to be modified

    // Then prepare tx object
    // Note tx object must have:
    // - Prepare fn params
    // - Destination chainId
    // - Amount
    // - AssetId
    // encode the data for contract call
    // Send to txService
    this.logger.info({ method, methodId, transactionId: txData.transactionId }, "Sending receiver prepare tx");
    const res = await this.txManager
      .prepare(txData.receivingChainId, {
        txData,
        amount: mutateAmount(txData.amount),
        expiry: mutateExpiry(txData.expiry),
        bidSignature,
        encodedBid,
        encryptedCallData,
      })
      .map((tx) => {
        this.logger.info({ method, methodId, transactionHash: tx.transactionHash }, "Prepared transaction");
        return tx;
      })
      .mapErr((err) => {
        if (err.message.includes("#P:015")) {
          this.logger.warn(
            {
              method,
              methodId,
              transactionId: txData.transactionId,
            },
            "Tx Failed because it was already prepared, do not cancel",
          );
          return okAsync(undefined);
        } else {
          // if the prepare tx fails, cancel the sender
          this.logger.warn(
            {
              method,
              methodId,
              transactionId: txData.transactionId,
              prepareError: jsonifyError(err),
            },
            "Could not prepare tx, cancelling",
          );
          return this.txManager
            .cancel(txData.sendingChainId, {
              txData,
              signature: "0x",
              relayerFee: "0",
            })
            .map((tx) => {
              this.logger.warn({ method, methodId, transactionHash: tx.transactionHash }, "Cancelled transaction");
              return okAsync(tx);
            })
            .mapErr((err) => {
              this.logger.error({ method, methodId, err: jsonifyError(err) }, "Error cancelling transaction");
              return errAsync(
                new HandlerError(HandlerError.reasons.TxServiceError, {
                  method,
                  methodId,
                  calling: "txManager.cancel",
                  txServiceError: jsonifyError(err),
                }),
              );
            });
        }
      });

    if (res.isOk()) {
      // If success, update metrics
    }
  }

  // HandleReceiverFulfill
  // Purpose: Router should mirror the receiver fulfill data back to sender side
  public async handleReceiverFulfill(
    senderEvent: TransactionPreparedEvent,
    receiverEvent: TransactionFulfilledEvent,
  ): Promise<void> {
    const method = "handleReceiverFulfill";
    const methodId = hId();
    this.logger.info({ method, methodId, senderEvent, receiverEvent }, "Method start");

    const { txData, signature, callData, relayerFee } = receiverEvent;

    // Send to tx service
    this.logger.info({ method, methodId, transactionId: txData.transactionId, signature }, "Sending sender fulfill tx");

    const res = await this.txManager
      .fulfill(txData.sendingChainId, {
        txData: senderEvent.txData,
        signature,
        relayerFee,
        callData,
      })
      .map((tx) => {
        this.logger.info({ method, methodId, transactionHash: tx.transactionHash }, "Prepared transaction");
        return tx;
      });

    if (res.isOk()) {
      // If success, update metrics
    }
  }
}

import {
  TransactionCancelledEvent,
  TransactionData,
  TransactionFulfilledEvent,
  TransactionPreparedEvent,
} from "@connext/nxtp-utils";
import { TransactionManager } from "@connext/nxtp-contracts/typechain";
import { Evt } from "evt";
import { BaseLogger } from "pino";
import { BigNumber, providers } from "ethers";

export const TransactionManagerEvents = {
  TransactionPrepared: "TransactionPrepared",
  TransactionFulfilled: "TransactionFulfilled",
  TransactionCancelled: "TransactionCancelled",
} as const;
export type TransactionManagerEvent = typeof TransactionManagerEvents[keyof typeof TransactionManagerEvents];

export type WrappedEvent<T> = T & { transactionReceipt: providers.TransactionReceipt };
export type SdkTransactionPreparedEvent = WrappedEvent<TransactionPreparedEvent>;
export type SdkTransactionFulfilledEvent = WrappedEvent<TransactionFulfilledEvent>;
export type SdkTransactionCancelledEvent = WrappedEvent<TransactionCancelledEvent>;

export interface TransactionManagerEventPayloads {
  [TransactionManagerEvents.TransactionPrepared]: SdkTransactionPreparedEvent;
  [TransactionManagerEvents.TransactionFulfilled]: SdkTransactionFulfilledEvent;
  [TransactionManagerEvents.TransactionCancelled]: SdkTransactionCancelledEvent;
}

/**
 * @classdesc Parrots events from the TransactionManager contract into properly typed events, and exposes more convenient event listener methods for class consumers
 */
export class TransactionManagerListener {
  private readonly evts = {
    [TransactionManagerEvents.TransactionPrepared]: Evt.create<SdkTransactionPreparedEvent>(),
    [TransactionManagerEvents.TransactionFulfilled]: Evt.create<SdkTransactionFulfilledEvent>(),
    [TransactionManagerEvents.TransactionCancelled]: Evt.create<SdkTransactionCancelledEvent>(),
  };
  private listenersEstablished = false;

  constructor(
    public readonly transactionManager: TransactionManager,
    public readonly chainId: number,
    private readonly logger: BaseLogger,
  ) {
    this.establishListeners();
  }

  /**
   * Sets up listeners on the transaction manager contract to parrot emitted contract events into a more properly typed format.
   *
   */
  public establishListeners(): void {
    // idempotency
    if (this.listenersEstablished) {
      return;
    }

    /**
     * Helper to translate contract-emitted events to properly typed ones
     *
     * @param txData - Contract emitted event
     * @returns Properly typed contract event (handle BigNumbers)
     */
    const processTxData = (txData: any): TransactionData => {
      return {
        user: txData.user,
        router: txData.router,
        sendingAssetId: txData.sendingAssetId,
        receivingAssetId: txData.receivingAssetId,
        sendingChainFallback: txData.sendingChainFallback,
        callTo: txData.callTo,
        receivingAddress: txData.receivingAddress,
        sendingChainId: txData.sendingChainId.toNumber(),
        receivingChainId: txData.receivingChainId.toNumber(),
        callDataHash: txData.callDataHash,
        transactionId: txData.transactionId,
        preparedBlockNumber: txData.preparedBlockNumber.toNumber(),
        amount: txData.amount.toString(),
        expiry: BigNumber.from(txData.expiry).toNumber(),
      };
    };

    this.transactionManager.on(
      TransactionManagerEvents.TransactionPrepared,
      (
        _user,
        _router,
        _transactionId,
        _txData,
        caller,
        encryptedCallData,
        encodedBid,
        bidSignature,
        transactionReceipt,
      ) => {
        const txData = processTxData(_txData);
        this.logger.info(
          { txData, caller, encryptedCallData, encodedBid, bidSignature, transactionReceipt },
          "TransactionManagerEvents.TransactionPrepared",
        );
        const payload: SdkTransactionPreparedEvent = {
          txData,
          caller,
          encryptedCallData,
          encodedBid,
          bidSignature,
          transactionReceipt,
        };
        this.evts[TransactionManagerEvents.TransactionPrepared].post(payload);
      },
    );

    this.transactionManager.on(
      TransactionManagerEvents.TransactionFulfilled,
      (_user, _router, _transactionId, _txData, relayerFee, signature, callData, caller, transactionReceipt) => {
        const txData = processTxData(_txData);
        this.logger.info(
          { txData, relayerFee, signature, callData, caller, transactionReceipt },
          "TransactionManagerEvents.TransactionFulfilled",
        );
        const payload: SdkTransactionFulfilledEvent = {
          txData,
          signature: signature,
          relayerFee: relayerFee.toString(),
          callData,
          caller,
          transactionReceipt,
        };
        this.evts[TransactionManagerEvents.TransactionFulfilled].post(payload);
      },
    );

    this.transactionManager.on(
      TransactionManagerEvents.TransactionCancelled,
      (_user, _router, _transactionId, _txData, relayerFee, caller, transactionReceipt) => {
        const txData = processTxData(_txData);
        this.logger.info(
          { txData, relayerFee, caller, transactionReceipt },
          "TransactionManagerEvents.TransactionCancelled",
        );
        const payload: SdkTransactionCancelledEvent = {
          txData,
          relayerFee: relayerFee.toString(),
          caller,
          transactionReceipt,
        };
        this.evts[TransactionManagerEvents.TransactionCancelled].post(payload);
      },
    );

    this.listenersEstablished = true;
  }

  /**
   * Removes all listeners from the transaction manager
   *
   * @param event - (optional) Event to remove all listeners from. If not supplied will remove all listeners from all events
   */
  public removeAllListeners(event?: TransactionManagerEvent): void {
    this.transactionManager.removeAllListeners(event);
    this.detach(event);
    this.listenersEstablished = false;
  }

  /**
   * Attaches a callback to the emitted event
   *
   * @param event - The event name to attach a handler for
   * @param callback - The callback to invoke on event emission
   * @param filter - (optional) A filter where callbacks are only invoked if the filter returns true
   * @param timeout - (optional) A timeout to detach the handler within. I.e. if no events fired within the timeout, then the handler is detached
   */
  public attach<T extends TransactionManagerEvent>(
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x) as [number, (data: TransactionManagerEventPayloads[T]) => void];
    this.evts[event].pipe(filter).attach(...args);
  }

  /**
   * Attaches a callback to the emitted event that will be executed one time and then detached.
   *
   * @param event - The event name to attach a handler for
   * @param callback - The callback to invoke on event emission
   * @param filter - (optional) A filter where callbacks are only invoked if the filter returns true
   * @param timeout - (optional) A timeout to detach the handler within. I.e. if no events fired within the timeout, then the handler is detached
   *
   */
  public attachOnce<T extends TransactionManagerEvent>(
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x) as [number, (data: TransactionManagerEventPayloads[T]) => void];
    this.evts[event].pipe(filter).attachOnce(...args);
  }

  /**
   * Removes all attached handlers from the given event.
   *
   * @param event - (optional) The event name to remove handlers from. If not provided, will detach handlers from *all* subgraph events
   */
  public detach<T extends TransactionManagerEvent>(event?: T): void {
    if (event) {
      this.evts[event].detach();
      return;
    }
    Object.values(this.evts).forEach((evt) => evt.detach());
  }

  /**
   * Returns a promise that resolves when the event matching the filter is emitted
   *
   * @param event - The event name to wait for
   * @param timeout - The ms to continue waiting before rejecting
   * @param filter - (optional) A filter where the promise is only resolved if the filter returns true
   *
   * @returns Promise that will resolve with the event payload once the event is emitted, or rejects if the timeout is reached.
   *
   */
  public waitFor<T extends TransactionManagerEvent>(
    event: T,
    timeout: number,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
  ): Promise<TransactionManagerEventPayloads[T]> {
    return this.evts[event].pipe(filter).waitFor(timeout);
  }
}

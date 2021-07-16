import {
  TransactionCancelledEvent,
  TransactionData,
  TransactionFulfilledEvent,
  TransactionPreparedEvent,
} from "@connext/nxtp-utils";
import { TransactionManager } from "@connext/nxtp-contracts/typechain";
import { Evt } from "evt";
import { BaseLogger } from "pino";

export const TransactionManagerEvents = {
  TransactionPrepared: "TransactionPrepared",
  TransactionFulfilled: "TransactionFulfilled",
  TransactionCancelled: "TransactionCancelled",
} as const;
export type TransactionManagerEvent = typeof TransactionManagerEvents[keyof typeof TransactionManagerEvents];

export interface TransactionManagerEventPayloads {
  [TransactionManagerEvents.TransactionPrepared]: TransactionPreparedEvent;
  [TransactionManagerEvents.TransactionFulfilled]: TransactionFulfilledEvent;
  [TransactionManagerEvents.TransactionCancelled]: TransactionCancelledEvent;
}

export class TransactionManagerListener {
  private readonly evts = {
    [TransactionManagerEvents.TransactionPrepared]: Evt.create<TransactionPreparedEvent>(),
    [TransactionManagerEvents.TransactionFulfilled]: Evt.create<TransactionFulfilledEvent>(),
    [TransactionManagerEvents.TransactionCancelled]: Evt.create<TransactionCancelledEvent>(),
  };

  constructor(
    public readonly transactionManager: TransactionManager,
    public readonly chainId: number,
    private readonly logger: BaseLogger,
  ) {
    this.establishListeners();
  }

  private establishListeners(): void {
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
        expiry: txData.expiry.toString(),
      };
    };

    this.transactionManager.on(
      TransactionManagerEvents.TransactionPrepared,
      (_user, _router, _transactionId, txData, caller, encryptedCallData, encodedBid, bidSignature) => {
        this.logger.info(
          { txData, caller, encryptedCallData, encodedBid, bidSignature },
          "TransactionManagerEvents.TransactionPrepared",
        );
        const payload: TransactionPreparedEvent = {
          txData: processTxData(txData),
          caller,
          encryptedCallData,
          encodedBid,
          bidSignature,
        };
        this.evts[TransactionManagerEvents.TransactionPrepared].post(payload);
      },
    );

    this.transactionManager.on(
      TransactionManagerEvents.TransactionFulfilled,
      (_user, _router, _transactionId, txData, relayerFee, signature, callData, caller) => {
        this.logger.info(
          { txData, relayerFee, signature, callData, caller },
          "TransactionManagerEvents.TransactionFulfilled",
        );
        const payload: TransactionFulfilledEvent = {
          txData: processTxData(txData),
          signature: signature,
          relayerFee: relayerFee.toString(),
          callData,
          caller,
        };
        this.evts[TransactionManagerEvents.TransactionFulfilled].post(payload);
      },
    );

    this.transactionManager.on(
      TransactionManagerEvents.TransactionCancelled,
      (_user, _router, _transactionId, txData, relayerFee, caller) => {
        this.logger.info({ txData, relayerFee, caller }, "TransactionManagerEvents.TransactionCancelled");
        const payload: TransactionCancelledEvent = {
          txData: processTxData(txData),
          relayerFee: relayerFee.toString(),
          caller,
        };
        this.evts[TransactionManagerEvents.TransactionCancelled].post(payload);
      },
    );
  }

  public attach<T extends TransactionManagerEvent>(
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x) as [number, (data: TransactionManagerEventPayloads[T]) => void];
    this.evts[event].pipe(filter).attach(...args);
  }

  public attachOnce<T extends TransactionManagerEvent>(
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x) as [number, (data: TransactionManagerEventPayloads[T]) => void];
    this.evts[event].pipe(filter).attachOnce(...args);
  }

  public detach<T extends TransactionManagerEvent>(event?: T): void {
    if (event) {
      this.evts[event].detach();
      return;
    }
    Object.values(this.evts).forEach((evt) => evt.detach());
  }

  public waitFor<T extends TransactionManagerEvent>(
    event: T,
    timeout: number,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
  ): Promise<TransactionManagerEventPayloads[T]> {
    return this.evts[event].pipe(filter).waitFor(timeout);
  }
}

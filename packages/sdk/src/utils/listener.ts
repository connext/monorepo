import {
  TransactionCancelledEvent,
  TransactionData,
  TransactionFulfilledEvent,
  TransactionPreparedEvent,
} from "@connext/nxtp-utils";
import { Contract, providers } from "ethers";
import { Evt } from "evt";

import { NxtpSdkEvent, NxtpSdkEvents, TransactionCompletedEvent, NxtpSdkEventPayloads } from "../sdk";

import { getTransactionManagerContract } from "./contract";
// Define event types

export class TransactionManagerListener {
  private readonly evts = {
    [NxtpSdkEvents.TransactionPrepared]: Evt.create<TransactionPreparedEvent>(),
    [NxtpSdkEvents.TransactionFulfilled]: Evt.create<TransactionFulfilledEvent>(),
    [NxtpSdkEvents.TransactionCancelled]: Evt.create<TransactionCancelledEvent>(),
    [NxtpSdkEvents.TransactionCompleted]: Evt.create<TransactionCompletedEvent>(),
  };
  public chainId?: number;

  private constructor(private readonly transactionManager: Contract) {}

  static async connect(provider: providers.JsonRpcProvider): Promise<TransactionManagerListener> {
    const { chainId } = await provider.getNetwork();

    const { instance } = getTransactionManagerContract(chainId, provider);
    const listener = new TransactionManagerListener(instance);
    listener.chainId = chainId;
    await listener.establishListeners();
    return listener;
  }

  public getTransactionManager(): Contract {
    return this.transactionManager;
  }

  private async establishListeners(): Promise<void> {
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
        preparedBlockNumber: txData.blockNumber.toNumber(),
        amount: txData.amount.toString(),
        expiry: txData.expiry.toString(),
      };
    };

    this.transactionManager.on(
      NxtpSdkEvents.TransactionPrepared,
      (txData, caller, encryptedCallData, encodedBid, bidSignature) => {
        const payload: TransactionPreparedEvent = {
          txData: processTxData(txData),
          caller,
          encryptedCallData,
          encodedBid,
          bidSignature,
        };
        this.evts[NxtpSdkEvents.TransactionPrepared].post(payload);
      },
    );

    this.transactionManager.on(NxtpSdkEvents.TransactionFulfilled, (txData, relayerFee, signature, caller) => {
      const payload: TransactionFulfilledEvent = {
        txData: processTxData(txData),
        signature: signature,
        relayerFee: relayerFee.toString(),
        caller,
      };
      this.evts[NxtpSdkEvents.TransactionFulfilled].post(payload);
    });

    this.transactionManager.on(NxtpSdkEvents.TransactionCancelled, (txData, relayerFee, caller) => {
      const payload: TransactionCancelledEvent = {
        txData: processTxData(txData),
        relayerFee: relayerFee.toString(),
        caller,
      };
      this.evts[NxtpSdkEvents.TransactionCancelled].post(payload);
    });
  }

  public attach<T extends NxtpSdkEvent>(
    event: T,
    callback: (data: NxtpSdkEventPayloads[T]) => void,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x) as [number, (data: NxtpSdkEventPayloads[T]) => void];
    this.evts[event].pipe(filter).attach(...args);
  }

  public attachOnce<T extends NxtpSdkEvent>(
    event: T,
    callback: (data: NxtpSdkEventPayloads[T]) => void,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x) as [number, (data: NxtpSdkEventPayloads[T]) => void];
    this.evts[event].pipe(filter).attachOnce(...args);
  }

  public detach<T extends NxtpSdkEvent>(event?: T): void {
    if (event) {
      this.evts[event].detach();
      return;
    }
    Object.values(this.evts).forEach((evt) => evt.detach());
  }

  public waitFor<T extends NxtpSdkEvent>(
    event: T,
    timeout: number,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
  ): Promise<NxtpSdkEventPayloads[T]> {
    return this.evts[event].pipe(filter).waitFor(timeout);
  }
}

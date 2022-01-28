import { AuctionResponse, jsonifyError, Logger, NxtpError, NxtpErrorJson, TransactionPreparedEvent } from "@connext/nxtp-utils";
import { NxtpSdk, NxtpSdkEvent, NxtpSdkEventPayloads, NxtpSdkEvents, ReceiverPrepareSignedPayload, ReceiverTransactionCancelledPayload, ReceiverTransactionFulfilledPayload, ReceiverTransactionPreparedPayload, SenderTokenApprovalMinedPayload, SenderTokenApprovalSubmittedPayload, SenderTransactionCancelledPayload, SenderTransactionFulfilledPayload, SenderTransactionPreparedPayload, SenderTransactionPrepareSubmittedPayload } from "@connext/nxtp-sdk";
import { Evt } from "evt";
import {ethers, Signer} from "ethers";
import { ChainConfig } from "@connext/nxtp-txservice";
import {getConfig } from "../utils/config";

import { AgentTypes, SdkTestAgent, TestTargets } from "./loadTestTypes";

type AddressField = { address: string };

class TransactionCancelled extends NxtpError {
  static readonly type = TransactionCancelled.name;

  static getMessage(wasRouter: boolean) {
    return wasRouter ? `Router cancelled transfer` : `Transfer was cancelled`;
  }

  constructor(
    public readonly wasRouter: boolean,
    public readonly transactionId: string,
    public readonly context: any = {},
  ) {
    super(TransactionCancelled.getMessage(wasRouter), { transactionId, ...context }, TransactionCancelled.type);
  }
}

export const SdkAgentEvents = {
  ...NxtpSdkEvents,
  InitiateFailed: "InitiateFailed",
  UserCompletionFailed: "UserCompletionFailed",
  RouterCompletionFailed: "RouterCompletionFailed",
  TransactionCompleted: "TransactionCompleted",
} as const;
export type SdkAgentEvent = typeof SdkAgentEvents[keyof typeof SdkAgentEvents];

// Undefined if failed on bid
type InitiateFailedPayload = { params?: AuctionResponse; error: string };
type UserCompletionFailedPayload = { params: TransactionPreparedEvent; error: NxtpErrorJson; fulfilling: boolean };
type RouterCompletionFailedPayload = NxtpSdkEventPayloads[typeof SdkAgentEvents.SenderTransactionCancelled];
type TransactionCompletedPayload = { transactionId: string; timestamp: number; error?: NxtpErrorJson };
export interface SdkAgentEventPayloads extends NxtpSdkEventPayloads {
  [SdkAgentEvents.InitiateFailed]: InitiateFailedPayload;
  [SdkAgentEvents.UserCompletionFailed]: UserCompletionFailedPayload;
  [SdkAgentEvents.RouterCompletionFailed]: RouterCompletionFailedPayload;
  [SdkAgentEvents.TransactionCompleted]: TransactionCompletedPayload;
}

const createEvts = (): { [K in SdkAgentEvent]: Evt<SdkAgentEventPayloads[K] & AddressField> } => {
  return {
    [SdkAgentEvents.SenderTokenApprovalSubmitted]: Evt.create<SenderTokenApprovalSubmittedPayload & AddressField>(),
    [SdkAgentEvents.SenderTokenApprovalMined]: Evt.create<SenderTokenApprovalMinedPayload & AddressField>(),
    [SdkAgentEvents.SenderTransactionPrepareSubmitted]: Evt.create<
      SenderTransactionPrepareSubmittedPayload & AddressField
    >(),
    [SdkAgentEvents.SenderTransactionPrepared]: Evt.create<SenderTransactionPreparedPayload & AddressField>(),
    [SdkAgentEvents.SenderTransactionFulfilled]: Evt.create<SenderTransactionFulfilledPayload & AddressField>(),
    [SdkAgentEvents.SenderTransactionCancelled]: Evt.create<SenderTransactionCancelledPayload & AddressField>(),
    [SdkAgentEvents.ReceiverPrepareSigned]: Evt.create<ReceiverPrepareSignedPayload & AddressField>(),
    [SdkAgentEvents.ReceiverTransactionPrepared]: Evt.create<ReceiverTransactionPreparedPayload & AddressField>(),
    [SdkAgentEvents.ReceiverTransactionFulfilled]: Evt.create<ReceiverTransactionFulfilledPayload & AddressField>(),
    [SdkAgentEvents.ReceiverTransactionCancelled]: Evt.create<ReceiverTransactionCancelledPayload & AddressField>(),
    [SdkAgentEvents.InitiateFailed]: Evt.create<InitiateFailedPayload & AddressField>(),
    [SdkAgentEvents.UserCompletionFailed]: Evt.create<UserCompletionFailedPayload & AddressField>(),
    [SdkAgentEvents.RouterCompletionFailed]: Evt.create<RouterCompletionFailedPayload & AddressField>(),
    [SdkAgentEvents.TransactionCompleted]: Evt.create<TransactionCompletedPayload & AddressField>(),
  };
};

//not complete
export class SdkAgent implements SdkTestAgent{

  private signer:Signer
  private readonly sdks:NxtpSdk[] = [];
  private readonly targets: TestTargets;
  private readonly evts: { [K in SdkAgentEvent]: Evt<SdkAgentEventPayloads[K] & AddressField> } = createEvts();
  private readonly logger: Logger = new Logger({name:"sdkAgent", level:"debug"});


  public kind = AgentTypes.User;

  constructor(pk:string, targets:TestTargets){
    this.signer = new ethers.Wallet(pk);
    this.targets = targets;
    console.log(this.targets.chainConfig);

    for(const chainId of targets.chainIds){

      console.log(`chainId ${chainId}`);

      const chainConfig: { [chainId: number]: { providers: { url: string; user?: string; password?: string }[] } } = {};

      const chainProviders = getConfig().chainConfig;
      const c = getConfig();

      Object.keys(chainProviders).map((_chainId) => {
        const chainId = parseInt(_chainId);
        chainConfig[chainId] = {
          providers: chainProviders[chainId].providerUrls.map((url) => ({ url })),
          ...chainProviders[chainId],
        };
      });
      const newSigner = this.signer.connect(new ethers.providers.JsonRpcProvider(chainConfig[chainId].providers[0].url));

      const sdk = new NxtpSdk({
        chainConfig,
        signer: newSigner,
        natsUrl: c.natsUrl,
        authUrl: c.authUrl,
        network: "local",
        logger: new Logger({level: c.logLevel?? "warn"}),  
      });
      sdk.connectMessaging();
      this.sdks[chainId] = sdk;
    }
  }

  setupListeners(sdk:NxtpSdk) {
    // Parrot all sdk events
    Object.keys(NxtpSdkEvents).map((_event) => {
      const event = _event as NxtpSdkEvent;
      sdk.attach(event, (_data) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const data = _data as any;
        this.evts[event].post({ ...data, address: this.getAddress() });
      });
    });


    // Setup autofulfill of transfers + post to evt if it failed
    sdk.attach(NxtpSdkEvents.ReceiverTransactionPrepared, async (data) => {
      let error: NxtpErrorJson | undefined;
      try {
        await sdk.fulfillTransfer(data);
      } catch (e) {
        error = jsonifyError(e);
        this.logger.error("Fulfilling failed", undefined, undefined, error, {
          transactionId: data.txData.transactionId,
          error,
        });
        this.evts[SdkAgentEvents.UserCompletionFailed].post({
          error,
          params: data,
          fulfilling: true,
          address: await this.getAddress(),
        });
        // process.exit(1);
      }
      
      this.evts.TransactionCompleted.post({
        transactionId: data.txData.transactionId,
        address: await this.getAddress(),
        timestamp: Date.now(),
        error,
      });
    });

    // On sender cancellation, post that it was completed
    sdk.attach(NxtpSdkEvents.SenderTransactionCancelled, async (data) => {
      this.evts.RouterCompletionFailed.post({
        ...data,
        address: await this.getAddress(),
      });
      this.evts.TransactionCompleted.post({
        transactionId: data.txData.transactionId,
        address: await this.getAddress(),
        timestamp: Date.now(),
        error: jsonifyError(
          new TransactionCancelled(data.caller === data.txData.router, data.txData.transactionId, { ...data }),
        ),
      });
    });
  }

  public attachOnce<T extends SdkAgentEvent>(
    event: T,
    callback: (data: SdkAgentEventPayloads[T]) => void,
    filter: (data: SdkAgentEventPayloads[T]) => boolean = (_data: SdkAgentEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].pipe(filter).attachOnce(...(args as [number, any]));
  }
  public getEventFilters(){
    return this.evts;
  }

  async getAddress(): Promise<string> {
      //todo:needs asyncing
      const address = await this.signer.getAddress();
      return address;
      // return "0x5c23b39B030636B019B51e0fDe5C6F95aa4B9BCf";
  }
  getSdk(chainId: number): NxtpSdk {
      return this.sdks[chainId];
  }
  getChainConfig():ChainConfig{
    return this.targets.chainConfig;
  }
}

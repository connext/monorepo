import { getMinExpiryBuffer, NxtpSdk, NxtpSdkEvent, NxtpSdkEventPayloads, NxtpSdkEvents, ReceiverPrepareSignedPayload, ReceiverTransactionCancelledPayload, ReceiverTransactionFulfilledPayload, ReceiverTransactionPreparedPayload, SenderTokenApprovalMinedPayload, SenderTokenApprovalSubmittedPayload, SenderTransactionCancelledPayload, SenderTransactionFulfilledPayload, SenderTransactionPreparedPayload, SenderTransactionPrepareSubmittedPayload } from "@connext/nxtp-sdk";
import { ChainConfig } from "@connext/nxtp-txservice";
import { AuctionResponse, getRandomBytes32, jsonifyError, Logger, NxtpError, NxtpErrorJson, TransactionPreparedEvent } from "@connext/nxtp-utils";
import { ethers, Signer } from "ethers";

import { Config, getConfig } from "../utils/config";
import { Evt } from "evt";
import { setupChainIntegration, startContainers } from "../utils/containerManager";


type LoadTestConfig = {
  //chainIds taken in order by the behavior
  chainIds:number[];
  //number of iterations to run TestBehaviors
  iterations:number;
  //spawn docker containers
  spawnContainters:boolean;
}

type TestTargets = { 
  chainIds: number[];
  chainConfig:ChainConfig;
}

enum AgentTypes{
  User,
  Router,
  Watchtower,
}

type TestAgent = {
  kind:AgentTypes;
  getAddress():string;
  getChainConfig():ChainConfig;
}

interface SdkTestAgent extends TestAgent {
  getSdk(chainId:number):NxtpSdk;
}
// interface RouterTestAgent extends TestAgent{
//   restartRouterStack():void;
// }



class LoadTestEnvironment{
  private config:Config;
  private containersUp!:boolean;

   constructor(testParams:LoadTestConfig){
    this.config = getConfig();
    if(testParams.spawnContainters){
      this.spawnRouterStack().then((r)=>console.log(`spawning router ${r}`));
    }else{
      //override
      this.containersUp = true;
    }
  }
  fundAgents(){

  }
  async spawnRouterStack(){
    //docker api stuff in here
    await startContainers();
    await setupChainIntegration();

    this.containersUp = true;
  }

  getConfig():Config{
    return this.config;
  }

  getTargets():TestTargets{
    //should filter on testParams chainId woops
    const chainIds:number[] = [];
    Object.keys(this.config.chainConfig).map((chainId)=>chainIds.push(parseInt(chainId)));
    return <TestTargets>{chainIds: chainIds, chainConfig: this.config.chainConfig};
  }
}

interface LoadTestBehavior{
  //should get config/chain information only that is needed
  setupAgents(agents:TestAgent[]):void;
  //start/register callback
  start():void;
  end():number;
  report():void;
}

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
class SdkAgent implements SdkTestAgent{

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

      const chainProviders = env.getConfig().chainConfig;
      const c = env.getConfig();

      Object.keys(chainProviders).map((_chainId) => {
        const chainId = parseInt(_chainId);
        chainConfig[chainId] = {
          providers: chainProviders[chainId].providerUrls.map((url) => ({ url })),
        };
      });
      const newSigner = this.signer.connect(new ethers.providers.JsonRpcProvider(chainConfig[this.targets.chainIds[0]].providers[0].url));

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
          address: this.getAddress(),
        });
        // process.exit(1);
      }
      this.evts.TransactionCompleted.post({
        transactionId: data.txData.transactionId,
        address: this.getAddress(),
        timestamp: Date.now(),
        error,
      });
    });

    // On sender cancellation, post that it was completed
    sdk.attach(NxtpSdkEvents.SenderTransactionCancelled, async (data) => {
      this.evts.RouterCompletionFailed.post({
        ...data,
        address: this.getAddress(),
      });
      this.evts.TransactionCompleted.post({
        transactionId: data.txData.transactionId,
        address: this.getAddress(),
        timestamp: Date.now(),
        error: jsonifyError(
          new TransactionCancelled(data.caller === data.txData.router, data.txData.transactionId, { ...data }),
        ),
      });
    });
  }


  getAddress(): string {
      //todo:needs asyncing
      // return await this.signer.getAddress();
      return "0xdeadbeef";
  }
  getSdk(chainId: number): NxtpSdk {
      return this.sdks[chainId];
  }
  getChainConfig():ChainConfig{
    return this.targets.chainConfig;
  }
}

// class LoadTestController(){
//   //load test behaviors
//   tasks = [];
//   tasks.push(task);
//   //sequential tasks
//   for(const task in tasks){
//     task.start();
//     task.report();
//     task.ends()
//   }
  
// }
class PingPong implements LoadTestBehavior{
  
  private targets!: TestTargets;
  private agents: SdkAgent [] = [];

  private ping!:NxtpSdk;
  private pong!:NxtpSdk;

  constructor(targets: TestTargets, agents: SdkAgent []){
    this.agents = agents;
    this.targets = targets;
  }

  setupAgents(){
    //specific logic for setting up the agents for ping pong
    for(const agent of this.agents){
        // switch(agent.kind){
        //   case(AgentTypes.User):{
             
        //   }break;
        //   case(AgentTypes.Router):{
        //     console.log(`setup router`);
        //   }break;
        // }      


        this.ping = agent.getSdk(targets.chainIds[0]);
        this.pong = agent.getSdk(targets.chainIds[1]);
        agent.setupListeners(this.ping);
        agent.setupListeners(this.pong);
      
    }

  }
  async startTransfer(){
    const txid = getRandomBytes32();
    const minExpiry = getMinExpiryBuffer(); // 36h in seconds
    const buffer = 5 * 60; 

    const amount = "3.0";
    const sendingChainId = targets.chainIds[0];
    const receivingChainId = targets.chainIds[1];

    const swap = getConfig().swapPools.find((swap) => {
      // Must have sending and receiving chain
      const chains = swap.assets.map((a) => a.chainId);
      return chains.includes(sendingChainId) && chains.includes(receivingChainId);
    });
    if (!swap) {
      throw new Error(`Could not find matching swap in config: ${getConfig().swapPools}`);
    }
    const  sendingAssetId  = swap.assets.find((a) => a.chainId === sendingChainId)!;
    const  receivingAssetId  = swap.assets.find((a) => a.chainId === receivingChainId)!;

    const bid = {receivingAddress: this.agents[0].getAddress(),
                 expiry: Math.floor(Date.now() / 1000) + minExpiry + buffer,
                 transactionId: txid, 
                 amount:amount,
                 sendingChainId:sendingChainId,
                 receivingChainId:receivingChainId,
                 sendingAssetId:sendingAssetId.assetId,
                 receivingAssetId: receivingAssetId.assetId,
                 };

    const auction = await this.ping.getTransferQuote(bid);

    console.log(`auction res ${auction}`);

  }
  start(){
    this.setupAgents();

    this.startTransfer().then(()=>console.log("started txfr"));
  }
  end(): number {
      return 1;
  }
  report(): void {
      console.log(`Some behavior running`);
  }
 
}
const loadTestParams:LoadTestConfig = {chainIds: [4,5], iterations: 1, spawnContainters: true};

const env = new LoadTestEnvironment(loadTestParams);

const targets = env.getTargets();

const randomPk = ethers.Wallet.createRandom()._signingKey().privateKey;

const sdkAgent = new SdkAgent(randomPk, targets);


const ppTest = new PingPong(targets, [sdkAgent]);


ppTest.start();

//create test


import { getMinExpiryBuffer, NxtpSdk } from "@connext/nxtp-sdk";
import { createRequestContext, createMethodContext, getRandomBytes32, Logger } from "@connext/nxtp-utils";

import { SdkAgent } from "./loadTestSdkAgent";
import { LoadTestBehavior, TestTargets } from "./loadTestTypes";


export class PingPong implements LoadTestBehavior {
  private targets!: TestTargets;
  private agent: SdkAgent;

  private pingChainId: number;
  private pongChainId: number;

  private ping!: NxtpSdk;
  private pong!: NxtpSdk;

  private logger: Logger;

  private requestContext = createRequestContext("PingPong Test");
  private methodContext = createMethodContext("setupAgents");

  constructor(targets: TestTargets, agent: SdkAgent) {
    this.logger = new Logger({level: 'debug', name: "logger"});

    this.agent = agent;
    this.targets = targets;
    //set ping and pong chainIds
    this.pingChainId = this.targets.chainIds[0];
    this.pongChainId = this.targets.chainIds[1];


  }

  setupAgent() {
    //specific logic for setting up the agents for ping pong
    // for (const agent of this.agents) {
     
      // switch(agent.kind){
      //   case(AgentTypes.User):{

      //   }break;
      //   case(AgentTypes.Router):{
      //     console.log(`setup router`);
      //   }break;
      // }
      this.logger.debug(`setting up the agents with their sdks`, this.requestContext, this.methodContext);
      this.ping = this.agent.getSdk(this.pingChainId);
      this.pong = this.agent.getSdk(this.pongChainId);
      this.agent.setupListeners(this.ping);
      this.agent.setupListeners(this.pong);
    // }
  }

  async startTransfer() {
    const txid = getRandomBytes32();
    const minExpiry = getMinExpiryBuffer(); // 36h in seconds
    const buffer = 5 * 60;

    const sendingChainId = this.pingChainId;
    const receivingChainId = this.pongChainId;
 
    //larger amount if local testnet
    const amount = (this.pingChainId === 1337) ? "10" : "1";


    // const swap = getConfig().swapPools.find((swap) => {
    //   // Must have sending and receiving chain
    //   const chains = swap.assets.map((a) => a.chainId);
    //   return chains.includes(sendingChainId) && chains.includes(receivingChainId);
    // });
    // if (!swap) {
    //   throw new Error(`Could not find matching swap in config: ${getConfig().swapPools}`);
    // }
    // const  sendingAssetId  = swap.assets.find((a) => a.chainId === sendingChainId)!;
    // const  receivingAssetId  = swap.assets.find((a) => a.chainId === receivingChainId)!;

    const bid = {
      receivingAddress: await this.agent.getAddress(),
      expiry: Math.floor(Date.now() / 1000) + minExpiry + buffer,
      transactionId: txid,
      amount: amount,
      sendingChainId: sendingChainId,
      receivingChainId: receivingChainId,
      sendingAssetId: "0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F",
      receivingAssetId: "0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F",
    };

    //this.agents[0] is ping agent
    const events = this.agent.getEventFilters();
    //register pong to happen after ping
    //kept firing off multiple times, bug?
    events.TransactionCompleted.attachOnce(async (data) => {
      this.logger.debug(`\n\n\n 🏓🏓🏓 Ping Transfer Completed ${JSON.stringify(data.transactionId)}`);
      if (data.transactionId === txid) {
        //correct txid completed
        try {
          //mutate old bid to different tx and rx chains, and different txid
          const pongBid = {
            ...bid,
            transactionId: getRandomBytes32(),
            sendingChainId: receivingChainId,
            receivingChainId: sendingChainId,
          };
          const pongAuction = await this.pong.getTransferQuote(pongBid);
          this.logger.debug(`\n\n\n\npong auction ${(JSON.stringify(pongAuction), JSON.stringify(pongBid))}`, this.requestContext, this.methodContext);
          const pongPrepare = await this.pong.prepareTransfer(pongAuction, true);
          this.logger.debug(`pong prepare: ${JSON.stringify(pongPrepare)}`, this.requestContext, this.methodContext);

          events.TransactionCompleted.attachOnce(async(data)=>{
            this.logger.debug(`\n\n\n 🏓🏓🏓 Pong Transfer Completed ${JSON.stringify(data.transactionId)}`, this.requestContext, this.methodContext);
            process.exit(0);
          });
        } catch (e) {
          console.log(`error in pong ${e}`);
          process.exit(1);
        }
      }
    });
    //try ping transaction
    try {
      const auction = await this.ping.getTransferQuote(bid);
      this.logger.debug(`Ping auction ${JSON.stringify(auction)}`, this.requestContext, this.methodContext);

      const prepare = await this.ping.prepareTransfer(auction, true);
      this.logger.debug(`Ping prepare: ${JSON.stringify(prepare)}`);
    } catch (e) {
      console.log(e);
    }
  }
  start() {
    this.setupAgent();
    this.startTransfer();
  }
  end(): number {
    return process.exit(1);
  }
  report(): void {
    console.log(`Some behavior running`);
  }
}

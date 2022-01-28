import { getMinExpiryBuffer, NxtpSdk, NxtpSdkEvents } from "@connext/nxtp-sdk";
import { getRandomBytes32 } from "@connext/nxtp-utils";
import { SdkAgent } from "./loadTestSdkAgent";
import { LoadTestBehavior, TestTargets } from "./loadTestTypes";

export class PingPong implements LoadTestBehavior {
  private targets!: TestTargets;
  private agents: SdkAgent[] = [];

  private ping!: NxtpSdk;
  private pong!: NxtpSdk;

  constructor(targets: TestTargets, agents: SdkAgent[]) {
    this.agents = agents;
    this.targets = targets;
  }

  setupAgents() {
    //specific logic for setting up the agents for ping pong
    for (const agent of this.agents) {
      // switch(agent.kind){
      //   case(AgentTypes.User):{

      //   }break;
      //   case(AgentTypes.Router):{
      //     console.log(`setup router`);
      //   }break;
      // }
      this.ping = agent.getSdk(this.targets.chainIds[0]);
      this.pong = agent.getSdk(this.targets.chainIds[1]);
      agent.setupListeners(this.ping);
      agent.setupListeners(this.pong);
    }
  }
  async startTransfer() {
    const txid = getRandomBytes32();
    const minExpiry = getMinExpiryBuffer(); // 36h in seconds
    const buffer = 5 * 60;

    const amount = "10";
    const sendingChainId = this.targets.chainIds[0];
    const receivingChainId = this.targets.chainIds[1];


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
      receivingAddress: await this.agents[0].getAddress(),
      expiry: Math.floor(Date.now() / 1000) + minExpiry + buffer,
      transactionId: txid,
      amount: amount,
      sendingChainId: sendingChainId,
      receivingChainId: receivingChainId,
      sendingAssetId: "0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F",
      receivingAssetId: "0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F",
    };

    //this.agents[0] is ping agent
    const events = this.agents[0].getEventFilters();
    //register pong to happen after ping
    //kept firing off multiple times, bug?
    events.TransactionCompleted.attachOnce(async (data) => {
      console.log(`Ping Transfer Completed ${JSON.stringify(data.transactionId)}`);
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
          console.log(`\n\n\n\npong auction ${(JSON.stringify(pongAuction), JSON.stringify(pongBid))}`);
          const pongPrepare = await this.pong.prepareTransfer(pongAuction, true);
          console.log(`pong prepare: ${JSON.stringify(pongPrepare)}`);
        } catch (e) {
          console.log(`error in pong ${e}`);
        }
      }
    });
    //try ping transaction
    try {
      const auction = await this.ping.getTransferQuote(bid);
      console.log(`Ping auction ${JSON.stringify(auction)}`);

      const prepare = await this.ping.prepareTransfer(auction, true);
      console.log(`Ping prepare: ${JSON.stringify(prepare)}`);
    } catch (e) {
      console.log(e);
    }
  }
  start() {
    this.setupAgents();
    this.startTransfer();
  }
  end(): number {
    return process.exit(1);
  }
  report(): void {
    console.log(`Some behavior running`);
  }
}

import { NxtpSdk } from "@connext/nxtp-sdk";
import { ChainConfig } from "@connext/nxtp-txservice";
import { ethers, Signer } from "ethers";

import { Config, getConfig } from "../utils/config";

const compose = require("docker-compose");

const path_to_yml = "./ops/";

async function initDocker(){
  const state = await compose.upAll({cwd:path_to_yml, config:"router.docker-compose.yml"});
  return state;
}

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
      this.spawnRouterStack().then((r)=>console.log(`spawning router ${r.out}`));
    }else{
      //override
      this.containersUp = true;
    }
  }
  fundAgents(){

  }
  async spawnRouterStack(){
    //docker api stuff in here
    const res = await initDocker();
    this.containersUp = true;
    return res;
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

class PingPong implements LoadTestBehavior{
  
  private targets!: TestTargets;
  private agents: SdkTestAgent [] = [];

  private ping!:NxtpSdk;
  private pong!:NxtpSdk;

  constructor(targets: TestTargets, agents: SdkTestAgent []){
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
      }

  }
  startTransfer(){


  }
  start(){
    this.setupAgents();

    this.startTransfer();
  }
  end(): number {
      return 1;
  }
  report(): void {
      console.log(`Some behavior running`);
  }
 
}

//not complete
class SdkAgent implements SdkTestAgent{

  private signer:Signer
  private readonly sdks:NxtpSdk[] = [];
  private readonly targets: TestTargets;
  private readonly env: LoadTestEnvironment;

  public kind = AgentTypes.User;

  constructor(pk:string, targets:TestTargets, env: LoadTestEnvironment){
    this.signer = new ethers.Wallet(pk);
    this.targets = targets;
    this.env = env;

    // for(const chainId in targets.chainIds){
    //   const newSigner = this.signer.connect(new ethers.providers.JsonRpcProvider(targets.chainConfig.providers[0]));
    //   const sdk = new NxtpSdk({
    //     targets.chainConfig,
    //     signer: newSigner, 
    //     ///...       

    //   })
    //   this.sdks[chainId] = sdk;
    // }
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

const loadTestParams:LoadTestConfig = {chainIds: [4,5], iterations: 1, spawnContainters: true};

const env = new LoadTestEnvironment(loadTestParams);

const targets = env.getTargets();

const sdkAgent = new SdkAgent("0xb2e2562db2e9d856dec22c25571a2ff6b276b1789d15fdfc13835533ab2a33f8", targets, env);


const ppTest = new PingPong(targets, [sdkAgent]);


ppTest.start();

//create test


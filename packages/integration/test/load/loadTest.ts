import { NxtpSdk } from "@connext/nxtp-sdk";
import { ChainConfig } from "@connext/nxtp-txservice";
import { ethers, Signer } from "ethers";
import { Config, getConfig } from "../utils/config";



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
interface RouterTestAgent extends TestAgent{
  restartRouterStack():void;
}



class LoadTestEnvironment{
  private config:Config;
  private containersUp!:boolean;

  constructor(testParams:LoadTestConfig){
    this.config = getConfig();
    if(testParams.spawnContainters){
      this.spawnRouterStack();
    }else{
      //override
      this.containersUp = true
    }
  }
  spawnRouterStack(){
    //docker api stuff in here
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
 
}

//not complete
class SdkAgent implements SdkTestAgent{

  private signer:Signer
  private readonly sdks:NxtpSdk[] = [];
  private readonly targets: TestTargets;
  private kind = AgentTypes.User;

  constructor(pk:string, targets:TestTargets, env: LoadTestEnvironment){
    this.signer = new ethers.Wallet(pk);
    this.targets = targets;
    for(const chainId in targets.chainIds){
      const newSigner = this.signer.connect(new ethers.providers.JsonRpcProvider(targets.chainConfig.providers[0]));
      const sdk = new NxtpSdk({
        targets.chainConfig,
        signer: newSigner, 
        ///...       

      })
      this.sdks[chainId] = sdk;
    }
  }

  
  getAddress(): string {
      return await this.signer.getAddress();
  }
  getSdk(chainId: number): NxtpSdk {
      return this.sdks[chainId];
  }
  getChainConfig():ChainConfig{
    return this.targets.chainConfig;
  }
}

const loadTestParams:LoadTestConfig = {chainIds: [4,5], iterations: 1, spawnContainters: true};

const env = new LoadTestEnvironment(loadTestParams);

const targets = env.getTargets();

const sdkAgent = new SdkAgent("privatekey", targets, env);



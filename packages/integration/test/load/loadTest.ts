import { ethers} from "ethers";
import { Config, getConfig } from "../utils/config";
import { setupChainIntegration, startContainers } from "../utils/containerManager";
import { SdkAgent } from "./loadTestSdkAgent";

import { LoadTestConfig, TestTargets } from "./loadTestTypes";
import { PingPong } from "./pingPongTest";

class LoadTestEnvironment{
  private config:Config;
  private testConfig:LoadTestConfig;
  private containersUp!:boolean;

   constructor(testParams:LoadTestConfig){
    this.config = getConfig();
    this.testConfig = testParams;
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
    if(this.testConfig.spawnContainters){
      await startContainers();
      await setupChainIntegration();
    }
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

const loadTestParams: LoadTestConfig = {chainIds: [1337,1338], iterations: 1, spawnContainters: false};

const env = new LoadTestEnvironment(loadTestParams);

const targets = env.getTargets();

// const randomPk = ethers.Wallet.createRandom()._signingKey().privateKey;
const randomPk = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";

const sdkAgent = new SdkAgent(randomPk, targets);


const ppTest = new PingPong(targets, [sdkAgent]);


ppTest.start();

//create test


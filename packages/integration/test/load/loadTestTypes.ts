import { NxtpSdk } from "@connext/nxtp-sdk";
import { ChainConfig } from "@connext/nxtp-txservice";

export type LoadTestConfig = {
  //chainIds taken in order by the behavior
  chainIds:number[];
  //number of iterations to run TestBehaviors
  iterations:number;
  //spawn docker containers
  spawnContainters:boolean;
}

export type TestTargets = { 
  chainIds: number[];
  chainConfig:ChainConfig;
}

export enum AgentTypes{
  User,
  Router,
  Watchtower,
}

export type TestAgent = {
  kind:AgentTypes;
  getAddress():Promise<string>;
  getChainConfig():ChainConfig;
}

export interface SdkTestAgent extends TestAgent {
  getSdk(chainId:number):NxtpSdk;
}
// interface RouterTestAgent extends TestAgent{
//   restartRouterStack():void;
// }

export interface LoadTestBehavior{
  //should get config/chain information only that is needed
  setupAgents(agents:TestAgent[]):void;
  //start/register callback
  start():void;
  end():number;
  report():void;
}
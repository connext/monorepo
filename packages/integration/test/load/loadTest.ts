import { ERC20Abi } from "@connext/nxtp-utils";
import { transformAsserterArgs } from "chai-as-promised";
import { ethers, Wallet, Contract, constants, BigNumber, providers } from "ethers";
import { Config, getConfig } from "../utils/config";
import { setupChainIntegration, startContainers } from "../utils/containerManager";
import { SdkAgent } from "./loadTestSdkAgent";

import { AgentTypes, LoadTestBehavior, LoadTestConfig, TestTargets } from "./loadTestTypes";
import { PingPong } from "./pingPongTest";


class LoadTestEnvironment {
  private config: Config;
  private testConfig: LoadTestConfig;
  private containersUp!: boolean;

  constructor(testParams: LoadTestConfig) {
    this.config = getConfig();
    this.testConfig = testParams;
    if (testParams.spawnContainters) {
      this.spawnRouterStack().then((r) => console.log(`spawning router ${r}`));
    } else {
      //override
      this.containersUp = true;
    }
  }
  fundAgents() {}
  async spawnRouterStack() {
    //docker api stuff in here
    if (this.testConfig.spawnContainters) {
      await startContainers();
      await setupChainIntegration();
    }
    this.containersUp = true;
  }

  getConfig(): Config {
    return this.config;
  }

  getTargets(): TestTargets {
    //should filter on testParams chainId woops
    const chainIds: number[] = [];

    Object.keys(this.config.chainConfig).map((chainId) => chainIds.push(parseInt(chainId)));
    return <TestTargets>{ chainIds: chainIds, chainConfig: this.config.chainConfig };
  }
}

const loadTestParams: LoadTestConfig = { chainIds: [1337, 1338], iterations: 1, spawnContainters: false };

const env = new LoadTestEnvironment(loadTestParams);

const targets = env.getTargets();

const createNRandomSdkAgents = (numberOfAgents: number, targets: TestTargets) => {
  const agents = [];
  for (let i = 0; i < numberOfAgents; i++) {
    agents.push(new SdkAgent(ethers.Wallet.createRandom()._signingKey().privateKey, targets));
  }
  return agents;
};

const fundSdkAgents = async (funderWallet: Wallet, assetId: string, sdkAgents: SdkAgent[]) => {
  for (const chainId of targets.chainIds) {
    //provider shouldn't always be this one.
    const chainProvider = targets.chainConfig.providers[0];
    const jsonProvider = new ethers.providers.JsonRpcProvider(chainProvider);
    const connectedWallet = funderWallet.connect(jsonProvider);

    let fundFn: (arg: any) => Promise<any>;

    if (assetId !== constants.AddressZero) {
      const contract = new Contract(assetId, ERC20Abi, jsonProvider);

      const erc20fundFn = async (arg: any): Promise<any> => {
        const agentBalance = contract.balanceOf(arg.agent.getAddress());
        //if agentBalance < necessaryBalance
      };
      fundFn = erc20fundFn;
    } else {
      const nativeFundFn = async (arg: any): Promise<any> => {
        const amount = "10";
        const val = BigNumber.from(amount);
        const n = connectedWallet.getTransactionCount("pending");
        await connectedWallet.sendTransaction({ to: await arg.agent.getAddress(), value: val, nonce: n, chainId });
      };
      fundFn = nativeFundFn;
    }

    for (const agent of sdkAgents) {
      const arg = { agent: agent };
      const fundRes = await fundFn(arg);
      console.log(fundRes);
    }
  }
};

const runTestWithMultipleAgents = (numberOfAgents: number, targets: TestTargets) => {
  const agents = createNRandomSdkAgents(numberOfAgents, targets);
  //override first agent for now
  const fundedPk = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
  const fundedAgent = new SdkAgent(fundedPk, targets);

  agents[0] = fundedAgent;

  const pusedoPromise = [];

  for (const agent of agents) {
    const tInstance = new PingPong(targets, agent);
    pusedoPromise.push(() => {
      tInstance.start();
    });
  }

  pusedoPromise.forEach((p, idx) => {
    console.log(`Executing PingPong Test ${idx}`);
    p();
  });
};

const fundedPk = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";

const main = async () => {
  const agents = createNRandomSdkAgents(2, targets);

  const newFunder = new ethers.Wallet(fundedPk);

  fundSdkAgents(newFunder, constants.AddressZero, agents);
};

main().then(() => {
  console.log("finished test");
});

// const fundedAgent = new SdkAgent(fundedPk, targets);

// const pingPong = new PingPong(targets, fundedAgent);

// pingPong.start();

// const main = runTestWithMultipleAgents(3, targets);

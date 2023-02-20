import Harbor from '@harbor-xyz/harbor';
import { Testnet } from '@harbor-xyz/harbor/dist/harbor_sdk/types';
import { expect } from "chai";
import { getLastCommit } from 'git-last-commit';
import { providers, Contract } from "ethers";

export default function getTestnetName() {
  return new Promise((resolve, reject) => {
    getLastCommit((err, commit) => {
      if (err) {
        reject(err);
      } else {
        const testnetName = "sha-" + commit.hash.slice(0, 7);
        resolve(testnetName);
      }
    });
  });
}

describe("Harbor Test E2E", function () {

  let harbor: Harbor;
  let testnetName: unknown;
  let testnet: Testnet;

  before(async () => {
    //testnetName = await getTestnetName();
    testnetName = "sha-b0c3e99";

    harbor = new Harbor({
      userKey: "66t1DdSLuFnoAuVccZEkoN",
      projectKey: "xkfSjdSLuFnoAuVccX7j22"
    });
    await harbor.authenticate();
    if (typeof testnetName === "string") {
      testnet = await harbor.testnet(testnetName);
    // testnet = harbor.clone("sha-b0c3e99", "new-testnet");
    // testnet = harbor.apply(configPath, "new-testnet");
    }
  });

  it("Checks if the Testnet exists", async () => {
    console.log("\n\n==========testnet==========");
    console.log(testnet);

    expect(testnet.status).to.equal("RUNNING");
  });

  it("Checks if the Ethereum chain exists", async () => {
    const chain = testnet.ethereum;
    console.log(chain);
    expect(chain.status).to.equal("RUNNING");
    console.log(`${chain.chain} - ${chain.id} - ${chain.status} - ${chain.endpoint}`);
  });

  it("Checks if the Polygon chain exists", async () => {
    const chain = testnet.polygon;
    console.log(chain);
    expect(chain.status).to.equal("RUNNING");
    console.log(`${chain.chain} - ${chain.id} - ${chain.status} - ${chain.endpoint}`);
  });

  it('Checks if the Offchain actors exists', async function () {
    const offChainActors = testnet.offChainActors();
    console.log(`\n\n==========offChainActors(${Object.keys(offChainActors).length})==========`);
    console.log(offChainActors);
    for (const key in offChainActors) {
      const actor = offChainActors[key];
      expect(actor.status).to.equal("RUNNING");
      console.log(`${actor.name} - ${actor.status} - ${actor.ports()} - ${actor.endpoint}`);
    }
  });

  it('Restart router-cache', async function () {
    console.log("Stopping router-cache");
    testnet = await harbor.stop(testnet.name, "routerCache");
    let offChainActors = testnet.offChainActors();
    const actor = offChainActors.routerCache;
    console.log(`${actor.name} - ${actor.status}`);
    expect(actor.status).to.equal("STOPPED");
      
    
    console.log("Starting router-cache");
    testnet = await harbor.start(testnet.name, "routerCache");
    offChainActors = testnet.offChainActors();
    const start_actor = offChainActors.routerCache;
    console.log(`${start_actor.name} - ${start_actor.status} - ${start_actor.ports()} - ${start_actor.endpoint}`);
    expect(start_actor.status).to.equal("RUNNING");
  });

  it("Assert and print sequencer-subscriber log", async function () {
    if (typeof testnetName === "string") {
      testnet = await harbor.testnet(testnetName);
      const offChainActors = testnet.offChainActors();
      let success = false;
      const actor = offChainActors.sequencerSubscriber;
      await actor.logs().then((logs) => {
        logs.forEach((log) => {
          if (log.message.includes("Sequencer config generated.")) {
            console.log(log);
            success = true;
          }
        });
      });
      expect(success).to.equal(true);
    }
  });

  it.only('Quick test on Account Balances and ABIs', async function () {
    const chainOne = testnet.ethereum;
    const wallets = await chainOne.wallets();
    console.log(`\n\n==========wallets(${wallets.length})==========`);
    console.log(wallets);
    const contracts = await chainOne.contracts();
    console.log(`\n\n==========contracts(${Object.keys(contracts).length})==========`);
    // console.log(contracts);
    const connext_contract = contracts.Connext;
    const address = connext_contract.address;
    console.log(address);
    console.log(connext_contract.balances);
    const abis = connext_contract.abi;
    const provider = new providers.JsonRpcProvider(chainOne.endpoint);
    if (abis && abis.length > 0) {
      console.log(`\n\n==========ABIs(${abis.length})==========`);
      const addContract = new Contract(address, abis, provider);
      console.log(addContract);
    }


    
    // accounts.forEach((account) => {
    //   // console.log(account);
    //   if (account.type === "contract" && account.name === "Connext") {
    //     const address = account.address;
    //     const provider = new providers.JsonRpcProvider(chainOne.endpoint);
    //     // console.log(`\n\naddress: (${address})`);
    //     console.log(account.balances);
    //     expect(account.balances[0].symbol).to.equal("ETH");
    //     const abis = account.abi;
    //     if (abis && abis.length > 0) {
    //       console.log(`\n\n==========ABIs(${abis.length})==========`);
    //       const addContract = new Contract(address, abis, provider);
    //       console.log(addContract);
    //     }
    //   }
    // });
  });

  // after(async () => {
  //   harbor.stop(testnetName);
  // });
});


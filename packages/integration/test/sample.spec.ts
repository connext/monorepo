import Harbor from '@harbor-xyz/harbor';
import { Testnet } from '@harbor-xyz/harbor/dist/harbor_sdk/types';
import { expect } from "chai";
import { getLastCommit } from 'git-last-commit';
// import { providers, Contract } from "ethers";

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
    testnetName = await getTestnetName();
    // testnetName = "sha-b0c3e99";

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

  it("Checks if the Chains exists", async () => {
    const chains = testnet.chains();
    console.log(`\n\n==========chains(${chains.length})==========`);

    chains.forEach((chain) => {
      console.log(chain);
      expect(chain.status).to.equal("RUNNING");
      console.log(`${chain.chain} - ${chain.id} - ${chain.status} - ${chain.endpoint}`);
    });
  });

  it('Checks if the Offchain actors exists', async function () {
    const offChainActors = testnet.offChainActors();
    console.log(`\n\n==========offChainActors(${offChainActors.length})==========`);
    console.log(offChainActors);
    offChainActors.forEach((actor) => {
      expect(actor.status).to.equal("RUNNING");
      console.log(`${actor.name} - ${actor.status} - ${actor.ports()} - ${actor.endpoint}`);
    });
  });

  it('Restart router-cache', async function () {
    console.log("Stopping router-cache");
    testnet = await harbor.stop(testnet.name, "routerCache");
    let offChainActors = testnet.offChainActors();
    for (const actor of offChainActors) {
      if (actor.name === "routerCache") {
        console.log(`${actor.name} - ${actor.status}`);
        expect(actor.status).to.equal("STOPPED");
      }
    }
    console.log("Starting router-cache");
    testnet = await harbor.start(testnet.name, "routerCache");
    offChainActors = testnet.offChainActors();
    for (const actor of offChainActors) {
      if (actor.name === "routerCache") {
        console.log(`${actor.name} - ${actor.status} - ${actor.ports()} - ${actor.endpoint}`);
        expect(actor.status).to.equal("RUNNING");
      }
    }
  });

  it("Assert and print sequencer-subscriber log", async function () {
    if (typeof testnetName === "string") {
      testnet = await harbor.testnet(testnetName);
      const offChainActors = testnet.offChainActors();
      let success = false;
      for (const actor of offChainActors) {
        if (actor.name === "sequencerSubscriber") {
          await actor.logs().then((logs) => {
            logs.forEach((log) => {
              if (log.message.includes("Sequencer config generated.")) {
                console.log(log);
                success = true;
              }
            });
          });
        }
      }
      expect(success).to.equal(true);
    }
  });

  // after(async () => {
  //   harbor.stop(testnetName);
  // });
});


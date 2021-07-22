import { ChainConfig, TransactionService } from "@connext/nxtp-txservice";
import { expect, jsonifyError } from "@connext/nxtp-utils";
import { Wallet, utils, BigNumber, providers } from "ethers";
import pino from "pino";

const logger = pino({ name: "IntegrationTest", level: process.env.LOG_LEVEL ?? "debug" });

const MIN_ETH = utils.parseEther("0.5");
const ETH_GIFT = utils.parseEther("1");
const MIN_AMOUNT = utils.parseUnits("1", "wei");
const PEASANT_FUNDING = utils.parseUnits("10000", "wei");
// Maximum iterations we will do for load test.
const MAX_CONCURRENCY = 100;
// Sugar daddy's PK:
const SUGAR_DADDY_PK = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
const CHAINS: { [chainId: string]: ChainConfig } = {
  "1337": {
    providers: [
      {
        url: "http://localhost:8545",
      },
    ],
  },
  "1338": {
    providers: [
      {
        url: "http://localhost:8546",
      },
    ],
  },
};

// Load test objectives:
// This a test of txservice's bandwith using the local chain setup with ganache.
// - Send from 1 agent to 1 agent as many times as possible.
// - Send from 1 agent to many random agents as many times as possible.
// - Send from many random agents to many random agents as many times as possible.

class Agent {
  public readonly address: string;
  private balance: BigNumber;
  private readonly wallet: Wallet;
  private 

  constructor(
    private readonly txService: TransactionService,
    public readonly chainId: number,
    privateKey?: string,
  ) {
    this.wallet = privateKey ? new Wallet(privateKey) : Wallet.createRandom();
    this.address = this.wallet.address;
    this.balance = BigNumber.from(0);
  }

  async assertBalanceIsCorrect() {
    const actualBalance = await this.txService.getBalance(this.chainId, this.address);
    if (!this.balance.eq(actualBalance)) {
      throw new Error(
        `Balance for ${this.address} should be: ${actualBalance}, but was: ${this.balance}.`
      );
    }
  }

  async didReceive(amount: BigNumber) {
    this.balance = this.balance.add(amount);
  }

  async didPay(amount: BigNumber) {
    this.balance = this.balance.sub(amount);
  }
}

class AgentManager {
  private sugarDaddy: Agent;
  private readonly peasants: Agent[];

  constructor(
    private readonly logger: pino.Logger,
    private readonly txService: TransactionService,
    private readonly chainId: number,
  ) {
    this.sugarDaddy = new Agent(this.txService, 1337, SUGAR_DADDY_PK);

    this.peasants = Array(1000)
      .fill(0)
      .map(() => new Agent(this.txService, 1337));
  }

  
  // Peasants exchange randomly in micro amounts.

  async setup() {
    // Make sure sugar daddy is funded. Fund if necessary.
    let balance = await this.sugarDaddy.getBalance();
    if (balance.lt(MIN_ETH)) {
      logger.info({ chainId: 1337 }, "Sending ETH_GIFT to router agent.");
      const receipt = await this.txService.sendTx(1337, {
        chainId: 1337,
        to: this.sugarDaddy.address,
        value: ETH_GIFT,
        data: "0x",
      });
      logger.info({ transactionHash: receipt.transactionHash, chainId: 1337 }, "ETH_GIFT to router agent mined.");
    }

    balance = await this.sugarDaddy.getBalance();
    if (balance.lt(MIN_ETH)) {
      throw new Error(
        `Router agent could not be properly funded. Has: ${balance.toString()}. Needs: ${MIN_ETH.toString()}`,
      );
    }
  }

  /// Have king feed the peasants a small starting amount.
  async distributeTheWealth() {
    this.transaction();
  }

  private async transaction(value: BigNumber, to: Agent, from: Agent) {
    const receipt = await this.txService.sendTx(1337, {
      chainId: this.chainId,
      to: to.address,
      from: from.address,
      value,
      data: "0x",
    });
    if (!receipt) {
      throw Error("No receipt.");
    }

  }

  async oneToOneTest() {
    await this.setup();

    // Expected amount starts at 0.
    let expectedAmount = BigNumber.from(0);
    // This will determine how many tx's we fire off at once.
    let concurrency = 1;
    try {
      while (concurrency < MAX_CONCURRENCY) {
        logger.debug(`Firing ${concurrency} concurrent.`);

        const results = await Promise.all(Array);
        logger.debug({ results }, `i = ${concurrency}`);
        // Add to the expected amount.
        expectedAmount = expectedAmount.add(AMOUNT_PER_TX.mul(BigNumber.from(concurrency)));
        // Add to the iteration / number of tx's we should fire off for next round.
        concurrency++;
        // Assert ending balance is correct.
        await this.roger.assertBalanceEquals(expectedAmount);
      }
    } catch (e) {
      logger.info({ error: jsonifyError(e) }, `sendTx failed at iteration ${iteration} due to error.`);
    }
    const finalBalance = await this.roger.getBalance();
    logger.info({ finalBalance: finalBalance.toString(), iteration }, "Load test finished.");
  }
}

// TODO: Goal is to create a load test for txservice that sends a bunch of tokens to random wallets.
describe.only("Load: TransactionService", () => {
  before(async () => {});

  it("sendTx should send tokens to named address", async () => {
    const targetWallet = Wallet.createRandom();

    const createExecuteTx = () =>
      new Promise<providers.TransactionReceipt>(async (resolve, reject) => {
        const receipt = await txService.sendTx(1337, {
          chainId: 1337,
          to: targetWallet.address,
          from: sugarDaddy.address,
          value: AMOUNT_PER_TX,
          data: "0x",
        });
        if (!receipt) {
          reject(receipt);
        }
        resolve(receipt);
      });

    // Expecting max load to be above at least this amount.
    expect(iteration).to.be.greaterThanOrEqual(8000);
  });
});

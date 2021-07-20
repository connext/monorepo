import { ChainConfig, MinimalTransaction, TransactionService } from "@connext/nxtp-txservice";
import { Wallet, utils } from "ethers";
import pino from "pino";

const logger = pino({ name: "IntegrationTest", level: process.env.LOG_LEVEL ?? "silent" });

const fundedPk = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
const sugarDaddy = new Wallet(fundedPk);
const chains: { [chainId: string]: ChainConfig } = {
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


const txService = new TransactionService(
  logger,
  sugarDaddy,
 { chains },
);

// TODO: Goal is to create a load test for txservice that sends a bunch of tokens to random wallets.
describe("Load: TransactionService", () => {
  before(async () => {

  });

  it("sendTx should send tokens to named address", async () => {
    const targetWallet = Wallet.createRandom();
    txService.getBalance(1337, sugarDaddy.address);
    txService.getBalance(1337, targetWallet.address);

    txService.sendTx(1337,
      {
        chainId: 1337,
        to: targetWallet.address,
        from: sugarDaddy.address,
        value: utils.parseEther("0.01"),
        data: 
      } as MinimalTransaction
    );
  });
});

import { NxtpSdk, NxtpSdkEvents } from "@connext/nxtp-sdk";
import { constants, Contract, providers, utils, Wallet } from "ethers";
import pino from "pino";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager } from "@connext/nxtp-contracts/typechain";
import { expect } from "@connext/nxtp-utils";

const TestTokenABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function allowance(address _owner, address _spender) public view returns (uint256 remaining)",

  // Authenticated Functions
  "function approve(address _spender, uint256 _value) public returns (bool success)",
  "function transfer(address to, uint amount) returns (boolean)",
  "function mint(address account, uint256 amount)",
];

const tokenAddressAlice = "0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da";
const tokenAddressBob = tokenAddressAlice;
const txManagerAddressAlice = "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0";
const txManagerAddressBob = txManagerAddressAlice;

const CHAIN_ALICE = 4;
const CHAIN_BOB = 5;

const chainProviders = {
  [CHAIN_ALICE]: {
    provider: new providers.FallbackProvider([new providers.JsonRpcProvider("https://rinkeby.infura.io/v3/93ef29ccde6449debec459493c9d07a3")]),
    transactionManagerAddress: txManagerAddressAlice,
    // subgraph: "http://localhost:8000/subgraphs/name/connext/nxtp",
    subgraph: "https://api.thegraph.com/subgraphs/name/connext/nxtp-rinkeby-staging",
  },
  [CHAIN_BOB]: {
    provider: new providers.FallbackProvider([new providers.JsonRpcProvider("https://goerli.infura.io/v3/55b1cf0f39d04e4c9084f1b9bea7e41f")]),
    transactionManagerAddress: txManagerAddressBob,
    // subgraph: "http://localhost:8000/subgraphs/name/connext/nxtp",
    subgraph: "https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli-staging",
  },
};
const fundedPk = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
const router = "0xDc150c5Db2cD1d1d8e505F824aBd90aEF887caC6";

const sugarDaddy = new Wallet(fundedPk);
const MIN_ETH = utils.parseEther("0.5");
const ETH_GIFT = utils.parseEther("1");
const tokenAlice = new Contract(tokenAddressAlice, TestTokenABI, sugarDaddy.connect(chainProviders[CHAIN_ALICE].provider));
const tokenBob = new Contract(tokenAddressBob, TestTokenABI, sugarDaddy.connect(chainProviders[CHAIN_BOB].provider));
const MIN_TOKEN = utils.parseEther("5");
const TOKEN_GIFT = utils.parseEther("10");
const txManagerAlice = new Contract(
  txManagerAddressAlice,
  TransactionManagerArtifact.abi,
  sugarDaddy.connect(chainProviders[CHAIN_ALICE].provider),
) as TransactionManager;
const txManagerBob = new Contract(
  txManagerAddressBob,
  TransactionManagerArtifact.abi,
  sugarDaddy.connect(chainProviders[CHAIN_BOB].provider),
) as TransactionManager;

const logger = pino({ name: "IntegrationTest", level: process.env.LOG_LEVEL ?? "debug" });

describe("Integration", () => {
  let userSdk: NxtpSdk;
  let userWallet: Wallet;

  before(async () => {
    const balanceAlice = await chainProviders[CHAIN_ALICE].provider.getBalance(router);
    const balanceBob = await chainProviders[CHAIN_BOB].provider.getBalance(router);

    // fund if necessary
    if (balanceAlice.lt(MIN_ETH)) {
      logger.info({ chainId: CHAIN_ALICE }, "Sending ETH_GIFT to router");
      const tx = await sugarDaddy
        .connect(chainProviders[CHAIN_ALICE].provider)
        .sendTransaction({ to: router, value: ETH_GIFT });
      const receipt = await tx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: CHAIN_ALICE }, "ETH_GIFT to router mined");
    }

    if (balanceBob.lt(MIN_ETH)) {
      logger.info({ chainId: CHAIN_ALICE }, "Sending ETH_GIFT to router");
      const tx = await sugarDaddy
        .connect(chainProviders[CHAIN_ALICE].provider)
        .sendTransaction({ to: router, value: ETH_GIFT });
      const receipt = await tx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: CHAIN_ALICE }, "ETH_GIFT to router mined: ");
    }

    const isRouterAlice = await txManagerAlice.approvedRouters(router);
    const isRouterBob = await txManagerBob.approvedRouters(router);

    if (!isRouterAlice) {
      logger.info({ chainId: CHAIN_ALICE }, "Adding router");
      const tx = await txManagerAlice.addRouter(router);
      const receipt = await tx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: CHAIN_ALICE }, "Router added");
    }

    if (!isRouterBob) {
      logger.info({ chainId: CHAIN_BOB }, "Adding router");
      const tx = await txManagerBob.addRouter(router);
      const receipt = await tx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: CHAIN_BOB }, "Router added");
    }

    const isAssetAlice = await txManagerAlice.approvedAssets(tokenAddressAlice);
    const isAssetBob = await txManagerBob.approvedAssets(tokenAddressBob);

    if (!isAssetAlice) {
      logger.info({ chainId: CHAIN_ALICE }, "Adding Asset");
      const tx = await txManagerAlice.addAssetId(tokenAddressAlice);
      const receipt = await tx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: CHAIN_ALICE }, "Asset added");
    }

    if (!isAssetBob) {
      logger.info({ chainId: CHAIN_BOB }, "Adding Asset");
      const tx = await txManagerBob.addAssetId(tokenAddressBob);
      const receipt = await tx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: CHAIN_BOB }, "Asset added");
    }

    const liquidityAlice = await txManagerAlice.routerBalances(router, tokenAddressAlice);
    const liquidityBob = await txManagerBob.routerBalances(router, tokenAddressBob);

    // fund if necessary
    if (liquidityAlice.lt(MIN_TOKEN)) {
      logger.info({ chainId: CHAIN_ALICE }, "Adding liquidity");
      const approvetx = await tokenAlice.approve(txManagerAlice.address, constants.MaxUint256);
      const approveReceipt = await approvetx.wait();
      logger.info({ transactionHash: approveReceipt.transactionHash, chainId: CHAIN_ALICE }, "addLiquidity approved");
      const tx = await txManagerAlice.addLiquidity(TOKEN_GIFT, tokenAddressAlice, router);
      const receipt = await tx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: CHAIN_ALICE }, "addLiquidity mined");
    }

    if (liquidityBob.lt(MIN_TOKEN)) {
      logger.info({ chainId: CHAIN_BOB }, "Adding liquidity");
      const approvetx = await tokenBob.approve(txManagerBob.address, constants.MaxUint256);
      const approveReceipt = await approvetx.wait();
      logger.info({ transactionHash: approveReceipt.transactionHash, chainId: CHAIN_BOB }, "addLiquidity approved");
      const tx = await txManagerBob.addLiquidity(TOKEN_GIFT, tokenAddressBob, router);
      const receipt = await tx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: CHAIN_BOB }, "addLiquidity mined");
    }
  });

  beforeEach(async () => {
    userWallet = Wallet.createRandom();

    // fund user sender side
    const balanceAlice = await chainProviders[CHAIN_ALICE].provider.getBalance(userWallet.address);
    if (balanceAlice.lt(MIN_ETH)) {
      logger.info({ chainId: CHAIN_ALICE }, "Sending ETH_GIFT to user");
      const tx = await sugarDaddy
        .connect(chainProviders[CHAIN_ALICE].provider)
        .sendTransaction({ to: userWallet.address, value: ETH_GIFT });
      const receipt = await tx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: CHAIN_ALICE }, "ETH_GIFT to user mined: ");
    }

    const balanceTokenAlice = await tokenAlice.balanceOf(userWallet.address);
    if (balanceTokenAlice.lt(MIN_TOKEN)) {
      logger.info({ chainId: CHAIN_ALICE }, "Sending TOKEN_GIFT to user");
      const tx = await tokenAlice.mint(userWallet.address, TOKEN_GIFT);
      const receipt = await tx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: CHAIN_ALICE }, "TOKEN_GIFT to user mined: ");
    }

    userSdk = new NxtpSdk(
      chainProviders,
      userWallet,
      pino({ name: "IntegrationTest" }),
      undefined,
      "nats://localhost:4222",
      "http://localhost:5040",
    );
  });

  it("should send tokens", async function () {
    this.timeout(120_000);
    const quote = await userSdk.getTransferQuote({
      amount: utils.parseEther("1").toString(),
      receivingAssetId: tokenAddressBob,
      sendingAssetId: tokenAddressAlice,
      receivingAddress: userWallet.address,
      expiry: Math.floor(Date.now() / 1000) + 3600 * 24 * 3,
      sendingChainId: CHAIN_ALICE,
      receivingChainId: CHAIN_BOB,
    });

    const res = await userSdk.startTransfer(quote);
    expect(res.prepareResponse.hash).to.be.ok;

    const event = await userSdk.waitFor(
      NxtpSdkEvents.ReceiverTransactionPrepared,
      100_000,
      (data) => data.txData.transactionId === res.transactionId,
    );

    const fulfillEventPromise = userSdk.waitFor(
      NxtpSdkEvents.ReceiverTransactionFulfilled,
      100_000,
      (data) => data.txData.transactionId === res.transactionId,
    );

    // TODO: txservice doesnt seem to be returning properly, need to revisit this
    const finishRes = await userSdk.finishTransfer(event);
    console.log("finishRes: ", finishRes);
    expect(finishRes.metaTxResponse).to.be.ok;
    const fulfillEvent = await fulfillEventPromise;
    expect(fulfillEvent).to.be.ok;
  });
});

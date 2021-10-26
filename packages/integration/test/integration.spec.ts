import { NxtpSdk, NxtpSdkEvents } from "@connext/nxtp-sdk";
import { constants, Contract, providers, utils, Wallet, BigNumber } from "ethers";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager } from "@connext/nxtp-contracts/typechain";
import { AuctionResponse, jsonifyError, expect, Logger, createLoggingContext } from "@connext/nxtp-utils";

const { AddressZero } = constants;

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

const erc20Address = "0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da";

const txManagerAddressSending = "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0";
const txManagerAddressReceiving = txManagerAddressSending;

const SENDING_CHAIN = 1337;
const RECEIVING_CHAIN = 1338;

const chainProviders = {
  [SENDING_CHAIN]: {
    provider: new providers.FallbackProvider([
      new providers.StaticJsonRpcProvider("http://localhost:8545", SENDING_CHAIN),
    ]),
    transactionManagerAddress: txManagerAddressSending,
    subgraph: "http://localhost:8010/subgraphs/name/connext/nxtp",
  },
  [RECEIVING_CHAIN]: {
    provider: new providers.FallbackProvider([
      new providers.StaticJsonRpcProvider("http://localhost:8546", RECEIVING_CHAIN),
    ]),
    transactionManagerAddress: txManagerAddressReceiving,
    subgraph: "http://localhost:9010/subgraphs/name/connext/nxtp",
  },
};

const fundedPk = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
const router = "0xDc150c5Db2cD1d1d8e505F824aBd90aEF887caC6";

const sugarDaddy = new Wallet(fundedPk);
const MIN_ETH = utils.parseEther("0.5");
const ETH_GIFT = utils.parseEther("1");

const MIN_TOKEN = utils.parseEther("5");
const TOKEN_GIFT = utils.parseEther("10");

const txManagerSending = new Contract(
  txManagerAddressSending,
  TransactionManagerArtifact.abi,
  sugarDaddy.connect(chainProviders[SENDING_CHAIN].provider),
) as TransactionManager;
const txManagerReceiving = new Contract(
  txManagerAddressReceiving,
  TransactionManagerArtifact.abi,
  sugarDaddy.connect(chainProviders[RECEIVING_CHAIN].provider),
) as TransactionManager;

const logger = new Logger({ name: "IntegrationTest", level: process.env.LOG_LEVEL ?? "info" });

describe("Integration", () => {
  let userSdk: NxtpSdk;
  let userWallet: Wallet;

  const tokenSending = new Contract(
    erc20Address,
    TestTokenABI,
    sugarDaddy.connect(chainProviders[SENDING_CHAIN].provider),
  );

  const tokenReceiving = new Contract(
    erc20Address,
    TestTokenABI,
    sugarDaddy.connect(chainProviders[RECEIVING_CHAIN].provider),
  );

  const setupTest = async (sendingTokenAddress: string, receivingTokenAddress: string): Promise<void> => {
    const { requestContext, methodContext } = createLoggingContext("setup test", undefined, undefined);
    const tokenAddressSending = sendingTokenAddress;
    const tokenAddressReceiving = receivingTokenAddress;

    const balanceSending = await chainProviders[SENDING_CHAIN].provider.getBalance(router);
    const balanceReceiving = await chainProviders[RECEIVING_CHAIN].provider.getBalance(router);

    // fund if necessary
    if (balanceSending.lt(MIN_ETH)) {
      logger.info("Sending ETH_GIFT to router", requestContext, methodContext, { chainId: SENDING_CHAIN });
      const tx = await sugarDaddy
        .connect(chainProviders[SENDING_CHAIN].provider)
        .sendTransaction({ to: router, value: ETH_GIFT });
      const receipt = await tx.wait(2);
      logger.info("ETH_GIFT to router mined", requestContext, methodContext, {
        transactionHash: receipt.transactionHash,
        chainId: SENDING_CHAIN,
      });
    }

    if (balanceReceiving.lt(MIN_ETH)) {
      logger.info("Sending ETH_GIFT to router", requestContext, methodContext, { chainId: RECEIVING_CHAIN });
      const tx = await sugarDaddy
        .connect(chainProviders[RECEIVING_CHAIN].provider)
        .sendTransaction({ to: router, value: ETH_GIFT });
      const receipt = await tx.wait(2);
      logger.info("ETH_GIFT to router mined: ", requestContext, methodContext, {
        transactionHash: receipt.transactionHash,
        chainId: RECEIVING_CHAIN,
      });
    }

    const isRouterSending = await txManagerSending.approvedRouters(router);
    const isRouterReceiving = await txManagerReceiving.approvedRouters(router);

    if (!isRouterSending) {
      logger.info("Adding router", requestContext, methodContext, { chainId: SENDING_CHAIN });
      const tx = await txManagerSending.addRouter(router);
      const receipt = await tx.wait(2);
      logger.info("Router added", requestContext, methodContext, {
        transactionHash: receipt.transactionHash,
        chainId: SENDING_CHAIN,
      });
    }

    if (!isRouterReceiving) {
      logger.info("Adding router", requestContext, methodContext, { chainId: RECEIVING_CHAIN });
      const tx = await txManagerReceiving.addRouter(router);
      const receipt = await tx.wait(2);
      logger.info("Router added", requestContext, methodContext, {
        transactionHash: receipt.transactionHash,
        chainId: RECEIVING_CHAIN,
      });
    }

    const isAssetSending = await txManagerSending.approvedAssets(tokenAddressSending);
    const isAssetReceiving = await txManagerReceiving.approvedAssets(tokenAddressReceiving);

    if (!isAssetSending) {
      logger.info("Adding Asset", requestContext, methodContext, { chainId: SENDING_CHAIN });
      const tx = await txManagerSending.addAssetId(tokenAddressSending);
      const receipt = await tx.wait(2);
      logger.info("Asset added", requestContext, methodContext, {
        transactionHash: receipt.transactionHash,
        chainId: SENDING_CHAIN,
      });
    }

    if (!isAssetReceiving) {
      logger.info("Adding Asset", requestContext, methodContext, { chainId: RECEIVING_CHAIN });
      const tx = await txManagerReceiving.addAssetId(tokenAddressReceiving);
      const receipt = await tx.wait(2);
      logger.info("Asset added", requestContext, methodContext, {
        transactionHash: receipt.transactionHash,
        chainId: RECEIVING_CHAIN,
      });
    }

    const liquiditySending = await txManagerSending.routerBalances(router, tokenAddressSending);
    console.log(`liquidity at Sender side for assetId ${tokenAddressSending}: `, liquiditySending.toString());
    const liquidityReceiving = await txManagerReceiving.routerBalances(router, tokenAddressReceiving);
    console.log(`liquidity at Receiver side for assetId ${tokenAddressReceiving}: `, liquidityReceiving.toString());

    // fund if necessary
    logger.info("Liquidity available", requestContext, methodContext, {
      liquidity: liquiditySending.toString(),
      asset: tokenAddressSending,
      chain: SENDING_CHAIN,
      router,
      transactionManager: txManagerSending.address,
    });
    if (liquiditySending.lt(MIN_TOKEN)) {
      logger.info("Adding liquidity", requestContext, methodContext, { chainId: SENDING_CHAIN });
      if (tokenAddressSending !== AddressZero) {
        const approvetx = await tokenSending.approve(txManagerSending.address, constants.MaxUint256);
        const approveReceipt = await approvetx.wait(2);
        logger.info("addLiquidity approved", requestContext, methodContext, {
          transactionHash: approveReceipt.transactionHash,
          chainId: SENDING_CHAIN,
        });
      }
      const tx = await txManagerSending.addLiquidityFor(
        TOKEN_GIFT,
        tokenAddressSending,
        router,
        tokenAddressSending === AddressZero ? { value: BigNumber.from(TOKEN_GIFT) } : {},
      );
      const receipt = await tx.wait(2);

      logger.info("addLiquidity mined", requestContext, methodContext, {
        transactionHash: receipt.transactionHash,
        chainId: SENDING_CHAIN,
      });
    }

    logger.info("Liquidity available", requestContext, methodContext, {
      liquidity: liquidityReceiving.toString(),
      asset: tokenAddressReceiving,
      chain: RECEIVING_CHAIN,
      router,
      transactionManager: txManagerReceiving.address,
    });
    if (liquidityReceiving.lt(MIN_TOKEN)) {
      logger.info("Adding liquidity", requestContext, methodContext, { chainId: RECEIVING_CHAIN });
      if (tokenAddressSending !== AddressZero) {
        const approvetx = await tokenReceiving.approve(txManagerReceiving.address, constants.MaxUint256);
        const approveReceipt = await approvetx.wait(2);
        logger.info("addLiquidity approved", requestContext, methodContext, {
          transactionHash: approveReceipt.transactionHash,
          chainId: RECEIVING_CHAIN,
        });
      }
      const tx = await txManagerReceiving.addLiquidityFor(
        TOKEN_GIFT,
        tokenAddressReceiving,
        router,
        tokenAddressReceiving === AddressZero ? { value: BigNumber.from(TOKEN_GIFT) } : {},
      );
      const receipt = await tx.wait(2);

      logger.info("addLiquidity mined", requestContext, methodContext, {
        transactionHash: receipt.transactionHash,
        chainId: RECEIVING_CHAIN,
      });
    }
  };

  const test = async (sendingAssetId: string, receivingAssetId: string) => {
    const { requestContext, methodContext } = createLoggingContext("running test", undefined, undefined);
    let quote: AuctionResponse;
    try {
      quote = await userSdk.getTransferQuote({
        amount: utils.parseEther("1").toString(),
        receivingAssetId,
        sendingAssetId,
        receivingAddress: userWallet.address,
        expiry: Math.floor(Date.now() / 1000) + 3600 * 24 * 3,
        sendingChainId: SENDING_CHAIN,
        receivingChainId: RECEIVING_CHAIN,
      });
    } catch (err) {
      logger.error("Error getting transfer quote", requestContext, methodContext, { err: jsonifyError(err) });
      throw err;
    }

    expect(quote.bid).to.be.ok;
    expect(quote.bidSignature).to.be.ok;
    const res = await userSdk.prepareTransfer(quote!);
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

    const finishRes = await userSdk.fulfillTransfer(event, utils.parseEther("0.00001").toString());
    console.info("fullfill Transfer at receiver side", finishRes);

    expect(finishRes.metaTxResponse).to.be.ok;
    const fulfillEvent = await fulfillEventPromise;
    console.info("fullfill Event", fulfillEvent);
    expect(fulfillEvent).to.be.ok;
  };

  beforeEach(async () => {
    const { requestContext, methodContext } = createLoggingContext("before each", undefined, undefined);
    userWallet = Wallet.createRandom();

    // fund user sender side
    const balanceSending = await chainProviders[SENDING_CHAIN].provider.getBalance(userWallet.address);
    if (balanceSending.lt(TOKEN_GIFT)) {
      logger.info("Sending ETH_GIFT to user", requestContext, methodContext, { chainId: SENDING_CHAIN });
      const tx = await sugarDaddy
        .connect(chainProviders[SENDING_CHAIN].provider)
        .sendTransaction({ to: userWallet.address, value: TOKEN_GIFT });
      const receipt = await tx.wait(2);
      logger.info("ETH_GIFT to user mined: ", requestContext, methodContext, {
        transactionHash: receipt.transactionHash,
        chainId: SENDING_CHAIN,
      });
    }

    const balanceTokenSending = await tokenSending.balanceOf(userWallet.address);
    if (balanceTokenSending.lt(MIN_TOKEN)) {
      logger.info("Sending TOKEN_GIFT to user", requestContext, methodContext, { chainId: SENDING_CHAIN });
      const tx = await tokenSending.mint(userWallet.address, TOKEN_GIFT);
      const receipt = await tx.wait(2);
      logger.info("TOKEN_GIFT to user mined: ", requestContext, methodContext, {
        transactionHash: receipt.transactionHash,
        chainId: SENDING_CHAIN,
      });
    }

    userSdk = new NxtpSdk({
      chainConfig: chainProviders,
      signer: userWallet.connect(chainProviders[SENDING_CHAIN].provider),
      logger: logger,
      network: "local",
    });
  });

  it("should send ERC20 tokens", async function () {
    this.timeout(120_000);

    const sendingAssetId = erc20Address;
    const receivingAssetId = erc20Address;

    await setupTest(sendingAssetId, receivingAssetId);

    await test(sendingAssetId, receivingAssetId);
  });

  it.only("should send Native tokens", async function () {
    this.timeout(120_000);

    const sendingAssetId = AddressZero;
    const receivingAssetId = AddressZero;

    await setupTest(sendingAssetId, receivingAssetId);

    const liquiditySending = await txManagerSending.routerBalances(router, sendingAssetId);
    console.log(`liquidity at Sender side for assetId ${sendingAssetId}: `, liquiditySending.toString());
    const liquidityReceiving = await txManagerReceiving.routerBalances(router, receivingAssetId);
    console.log(`liquidity at Receiver side for assetId ${receivingAssetId}: `, liquidityReceiving.toString());

    await test(sendingAssetId, receivingAssetId);
  });
});

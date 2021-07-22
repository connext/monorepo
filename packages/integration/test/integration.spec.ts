import exp from "constants";

import { NxtpSdk, NxtpSdkEvents } from "@connext/nxtp-sdk";
import { BigNumber, constants, Contract, providers, utils, Wallet } from "ethers";
import pino from "pino";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager } from "@connext/nxtp-contracts/typechain";
import { expect } from "@connext/nxtp-utils";

import { ownerPk, routerPk } from "./txManagerOwner";
import { IntegrationAccountManager } from "./accountManager";

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
const goerliTokenAddress = "0x8a1Cad3703E0beAe0e0237369B4fcD04228d1682";
const rinkebyTokenAddress = "0x9aC2c46d7AcC21c881154D57c0Dc1c55a3139198";

const txManagerRinkeby = "0xe71678794fff8846bFF855f716b0Ce9d9a78E844";
const txManagerGoerli = "0xe71678794fff8846bFF855f716b0Ce9d9a78E844";


const chainProviders = {
  4: new providers.FallbackProvider([new providers.JsonRpcProvider("https://rinkeby.infura.io/v3/06a5f5f50dcb49da9b57f0647fde2082")]),
  5: new providers.FallbackProvider([new providers.JsonRpcProvider("https://goerli.infura.io/v3/06a5f5f50dcb49da9b57f0647fde2082")]),
};
const router = "0xf0722640639Ec7Dc923E3d776c2BE78cD05312F9";

const sugarDaddy = new Wallet(ownerPk);
const MIN_ETH = utils.parseEther("0.5");
const ETH_GIFT = utils.parseEther(".5");
const token4 = new Contract(rinkebyTokenAddress, TestTokenABI, sugarDaddy.connect(chainProviders[4]));
const token5 = new Contract(goerliTokenAddress, TestTokenABI, sugarDaddy.connect(chainProviders[5]));
const MIN_TOKEN = utils.parseEther("5");
const TOKEN_GIFT = utils.parseEther("10");
const txManager4 = new Contract(
  txManagerRinkeby,
  TransactionManagerArtifact.abi,
  sugarDaddy.connect(chainProviders[4]),
) as TransactionManager;

const txManager5 = new Contract(
  txManagerGoerli,
  TransactionManagerArtifact.abi,
  sugarDaddy.connect(chainProviders[5]),
) as TransactionManager;

const logger = pino({ name: "IntegrationTest", level: process.env.LOG_LEVEL ?? "silent" });

describe("Integration", () => {
  //globally accessable test vars
  let userSdk: NxtpSdk;
  let userWallet: Wallet;
  let balance4;
  let balance5;

  before(`Should setup accounts`, async()=>{
    balance4 = await chainProviders[4].getBalance(router);
    balance5 = await chainProviders[5].getBalance(router);
    console.log(balance4?.toString());

    expect(balance4).to.not.eq(undefined);
    expect(balance5).to.not.eq(undefined);
  });

  it("Should determine if the router has been the router permissions on the contract (via addRouter())", async () => {

    let isRouter4 = await txManager4.approvedRouters(router);
    let isRouter5 = await txManager5.approvedRouters(router);

    if(!isRouter4){
      logger.info({ chainId: 4 }, "Adding router");
      const addRouterTx = await txManager4.addRouter(router);

      const receipt = await addRouterTx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: 4 }, "Router added Rinkeby TX");
      //double check the router is really added
      isRouter4 = await txManager4.approvedRouters(router);
    }

    if(!isRouter5){
      const addRouterTx = await txManager5.addRouter(router);

      const receipt = await addRouterTx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: 5 }, "Router added Goerli TX");
      //double check the router is really added
      isRouter5 = await txManager5.approvedRouters(router);

    }

    expect(isRouter5).to.eq(true);
    expect(isRouter4).to.eq(true);
  });

  it("Should make sure the assets are approved, if not approve them", async()=>{
    let testToken4Approved = await txManager4.approvedAssets(rinkebyTokenAddress);
    let testToken5Approved = await txManager5.approvedAssets(goerliTokenAddress);

    if(!testToken4Approved){
      logger.info({ chainId: 4 }, "Approving asset on rinkeby");

      const addAssetTx = await txManager4.addAssetId(rinkebyTokenAddress);
      const receipt = await addAssetTx.wait();

      logger.info({ transactionHash: receipt.transactionHash, chainId: 4 }, "Test asset added Rinkeby TX");
      testToken4Approved = await txManager4.approvedAssets(rinkebyTokenAddress);
    }

    if(!testToken5Approved){
      logger.info({ chainId: 5 }, "Approving asset on goerli");

      const addAssetTx = await txManager5.addAssetId(goerliTokenAddress);
      const receipt = await addAssetTx.wait();

      logger.info({ transactionHash: receipt.transactionHash, chainId: 5 }, "Test asset added Goerli TX");
      testToken5Approved = await txManager5.approvedAssets(goerliTokenAddress);
    }

    expect(testToken4Approved).to.eq(true);
    expect(testToken5Approved).to.eq(true);
  });

    //   // fund if necessary with ETH
    //   if (balance1337.lt(MIN_ETH)) {
    //     logger.info({ chainId: 1337 }, "Sending ETH_GIFT to router");
    //     const tx = await sugarDaddy.connect(chainProviders[4]).sendTransaction({ to: router, value: ETH_GIFT });
    //     const receipt = await tx.wait();
    //     logger.info({ transactionHash: receipt.transactionHash, chainId: 4 }, "ETH_GIFT to router mined");
    //   }
    //
    //   if (balance1338.lt(MIN_ETH)) {
    //     logger.info({ chainId: 1338 }, "Sending ETH_GIFT to router");
    //     const tx = await sugarDaddy.connect(chainProviders[5]).sendTransaction({ to: router, value: ETH_GIFT });
    //     const receipt = await tx.wait();
    //     logger.info({ transactionHash: receipt.transactionHash, chainId: 5 }, "ETH_GIFT to router mined: ");

  it("Router Should have TEST AND liquidity in the txManager on both Rinkeby and Goerli, if not make it so", async()=>{
    let rBalToken4:BigNumber = await token4.balanceOf(router);
    let rBalToken5:BigNumber = await token5.balanceOf(router);

    if(rBalToken4.lt(MIN_TOKEN)){
      logger.info({ chainId: 4}, "Minting TEST for router on Rinkeby");

      const mint = await token4.mint(router, MIN_TOKEN.mul(10));
      const receipt = await mint.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: 4 }, "Test asset added Rinkeby TX");

      rBalToken4 = await token4.balanceOf(router);
    }

    if(rBalToken5.lt(MIN_TOKEN)){
      logger.info({ chainId: 5}, "Minting TEST for router on Goerli");

      const mint = await token5.mint(router, MIN_TOKEN.mul(10));
      const receipt = await mint.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: 5 }, "Test asset added Goerli TX");

      rBalToken5 = await token4.balanceOf(router);
    }
    expect(rBalToken4.gt(MIN_TOKEN)).to.eq(true);
    expect(rBalToken5.gt(MIN_TOKEN)).to.eq(true);

    let liquidity4 = await txManager4.routerBalances(router, rinkebyTokenAddress);
    let liquidity5 = await txManager5.routerBalances(router, goerliTokenAddress);

    //router adds its own liquidity
    if (liquidity4.lt(MIN_TOKEN)) {
      logger.info({ chainId: 4 }, "Adding liquidity");
      const routerWallet = new Wallet(routerPk);

      const routerTxManager4 = new Contract(
        txManagerRinkeby,
        TransactionManagerArtifact.abi,
        routerWallet.connect(chainProviders[4]),
      ) as TransactionManager;

      const routerToken4 = new Contract(rinkebyTokenAddress, TestTokenABI, routerWallet.connect(chainProviders[4]));

      const allowance: BigNumber = await routerToken4.allowance(router, routerTxManager4.address);
      console.log(allowance);

      if(allowance.lt(constants.MaxUint256)){
        const approvetx = await routerToken4.approve(routerTxManager4.address, constants.MaxUint256, {gasLimit:6000000});
        const receipt = await approvetx.wait();
        logger.info({ transactionHash: receipt.transactionHash, chainId: 4 }, "addLiquidity approved Rinkeby");
      }
      const tx = await routerTxManager4.addLiquidity(MIN_TOKEN, rinkebyTokenAddress, router, {gasLimit:7000000});
      const receipt = await tx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: 4 }, "addLiquidity mined Rinkeby");

      liquidity4 = await txManager4.routerBalances(router,rinkebyTokenAddress);
    }

    expect(liquidity4.gte(MIN_TOKEN));


    if (liquidity5.lt(MIN_TOKEN)) {
      logger.info({ chainId: 5 }, "Adding liquidity goerli");
      const routerWallet = new Wallet(routerPk);

      const routerTxManager5 = new Contract(
        txManagerGoerli,
        TransactionManagerArtifact.abi,
        routerWallet.connect(chainProviders[5]),
      ) as TransactionManager;

      const routerToken5 = new Contract(goerliTokenAddress, TestTokenABI, routerWallet.connect(chainProviders[5]));

      const allowance: BigNumber = await routerToken5.allowance(router, routerTxManager5.address);
      console.log(allowance);

      if(allowance.lt(constants.MaxUint256)){
        const approvetx = await routerToken5.approve(routerTxManager5.address, constants.MaxUint256, {gasLimit:6000000});
        const receipt = await approvetx.wait();
        logger.info({ transactionHash: receipt.transactionHash, chainId: 5 }, "addLiquidity approved Rinkeby");
      }
      const tx = await routerTxManager5.addLiquidity(MIN_TOKEN, goerliTokenAddress, router, {gasLimit:7000000});
      const receipt = await tx.wait();
      logger.info({ transactionHash: receipt.transactionHash, chainId: 5 }, "addLiquidity mined Rinkeby");

      liquidity5 = await txManager4.routerBalances(router,goerliTokenAddress);
    }

    expect(liquidity5.gte(MIN_TOKEN));

  });

  it(`Should create a random wallet, and fund it with 1 eth (from sugardaddy) then create transfer `, async()=>{
    // const userWallet = Wallet.createRandom();
    // console.log(`Random Wallet ${userWallet.address}  ${JSON.stringify(userWallet._signingKey())}  ${JSON.stringify(userWallet._mnemonic())}`);
    //
    // let userBal = await chainProviders[4].getBalance(userWallet.address);
    // let userTokenBal = await token4.balanceOf(userWallet.address);
    // if(userBal.lt(utils.parseEther("0.3"))){
    //
    //   logger.info({ chainId: 4 }, "Sending ETH_GIFT to user");
    //   const tx = await sugarDaddy.connect(chainProviders[4]).sendTransaction({to:userWallet.address, value: ETH_GIFT});
    //   const receipt = await tx.wait();
    //   logger.info({ transactionHash: receipt.transactionHash, chainId: 4 }, "ETH_GIFT to user mined: ");
    //   userBal = await chainProviders[4].getBalance(userWallet.address);
    // }
    // if(userTokenBal.lt(MIN_TOKEN)){
    //
    //   logger.info({chainId:4}, "sending tokens to user");
    //   const tx = await token4.mint(userWallet.address, TOKEN_GIFT);
    //   const receipt = await tx.wait();
    //   logger.info({ transactionHash: receipt.transactionHash, chainId: 4 }, "TOKEN_GIFT to user mined: ");
    //   userTokenBal = await token4.balanceOf(userWallet.address);
    //
    // }
    // expect(userBal.gte(ETH_GIFT));
    // expect(userTokenBal.gte(MIN_TOKEN));

  });
  it(`Should send tokens`, async function(){
    // userWallet =  Wallet.fromMnemonic("hard crumble culture volcano attract reveal husband identify spell unfair right double");
    // userSdk = new NxtpSdk(
    //   chainProviders,
    //   userWallet,
    //   pino({name:"Integration Test"}),
    //   "nats://localhost:4222",
    //   "http://localhost:5040",
    // );
    // this?.timeout(120_000);
    // const quote = await userSdk.getTransferQuote({
    //   amount: utils.parseEther(".5").toString(),
    //   receivingAssetId: goerliTokenAddress,
    //   sendingAssetId: rinkebyTokenAddress,
    //   receivingAddress: userWallet.address,
    //   expiry: Math.floor(Date.now() / 1000) + 3600 * 24 * 3,
    //   sendingChainId: 4,
    //   receivingChainId: 5,
    // });
    //   const res = await userSdk.startTransfer(quote);
    //   expect(res.prepareResponse.hash).to.be.ok;
    //
    //   const event = await userSdk.waitFor(
    //     NxtpSdkEvents.ReceiverTransactionPrepared,
    //     100_000,
    //     (data) => data.txData.transactionId === res.transactionId,
    //   );
    //
    //   const fulfillEventPromise = userSdk.waitFor(
    //     NxtpSdkEvents.ReceiverTransactionFulfilled,
    //     100_000,
    //     (data) => data.txData.transactionId === res.transactionId,
    //   );
    //
    // userSdk.finishTransfer(event);
    // const fulfillEvent = await fulfillEventPromise;
    // console.log(`${[res,event,fulfillEventPromise].map((self)=>{return JSON.stringify(self);})}`);
    // expect(fulfillEvent).to.be.ok;
    this?.timeout(12000_000);

    const integrationAccountManager = new IntegrationAccountManager("hard crumble culture volcano attract reveal husband identify spell unfair right double", 40);
    const wallets = integrationAccountManager.getCanonicalWallets(40);
    for(let i = 0; i < wallets?.length; i++){
      const res = await integrationAccountManager.verifyAndReupAccountBalance(wallets[i].address);
      console.log(res);

    }

  });
    // beforeEach(async () => {
    //   userWallet = Wallet.createRandom();
    //
    //   // fund user sender side
    //   userSdk = new NxtpSdk(
    //     chainProviders,
    //     userWallet,
    //     pino({ name: "IntegrationTest" }),
    //     "nats://localhost:4222",
    //     "http://localhost:5040",
    //   );
    // });
    //
    //
    //
    // it("should send tokens", async function () {
    //   this.timeout(120_000);
    //   const quote = await userSdk.getTransferQuote({
    //     amount: utils.parseEther("1").toString(),
    //     receivingAssetId: goerliTokenAddress,
    //     sendingAssetId: rinkebyTokenAddress,
    //     receivingAddress: userWallet.address,
    //     expiry: Math.floor(Date.now() / 1000) + 3600 * 24 * 3,
    //     sendingChainId: 4,
    //     receivingChainId: 5,
    //   });
    //
    //   const res = await userSdk.startTransfer(quote);
    //   expect(res.prepareResponse.hash).to.be.ok;
    //
    //   const event = await userSdk.waitFor(
    //     NxtpSdkEvents.ReceiverTransactionPrepared,
    //     100_000,
    //     (data) => data.txData.transactionId === res.transactionId,
    //   );
    //
    //   const fulfillEventPromise = userSdk.waitFor(
    //     NxtpSdkEvents.ReceiverTransactionFulfilled,
    //     100_000,
    //     (data) => data.txData.transactionId === res.transactionId,
    //   );
    //
    //   // TODO: txservice doesnt seem to be returning properly, need to revisit this
    //   userSdk.finishTransfer(event);
    //   // expect(finishRes.metaTxResponse).to.be.ok;
    //   const fulfillEvent = await fulfillEventPromise;
    //   expect(fulfillEvent).to.be.ok;

});


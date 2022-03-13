import { waffle, ethers } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
use(solidity);

import {
  BridgeRouter,
  Home,
  TestERC20,
  TokenRegistry,
  TransactionManager,
  TestBridgeMessage,
  WETH,
  UpgradeBeaconController,
  XAppConnectionManager,
  DummySwap,
} from "../typechain-types";

import {
  asyncForEach,
  BatchMessage,
  bridge,
  BridgeMessageTypes,
  deployContract,
  deployUpgradeableProxy,
  formatTokenId,
  getDetailsHash,
  NxtpEnabledAction,
} from "./utils";

import { BigNumber, BigNumberish, constants, Contract, Wallet } from "ethers";
import { hexZeroPad, parseEther } from "ethers/lib/utils";
import { delay, getRandomBytes32 } from "@connext/nxtp-utils";

const SEED = 1_000_000;

const addressToBytes32 = (addr: string) => {
  return hexZeroPad(addr, 32);
};

const getEmptyMerkleProof = () => {
  return Array(32).fill(constants.HashZero);
};

// NOTE: for some reason, the
const executeProxyRead = async <T extends Contract>(contract: T, fn: string, params: any[] = []) => {
  const returned = await ethers.provider.call({
    to: contract.address,
    data: contract.interface.encodeFunctionData(fn, params),
  });
  return contract.interface.decodeFunctionResult(fn, returned)[0];
};

const executeProxyWrite = async <T extends Contract>(
  sender: Wallet,
  contract: T,
  fn: string,
  params: any[],
  value: BigNumberish = 0,
) => {
  return sender.sendTransaction({
    to: contract.address,
    data: contract.interface.encodeFunctionData(fn, params),
    value: BigNumber.from(value),
  });
};

const createFixtureLoader = waffle.createFixtureLoader;
describe.only("TransactionManager", () => {
  // Get wallets
  const [admin, router, user] = waffle.provider.getWallets() as Wallet[];

  // Token scenario:
  // - user prepares in adopted on origin
  // - oTM swaps adopted for canonical
  // - router pays in local
  // - dTM swaps local for adopted on destination

  // ETH scenario:
  // - user prepares in ETH
  // - oTM wraps
  // - router pays in local
  // - dTM swaps for adopted

  // Declare contracts
  let upgradeBeaconController: UpgradeBeaconController;
  let originXappConnectionManager: XAppConnectionManager;
  let destinationXappConnectionManager: XAppConnectionManager;
  let originTokenRegistry: TokenRegistry;
  let destinationTokenRegistry: TokenRegistry;
  let originAdopted: TestERC20;
  let destinationAdopted: TestERC20;
  let canonical: TestERC20;
  let local: TestERC20;
  let weth: WETH;
  let originBridge: BridgeRouter;
  let destinationBridge: BridgeRouter;
  let originTm: TransactionManager;
  let destinationTm: TransactionManager;
  let stableSwap: DummySwap;
  let home: Home;
  let bridgeMessage: TestBridgeMessage;

  const originDomain = 1;
  const destinationDomain = 2;

  const fixture = async () => {
    // Deploy adopted tokens
    originAdopted = await deployContract<TestERC20>("TestERC20");
    destinationAdopted = await deployContract<TestERC20>("TestERC20");
    // Deploy canonical token
    canonical = await deployContract<TestERC20>("TestERC20");
    // Deploy local tokem
    local = await deployContract<TestERC20>("TestERC20");
    // Deploy weth token
    weth = await deployContract<WETH>("WETH");
    // Deploy beacon controller
    upgradeBeaconController = await deployContract<UpgradeBeaconController>("UpgradeBeaconController");
    // Deploy xapp connection manager
    originXappConnectionManager = await deployContract<XAppConnectionManager>("XAppConnectionManager");
    destinationXappConnectionManager = await deployContract<XAppConnectionManager>("XAppConnectionManager");
    // Deploy token registry
    originTokenRegistry = await deployUpgradeableProxy<TokenRegistry>(
      "TokenRegistry",
      [upgradeBeaconController.address, originXappConnectionManager.address],
      upgradeBeaconController.address,
    );
    destinationTokenRegistry = await deployUpgradeableProxy<TokenRegistry>(
      "TokenRegistry",
      [upgradeBeaconController.address, destinationXappConnectionManager.address],
      upgradeBeaconController.address,
    );
    // Deploy dummy stable swap
    stableSwap = await deployContract<DummySwap>("DummySwap");
    // Deploy bridge
    originBridge = await deployUpgradeableProxy<BridgeRouter>(
      "BridgeRouter",
      [originTokenRegistry.address, originXappConnectionManager.address],
      upgradeBeaconController.address,
    );
    destinationBridge = await deployUpgradeableProxy<BridgeRouter>(
      "BridgeRouter",
      [destinationTokenRegistry.address, destinationXappConnectionManager.address],
      upgradeBeaconController.address,
    );
    // Deploy transacion managers
    originTm = await deployContract<TransactionManager>(
      "TransactionManager",
      originDomain,
      originBridge.address,
      originTokenRegistry.address,
      weth.address,
    );
    destinationTm = await deployContract<TransactionManager>(
      "TransactionManager",
      destinationDomain,
      destinationBridge.address,
      destinationTokenRegistry.address,
      weth.address,
    );
    // Deploy home
    home = await deployContract<Home>("Home", originDomain);
    // Deploy test bridge message
    bridgeMessage = await deployContract<TestBridgeMessage>("TestBridgeMessage");
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([admin, router, user]);
  });

  beforeEach(async () => {
    // Deploy all contracts
    await loadFixture(fixture);

    // Set token registry domains
    const setOriginDomain = await executeProxyWrite(admin, originTokenRegistry, "setLocalDomain", [originDomain]);
    await setOriginDomain.wait();
    const setDestDomain = await executeProxyWrite(admin, destinationTokenRegistry, "setLocalDomain", [
      destinationDomain,
    ]);
    await setDestDomain.wait();

    // Setup token registry for token test:
    // canonical on origin
    // local
    const setupLocal = await executeProxyWrite(admin, destinationTokenRegistry, "enrollCustom", [
      originDomain,
      addressToBytes32(canonical.address),
      local.address,
    ]);
    await setupLocal.wait();

    const setupWeth = await executeProxyWrite(admin, destinationTokenRegistry, "enrollCustom", [
      originDomain,
      addressToBytes32(weth.address),
      local.address,
    ]);
    await setupWeth.wait();

    // Setup replica (should be admin)
    const setReplica = await executeProxyWrite(admin, destinationXappConnectionManager, "ownerEnrollReplica", [
      admin.address,
      originDomain,
    ]);
    await setReplica.wait();

    // Setup remote router on dest
    const setDestRemoteRouter = await executeProxyWrite(admin, destinationBridge, "enrollRemoteRouter", [
      originDomain,
      addressToBytes32(originBridge.address),
    ]);
    await setDestRemoteRouter.wait();

    // Setup remote router on origin
    const setOriginRemoteRouter = await executeProxyWrite(admin, originBridge, "enrollRemoteRouter", [
      destinationDomain,
      addressToBytes32(destinationBridge.address),
    ]);
    await setOriginRemoteRouter.wait();

    // Setup home
    const setHome = await executeProxyWrite(admin, originXappConnectionManager, "setHome", [home.address]);
    await setHome.wait();

    // Mint to admin
    await asyncForEach([originAdopted, destinationAdopted, canonical, local, weth], async (contract) => {
      const mint = await contract.connect(admin).mint(admin.address, parseEther("1000"));
      await mint.wait();
    });

    // Mint to user
    await asyncForEach([originAdopted, destinationAdopted, weth], async (contract) => {
      // User mint
      const mint = await contract.mint(user.address, parseEther("10"));
      await mint.wait();
    });
    // Mint to router
    await local.mint(router.address, parseEther("20")).then((r) => r.wait());
    await weth.mint(router.address, parseEther("10")).then((r) => r.wait());

    // Approvals
    const approvals = await Promise.all([
      originAdopted.approve(stableSwap.address, SEED * 3),
      delay(100).then((_) => destinationAdopted.approve(stableSwap.address, SEED * 2)),
      delay(200).then((_) => local.approve(stableSwap.address, SEED * 2)),
      delay(300).then((_) => canonical.approve(stableSwap.address, SEED)),
      delay(400).then((_) => weth.approve(stableSwap.address, SEED)),
    ]);
    await Promise.all(approvals.map((a) => a.wait()));

    // Set transaction manager on BridgeRouter
    const setOriginTm = await originBridge.connect(admin).setTransactionManager(originTm.address);
    await setOriginTm.wait();
    const setDestinationTm = await destinationBridge.connect(admin).setTransactionManager(destinationTm.address);
    await setDestinationTm.wait();

    // Set remote on BridgeRouter
    const setRemote = await originBridge
      .connect(admin)
      .enrollRemoteRouter(destinationDomain, addressToBytes32(destinationBridge.address));
    await setRemote.wait();

    // Setup transaction manager assets
    const setupOriginAsset = await originTm.setupAsset(
      {
        id: addressToBytes32(canonical.address),
        domain: originDomain,
      },
      originAdopted.address,
      stableSwap.address,
    );
    await setupOriginAsset.wait();
    const setupOriginWeth = await originTm.setupAsset(
      {
        id: addressToBytes32(weth.address),
        domain: originDomain,
      },
      weth.address,
      stableSwap.address,
    );
    await setupOriginWeth.wait();

    const setupDestAsset = await destinationTm.setupAsset(
      {
        id: addressToBytes32(canonical.address),
        domain: originDomain,
      },
      destinationAdopted.address,
      stableSwap.address,
    );
    await setupDestAsset.wait();
    const setupDestWeth = await destinationTm.setupAsset(
      {
        id: addressToBytes32(weth.address),
        domain: originDomain,
      },
      destinationAdopted.address,
      stableSwap.address,
    );
    await setupDestWeth.wait();

    // Setup router
    const routers = await Promise.all([
      originTm.addRouter(router.address),
      delay(100).then((_) => destinationTm.addRouter(router.address)),
    ]);
    await Promise.all(routers.map((r) => r.wait()));
  });

  // Token scenario:
  // - user prepares in adopted on origin
  // - oTM swaps adopted for canonical
  // - router pays in local
  // - dTM swaps local for adopted
  it("should work for tokens", async () => {
    // Setup stable swap for adopted => canonical on origin
    const swapCanonical = await stableSwap
      .connect(admin)
      .setupPool(originAdopted.address, canonical.address, SEED, SEED);
    await swapCanonical.wait();

    // Setup stable swap for local => adopted on dest
    const swapLocal = await stableSwap
      .connect(admin)
      .setupPool(destinationAdopted.address, local.address, SEED * 2, SEED * 2);
    await swapLocal.wait();

    // Add router liquidity
    const approveLiq = await local.connect(router).approve(destinationTm.address, parseEther("100000"));
    await approveLiq.wait();
    const addLiq = await destinationTm.connect(router).addLiquidity(parseEther("0.1"), local.address);
    await addLiq.wait();

    // Approve user
    const approveAmt = await originAdopted.connect(user).approve(originTm.address, parseEther("100000"));
    await approveAmt.wait();

    // Get pre-prepare balances
    const prePrepare = await Promise.all([
      originAdopted.balanceOf(user.address),
      canonical.balanceOf(originTm.address),
    ]);

    // Prepare from the user
    const params = {
      recipient: user.address,
      callTo: constants.AddressZero,
      callData: "0x",
      originDomain,
      destinationDomain,
    };
    const transactingAssetId = originAdopted.address;
    const amount = 1000;
    const prepare = await originTm.connect(user).prepare({ params, transactingAssetId, amount });
    const prepareReceipt = await prepare.wait();

    // Check balance of user + bridge
    const postPrepare = await Promise.all([
      originAdopted.balanceOf(user.address),
      canonical.balanceOf(originTm.address),
    ]);
    expect(postPrepare[0]).to.be.eq(prePrepare[0].sub(amount));
    expect(postPrepare[1]).to.be.eq(prePrepare[1].add(amount));

    // Get the transaction id + leaf idx
    const originTmEvent = (await originTm.queryFilter(originTm.filters.Prepared())).find(
      (a) => a.blockNumber === prepareReceipt.blockNumber,
    );
    const transactionId = (originTmEvent!.args as any).transactionId;
    const leafIndex = (originTmEvent!.args as any).idx;
    const bridgedAmt = (originTmEvent!.args as any).localAmount;
    const bridgedAsset = (originTmEvent!.args as any).localAsset;

    // Check the batch assets and amounts
    const batchAsset = await originTm.batchAssets(params.destinationDomain, 0);
    expect(batchAsset).to.be.eq(bridgedAsset);
    const batchAmount = await originTm.batchAmounts(params.destinationDomain, 0);
    expect(batchAmount).to.be.eq(bridgedAmt);

    // Get pre-fulfill balances
    const preFulfill = await Promise.all([
      destinationAdopted.balanceOf(user.address),
      destinationTm.routerBalances(router.address, local.address),
    ]);

    // Fulfill with the router
    const routerAmount = bridgedAmt;
    const fulfill = await destinationTm.connect(router).fulfill({
      params,
      transactionId,
      local: local.address,
      amount: routerAmount,
      feePercentage: constants.Zero,
      relayerSignature: "0x",
      router: router.address,
      index: leafIndex,
      proof: getEmptyMerkleProof(),
    });
    await fulfill.wait();

    // Check balance of user + bridge
    const postFulfill = await Promise.all([
      destinationAdopted.balanceOf(user.address),
      destinationTm.routerBalances(router.address, local.address),
    ]);
    expect(postFulfill[0]).to.be.eq(preFulfill[0].add(routerAmount));
    expect(postFulfill[1]).to.be.eq(preFulfill[1].sub(routerAmount));

    // Dispatch the transfer
    const dispatch = await originTm.dispatch(params.destinationDomain);
    const dispatchReceipt = await dispatch.wait();

    // Get the message + id from the events
    const topics = originBridge.filters.Send().topics as string[];
    const bridgeEvent = originBridge.interface.parseLog(
      dispatchReceipt.logs.find((l) => l.topics.includes(topics[0]))!,
    );
    const message = (bridgeEvent!.args as any)[5];

    // Reconcile via bridge
    const reconcile = await destinationBridge
      .connect(admin)
      .handle(originDomain, 0, addressToBytes32(originBridge.address), message);
    await reconcile.wait();

    // Process the transaction to reimburse the router
    const preProcess = await destinationTm.routerBalances(router.address, local.address);
    const processTx = await destinationTm.process(
      transactionId,
      bridgedAmt,
      local.address,
      leafIndex,
      getEmptyMerkleProof(), // TODO: proper root!
      params,
    );
    await processTx.wait();
    const postProcess = await destinationTm.routerBalances(router.address, local.address);
    expect(postProcess).to.be.eq(preProcess.add(amount));
  });

  // ETH scenario:
  // - user prepares in ETH
  // - oTM wraps
  // - router pays in local
  // - dTM swaps for adopted
  it("should work with sending native assets, receiving local representation", async () => {
    // Setup stable swap for local => adopted on dest
    const swapLocal = await stableSwap
      .connect(admin)
      .setupPool(destinationAdopted.address, local.address, SEED * 2, SEED * 2);
    await swapLocal.wait();

    // Add router liquidity
    await local
      .connect(router)
      .approve(destinationTm.address, parseEther("20"))
      .then((r) => r.wait());
    const addLiq = await destinationTm.connect(router).addLiquidity(parseEther("1"), local.address);
    await addLiq.wait();

    // Get pre-prepare balances
    const prePrepare = await Promise.all([user.getBalance(), weth.balanceOf(originTm.address)]);

    // Prepare from the user
    const params = {
      recipient: user.address,
      callTo: constants.AddressZero,
      callData: "0x",
      originDomain,
      destinationDomain,
    };
    const transactingAssetId = constants.AddressZero;
    const amount = 1000;
    const prepare = await originTm.connect(user).prepare({ params, transactingAssetId, amount }, { value: amount });
    const prepareReceipt = await prepare.wait();

    // Check balance of user + bridge
    const postPrepare = await Promise.all([user.getBalance(), weth.balanceOf(originTm.address)]);
    expect(postPrepare[0]).to.be.eq(
      prePrepare[0].sub(amount).sub(prepareReceipt.cumulativeGasUsed.mul(prepareReceipt.effectiveGasPrice)),
    );
    expect(postPrepare[1]).to.be.eq(prePrepare[1].add(amount));

    // Get the transaction id + leaf idx
    const originTmEvent = (await originTm.queryFilter(originTm.filters.Prepared())).find(
      (a) => a.blockNumber === prepareReceipt.blockNumber,
    );
    const transactionId = (originTmEvent!.args as any).transactionId;
    const leafIndex = (originTmEvent!.args as any).idx;
    const bridgedAmt = (originTmEvent!.args as any).localAmount;
    const bridgedAsset = (originTmEvent!.args as any).localAsset;

    // Check the batch assets and amounts
    const batchAsset = await originTm.batchAssets(params.destinationDomain, 0);
    expect(batchAsset).to.be.eq(bridgedAsset);
    const batchAmount = await originTm.batchAmounts(params.destinationDomain, 0);
    expect(batchAmount).to.be.eq(bridgedAmt);

    // Get pre-fulfill balances
    const preFulfill = await Promise.all([
      destinationAdopted.balanceOf(user.address),
      destinationTm.routerBalances(router.address, local.address),
    ]);

    // Fulfill with the router
    const routerAmount = bridgedAmt;
    const fulfill = await destinationTm.connect(router).fulfill({
      params,
      transactionId,
      local: local.address,
      amount: routerAmount,
      relayerSignature: "0x",
      router: router.address,
      feePercentage: constants.Zero,
      index: leafIndex,
      proof: getEmptyMerkleProof(),
    });
    await fulfill.wait();

    // Check balance of user + bridge
    const postFulfill = await Promise.all([
      destinationAdopted.balanceOf(user.address),
      destinationTm.routerBalances(router.address, local.address),
    ]);
    expect(postFulfill[0]).to.be.eq(preFulfill[0].add(routerAmount));
    expect(postFulfill[1]).to.be.eq(preFulfill[1].sub(routerAmount));

    // Dispatch the transfer
    const dispatch = await originTm.dispatch(params.destinationDomain);
    const dispatchReceipt = await dispatch.wait();

    // Get the message + id from the events
    const topics = originBridge.filters.Send().topics as string[];
    const bridgeEvent = originBridge.interface.parseLog(
      dispatchReceipt.logs.find((l) => l.topics.includes(topics[0]))!,
    );
    const message = (bridgeEvent!.args as any)[5];

    // Reconcile via bridge
    const reconcile = await destinationBridge
      .connect(admin)
      .handle(originDomain, 0, addressToBytes32(originBridge.address), message);
    await reconcile.wait();

    // Process the transaction to reimburse the router
    const preProcess = await destinationTm.routerBalances(router.address, local.address);
    const processTx = await destinationTm.process(
      transactionId,
      bridgedAmt,
      local.address,
      leafIndex,
      getEmptyMerkleProof(), // TODO: proper root!
      params,
    );
    await processTx.wait();
    const postProcess = await destinationTm.routerBalances(router.address, local.address);
    expect(postProcess).to.be.eq(preProcess.add(amount));
  });

  it("the message should work", async () => {
    // Test token ids
    const tokenIds = Array(3)
      .fill(0)
      .map((_) => {
        return {
          id: getRandomBytes32(),
          domain: originDomain,
        };
      });
    let expectedTokens = "0x";
    tokenIds.forEach((tokenId) => {
      const formatted = formatTokenId(tokenId.domain, tokenId.id) as string;
      expectedTokens += formatted.startsWith("0x") ? formatted.substring(2) : formatted;
    });
    const testTokenIds = await bridgeMessage.testFormatTokenIds(
      tokenIds.map((t) => t.domain) as unknown as [BigNumberish, BigNumberish, BigNumberish],
      tokenIds.map((t) => t.id) as unknown as [string, string, string],
    );
    expect(testTokenIds).to.be.eq(expectedTokens);

    // Test detailsHash
    const tokenDetails = {
      name: await canonical.name(),
      symbol: await canonical.symbol(),
      decimals: await canonical.decimals(),
    };
    const expectedDetailsHash = getDetailsHash(tokenDetails.name, tokenDetails.symbol, tokenDetails.decimals);
    const testDetailsHash = await bridgeMessage.testFormatDetailsHash(
      tokenDetails.name,
      tokenDetails.symbol,
      tokenDetails.decimals,
    );
    expect(testDetailsHash).to.be.eq(expectedDetailsHash);

    // Test format transfer
    const action: NxtpEnabledAction = {
      type: BridgeMessageTypes.NXTP_ENABLED,
      recipient: addressToBytes32(user.address).toLowerCase(),
      amount: Array(3).fill(1000),
      detailsHash: Array(3).fill(expectedDetailsHash),
      batchRoot: getRandomBytes32().toLowerCase(),
    };
    const serializedAction = bridge.serializeNxtpEnabledAction(action);
    const testTransfer = await bridgeMessage.testFormatTransfer(
      action.recipient,
      action.batchRoot,
      action.amount as unknown as [BigNumberish, BigNumberish, BigNumberish],
      action.detailsHash as unknown as [string, string, string],
    );
    expect(testTransfer).to.be.eq(serializedAction);

    // Test split transfer
    const [type, recipient, recipientAddr, root, amounts, details] = await bridgeMessage.testSplitTransfer(
      testTransfer,
    );
    expect(type).to.be.eq(action.type);
    expect(recipient).to.be.eq(action.recipient);
    expect(recipientAddr.toLowerCase()).to.be.eq(user.address.toLowerCase());
    expect(root).to.be.eq(action.batchRoot);
    amounts.map((a, idx) => {
      expect(a.toNumber()).to.be.eq(action.amount[idx]);
      expect(details[idx]).to.be.eq(action.detailsHash[idx]);
    });

    // Test format message
    const transferMessage: BatchMessage = {
      tokenIds,
      action,
    };
    const serializedMessage = bridge.serializeBatchMessage(transferMessage);
    const testMessage = await bridgeMessage.testFormatMessage(
      expectedTokens,
      serializedAction,
      BridgeMessageTypes.TOKEN_IDS,
      BridgeMessageTypes.NXTP_ENABLED,
    );
    expect(testMessage).to.be.eq(serializedMessage);
  });
});

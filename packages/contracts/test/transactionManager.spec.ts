import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
use(solidity);

import {
  BridgeRouter,
  Home,
  TestERC20,
  TestStableSwap,
  TokenRegistry,
  TransactionManager,
  TestBridgeMessage,
  WETH,
} from "../typechain-types";

import {
  bridge,
  BridgeMessageTypes,
  deployContract,
  FastTransferAction,
  formatTokenId,
  getDetailsHash,
  Message,
} from "./utils";

import { constants, Wallet } from "ethers";
import { hexZeroPad, parseEther } from "ethers/lib/utils";
import { delay, getRandomBytes32 } from "@connext/nxtp-utils";

const addressToBytes32 = (addr: string) => {
  return hexZeroPad(addr, 32);
};

const createFixtureLoader = waffle.createFixtureLoader;
describe.only("TransactionManager", () => {
  // Get wallets
  const [admin, router, user] = waffle.provider.getWallets() as Wallet[];

  // Token scenario:
  // - user prepares in adopted on origin
  // - oTM swaps adopted for canonical
  // - router pays in local
  // - dTM swaps local for adopted

  // ETH scenario:
  // - user prepares in ETH
  // - oTM wraps
  // - router pays in local
  // - dTM swaps for adopted

  // Declare contracts
  let originTokenRegistry: TokenRegistry;
  let destinationTokenRegistry: TokenRegistry;
  let adopted: TestERC20;
  let canonical: TestERC20;
  let local: TestERC20;
  let weth: WETH;
  let originBridge: BridgeRouter;
  let destinationBridge: BridgeRouter;
  let originTm: TransactionManager;
  let destinationTm: TransactionManager;
  let stableSwap: TestStableSwap;
  let home: Home;
  let bridgeMessage: TestBridgeMessage;

  const originDomain = 1;
  const destinationDomain = 2;

  const fixture = async () => {
    // Deploy adopted token
    adopted = await deployContract<TestERC20>("TestERC20");
    // Deploy canonical token
    canonical = await deployContract<TestERC20>("TestERC20");
    // Deploy local tokem
    local = await deployContract<TestERC20>("TestERC20");
    // Deploy weth token
    weth = await deployContract<WETH>("WETH");
    // Deploy token registry
    originTokenRegistry = await deployContract<TokenRegistry>("TokenRegistry");
    destinationTokenRegistry = await deployContract<TokenRegistry>("TokenRegistry");
    // Deploy stable swap
    stableSwap = await deployContract<TestStableSwap>("TestStableSwap");
    // Deploy bridge
    originBridge = await deployContract<BridgeRouter>("BridgeRouter");
    destinationBridge = await deployContract<BridgeRouter>("BridgeRouter");
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

    // Setup token registries
    await destinationTokenRegistry.setLocalDomain(destinationDomain).then((r) => r.wait());
    await originTokenRegistry.setLocalDomain(originDomain).then((r) => r.wait());
    const setupLocal = await destinationTokenRegistry.enrollCustom(
      originDomain,
      addressToBytes32(canonical.address),
      local.address,
    );
    await setupLocal.wait();
    const setupWeth = await destinationTokenRegistry.enrollCustom(
      originDomain,
      addressToBytes32(weth.address),
      local.address,
    );
    await setupWeth.wait();

    // Setup home
    const setHome = await originBridge.setHome(home.address);
    await setHome.wait();

    // Mint to admin
    const adoptedMint = await adopted.mint(admin.address, parseEther("1000"));
    await adoptedMint.wait();
    const canonicalMint = await canonical.mint(admin.address, parseEther("1000"));
    await canonicalMint.wait();
    const localMint = await local.mint(admin.address, parseEther("2000"));
    await localMint.wait();
    const wethMint = await weth.mint(admin.address, parseEther("1000"));
    await wethMint.wait();

    // Mint to user
    await adopted.mint(user.address, parseEther("10")).then((r) => r.wait());
    await weth.mint(user.address, parseEther("10")).then((r) => r.wait());
    // Mint to router
    await local.mint(router.address, parseEther("20")).then((r) => r.wait());
    await weth.mint(router.address, parseEther("10")).then((r) => r.wait());

    // Approvals
    const seed = 1_000_000;
    const approvals = await Promise.all([
      adopted.approve(stableSwap.address, seed * 3),
      delay(100).then((_) => local.approve(stableSwap.address, seed * 2)),
      delay(200).then((_) => canonical.approve(stableSwap.address, seed)),
      delay(300).then((_) => weth.approve(stableSwap.address, seed)),
    ]);
    // Setup stable swap for adopted => local
    await Promise.all(approvals.map((a) => a.wait()));
    const swapLocal = await stableSwap.connect(admin).setupPool(adopted.address, local.address, seed * 2, seed * 2);
    await swapLocal.wait();
    // Setup stable swap for canonical => adopted
    const swapCanonical = await stableSwap.connect(admin).setupPool(adopted.address, canonical.address, seed, seed);
    await swapCanonical.wait();
    // Set transaction manager on BridgeRouter
    const setOriginTm = await originBridge.setTransactionManager(originTm.address);
    await setOriginTm.wait();
    const setDestinationTm = await destinationBridge.setTransactionManager(destinationTm.address);
    await setDestinationTm.wait();

    // Set token registry
    const setOriginTr = await originBridge.setTokenRegistry(originTokenRegistry.address);
    await setOriginTr.wait();

    const setDestinationTr = await destinationBridge.setTokenRegistry(destinationTokenRegistry.address);
    await setDestinationTr.wait();

    // Set remote on BridgeRouter
    const setRemote = await originBridge.enrollRemoteRouter(
      destinationDomain,
      addressToBytes32(destinationBridge.address),
    );
    await setRemote.wait();

    // Setup transaction manager assets
    const setupOriginAsset = await originTm.setupAsset(
      {
        id: addressToBytes32(canonical.address),
        domain: originDomain,
      },
      adopted.address,
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
      adopted.address,
      stableSwap.address,
    );
    await setupDestAsset.wait();
    const setupDestWeth = await destinationTm.setupAsset(
      {
        id: addressToBytes32(weth.address),
        domain: originDomain,
      },
      adopted.address,
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

  it("should work for tokens", async () => {
    // Add router liquidity
    const approveLiq = await local.connect(router).approve(destinationTm.address, parseEther("100000"));
    await approveLiq.wait();
    const addLiq = await destinationTm.connect(router).addLiquidity(parseEther("0.1"), local.address);
    await addLiq.wait();

    // Approve user
    const approveAmt = await adopted.connect(user).approve(originTm.address, parseEther("100000"));
    await approveAmt.wait();

    // Get pre-prepare balances
    const prePrepare = await Promise.all([adopted.balanceOf(user.address), canonical.balanceOf(originBridge.address)]);

    // Prepare from the user
    const params = {
      recipient: user.address,
      callTo: constants.AddressZero,
      callData: "0x",
      originDomain,
      destinationDomain,
    };
    const asset = adopted.address;
    const amount = 1000;
    const prepare = await originTm.connect(user).prepare({ params, transactingAssetId: asset, amount });
    const prepareReceipt = await prepare.wait();

    // Check balance of user + bridge
    const postPrepare = await Promise.all([adopted.balanceOf(user.address), canonical.balanceOf(originBridge.address)]);
    expect(postPrepare[0]).to.be.eq(prePrepare[0].sub(amount));
    expect(postPrepare[1]).to.be.eq(prePrepare[1].add(amount));

    // Get the message + id from the events
    const bridgeEvent = (await originBridge.queryFilter(originBridge.filters.Send())).find(
      (a) => a.blockNumber === prepareReceipt.blockNumber,
    );
    const message = (bridgeEvent!.args as any).message;

    const originTmEvent = await (
      await originTm.queryFilter(originTm.filters.Prepared())
    ).find((a) => a.blockNumber === prepareReceipt.blockNumber);
    const tmNonce = (originTmEvent!.args as any).nonce;

    // Get pre-fulfill balances
    const preFulfill = await Promise.all([
      adopted.balanceOf(user.address),
      destinationTm.routerBalances(router.address, local.address),
    ]);

    // Fulfill with the router
    const routerAmount = amount - 500;
    const fulfill = await destinationTm
      .connect(router)
      .fulfill({ params, nonce: tmNonce, local: local.address, amount: routerAmount });
    await fulfill.wait();

    // Check balance of user + bridge
    const postFulfill = await Promise.all([
      adopted.balanceOf(user.address),
      destinationTm.routerBalances(router.address, local.address),
    ]);
    expect(postFulfill[0]).to.be.eq(preFulfill[0].add(routerAmount));
    expect(postFulfill[1]).to.be.eq(preFulfill[1].sub(routerAmount));

    // Reconcile via bridge
    const preReconcile = await destinationTm.routerBalances(router.address, local.address);
    const reconcile = await destinationBridge.handle(originDomain, 0, getRandomBytes32(), message);
    await reconcile.wait();
    const postReconcile = await destinationTm.routerBalances(router.address, local.address);
    expect(postReconcile).to.be.eq(preReconcile.add(amount));
  });

  it("should work with sending native assets, receiving local representation", async () => {
    // Add router liquidity
    await local
      .connect(router)
      .approve(destinationTm.address, parseEther("20"))
      .then((r) => r.wait());
    const addLiq = await destinationTm.connect(router).addLiquidity(parseEther("1"), local.address);
    await addLiq.wait();

    // Approve user
    const approveAmt = await adopted.connect(user).approve(originTm.address, parseEther("100000"));
    await approveAmt.wait();

    // Get pre-prepare balances
    const prePrepare = await Promise.all([user.getBalance(), weth.balanceOf(originBridge.address)]);

    // Prepare from the user
    const params = {
      recipient: user.address,
      callTo: constants.AddressZero,
      callData: "0x",
      originDomain,
      destinationDomain,
    };
    const asset = constants.AddressZero;
    const amount = 1000;
    const prepare = await originTm
      .connect(user)
      .prepare({ params, transactingAssetId: asset, amount }, { value: amount });
    const prepareReceipt = await prepare.wait();

    // Check balance of user + bridge
    const postPrepare = await Promise.all([user.getBalance(), weth.balanceOf(originBridge.address)]);
    expect(postPrepare[0]).to.be.eq(
      prePrepare[0].sub(amount).sub(prepareReceipt.cumulativeGasUsed.mul(prepareReceipt.effectiveGasPrice)),
    );
    expect(postPrepare[1]).to.be.eq(prePrepare[1].add(amount));

    // Get the message + id from the events
    const bridgeEvent = (await originBridge.queryFilter(originBridge.filters.Send())).find(
      (a) => a.blockNumber === prepareReceipt.blockNumber,
    );
    const message = (bridgeEvent!.args as any).message;

    const originTmEvent = await (
      await originTm.queryFilter(originTm.filters.Prepared())
    ).find((a) => a.blockNumber === prepareReceipt.blockNumber);
    const tmNonce = (originTmEvent!.args as any).nonce;

    // Get pre-fulfill balances
    const preFulfill = await Promise.all([
      adopted.balanceOf(user.address),
      destinationTm.routerBalances(router.address, local.address),
    ]);

    // Fulfill with the router
    const routerAmount = amount - 500;
    const fulfill = await destinationTm
      .connect(router)
      .fulfill({ params, nonce: tmNonce, local: local.address, amount: routerAmount });
    await fulfill.wait();

    // Check balance of user + bridge
    const postFulfill = await Promise.all([
      adopted.balanceOf(user.address),
      destinationTm.routerBalances(router.address, local.address),
    ]);
    expect(postFulfill[0]).to.be.eq(preFulfill[0].add(routerAmount));
    expect(postFulfill[1]).to.be.eq(preFulfill[1].sub(routerAmount));

    // Reconcile via bridge
    const preReconcile = await destinationTm.routerBalances(router.address, local.address);
    const reconcile = await destinationBridge.handle(originDomain, 0, getRandomBytes32(), message);
    await reconcile.wait();
    const postReconcile = await destinationTm.routerBalances(router.address, local.address);
    expect(postReconcile).to.be.eq(preReconcile.add(amount));
  });

  it("the message should work", async () => {
    // Test token id
    const tokenId = {
      id: addressToBytes32(canonical.address),
      domain: originDomain,
    };
    const expectedToken = formatTokenId(tokenId.domain, tokenId.id);
    const testTokenId = await bridgeMessage.testFormatTokenId(tokenId.domain, tokenId.id);
    expect(testTokenId).to.be.eq(expectedToken);

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
    const action: FastTransferAction = {
      type: BridgeMessageTypes.FAST_TRANSFER,
      recipient: addressToBytes32(user.address).toLowerCase(),
      amount: 1000,
      detailsHash: expectedDetailsHash,
      externalId: getRandomBytes32().toLowerCase(),
      externalHash: getRandomBytes32().toLowerCase(),
    };
    const serializedAction = bridge.serializeFastTransferAction(action);
    const testTransfer = await bridgeMessage.testFormatTransfer(
      action.recipient,
      action.amount,
      action.detailsHash,
      true,
      action.externalId,
      action.externalHash,
    );
    expect(testTransfer).to.be.eq(serializedAction);

    // Test split transfer
    const [type, recipient, recipientAddr, amount, externalId, externalCallHash] =
      await bridgeMessage.testSplitTransfer(testTransfer);
    expect(type).to.be.eq(action.type);
    expect(recipient).to.be.eq(action.recipient);
    expect(recipientAddr.toLowerCase()).to.be.eq(user.address.toLowerCase());
    expect(externalId).to.be.eq(action.externalId);
    expect(externalCallHash).to.be.eq(action.externalHash);
    expect(amount.toNumber()).to.be.eq(action.amount);

    // Test format message
    const transferMessage: Message = {
      tokenId,
      action,
    };
    const serializedMessage = bridge.serializeMessage(transferMessage);
    const testMessage = await bridgeMessage.testFormatMessage(
      expectedToken,
      serializedAction,
      BridgeMessageTypes.TOKEN_ID,
      BridgeMessageTypes.FAST_TRANSFER,
    );
    expect(testMessage).to.be.eq(serializedMessage);
  });
});

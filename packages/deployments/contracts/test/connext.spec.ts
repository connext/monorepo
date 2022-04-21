import { waffle, ethers } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
use(solidity);

import {
  Home,
  TestERC20,
  TokenRegistry,
  WETH,
  UpgradeBeaconController,
  XAppConnectionManager,
  DummySwap,
  ProposedOwnableUpgradeable,
  ConnextHandler,
  ConnextUtils
} from "../typechain-types";

import {
  asyncForEach,
  deployContract,
  MAX_FEE_PER_GAS,
  assertReceiptEvent,
  ZERO_ADDRESS,
  transferOwnershipOnContract,
  deployUpgradeableProxy,
  getRoutersBalances,
  restoreSnapshot,
  takeSnapshot,
} from "./utils";

import { BigNumber, BigNumberish, constants, Contract, utils, Wallet } from "ethers";
import { hexZeroPad, parseEther } from "ethers/lib/utils";
import { delay, getOnchainBalance } from "@connext/nxtp-utils";

const SEED = utils.parseEther("1");

const addressToBytes32 = (addr: string) => {
  return hexZeroPad(addr, 32);
};

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
describe("Connext", () => {
  // Get wallets
  const [admin, router, user, router2, router3] = waffle.provider.getWallets() as Wallet[];

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
  let connextUtils: ConnextUtils;
  let originBridge: ConnextHandler;
  let destinationBridge: ConnextHandler;
  let stableSwap: DummySwap;
  let home: Home;
  let snapshot: number;

  const originDomain = 1;
  const destinationDomain = 2;

  const fixture = async () => {
    // Deploy adopted tokens
    originAdopted = await deployContract<TestERC20>("TestERC20");
    destinationAdopted = await deployContract<TestERC20>("TestERC20");
    // Deploy canonical token
    canonical = await deployContract<TestERC20>("TestERC20");
    // Deploy local token
    local = await deployContract<TestERC20>("TestERC20");
    // Deploy weth token
    weth = await deployContract<WETH>("WETH");
    // Deploy beacon controller
    upgradeBeaconController = await deployContract<UpgradeBeaconController>("UpgradeBeaconController");
    // Deploy xapp connection manager
    originXappConnectionManager = await deployContract<XAppConnectionManager>("XAppConnectionManager");
    destinationXappConnectionManager = await deployContract<XAppConnectionManager>("XAppConnectionManager");
    //Deploy token registry
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

    // Deploy Connext logic libraries
    connextUtils = await deployContract("ConnextUtils");
    const routerPermissionsManagerLogic = await deployContract("RouterPermissionsManagerLogic");

    // Deploy bridge
    originBridge = (
      await deployUpgradeableProxy<ConnextHandler>(
        "ConnextHandler",
        [originDomain, originXappConnectionManager.address, originTokenRegistry.address, weth.address],
        upgradeBeaconController.address,
        {
          ConnextUtils: connextUtils.address,
          RouterPermissionsManagerLogic: routerPermissionsManagerLogic.address,
        },
      )
    ).connect(admin);

    destinationBridge = (
      await deployUpgradeableProxy<ConnextHandler>(
        "ConnextHandler",
        [destinationDomain, destinationXappConnectionManager.address, destinationTokenRegistry.address, weth.address],
        upgradeBeaconController.address,
        {
          ConnextUtils: connextUtils.address,
          RouterPermissionsManagerLogic: routerPermissionsManagerLogic.address,
        },
      )
    ).connect(admin);

    // Deploy home
    home = await deployContract<Home>("Home", originDomain);
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([admin, router, user]);

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
      destinationAdopted.address,
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
    await asyncForEach([local, weth, destinationAdopted], async (contract) => {
      // User mint
      const mint = await contract.mint(router.address, parseEther("20"));
      await mint.wait();
    });

    // Approvals
    const approvals = await Promise.all([
      originAdopted.approve(stableSwap.address, SEED.mul(3)),
      delay(100).then((_) => destinationAdopted.approve(stableSwap.address, SEED.mul(2))),
      delay(200).then((_) => local.approve(stableSwap.address, SEED.mul(2))),
      delay(300).then((_) => canonical.approve(stableSwap.address, SEED)),
      delay(400).then((_) => weth.approve(stableSwap.address, SEED)),
    ]);
    await Promise.all(approvals.map((a) => a.wait()));

    // Set remote on BridgeRouter
    const setRemote = await originBridge
      .connect(admin)
      .enrollRemoteRouter(destinationDomain, addressToBytes32(destinationBridge.address));
    await setRemote.wait();

    // Setup transaction manager assets
    const setupOriginAsset = await originBridge.connect(admin).setupAsset(
      {
        id: addressToBytes32(canonical.address),
        domain: originDomain,
      },
      originAdopted.address,
      stableSwap.address,
    );
    await setupOriginAsset.wait();
    const setupOriginWeth = await originBridge.setupAsset(
      {
        id: addressToBytes32(weth.address),
        domain: originDomain,
      },
      weth.address,
      stableSwap.address,
    );
    await setupOriginWeth.wait();

    const setupDestAsset = await destinationBridge.setupAsset(
      {
        id: addressToBytes32(canonical.address),
        domain: originDomain,
      },
      destinationAdopted.address,
      stableSwap.address,
    );
    await setupDestAsset.wait();
    const setupDestWeth = await destinationBridge.setupAsset(
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
      originBridge.setupRouter(router.address, router.address, router.address),
      delay(100).then((_) => destinationBridge.setupRouter(router.address, router.address, router.address)),
    ]);
    await Promise.all(routers.map((r) => r.wait()));

    // add relayer
    await destinationBridge.addRelayer(router.address);
  });

  beforeEach(async () => {
    snapshot = await takeSnapshot();
  });

  afterEach(async () => {
    await restoreSnapshot(snapshot);
    snapshot = await takeSnapshot();
  });

  describe("constructor", async () => {
    it("should deploy", async () => {
      expect(originBridge.address).to.be.a("string");
    });

    it("should set domain for original Connext", async () => {
      expect(await originBridge.domain()).to.eq(originDomain);
    });

    it("should set Token Registry", async () => {
      const addr = await originBridge.tokenRegistry();
      expect(addr).to.be.eq(originTokenRegistry.address);
    });

    it("should set Wrapped Asset", async () => {
      const addr = await originBridge.wrapper();
      expect(addr).to.be.eq(weth.address);
    });
  });

  xdescribe("setupRouter", () => {
    it("should fail if not called by owner", async () => {
      const toAdd = Wallet.createRandom().address;
      await expect(originBridge.connect(user).setupRouter(toAdd, toAdd, toAdd)).to.be.revertedWith(
        "ProposedOwnableUpgradeable__onlyOwner_notOwner",
      );
    });

    it("should fail if it is adding address0", async () => {
      const toAdd = constants.AddressZero;
      await expect(originBridge.setupRouter(toAdd, toAdd, toAdd)).to.be.revertedWith(
        "ConnextUtils__addRouter_routerEmpty",
      );
    });

    it("should fail if its already added", async () => {
      await expect(originBridge.setupRouter(router.address, router.address, router.address)).to.be.revertedWith(
        "ConnextUtils__addRouter_alreadyAdded",
      );
    });

    it("should work", async () => {
      const toAdd = Wallet.createRandom().address;
      const tx = await originBridge.setupRouter(toAdd, toAdd, toAdd);
      const receipt = await tx.wait();
      await assertReceiptEvent(receipt, "RouterAdded", { caller: receipt.from, router: toAdd });
      expect(await originBridge.approvedRouters(toAdd)).to.be.true;
    });
  });

  xdescribe("removeRouter", () => {
    it("should fail if not called by owner", async () => {
      const toAdd = Wallet.createRandom().address;
      await expect(originBridge.connect(user).removeRouter(toAdd)).to.be.revertedWith(
        "ProposedOwnableUpgradeable__onlyOwner_notOwner",
      );
    });

    it("should fail if it is adding address0", async () => {
      const toAdd = constants.AddressZero;
      await expect(originBridge.removeRouter(toAdd)).to.be.revertedWith("ConnextUtils__removeRouter_routerEmpty");
    });

    it("should fail if its already removed", async () => {
      const tx = await originBridge.removeRouter(router.address);
      await tx.wait();

      await expect(originBridge.removeRouter(router.address)).to.be.revertedWith(
        "ConnextUtils__removeRouter_notAdded",
      );
    });

    it("should work", async () => {
      const tx = await originBridge.removeRouter(router.address);
      const receipt = await tx.wait();
      await assertReceiptEvent(receipt, "RouterRemoved", { caller: receipt.from, router: router.address });
      expect(await originBridge.approvedRouters(router.address)).to.be.false;
    });
  });

  describe("addStableSwapPool", () => {
    it("should fail if not called by owner", async () => {
      await expect(
        originBridge.connect(user).addStableSwapPool(
          {
            id: addressToBytes32(canonical.address),
            domain: originDomain,
          },
          stableSwap.address,
        ),
      ).to.be.revertedWith("ProposedOwnableUpgradeable__onlyOwner_notOwner");
    });

    it("should work", async () => {
      const tx = await originBridge.addStableSwapPool(
        {
          id: addressToBytes32(canonical.address),
          domain: originDomain,
        },
        stableSwap.address,
      );

      const receipt = await tx.wait();

      const stableSwapAddedEvent = connextUtils.interface.parseLog(receipt.logs[0])
      expect(stableSwapAddedEvent.args.caller).to.eq(admin.address);
      expect(stableSwapAddedEvent.args.canonicalId).to.eq(addressToBytes32(canonical.address).toLowerCase());
      expect(stableSwapAddedEvent.args.domain).to.eq(originDomain);
      expect(stableSwapAddedEvent.args.swapPool).to.eq(stableSwap.address);
      expect(await originBridge.adoptedToLocalPools(addressToBytes32(canonical.address))).to.be.equal(
        stableSwap.address,
      );
    });
  });

  describe("setupAsset", () => {
    it("should fail if not called by owner", async () => {
      await expect(
        originBridge
          .connect(user)
          .setupAsset(
            { id: addressToBytes32(canonical.address), domain: originDomain },
            originAdopted.address,
            stableSwap.address,
          ),
      ).to.be.revertedWith("ProposedOwnableUpgradeable__onlyOwner_notOwner");
    });

    it("should fail if it is already approved canonical", async () => {
      const toAdd = Wallet.createRandom().address;
      const tx = await originBridge.setupAsset(
        {
          id: addressToBytes32(toAdd),
          domain: originDomain,
        },
        originAdopted.address,
        stableSwap.address,
      );
      await tx.wait();

      await expect(
        originBridge.setupAsset(
          {
            id: addressToBytes32(toAdd),
            domain: originDomain,
          },
          originAdopted.address,
          stableSwap.address,
        ),
      ).to.be.revertedWith("ConnextUtils__addAssetId_alreadyAdded");
    });

    it("should work", async () => {
      const toAdd = Wallet.createRandom().address;
      const tx = await originBridge.setupAsset(
        { id: addressToBytes32(toAdd), domain: originDomain },
        originAdopted.address,
        stableSwap.address,
      );
      const receipt = await tx.wait();
      const supported = originAdopted.address == ZERO_ADDRESS ? weth.address : originAdopted.address;

      const assetAddedEvent = connextUtils.interface.parseLog(receipt.logs[0])
      expect(assetAddedEvent.args.caller).to.eq(admin.address);
      expect(assetAddedEvent.args.canonicalId).to.eq(addressToBytes32(toAdd).toLowerCase());
      expect(assetAddedEvent.args.domain).to.eq(originDomain);
      expect(assetAddedEvent.args.adoptedAsset).to.eq(originAdopted.address);
      expect(assetAddedEvent.args.supportedAsset).to.eq(supported);
      expect(await originBridge.approvedAssets(addressToBytes32(toAdd))).to.be.true;
    });
  });

  describe("removeAssetId", () => {
    it("should fail if not called by owner", async () => {
      await expect(
        originBridge.connect(user).removeAssetId(addressToBytes32(canonical.address), originAdopted.address),
      ).to.be.revertedWith("ProposedOwnableUpgradeable__onlyOwner_notOwner");
    });

    it("should fail if it is not approved canonical", async () => {
      const toRemove = Wallet.createRandom().address;
      await expect(originBridge.removeAssetId(addressToBytes32(toRemove), originAdopted.address)).to.be.revertedWith(
        "ConnextUtils__removeAssetId_notAdded",
      );
    });

    it("should work", async () => {
      const toRemove = Wallet.createRandom().address;
      const addTx = await originBridge.setupAsset(
        { id: addressToBytes32(toRemove), domain: originDomain },
        originAdopted.address,
        stableSwap.address,
      );
      await addTx.wait();

      const tx = await originBridge.removeAssetId(addressToBytes32(toRemove), originAdopted.address);
      const receipt = await tx.wait();

      const assetRemovedEvent = connextUtils.interface.parseLog(receipt.logs[0])
      expect(assetRemovedEvent.args.caller).to.eq(admin.address);
      expect(assetRemovedEvent.args.canonicalId).to.eq(addressToBytes32(addressToBytes32(toRemove).toLowerCase()).toLowerCase());
      expect(await originBridge.approvedAssets(addressToBytes32(toRemove))).to.be.false;
      expect(await originBridge.adoptedToLocalPools(addressToBytes32(toRemove))).to.be.eq(ZERO_ADDRESS);
    });
  });

  describe("addLiquidity / addLiquidityFor", () => {
    it("should revert if router address is empty", async () => {
      const amount = "1";
      const assetId = ZERO_ADDRESS;

      await expect(originBridge.connect(router).addLiquidityFor(amount, assetId, ZERO_ADDRESS)).to.be.revertedWith(
        "ConnextHandler__addLiquidityForRouter_routerEmpty",
      );
      expect(await originBridge.routerBalances(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should fail if amount is 0", async () => {
      const amount = "0";
      const assetId = ZERO_ADDRESS;

      await expect(originBridge.connect(router).addLiquidityFor(amount, assetId, router.address)).to.be.revertedWith(
        "ConnextHandler__addLiquidityForRouter_amountIsZero",
      );
    });

    it("should fail if it is an unapproved router && ownership isnt renounced", async () => {
      const amount = "10";
      const assetId = ZERO_ADDRESS;

      // Remove router
      const remove = await originBridge.removeRouter(router.address);
      await remove.wait();
      expect(await originBridge.approvedRouters(router.address)).to.be.false;

      await expect(originBridge.addLiquidityFor(amount, assetId, router.address)).to.be.revertedWith(
        "ConnextHandler__addLiquidityForRouter_badRouter",
      );
    });

    it("should fail if its an unapproved asset && ownership isnt renounced", async () => {
      const amount = "10";
      const assetId = Wallet.createRandom().address;
      await expect(originBridge.connect(router).addLiquidityFor(amount, assetId, router.address)).to.be.revertedWith(
        "ConnextHandler__addLiquidityForRouter_badAsset",
      );
    });

    it("should fail if if msg.value == 0 for native asset", async () => {
      const amount = "1";
      const assetId = ZERO_ADDRESS;

      await expect(originBridge.connect(router).addLiquidityFor(amount, assetId, router.address)).to.be.revertedWith(
        "ConnextUtils__transferAssetToContract_notAmount",
      );
      expect(await originBridge.routerBalances(router.address, weth.address)).to.eq(BigNumber.from(0));
    });

    it("should fail if msg.value != amount for native asset", async () => {
      const amount = "1";
      const falseValue = "2";
      const assetId = ZERO_ADDRESS;

      await expect(
        originBridge.connect(router).addLiquidityFor(amount, assetId, router.address, { value: falseValue }),
      ).to.be.revertedWith("ConnextUtils__transferAssetToContract_notAmount");
      expect(await originBridge.routerBalances(router.address, weth.address)).to.eq(BigNumber.from(0));
    });

    it("should fail if msg.value != 0 for ERC20 token", async () => {
      // addLiquidity: ETH_WITH_ERC_TRANSFER;
      const amount = "1";
      const assetId = local.address;
      await expect(
        destinationBridge.connect(router).addLiquidityFor(amount, assetId, router.address, { value: amount }),
      ).to.be.revertedWith("ConnextUtils__transferAssetToContract_ethWithErcTransfer");
      expect(await destinationBridge.routerBalances(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should fail if transferFromERC20 fails", async () => {
      const amount = SEED.mul(5);
      const assetId = local.address;
      await expect(
        destinationBridge.connect(router).addLiquidityFor(amount, assetId, router.address),
      ).to.be.revertedWith("ERC20: insufficient allowance");
      expect(await destinationBridge.routerBalances(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should work if it is renounced && using an unapproved router", async () => {
      const amount = "1";
      const assetId = ZERO_ADDRESS;

      // Remove asset
      const remove = await originBridge.removeRouter(router.address);
      await remove.wait();
      expect(await originBridge.approvedRouters(router.address)).to.be.false;

      // Renounce ownership
      await transferOwnershipOnContract(
        ZERO_ADDRESS,
        admin,
        originBridge as unknown as ProposedOwnableUpgradeable,
        admin,
      );

      await originBridge.connect(router).addLiquidityFor(amount, assetId, router.address, { value: amount });
      expect(await originBridge.routerBalances(router.address, weth.address)).to.eq(BigNumber.from(amount));
    });

    it("should work for an approved router in approved native asset", async () => {
      const amount = "1";
      const assetId = ZERO_ADDRESS;
      await originBridge.connect(router).addLiquidityFor(amount, assetId, router.address, { value: amount });
      expect(await originBridge.routerBalances(router.address, weth.address)).to.eq(BigNumber.from(amount));
    });

    it("should work for an approved router in approved erc20", async () => {
      const amount = SEED;
      const assetId = local.address;

      const approveLiq = await local.connect(router).approve(destinationBridge.address, amount);
      await approveLiq.wait();
      const addLiq = await destinationBridge.connect(router).addLiquidity(amount, assetId);
      await addLiq.wait();

      expect(await destinationBridge.routerBalances(router.address, assetId)).to.eq(BigNumber.from(amount));
    });
  });

  describe("removeLiquidity", () => {
    // TODO: should revert if param recipient address is empty and router recipient is also empty
    xit("should revert if param recipient address is empty", async () => {
      const amount = "1";
      const assetId = ZERO_ADDRESS;

      await expect(originBridge.connect(router).removeLiquidity(amount, assetId, ZERO_ADDRESS)).to.be.revertedWith(
        "ConnextUtils__removeLiquidity_recipientEmpty",
      );
    });

    it("should revert if amount is 0", async () => {
      const amount = "0";
      const assetId = ZERO_ADDRESS;

      await expect(originBridge.connect(router).removeLiquidity(amount, assetId, router.address)).to.be.revertedWith(
        "ConnextUtils__removeLiquidity_amountIsZero",
      );
    });

    it("should revert if router balance is lower than amount", async () => {
      const amount = "1";
      const assetId = ZERO_ADDRESS;

      await expect(originBridge.connect(router).removeLiquidity(amount, assetId, router.address)).to.be.revertedWith(
        "ConnextUtils__removeLiquidity_insufficientFunds",
      );
    });

    it("happy case: removeLiquidity native token", async () => {
      const amount = "1";
      const assetId = weth.address;

      await originBridge.connect(router).addLiquidityFor(amount, ZERO_ADDRESS, router.address, { value: amount });
      expect(await originBridge.routerBalances(router.address, assetId)).to.eq(BigNumber.from(amount));

      // Get starting + expected  balance
      const startingBalance = await getOnchainBalance(ZERO_ADDRESS, router.address, ethers.provider);
      const expectedBalance = startingBalance.add(amount);

      const startingLiquidity = await originBridge.routerBalances(router.address, assetId);
      const expectedLiquidity = startingLiquidity.sub(amount);

      const tx = await originBridge.connect(router).removeLiquidity(amount, assetId, router.address);

      const receipt = await tx.wait();
      expect(receipt.status).to.be.eq(1);

      // Verify receipt events
      const liquidityRemovedTopics = connextUtils.filters.LiquidityRemoved().topics as string[];
      const liquidityRemovedEvent = connextUtils.interface.parseLog(
        receipt.logs.find((l) => l.topics.includes(liquidityRemovedTopics[0]))!,
      );
      expect(liquidityRemovedEvent.args.router).to.eq(router.address);
      expect(liquidityRemovedEvent.args.local).to.eq(assetId);
      expect(liquidityRemovedEvent.args.caller).to.eq(router.address);
      expect(liquidityRemovedEvent.args.amount).to.eq(amount);
      expect(liquidityRemovedEvent.args.to).to.eq(router.address);

      // Check liquidity
      const liquidity = await originBridge.routerBalances(router.address, assetId);
      expect(liquidity).to.be.eq(expectedLiquidity);

      // Check balance
      const finalBalance = await getOnchainBalance(ZERO_ADDRESS, router.address, ethers.provider);
      expect(finalBalance).to.be.eq(expectedBalance.sub(receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice)));
    });

    it("happy case: removeLiquidity erc20 token", async () => {
      const amount = "1";
      const assetId = local.address;

      const approveLiq = await local.connect(router).approve(destinationBridge.address, amount);
      await approveLiq.wait();
      const addLiq = await destinationBridge.connect(router).addLiquidity(amount, assetId);
      await addLiq.wait();

      expect(await destinationBridge.routerBalances(router.address, assetId)).to.eq(BigNumber.from(amount));

      // Get starting + expected  balance
      const startingBalance = await getOnchainBalance(assetId, router.address, ethers.provider);
      const expectedBalance = startingBalance.add(amount);

      const startingLiquidity = await destinationBridge.routerBalances(router.address, assetId);
      const expectedLiquidity = startingLiquidity.sub(amount);

      const tx = await destinationBridge.connect(router).removeLiquidity(amount, assetId, router.address);

      const receipt = await tx.wait();
      expect(receipt.status).to.be.eq(1);

      // Verify receipt events
      const liquidityRemovedTopics = connextUtils.filters.LiquidityRemoved().topics as string[];
      const liquidityRemovedEvent = connextUtils.interface.parseLog(
        receipt.logs.find((l) => l.topics.includes(liquidityRemovedTopics[0]))!,
      );
      expect(liquidityRemovedEvent.args.router).to.eq(router.address);
      expect(liquidityRemovedEvent.args.local).to.eq(assetId);
      expect(liquidityRemovedEvent.args.caller).to.eq(router.address);
      expect(liquidityRemovedEvent.args.amount).to.eq(amount);
      expect(liquidityRemovedEvent.args.to).to.eq(router.address);

      // Check liquidity
      const liquidity = await destinationBridge.routerBalances(router.address, assetId);
      expect(liquidity).to.be.eq(expectedLiquidity);

      // Check balance
      const finalBalance = await getOnchainBalance(assetId, router.address, ethers.provider);
      expect(finalBalance).to.be.eq(expectedBalance);
    });
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
      .setupPool(destinationAdopted.address, local.address, SEED.mul(2), SEED.mul(2));
    await swapLocal.wait();

    // Add router liquidity
    const approveLiq = await local.connect(router).approve(destinationBridge.address, parseEther("100000"));
    await approveLiq.wait();
    const addLiq = await destinationBridge.connect(router).addLiquidity(parseEther("0.1"), local.address);
    await addLiq.wait();

    // Approve user
    const approveAmt = await originAdopted.connect(user).approve(originBridge.address, parseEther("100000"));
    await approveAmt.wait();

    // Get pre-prepare balances
    const prePrepare = await Promise.all([
      originAdopted.balanceOf(user.address),
      canonical.balanceOf(originBridge.address),
    ]);

    // Prepare from the user
    const params = {
      to: user.address,
      callData: "0x",
      originDomain,
      destinationDomain,
    };
    const transactingAssetId = originAdopted.address;

    const amount = utils.parseEther("0.001");
    const prepare = await originBridge.connect(user).xcall({ params, transactingAssetId, amount });
    const prepareReceipt = await prepare.wait();

    // Check balance of user + bridge
    const postPrepare = await Promise.all([
      originAdopted.balanceOf(user.address),
      canonical.balanceOf(originBridge.address),
    ]);
    expect(postPrepare[0]).to.be.eq(prePrepare[0].sub(amount));
    expect(postPrepare[1]).to.be.eq(prePrepare[1].add(amount));

    const xcalledTopic = connextUtils.filters.XCalled().topics as string[]
    const originBridgeEvent = connextUtils.interface.parseLog(
      prepareReceipt.logs.find((l) => l.topics.includes(xcalledTopic[0]))!,
    );

    const nonce = (originBridgeEvent!.args as any).nonce;
    const message = (originBridgeEvent!.args as any).message;

    // Get pre-execute balances
    const preExecute = await Promise.all([
      destinationAdopted.balanceOf(user.address),
      destinationBridge.routerBalances(router.address, local.address),
    ]);

    // Fulfill with the router
    const routerAmount = amount.mul(9995).div(10000);
    const execute = await destinationBridge.connect(router).execute({
      params,
      nonce,
      local: local.address,
      amount,
      routers: [router.address],
      originSender: user.address,
    });
    await execute.wait();

    // Check balance of user + bridge
    const postExecute = await Promise.all([
      destinationAdopted.balanceOf(user.address),
      destinationBridge.routerBalances(router.address, local.address),
    ]);
    expect(postExecute[0]).to.be.eq(preExecute[0].add(routerAmount));
    expect(postExecute[1]).to.be.eq(preExecute[1].sub(routerAmount));

    // Reconcile via bridge
    const preReconcile = await destinationBridge.routerBalances(router.address, local.address);
    const reconcile = await destinationBridge
      .connect(admin)
      .handle(originDomain, 0, addressToBytes32(originBridge.address), message);
    await reconcile.wait();
    const postReconcile = await destinationBridge.routerBalances(router.address, local.address);
    expect(postReconcile).to.be.eq(preReconcile.add(amount));
  });

  // ETH scenario:
  // - user prepares in ETH
  // - oTM wraps
  // - router pays in local
  // - dTM swaps for adopted
  it("should work with sending native assets, receiving local representation", async () => {
    // Add router liquidity
    await destinationAdopted
      .connect(router)
      .approve(destinationBridge.address, parseEther("20"))
      .then((r) => r.wait());
    const addLiq = await destinationBridge.connect(router).addLiquidity(parseEther("1"), destinationAdopted.address);
    await addLiq.wait();

    // Get pre-prepare balances
    const preXcall = await Promise.all([user.getBalance(), weth.balanceOf(originBridge.address)]);

    // Prepare from the user
    const params = {
      to: user.address,
      callData: "0x",
      originDomain,
      destinationDomain,
    };
    const transactingAssetId = constants.AddressZero;
    const amount = utils.parseEther("0.0001");
    const prepare = await originBridge.connect(user).xcall({ params, transactingAssetId, amount }, { value: amount });
    const prepareReceipt = await prepare.wait();

    // Check balance of user + bridge
    const postXcall = await Promise.all([user.getBalance(), weth.balanceOf(originBridge.address)]);
    expect(postXcall[0]).to.be.eq(
      preXcall[0].sub(amount).sub(prepareReceipt.cumulativeGasUsed.mul(prepareReceipt.effectiveGasPrice)),
    );
    expect(postXcall[1]).to.be.eq(preXcall[1].add(amount));

    // Get the message + id from the events
    const xcalledTopic = connextUtils.filters.XCalled().topics as string[]
    const originBridgeEvent = connextUtils.interface.parseLog(
      prepareReceipt.logs.find((l) => l.topics.includes(xcalledTopic[0]))!,
    );

    const nonce = (originBridgeEvent!.args as any).nonce;
    const message = (originBridgeEvent!.args as any).message;

    // Get pre-fulfill balances
    const preFulfill = await Promise.all([
      destinationAdopted.balanceOf(user.address),
      destinationBridge.routerBalances(router.address, destinationAdopted.address),
    ]);

    // Fulfill with the router
    const routerAmount = amount.mul(9_995).div(10_000);
    const fulfill = await destinationBridge.connect(router).execute({
      params,
      nonce,
      local: destinationAdopted.address,
      amount,
      routers: [router.address],
      originSender: user.address,
    });
    await fulfill.wait();

    // Check balance of user + bridge
    const postFulfill = await Promise.all([
      destinationAdopted.balanceOf(user.address),
      destinationBridge.routerBalances(router.address, destinationAdopted.address),
    ]);
    expect(postFulfill[0]).to.be.eq(preFulfill[0].add(routerAmount));
    expect(postFulfill[1]).to.be.eq(preFulfill[1].sub(routerAmount));

    // Reconcile via bridge
    const preReconcile = await destinationBridge.routerBalances(router.address, destinationAdopted.address);
    const reconcile = await destinationBridge
      .connect(admin)
      .handle(originDomain, 0, addressToBytes32(originBridge.address), message);
    await reconcile.wait();
    const postReconcile = await destinationBridge.routerBalances(router.address, destinationAdopted.address);
    expect(postReconcile).to.be.eq(preReconcile.add(amount));
  });

  describe("multipath", () => {
    const params = {
      to: user.address,
      callData: "0x",
      originDomain,
      destinationDomain,
    };
    const amount = utils.parseEther("0.001");
    let message: any;
    let nonce: any;
    let transferId: any;
    let bridgedAmount: any;
    let reconciledTopics: any;

    beforeEach(async () => {
      await originBridge.setupRouter(router2.address, router2.address, router2.address);
      await originBridge.setupRouter(router3.address, router3.address, router3.address);
      await destinationBridge.setupRouter(router2.address, router2.address, router2.address);
      await destinationBridge.setupRouter(router3.address, router3.address, router3.address);
      // Mint to routers
      await local.mint(router2.address, parseEther("20")).then((r) => r.wait());
      await local.mint(router3.address, parseEther("20")).then((r) => r.wait());

      // Add routers liquidity
      await local.connect(router).approve(destinationBridge.address, parseEther("100000"));
      await destinationBridge.connect(router).addLiquidity(parseEther("0.1"), local.address);

      await local.connect(router2).approve(destinationBridge.address, parseEther("100000"));
      await destinationBridge.connect(router2).addLiquidity(parseEther("0.1"), local.address);

      await local.connect(router3).approve(destinationBridge.address, parseEther("100000"));
      await destinationBridge.connect(router3).addLiquidity(parseEther("0.1"), local.address);

      // Setup stable swap for adopted => canonical on origin
      await stableSwap.connect(admin).setupPool(originAdopted.address, canonical.address, SEED, SEED);

      // Setup stable swap for local => adopted on dest
      await stableSwap.connect(admin).setupPool(destinationAdopted.address, local.address, SEED.mul(2), SEED.mul(2));

      // Approve user
      await originAdopted.connect(user).approve(originBridge.address, parseEther("100000"));

      // Prepare from the user
      const transactingAssetId = originAdopted.address;
      const prepare = await originBridge.connect(user).xcall({ params, transactingAssetId, amount });
      const prepareReceipt = await prepare.wait();

      const xcalledTopic = connextUtils.filters.XCalled().topics as string[]
      const originBridgeEvent = connextUtils.interface.parseLog(
        prepareReceipt.logs.find((l) => l.topics.includes(xcalledTopic[0]))!,
      );

      nonce = originBridgeEvent.args.nonce;
      transferId = originBridgeEvent.args.transferId;
      message = originBridgeEvent.args.message;
      bridgedAmount = originBridgeEvent.args.args.bridgedAmt;

      reconciledTopics = connextUtils.filters.Reconciled().topics as string[];
    });

    const routerScenarios = [
      [router.address],
      [router.address, router2.address],
      [router.address, router2.address, router3.address],
    ];

    routerScenarios.forEach((routers) => {
      it(`should work with ${routers.length} routers`, async () => {
        // Get pre-execute balances
        const userPreExecute = await destinationAdopted.balanceOf(user.address);
        const preExecute = await getRoutersBalances(routers, destinationBridge, local.address);

        // Fulfill with the router
        const routersAmount = amount
          .mul(await destinationBridge.LIQUIDITY_FEE_NUMERATOR())
          .div(await destinationBridge.LIQUIDITY_FEE_DENOMINATOR());
        const routerProportionalAmount = routersAmount.div(routers.length);

        await destinationBridge.connect(router).execute({
          params,
          nonce,
          local: local.address,
          amount,
          routers,
          originSender: user.address,
        });

        // Check balance of user + bridge
        const userPostExecute = await destinationAdopted.balanceOf(user.address);
        const postExecute = await getRoutersBalances(routers, destinationBridge, local.address);

        expect(userPostExecute).to.be.eq(userPreExecute.add(routersAmount));
        routers.forEach((_addr, i) => {
          expect(postExecute[i]).to.be.eq(preExecute[i].sub(routerProportionalAmount));
        });

        // Reconcile via bridge
        const preReconcile = await getRoutersBalances(routers, destinationBridge, local.address);

        const reconcile = await destinationBridge
          .connect(admin)
          .handle(originDomain, 0, addressToBytes32(originBridge.address), message);

        const reconcileReceipt = await reconcile.wait();
        const reconciledEvent = connextUtils.interface.parseLog(
          reconcileReceipt.logs.find((l) => l.topics.includes(reconciledTopics[0]))!,
        );

        expect(reconciledEvent.args.transferId).eql(transferId);
        expect(reconciledEvent.args.origin).eql(originDomain);
        expect(reconciledEvent.args.asset).eql(local.address);
        expect(reconciledEvent.args.amount).eql(bridgedAmount);
        expect(reconciledEvent.args.routers).eql(routers);
        expect(reconciledEvent.args.caller).eql(admin.address);

        const routerReconciledAmount = amount.div(routers.length);

        const postReconcile = await getRoutersBalances(routers, destinationBridge, local.address);

        routers.forEach((_addr, i) => {
          expect(postReconcile[i]).to.be.eq(preReconcile[i].add(routerReconciledAmount));
        });
      });
    });

    it("should revert if one the routers does not have enough liquidity", async () => {
      // Remove all the liquidity for router3
      const currentLiq = await destinationBridge.routerBalances(router3.address, local.address);
      await destinationBridge.connect(router3).removeLiquidity(currentLiq, local.address, router3.address);

      // Fulfill with the router
      const routersAmount = amount
        .mul(await destinationBridge.LIQUIDITY_FEE_NUMERATOR())
        .div(await destinationBridge.LIQUIDITY_FEE_DENOMINATOR());
      const routers = [router.address, router2.address, router3.address];

      // Reverts on router3 math subtraction
      await expect(
        destinationBridge.connect(router).execute({
          params,
          nonce,
          local: local.address,
          amount: routersAmount,
          routers,
          originSender: user.address,
        }),
      ).to.reverted;

      // Add liquidity back
      await destinationBridge.connect(router3).addLiquidity(parseEther("0.1"), local.address);

      // Double check that now it works
      await destinationBridge.connect(router).execute({
        params,
        nonce,
        local: local.address,
        amount: routersAmount,
        routers,
        originSender: user.address,
      });
    });

    it("should revert if max routers is exceeded", async () => {
      // Update max routers
      await destinationBridge.setMaxRoutersPerTransfer(2);

      // Fulfill with the router
      const routersAmount = amount
        .mul(await destinationBridge.LIQUIDITY_FEE_NUMERATOR())
        .div(await destinationBridge.LIQUIDITY_FEE_DENOMINATOR());
      const routers = [router.address, router2.address, router3.address];

      await expect(
        destinationBridge.connect(router).execute({
          params,
          nonce,
          local: local.address,
          amount: routersAmount,
          routers,
          originSender: user.address,
        }),
      ).to.revertedWith("ConnextUtils__execute_maxRoutersExceeded()");
    });
  });
});

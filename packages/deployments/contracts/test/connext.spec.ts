import { waffle, ethers } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
use(solidity);

import {
  BridgeRouter,
  Home,
  TestERC20,
  TokenRegistry,
  Connext,
  TestBridgeMessage,
  WETH,
  UpgradeBeaconController,
  XAppConnectionManager,
  DummySwap,
  ProposedOwnableUpgradeable,
} from "../typechain-types";

import {
  asyncForEach,
  bridge,
  BridgeMessageTypes,
  deployContract,
  deployContractWithLibs,
  formatTokenId,
  getDetailsHash,
  MAX_FEE_PER_GAS,
  assertReceiptEvent,
  ZERO_ADDRESS,
  transferOwnershipOnContract,
  deployUpgradeableProxy,
  FastTransferAction,
  Message,
  getRoutersBalances,
  restoreSnapshot,
  takeSnapshot,
} from "./utils";

import { BigNumber, BigNumberish, constants, Contract, utils, Wallet } from "ethers";
import { hexZeroPad, parseEther } from "ethers/lib/utils";
import { delay, getOnchainBalance, getRandomBytes32 } from "@connext/nxtp-utils";

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
  let originBridge: BridgeRouter;
  let destinationBridge: BridgeRouter;
  let originTm: Connext;
  let destinationTm: Connext;
  let stableSwap: DummySwap;
  let home: Home;
  let bridgeMessage: TestBridgeMessage;
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

    // Deploy Connext logic libraries
    const assetLogic = await deployContract("AssetLogic");
    const connextUtils = await deployContract("ConnextUtils");
    const routerPermissionsManagerLogic = await deployContract("RouterPermissionsManagerLogic");

    // Deploy transacion managers
    originTm = await deployContractWithLibs<Connext>("Connext", {
      AssetLogic: assetLogic.address,
      ConnextUtils: connextUtils.address,
      RouterPermissionsManagerLogic: routerPermissionsManagerLogic.address,
    });
    await originTm.initialize(originDomain, originBridge.address, originTokenRegistry.address, weth.address);

    destinationTm = await deployContractWithLibs<Connext>("Connext", {
      AssetLogic: assetLogic.address,
      ConnextUtils: connextUtils.address,
      RouterPermissionsManagerLogic: routerPermissionsManagerLogic.address,
    });
    await destinationTm.initialize(
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
    const setOriginTm = await originBridge.connect(admin).setConnext(originTm.address);
    await setOriginTm.wait();
    const setDestinationTm = await destinationBridge.connect(admin).setConnext(destinationTm.address);
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
      originTm.setupRouter(router.address, router.address, router.address),
      delay(100).then((_) => destinationTm.setupRouter(router.address, router.address, router.address)),
    ]);
    await Promise.all(routers.map((r) => r.wait()));
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
      expect(originTm.address).to.be.a("string");
    });

    it("should set domain for original Connext", async () => {
      expect(await originTm.domain()).to.eq(originDomain);
    });

    it("should set Bridge Router", async () => {
      const addr = await originTm.bridgeRouter();
      expect(utils.isAddress(addr)).to.be.true;
    });

    it("should set Token Registry", async () => {
      const addr = await originTm.tokenRegistry();
      expect(utils.isAddress(addr)).to.be.true;
    });

    it("should set Wrapped Asset", async () => {
      const addr = await originTm.wrapper();
      expect(utils.isAddress(addr)).to.be.true;
    });
  });

  xdescribe("setupRouter", () => {
    it("should fail if not called by owner", async () => {
      const toAdd = Wallet.createRandom().address;
      await expect(originTm.connect(user).setupRouter(toAdd, toAdd, toAdd)).to.be.revertedWith(
        "ProposedOwnableUpgradeable__onlyOwner_notOwner",
      );
    });

    it("should fail if it is adding address0", async () => {
      const toAdd = constants.AddressZero;
      await expect(originTm.setupRouter(toAdd, toAdd, toAdd, { maxFeePerGas: MAX_FEE_PER_GAS })).to.be.revertedWith(
        "Connext__addRouter_routerEmpty",
      );
    });

    it("should fail if its already added", async () => {
      await expect(
        originTm.setupRouter(router.address, router.address, router.address, { maxFeePerGas: MAX_FEE_PER_GAS }),
      ).to.be.revertedWith("Connext__addRouter_alreadyAdded");
    });

    it("should work", async () => {
      const toAdd = Wallet.createRandom().address;
      const tx = await originTm.setupRouter(toAdd, toAdd, toAdd, { maxFeePerGas: MAX_FEE_PER_GAS });
      const receipt = await tx.wait();
      await assertReceiptEvent(receipt, "RouterAdded", { caller: receipt.from, router: toAdd });
      expect(await originTm.approvedRouters(toAdd)).to.be.true;
    });
  });

  xdescribe("removeRouter", () => {
    it("should fail if not called by owner", async () => {
      const toAdd = Wallet.createRandom().address;
      await expect(originTm.connect(user).removeRouter(toAdd)).to.be.revertedWith(
        "ProposedOwnableUpgradeable__onlyOwner_notOwner",
      );
    });

    it("should fail if it is adding address0", async () => {
      const toAdd = constants.AddressZero;
      await expect(originTm.removeRouter(toAdd, { maxFeePerGas: MAX_FEE_PER_GAS })).to.be.revertedWith(
        "Connext__removeRouter_routerEmpty",
      );
    });

    it("should fail if its already removed", async () => {
      const tx = await originTm.removeRouter(router.address, { maxFeePerGas: MAX_FEE_PER_GAS });
      await tx.wait();

      await expect(originTm.removeRouter(router.address, { maxFeePerGas: MAX_FEE_PER_GAS })).to.be.revertedWith(
        "Connext__removeRouter_notAdded",
      );
    });

    it("should work", async () => {
      const tx = await originTm.removeRouter(router.address, { maxFeePerGas: MAX_FEE_PER_GAS });
      const receipt = await tx.wait();
      assertReceiptEvent(receipt, "RouterRemoved", { caller: receipt.from, router: router.address });
      expect(await originTm.approvedRouters(router.address)).to.be.false;
    });
  });

  describe("addStableSwapPool", () => {
    it("should fail if not called by owner", async () => {
      await expect(
        originTm.connect(user).addStableSwapPool(
          {
            id: addressToBytes32(canonical.address),
            domain: originDomain,
          },
          stableSwap.address,
        ),
      ).to.be.revertedWith("ProposedOwnableUpgradeable__onlyOwner_notOwner");
    });

    it("should work", async () => {
      const tx = await originTm.addStableSwapPool(
        {
          id: addressToBytes32(canonical.address),
          domain: originDomain,
        },
        stableSwap.address,
        { maxFeePerGas: MAX_FEE_PER_GAS },
      );
      const receipt = await tx.wait();
      assertReceiptEvent(receipt, "StableSwapAdded", {
        caller: receipt.from,
        canonicalId: addressToBytes32(canonical.address).toLowerCase(),
        domain: originDomain,
        swapPool: stableSwap.address,
      });
      expect(await originTm.adoptedToLocalPools(addressToBytes32(canonical.address))).to.be.equal(stableSwap.address);
    });
  });

  describe("setupAsset", () => {
    it("should fail if not called by owner", async () => {
      await expect(
        originTm
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
      const tx = await originTm.setupAsset(
        {
          id: addressToBytes32(toAdd),
          domain: originDomain,
        },
        originAdopted.address,
        stableSwap.address,
        { maxFeePerGas: MAX_FEE_PER_GAS },
      );
      await tx.wait();

      await expect(
        originTm.setupAsset(
          {
            id: addressToBytes32(toAdd),
            domain: originDomain,
          },
          originAdopted.address,
          stableSwap.address,
          { maxFeePerGas: MAX_FEE_PER_GAS },
        ),
      ).to.be.revertedWith("Connext__addAssetId_alreadyAdded");
    });

    it("should work", async () => {
      const toAdd = Wallet.createRandom().address;
      const tx = await originTm.setupAsset(
        { id: addressToBytes32(toAdd), domain: originDomain },
        originAdopted.address,
        stableSwap.address,
        {
          maxFeePerGas: MAX_FEE_PER_GAS,
        },
      );
      const receipt = await tx.wait();
      const supported = originAdopted.address == ZERO_ADDRESS ? weth.address : originAdopted.address;
      assertReceiptEvent(receipt, "AssetAdded", {
        caller: receipt.from,
        canonicalId: addressToBytes32(toAdd).toLowerCase(),
        domain: originDomain,
        adoptedAsset: originAdopted.address,
        supportedAsset: supported,
      });

      expect(await originTm.approvedAssets(addressToBytes32(toAdd))).to.be.true;
    });
  });

  describe("removeAssetId", () => {
    it("should fail if not called by owner", async () => {
      await expect(
        originTm.connect(user).removeAssetId(addressToBytes32(canonical.address), originAdopted.address),
      ).to.be.revertedWith("ProposedOwnableUpgradeable__onlyOwner_notOwner");
    });

    it("should fail if it is not approved canonical", async () => {
      const toRemove = Wallet.createRandom().address;
      await expect(
        originTm.removeAssetId(addressToBytes32(toRemove), originAdopted.address, { maxFeePerGas: MAX_FEE_PER_GAS }),
      ).to.be.revertedWith("Connext__removeAssetId_notAdded");
    });

    it("should work", async () => {
      const toRemove = Wallet.createRandom().address;
      const addTx = await originTm.setupAsset(
        { id: addressToBytes32(toRemove), domain: originDomain },
        originAdopted.address,
        stableSwap.address,
        {
          maxFeePerGas: MAX_FEE_PER_GAS,
        },
      );
      await addTx.wait();

      const tx = await originTm.removeAssetId(addressToBytes32(toRemove), originAdopted.address, {
        maxFeePerGas: MAX_FEE_PER_GAS,
      });
      const receipt = await tx.wait();

      assertReceiptEvent(receipt, "AssetRemoved", {
        caller: receipt.from,
        canonicalId: addressToBytes32(toRemove).toLowerCase(),
      });

      expect(await originTm.approvedAssets(addressToBytes32(toRemove))).to.be.false;
      expect(await originTm.adoptedToLocalPools(addressToBytes32(toRemove))).to.be.eq(ZERO_ADDRESS);
    });
  });

  describe("addRelayerFees", () => {
    it("should work", async () => {
      const beforeRouterFee = await originTm.routerRelayerFees(router.address);
      const tx = await originTm.addRelayerFees(router.address, {
        maxFeePerGas: MAX_FEE_PER_GAS,
        value: parseEther("1"),
      });
      await tx.wait();

      expect(await originTm.routerRelayerFees(router.address)).to.be.eq(beforeRouterFee.add(parseEther("1")));
    });
  });

  describe("removeRelayerFees", () => {
    it("should work", async () => {
      const beforeRouterFee = await originTm.routerRelayerFees(router.address);
      const addTx = await originTm.addRelayerFees(router.address, {
        maxFeePerGas: MAX_FEE_PER_GAS,
        value: parseEther("1"),
      });
      await addTx.wait();

      const beforeBalance = await user.getBalance();
      const removeTx = await originTm.connect(router).removeRelayerFees(parseEther("0.5"), user.address);
      await removeTx.wait();

      expect(await originTm.routerRelayerFees(router.address)).to.be.eq(beforeRouterFee.add(parseEther("0.5")));
      expect(await user.getBalance()).to.be.eq(beforeBalance.add(parseEther("0.5")));
    });
  });

  describe("addLiquidity / addLiquidityFor", () => {
    it("should revert if router address is empty", async () => {
      const amount = "1";
      const assetId = ZERO_ADDRESS;

      await expect(originTm.connect(router).addLiquidityFor(amount, assetId, ZERO_ADDRESS)).to.be.revertedWith(
        "Connext__addLiquidityForRouter_routerEmpty",
      );
      expect(await originTm.routerBalances(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should fail if amount is 0", async () => {
      const amount = "0";
      const assetId = ZERO_ADDRESS;

      await expect(originTm.connect(router).addLiquidityFor(amount, assetId, router.address)).to.be.revertedWith(
        "Connext__addLiquidityForRouter_amountIsZero",
      );
    });

    it("should fail if it is an unapproved router && ownership isnt renounced", async () => {
      const amount = "10";
      const assetId = ZERO_ADDRESS;

      // Remove router
      const remove = await originTm.removeRouter(router.address, { maxFeePerGas: MAX_FEE_PER_GAS });
      await remove.wait();
      expect(await originTm.approvedRouters(router.address)).to.be.false;

      await expect(
        originTm.addLiquidityFor(amount, assetId, router.address, { maxFeePerGas: MAX_FEE_PER_GAS }),
      ).to.be.revertedWith("Connext__addLiquidityForRouter_badRouter");
    });

    it("should fail if its an unapproved asset && ownership isnt renounced", async () => {
      const amount = "10";
      const assetId = Wallet.createRandom().address;
      await expect(originTm.connect(router).addLiquidityFor(amount, assetId, router.address)).to.be.revertedWith(
        "Connext__addLiquidityForRouter_badAsset",
      );
    });

    it("should fail if if msg.value == 0 for native asset", async () => {
      const amount = "1";
      const assetId = ZERO_ADDRESS;

      await expect(originTm.connect(router).addLiquidityFor(amount, assetId, router.address)).to.be.revertedWith(
        "AssetLogic__transferAssetToContract_notAmount",
      );
      expect(await originTm.routerBalances(router.address, weth.address)).to.eq(BigNumber.from(0));
    });

    it("should fail if msg.value != amount for native asset", async () => {
      const amount = "1";
      const falseValue = "2";
      const assetId = ZERO_ADDRESS;

      await expect(
        originTm.connect(router).addLiquidityFor(amount, assetId, router.address, { value: falseValue }),
      ).to.be.revertedWith("AssetLogic__transferAssetToContract_notAmount");
      expect(await originTm.routerBalances(router.address, weth.address)).to.eq(BigNumber.from(0));
    });

    it("should fail if msg.value != 0 for ERC20 token", async () => {
      // addLiquidity: ETH_WITH_ERC_TRANSFER;
      const amount = "1";
      const assetId = local.address;
      await expect(
        destinationTm.connect(router).addLiquidityFor(amount, assetId, router.address, { value: amount }),
      ).to.be.revertedWith("AssetLogic__transferAssetToContract_ethWithErcTransfer");
      expect(await destinationTm.routerBalances(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should fail if transferFromERC20 fails", async () => {
      const amount = SEED * 5;
      const assetId = local.address;
      await expect(destinationTm.connect(router).addLiquidityFor(amount, assetId, router.address)).to.be.revertedWith(
        "ERC20: insufficient allowance",
      );
      expect(await destinationTm.routerBalances(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should work if it is renounced && using an unapproved router", async () => {
      const amount = "1";
      const assetId = ZERO_ADDRESS;

      // Remove asset
      const remove = await originTm.removeRouter(router.address, { maxFeePerGas: MAX_FEE_PER_GAS });
      await remove.wait();
      expect(await originTm.approvedRouters(router.address)).to.be.false;

      // Renounce ownership
      await transferOwnershipOnContract(ZERO_ADDRESS, admin, originTm as unknown as ProposedOwnableUpgradeable, admin);

      await originTm.connect(router).addLiquidityFor(amount, assetId, router.address, { value: amount });
      expect(await originTm.routerBalances(router.address, weth.address)).to.eq(BigNumber.from(amount));
    });

    it("should work for an approved router in approved native asset", async () => {
      const amount = "1";
      const assetId = ZERO_ADDRESS;
      await originTm.connect(router).addLiquidityFor(amount, assetId, router.address, { value: amount });
      expect(await originTm.routerBalances(router.address, weth.address)).to.eq(BigNumber.from(amount));
    });

    it("should work for an approved router in approved erc20", async () => {
      const amount = SEED;
      const assetId = local.address;

      const approveLiq = await local.connect(router).approve(destinationTm.address, amount);
      await approveLiq.wait();
      const addLiq = await destinationTm.connect(router).addLiquidity(amount, assetId);
      await addLiq.wait();

      expect(await destinationTm.routerBalances(router.address, assetId)).to.eq(BigNumber.from(amount));
    });
  });

  describe("removeLiquidity", () => {
    // TODO: should revert if param recipient address is empty and router recipient is also empty
    xit("should revert if param recipient address is empty", async () => {
      const amount = "1";
      const assetId = ZERO_ADDRESS;

      await expect(originTm.connect(router).removeLiquidity(amount, assetId, ZERO_ADDRESS)).to.be.revertedWith(
        "Connext__removeLiquidity_recipientEmpty",
      );
    });

    it("should revert if amount is 0", async () => {
      const amount = "0";
      const assetId = ZERO_ADDRESS;

      await expect(originTm.connect(router).removeLiquidity(amount, assetId, router.address)).to.be.revertedWith(
        "Connext__removeLiquidity_amountIsZero",
      );
    });

    it("should revert if router balance is lower than amount", async () => {
      const amount = "1";
      const assetId = ZERO_ADDRESS;

      await expect(originTm.connect(router).removeLiquidity(amount, assetId, router.address)).to.be.revertedWith(
        "Connext__removeLiquidity_insufficientFunds",
      );
    });

    it("happy case: removeLiquidity native token", async () => {
      const amount = "1";
      const assetId = weth.address;

      await originTm.connect(router).addLiquidityFor(amount, ZERO_ADDRESS, router.address, { value: amount });
      expect(await originTm.routerBalances(router.address, assetId)).to.eq(BigNumber.from(amount));

      // Get starting + expected  balance
      const startingBalance = await getOnchainBalance(ZERO_ADDRESS, router.address, ethers.provider);
      const expectedBalance = startingBalance.add(amount);

      const startingLiquidity = await originTm.routerBalances(router.address, assetId);
      const expectedLiquidity = startingLiquidity.sub(amount);

      const tx = await originTm.connect(router).removeLiquidity(amount, assetId, router.address);

      const receipt = await tx.wait();
      expect(receipt.status).to.be.eq(1);

      // Verify receipt events
      assertReceiptEvent(receipt, "LiquidityRemoved", {
        router: router.address,
        local: assetId,
        caller: router.address,
        amount,
        to: router.address,
      });

      // Check liquidity
      const liquidity = await originTm.routerBalances(router.address, assetId);
      expect(liquidity).to.be.eq(expectedLiquidity);

      // Check balance
      const finalBalance = await getOnchainBalance(ZERO_ADDRESS, router.address, ethers.provider);
      expect(finalBalance).to.be.eq(expectedBalance.sub(receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice)));
    });

    it("happy case: removeLiquidity erc20 token", async () => {
      const amount = "1";
      const assetId = local.address;

      const approveLiq = await local.connect(router).approve(destinationTm.address, amount);
      await approveLiq.wait();
      const addLiq = await destinationTm.connect(router).addLiquidity(amount, assetId);
      await addLiq.wait();

      expect(await destinationTm.routerBalances(router.address, assetId)).to.eq(BigNumber.from(amount));

      // Get starting + expected  balance
      const startingBalance = await getOnchainBalance(assetId, router.address, ethers.provider);
      const expectedBalance = startingBalance.add(amount);

      const startingLiquidity = await destinationTm.routerBalances(router.address, assetId);
      const expectedLiquidity = startingLiquidity.sub(amount);

      const tx = await destinationTm.connect(router).removeLiquidity(amount, assetId, router.address);

      const receipt = await tx.wait();
      expect(receipt.status).to.be.eq(1);

      // Verify receipt events
      assertReceiptEvent(receipt, "LiquidityRemoved", {
        router: router.address,
        local: assetId,
        caller: router.address,
        amount,
        to: router.address,
      });

      // Check liquidity
      const liquidity = await destinationTm.routerBalances(router.address, assetId);
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
    const amount = 1000;
    const prepare = await originTm.connect(user).xcall({ params, transactingAssetId, amount });
    const prepareReceipt = await prepare.wait();

    // Check balance of user + bridge
    const postPrepare = await Promise.all([
      originAdopted.balanceOf(user.address),
      canonical.balanceOf(originBridge.address),
    ]);
    expect(postPrepare[0]).to.be.eq(prePrepare[0].sub(amount));
    expect(postPrepare[1]).to.be.eq(prePrepare[1].add(amount));

    // Get the message + id from the events
    const topics = originBridge.filters.Send().topics as string[];
    const bridgeEvent = originBridge.interface.parseLog(prepareReceipt.logs.find((l) => l.topics.includes(topics[0]))!);
    const message = (bridgeEvent!.args as any).message;

    const originTmEvent = (await originTm.queryFilter(originTm.filters.XCalled())).find(
      (a) => a.blockNumber === prepareReceipt.blockNumber,
    );
    const nonce = (originTmEvent!.args as any).nonce;

    // Get pre-execute balances
    const preExecute = await Promise.all([
      destinationAdopted.balanceOf(user.address),
      destinationTm.routerBalances(router.address, local.address),
    ]);

    // Fulfill with the router
    const routerAmount = amount - 500;
    const execute = await destinationTm.connect(router).execute({
      params,
      nonce,
      local: local.address,
      amount: routerAmount,
      feePercentage: constants.Zero,
      relayerSignature: "0x",
      routers: [router.address],
      originSender: user.address,
    });
    await execute.wait();

    // Check balance of user + bridge
    const postExecute = await Promise.all([
      destinationAdopted.balanceOf(user.address),
      destinationTm.routerBalances(router.address, local.address),
    ]);
    expect(postExecute[0]).to.be.eq(preExecute[0].add(routerAmount));
    expect(postExecute[1]).to.be.eq(preExecute[1].sub(routerAmount));

    // Reconcile via bridge
    const preReconcile = await destinationTm.routerBalances(router.address, local.address);
    const reconcile = await destinationBridge
      .connect(admin)
      .handle(originDomain, 0, addressToBytes32(originBridge.address), message);
    await reconcile.wait();
    const postReconcile = await destinationTm.routerBalances(router.address, local.address);
    expect(postReconcile).to.be.eq(preReconcile.add(amount));
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

    // // Approve user
    // const approveAmt = await destinationAdopted.connect(user).approve(originTm.address, parseEther("100000"));
    // await approveAmt.wait();

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
    const amount = 1000;
    const prepare = await originTm.connect(user).xcall({ params, transactingAssetId, amount }, { value: amount });
    const prepareReceipt = await prepare.wait();

    // Check balance of user + bridge
    const postXcall = await Promise.all([user.getBalance(), weth.balanceOf(originBridge.address)]);
    expect(postXcall[0]).to.be.eq(
      preXcall[0].sub(amount).sub(prepareReceipt.cumulativeGasUsed.mul(prepareReceipt.effectiveGasPrice)),
    );
    expect(postXcall[1]).to.be.eq(preXcall[1].add(amount));

    // Get the message + id from the events
    const topics = originBridge.filters.Send().topics as string[];
    const bridgeEvent = originBridge.interface.parseLog(prepareReceipt.logs.find((l) => l.topics.includes(topics[0]))!);
    const message = (bridgeEvent!.args as any).message;

    const originTmEvent = await (
      await originTm.queryFilter(originTm.filters.XCalled())
    ).find((a) => a.blockNumber === prepareReceipt.blockNumber);
    const nonce = (originTmEvent!.args as any).nonce;

    // Get pre-fulfill balances
    const preFulfill = await Promise.all([
      destinationAdopted.balanceOf(user.address),
      destinationTm.routerBalances(router.address, local.address),
    ]);

    // Fulfill with the router
    const routerAmount = amount - 500;
    const fulfill = await destinationTm.connect(router).execute({
      params,
      nonce,
      local: local.address,
      amount: routerAmount,
      relayerSignature: "0x",
      routers: [router.address],
      originSender: user.address,
      feePercentage: constants.Zero,
    });
    await fulfill.wait();

    // Check balance of user + bridge
    const postFulfill = await Promise.all([
      destinationAdopted.balanceOf(user.address),
      destinationTm.routerBalances(router.address, local.address),
    ]);
    expect(postFulfill[0]).to.be.eq(preFulfill[0].add(routerAmount));
    expect(postFulfill[1]).to.be.eq(preFulfill[1].sub(routerAmount));

    // Reconcile via bridge
    const preReconcile = await destinationTm.routerBalances(router.address, local.address);
    const reconcile = await destinationBridge
      .connect(admin)
      .handle(originDomain, 0, addressToBytes32(originBridge.address), message);
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
    const testTokenId = await bridgeMessage.formatTokenId(tokenId.domain, tokenId.id);
    expect(testTokenId).to.be.eq(expectedToken);

    // Test detailsHash
    const tokenDetails = {
      name: await canonical.name(),
      symbol: await canonical.symbol(),
      decimals: await canonical.decimals(),
    };
    const expectedDetailsHash = getDetailsHash(tokenDetails.name, tokenDetails.symbol, tokenDetails.decimals);
    const testDetailsHash = await bridgeMessage.formatDetailsHash(
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
      externalHash: getRandomBytes32().toLowerCase(),
    };
    const serializedAction = bridge.serializeFastTransferAction(action);
    const testTransfer = await bridgeMessage.formatTransfer(
      action.recipient,
      action.amount,
      action.detailsHash,
      true,
      action.externalHash,
    );
    expect(testTransfer).to.be.eq(serializedAction);

    // Test split transfer
    const [type, recipient, recipientAddr, amount, externalHash] = await bridgeMessage.splitTransfer(testTransfer);
    expect(type).to.be.eq(action.type);
    expect(recipient).to.be.eq(action.recipient);
    expect(recipientAddr.toLowerCase()).to.be.eq(user.address.toLowerCase());
    expect(externalHash).to.be.eq(action.externalHash);
    expect(amount.toNumber()).to.be.eq(action.amount);

    // Test format message
    const transferMessage: Message = {
      tokenId,
      action,
    };
    const serializedMessage = bridge.serializeMessage(transferMessage);
    const testMessage = await bridgeMessage.formatMessage(
      expectedToken,
      serializedAction,
      BridgeMessageTypes.TOKEN_ID,
      BridgeMessageTypes.FAST_TRANSFER,
    );
    expect(testMessage).to.be.eq(serializedMessage);
  });

  describe("multipath", () => {
    const params = {
      to: user.address,
      callData: "0x",
      originDomain,
      destinationDomain,
    };
    const amount = 1000;
    let message: any;
    let nonce: any;
    let transferId: any;
    let bridgedAmount: any;
    let reconciledTopics: any;

    beforeEach(async () => {
      await originTm.setupRouter(router2.address, router2.address, router2.address);
      await originTm.setupRouter(router3.address, router3.address, router3.address);
      await destinationTm.setupRouter(router2.address, router2.address, router2.address);
      await destinationTm.setupRouter(router3.address, router3.address, router3.address);
      // Mint to routers
      await local.mint(router2.address, parseEther("20")).then((r) => r.wait());
      await local.mint(router3.address, parseEther("20")).then((r) => r.wait());

      // Add routers liquidity
      await local.connect(router).approve(destinationTm.address, parseEther("100000"));
      await destinationTm.connect(router).addLiquidity(parseEther("0.1"), local.address);

      await local.connect(router2).approve(destinationTm.address, parseEther("100000"));
      await destinationTm.connect(router2).addLiquidity(parseEther("0.1"), local.address);

      await local.connect(router3).approve(destinationTm.address, parseEther("100000"));
      await destinationTm.connect(router3).addLiquidity(parseEther("0.1"), local.address);

      // Setup stable swap for adopted => canonical on origin
      await stableSwap.connect(admin).setupPool(originAdopted.address, canonical.address, SEED, SEED);

      // Setup stable swap for local => adopted on dest
      await stableSwap.connect(admin).setupPool(destinationAdopted.address, local.address, SEED * 2, SEED * 2);

      // Approve user
      await originAdopted.connect(user).approve(originTm.address, parseEther("100000"));

      // Prepare from the user
      const transactingAssetId = originAdopted.address;
      const prepare = await originTm.connect(user).xcall({ params, transactingAssetId, amount });
      const prepareReceipt = await prepare.wait();

      // Get the message + id from the events
      const topics = originBridge.filters.Send().topics as string[];
      const bridgeEvent = originBridge.interface.parseLog(
        prepareReceipt.logs.find((l) => l.topics.includes(topics[0]))!,
      );
      message = (bridgeEvent!.args as any).message;
      bridgedAmount = (bridgeEvent!.args as any).amount;

      const originTmEvent = (await originTm.queryFilter(originTm.filters.XCalled())).find(
        (a) => a.blockNumber === prepareReceipt.blockNumber,
      );
      nonce = (originTmEvent!.args as any).nonce;
      transferId = (originTmEvent!.args as any).transferId;

      reconciledTopics = destinationTm.filters.Reconciled().topics as string[];
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
        const preExecute = await getRoutersBalances(routers, destinationTm, local.address);

        // Fulfill with the router
        const routersAmount = amount - 500;
        const routerProportionalAmount = Math.floor(routersAmount / routers.length);

        await destinationTm.connect(router).execute({
          params,
          nonce,
          local: local.address,
          amount: routersAmount,
          feePercentage: constants.Zero,
          relayerSignature: "0x",
          routers,
          originSender: user.address,
        });

        // Check balance of user + bridge
        const userPostExecute = await destinationAdopted.balanceOf(user.address);
        const postExecute = await getRoutersBalances(routers, destinationTm, local.address);

        expect(userPostExecute).to.be.eq(userPreExecute.add(routersAmount));
        routers.forEach((_addr, i) => {
          expect(postExecute[i]).to.be.eq(preExecute[i].sub(routerProportionalAmount));
        });

        // Reconcile via bridge
        const preReconcile = await getRoutersBalances(routers, destinationTm, local.address);

        const reconcile = await destinationBridge
          .connect(admin)
          .handle(originDomain, 0, addressToBytes32(originBridge.address), message);

        const reconcileReceipt = await reconcile.wait();
        const reconciledEvent = destinationTm.interface.parseLog(
          reconcileReceipt.logs.find((l) => l.topics.includes(reconciledTopics[0]))!,
        );
        expect(reconciledEvent.args.transferId).eql(transferId);
        expect(reconciledEvent.args.to).eql(user.address);
        expect(reconciledEvent.args.localAsset).eql(local.address);
        expect(reconciledEvent.args.localAmount).eql(bridgedAmount);
        expect(reconciledEvent.args.executed).eql([routers, BigNumber.from(routersAmount)]);
        expect(reconciledEvent.args.caller).eql(destinationBridge.address);

        const routerReconciledAmount = Math.floor(amount / routers.length);

        const postReconcile = await getRoutersBalances(routers, destinationTm, local.address);

        routers.forEach((_addr, i) => {
          expect(postReconcile[i]).to.be.eq(preReconcile[i].add(routerReconciledAmount));
        });
      });
    });

    it("should revert if one the routers does not have enough liquidity", async () => {
      // Remove all the liquidity for router3
      const currentLiq = await destinationTm.routerBalances(router3.address, local.address);
      await destinationTm.connect(router3).removeLiquidity(currentLiq, local.address, router3.address);

      // Fulfill with the router
      const routersAmount = amount - 500;
      const routers = [router.address, router2.address, router3.address];

      // Reverts on router3 math subtraction
      await expect(
        destinationTm.connect(router).execute({
          params,
          nonce,
          local: local.address,
          amount: routersAmount,
          feePercentage: constants.Zero,
          relayerSignature: "0x",
          routers,
          originSender: user.address,
        }),
      ).to.reverted;

      // Add liquidity back
      await destinationTm.connect(router3).addLiquidity(parseEther("0.1"), local.address);

      // Double check that now it works
      await destinationTm.connect(router).execute({
        params,
        nonce,
        local: local.address,
        amount: routersAmount,
        feePercentage: constants.Zero,
        relayerSignature: "0x",
        routers,
        originSender: user.address,
      });
    });

    it("should revert if max routers is exceeded", async () => {
      // Update max routers
      await destinationTm.setMaxRoutersPerTransfer(2);

      // Fulfill with the router
      const routersAmount = amount - 500;
      const routers = [router.address, router2.address, router3.address];

      await expect(
        destinationTm.connect(router).execute({
          params,
          nonce,
          local: local.address,
          amount: routersAmount,
          feePercentage: constants.Zero,
          relayerSignature: "0x",
          routers,
          originSender: user.address,
        }),
      ).to.revertedWith("Connext__decrementLiquidity_maxRoutersExceeded()");
    });
  });
});

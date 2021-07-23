import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { constants } from "ethers";

import { FulfillInterpreter, Counter, TransactionManager, TestERC20, ERC20 } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import FulfillInterpreterArtifact from "@connext/nxtp-contracts/artifacts/contracts/interpreters/FulfillInterpreter.sol/FulfillInterpreter.json";
import CounterArtifact from "@connext/nxtp-contracts/artifacts/contracts/test/Counter.sol/Counter.json";
import TestERC20Artifact from "@connext/nxtp-contracts/artifacts/contracts/test/TestERC20.sol/TestERC20.json";

import pino, { BaseLogger } from "pino";

const { AddressZero } = constants;
const logger: BaseLogger = pino();

const createFixtureLoader = waffle.createFixtureLoader;
describe("TransactionManager", function () {
  const [wallet, router, user, receiver] = waffle.provider.getWallets();

  const sendingChainId = 1337;
  const receivingChainId = 1338;
  const routerFunds = "1000";
  const userFunds = "100";

  let transactionManager: TransactionManager;
  let transactionManagerReceiverSide: TransactionManager;
  let counter: Counter;
  let tokenA: TestERC20;
  let tokenB: TestERC20;

  const fixture = async () => {
    const transactionManagerFactory = await ethers.getContractFactory(
      TransactionManagerArtifact.abi,
      TransactionManagerArtifact.bytecode,
      wallet,
    );
    const counterFactory = await ethers.getContractFactory(CounterArtifact.abi, CounterArtifact.bytecode, wallet);
    const testERC20Factory = await ethers.getContractFactory(TestERC20Artifact.abi, TestERC20Artifact.bytecode, wallet);

    transactionManager = (await transactionManagerFactory.deploy(sendingChainId)) as TransactionManager;
    transactionManagerReceiverSide = (await transactionManagerFactory.deploy(receivingChainId)) as TransactionManager;

    tokenA = (await testERC20Factory.deploy()) as ERC20;
    tokenB = (await testERC20Factory.deploy()) as ERC20;

    counter = (await counterFactory.deploy()) as Counter;

    return { transactionManager, transactionManagerReceiverSide, tokenA, tokenB };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;

  const addPrivileges = async (tm: TransactionManager, routers: string[], assets: string[]) => {
    for (const router of routers) {
      const tx = await tm.addRouter(router);
      await tx.wait();
      expect(await tm.approvedRouters(router)).to.be.true;
    }

    for (const assetId of assets) {
      const tx = await tm.addAssetId(assetId);
      await tx.wait();
      expect(await tm.approvedAssets(assetId)).to.be.true;
    }
  };

  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, user, receiver]);
  });

  beforeEach(async function () {
    ({ transactionManager, transactionManagerReceiverSide, tokenA, tokenB } = await loadFixture(fixture));
    await addPrivileges(transactionManager, [router.address], [AddressZero, tokenA.address, tokenB.address]);

    await tokenB.connect(wallet).transfer(router.address, routerFunds);

    await tokenA.connect(wallet).transfer(user.address, userFunds);
  });

  it("should deploy", async () => {
    expect(transactionManager.address).to.be.a("string");
    expect(tokenA.address).to.be.a("string");
    expect(tokenB.address).to.be.a("string");
  });

  describe.only("getTransactionManagerContract", () => {
    it("happy case: getTransactionManagerContract", async () => {});
  });
  describe("getActiveTransactionsByUser", () => {});
  describe("getVariantHashByInvariantData", () => {});
});

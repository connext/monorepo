import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { getRandomBytes32 } from "@connext/nxtp-utils";
import { mkAddress, PrepareParams } from "@connext/nxtp-utils";
import { Wallet, BigNumberish, Contract, utils, BigNumber } from "ethers";

import { TransactionManager, TestERC20 } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import TestERC20Artifact from "@connext/nxtp-contracts/artifacts/contracts/test/TestERC20.sol/TestERC20.json";

import pino from "pino";
import {
  getTransactionManagerContract,
  getActiveTransactionsByUser,
  getVariantHashByInvariantData,
} from "../src/helper";
const logger = pino({ level: "error" });

const createFixtureLoader = waffle.createFixtureLoader;
describe("TransactionManager", function () {
  const [wallet, router, user, receiver] = waffle.provider.getWallets();

  const sendingChainId = 1337;
  const receivingChainId = 1338;
  const routerFunds = BigNumber.from(10000).toString();
  const userFunds = BigNumber.from(100).toString();

  let transactionManager: TransactionManager;
  let transactionManagerReceiverSide: TransactionManager;
  let tokenA: TestERC20;
  let tokenB: TestERC20;

  const fixture = async () => {
    const transactionManagerFactory = await ethers.getContractFactory(
      TransactionManagerArtifact.abi,
      TransactionManagerArtifact.bytecode,
      wallet,
    );

    const testERC20Factory = await ethers.getContractFactory(TestERC20Artifact.abi, TestERC20Artifact.bytecode, wallet);

    transactionManager = (await transactionManagerFactory.deploy(sendingChainId)) as TransactionManager;
    transactionManagerReceiverSide = (await transactionManagerFactory.deploy(receivingChainId)) as TransactionManager;

    tokenA = (await testERC20Factory.deploy()) as TestERC20;
    tokenB = (await testERC20Factory.deploy()) as TestERC20;

    return { transactionManager, transactionManagerReceiverSide, tokenA, tokenB };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, user, receiver]);
  });

  beforeEach(async function () {
    ({ transactionManager, transactionManagerReceiverSide, tokenA, tokenB } = await loadFixture(fixture));

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

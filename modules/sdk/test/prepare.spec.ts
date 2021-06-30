import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { getRandomBytes32 } from "@connext/nxtp-utils";
import { constants, Wallet, BigNumberish, Contract } from "ethers";

// // import types
import { TransactionManager, TestERC20 } from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import TestERC20Artifact from "@connext/nxtp-contracts/artifacts/contracts/test/TestERC20.sol/TestERC20.json";
// import { getOnchainBalance } from "./utils";

import pino from "pino";

import { prepare } from "../src";

const { AddressZero } = constants;
const logger = pino({ level: "error" });

const createFixtureLoader = waffle.createFixtureLoader;
describe("TransactionManager", function() {
  const [wallet, router, user, receiver] = waffle.provider.getWallets();

  const sendingChainId = 31337;
  const receivingChainId = 31338;

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

    transactionManager = (await transactionManagerFactory.deploy(AddressZero, sendingChainId)) as TransactionManager;

    transactionManagerReceiverSide = (await transactionManagerFactory.deploy(
      AddressZero,
      receivingChainId,
    )) as TransactionManager;
    tokenA = (await testERC20Factory.deploy()) as TestERC20;
    tokenB = (await testERC20Factory.deploy()) as TestERC20;

    return { transactionManager, transactionManagerReceiverSide, tokenA, tokenB };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, user, receiver]);
  });

  beforeEach(async function() {
    ({ transactionManager, transactionManagerReceiverSide, tokenA, tokenB } = await loadFixture(fixture));

    const liq = "1000";
    await tokenA.connect(wallet).transfer(router.address, liq);
    await tokenB.connect(wallet).transfer(router.address, liq);

    const prepareFunds = "100";
    await tokenA.connect(wallet).transfer(user.address, prepareFunds);
    await tokenB.connect(wallet).transfer(user.address, prepareFunds);
  });

  it("should deploy", async () => {
    expect(transactionManager.address).to.be.a("string");
    expect(tokenA.address).to.be.a("string");
    expect(tokenB.address).to.be.a("string");
  });

  const approveTokens = async (amount: BigNumberish, approver: Wallet, token: Contract = tokenA) => {
    const approveTx = await token.connect(approver).approve(transactionManager.address, amount);
    await approveTx.wait();
  };

  it("happy test: prepare", async () => {
    // const userSigner = await user.provider.getSigner();

    const params = {
      amount: "1",
      expiry: (Date.now() + 10_000).toString(),
      sendingAssetId: tokenA.address,
      receivingAssetId: tokenB.address,
      receivingAddress: receiver.address,
      sendingChainId: sendingChainId,
      receivingChainId: receivingChainId,
      router: router.address,
      transactionId: getRandomBytes32(),
      signer: user,
    };

    await approveTokens(params.amount, user);

    const res = await prepare(params, transactionManager, logger);
    expect(res.status).to.be.eq(1);
  });
});

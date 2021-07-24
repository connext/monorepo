import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
use(solidity);

import { constants, Wallet } from "ethers";
import { Counter, FulfillInterpreter, RevertableERC20 } from "../../typechain";
import { getContractError } from "../../src";
import { assertReceiptEvent, getOnchainBalance } from "../utils";
import { getRandomBytes32 } from "@connext/nxtp-utils";

describe("FulfillInterpreter.sol", async () => {
  const createFixtureLoader = waffle.createFixtureLoader;
  const [wallet, other] = waffle.provider.getWallets() as Wallet[];

  let fulfillInterpreter: FulfillInterpreter;
  let counter: Counter;
  let token: RevertableERC20;

  const fixture = async () => {
    const fulfillInterpreterFactory = await ethers.getContractFactory("FulfillInterpreter");
    const counterFactory = await ethers.getContractFactory("Counter");
    const RevertableERC20Factory = await ethers.getContractFactory("RevertableERC20");

    fulfillInterpreter = (await fulfillInterpreterFactory.deploy(wallet.address)) as FulfillInterpreter;

    counter = (await counterFactory.deploy()) as Counter;
    token = (await RevertableERC20Factory.deploy()) as RevertableERC20;
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before(async () => {
    loadFixture = createFixtureLoader([wallet, other]);
  });

  beforeEach(async () => {
    await loadFixture(fixture);

    // Fund with tokens
    const liq = "10000";
    const tx = await token.connect(wallet).transfer(other.address, liq);
    await tx.wait();
  });

  describe("getTransactionManager", () => {
    it("should work", async () => {
      expect(await fulfillInterpreter.getTransactionManager()).to.be.eq(wallet.address);
    });
  });

  describe("execute", () => {
    it("should fail if not called by transaction manager", async () => {
      const amount = "1000";
      const assetId = constants.AddressZero;
      const data = counter.interface.encodeFunctionData("incrementAndSend", [assetId, wallet.address, amount]);

      await expect(
        fulfillInterpreter
          .connect(other)
          .execute(getRandomBytes32(), counter.address, assetId, other.address, amount, data),
      ).to.be.revertedWith(getContractError("onlyTransactionManager: NOT_TRANSACTION_MANAGER"));
    });

    it("should work for eth", async () => {
      const amount = "1000";
      const assetId = constants.AddressZero;
      const data = counter.interface.encodeFunctionData("incrementAndSend", [assetId, other.address, amount]);
      const transactionId = getRandomBytes32();

      const preExecute = await counter.count();
      const balance = await getOnchainBalance(assetId, other.address, ethers.provider);

      const tx = await fulfillInterpreter
        .connect(wallet)
        .execute(transactionId, counter.address, assetId, other.address, amount, data, { value: amount });
      const receipt = await tx.wait();
      assertReceiptEvent(receipt, "Executed", {
        transactionId,
        callTo: counter.address,
        assetId,
        fallbackAddress: other.address,
        amount,
        callData: data,
        returnData: "0x",
        success: true,
      });

      expect(await counter.count()).to.be.eq(preExecute.add(1));
      expect(await getOnchainBalance(assetId, other.address, ethers.provider)).to.be.eq(balance.add(amount));
    });

    it("should work for erc20", async () => {
      const amount = "1000";
      const assetId = token.address;
      const data = counter.interface.encodeFunctionData("incrementAndSend", [assetId, other.address, amount]);
      const transactionId = getRandomBytes32();

      const transferTx = await token.transfer(fulfillInterpreter.address, amount);
      await transferTx.wait();

      const preExecute = await counter.count();
      const balance = await getOnchainBalance(assetId, other.address, ethers.provider);

      const tx = await fulfillInterpreter
        .connect(wallet)
        .execute(transactionId, counter.address, assetId, other.address, amount, data);
      const receipt = await tx.wait();
      assertReceiptEvent(receipt, "Executed", {
        transactionId,
        callTo: counter.address,
        assetId,
        fallbackAddress: other.address,
        amount,
        callData: data,
        returnData: "0x",
        success: true,
      });

      expect(await counter.count()).to.be.eq(preExecute.add(1));
      expect(await getOnchainBalance(assetId, other.address, ethers.provider)).to.be.eq(balance.add(amount));
    });

    it("should send funds to fallback address if calldata fails", async () => {
      const amount = "1000";
      const assetId = token.address;
      const data = counter.interface.encodeFunctionData("incrementAndSend", [assetId, other.address, amount]);
      const transactionId = getRandomBytes32();

      const transferTx = await token.transfer(fulfillInterpreter.address, amount);
      await transferTx.wait();

      const preExecute = await counter.count();
      const balance = await getOnchainBalance(assetId, other.address, ethers.provider);
      const fallback = await getOnchainBalance(assetId, wallet.address, ethers.provider);
      const allowance = await token.allowance(counter.address, fulfillInterpreter.address);

      const shouldRevertTx = await counter.setShouldRevert(true);
      await shouldRevertTx.wait();

      const tx = await fulfillInterpreter
        .connect(wallet)
        .execute(transactionId, counter.address, assetId, wallet.address, amount, data);
      const receipt = await tx.wait();
      // TODO: whats the calldata returned when a revert happens?
      assertReceiptEvent(receipt, "Executed", {
        transactionId,
        callTo: counter.address,
        assetId,
        fallbackAddress: wallet.address,
        amount,
        callData: data,
        success: false,
      });

      // Check count was not incremented
      expect(await counter.count()).to.be.eq(preExecute);
      // Check that the intended recipient did not receive funds
      expect(await getOnchainBalance(assetId, other.address, ethers.provider)).to.be.eq(balance);
      // Check that the fallback got funds
      expect(await getOnchainBalance(assetId, wallet.address, ethers.provider)).to.be.eq(fallback.add(amount));
      // Check that the allowance was reset
      expect(await token.allowance(counter.address, fulfillInterpreter.address)).to.be.eq(allowance);
    });
  });
});

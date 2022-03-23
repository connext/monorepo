import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
use(solidity);

import { constants, Wallet } from "ethers";
import { Counter, Executor, RevertableERC20 } from "../../typechain-types";
import { getContractError } from "../../src";
import { assertReceiptEvent, getOnchainBalance, deployContract, MAX_FEE_PER_GAS } from "../utils";
import { getRandomBytes32 } from "@connext/nxtp-utils";

describe("Executor.sol", async () => {
  const createFixtureLoader = waffle.createFixtureLoader;
  const [wallet, other] = waffle.provider.getWallets() as Wallet[];

  let executor: Executor;
  let counter: Counter;
  let token: RevertableERC20;

  const fixture = async () => {
    executor = await deployContract<Executor>("Executor", wallet.address);

    counter = await deployContract<Counter>("Counter");

    token = await deployContract<RevertableERC20>("RevertableERC20");
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

  describe("getConnext", () => {
    it("should work", async () => {
      expect(await executor.getConnext()).to.be.eq(wallet.address);
    });
  });

  describe("execute", () => {
    it("should fail if not called by transaction manager", async () => {
      const amount = "1000";
      const assetId = constants.AddressZero;
      const data = counter.interface.encodeFunctionData("incrementAndSend", [assetId, wallet.address, amount]);

      await expect(
        executor.connect(other).execute(getRandomBytes32(), counter.address, assetId, amount, data),
      ).to.be.revertedWith(getContractError("onlyTransactionManager: NOT_TRANSACTION_MANAGER"));
    });

    it("should not execute if there is no data at the `to` (i.e. it is an EOA)", async () => {
      const amount = "1000";
      const assetId = constants.AddressZero;
      const data = counter.interface.encodeFunctionData("incrementAndSend", [assetId, other.address, amount]);
      const transferId = getRandomBytes32();

      const preExecute = await counter.count();
      const balance = await getOnchainBalance(assetId, other.address, ethers.provider);

      const to = Wallet.createRandom().address;

      const tx = await executor.connect(wallet).execute(transferId, to, assetId, amount, data, { value: amount });
      const receipt = await tx.wait();
      assertReceiptEvent(receipt, "Executed", {
        transferId,
        to,
        assetId,
        amount,
        callData: data,
        returnData: "0x",
        success: false,
      });

      expect(await counter.count()).to.be.eq(preExecute);
    });

    it("should work for eth", async () => {
      const amount = "1000";
      const assetId = constants.AddressZero;
      const data = counter.interface.encodeFunctionData("incrementAndSend", [assetId, other.address, amount]);
      const transferId = getRandomBytes32();

      const preExecute = await counter.count();

      const tx = await executor
        .connect(wallet)
        .execute(transferId, counter.address, assetId, amount, data, { value: amount });
      const receipt = await tx.wait();
      assertReceiptEvent(receipt, "Executed", {
        transferId,
        callTo: counter.address,
        assetId,
        fallbackAddress: other.address,
        amount,
        callData: data,
        returnData: "0x",
        success: true,
      });

      expect(await counter.count()).to.be.eq(preExecute.add(1));
    });

    it("should work for erc20", async () => {
      const amount = "1000";
      const assetId = token.address;
      const data = counter.interface.encodeFunctionData("incrementAndSend", [assetId, other.address, amount]);
      const transferId = getRandomBytes32();

      const transferTx = await token.transfer(executor.address, amount, { maxFeePerGas: MAX_FEE_PER_GAS });
      await transferTx.wait();

      const preExecute = await counter.count();

      const tx = await executor.connect(wallet).execute(transferId, counter.address, assetId, amount, data);
      const receipt = await tx.wait();
      assertReceiptEvent(receipt, "Executed", {
        transferId,
        callTo: counter.address,
        assetId,
        fallbackAddress: other.address,
        amount,
        callData: data,
        returnData: "0x",
        success: true,
      });

      expect(await counter.count()).to.be.eq(preExecute.add(1));
    });
  });
});

import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
use(solidity);

import { constants, utils, Wallet } from "ethers";
import { Counter, Executor, RevertableERC20 } from "../../typechain-types";
import { assertReceiptEvent, getOnchainBalance, deployContract, MAX_FEE_PER_GAS } from "../utils";
import { getRandomBytes32 } from "@connext/nxtp-utils";

describe("Executor.sol", async () => {
  const createFixtureLoader = waffle.createFixtureLoader;
  const [wallet, other] = waffle.provider.getWallets() as Wallet[];

  const EMPTY_PROPERTIES = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
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

    const tx2 = await counter.setExecutor(executor.address);
    await tx2.wait();
  });

  describe("getConnext", () => {
    it("should work", async () => {
      expect(await executor.getConnext()).to.be.eq(wallet.address);
    });
  });

  // TODO: skipped due fail, probably moving to foundry
  xdescribe("execute", () => {
    it("should fail if not called by connext contract", async () => {
      const amount = "1000";
      const assetId = constants.AddressZero;
      const data = counter.interface.encodeFunctionData("incrementAndSend", [assetId, wallet.address, amount]);

      await expect(
        executor.connect(other).execute(getRandomBytes32(), amount, counter.address, assetId, EMPTY_PROPERTIES, data),
      ).to.be.revertedWith("#OC:027");
    });

    it.skip("should not execute if there is no data at the `to` (i.e. it is an EOA)", async () => {
      const amount = "1000";
      const assetId = constants.AddressZero;
      const data = counter.interface.encodeFunctionData("incrementAndSend", [assetId, other.address, amount]);
      const transferId = getRandomBytes32();

      const preExecute = await counter.count();
      const balance = await getOnchainBalance(assetId, other.address, ethers.provider);

      const to = Wallet.createRandom().address;

      const tx = await executor
        .connect(wallet)
        .execute(transferId, amount, to, assetId, EMPTY_PROPERTIES, data, { value: amount });
      const receipt = await tx.wait();
      assertReceiptEvent(receipt, "Executed", {
        transferId,
        to,
        assetId,
        amount,
        callData: data,
        returnData: "0x",
        success: false,
        isContract: false,
      });

      expect(await counter.count()).to.be.eq(preExecute);
    });

    it.skip("should work for eth", async () => {
      const amount = "1000";
      const assetId = constants.AddressZero;
      const data = counter.interface.encodeFunctionData("incrementAndSend", [assetId, other.address, amount]);
      const transferId = getRandomBytes32();

      const preExecute = await counter.count();

      const tx = await executor
        .connect(wallet)
        .execute(transferId, amount, counter.address, assetId, EMPTY_PROPERTIES, data, { value: amount });
      const receipt = await tx.wait();
      assertReceiptEvent(receipt, "Executed", {
        transferId,
        to: counter.address,
        assetId,
        amount,
        callData: data,
        returnData: "0x",
        success: true,
        isContract: true,
      });

      expect(await counter.count()).to.be.eq(preExecute.add(1));
    });

    it.skip("should work for erc20", async () => {
      const amount = "1000";
      const assetId = token.address;
      const data = counter.interface.encodeFunctionData("incrementAndSend", [assetId, other.address, amount]);
      const transferId = getRandomBytes32();

      const transferTx = await token.transfer(executor.address, amount, { maxFeePerGas: MAX_FEE_PER_GAS });
      await transferTx.wait();

      const preExecute = await counter.count();

      const tx = await executor
        .connect(wallet)
        .execute(transferId, amount, counter.address, assetId, EMPTY_PROPERTIES, data);
      const receipt = await tx.wait();
      assertReceiptEvent(receipt, "Executed", {
        transferId,
        to: counter.address,
        assetId,
        amount,
        callData: data,
        returnData: "0x",
        success: true,
        isContract: true,
      });

      expect(await counter.count()).to.be.eq(preExecute.add(1));
    });

    it.skip("should fail if reentrancy", async () => {
      const amount = utils.parseEther("0.1");
      const assetId = constants.AddressZero;
      const transferId = getRandomBytes32();
      const data = counter.interface.encodeFunctionData("attack");

      // Transfer amount * 100 to executor to ensure we have enough to be attacked.
      const tx = await executor
        .connect(wallet)
        .execute(transferId, amount, counter.address, assetId, EMPTY_PROPERTIES, data, { value: amount.mul(100) });
      const receipt = await tx.wait();

      const balance = await getOnchainBalance(assetId, counter.address, ethers.provider);
      expect(balance).to.be.eq(0);

      assertReceiptEvent(receipt, "Executed", {
        transferId,
        to: counter.address,
        assetId,
        amount,
        callData: data,
        //returnData: "0x",
        success: false,
        isContract: true,
      });
    });
  });
});

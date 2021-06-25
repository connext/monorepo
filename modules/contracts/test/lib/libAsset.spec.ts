import { ethers, waffle } from "hardhat";
// import { Signer } from "ethers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

// import types
import { LibAssetTest } from "../../typechain/LibAssetTest";
import { TestERC20 } from "../../typechain/TestERC20";
import { BigNumber, constants } from "ethers";

const { AddressZero } = constants;

const createFixtureLoader = waffle.createFixtureLoader;
describe("LibAsset", function () {
  const [wallet, other, receiver] = waffle.provider.getWallets();

  let libAssetTest: LibAssetTest;
  let token: TestERC20;

  const fixture = async () => {
    const libAssetTestFactory = await ethers.getContractFactory("LibAssetTest");
    const testERC20Factory = await ethers.getContractFactory("TestERC20");

    libAssetTest = (await libAssetTestFactory.deploy()) as LibAssetTest;
    token = (await testERC20Factory.deploy()) as TestERC20;
    return { libAssetTest, token };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, other]);
  });

  beforeEach(async function () {
    ({ libAssetTest, token } = await loadFixture(fixture));
  });

  it("should deploy", async () => {
    console.log("Address", libAssetTest.address);
    console.log("TestERC20 Address", token.address);
    expect(libAssetTest.address).to.be.a("string");
    expect(token.address).to.be.a("string");
  });

  describe("#isEther", () => {
    it("should error if params is not address", async () => {
      await expect(libAssetTest.isEther("0x")).to.be.reverted;
    });

    it("should return true if assetId is AddressZero", async () => {
      const res = await libAssetTest.isEther(AddressZero);
      expect(res).to.be.true;
    });

    it("should return false if assetId is Non-AddressZero", async () => {
      const res = await libAssetTest.isEther("0x0f5d2fb29fb7d3cfee444a200298f468908cc942");
      expect(res).to.be.false;
    });
  });

  describe("#getOwnBalance", () => {
    it("should error if params is not address", async () => {
      await expect(libAssetTest.getOwnBalance("0x")).to.be.reverted;
    });

    it("should error if erc20 contract doesn't exist", async () => {
      await expect(libAssetTest.getOwnBalance("0x0f5d2fb29fb7d3cfee444a200298f468908cc940")).to.be.reverted;
    });

    it("should return native asset balance if AddressZero", async () => {
      const res = await libAssetTest.getOwnBalance(AddressZero);
      expect(BigNumber.isBigNumber(res)).to.be.true;
    });

    it.skip("should return Erc20 asset balance if Non-AddressZero", async () => {
      const Erc20TokenAddress = "";
      const res = await libAssetTest.getOwnBalance(Erc20TokenAddress);
      expect(BigNumber.isBigNumber(res)).to.be.true;
    });
  });

  describe("#transferEther", () => {
    it("should error if param recipient is not payable", async () => {
      await expect(libAssetTest.transferEther(AddressZero, "1")).to.be.reverted;
    });
    it.skip("should error if recipient call fails", async () => {});

    it.skip("happy case: transferEther", async () => {
      const amount = BigNumber.from(1);
      const res = await libAssetTest.connect(wallet).transferEther(receiver.address, amount, { from: wallet.address });
      console.log(res);
    });
  });

  describe("#transferERC20", () => {
    it.skip("happy case: transferERC20", async () => {
      const balanceOfWallet = await token.balanceOf(wallet.address);
      console.log(balanceOfWallet.toString());

      const res = await libAssetTest
        .connect(wallet)
        .transferERC20(token.address, receiver.address, BigNumber.from(1), { from: wallet.address });
      console.log(res);
    });
  });
});

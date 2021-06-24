import { ethers, waffle } from "hardhat";
// import { Signer } from "ethers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

// import types
import { LibERC20Test } from "../../typechain/LibERC20Test";
import { TestERC20 } from "../../typechain/TestERC20";

const createFixtureLoader = waffle.createFixtureLoader;

describe("LibErc20", function() {
  const [wallet, other, receiver] = waffle.provider.getWallets();

  let libERC20Test: LibERC20Test;
  let token: TestERC20;

  const fixture = async () => {
    const libERC20TestFactory = await ethers.getContractFactory("LibERC20Test");
    const testERC20Factory = await ethers.getContractFactory("TestERC20");

    libERC20Test = (await libERC20TestFactory.deploy()) as LibERC20Test;
    token = (await testERC20Factory.deploy()) as TestERC20;
    return { libERC20Test, token };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, other, receiver]);
  });

  beforeEach(async function() {
    ({ libERC20Test, token } = await loadFixture(fixture));
  });

  it("should deploy", async () => {
    console.log("LibERC20 Address", libERC20Test.address);
    console.log("TestERC20 Address", token.address);
    expect(libERC20Test.address).to.be.a("string");
    expect(token.address).to.be.a("string");
  });

  describe("#wrapCall", () => {
    it.skip("should error if asset doesn't exist", async () => {});
    it.skip("should error if params are buggy", async () => {});
  });

  describe("#approve", () => {
    it.skip("should error if params are buggy", async () => {});
    it("happy case:approve", async () => {
      const res = await libERC20Test.connect(wallet).approve(token.address, other.address, "1");
      console.log(res);
    });
  });

  describe("#transferFrom", () => {
    it.skip("should error if params are buggy", async () => {});
    it("happy case:transferFrom", async () => {
      const approveRes = await token.connect(wallet).approve(other.address, "1");
      console.log(approveRes);

      const res = await libERC20Test.connect(other).transferFrom(token.address, wallet.address, receiver.address, "1");
      console.log(res);
    });
  });

  describe("#transfer", () => {
    it.skip("should error if params are buggy", async () => {});
    it("happy case: transfer", async () => {
      const balanceOfWallet = await token.balanceOf(wallet.address);
      console.log(balanceOfWallet.toString());

      const res = await libERC20Test.connect(wallet).transfer(token.address, receiver.address, "1");
      console.log(res);
    });
  });
});

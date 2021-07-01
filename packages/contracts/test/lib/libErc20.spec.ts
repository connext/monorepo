import { ethers, waffle } from "hardhat";
// import { Signer } from "ethers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";

use(solidity);

// import types
import { LibERC20Test } from "../../typechain/LibERC20Test";
import { TestERC20 } from "../../typechain/TestERC20";

const createFixtureLoader = waffle.createFixtureLoader;

describe("LibErc20", function () {
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

  beforeEach(async function () {
    ({ libERC20Test, token } = await loadFixture(fixture));
  });

  it("should deploy", async () => {
    expect(libERC20Test.address).to.be.a("string");
    expect(token.address).to.be.a("string");
  });

  describe("#approve", () => {
    it("happy case:approve", async () => {
      await libERC20Test.connect(wallet).approve(token.address, other.address, "1");
    });
  });

  describe("#transferFrom", () => {
    it("happy case: transferFrom", async () => {
      const approveRes = await token.connect(wallet).approve(libERC20Test.address, "1");
      await approveRes.wait();

      const res = await libERC20Test.connect(wallet).transferFrom(token.address, wallet.address, receiver.address, "1");
      await res.wait();
    });
  });

  describe("#transfer", () => {
    it.skip("happy case: transfer", async () => {
      const amount = BigNumber.from(1);
      const res = await libERC20Test.connect(wallet).transfer(token.address, receiver.address, amount);
      await res.wait();
    });
  });
});

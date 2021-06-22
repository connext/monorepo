import { ethers, waffle } from "hardhat";
// import { Signer } from "ethers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

// import { AddressZero } from "@ethersproject/constants";

// import types
import { LibERC20Test } from "../../typechain/LibERC20Test";

describe("LibErc20", function() {
  let libERC20Test: LibERC20Test;

  const fixture = async () => {
    const libERC20TestFactory = await ethers.getContractFactory("LibERC20Test");
    return (await libERC20TestFactory.deploy()) as LibERC20Test;
  };
  beforeEach(async function() {
    libERC20Test = await waffle.loadFixture(fixture);
  });

  it("should deploy", async () => {
    console.log("Address", libERC20Test.address);
    expect(libERC20Test.address).to.be.a("string");
  });
});

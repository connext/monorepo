import { ethers, waffle } from "hardhat";
// import { Signer } from "ethers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

// import { AddressZero } from "@ethersproject/constants";

// import types
import { LibIterableMappingTest } from "../../typechain/LibIterableMappingTest";

describe("LibErc20", function() {
  let libIterableMappingTest: LibIterableMappingTest;

  const fixture = async () => {
    const libIterableMappingTestFactory = await ethers.getContractFactory("LibIterableMappingTest");
    return (await libIterableMappingTestFactory.deploy()) as LibIterableMappingTest;
  };
  beforeEach(async function() {
    libIterableMappingTest = await waffle.loadFixture(fixture);
  });

  it("should deploy", async () => {
    console.log("Address", libIterableMappingTest.address);
    expect(libIterableMappingTest.address).to.be.a("string");
  });
});

import { ethers, waffle } from "hardhat";
// import { Signer } from "ethers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

// import { AddressZero } from "@ethersproject/constants";

// import types
import { LibAssetTest } from "../../typechain/LibAssetTest";

describe("LibAsset", function() {
  let libAssetTest: LibAssetTest;

  const fixture = async () => {
    const libAssetTestFactory = await ethers.getContractFactory("LibAssetTest");
    return (await libAssetTestFactory.deploy()) as LibAssetTest;
  };
  beforeEach(async function() {
    libAssetTest = await waffle.loadFixture(fixture);
  });

  it("should deploy", async () => {
    console.log("Address", libAssetTest.address);
    expect(libAssetTest.address).to.be.a("string");
  });
});

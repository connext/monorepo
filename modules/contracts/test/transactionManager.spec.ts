import { ethers } from "hardhat";
import { Signer } from "ethers";
// import { expect } from "chai";

// import { Contract } from "@ethersproject/contracts";

// // import artifact
// // import { TransactionManager } from "../src/artifacts";

// describe("TransactionManager", function () {
//   // let transactionManager: Contract;

//   beforeEach(async function () {
//     // transactionManager = await (ethers as any).getContract("TransactionManager", signer);
//   });

//   // it("should deploy", async () => {
//   //   expect(transactionManager.address).to.be.a("string");
//   // });

//   it("should do something right", async function () {
//     // Do something with the accounts
//   });
// });

describe("Token", function () {
  let accounts: Signer[];

  beforeEach(async function () {
    accounts = await ethers.getSigners();
  });

  it("should do something right", async function () {
    // Do something with the accounts
    console.log(accounts);
  });
});

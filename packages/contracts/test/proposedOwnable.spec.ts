import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
use(solidity);

import { constants, Wallet } from "ethers";

import { ProposedOwnable } from "../typechain";
import { proposeNewOwnerOnContract, transferOwnershipOnContract } from "./utils";

const createFixtureLoader = waffle.createFixtureLoader;
describe("ProposedOwnable.sol", () => {
  const [wallet, other] = waffle.provider.getWallets() as Wallet[];
  let proposedOwnable: ProposedOwnable;

  const fixture = async () => {
    // Deploy transaction manager because it inherits the contract
    // we want to test
    const transactionManagerFactory = await ethers.getContractFactory("TransactionManager");

    proposedOwnable = (await transactionManagerFactory.deploy(1337)) as ProposedOwnable;
  };

  const proposeNewOwner = async (newOwner: string = constants.AddressZero) => {
    // Propose new owner
    return await proposeNewOwnerOnContract(newOwner, proposedOwnable);
  };

  const transferOwnership = async (newOwner: string = constants.AddressZero, caller = other) => {
    await transferOwnershipOnContract(newOwner, caller, proposedOwnable);
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, other]);
  });

  beforeEach(async () => {
    await loadFixture(fixture);
  });

  describe("owner", () => {
    it("should work", async () => {
      expect(await proposedOwnable.owner()).to.be.eq(wallet.address);
    });
  });

  describe("proposed", () => {
    it("should work", async () => {
      expect(await proposedOwnable.proposed()).to.be.eq(constants.AddressZero);
      await proposeNewOwner(other.address);
      expect(await proposedOwnable.proposed()).to.be.eq(other.address);
    });
  });

  describe("proposedTimestamp", () => {
    it("should work", async () => {
      expect(await proposedOwnable.proposedTimestamp()).to.be.eq(constants.Zero);
      const receipt = await proposeNewOwner(other.address);
      const block = await ethers.provider.getBlock(receipt.blockNumber);
      expect(await proposedOwnable.proposedTimestamp()).to.be.eq(block.timestamp);
    });
  });

  describe("renounced", () => {
    it("should return false if owner is not renounced", async () => {
      expect(await proposedOwnable.renounced()).to.be.false;
    });

    it("should return true if owner is renounced", async () => {
      // Propose new owner of address(0)
      await transferOwnership(constants.AddressZero, wallet);

      // Check renounced
      expect(await proposedOwnable.renounced()).to.be.true;
    });
  });

  describe("delay", () => {
    it("should work", async () => {
      expect(await proposedOwnable.delay()).to.be.eq(7 * 24 * 60 * 60);
    });
  });

  describe("proposeNewOwner", () => {
    it("should fail if not called by owner", async () => {
      await expect(proposedOwnable.connect(other).proposeNewOwner(constants.AddressZero)).to.be.revertedWith("#OO:029");
    });
    it("should work", async () => {
      await proposeNewOwner(other.address);
    });
  });

  describe("acceptProposedOwner", () => {
    it("should fail if not called by proposed", async () => {
      await proposeNewOwner(other.address);
      await expect(proposedOwnable.connect(wallet).acceptProposedOwner()).to.be.revertedWith("#OP:035");
    });

    it("should fail if delay has not elapsed", async () => {
      await proposeNewOwner(other.address);
      await expect(proposedOwnable.connect(other).acceptProposedOwner()).to.be.revertedWith("#APO:030");
    });

    it("should work", async () => {
      await transferOwnership(other.address, other);
    });
  });
});

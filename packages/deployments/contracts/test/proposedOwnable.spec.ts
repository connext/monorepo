import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
use(solidity);

import { constants, Wallet } from "ethers";

import { ProposedOwnableUpgradeable, TestProposedOwnable } from "../src/typechain-types";
import {
  deployBeaconProxy,
  proposeNewOwnerOnContract,
  setBlockTime,
  transferOwnershipOnContract,
  upgradeBeaconProxy,
} from "./utils";

const createFixtureLoader = waffle.createFixtureLoader;
describe("ProposedOwnable.sol", () => {
  const [wallet, other] = waffle.provider.getWallets() as Wallet[];
  let proposedOwnable: TestProposedOwnable, beaconAddress: string;

  const fixture = async () => {
    // we want to test
    [proposedOwnable, beaconAddress] = await deployBeaconProxy<TestProposedOwnable>("TestProposedOwnable", [5]);
  };

  const proposeNewOwner = async (newOwner: string = constants.AddressZero) => {
    // Propose new owner
    return await proposeNewOwnerOnContract(newOwner, wallet, proposedOwnable as unknown as ProposedOwnableUpgradeable);
  };

  const transferOwnership = async (newOwner: string = constants.AddressZero, caller = other) => {
    await transferOwnershipOnContract(
      newOwner,
      caller,
      proposedOwnable as unknown as ProposedOwnableUpgradeable,
      wallet,
    );
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, other]);
  });

  beforeEach(async () => {
    await loadFixture(fixture);
  });

  describe("upgradeable", () => {
    it("should work", async () => {
      await proposedOwnable.setValue(10);
      const upgraded = await upgradeBeaconProxy("TestProposedOwnable", beaconAddress);
      expect(upgraded).to.be.true;
      const upgradedInstance = (await ethers.getContractFactory("TestProposedOwnable")).attach(proposedOwnable.address);
      expect(await upgradedInstance.getValue()).to.be.eq(10);
      await proposedOwnable.setValue(15);
      expect(await upgradedInstance.getValue()).to.be.eq(15);
    });
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

  describe("delay", () => {
    it("should work", async () => {
      expect(await proposedOwnable.delay()).to.be.eq(7 * 24 * 60 * 60);
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

  describe("proposeNewOwner", () => {
    it("should fail if not called by owner", async () => {
      await expect(proposedOwnable.connect(other).proposeNewOwner(constants.AddressZero)).to.be.revertedWith(
        "ProposedOwnable__onlyOwner_notOwner",
      );
    });

    it("should fail if proposing the same address as what is already proposed", async () => {
      await proposeNewOwner(other.address);
      await expect(proposedOwnable.connect(wallet).proposeNewOwner(other.address)).to.be.revertedWith(
        "ProposedOwnable__proposeNewOwner_invalidProposal",
      );
    });

    it("should fail if proposing the owner", async () => {
      await expect(proposedOwnable.connect(wallet).proposeNewOwner(wallet.address)).to.be.revertedWith(
        "ProposedOwnable__proposeNewOwner_noOwnershipChange",
      );
    });

    it("should work", async () => {
      await proposeNewOwner(other.address);
    });
  });

  describe("renounceOwnership", () => {
    it("should fail if there was no proposal", async () => {
      await expect(proposedOwnable.connect(wallet).renounceOwnership()).to.be.revertedWith(
        "ProposedOwnable__renounceOwnership_noProposal",
      );
    });

    it("should fail if the delay hasnt elapsed", async () => {
      await proposeNewOwner(constants.AddressZero);
      await expect(proposedOwnable.connect(wallet).renounceOwnership()).to.be.revertedWith(
        "ProposedOwnable__renounceOwnership_delayNotElapsed",
      );
    });

    it("should fail if the proposed != address(0)", async () => {
      await proposeNewOwner(Wallet.createRandom().address);

      // Advance block time
      const eightDays = 8 * 24 * 60 * 60;
      const { timestamp } = await ethers.provider.getBlock("latest");
      await setBlockTime(timestamp + eightDays);

      await expect(proposedOwnable.connect(wallet).renounceOwnership()).to.be.revertedWith(
        "ProposedOwnable__renounceOwnership_invalidProposal",
      );
    });

    it("should fail if not called by owner", async () => {
      await proposeNewOwner(constants.AddressZero);
      await expect(proposedOwnable.connect(other).renounceOwnership()).to.be.revertedWith(
        "ProposedOwnable__onlyOwner_notOwner",
      );
    });

    it("should work", async () => {
      await transferOwnership(constants.AddressZero, wallet);
    });
  });

  describe("acceptProposedOwner", () => {
    it("should fail if not called by proposed", async () => {
      await proposeNewOwner(other.address);
      await expect(proposedOwnable.connect(wallet).acceptProposedOwner()).to.be.revertedWith(
        "ProposedOwnable__onlyProposed_notProposedOwner",
      );
    });

    it("should fail if delay has not elapsed", async () => {
      await proposeNewOwner(other.address);
      await expect(proposedOwnable.connect(other).acceptProposedOwner()).to.be.revertedWith(
        "ProposedOwnable__acceptProposedOwner_delayNotElapsed",
      );
    });

    it("should work", async () => {
      await transferOwnership(other.address, other);
    });
  });
});

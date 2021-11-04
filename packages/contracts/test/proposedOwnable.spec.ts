import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
use(solidity);

import { constants, providers, Wallet } from "ethers";

import { ProposedOwnable } from "../typechain";
import {
  assertReceiptEvent,
  deployContract,
  proposeNewOwnerOnContract,
  setBlockTime,
  transferOwnershipOnContract,
} from "./utils";

const createFixtureLoader = waffle.createFixtureLoader;
describe("ProposedOwnable.sol", () => {
  const [wallet, other] = waffle.provider.getWallets() as Wallet[];
  let proposedOwnable: ProposedOwnable;

  const fixture = async () => {
    // Deploy transaction manager because it inherits the contract
    // we want to test
    proposedOwnable = await deployContract<ProposedOwnable>("TransactionManager", 1337);
  };

  const proposeNewOwner = async (newOwner: string = constants.AddressZero) => {
    // Propose new owner
    return await proposeNewOwnerOnContract(newOwner, wallet, proposedOwnable);
  };

  const proposeRouterOwnershipRenunciation = async () => {
    // Propose new owner
    const tx = await proposedOwnable.connect(wallet).proposeRouterOwnershipRenunciation();
    const receipt: providers.TransactionReceipt = await tx.wait();
    const block = await ethers.provider.getBlock(receipt.blockNumber);
    assertReceiptEvent(receipt, "RouterOwnershipRenunciationProposed", { timestamp: block.timestamp });
    expect(await proposedOwnable.routerOwnershipTimestamp()).to.be.eq(block.timestamp);
  };

  const proposeAssetOwnershipRenunciation = async () => {
    // Propose new owner
    const tx = await proposedOwnable.connect(wallet).proposeAssetOwnershipRenunciation();
    const receipt: providers.TransactionReceipt = await tx.wait();
    const block = await ethers.provider.getBlock(receipt.blockNumber);
    assertReceiptEvent(receipt, "AssetOwnershipRenunciationProposed", { timestamp: block.timestamp });
    expect(await proposedOwnable.assetOwnershipTimestamp()).to.be.eq(block.timestamp);
    return receipt;
  };

  const proposeConditionOwnershipRenunciation = async () => {
    // Propose new owner
    const tx = await proposedOwnable.connect(wallet).proposeConditionOwnershipRenunciation();
    const receipt: providers.TransactionReceipt = await tx.wait();
    const block = await ethers.provider.getBlock(receipt.blockNumber);
    assertReceiptEvent(receipt, "ConditionOwnershipRenunciationProposed", { timestamp: block.timestamp });
    expect(await proposedOwnable.conditionOwnershipTimestamp()).to.be.eq(block.timestamp);
    return receipt;
  };

  const transferOwnership = async (newOwner: string = constants.AddressZero, caller = other) => {
    await transferOwnershipOnContract(newOwner, caller, proposedOwnable, wallet);
  };

  const renounceAssetOwnership = async () => {
    await proposeAssetOwnershipRenunciation();
    // Advance block time
    const eightDays = 8 * 24 * 60 * 60;
    const { timestamp } = await ethers.provider.getBlock("latest");
    await setBlockTime(timestamp + eightDays);

    const tx = await proposedOwnable.connect(wallet).renounceAssetOwnership();
    const receipt = await tx.wait();
    assertReceiptEvent(receipt, "AssetOwnershipRenounced", { renounced: true });
  };

  const renounceRouterOwnership = async () => {
    await proposeRouterOwnershipRenunciation();

    // Advance block time
    const eightDays = 8 * 24 * 60 * 60;
    const { timestamp } = await ethers.provider.getBlock("latest");
    await setBlockTime(timestamp + eightDays);

    const tx = await proposedOwnable.connect(wallet).renounceRouterOwnership();
    const receipt = await tx.wait();
    assertReceiptEvent(receipt, "RouterOwnershipRenounced", { renounced: true });
    expect(await proposedOwnable.routerOwnershipTimestamp()).to.be.eq(constants.Zero);
  };

  const renounceConditionOwnership = async () => {
    await proposeConditionOwnershipRenunciation();

    // Advance block time
    const eightDays = 8 * 24 * 60 * 60;
    const { timestamp } = await ethers.provider.getBlock("latest");
    await setBlockTime(timestamp + eightDays);

    const tx = await proposedOwnable.connect(wallet).renounceConditionOwnership();
    const receipt = await tx.wait();
    assertReceiptEvent(receipt, "ConditionOwnershipRenounced", { renounced: true });
    expect(await proposedOwnable.conditionOwnershipTimestamp()).to.be.eq(constants.Zero);
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

  describe("routerOwnershipTimestamp", () => {
    it("should work", async () => {
      expect(await proposedOwnable.routerOwnershipTimestamp()).to.be.eq(constants.Zero);
      await proposeRouterOwnershipRenunciation();
    });
  });

  describe("assetOwnershipTimestamp", () => {
    it("should work", async () => {
      expect(await proposedOwnable.assetOwnershipTimestamp()).to.be.eq(constants.Zero);
      await proposeAssetOwnershipRenunciation();
    });
  });

  describe("delay", () => {
    it("should work", async () => {
      expect(await proposedOwnable.delay()).to.be.eq(7 * 24 * 60 * 60);
    });
  });

  describe("isRouterOwnershipRenounced", () => {
    it("should work if renounced", async () => {
      await transferOwnership(constants.AddressZero, wallet);
      expect(await proposedOwnable.renounced()).to.be.true;
      expect(await proposedOwnable.isRouterOwnershipRenounced()).to.be.true;
    });

    it("should work if asset ownership renounced", async () => {
      await renounceRouterOwnership();
      expect(await proposedOwnable.renounced()).to.be.false;
      expect(await proposedOwnable.isRouterOwnershipRenounced()).to.be.true;
    });
  });

  describe("proposeRouterOwnershipRenunciation", () => {
    it("should fail if router ownership is already renounced", async () => {
      await renounceRouterOwnership();
      await expect(proposedOwnable.connect(wallet).proposeRouterOwnershipRenunciation()).to.be.revertedWith(
        "#PROR:038",
      );
    });

    it("should work", async () => {
      await proposeRouterOwnershipRenunciation();
    });
  });

  describe("renounceRouterOwnership", () => {
    it("should fail if router ownership is already renounced", async () => {
      await renounceRouterOwnership();
      await expect(proposedOwnable.connect(wallet).renounceRouterOwnership()).to.be.revertedWith("#RRO:038");
    });

    it("should fail if there is no proposal in place", async () => {
      await expect(proposedOwnable.connect(wallet).renounceRouterOwnership()).to.be.revertedWith("#RRO:037");
    });

    it("should fail if delay has not elapsed", async () => {
      await proposeRouterOwnershipRenunciation();
      await expect(proposedOwnable.connect(wallet).renounceRouterOwnership()).to.be.revertedWith("#RRO:030");
    });

    it("should work", async () => {
      await renounceRouterOwnership();
    });
  });

  describe("isAssetOwnershipRenounced", () => {
    it("should work if renounced", async () => {
      await transferOwnership(constants.AddressZero, wallet);
      expect(await proposedOwnable.renounced()).to.be.true;
      expect(await proposedOwnable.isAssetOwnershipRenounced()).to.be.true;
    });

    it("should work if asset ownership renounced", async () => {
      await renounceAssetOwnership();
      expect(await proposedOwnable.renounced()).to.be.false;
      expect(await proposedOwnable.isAssetOwnershipRenounced()).to.be.true;
    });
  });

  describe("proposeAssetOwnershipRenunciation", () => {
    it("should fail if asset ownership already renounced", async () => {
      await renounceAssetOwnership();
      await expect(proposedOwnable.connect(wallet).proposeAssetOwnershipRenunciation()).to.be.revertedWith("#PAOR:038");
    });

    it("should work", async () => {
      await proposeAssetOwnershipRenunciation();
    });
  });

  describe("renounceAssetOwnership", () => {
    it("should fail if asset ownership is already renounced", async () => {
      await renounceAssetOwnership();
      await expect(proposedOwnable.connect(wallet).renounceAssetOwnership()).to.be.revertedWith("#RAO:038");
    });

    it("should fail if no proposal was made", async () => {
      await expect(proposedOwnable.connect(wallet).renounceAssetOwnership()).to.be.revertedWith("#RAO:037");
    });

    it("should fail if delay has not elapsed", async () => {
      await proposeAssetOwnershipRenunciation();
      await expect(proposedOwnable.connect(wallet).renounceAssetOwnership()).to.be.revertedWith("#RAO:030");
    });

    it("should work", async () => {
      await renounceAssetOwnership();
    });
  });

  describe("isConditionOwnershipRenounced", () => {
    it("should work if conditionOwnershipRenounced", async () => {
      expect(await proposedOwnable.isConditionOwnershipRenounced()).to.be.false;
      await renounceConditionOwnership();
      expect(await proposedOwnable.isConditionOwnershipRenounced()).to.be.true;
    });

    it("should work if all ownership renounced", async () => {
      await transferOwnership(constants.AddressZero, wallet);
      expect(await proposedOwnable.isConditionOwnershipRenounced()).to.be.true;
    });
  });

  describe("proposeConditionOwnershipRenunciation", () => {
    it("should fail if it was already renounced", async () => {
      await renounceConditionOwnership();
      await expect(proposeConditionOwnershipRenunciation()).to.be.revertedWith("#PCOR:038");
    });

    it("should fail if not called by owner", async () => {
      await expect(proposedOwnable.connect(other).proposeConditionOwnershipRenunciation()).to.be.revertedWith(
        "#OO:029",
      );
    });

    it("should work", async () => {
      await proposeConditionOwnershipRenunciation();
    });
  });

  describe("renounceConditionOwnership", () => {
    it("should fail if already renounced", async () => {
      await renounceConditionOwnership();
      await expect(proposedOwnable.connect(wallet).renounceConditionOwnership()).to.be.revertedWith("#RCO:038");
    });

    it("should fail if cycle hasnt started (no proposal)", async () => {
      await expect(proposedOwnable.connect(wallet).renounceConditionOwnership()).to.be.revertedWith("#RCO:037");
    });

    it("should fail if proposal window hasnt elapsed", async () => {
      await proposeConditionOwnershipRenunciation();
      await expect(proposedOwnable.connect(wallet).renounceConditionOwnership()).to.be.revertedWith("#RCO:030");
    });

    it("should work", async () => {
      await renounceConditionOwnership();
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
      await expect(proposedOwnable.connect(other).proposeNewOwner(constants.AddressZero)).to.be.revertedWith("#OO:029");
    });

    it("should fail if proposing the same address as what is already proposed", async () => {
      await proposeNewOwner(other.address);
      await expect(proposedOwnable.connect(wallet).proposeNewOwner(other.address)).to.be.revertedWith("#PNO:036");
    });

    it("should fail if proposing the owner", async () => {
      await expect(proposedOwnable.connect(wallet).proposeNewOwner(wallet.address)).to.be.revertedWith("#PNO:038");
    });

    it("should work", async () => {
      await proposeNewOwner(other.address);
    });
  });

  describe("renounceOwnership", () => {
    it("should fail if there was no proposal", async () => {
      await expect(proposedOwnable.connect(wallet).renounceOwnership()).to.be.revertedWith("#RO:037");
    });

    it("should fail if the delay hasnt elapsed", async () => {
      await proposeNewOwner(constants.AddressZero);
      await expect(proposedOwnable.connect(wallet).renounceOwnership()).to.be.revertedWith("#RO:030");
    });

    it("should fail if the proposed != address(0)", async () => {
      await proposeNewOwner(Wallet.createRandom().address);

      // Advance block time
      const eightDays = 8 * 24 * 60 * 60;
      const { timestamp } = await ethers.provider.getBlock("latest");
      await setBlockTime(timestamp + eightDays);

      await expect(proposedOwnable.connect(wallet).renounceOwnership()).to.be.revertedWith("#RO:036");
    });

    it("should fail if not called by owner", async () => {
      await proposeNewOwner(constants.AddressZero);
      await expect(proposedOwnable.connect(other).renounceOwnership()).to.be.revertedWith("#OO:029");
    });

    it("should work", async () => {
      await transferOwnership(constants.AddressZero, wallet);
    });
  });

  describe("acceptProposedOwner", () => {
    it("should fail if not called by proposed", async () => {
      await proposeNewOwner(other.address);
      await expect(proposedOwnable.connect(wallet).acceptProposedOwner()).to.be.revertedWith("#OP:035");
    });

    it("should fail if there is no effective change in ownership", async () => {
      // First make and accept a new owner
      await transferOwnership(other.address);

      // Then try again
      await expect(proposedOwnable.connect(other).acceptProposedOwner()).to.be.revertedWith("#APO:038");
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

import { ethers } from "hardhat";
import { expect } from "chai";

import { BigNumber, constants, Contract, ContractReceipt, providers, Wallet } from "ethers/lib/ethers";

import { abi as Erc20Abi } from "../artifacts/contracts/test/TestERC20.sol/TestERC20.json";
import { ProposedOwnable } from "../typechain";

export const getOnchainBalance = async (
  assetId: string,
  address: string,
  provider: providers.Provider,
): Promise<BigNumber> => {
  return assetId === constants.AddressZero
    ? provider.getBalance(address)
    : new Contract(assetId, Erc20Abi, provider).balanceOf(address);
};

export const setBlockTime = async (desiredTimestamp: number) => {
  await ethers.provider.send("evm_setNextBlockTimestamp", [desiredTimestamp]);
};

export const assertObject = (expected: any, returned: any) => {
  const keys = Object.keys(expected);
  keys.map((k) => {
    if (typeof expected[k] === "object" && !BigNumber.isBigNumber(expected[k])) {
      expect(typeof returned[k] === "object");
      assertObject(expected[k], returned[k]);
    } else {
      expect(returned[k]).to.be.deep.eq((expected as any)[k]);
    }
  });
};

export const assertReceiptEvent = async (receipt: ContractReceipt, eventName: string, expected: any) => {
  expect(receipt.status).to.be.eq(1);
  const idx = receipt.events?.findIndex((e) => e.event === eventName) ?? -1;
  expect(idx).to.not.be.eq(-1);
  const decoded = receipt.events![idx].decode!(receipt.events![idx].data, receipt.events![idx].topics);
  assertObject(expected, decoded);
};

export const proposeNewOwnerOnContract = async (newOwner: string, contract: ProposedOwnable) => {
  // Propose new owner
  const proposeTx = await contract.proposeNewOwner(newOwner);
  const proposeReceipt = await proposeTx.wait();
  assertReceiptEvent(proposeReceipt, "OwnershipProposed", { proposedOwner: newOwner });
  expect(await contract.proposed()).to.be.eq(newOwner);
  return proposeReceipt;
};

export const transferOwnershipOnContract = async (newOwner: string, caller: Wallet, contract: ProposedOwnable) => {
  // Get current owner
  const current = await contract.owner();

  // Propose new owner
  await proposeNewOwnerOnContract(newOwner, contract);

  // Advance block time
  const eightDays = 8 * 24 * 60 * 60;
  const { timestamp } = await ethers.provider.getBlock("latest");
  await setBlockTime(timestamp + eightDays);

  // Accept new owner
  const acceptTx =
    newOwner === constants.AddressZero
      ? await contract.connect(caller).renounceOwnership()
      : await contract.connect(caller).acceptProposedOwner();
  const acceptReceipt = await acceptTx.wait();
  assertReceiptEvent(acceptReceipt, "OwnershipTransferred", {
    previousOwner: current,
    newOwner,
  });
  expect(await contract.owner()).to.be.eq(newOwner);
};

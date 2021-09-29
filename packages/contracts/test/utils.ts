import { ethers } from "hardhat";
import { expect } from "chai";

import { BigNumber, constants, Contract, ContractFactory, ContractReceipt, providers, Wallet } from "ethers/lib/ethers";

import { abi as Erc20Abi } from "../artifacts/contracts/test/TestERC20.sol/TestERC20.json";
import { ProposedOwnable } from "../typechain";
import { Artifact } from "hardhat/types";

export const MAX_FEE_PER_GAS = BigNumber.from("975000000");
export const deployContract = async <T extends Contract = Contract>(
  factoryInfo: string | Artifact,
  ...args: any[]
): Promise<T> => {
  let factory: ContractFactory;
  if (typeof factoryInfo === "string") {
    factory = (await ethers.getContractFactory(factoryInfo)) as ContractFactory;
  } else {
    factory = await ethers.getContractFactory(factoryInfo.abi, factoryInfo.bytecode);
  }
  const contract = await factory.deploy(...args, {
    maxFeePerGas: MAX_FEE_PER_GAS,
  });
  await contract.deployed();
  return contract as T;
};

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

export const proposeNewOwnerOnContract = async (newOwner: string, owner: Wallet, contract: ProposedOwnable) => {
  // Propose new owner
  const proposeTx = await contract.connect(owner).proposeNewOwner(newOwner);
  const proposeReceipt = await proposeTx.wait();
  assertReceiptEvent(proposeReceipt, "OwnershipProposed", { proposedOwner: newOwner });
  expect(await contract.proposed()).to.be.eq(newOwner);
  return proposeReceipt;
};

export const transferOwnershipOnContract = async (
  newOwner: string,
  caller: Wallet,
  contract: ProposedOwnable,
  owner: Wallet,
) => {
  // Get current owner
  const current = await contract.owner();

  // Propose new owner
  await proposeNewOwnerOnContract(newOwner, owner, contract);

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

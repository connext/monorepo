import { ethers, upgrades } from "hardhat";
import { expect, assert } from "chai";

import {
  BigNumber,
  constants,
  Contract,
  ContractFactory,
  ContractReceipt,
  providers,
  Signer,
  Wallet,
  BytesLike,
} from "ethers/lib/ethers";

import { abi as Erc20Abi } from "../artifacts/contracts/test/TestERC20.sol/TestERC20.json";
import { ProposedOwnableUpgradeable, GenericERC20, UpgradeBeaconProxy, Connext } from "../typechain-types";
import { Artifact } from "hardhat/types";

export const MAX_FEE_PER_GAS = BigNumber.from("975000000");

const deployFromFactory = async <T extends Contract = Contract>(factory: ContractFactory, ...args: any[]) => {
  const contract = await factory.deploy(...args, {
    maxFeePerGas: MAX_FEE_PER_GAS,
  });
  await contract.deployed();
  return contract as T;
};

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
  return deployFromFactory(factory, ...args);
};

export const deployContractWithLibs = async <T extends Contract = Contract>(
  factoryInfo: string,
  libraries: Record<string, string>,
  ...args: any[]
): Promise<T> => {
  const factory = (await ethers.getContractFactory(factoryInfo, {
    libraries,
  })) as ContractFactory;

  return deployFromFactory(factory, ...args);
};

export const deployBeaconProxy = async <T extends Contract = Contract>(
  name: string,
  initArgs: any[],
): Promise<[T, string]> => {
  // Get init data
  const factory = (await ethers.getContractFactory(name)) as ContractFactory;

  // Deploy Beacon
  const beacon = await upgrades.deployBeacon(factory);
  await beacon.deployed();

  // Deploy proxy
  const proxy = await upgrades.deployBeaconProxy(beacon, factory, initArgs);
  await proxy.deployed();

  return [proxy as T, beacon.address];
};

export const upgradeBeaconProxy = async (name: string, beaconAddress: string): Promise<boolean> => {
  const factory = (await ethers.getContractFactory(name)) as ContractFactory;

  // Upgrade proxy
  await upgrades.upgradeBeacon(beaconAddress, factory);

  return true;
};

export const deployUpgradeableProxy = async <T extends Contract = Contract>(
  name: string,
  initArgs: any[],
  controllerAddress: string,
  ...constructorArgs: any[]
): Promise<T> => {
  // Get init data
  const factory = (await ethers.getContractFactory(name)) as ContractFactory;
  const initData = factory.interface.encodeFunctionData("initialize", initArgs);

  // Deploy implementation
  const implementation = await deployFromFactory(factory, ...constructorArgs);

  // Deploy beacon
  const beaconFactory = await ethers.getContractFactory("UpgradeBeacon");
  const beacon = await deployFromFactory(beaconFactory, implementation.address, controllerAddress);

  // Deploy proxy
  const proxyFactory = await ethers.getContractFactory("UpgradeBeaconProxy");
  const proxy = await deployFromFactory<UpgradeBeaconProxy>(proxyFactory, beacon.address, initData);
  return new Contract(proxy.address, implementation.interface) as T;
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

export const getRoutersBalances = async (routers: string[], connextContract: Connext, asset: string) =>
  Promise.all(routers.map((addr) => connextContract.routerBalances(addr, asset)));

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

export const assertReceiptEvent = (receipt: ContractReceipt, eventName: string, expected: any) => {
  expect(receipt.status).to.be.eq(1);
  const idx = receipt.events?.findIndex((e) => e.event === eventName) ?? -1;
  expect(idx).to.not.be.eq(-1);
  const decoded = receipt.events![idx].decode!(receipt.events![idx].data, receipt.events![idx].topics);
  assertObject(expected, decoded);
};

export const proposeNewOwnerOnContract = async (
  newOwner: string,
  owner: Wallet,
  contract: ProposedOwnableUpgradeable,
) => {
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
  contract: ProposedOwnableUpgradeable,
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

// ========== NOMAD HELPERSS =============
export type TransferAction = {
  type: BridgeMessageTypes.TRANSFER;
  recipient: BytesLike;
  amount: number | BytesLike;
  detailsHash: BytesLike;
};

export type FastTransferAction = {
  type: BridgeMessageTypes.FAST_TRANSFER;
  recipient: BytesLike;
  amount: number | BytesLike;
  detailsHash: BytesLike;
  externalHash: BytesLike;
};

export type NxtpEnabledAction = {
  type: BridgeMessageTypes.NXTP_ENABLED;
  recipient: BytesLike;
  amount: (number | BytesLike)[];
  detailsHash: BytesLike[];
  batchRoot: BytesLike;
};

export type Action = TransferAction | FastTransferAction | NxtpEnabledAction;

export interface TokenIdentifier {
  domain: string | number;
  id: BytesLike;
}

export type Message = {
  tokenId: TokenIdentifier;
  action: Action;
};

export type BatchMessage = {
  tokenIds: TokenIdentifier[];
  action: Action;
};

function byteLength(str: string) {
  return Buffer.from(str, "utf-8").length;
}

export enum BridgeMessageTypes {
  INVALID = 0,
  TOKEN_ID,
  MESSAGE,
  TRANSFER,
  FAST_TRANSFER,
  NXTP_ENABLED,
  TOKEN_IDS,
}

const typeToByte = (type: number): string => `0x0${type}`;

const MESSAGE_LEN = {
  identifier: 1,
  tokenId: 36,
  transfer: 97,
};

export function getDetailsHash(name: string, symbol: string, decimals: number): BytesLike {
  const details: BytesLike = ethers.utils.solidityPack(
    ["uint", "string", "uint", "string", "uint8"],
    [byteLength(name), name, byteLength(symbol), symbol, decimals],
  );
  return ethers.utils.solidityKeccak256(["bytes"], [details]);
}

// Formats Transfer Message
export function formatTransfer(
  to: BytesLike,
  amnt: number | BytesLike,
  detailsHash: BytesLike,
  enableFast: boolean,
  externalHash: BytesLike,
): BytesLike {
  const type = enableFast ? BridgeMessageTypes.FAST_TRANSFER : BridgeMessageTypes.TRANSFER;
  return ethers.utils.solidityPack(
    ["uint8", "bytes32", "uint256", "bytes32", "bytes32"],
    [type, to, amnt, detailsHash, externalHash],
  );
}

// Formats the Token ID
export function formatTokenId(domain: number, id: string): BytesLike {
  return ethers.utils.solidityPack(["uint32", "bytes32"], [domain, id]);
}

export function formatMessage(tokenId: BytesLike, action: BytesLike): BytesLike {
  return ethers.utils.solidityPack(["bytes", "bytes"], [tokenId, action]);
}

export function serializeTransferAction(transferAction: TransferAction): BytesLike {
  const { type, recipient, amount, detailsHash } = transferAction;
  assert(type === BridgeMessageTypes.TRANSFER);
  return formatTransfer(recipient, amount, detailsHash, false, "");
}

export function serializeFastTransferAction(transferAction: FastTransferAction): BytesLike {
  const { type, recipient, amount, detailsHash, externalHash } = transferAction;
  assert(type === BridgeMessageTypes.FAST_TRANSFER);
  return formatTransfer(recipient, amount, detailsHash, true, externalHash);
}

export function serializeNxtpEnabledAction(transferAction: NxtpEnabledAction): BytesLike {
  const { type, recipient, amount, detailsHash, batchRoot } = transferAction;
  assert(type === BridgeMessageTypes.NXTP_ENABLED);
  const vals: any[] = [];
  const types: string[] = [];
  detailsHash.forEach((hash, idx) => {
    types.push("bytes32", "uint256");
    return vals.push(hash, amount[idx]);
  });
  return ethers.utils.solidityPack(["uint8", "bytes32", "bytes32", ...types], [type, recipient, batchRoot, ...vals]);
}

export function serializeAction(action: Action): BytesLike {
  let actionBytes: BytesLike = [];
  switch (action.type) {
    case BridgeMessageTypes.TRANSFER: {
      actionBytes = serializeTransferAction(action);
      break;
    }
    case BridgeMessageTypes.FAST_TRANSFER: {
      actionBytes = serializeFastTransferAction(action);
      break;
    }
    case BridgeMessageTypes.NXTP_ENABLED: {
      actionBytes = serializeNxtpEnabledAction(action);
      break;
    }
    default: {
      console.error("Invalid action");
      break;
    }
  }
  return actionBytes;
}

export function serializeTokenId(tokenId: TokenIdentifier): BytesLike {
  if (typeof tokenId.domain !== "number" || typeof tokenId.id !== "string") {
    throw new Error("!types");
  }
  return formatTokenId(tokenId.domain as number, tokenId.id as string);
}

export function serializeMessage(message: Message): BytesLike {
  const tokenId = serializeTokenId(message.tokenId);
  const action = serializeAction(message.action);
  return formatMessage(tokenId, action);
}

export function serializeBatchMessage(message: BatchMessage): BytesLike {
  let tokenIds: BytesLike = "0x";
  message.tokenIds.forEach((t: TokenIdentifier) => {
    const serialized = serializeTokenId(t);
    if (typeof serialized === "string") {
      const toAdd = serialized.startsWith("0x") ? serialized.substring(2) : serialized;
      tokenIds += toAdd;
    } else {
      throw new Error("Implement: buffer concat");
    }
  });
  const action = serializeAction(message.action);
  return formatMessage(tokenIds, action);
}

export const bridge = {
  BridgeMessageTypes,
  typeToByte,
  MESSAGE_LEN,
  serializeTransferAction,
  serializeFastTransferAction,
  serializeNxtpEnabledAction,
  serializeAction,
  serializeTokenId,
  serializeMessage,
  serializeBatchMessage,
  getDetailsHash,
};

//// For StableSwap
export const MAX_UINT256 = ethers.constants.MaxUint256;
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export enum TIME {
  SECONDS = 1,
  DAYS = 86400,
  WEEKS = 604800,
}

export const BIG_NUMBER_1E18 = BigNumber.from(10).pow(18);
export const BIG_NUMBER_ZERO = BigNumber.from(0);

export async function asyncForEach<T>(array: Array<T>, callback: (item: T, index: number) => void): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

export async function getCurrentBlockTimestamp(): Promise<number> {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
}

export async function getUserTokenBalances(address: string | Signer, tokens: GenericERC20[]): Promise<BigNumber[]> {
  const balanceArray = [];

  if (address instanceof Signer) {
    address = await address.getAddress();
  }

  for (const token of tokens) {
    balanceArray.push(await token.balanceOf(address));
  }

  return balanceArray;
}

export async function getUserTokenBalance(address: string | Signer, token: GenericERC20): Promise<BigNumber> {
  if (address instanceof Signer) {
    address = await address.getAddress();
  }
  return token.balanceOf(address);
}

export async function setNextTimestamp(timestamp: number): Promise<any> {
  const chainId = (await ethers.provider.getNetwork()).chainId;

  switch (chainId) {
    case 31337: // buidler evm
      return ethers.provider.send("evm_setNextBlockTimestamp", [timestamp]);
    case 1337: // ganache
    default:
      return setTimestamp(timestamp);
  }
}

export async function forceAdvanceOneBlock(timestamp?: number): Promise<any> {
  const params = timestamp ? [timestamp] : [];
  return ethers.provider.send("evm_mine", params);
}

export async function setTimestamp(timestamp: number): Promise<any> {
  return forceAdvanceOneBlock(timestamp);
}

export function send(method: string, params?: Array<any>) {
  return ethers.provider.send(method, params === undefined ? [] : params);
}

export function mineBlock() {
  return send("evm_mine");
}

/**
 *  Takes a snapshot and returns the ID of the snapshot for restoring later.
 */
 export async function takeSnapshot(): Promise<number> {
  const result = await send('evm_snapshot');
  await mineBlock();
  return result;
}

/**
 *  Restores a snapshot that was previously taken with takeSnapshot
 *  @param id The ID that was returned when takeSnapshot was called.
 */
export async function restoreSnapshot(id: number) {
  await send('evm_revert', [id]);
  await mineBlock();
}

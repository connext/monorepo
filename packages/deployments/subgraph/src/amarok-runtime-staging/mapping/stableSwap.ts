/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";
import { StableSwapAdded } from "../../../generated/Connext/Connext";
import { AddLiquidity, OwnershipTransferred, SwapInitialized } from "../../../generated/StableSwap/StableSwap";

import { StableSwap } from "../../../generated/schema";
// import { Asset, AssetBalance, Router} from "../../../generated/schema";

export function handleStableSwapAdded(event: StableSwapAdded): void {
  let stableSwap = getOrCreateStableSwap(event.params.swapPool);

  stableSwap.key = event.params.key;
  stableSwap.canonicalId = event.params.canonicalId;
  stableSwap.domain = event.params.domain;
  stableSwap.swapPool = event.params.swapPool;

  stableSwap.save();
}

export function handleSwapInitialized(event: SwapInitialized): void {
  let stableSwap = getOrCreateStableSwap(event.address);

  stableSwap.lpToken = event.params.swap.lpToken;
  stableSwap.initialA = event.params.swap.initialA;
  stableSwap.futureA = event.params.swap.futureA;

  stableSwap.initialATime = event.params.swap.initialATime;
  stableSwap.futureATime = event.params.swap.futureATime;

  stableSwap.swapFee = event.params.swap.swapFee;
  stableSwap.adminFee = event.params.swap.adminFee;
  stableSwap.pooledTokens = event.params.swap.pooledTokens;
  stableSwap.tokenPrecisionMultipliers = event.params.swap.tokenPrecisionMultipliers;
  stableSwap.balances = event.params.swap.balances;
  stableSwap.adminFees = event.params.swap.adminFees;

  stableSwap.save();
}

export function handleAddLiquidity(event: AddLiquidity): void {
  let stableSwap = getOrCreateStableSwap(event.address);

  if (metaData == null) {
    metaData = new MetaData(metaDataId);
    relayer.isActive = true;
    relayer.relayer = event.params.relayer;
    relayer.save();
  }
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let metaDataId = event.params.relayer.toHex();
  // let relayer = Relayer.load(relayerId);

  // if (relayer == null) {
  //   relayer = new Relayer(relayerId);
  //   relayer.isActive = true;
  //   relayer.relayer = event.params.relayer;
  //   relayer.save();
  // }
}

export function handleRampA(event: RampA): void {
  let metaDataId = event.params.relayer.toHex();
  // let relayer = Relayer.load(relayerId);

  // if (relayer == null) {
  //   relayer = new Relayer(relayerId);
  //   relayer.isActive = true;
  //   relayer.relayer = event.params.relayer;
  //   relayer.save();
  // }
}

export function handleRemoveLiquidity(event: RemoveLiquidity): void {
  let metaDataId = event.params.relayer.toHex();
  // let relayer = Relayer.load(relayerId);

  // if (relayer == null) {
  //   relayer = new Relayer(relayerId);
  //   relayer.isActive = true;
  //   relayer.relayer = event.params.relayer;
  //   relayer.save();
  // }
}

export function handleRemoveLiquidityImbalance(event: RemoveLiquidityImbalance): void {
  let metaDataId = event.params.relayer.toHex();
  // let relayer = Relayer.load(relayerId);

  // if (relayer == null) {
  //   relayer = new Relayer(relayerId);
  //   relayer.isActive = true;
  //   relayer.relayer = event.params.relayer;
  //   relayer.save();
  // }
}

export function handleRemoveLiquidityOne(event: RemoveLiquidityOne): void {
  let metaDataId = event.params.relayer.toHex();
  // let relayer = Relayer.load(relayerId);

  // if (relayer == null) {
  //   relayer = new Relayer(relayerId);
  //   relayer.isActive = true;
  //   relayer.relayer = event.params.relayer;
  //   relayer.save();
  // }
}

export function handleStopRampA(event: StopRampA): void {
  let metaDataId = event.params.relayer.toHex();
  // let relayer = Relayer.load(relayerId);

  // if (relayer == null) {
  //   relayer = new Relayer(relayerId);
  //   relayer.isActive = true;
  //   relayer.relayer = event.params.relayer;
  //   relayer.save();
  // }
}

export function handleTokenSwap(event: TokenSwap): void {
  let metaDataId = event.params.relayer.toHex();
  // let relayer = Relayer.load(relayerId);

  // if (relayer == null) {
  //   relayer = new Relayer(relayerId);
  //   relayer.isActive = true;
  //   relayer.relayer = event.params.relayer;
  //   relayer.save();
  // }
}

export function handleNewAdminFee(event: NewAdminFee): void {
  let metaData = getOrCreateMetaData();

  metaData.adminFee = event.params.newAdminFee;
  metaData.save();
}

export function handleNewSwapFee(event: NewSwapFee): void {
  let metaData = getOrCreateMetaData();

  metaData.swapFee = event.params.newSwapFee;
  metaData.save();
}

export function handleNewWithdrawFee(event: NewWithdrawFee): void {
  let metaData = getOrCreateMetaData();

  metaData.withdrawFee = event.params.newWithdrawFee;
  metaData.save();
}

export function handlePaused(): void {
  let metaData = getOrCreateMetaData();

  metaData.paused = true;
  metaData.save();
}

export function handleUnpaused(): void {
  let metaData = getOrCreateMetaData();

  metaData.paused = false;
  metaData.save();
}

function getOrCreateMetaData(): MetaData {
  let metaDataId = DEFAULT_META_ID;
  let metaData = MetaData.load(metaDataId);

  if (metaData == null) {
    metaData = new MetaData(metaDataId);

    metaData.adminFee = new BigInt(0);
    metaData.swapFee = new BigInt(0);
    metaData.withdrawFee = new BigInt(0);

    metaData.paused = false;

    metaData.save();
  }
  return metaData;
}

export function getOrCreateStableSwap(_stableSwap: Address): StableSwap {
  let stableSwapId = _stableSwap.toHex();
  let stableSwap = StableSwap.load(stableSwapId);

  if (stableSwap == null) {
    stableSwap = new StableSwap(stableSwapId);
    stableSwap.key = new Bytes(32);
    stableSwap.canonicalId = new Bytes(32);
    stableSwap.domain = new BigInt(0);
    stableSwap.swapPool = _stableSwap.toHex();

    stableSwap.save();
  }

  return stableSwap;
}

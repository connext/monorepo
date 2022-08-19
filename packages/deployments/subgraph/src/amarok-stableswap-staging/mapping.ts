/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";

import {
  AddLiquidity,
  NewAdminFee,
  NewSwapFee,
  NewWithdrawFee,
  OwnershipTransferred,
  RampA,
  RemoveLiquidity,
  RemoveLiquidityImbalance,
  RemoveLiquidityOne,
  StopRampA,
  TokenSwap,
} from "../../generated/Connext/StableSwap";
import { MetaData } from "../../generated/schema";

// handleAddLiquidity

const DEFAULT_META_ID = "0xmetaid";


// event TokenSwap(address indexed buyer, uint256 tokensSold, uint256 tokensBought, uint128 soldId, uint128 boughtId);

//   event RemoveLiquidity(address indexed provider, uint256[] tokenAmounts, uint256 lpTokenSupply);
//   event RemoveLiquidityOne(
//     address indexed provider,
//     uint256 lpTokenAmount,
//     uint256 lpTokenSupply,
//     uint256 boughtId,
//     uint256 tokensBought
//   );
//   event RemoveLiquidityImbalance(
//     address indexed provider,
//     uint256[] tokenAmounts,
//     uint256[] fees,
//     uint256 invariant,
//     uint256 lpTokenSupply
//   );
//   event RampA(uint256 oldA, uint256 newA, uint256 initialTime, uint256 futureTime);
//   event StopRampA(uint256 currentA, uint256 time);


//   event AddLiquidity(
//     address indexed provider,
//     uint256[] tokenAmounts,
//     uint256[] fees,
//     uint256 invariant,
//     uint256 lpTokenSupply
//   );
export function handleAddLiquidity(event: AddLiquidity): void {
  let metaDataId = DEFAULT_META_ID;
  let metaData = MetaData.load(metaDataId);

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

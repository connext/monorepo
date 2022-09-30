/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";

import {
  RouterLiquidityAdded,
  RouterLiquidityRemoved,
  RelayerAdded,
  RelayerRemoved,
  StableSwapAdded,
  XCalled,
  Executed,
  Reconciled,
  AssetAdded,
  RouterRemoved,
  RouterAdded,
  RouterOwnerAccepted,
  RouterOwnerProposed,
  RouterRecipientSet,
  MaxRoutersPerTransferUpdated,
} from "../../../generated/Connext/ConnextHandler";
import {
  NewConnector,
  Dispatch,
  AggregateRootsUpdated,
  MessageSent,
  MessageProcessed,
} from "../../../generated/SpokeConnector/SpokeConnector";
import {
  Asset,
  AssetBalance,
  Router,
  Relayer,
  StableSwap,
  OriginTransfer,
  DestinationTransfer,
  Setting,
  OriginMessage,
  AggregateRoot,
  RootMessageSent,
  RootMessageProcessed,
  ConnectorMeta,
} from "../../../generated/schema";

export function handleStableSwapAdded(event: StableSwapAdded): void {
  // StableSwapAdded: bytes32 canonicalId, uint32 domain, address swapPool, address caller
  let stableSwapId = `${event.params.canonicalId.toHex()}-${event.params.domain.toHex()}-${event.params.swapPool.toHex()}`;
  let stableSwap = StableSwap.load(stableSwapId);

  if (stableSwap == null) {
    stableSwap = new StableSwap(stableSwapId);
    stableSwap.canonicalId = event.params.canonicalId;
    stableSwap.domain = event.params.domain;
    stableSwap.swapPool = event.params.swapPool;
    stableSwap.save();
  }
}

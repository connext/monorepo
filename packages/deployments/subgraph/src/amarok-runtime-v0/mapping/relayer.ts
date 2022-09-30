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

/// MARK - Relayers
export function handleRelayerAdded(event: RelayerAdded): void {
  let relayerId = event.params.relayer.toHex();
  let relayer = Relayer.load(relayerId);

  if (relayer == null) {
    relayer = new Relayer(relayerId);
    relayer.isActive = true;
    relayer.relayer = event.params.relayer;
    relayer.save();
  }
}

export function handleRelayerRemoved(event: RelayerRemoved): void {
  let relayerId = event.params.relayer.toHex();
  let relayer = Relayer.load(relayerId);

  if (relayer == null) {
    relayer = new Relayer(event.params.relayer.toHex());
    relayer.isActive = false;
    relayer.save();
  }
}


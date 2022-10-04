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

/// MARK - Assets
export function handleAssetAdded(event: AssetAdded): void {
  let assetId = event.params.localAsset.toHex();
  let asset = Asset.load(assetId);
  if (asset == null) {
    asset = new Asset(assetId);
  }
  asset.key = event.params.key;
  asset.canonicalId = event.params.canonicalId;
  asset.canonicalDomain = event.params.domain;
  asset.adoptedAsset = event.params.adoptedAsset;
  asset.blockNumber = event.block.number;
  asset.save();
}
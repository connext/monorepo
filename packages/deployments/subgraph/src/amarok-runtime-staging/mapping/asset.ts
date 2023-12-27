/* eslint-disable prefer-const */
import { AssetAdded, AssetRemoved } from "../../../generated/Connext/Connext";
import { Asset, AssetStatus } from "../../../generated/schema";

import { getTokenDecimals } from "./helper";

/// MARK - Assets
export function handleAssetAdded(event: AssetAdded): void {
  let assetId = event.params.localAsset.toHex();
  let asset = Asset.load(assetId);
  if (asset == null) {
    asset = new Asset(assetId);
  }
  asset.key = event.params.key;
  asset.decimal = getTokenDecimals(event.params.localAsset);
  asset.adoptedDecimal = getTokenDecimals(event.params.adoptedAsset);
  asset.canonicalId = event.params.canonicalId;
  asset.canonicalDomain = event.params.domain;
  asset.adoptedAsset = event.params.adoptedAsset;
  asset.localAsset = event.params.localAsset;
  asset.blockNumber = event.block.number;

  let assetStatus = AssetStatus.load(event.params.key.toHex());
  if (assetStatus == null) {
    assetStatus = new AssetStatus(event.params.key.toHex());
  }
  assetStatus.status = true;

  asset.status = assetStatus.id;

  assetStatus.save();
  asset.save();
}

export function handleAssetRemoved(event: AssetRemoved): void {
  let assetStatus = AssetStatus.load(event.params.key.toHex());
  if (assetStatus == null) {
    assetStatus = new AssetStatus(event.params.key.toHex());
  }
  assetStatus.status = false;
  assetStatus.save();
}

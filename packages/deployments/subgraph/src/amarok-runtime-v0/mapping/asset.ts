/* eslint-disable prefer-const */
import { AssetAdded, AssetRemoved } from "../../../generated/Connext/Connext";
import { Asset } from "../../../generated/schema";

import { getTokenDecimals } from "./helper";

/// MARK - Assets
export function handleAssetAdded(event: AssetAdded): void {
  let assetId = event.params.key;
  let asset = Asset.load(assetId);
  if (asset == null) {
    asset = new Asset(assetId);
  }
  asset.key = event.params.key;
  asset.decimal = getTokenDecimals(event.params.localAsset);
  asset.canonicalId = event.params.canonicalId;
  asset.canonicalDomain = event.params.domain;
  asset.adoptedAsset = event.params.adoptedAsset;
  asset.localAsset = event.params.localAsset;
  asset.blockNumber = event.block.number;
  asset.status = true;

  asset.save();
}

export function handleAssetRemoved(event: AssetRemoved): void {
  let asset = Asset.load(event.params.key.toHex());
  if (!asset) {
    // Nothing to do, no asset record exists so status is already false
    return;
  }
  asset.status = false;
  asset.save();
}

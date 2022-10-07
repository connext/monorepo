/* eslint-disable prefer-const */
import { AssetAdded } from "../../../generated/Connext/Connext";
import { Asset } from "../../../generated/schema";

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
  asset.localAsset = event.params.localAsset;
  asset.blockNumber = event.block.number;
  asset.save();
}

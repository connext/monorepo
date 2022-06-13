// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";
import {ConnextMessage} from "../libraries/ConnextMessage.sol";
import {IStableSwap} from "../interfaces/IStableSwap.sol";
import {IWrapped} from "../interfaces/IWrapped.sol";
import {ITokenRegistry} from "../interfaces/ITokenRegistry.sol";

contract AssetFacet is BaseConnextFacet {
  // ========== Custom Errors ===========
  error AssetFacet__setWrapper_invalidWrapper();
  error AssetFacet__setTokenRegistry_invalidTokenRegistry();
  error AssetFacet__addAssetId_alreadyAdded();
  error AssetFacet__removeAssetId_notAdded();

  // ============ Events ============

  /**
   * @notice Emitted when the wrapper variable is updated
   * @param oldWrapper - The wrapper old value
   * @param newWrapper - The wrapper new value
   * @param caller - The account that called the function
   */
  event WrapperUpdated(address oldWrapper, address newWrapper, address caller);

  /**
   * @notice Emitted when the tokenRegistry variable is updated
   * @param oldTokenRegistry - The tokenRegistry old value
   * @param newTokenRegistry - The tokenRegistry new value
   * @param caller - The account that called the function
   */
  event TokenRegistryUpdated(address oldTokenRegistry, address newTokenRegistry, address caller);

  /**
   * @notice Emitted when a new stable-swap AMM is added for the local <> adopted token
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param swapPool - The address of the AMM
   * @param caller - The account that called the function
   */
  event StableSwapAdded(bytes32 canonicalId, uint32 domain, address swapPool, address caller);

  /**
   * @notice Emitted when a new asset is added
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param adoptedAsset - The address of the adopted (user-expected) asset
   * @param supportedAsset - The address of the whitelisted asset. If the native asset is to be whitelisted,
   * the address of the wrapped version will be stored
   * @param caller - The account that called the function
   */
  event AssetAdded(bytes32 canonicalId, uint32 domain, address adoptedAsset, address supportedAsset, address caller);

  /**
   * @notice Emitted when an asset is removed from whitelists
   * @param canonicalId - The canonical identifier of the token removed
   * @param caller - The account that called the function
   */
  event AssetRemoved(bytes32 canonicalId, address caller);

  // ============ Getters ============

  function canonicalToAdopted(bytes32 _canonicalId) public view returns (address) {
    return s.canonicalToAdopted[_canonicalId];
  }

  function adoptedToCanonical(address _adopted) public view returns (ConnextMessage.TokenId memory) {
    ConnextMessage.TokenId memory canonical = ConnextMessage.TokenId(
      s.adoptedToCanonical[_adopted].domain,
      s.adoptedToCanonical[_adopted].id
    );
    return canonical;
  }

  function approvedAssets(bytes32 _asset) public view returns (bool) {
    return s.approvedAssets[_asset];
  }

  function adoptedToLocalPools(bytes32 _adopted) public view returns (IStableSwap) {
    return s.adoptedToLocalPools[_adopted];
  }

  function wrapper() public view returns (IWrapped) {
    return s.wrapper;
  }

  function tokenRegistry() public view returns (ITokenRegistry) {
    return s.tokenRegistry;
  }

  // ============ Admin functions ============

  /**
   * @notice Updates the native-asset wrapper interface
   * @param _wrapper The address of the new wrapper
   */
  function setWrapper(address _wrapper) external onlyOwner {
    address old = address(s.wrapper);
    if (old == _wrapper || !Address.isContract(_wrapper)) revert AssetFacet__setWrapper_invalidWrapper();

    s.wrapper = IWrapped(_wrapper);
    emit WrapperUpdated(old, _wrapper, msg.sender);
  }

  /**
   * @notice Updates the token registry
   * @param _tokenRegistry The new token registry address
   */
  function setTokenRegistry(address _tokenRegistry) external onlyOwner {
    address old = address(s.tokenRegistry);
    if (old == _tokenRegistry || !Address.isContract(_tokenRegistry))
      revert AssetFacet__setTokenRegistry_invalidTokenRegistry();

    s.tokenRegistry = ITokenRegistry(_tokenRegistry);
    emit TokenRegistryUpdated(old, _tokenRegistry, msg.sender);
  }

  /**
   * @notice Used to add supported assets. This is an admin only function
   * @dev When whitelisting the canonical asset, all representational assets would be
   * whitelisted as well. In the event you have a different adopted asset (i.e. PoS USDC
   * on polygon), you should *not* whitelist the adopted asset. The stable swap pool
   * address used should allow you to swap between the local <> adopted asset
   * @param _canonical - The canonical asset to add by id and domain. All representations
   * will be whitelisted as well
   * @param _adoptedAssetId - The used asset id for this domain (i.e. PoS USDC for
   * polygon)
   */
  function setupAsset(
    ConnextMessage.TokenId calldata _canonical,
    address _adoptedAssetId,
    address _stableSwapPool
  ) external onlyOwner {
    // Sanity check: needs approval
    if (s.approvedAssets[_canonical.id]) revert AssetFacet__addAssetId_alreadyAdded();

    // Update approved assets mapping
    s.approvedAssets[_canonical.id] = true;

    address supported = _adoptedAssetId == address(0) ? address(s.wrapper) : _adoptedAssetId;

    // Update the adopted mapping
    s.adoptedToCanonical[supported].domain = _canonical.domain;
    s.adoptedToCanonical[supported].id = _canonical.id;

    // Update the canonical mapping
    s.canonicalToAdopted[_canonical.id] = supported;

    // Emit event
    emit AssetAdded(_canonical.id, _canonical.domain, _adoptedAssetId, supported, msg.sender);

    // Add the swap pool
    _addStableSwapPool(_canonical, _stableSwapPool);
  }

  /**
   * @notice Adds a stable swap pool for the local <> adopted asset.
   */
  function addStableSwapPool(ConnextMessage.TokenId calldata _canonical, address _stableSwapPool) external onlyOwner {
    _addStableSwapPool(_canonical, _stableSwapPool);
  }

  /**
   * @notice Used to remove assets from the whitelist
   * @param _canonicalId - Token id to remove
   * @param _adoptedAssetId - Corresponding adopted asset to remove
   */
  function removeAssetId(bytes32 _canonicalId, address _adoptedAssetId) external onlyOwner {
    // Sanity check: already approval
    if (!s.approvedAssets[_canonicalId]) revert AssetFacet__removeAssetId_notAdded();

    // Delete from approved assets mapping
    delete s.approvedAssets[_canonicalId];

    // Delete from pools
    delete s.adoptedToLocalPools[_canonicalId];

    // Delete from adopted mapping
    delete s.adoptedToCanonical[_adoptedAssetId == address(0) ? address(s.wrapper) : _adoptedAssetId];

    // Delete from canonical mapping
    delete s.canonicalToAdopted[_canonicalId];

    // Emit event
    emit AssetRemoved(_canonicalId, msg.sender);
  }

  // ============ Private Functions ============

  /**
   * @notice Used to add an AMM for adopted <> local assets
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _stableSwap - The address of the amm to add
   */
  function _addStableSwapPool(ConnextMessage.TokenId calldata _canonical, address _stableSwap) internal {
    // Update the pool mapping
    s.adoptedToLocalPools[_canonical.id] = IStableSwap(_stableSwap);

    emit StableSwapAdded(_canonical.id, _canonical.domain, _stableSwap, msg.sender);
  }
}

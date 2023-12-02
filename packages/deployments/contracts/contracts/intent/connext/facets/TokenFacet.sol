// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IERC20Metadata} from "@openzeppelin/contracts/interfaces/IERC20Metadata.sol";

import {TypeCasts} from "../../../shared/libraries/TypeCasts.sol";

import {TokenId} from "../libraries/TokenId.sol";
import {AssetLogic} from "../libraries/AssetLogic.sol";
import {TokenConfig} from "../libraries/LibConnextStorage.sol";

import {IStableSwap} from "../interfaces/IStableSwap.sol";
import {IBridgeToken} from "../interfaces/IBridgeToken.sol";

import {BridgeToken} from "../helpers/BridgeToken.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

contract TokenFacet is BaseConnextFacet {
  // ========== Custom Errors ===========
  error TokenFacet__addAssetId_alreadyAdded();
  error TokenFacet__addAssetId_badMint();
  error TokenFacet__addAssetId_badBurn();
  error TokenFacet__removeAssetId_notAdded();
  error TokenFacet__removeAssetId_invalidParams();
  error TokenFacet__removeAssetId_remainsCustodied();
  error TokenFacet__updateDetails_localNotFound();
  error TokenFacet__updateDetails_onlyRemote();
  error TokenFacet__updateDetails_notApproved();
  error TokenFacet__enrollAssets_emptyCanonical();
  error TokenFacet__setupAsset_representationListed();
  error TokenFacet__setupAsset_invalidCanonicalConfiguration();
  error TokenFacet__setupAssetWithDeployedRepresentation_invalidRepresentation();
  error TokenFacet__setupAssetWithDeployedRepresentation_onCanonicalDomain();
  error TokenFacet__setLiquidityCap_notCanonicalDomain();

  // ============ Events ============

  /**
   * @notice emitted when a representation token contract is deployed
   * @param domain the domain of the chain where the canonical asset is deployed
   * @param id the bytes32 address of the canonical token contract
   * @param representation the address of the newly locally deployed representation contract
   */
  event TokenDeployed(uint32 indexed domain, bytes32 indexed id, address indexed representation);

  /**
   * @notice Emitted when a new asset is added
   * @param key - The key in the mapping (hash of canonical id and domain)
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param adoptedAsset - The address of the adopted (user-expected) asset
   * @param localAsset - The address of the local asset
   * @param caller - The account that called the function
   */
  event AssetAdded(
    bytes32 indexed key,
    bytes32 indexed canonicalId,
    uint32 indexed domain,
    address adoptedAsset,
    address localAsset,
    address caller
  );

  /**
   * @notice Emitted when an asset is removed from allowlists
   * @param key - The hash of the canonical identifier and domain of the token removed
   * @param caller - The account that called the function
   */
  event AssetRemoved(bytes32 indexed key, address caller);

  // ============ Getters ============

  function canonicalToAddress(bytes32 _key) public view returns (address) {
    return _getTokenAddress(_key);
  }

  function canonicalToAddress(TokenId calldata _canonical) public view returns (address) {
    return _getTokenAddress(AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain));
  }

  function addressToCanonical(address _asset) public view returns (TokenId memory) {
    TokenId memory canonical = TokenId(
      s.addressToCanonical[_asset].domain,
      s.adoptedToCanonical[_asset].id
    );
    return canonical;
  }

  function getTokenId(address _candidate) public view returns (TokenId memory) {
    return _getCanonicalTokenId(_candidate);
  }

  function approvedAssets(bytes32 _key) public view returns (bool) {
    return s.tokenConfigs[_key].approval;
  }

  function approvedAssets(TokenId calldata _canonical) public view returns (bool) {
    return approvedAssets(AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain));
  }

  function getCustodiedAmount(bytes32 _key) public view returns (uint256) {
    return s.tokenConfigs[_key].custodied;
  }

  // ============ Admin functions ============

  /**
   * @notice Used to add supported assets, without deploying a unique representation
   * asset, and instead using what admins have provided. This is an admin only function
   *
   * @dev This function does very minimal checks to ensure the correct `_asset`
   * token is used. The only enforced checks are:
   * - Bridge can mint, and balance of bridge will increase
   * - Bridge can burn, and balance of bridge will decrease
   *
   * However, there are many things that must be checked manually to avoid enrolling a bad
   * representation:
   * - decimals must always be equal to canonical decimals
   * - regular `mint`, `burn`, `ERC20` functionality could be implemented improperly
   * - the required interface functions (see `IBridgeToken`) may not be implemented
   * - upgradeability could interfere with required functionality
   *
   * Using this method allows admins to override existing local tokens, and should be used
   * carefully.
   *
   * @param _canonical - The canonical asset to add by id and domain. All representations
   * will be whitelisted as well
   * @param _asset - The address of the asset
   */
  function setupAssetWithDeployedRepresentation(
    TokenId calldata _canonical,
    address _asset
  ) external onlyOwnerOrAdmin returns (address) {
    // TODO
  }

  /**
   * @notice Used to remove assets from the allowlist
   * @param _key - The hash of the canonical id and domain to remove (mapping key)
   * @param _asset - Corresponding asset to remove
   */
  function removeAssetId(bytes32 _key, address _asset) external onlyOwnerOrAdmin {
    // TODO
  }

  /**
   * @notice Used to remove assets from the allowlist
   * @param _canonical - The canonical id and domain to remove
   * @param _asset - Corresponding adopted asset to remove
   */
  function removeAssetId(
    TokenId calldata _canonical,
    address _asset,
  ) external onlyOwnerOrAdmin {
    // TODO
  }

  /**
   * @notice Used to update the name and symbol of a local token
   * @param _canonical - The canonical id and domain to remove
   * @param _name - The new name
   * @param _symbol - The new symbol
   */
  function updateDetails(
    TokenId calldata _canonical,
    string memory _name,
    string memory _symbol
  ) external onlyOwnerOrAdmin {
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);
    address local = AssetLogic.getConfig(key).representation;
    if (local == address(0)) {
      revert TokenFacet__updateDetails_localNotFound();
    }

    // Can only happen on remote domains
    if (s.domain == _canonical.domain) {
      revert TokenFacet__updateDetails_onlyRemote();
    }

    // ensure asset is currently approved because `s.canonicalToRepresentation` does
    // not get cleared when asset is removed from allowlist
    if (!s.tokenConfigs[key].approval) {
      revert TokenFacet__updateDetails_notApproved();
    }

    // make sure the asset is still active
    IBridgeToken(local).setDetails(_name, _symbol);
  }

  // ============ Private Functions ============

  function _enrollAssets(
    bool _onCanonical,
    uint8 _decimals,
    address _asset,
    TokenId calldata _canonical,
    bytes32 _key
  ) internal {
    // Sanity check: canonical ID and domain are not 0.
    if (_canonical.domain == 0 || _canonical.id == bytes32("")) {
      revert TokenFacet__enrollAssets_emptyCanonical();
    }

      // TODO
  }

  /**
   * @notice Used to remove assets from the allowlist
   *
   * @dev When you are removing an asset, `xcall` will fail but `handle` and `execute` will not to
   * allow for inflight transfers to be addressed. Similarly, the `repayAavePortal` function will
   * work.
   *
   * @param _key - The hash of the canonical id and domain to remove (mapping key)
   * @param _adoptedAssetId - Corresponding adopted asset to remove
   * @param _representation - Corresponding representation asset (i.e. bridged asset) to remove.
   * @param _canonical - The TokenId (canonical ID and domain) of the asset.
   */
  function _removeAssetId(
    bytes32 _key,
    address _asset
    TokenId memory _canonical
  ) internal {
    TokenConfig storage config = s.tokenConfigs[_key];
 
    // TODO

    // Emit event
    emit AssetRemoved(_key, msg.sender);
  }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {UpgradeBeaconProxy} from "../../../shared/upgrade/UpgradeBeaconProxy.sol";
import {TypeCasts} from "../../../shared/libraries/TypeCasts.sol";

import {TokenId} from "../libraries/LibConnextStorage.sol";
import {Encoding} from "../libraries/Encoding.sol";
import {AssetLogic} from "../libraries/AssetLogic.sol";

import {IStableSwap} from "../interfaces/IStableSwap.sol";
import {IWeth} from "../interfaces/IWeth.sol";
import {IBridgeToken} from "../interfaces/IBridgeToken.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

contract TokenFacet is BaseConnextFacet {
  // ========== Custom Errors ===========
  error TokenFacet__addAssetId_nativeAsset();
  error TokenFacet__addAssetId_alreadyAdded();
  error TokenFacet__removeAssetId_notAdded();
  error TokenFacet__updateDetails_localNotFound();

  // ============ Events ============

  /**
   * @notice emitted when a representation token contract is deployed
   * @param domain the domain of the chain where the canonical asset is deployed
   * @param id the bytes32 address of the canonical token contract
   * @param representation the address of the newly locally deployed representation contract
   */
  event TokenDeployed(uint32 indexed domain, bytes32 indexed id, address indexed representation);

  /**
   * @notice Emitted when a new stable-swap AMM is added for the local <> adopted token
   * @param key - The key in the mapping (hash of canonical id and domain)
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param swapPool - The address of the AMM
   * @param caller - The account that called the function
   */
  event StableSwapAdded(
    bytes32 indexed key,
    bytes32 indexed canonicalId,
    uint32 indexed domain,
    address swapPool,
    address caller
  );

  /**
   * @notice Emitted when a liquidity cap is updated
   * @param key - The key in the mapping (hash of canonical id and domain)
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param cap - The newly enforced liquidity cap (if it is 0, no cap is enforced)
   * @param caller - The account that called the function
   */
  event LiquidityCapUpdated(
    bytes32 indexed key,
    bytes32 indexed canonicalId,
    uint32 indexed domain,
    uint256 cap,
    address caller
  );

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
   * @notice Emitted when an asset is removed from whitelists
   * @param key - The hash of the canonical identifier and domain of the token removed
   * @param caller - The account that called the function
   */
  event AssetRemoved(bytes32 indexed key, address caller);

  // ============ Getters ============

  function canonicalToAdopted(bytes32 _key) public view returns (address) {
    return _getAdoptedAsset(_key);
  }

  function canonicalToAdopted(TokenId calldata _canonical) public view returns (address) {
    return _getAdoptedAsset(AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain));
  }

  function adoptedToCanonical(address _adopted) public view returns (TokenId memory) {
    TokenId memory canonical = TokenId(s.adoptedToCanonical[_adopted].domain, s.adoptedToCanonical[_adopted].id);
    return canonical;
  }

  function canonicalToRepresentation(bytes32 _key) public view returns (address) {
    return _getRepresentationAsset(_key);
  }

  function canonicalToRepresentation(TokenId calldata _canonical) public view returns (address) {
    return _getRepresentationAsset(AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain));
  }

  function representationToCanonical(address _representation) public view returns (TokenId memory) {
    TokenId memory canonical = TokenId(
      s.representationToCanonical[_representation].domain,
      s.representationToCanonical[_representation].id
    );
    return canonical;
  }

  function getTokenId(address _candidate) public view returns (TokenId memory) {
    return _getCanonicalTokenId(_candidate);
  }

  function getLocalAndAdoptedToken(bytes32 _id, uint32 _domain) public view returns (address, address) {
    return _getLocalAndAdoptedToken(AssetLogic.calculateCanonicalHash(_id, _domain), _id, _domain);
  }

  function approvedAssets(bytes32 _key) public view returns (bool) {
    return s.approvedAssets[_key];
  }

  function approvedAssets(TokenId calldata _canonical) public view returns (bool) {
    return approvedAssets(AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain));
  }

  function adoptedToLocalPools(bytes32 _key) public view returns (IStableSwap) {
    return s.adoptedToLocalPools[_key];
  }

  function adoptedToLocalPools(TokenId calldata _canonical) public view returns (IStableSwap) {
    return adoptedToLocalPools(AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain));
  }

  // ============ Admin functions ============

  /**
   * @notice Used to add supported assets. This is an admin only function
   *
   * @dev When whitelisting the canonical asset, all representational assets would be
   * whitelisted as well. In the event you have a different adopted asset (i.e. PoS USDC
   * on polygon), you should *not* whitelist the adopted asset. The stable swap pool
   * address used should allow you to swap between the local <> adopted asset.
   *
   * @param _canonical - The canonical asset to add by id and domain. All representations
   * will be whitelisted as well
   * @param _adoptedAssetId - The used asset id for this domain (e.g. PoS USDC for
   * polygon)
   * @param _stableSwapPool - The address of the local stableswap pool, if it exists.
   */
  function setupAsset(
    TokenId calldata _canonical,
    uint8 _canonicalDecimals,
    string memory _representationName,
    string memory _representationSymbol,
    address _adoptedAssetId,
    address _stableSwapPool,
    uint256 _cap
  ) external onlyOwner returns (address _local) {
    // Deploy the representation token if on a remote domain
    if (_canonical.domain != s.domain) {
      _local = _deployRepresentation(
        _canonical.id,
        _canonical.domain,
        _canonicalDecimals,
        _representationName,
        _representationSymbol
      );
    } else {
      _local = TypeCasts.bytes32ToAddress(_canonical.id);
    }

    bytes32 key = _enrollAdoptedAndLocalAssets(_adoptedAssetId, _local, _stableSwapPool, _canonical);
    if (_cap != 0) {
      _setLiquidityCap(_canonical, _cap, key);
    }
  }

  function setupAssetWithDeployedRepresentation(
    TokenId calldata _canonical,
    address _representation,
    address _adoptedAssetId,
    address _stableSwapPool,
    uint256 _cap
  ) external onlyOwner returns (address) {
    bytes32 key = _enrollAdoptedAndLocalAssets(_adoptedAssetId, _representation, _stableSwapPool, _canonical);
    if (_cap != 0) {
      _setLiquidityCap(_canonical, _cap, key);
    }
    return _representation;
  }

  /**
   * @notice Adds a stable swap pool for the local <> adopted asset.
   * @dev Must pass in the _canonical information so it can be emitted in event
   */
  function addStableSwapPool(TokenId calldata _canonical, address _stableSwapPool) external onlyOwner {
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);
    _addStableSwapPool(_canonical, _stableSwapPool, key);
  }

  /**
   * @notice Adds a stable swap pool for the local <> adopted asset.
   * @dev Must pass in the _canonical information so it can be emitted in event
   */
  function updateLiquidityCap(TokenId calldata _canonical, uint256 _updated) external onlyOwner {
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);
    _setLiquidityCap(_canonical, _updated, key);
  }

  /**
   * @notice Used to remove assets from the whitelist
   * @param _key - The hash of the canonical id and domain to remove (mapping key)
   * @param _adoptedAssetId - Corresponding adopted asset to remove
   */
  function removeAssetId(
    bytes32 _key,
    address _adoptedAssetId,
    address _representation
  ) external onlyOwner {
    _removeAssetId(_key, _adoptedAssetId, _representation);
  }

  /**
   * @notice Used to remove assets from the whitelist
   * @param _canonical - The canonical id and domain to remove
   * @param _adoptedAssetId - Corresponding adopted asset to remove
   */
  function removeAssetId(
    TokenId calldata _canonical,
    address _adoptedAssetId,
    address _representation
  ) external onlyOwner {
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);
    _removeAssetId(key, _adoptedAssetId, _representation);
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
  ) external onlyOwner {
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);
    address local = s.canonicalToRepresentation[key];
    if (local == address(0)) {
      revert TokenFacet__updateDetails_localNotFound();
    }
    IBridgeToken(local).setDetails(_name, _symbol);
  }

  // ============ Private Functions ============

  function _enrollAdoptedAndLocalAssets(
    address _adopted,
    address _local,
    address _stableSwapPool,
    TokenId calldata _canonical
  ) internal returns (bytes32 _key) {
    // Get the key
    _key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);

    // Get true adopted
    address adopted = _adopted == address(0) ? _local : _adopted;

    // Sanity check: needs approval
    if (s.approvedAssets[_key]) revert TokenFacet__addAssetId_alreadyAdded();

    // Update approved assets mapping
    s.approvedAssets[_key] = true;

    // Update the adopted mapping using convention of local == adopted iff (_adooted == address(0))
    s.adoptedToCanonical[adopted].domain = _canonical.domain;
    s.adoptedToCanonical[adopted].id = _canonical.id;

    // Update the canonical mapping
    s.canonicalToAdopted[_key] = adopted;

    // representations only exist on non-canonical domains
    if (s.domain != _canonical.domain) {
      // Update the local <> canonical
      s.representationToCanonical[_local].domain = _canonical.domain;
      s.representationToCanonical[_local].id = _canonical.id;

      // Update the canonical <> local
      s.canonicalToRepresentation[_key] = _local;
      // Add the swap pool if specified
      if (_stableSwapPool != address(0)) {
        _addStableSwapPool(_canonical, _stableSwapPool, _key);
      }
    } // on the canonical domain, there is no representation (no pool either)

    // Emit event
    emit AssetAdded(_key, _canonical.id, _canonical.domain, adopted, _local, msg.sender);
  }

  /**
   * @notice Used to add an AMM for adopted <> local assets
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _stableSwap - The address of the amm to add
   * @param _key - The hash of the canonical id and domain
   */
  function _addStableSwapPool(
    TokenId calldata _canonical,
    address _stableSwap,
    bytes32 _key
  ) internal {
    // Update the pool mapping
    s.adoptedToLocalPools[_key] = IStableSwap(_stableSwap);

    emit StableSwapAdded(_key, _canonical.id, _canonical.domain, _stableSwap, msg.sender);
  }

  /**
   * @notice Used to add an AMM for adopted <> local assets
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _updated - The updated liquidity cap value
   * @param _key - The hash of the canonical id and domain
   */
  function _setLiquidityCap(
    TokenId calldata _canonical,
    uint256 _updated,
    bytes32 _key
  ) internal {
    // Update the stored cap
    s.caps[_key] = _updated;

    emit LiquidityCapUpdated(_key, _canonical.id, _canonical.domain, _updated, msg.sender);
  }

  /**
   * @notice Used to remove assets from the whitelist
   * @param _key - The hash of the canonical id and domain to remove (mapping key)
   * @param _adoptedAssetId - Corresponding adopted asset to remove
   */
  function _removeAssetId(
    bytes32 _key,
    address _adoptedAssetId,
    address _representation
  ) internal {
    // Sanity check: already approval
    if (!s.approvedAssets[_key]) revert TokenFacet__removeAssetId_notAdded();

    // Delete from approved assets mapping
    delete s.approvedAssets[_key];

    // Update caps
    delete s.caps[_key];

    // Delete from pools
    delete s.adoptedToLocalPools[_key];

    // Delete from adopted mapping
    delete s.adoptedToCanonical[_adoptedAssetId];

    // Delete from representation mapping
    delete s.representationToCanonical[_representation];

    // Delete from canonical mapping
    delete s.canonicalToAdopted[_key];
    delete s.canonicalToRepresentation[_key];

    // Emit event
    emit AssetRemoved(_key, msg.sender);
  }

  /**
   * @notice Deploy and initialize a new token contract
   * @dev Each token contract is a proxy which
   * points to the token upgrade beacon
   * @return _token the address of the token contract
   */
  function _deployRepresentation(
    bytes32 _id,
    uint32 _domain,
    uint8 _decimals,
    string memory _name,
    string memory _symbol
  ) internal returns (address _token) {
    // deploy and initialize the token contract
    _token = address(new UpgradeBeaconProxy(s.tokenBeacon, ""));
    // initialize the token with decimals and default name
    IBridgeToken(_token).initialize(_decimals, _name, _symbol);
    // emit event upon deploying new token
    emit TokenDeployed(_domain, _id, _token);
  }
}

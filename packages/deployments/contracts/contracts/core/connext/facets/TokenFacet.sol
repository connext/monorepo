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
    return _getAdoptedAsset(_canonical.id, _canonical.domain);
  }

  function adoptedToCanonical(address _adopted) public view returns (TokenId memory) {
    TokenId memory canonical = TokenId(s.adoptedToCanonical[_adopted].domain, s.adoptedToCanonical[_adopted].id);
    return canonical;
  }

  function canonicalToRepresentation(bytes32 _key) public view returns (address) {
    return _getRepresentationAsset(_key);
  }

  function canonicalToRepresentation(TokenId calldata _canonical) public view returns (address) {
    return _getRepresentationAsset(_canonical.id, _canonical.domain);
  }

  function representationToCanonical(address _representation) public view returns (TokenId memory) {
    TokenId memory canonical = TokenId(
      s.representationToCanonical[_representation].domain,
      s.representationToCanonical[_representation].id
    );
    return canonical;
  }

  function getLocalAndAdoptedToken(bytes32 _id, uint32 _domain) public view returns (address, address) {
    return _getLocalAndAdoptedToken(_id, _domain);
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
    address _adoptedAssetId,
    address _stableSwapPool
  ) external onlyOwner {
    // Native asset support does not exist in this contract
    if (_adoptedAssetId == address(0)) revert TokenFacet__addAssetId_nativeAsset();

    // Get the key
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);

    // Sanity check: needs approval
    if (s.approvedAssets[key]) revert TokenFacet__addAssetId_alreadyAdded();

    // Update approved assets mapping
    s.approvedAssets[key] = true;

    // Update the adopted mapping
    s.adoptedToCanonical[_adoptedAssetId].domain = _canonical.domain;
    s.adoptedToCanonical[_adoptedAssetId].id = _canonical.id;

    // Deploy the representation token if on a remote domain
    address local;
    if (_canonical.domain != s.domain) {
      local = _ensureRepresentationDeployed(key, _canonical.id, _canonical.domain, _canonicalDecimals);
    } else {
      local = TypeCasts.bytes32ToAddress(_canonical.id);
    }

    // Update the canonical mapping
    s.canonicalToAdopted[key] = _adoptedAssetId;

    // Emit event
    emit AssetAdded(key, _canonical.id, _canonical.domain, _adoptedAssetId, local, msg.sender);

    // Add the swap pool
    _addStableSwapPool(_canonical, _stableSwapPool, key);
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
   * @notice Used to remove assets from the whitelist
   * @param _key - The hash of the canonical id and domain to remove (mapping key)
   * @param _adoptedAssetId - Corresponding adopted asset to remove
   */
  function removeAssetId(bytes32 _key, address _adoptedAssetId) external onlyOwner {
    _removeAssetId(_key, _adoptedAssetId);
  }

  /**
   * @notice Used to remove assets from the whitelist
   * @param _canonical - The canonical id and domain to remove
   * @param _adoptedAssetId - Corresponding adopted asset to remove
   */
  function removeAssetId(TokenId calldata _canonical, address _adoptedAssetId) external onlyOwner {
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);
    _removeAssetId(key, _adoptedAssetId);
  }

  // ============ Private Functions ============

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
   * @notice Used to remove assets from the whitelist
   * @param _key - The hash of the canonical id and domain to remove (mapping key)
   * @param _adoptedAssetId - Corresponding adopted asset to remove
   */
  function _removeAssetId(bytes32 _key, address _adoptedAssetId) internal {
    // Sanity check: already approval
    if (!s.approvedAssets[_key]) revert TokenFacet__removeAssetId_notAdded();

    // Delete from approved assets mapping
    delete s.approvedAssets[_key];

    // Delete from pools
    delete s.adoptedToLocalPools[_key];

    // Delete from adopted mapping
    delete s.adoptedToCanonical[_adoptedAssetId];

    // Delete from canonical mapping
    delete s.canonicalToAdopted[_key];

    // Emit event
    emit AssetRemoved(_key, msg.sender);
  }

  /**
   * @notice Deploy and initialize a new token contract
   * @dev Each token contract is a proxy which
   * points to the token upgrade beacon
   * @return _token the address of the token contract
   */
  function _ensureRepresentationDeployed(
    bytes32 _key,
    bytes32 _id,
    uint32 _domain,
    uint8 _decimals
  ) internal returns (address _token) {
    // if there is already a token deployed, do nothing
    _token = s.canonicalToRepresentation[_key];
    if (_token == address(0)) {
      // deploy and initialize the token contract
      _token = address(new UpgradeBeaconProxy(s.tokenBeacon, ""));
      // set the default token name & symbol
      (string memory _name, string memory _symbol) = _defaultDetails(_domain, _id);
      // initialize the token with decimals and default name
      IBridgeToken(_token).initialize(_decimals, _name, _symbol);
      // store token in mappings
      _setCanonicalToRepresentation(_domain, _id, _token);
      _setRepresentationToCanonical(_domain, _id, _token);
      // emit event upon deploying new token
      emit TokenDeployed(_domain, _id, _token);
    }
  }

  /**
   * @notice Get default name and details for a token
   * Sets name to "nomad.[domain].[id]"
   * and symbol to
   * @param _domain the domain of the canonical token
   * @param _id the bytes32 ID pf the canonical of the token
   */
  function _defaultDetails(uint32 _domain, bytes32 _id)
    internal
    pure
    returns (string memory _name, string memory _symbol)
  {
    // get the first and second half of the token ID
    (, uint256 _secondHalfId) = Encoding.encodeHex(uint256(_id));
    // encode the default token name: "[decimal domain].[hex 4 bytes of ID]"
    _name = string(
      abi.encodePacked(
        Encoding.decimalUint32(_domain), // 10
        ".", // 1
        uint32(_secondHalfId) // 4
      )
    );
    // allocate the memory for a new 32-byte string
    _symbol = new string(10 + 1 + 4);
    assembly {
      mstore(add(_symbol, 0x20), mload(add(_name, 0x20)))
    }
  }

  /**
   * @notice Set the primary representation for a given canonical
   * @param _domain the domain of the canonical token
   * @param _id the bytes32 ID pf the canonical of the token
   * @param _representation the address of the representation token
   */
  function _setRepresentationToCanonical(
    uint32 _domain,
    bytes32 _id,
    address _representation
  ) internal {
    s.representationToCanonical[_representation].domain = _domain;
    s.representationToCanonical[_representation].id = _id;
  }

  /**
   * @notice Set the canonical token for a given representation
   * @param _domain the domain of the canonical token
   * @param _id the bytes32 ID pf the canonical of the token
   * @param _representation the address of the representation token
   */
  function _setCanonicalToRepresentation(
    uint32 _domain,
    bytes32 _id,
    address _representation
  ) internal {
    s.canonicalToRepresentation[AssetLogic.calculateCanonicalHash(_id, _domain)] = _representation;
  }
}

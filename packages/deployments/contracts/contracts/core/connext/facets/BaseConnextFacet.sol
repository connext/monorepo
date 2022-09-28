// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {CallParams, AppStorage, TokenId, Role} from "../libraries/LibConnextStorage.sol";
import {LibDiamond} from "../libraries/LibDiamond.sol";

contract BaseConnextFacet {
  AppStorage internal s;

  // ========== Properties ===========
  uint256 internal constant _NOT_ENTERED = 1;
  uint256 internal constant _ENTERED = 2;
  uint256 internal constant BPS_FEE_DENOMINATOR = 10_000;

  // Contains hash of empty bytes
  bytes32 internal constant EMPTY_HASH = hex"c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";

  // ========== Custom Errors ===========

  error BaseConnextFacet__onlyBridgeRouter_notBridgeRouter();
  error BaseConnextFacet__onlyOwner_notOwner();
  error BaseConnextFacet__onlyProposed_notProposedOwner();
  error BaseConnextFacet__onlyOwnerOrRouter_notOwnerOrRouter();
  error BaseConnextFacet__onlyOwnerOrWatcher_notOwnerOrWatcher();
  error BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin();
  error BaseConnextFacet__whenNotPaused_paused();
  error BaseConnextFacet__nonReentrant_reentrantCall();
  error BaseConnextFacet__getAdoptedAsset_notWhitelisted();

  // ============ Modifiers ============

  /**
   * @dev Prevents a contract from calling itself, directly or indirectly.
   * Calling a `nonReentrant` function from another `nonReentrant`
   * function is not supported. It is possible to prevent this from happening
   * by making the `nonReentrant` function external, and making it call a
   * `private` function that does the actual work.
   */
  modifier nonReentrant() {
    // On the first call to nonReentrant, _notEntered will be true
    if (s._status == _ENTERED) revert BaseConnextFacet__nonReentrant_reentrantCall();

    // Any calls to nonReentrant after this point will fail
    s._status = _ENTERED;

    _;

    // By storing the original value once again, a refund is triggered (see
    // https://eips.ethereum.org/EIPS/eip-2200)
    s._status = _NOT_ENTERED;
  }

  /**
   * @notice Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    if (LibDiamond.contractOwner() != msg.sender) revert BaseConnextFacet__onlyOwner_notOwner();
    _;
  }

  /**
   * @notice Throws if called by any account other than the proposed owner.
   */
  modifier onlyProposed() {
    if (s._proposed != msg.sender) revert BaseConnextFacet__onlyProposed_notProposedOwner();
    _;
  }

  /**
   * @notice Throws if called by any account other than the owner and router role.
   */
  modifier onlyOwnerOrRouter() {
    if (LibDiamond.contractOwner() != msg.sender && s.roles[msg.sender] != Role.Router)
      revert BaseConnextFacet__onlyOwnerOrRouter_notOwnerOrRouter();
    _;
  }

  /**
   * @notice Throws if called by any account other than the owner and watcher role.
   */
  modifier onlyOwnerOrWatcher() {
    if (LibDiamond.contractOwner() != msg.sender && s.roles[msg.sender] != Role.Watcher)
      revert BaseConnextFacet__onlyOwnerOrWatcher_notOwnerOrWatcher();
    _;
  }

  /**
   * @notice Throws if called by any account other than the owner and admin role.
   */
  modifier onlyOwnerOrAdmin() {
    if (LibDiamond.contractOwner() != msg.sender && s.roles[msg.sender] != Role.Admin)
      revert BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin();
    _;
  }

  /**
   * @notice Throws if all functionality is paused
   */
  modifier whenNotPaused() {
    if (s._paused) revert BaseConnextFacet__whenNotPaused_paused();
    _;
  }

  // ============ Internal functions ============
  /**
   * @notice Indicates if the router whitelist has been removed
   */
  function _isRouterWhitelistRemoved() internal view returns (bool) {
    return LibDiamond.contractOwner() == address(0) || s._routerWhitelistRemoved;
  }

  /**
   * @notice Indicates if the asset whitelist has been removed
   */
  function _isAssetWhitelistRemoved() internal view returns (bool) {
    return LibDiamond.contractOwner() == address(0) || s._assetWhitelistRemoved;
  }

  /**
   * @notice Returns the adopted assets for given canonical information
   */
  function _getAdoptedAsset(bytes32 _canonicalId, uint32 _canonicalDomain) internal view returns (address) {
    return _getAdoptedAsset(_calculateCanonicalHash(_canonicalId, _canonicalDomain));
  }

  /**
   * @notice Returns the adopted assets for given canonical information
   */
  function _getAdoptedAsset(bytes32 _key) internal view returns (address) {
    address adopted = s.canonicalToAdopted[_key];
    if (adopted == address(0)) {
      revert BaseConnextFacet__getAdoptedAsset_notWhitelisted();
    }
    return adopted;
  }

  /**
   * @notice Calculates a transferId
   */
  function _calculateTransferId(CallParams memory _params) internal pure returns (bytes32) {
    return keccak256(abi.encode(_params));
  }

  /**
   * @notice Calculates the hash of canonical id and domain
   * @dev This hash is used as the key for many asset-related mappings
   */
  function _calculateCanonicalHash(bytes32 _id, uint32 _domain) internal pure returns (bytes32) {
    return keccak256(abi.encode(_id, _domain));
  }

  /**
   * @notice Calculates the hash of canonical id and domain
   * @dev This is an alias to allow usage of `TokenId` struct directly
   */
  function _calculateCanonicalHash(TokenId calldata _canonical) internal pure returns (bytes32) {
    return _calculateCanonicalHash(_canonical.id, _canonical.domain);
  }

  /**
   * @notice Internal utility function that combines
   *         `_origin` and `_nonce`.
   * @dev Both origin and nonce should be less than 2^32 - 1
   * @param _origin Domain of chain where the transfer originated
   * @param _nonce The unique identifier for the message from origin to destination
   * @return Returns (`_origin` << 32) & `_nonce`
   */
  function _originAndNonce(uint32 _origin, uint32 _nonce) internal pure returns (uint64) {
    return (uint64(_origin) << 32) | _nonce;
  }
}

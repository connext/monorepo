// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {TransferInfo, AppStorage, Role} from "../libraries/LibConnextStorage.sol";
import {LibDiamond} from "../libraries/LibDiamond.sol";
import {AssetLogic} from "../libraries/AssetLogic.sol";
import {TokenId} from "../libraries/TokenId.sol";
import {Constants} from "../libraries/Constants.sol";

contract BaseConnextFacet {
  AppStorage internal s;

  // ========== Custom Errors ===========

  error BaseConnextFacet__onlyOwner_notOwner();
  error BaseConnextFacet__onlyProposed_notProposedOwner();
  error BaseConnextFacet__onlyOwnerOrRouter_notOwnerOrRouter();
  error BaseConnextFacet__onlyOwnerOrWatcher_notOwnerOrWatcher();
  error BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin();
  error BaseConnextFacet__whenNotPaused_paused();
  error BaseConnextFacet__nonReentrant_reentrantCall();
  error BaseConnextFacet__nonXCallReentrant_reentrantCall();
  error BaseConnextFacet__getAdoptedAsset_assetNotFound();
  error BaseConnextFacet__getApprovedCanonicalId_notAllowlisted();

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
    if (s._status == Constants.ENTERED) revert BaseConnextFacet__nonReentrant_reentrantCall();

    // Any calls to nonReentrant after this point will fail
    s._status = Constants.ENTERED;

    _;

    // By storing the original value once again, a refund is triggered (see
    // https://eips.ethereum.org/EIPS/eip-2200)
    s._status = Constants.NOT_ENTERED;
  }

  modifier nonXCallReentrant() {
    // On the first call to nonReentrant, _notEntered will be true
    if (s._xcallStatus == Constants.ENTERED) revert BaseConnextFacet__nonXCallReentrant_reentrantCall();

    // Any calls to nonReentrant after this point will fail
    s._xcallStatus = Constants.ENTERED;

    _;

    // By storing the original value once again, a refund is triggered (see
    // https://eips.ethereum.org/EIPS/eip-2200)
    s._xcallStatus = Constants.NOT_ENTERED;
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
    if (LibDiamond.contractOwner() != msg.sender && s.roles[msg.sender] != Role.RouterAdmin)
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
   * @notice Indicates if the router allowlist has been removed
   */
  function _isRouterAllowlistRemoved() internal view returns (bool) {
    return LibDiamond.contractOwner() == address(0) || s._routerAllowlistRemoved;
  }

  /**
   * @notice Returns the adopted assets for given canonical information
   */
  function _getAdoptedAsset(bytes32 _key) internal view returns (address) {
    address adopted = AssetLogic.getConfig(_key).adopted;
    if (adopted == address(0)) {
      revert BaseConnextFacet__getAdoptedAsset_assetNotFound();
    }
    return adopted;
  }

  /**
   * @notice Returns the adopted assets for given canonical information
   */
  function _getRepresentationAsset(bytes32 _key) internal view returns (address) {
    address representation = AssetLogic.getConfig(_key).representation;
    // If this is address(0), then there is no mintable token for this asset on this
    // domain
    return representation;
  }

  /**
   * @notice Calculates a transferId
   */
  function _calculateTransferId(TransferInfo memory _params) internal pure returns (bytes32) {
    return keccak256(abi.encode(_params));
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

  function _getLocalAsset(
    bytes32 _key,
    bytes32 _id,
    uint32 _domain
  ) internal view returns (address) {
    return AssetLogic.getLocalAsset(_key, _id, _domain, s);
  }

  function _getCanonicalTokenId(address _candidate) internal view returns (TokenId memory) {
    return AssetLogic.getCanonicalTokenId(_candidate, s);
  }

  function _getLocalAndAdoptedToken(
    bytes32 _key,
    bytes32 _id,
    uint32 _domain
  ) internal view returns (address, address) {
    address _local = AssetLogic.getLocalAsset(_key, _id, _domain, s);
    address _adopted = _getAdoptedAsset(_key);
    return (_local, _adopted);
  }

  function _isLocalOrigin(address _token) internal view returns (bool) {
    return AssetLogic.isLocalOrigin(_token, s);
  }

  function _getApprovedCanonicalId(address _candidate) internal view returns (TokenId memory, bytes32) {
    TokenId memory _canonical = _getCanonicalTokenId(_candidate);
    bytes32 _key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);
    if (!AssetLogic.getConfig(_key).approval) {
      revert BaseConnextFacet__getApprovedCanonicalId_notAllowlisted();
    }
    return (_canonical, _key);
  }
}

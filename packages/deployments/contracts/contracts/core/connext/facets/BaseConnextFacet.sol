// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {Home} from "../../../nomad-core/contracts/Home.sol";

import {AppStorage, PausedFunctions} from "../libraries/LibConnextStorage.sol";
import {LibDiamond} from "../libraries/LibDiamond.sol";

contract BaseConnextFacet {
  AppStorage internal s;

  // ========== Properties ===========
  uint256 internal constant _NOT_ENTERED = 1;
  uint256 internal constant _ENTERED = 2;

  // Contains hash of empty bytes
  bytes32 internal constant EMPTY = hex"c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";

  // ========== Custom Errors ===========

  error BaseConnextFacet__onlyRemoteRouter_notRemoteRouter();
  error BaseConnextFacet__onlyReplica_notReplica();
  error BaseConnextFacet__onlyOwner_notOwner();
  error BaseConnextFacet__onlyProposed_notProposedOwner();
  error BaseConnextFacet__whenBridgeNotPaused_bridgePaused();
  error BaseConnextFacet__whenBridgeNotPaused_swapPaused();
  error BaseConnextFacet__whenBridgeNotPaused_paused();

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
    require(s._status != _ENTERED, "ReentrancyGuard: reentrant call");

    // Any calls to nonReentrant after this point will fail
    s._status = _ENTERED;

    _;

    // By storing the original value once again, a refund is triggered (see
    // https://eips.ethereum.org/EIPS/eip-2200)
    s._status = _NOT_ENTERED;
  }

  /**
   * @notice Only accept messages from a remote Router contract
   * @param _origin The domain the message is coming from
   * @param _router The address the message is coming from
   */
  modifier onlyRemoteRouter(uint32 _origin, bytes32 _router) {
    if (!_isRemoteRouter(_origin, _router)) revert BaseConnextFacet__onlyRemoteRouter_notRemoteRouter();
    _;
  }

  /**
   * @notice Only accept messages from an Nomad Replica contract
   */
  modifier onlyReplica() {
    if (!_isReplica(msg.sender)) revert BaseConnextFacet__onlyReplica_notReplica();
    _;
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
   * @notice Throws if bridge or all functionality is paused
   */
  modifier whenBridgeNotPaused() {
    if (s._paused == PausedFunctions.Bridge || s._paused == PausedFunctions.All)
      revert BaseConnextFacet__whenBridgeNotPaused_bridgePaused();
    _;
  }

  /**
   * @notice Throws if swap or all functionality is paused
   */
  modifier whenSwapNotPaused() {
    if (s._paused == PausedFunctions.Swap || s._paused == PausedFunctions.All)
      revert BaseConnextFacet__whenBridgeNotPaused_swapPaused();
    _;
  }

  /**
   * @notice Throws if all functionality is paused
   */
  modifier whenNotPaused() {
    if (s._paused == PausedFunctions.All) revert BaseConnextFacet__whenBridgeNotPaused_paused();
    _;
  }

  // ============ Internal functions ============
  /**
   * @notice Indicates if the ownership of the router whitelist has
   * been renounced
   */
  function _isRouterOwnershipRenounced() internal view returns (bool) {
    return LibDiamond.contractOwner() == address(0) || s._routerOwnershipRenounced;
  }

  /**
   * @notice Indicates if the ownership of the asset whitelist has
   * been renounced
   */
  function _isAssetOwnershipRenounced() internal view returns (bool) {
    return LibDiamond.contractOwner() == address(0) || s._assetOwnershipRenounced;
  }

  /**
   * @notice Return true if the given domain / router is the address of a remote xApp Router
   * @param _domain The domain of the potential remote xApp Router
   * @param _router The address of the potential remote xApp Router
   */
  function _isRemoteRouter(uint32 _domain, bytes32 _router) internal view returns (bool) {
    return s.remotes[_domain] == _router;
  }

  /**
   * @notice Assert that the given domain has a xApp Router registered and return its address
   * @param _domain The domain of the chain for which to get the xApp Router
   * @return _remote The address of the remote xApp Router on _domain
   */
  function _mustHaveRemote(uint32 _domain) internal view returns (bytes32 _remote) {
    _remote = s.remotes[_domain];
    require(_remote != bytes32(0), "!remote");
  }

  /**
   * @notice Get the local Home contract from the xAppConnectionManager
   * @return The local Home contract
   */
  function _home() internal view returns (Home) {
    return s.xAppConnectionManager.home();
  }

  /**
   * @notice Determine whether _potentialReplcia is an enrolled Replica from the xAppConnectionManager
   * @return True if _potentialReplica is an enrolled Replica
   */
  function _isReplica(address _potentialReplica) internal view returns (bool) {
    return s.xAppConnectionManager.isReplica(_potentialReplica);
  }

  /**
   * @notice Get the local domain from the xAppConnectionManager
   * @return The local domain
   */
  function _localDomain() internal view virtual returns (uint32) {
    return s.xAppConnectionManager.localDomain();
  }
}

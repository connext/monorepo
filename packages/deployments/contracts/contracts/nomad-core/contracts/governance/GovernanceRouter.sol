// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;
pragma experimental ABIEncoderV2;

// ============ Internal Imports ============
import {Home} from "../Home.sol";
import {Version0} from "../Version0.sol";
import {XAppConnectionManager, TypeCasts} from "../XAppConnectionManager.sol";
import {IMessageRecipient} from "../../interfaces/IMessageRecipient.sol";
import {GovernanceMessage} from "./GovernanceMessage.sol";
// ============ External Imports ============
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import {TypedMemView} from "@summa-tx/memview-sol/contracts/TypedMemView.sol";
import {TypedMemView} from "../../libs/TypedMemView.sol";

contract GovernanceRouter is Version0, Initializable, IMessageRecipient {
  // ============ Libraries ============

  using SafeMath for uint256;
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using GovernanceMessage for bytes29;

  // ============== Enums ==============

  // The status of a batch of governance calls
  enum BatchStatus {
    Unknown, // 0
    Pending, // 1
    Complete // 2
  }

  // ============ Immutables ============

  uint32 public immutable localDomain;
  // number of seconds before recovery can be activated
  uint256 public immutable recoveryTimelock;

  // ============ Public Storage ============

  // timestamp when recovery timelock expires; 0 if timelock has not been initiated
  uint256 public recoveryActiveAt;
  // the address of the recovery manager multisig
  address public recoveryManager;
  // the local entity empowered to call governance functions, set to 0x0 on non-Governor chains
  address public governor;
  // domain of Governor chain -- for accepting incoming messages from Governor
  uint32 public governorDomain;
  // xAppConnectionManager contract which stores Replica addresses
  XAppConnectionManager public xAppConnectionManager;
  // domain -> remote GovernanceRouter contract address
  mapping(uint32 => bytes32) public routers;
  // array of all domains with registered GovernanceRouter
  uint32[] public domains;
  // call hash -> call status
  mapping(bytes32 => BatchStatus) public inboundCallBatches;

  // ============ Upgrade Gap ============

  // gap for upgrade safety
  uint256[42] private __GAP;

  // ============ Events ============

  /**
   * @notice Emitted a remote GovernanceRouter address is added, removed, or changed
   * @param domain the domain of the remote Router
   * @param previousRouter the previously registered router; 0 if router is being added
   * @param newRouter the new registered router; 0 if router is being removed
   */
  event SetRouter(uint32 indexed domain, bytes32 previousRouter, bytes32 newRouter);

  /**
   * @notice Emitted when the Governor role is transferred
   * @param previousGovernorDomain the domain of the previous Governor
   * @param newGovernorDomain the domain of the new Governor
   * @param previousGovernor the address of the previous Governor; 0 if the governor was remote
   * @param newGovernor the address of the new Governor; 0 if the governor is remote
   */
  event TransferGovernor(
    uint32 previousGovernorDomain,
    uint32 newGovernorDomain,
    address indexed previousGovernor,
    address indexed newGovernor
  );

  /**
   * @notice Emitted when the RecoveryManager role is transferred
   * @param previousRecoveryManager the address of the previous RecoveryManager
   * @param newRecoveryManager the address of the new RecoveryManager
   */
  event TransferRecoveryManager(address indexed previousRecoveryManager, address indexed newRecoveryManager);

  /**
   * @notice Emitted when recovery state is initiated by the RecoveryManager
   * @param recoveryManager the address of the current RecoveryManager who
   * initiated the transition
   * @param recoveryActiveAt the block at which recovery state will be active
   */
  event InitiateRecovery(address indexed recoveryManager, uint256 recoveryActiveAt);

  /**
   * @notice Emitted when recovery state is exited by the RecoveryManager
   * @param recoveryManager the address of the current RecoveryManager who
   * initiated the transition
   */
  event ExitRecovery(address recoveryManager);

  /**
   * @notice Emitted when a batch of governance instructions from the
   * governing remote router is received and ready for execution
   * @param batchHash A hash committing to the batch of calls to be executed
   */
  event BatchReceived(bytes32 indexed batchHash);

  /**
   * @notice Emitted when a batch of governance instructions from the
   * governing remote router is executed
   * @param batchHash A hash committing to the batch of calls to be executed
   */
  event BatchExecuted(bytes32 indexed batchHash);

  modifier typeAssert(bytes29 _view, GovernanceMessage.Types _type) {
    _view.assertType(uint40(_type));
    _;
  }

  // ============ Modifiers ============

  modifier onlyReplica() {
    require(xAppConnectionManager.isReplica(msg.sender), "!replica");
    _;
  }

  modifier onlyGovernorRouter(uint32 _domain, bytes32 _address) {
    require(_isGovernorRouter(_domain, _address), "!governorRouter");
    _;
  }

  modifier onlyGovernor() {
    require(msg.sender == governor || msg.sender == address(this), "! called by governor");
    _;
  }

  modifier onlyRecoveryManager() {
    require(msg.sender == recoveryManager, "! called by recovery manager");
    _;
  }

  modifier onlyInRecovery() {
    require(inRecovery(), "! in recovery");
    _;
  }

  modifier onlyNotInRecovery() {
    require(!inRecovery(), "in recovery");
    _;
  }

  modifier onlyGovernorOrRecoveryManager() {
    if (!inRecovery()) {
      require(msg.sender == governor || msg.sender == address(this), "! called by governor");
    } else {
      require(msg.sender == recoveryManager || msg.sender == address(this), "! called by recovery manager");
    }
    _;
  }

  // ============ Constructor ============

  constructor(uint32 _localDomain, uint256 _recoveryTimelock) {
    localDomain = _localDomain;
    recoveryTimelock = _recoveryTimelock;
  }

  // ============ Initializer ============

  function initialize(address _xAppConnectionManager, address _recoveryManager) public initializer {
    // initialize governor
    address _governorAddr = msg.sender;
    bool _isLocalGovernor = true;
    _transferGovernor(localDomain, _governorAddr, _isLocalGovernor);
    // initialize recovery manager
    recoveryManager = _recoveryManager;
    // initialize XAppConnectionManager
    setXAppConnectionManager(_xAppConnectionManager);
    require(xAppConnectionManager.localDomain() == localDomain, "XAppConnectionManager bad domain");
  }

  // ============ External Functions ============

  /**
   * @notice Handle Nomad messages
   * For all non-Governor chains to handle messages
   * sent from the Governor chain via Nomad.
   * Governor chain should never receive messages,
   * because non-Governor chains are not able to send them
   * @param _origin The domain (of the Governor Router)
   * @param _sender The message sender (must be the Governor Router)
   * @param _message The message
   */
  function handle(
    uint32 _origin,
    uint32, // _nonce (unused)
    bytes32 _sender,
    bytes memory _message
  ) external override onlyReplica onlyGovernorRouter(_origin, _sender) {
    bytes29 _msg = _message.ref(0);
    bytes29 _view = _msg.tryAsBatch();
    if (_view.notNull()) {
      _handleBatch(_view);
      return;
    }
    _view = _msg.tryAsTransferGovernor();
    if (_view.notNull()) {
      _handleTransferGovernor(_view);
      return;
    }
    require(false, "!valid message type");
  }

  /**
   * @notice Dispatch a set of local and remote calls
   * Local calls are executed immediately.
   * Remote calls are dispatched to the remote domain for processing and
   * execution.
   * @dev The contents of the _domains array at the same index
   * will determine the destination of messages in that _remoteCalls array.
   * As such, all messages in an array MUST have the same destination.
   * Missing destinations or too many will result in reverts.
   * @param _localCalls An array of local calls
   * @param _remoteCalls An array of arrays of remote calls
   */
  function executeGovernanceActions(
    GovernanceMessage.Call[] calldata _localCalls,
    uint32[] calldata _domains,
    GovernanceMessage.Call[][] calldata _remoteCalls
  ) external onlyGovernorOrRecoveryManager {
    require(_domains.length == _remoteCalls.length, "!domains length matches calls length");
    // remote calls are disallowed while in recovery
    require(_remoteCalls.length == 0 || !inRecovery(), "!remote calls in recovery mode");
    // _localCall loop
    for (uint256 i = 0; i < _localCalls.length; i++) {
      _callLocal(_localCalls[i]);
    }
    // remote calls loop
    for (uint256 i = 0; i < _remoteCalls.length; i++) {
      uint32 destination = _domains[i];
      _callRemote(destination, _remoteCalls[i]);
    }
  }

  /**
   * @notice Dispatch calls on a remote chain via the remote GovernanceRouter
   * @param _destination The domain of the remote chain
   * @param _calls The calls
   */
  function _callRemote(uint32 _destination, GovernanceMessage.Call[] calldata _calls)
    internal
    onlyGovernor
    onlyNotInRecovery
  {
    // ensure that destination chain has enrolled router
    bytes32 _router = _mustHaveRouter(_destination);
    // format batch message
    bytes memory _msg = GovernanceMessage.formatBatch(_calls);
    // dispatch call message using Nomad
    Home(xAppConnectionManager.home()).dispatch(_destination, _router, _msg);
  }

  /**
   * @notice Transfer governorship
   * @param _newDomain The domain of the new governor
   * @param _newGovernor The address of the new governor
   */
  function transferGovernor(uint32 _newDomain, address _newGovernor) external onlyGovernor onlyNotInRecovery {
    bool _isLocalGovernor = _isLocalDomain(_newDomain);
    // transfer the governor locally
    _transferGovernor(_newDomain, _newGovernor, _isLocalGovernor);
    // if the governor domain is local, we only need to change the governor address locally
    // no need to message remote routers; they should already have the same domain set and governor = bytes32(0)
    if (_isLocalGovernor) {
      return;
    }
    // format transfer governor message
    bytes memory _transferGovernorMessage = GovernanceMessage.formatTransferGovernor(
      _newDomain,
      TypeCasts.addressToBytes32(_newGovernor)
    );
    // send transfer governor message to all remote routers
    // note: this assumes that the Router is on the global GovernorDomain;
    // this causes a process error when relinquishing governorship
    // on a newly deployed domain which is not the GovernorDomain
    _sendToAllRemoteRouters(_transferGovernorMessage);
  }

  /**
   * @notice Transfer recovery manager role
   * @dev callable by the recoveryManager at any time to transfer the role
   * @param _newRecoveryManager The address of the new recovery manager
   */
  function transferRecoveryManager(address _newRecoveryManager) external onlyRecoveryManager {
    emit TransferRecoveryManager(recoveryManager, _newRecoveryManager);
    recoveryManager = _newRecoveryManager;
  }

  /**
   * @notice Set the router address for a given domain and
   * dispatch the change to all remote routers
   * @param _domain The domain
   * @param _router The address of the new router
   */
  function setRouterGlobal(uint32 _domain, bytes32 _router) external onlyGovernor onlyNotInRecovery {
    _setRouterGlobal(_domain, _router);
  }

  function _setRouterGlobal(uint32 _domain, bytes32 _router) internal {
    Home _home = Home(xAppConnectionManager.home());
    // Set up the call for use in the loop.
    // Because each domain's governance router may be different, we cannot
    // serialize the `Call` once and then reuse it. We have to re-serialize
    // the call, adjusting its `to` value on each step of the loop.
    GovernanceMessage.Call[] memory _calls = new GovernanceMessage.Call[](1);
    _calls[0].data = abi.encodeWithSignature("setRouterLocal(uint32,bytes32)", _domain, _router);
    for (uint256 i = 0; i < domains.length; i++) {
      uint32 _destination = domains[i];
      if (_destination != uint32(0)) {
        // set to, and dispatch
        bytes32 _recipient = routers[_destination];
        _calls[0].to = _recipient;
        bytes memory _msg = GovernanceMessage.formatBatch(_calls);
        _home.dispatch(_destination, _recipient, _msg);
      }
    }
    // set the router locally
    _setRouter(_domain, _router);
  }

  /**
   * @notice Set the router address *locally only*
   * @dev For use in deploy to setup the router mapping locally
   * @param _domain The domain
   * @param _router The new router
   */
  function setRouterLocal(uint32 _domain, bytes32 _router) external onlyGovernorOrRecoveryManager {
    // set the router locally
    _setRouter(_domain, _router);
  }

  /**
   * @notice Set the address of the XAppConnectionManager
   * @dev Domain/address validation helper
   * @param _xAppConnectionManager The address of the new xAppConnectionManager
   */
  function setXAppConnectionManager(address _xAppConnectionManager) public onlyGovernorOrRecoveryManager {
    xAppConnectionManager = XAppConnectionManager(_xAppConnectionManager);
  }

  /**
   * @notice Initiate the recovery timelock
   * @dev callable by the recovery manager
   */
  function initiateRecoveryTimelock() external onlyNotInRecovery onlyRecoveryManager {
    require(recoveryActiveAt == 0, "recovery already initiated");
    // set the time that recovery will be active
    recoveryActiveAt = block.timestamp.add(recoveryTimelock);
    emit InitiateRecovery(recoveryManager, recoveryActiveAt);
  }

  /**
   * @notice Exit recovery mode
   * @dev callable by the recovery manager to end recovery mode
   */
  function exitRecovery() external onlyRecoveryManager {
    require(recoveryActiveAt != 0, "recovery not initiated");
    delete recoveryActiveAt;
    emit ExitRecovery(recoveryManager);
  }

  // ============ Public Functions ============

  /**
   * @notice Check if the contract is in recovery mode currently
   * @return TRUE iff the contract is actively in recovery mode currently
   */
  function inRecovery() public view returns (bool) {
    uint256 _recoveryActiveAt = recoveryActiveAt;
    bool _recoveryInitiated = _recoveryActiveAt != 0;
    bool _recoveryActive = _recoveryActiveAt <= block.timestamp;
    return _recoveryInitiated && _recoveryActive;
  }

  // ============ Internal Functions ============

  /**
   * @notice Handle message dispatching calls locally
   * @dev We considered requiring the batch was not previously known.
   *      However, this would prevent us from ever processing identical
   *      batches, which seems desirable in some cases.
   *      As a result, we simply set it to pending.
   * @param _msg The message
   */
  function _handleBatch(bytes29 _msg) internal typeAssert(_msg, GovernanceMessage.Types.Batch) {
    bytes32 _batchHash = _msg.batchHash();
    // prevent accidental SSTORE and extra event if already pending
    if (inboundCallBatches[_batchHash] == BatchStatus.Pending) return;
    inboundCallBatches[_batchHash] = BatchStatus.Pending;
    emit BatchReceived(_batchHash);
  }

  /**
   * @notice execute a pending batch of messages
   */
  function executeCallBatch(GovernanceMessage.Call[] calldata _calls) external {
    bytes32 _batchHash = GovernanceMessage.getBatchHash(_calls);
    require(inboundCallBatches[_batchHash] == BatchStatus.Pending, "!batch pending");
    inboundCallBatches[_batchHash] = BatchStatus.Complete;
    for (uint256 i = 0; i < _calls.length; i++) {
      _callLocal(_calls[i]);
    }
    emit BatchExecuted(_batchHash);
  }

  /**
   * @notice Handle message transferring governorship to a new Governor
   * @param _msg The message
   */
  function _handleTransferGovernor(bytes29 _msg) internal typeAssert(_msg, GovernanceMessage.Types.TransferGovernor) {
    uint32 _newDomain = _msg.domain();
    address _newGovernor = TypeCasts.bytes32ToAddress(_msg.governor());
    bool _isLocalGovernor = _isLocalDomain(_newDomain);
    _transferGovernor(_newDomain, _newGovernor, _isLocalGovernor);
  }

  /**
   * @notice Dispatch message to all remote routers
   * @param _msg The message
   */
  function _sendToAllRemoteRouters(bytes memory _msg) internal {
    Home _home = Home(xAppConnectionManager.home());

    for (uint256 i = 0; i < domains.length; i++) {
      if (domains[i] != uint32(0)) {
        _home.dispatch(domains[i], routers[domains[i]], _msg);
      }
    }
  }

  /**
   * @notice Dispatch call locally
   * @param _call The call
   * @return _ret
   */
  function _callLocal(GovernanceMessage.Call memory _call) internal returns (bytes memory _ret) {
    address _toContract = TypeCasts.bytes32ToAddress(_call.to);
    // attempt to dispatch using low-level call
    bool _success;
    (_success, _ret) = _toContract.call(_call.data);
    // revert if the call failed
    require(_success, "call failed");
  }

  /**
   * @notice Transfer governorship within this contract's state
   * @param _newDomain The domain of the new governor
   * @param _newGovernor The address of the new governor
   * @param _isLocalGovernor True if the newDomain is the localDomain
   */
  function _transferGovernor(
    uint32 _newDomain,
    address _newGovernor,
    bool _isLocalGovernor
  ) internal {
    // require that the governor domain has a valid router
    if (!_isLocalGovernor) {
      _mustHaveRouter(_newDomain);
    }
    // Governor is 0x0 unless the governor is local
    address _newGov = _isLocalGovernor ? _newGovernor : address(0);
    // emit event before updating state variables
    emit TransferGovernor(governorDomain, _newDomain, governor, _newGov);
    // update state
    governorDomain = _newDomain;
    governor = _newGov;
  }

  /**
   * @notice Set the router for a given domain
   * @param _domain The domain
   * @param _newRouter The new router
   */
  function _setRouter(uint32 _domain, bytes32 _newRouter) internal {
    // ignore local domain in router mapping
    require(!_isLocalDomain(_domain), "can't set local router");
    // store previous router in memory
    bytes32 _previousRouter = routers[_domain];
    // if router is being removed,
    if (_newRouter == bytes32(0)) {
      // remove domain from array
      _removeDomain(_domain);
      // remove router from mapping
      delete routers[_domain];
    } else {
      // if router was not previously added,
      if (_previousRouter == bytes32(0)) {
        // add domain to array
        _addDomain(_domain);
      }
      // set router in mapping (add or change)
      routers[_domain] = _newRouter;
    }
    // emit event
    emit SetRouter(_domain, _previousRouter, _newRouter);
  }

  /**
   * @notice Add a domain that has a router
   * @param _domain The domain
   */
  function _addDomain(uint32 _domain) internal {
    domains.push(_domain);
  }

  /**
   * @notice Remove a domain from array
   * @param _domain The domain
   */
  function _removeDomain(uint32 _domain) internal {
    // find the index of the domain to remove & delete it from domains[]
    for (uint256 i = 0; i < domains.length; i++) {
      if (domains[i] == _domain) {
        delete domains[i];
        return;
      }
    }
  }

  /**
   * @notice Determine if a given domain and address is the Governor Router
   * @param _domain The domain
   * @param _address The address of the domain's router
   * @return _ret True if the given domain/address is the
   * Governor Router.
   */
  function _isGovernorRouter(uint32 _domain, bytes32 _address) internal view returns (bool) {
    return _domain == governorDomain && _address == routers[_domain];
  }

  /**
   * @notice Determine if a given domain is the local domain
   * @param _domain The domain
   * @return _ret - True if the given domain is the local domain
   */
  function _isLocalDomain(uint32 _domain) internal view returns (bool) {
    return _domain == localDomain;
  }

  /**
   * @notice Require that a domain has a router and returns the router
   * @param _domain The domain
   * @return _router - The domain's router
   */
  function _mustHaveRouter(uint32 _domain) internal view returns (bytes32 _router) {
    _router = routers[_domain];
    require(_router != bytes32(0), "!router");
  }
}

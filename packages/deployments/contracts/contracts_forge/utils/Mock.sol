// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {IRootManager} from "../../contracts/messaging/interfaces/IRootManager.sol";
import {IHubConnector} from "../../contracts/messaging/interfaces/IHubConnector.sol";
import {IConnector} from "../../contracts/messaging/interfaces/IConnector.sol";
import {IConnectorManager} from "../../contracts/messaging/interfaces/IConnectorManager.sol";
import {IOutbox} from "../../contracts/messaging/interfaces/IOutbox.sol";
import {Connector} from "../../contracts/messaging/connectors/Connector.sol";
import {HubConnector} from "../../contracts/messaging/connectors/HubConnector.sol";
import {SpokeConnector} from "../../contracts/messaging/connectors/SpokeConnector.sol";
import {RootManager} from "../../contracts/messaging/RootManager.sol";

import {BaseConnextFacet} from "../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {IAavePool} from "../../contracts/core/connext/interfaces/IAavePool.sol";
import {IXReceiver} from "../../contracts/core/connext/interfaces/IXReceiver.sol";
import {ITokenRegistry} from "../../contracts/core/connext/interfaces/ITokenRegistry.sol";
import {IBridgeRouter} from "../../contracts/core/connext/interfaces/IBridgeRouter.sol";
import {IWeth} from "../../contracts/core/connext/interfaces/IWeth.sol";

import {ProposedOwnable} from "../../contracts/shared/ProposedOwnable.sol";

import {TestERC20} from "../../contracts/test/TestERC20.sol";

import "forge-std/console.sol";

contract MockXAppConnectionManager is IConnectorManager {
  MockHome _home;

  uint32 public immutable domain;

  mapping(address => bool) enrolledInboxes;

  constructor(MockHome home_) {
    _home = home_;
    domain = _home.localDomain();
  }

  function home() external view returns (IOutbox) {
    return IOutbox(address(_home));
  }

  function isReplica(address _replica) external view returns (bool) {
    return enrolledInboxes[_replica];
  }

  function localDomain() external view returns (uint32) {
    return domain;
  }

  function enrollInbox(address _inbox) external {
    enrolledInboxes[_inbox] = true;
  }
}

contract MockHome is IOutbox {
  uint32 public domain;
  bytes32 public immutable MESSAGE_HASH = bytes32("test message");

  constructor(uint32 _domain) {
    domain = _domain;
  }

  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody
  ) external returns (bytes32) {
    1 == 1;
    return MESSAGE_HASH;
  }

  function localDomain() external returns (uint32) {
    return domain;
  }
}

contract MockConnext {
  function claim(address _recipient, bytes32[] calldata _transferIds) external {
    1 == 1;
  }
}

contract MockXApp is IXReceiver {
  bool public fails = false;
  bool public permissioned = false;

  address public originSender;
  uint32 public originDomain;

  event MockXAppEvent(
    address caller,
    bytes32 transferId,
    uint256 amount,
    address asset,
    address originSender,
    uint32 origin,
    bytes callData
  );

  function setFail(bool _fails) public {
    fails = _fails;
  }

  function setPermissions(address _originSender, uint32 _originDomain) public {
    permissioned = true;
    originSender = _originSender;
    originDomain = _originDomain;
  }

  function xReceive(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    address _originSender,
    uint32 _origin,
    bytes memory _callData
  ) public returns (bytes memory) {
    require(!fails, "fails");
    if (permissioned) {
      require(_originSender == originSender, "!originSender");
      require(_origin == originDomain, "!originDomain");
    }

    emit MockXAppEvent(msg.sender, _transferId, _amount, _asset, _originSender, _origin, _callData);

    return bytes("xReceive");
  }
}

contract MockRelayerFeeRouter {
  uint32 public handledOrigin;
  uint32 public handledNonce;
  bytes32 public handledSender;
  bytes public handledBody;

  function send(
    uint32 _domain,
    address _recipient,
    bytes32[] calldata _transactionIds
  ) external {
    1 == 1;
  }

  function handle(
    uint32 origin,
    uint32 nonce,
    bytes32 sender,
    bytes memory body
  ) public {
    handledOrigin = origin;
    handledNonce = nonce;
    handledSender = sender;
    handledBody = body;
  }
}

contract MockPool is IAavePool {
  bool fails;

  constructor(bool _fails) {
    fails = _fails;
  }

  function mintUnbacked(
    address asset,
    uint256 amount,
    address onBehalfOf,
    uint16 referralCode
  ) external override {
    TestERC20(asset).mint(address(this), amount);
  }

  function backUnbacked(
    address asset,
    uint256 amount,
    uint256 fee
  ) external override {
    require(!fails, "fail");
  }

  function withdraw(
    address asset,
    uint256 amount,
    address to
  ) external override returns (uint256) {
    TestERC20(asset).transfer(msg.sender, amount);
    return amount;
  }
}

contract TestSetterFacet is BaseConnextFacet {
  function setTestRelayerFees(bytes32 _transferId, uint256 _fee) external {
    s.relayerFees[_transferId] = _fee;
  }

  function setTestTransferRelayer(bytes32 _transferId, address _relayer) external {
    s.transferRelayer[_transferId] = _relayer;
  }

  function setTestApproveRouterForPortal(address _router, bool _value) external {
    s.routerPermissionInfo.approvedForPortalRouters[_router] = _value;
  }

  function setTestApprovedRelayer(address _relayer, bool _approved) external {
    s.approvedRelayers[_relayer] = _approved;
  }

  function setTestRouterBalances(
    address _router,
    address _local,
    uint256 _amount
  ) external {
    s.routerBalances[_router][_local] = _amount;
  }

  function setTestApprovedRouter(address _router, bool _approved) external {
    s.routerPermissionInfo.approvedRouters[_router] = _approved;
  }

  function setTestCanonicalToAdopted(bytes32 _id, address _adopted) external {
    s.canonicalToAdopted[_id] = _adopted;
  }

  function setTestAavePortalDebt(bytes32 _id, uint256 _amount) external {
    s.portalDebt[_id] = _amount;
  }

  function setTestAavePortalFeeDebt(bytes32 _id, uint256 _amount) external {
    s.portalFeeDebt[_id] = _amount;
  }

  function setTestRoutedTransfers(bytes32 _id, address[] memory _routers) external {
    s.routedTransfers[_id] = _routers;
  }
}

contract MockBridgeRouter is IBridgeRouter {
  mapping(bytes32 => address) public tokenInputs;
  mapping(bytes32 => uint256) public amountInputs;
  mapping(bytes32 => uint32) public destinationInputs;
  mapping(bytes32 => bytes32) public hookInputs;

  bytes32 public id;

  bytes32 public immutable MESSAGE_HASH = bytes32("test message");

  event XSendCalled(address _token, uint256 _amount, uint32 _destination, bytes32 hook, bytes extra);

  function send(
    address _token,
    uint256 _amount,
    uint32 _destination,
    bytes32 _recipient,
    bool _enableFast /* _enableFast deprecated field, left argument for backwards compatibility */
  ) external {
    require(false, "shouldnt use send");
  }

  function registerTransferId(bytes32 _id) public {
    id = _id;
  }

  function sendToHook(
    address _token,
    uint256 _amount,
    uint32 _destination,
    bytes32 _remoteHook,
    bytes calldata _external
  ) external returns (bytes32) {
    tokenInputs[id] = _token;
    amountInputs[id] = _amount;
    destinationInputs[id] = _destination;
    hookInputs[id] = _remoteHook;
    // transfer amount here
    if (_amount > 0) {
      SafeERC20.safeTransferFrom(IERC20(_token), msg.sender, address(this), _amount);
    }
    emit XSendCalled(_token, _amount, _destination, _remoteHook, _external);
    return MESSAGE_HASH;
  }

  function getToken(bytes32 transferId) external returns (address) {
    return tokenInputs[transferId];
  }

  function getAmount(bytes32 transferId) external returns (uint256) {
    return amountInputs[transferId];
  }

  function getDestination(bytes32 transferId) external returns (uint32) {
    return destinationInputs[transferId];
  }
}

contract MockTokenRegistry is ITokenRegistry {
  function isLocalOrigin(address _token) external pure returns (bool) {
    return true;
  }

  function ensureLocalToken(
    uint32 _domain,
    bytes32 _id,
    uint8 _decimals
  ) external pure returns (address _local) {
    return address(42);
  }

  function mustHaveLocalToken(uint32 _domain, bytes32 _id) external pure returns (IERC20) {
    return IERC20(address(42));
  }

  function getLocalAddress(uint32 _domain, bytes32 _id) external pure returns (address _local) {
    return address(42);
  }

  function getTokenId(address _token) external pure returns (uint32, bytes32) {
    return (uint32(42), bytes32("A"));
  }

  function enrollCustom(
    uint32 _domain,
    bytes32 _id,
    address _custom
  ) external {}

  function oldReprToCurrentRepr(address _oldRepr) external pure returns (address _currentRepr) {
    return address(42);
  }
}

contract FeeERC20 is ERC20 {
  uint256 public fee = 1;

  constructor() ERC20("Fee Test Token", "FEE") {
    _mint(msg.sender, 1000000 ether);
  }

  function setFee(uint256 _fee) external {
    fee = _fee;
  }

  function mint(address account, uint256 amount) external {
    _mint(account, amount);
  }

  function burn(address account, uint256 amount) external {
    _burn(account, amount);
  }

  function transfer(address account, uint256 amount) public override returns (bool) {
    uint256 toTransfer = amount - fee;
    _transfer(msg.sender, account, toTransfer);
    return true;
  }

  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) public override returns (bool) {
    uint256 toTransfer = amount - fee;
    _burn(sender, fee);
    _transfer(sender, recipient, toTransfer);
    return true;
  }
}

// ============ Messaging Mocks ============

/**
 * @notice This class mocks the connector functionality.
 */
contract MockSpokeConnector is SpokeConnector {
  bytes32 public lastReceived;
  bytes32 public lastOutbound;

  bool public verified;

  bool updatesAggregate;

  // bytes32 public aggregateRoot;
  // uint32 public mirrorDomain;

  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _merkle,
    address _mirrorConnector,
    uint256 _mirrorGas,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _delayBlocks,
    address _watcherManager
  )
    ProposedOwnable()
    SpokeConnector(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _mirrorGas,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    )
  {
    _setOwner(msg.sender);
    verified = true;
    // mirrorDomain = _mirrorDomain;
  }

  function setSenderVerified(bool _verified) public {
    verified = _verified;
  }

  function setUpdatesAggregate(bool _updatesAggregate) public {
    updatesAggregate = _updatesAggregate;
  }

  function _sendMessage(bytes memory _data) internal override {
    lastOutbound = keccak256(_data);
  }

  function _processMessage(bytes memory _data) internal override {
    lastReceived = keccak256(_data);
    if (updatesAggregate) {
      // FIXME: when using this.update it sets caller to address(this) not AMB
      aggregateRootCurrent = bytes32(_data);
      aggregateRootPending = bytes32(_data);
    }
  }

  function _verifySender(address _expected) internal override returns (bool) {
    return verified;
  }
}

contract MockHubConnector is HubConnector {
  address public rootManager;
  bytes32 public lastOutbound;
  bytes32 public lastReceived;
  bool public verified;
  bool public updatesAggregate;

  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorGas
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorGas) {
    _setOwner(msg.sender);
    verified = true;
  }

  function setSenderVerified(bool _verified) public {
    verified = _verified;
  }

  function setUpdatesAggregate(bool _updatesAggregate) public {
    updatesAggregate = _updatesAggregate;
  }

  function _verifySender(address _expected) internal override returns (bool) {
    return verified;
  }

  function _sendMessage(bytes memory _data) internal override {
    lastOutbound = keccak256(_data);
  }

  function _processMessage(bytes memory _data) internal override {
    lastReceived = keccak256(_data);
    // hub spokes always update aggregate
    if (updatesAggregate) {
      RootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, bytes32(_data));
    }
  }
}

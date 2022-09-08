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
import {SpokeConnector} from "../../contracts/messaging/connectors/SpokeConnector.sol";
import {RootManager} from "../../contracts/messaging/RootManager.sol";

import {TypedMemView, PromiseMessage, PromiseRouter} from "../../contracts/core/promise/PromiseRouter.sol";
import {ICallback} from "../../contracts/core/promise/interfaces/ICallback.sol";

import {BaseConnextFacet} from "../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {IAavePool} from "../../contracts/core/connext/interfaces/IAavePool.sol";
import {ISponsorVault} from "../../contracts/core/connext/interfaces/ISponsorVault.sol";
import {ITokenRegistry} from "../../contracts/core/connext/interfaces/ITokenRegistry.sol";
import {IBridgeRouter} from "../../contracts/core/connext/interfaces/IBridgeRouter.sol";
import {IWeth} from "../../contracts/core/connext/interfaces/IWeth.sol";
import {IExecutor} from "../../contracts/core/connext/interfaces/IExecutor.sol";
import {LibCrossDomainProperty} from "../../contracts/core/connext/libraries/LibCrossDomainProperty.sol";

import {ProposedOwnable} from "../../contracts/shared/ProposedOwnable.sol";

import {TestERC20} from "../../contracts/test/TestERC20.sol";

import "forge-std/console.sol";

contract MockXAppConnectionManager is IConnectorManager {
  MockHome _home;

  uint32 public immutable domain;

  mapping(address => bool) enrolledInboxes;

  constructor(MockHome home_) public {
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

contract MockXApp {
  bytes32 constant TEST_MESSAGE = bytes32("test message");

  event MockXAppEvent(address caller, address asset, bytes32 message, uint256 amount);

  modifier checkMockMessage(bytes32 message) {
    require(keccak256(abi.encode(message)) == keccak256(abi.encode(TEST_MESSAGE)), "Mock message invalid!");
    _;
  }

  // This method call will transfer asset to this contract and succeed.
  function fulfill(address asset, bytes32 message) external checkMockMessage(message) returns (bytes32) {
    IExecutor executor = IExecutor(address(msg.sender));

    emit MockXAppEvent(msg.sender, asset, message, LibCrossDomainProperty.amount(msg.data));

    IERC20(asset).transferFrom(address(executor), address(this), LibCrossDomainProperty.amount(msg.data));

    return (bytes32("good"));
  }

  // Read from originDomain/originSender properties and validate them based on arguments.
  function fulfillWithProperties(
    address asset,
    bytes32 message,
    uint256 expectedOriginDomain,
    address expectedOriginSender
  ) external checkMockMessage(message) returns (bytes32) {
    IExecutor executor = IExecutor(address(msg.sender));

    emit MockXAppEvent(msg.sender, asset, message, LibCrossDomainProperty.amount(msg.data));

    IERC20(asset).transferFrom(address(executor), address(this), LibCrossDomainProperty.amount(msg.data));

    require(expectedOriginDomain == LibCrossDomainProperty.origin(msg.data), "Origin domain incorrect");
    require(expectedOriginSender == LibCrossDomainProperty.originSender(msg.data), "Origin sender incorrect");

    return (bytes32("good"));
  }

  // This method call will always fail.
  function fail() external pure {
    require(false, "bad");
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

contract MockPromiseRouter is PromiseRouter {
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using PromiseMessage for bytes29;

  function mockHandle(
    address callbackAddress,
    bool returnSuccess,
    bytes calldata returnData
  ) public {
    bytes32 transferId = "A";

    bytes memory message = PromiseMessage.formatPromiseCallback(transferId, callbackAddress, returnSuccess, returnData);
    bytes29 _msg = message.ref(0).mustBePromiseCallback();

    messageHashes[transferId] = _msg.keccak();
  }
}

contract MockCallback is ICallback {
  mapping(bytes32 => bool) public transferSuccess;
  mapping(bytes32 => bytes32) public transferData;

  bool public fails;

  function shouldFail(bool fail) external {
    fails = fail;
  }

  function callback(
    bytes32 transferId,
    bool success,
    bytes memory data
  ) external {
    if (fails) {
      require(false, "fails");
    }
    transferSuccess[transferId] = success;
    transferData[transferId] = keccak256(data);
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

  function setTestSponsorVault(address _sponsorVault) external {
    s.sponsorVault = ISponsorVault(_sponsorVault);
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

  function ensureLocalToken(uint32 _domain, bytes32 _id) external pure returns (address _local) {
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

contract MockSponsorVault is ISponsorVault {
  uint256 liquidity;
  uint256 dust;

  constructor(uint256 _liquidity, uint256 _dust) {
    liquidity = _liquidity;
    dust = _dust;
  }

  function setLiquidity(uint256 _liquidity) external {
    liquidity = _liquidity;
  }

  function reimburseLiquidityFees(
    address token,
    uint256 amount,
    address receiver
  ) external returns (uint256) {
    TestERC20(token).mint(msg.sender, liquidity);
    return liquidity;
  }

  function reimburseRelayerFees(
    uint32 originDomain,
    address payable receiver,
    uint256 amount
  ) external {
    Address.sendValue(receiver, dust);
  }

  // Should allow anyone to send funds to the vault for sponsoring fees
  function deposit(address _token, uint256 _amount) external payable {}

  // Should allow the owner of the vault to withdraw funds put in to a given
  // address
  function withdraw(
    address token,
    address receiver,
    uint256 amount
  ) external {}
}

contract MockCalldata {
  address public originSender;
  uint32 public originDomain;

  bool public called = false;

  constructor(address _originSender, uint32 _originDomain) {
    setPermissions(_originSender, _originDomain);
  }

  function setPermissions(address _originSender, uint32 _originDomain) public {
    originSender = _originSender;
    originDomain = _originDomain;
  }

  function permissionedCall(address asset) public returns (bool) {
    require(LibCrossDomainProperty.originSender(msg.data) == originSender);
    require(LibCrossDomainProperty.origin(msg.data) == originDomain);
    // transfer funds from sender
    IERC20(asset).transferFrom(msg.sender, address(this), LibCrossDomainProperty.amount(msg.data));
    called = true;
    return called;
  }

  function unpermissionedCall(address asset) public returns (bool) {
    // transfer funds from sender
    IERC20(asset).transferFrom(msg.sender, address(this), LibCrossDomainProperty.amount(msg.data));
    called = true;
    return called;
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
contract MockConnector is SpokeConnector, IHubConnector {
  bytes32 public lastOutbound;
  bytes32 public lastReceived;

  bool public verified;

  bool updatesAggregate;

  // bytes32 public aggregateRoot;
  // uint32 public mirrorDomain;

  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    ProposedOwnable()
    SpokeConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorGas, _processGas, _reserveGas)
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

  function sendMessage(bytes memory _data) external onlyRootManager {
    _sendMessage(_data);
    emit MessageSent(_data, msg.sender);
  }

  function _sendMessage(bytes memory _data) internal override {
    lastOutbound = keccak256(_data);
    emit MessageSent(_data, msg.sender);
  }

  function _processMessage(bytes memory _data) internal override {
    lastReceived = keccak256(_data);
    if (updatesAggregate) {
      // FIXME: when using this.update it sets caller to address(this) not AMB
      aggregateRoot = bytes32(_data);
    } else {
      RootManager(ROOT_MANAGER).setOutboundRoot(MIRROR_DOMAIN, bytes32(_data));
    }
    emit MessageProcessed(_data, msg.sender);
  }

  function _verifySender(address _expected) internal override returns (bool) {
    return verified;
  }
}

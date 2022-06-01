// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {TypedMemView, PromiseMessage, PromiseRouter} from "../../contracts/core/promise/PromiseRouter.sol";
import {ICallback} from "../../contracts/core/promise/interfaces/ICallback.sol";
import {BaseConnextFacet} from "../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {ISponsorVault} from "../../contracts/core/connext/interfaces/ISponsorVault.sol";
import {ITokenRegistry} from "../../contracts/core/connext/interfaces/ITokenRegistry.sol";
import {IWrapped} from "../../contracts/core/connext/interfaces/IWrapped.sol";
import {ERC20} from "../../contracts/core/connext/helpers/OZERC20.sol";
import {IExecutor} from "../../contracts/core/connext/interfaces/IExecutor.sol";

contract MockXAppConnectionManager {
  MockHome _home;

  constructor(MockHome home) public {
    _home = home;
  }

  function home() external returns (MockHome) {
    return _home;
  }
}

contract MockHome {
  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody
  ) external {
    1 == 1;
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

    emit MockXAppEvent(msg.sender, asset, message, executor.amount());

    IERC20(asset).transferFrom(address(executor), address(this), executor.amount());

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

    emit MockXAppEvent(msg.sender, asset, message, executor.amount());

    IERC20(asset).transferFrom(address(executor), address(this), executor.amount());

    require(expectedOriginDomain == executor.origin(), "Origin domain incorrect");
    require(expectedOriginSender == executor.originSender(), "Origin sender incorrect");

    return (bytes32("good"));
  }

  // This method call will always fail.
  function fail() external pure {
    require(false, "bad");
  }
}

contract MockRelayerFeeRouter {
  function send(
    uint32 _domain,
    address _recipient,
    bytes32[] calldata _transactionIds
  ) external {
    1 == 1;
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
  function callback(
    bytes32 transferId,
    bool success,
    bytes memory data
  ) external {
    require(data.length != 0);
  }
}

contract TestSetterFacet is BaseConnextFacet {
  function setTestRelayerFees(bytes32 _transferId, uint256 _fee) external {
    s.relayerFees[_transferId] = _fee;
  }

  function setTestTransferRelayer(bytes32 _transferId, address _relayer) external {
    s.transferRelayer[_transferId] = _relayer;
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
}

contract MockWrapper is IWrapped, ERC20 {
  function deposit() external payable {}

  function withdraw(uint256 amount) external {}
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

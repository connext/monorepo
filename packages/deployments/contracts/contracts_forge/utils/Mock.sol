// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {TypedMemView, PromiseMessage, PromiseRouter} from "../../contracts/core/promise/PromiseRouter.sol";
import {ICallback} from "../../contracts/core/promise/interfaces/ICallback.sol";
import {BaseConnextFacet} from "../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {ISponsorVault} from "../../contracts/core/connext/interfaces/ISponsorVault.sol";
import {ITokenRegistry} from "../../contracts/core/connext/interfaces/ITokenRegistry.sol";
import {IWrapped} from "../../contracts/core/connext/interfaces/IWrapped.sol";

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

contract MockWrapper is IWrapped {
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

// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {TypedMemView, PromiseMessage, PromiseRouter} from "../../contracts/nomad-xapps/contracts/promise-router/PromiseRouter.sol";
import {ICallback} from "../../contracts/interfaces/ICallback.sol";
import {IAavePool} from "../../contracts/interfaces/IAavePool.sol";
import {BaseConnextFacet} from "../../contracts/facets/BaseConnextFacet.sol";
import {ISponsorVault} from "../../contracts/interfaces/ISponsorVault.sol";

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

    promiseMessages[transferId] = message;
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

contract MockPool is IAavePool {
  uint256 _withdraw = 123456;

  function setWithdraw(uint256 _new) external {
    _withdraw = _new;
  }

  function mintUnbacked(
    address asset,
    uint256 amount,
    address onBehalfOf,
    uint16 referralCode
  ) external override {}

  function backUnbacked(
    address asset,
    uint256 amount,
    uint256 fee
  ) external override {}

  function withdraw(
    address asset,
    uint256 amount,
    address to
  ) external override returns (uint256) {
    return _withdraw;
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

  function setTestAavePortalsTransfers(bytes32 _id, uint256 _amount) external {
    s.aavePortalsTransfers[_id] = _amount;
  }

  function setTestRoutedTransfers(bytes32 _id, address[] memory _routers) external {
    s.routedTransfers[_id] = _routers;
  }
}

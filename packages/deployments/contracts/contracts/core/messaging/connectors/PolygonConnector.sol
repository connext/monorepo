// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../interfaces/IRootManager.sol";

import {Connector} from "./Connector.sol";

interface IStateSender {
  function syncState(address destAddr, bytes calldata data) external;
}

interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}

interface PolygonL1AMB is IStateSender {}

interface PolygonL2AMB {}

contract PolygonL2Connector is Connector {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorProcessGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    Connector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorProcessGas, _processGas, _reserveGas)
  {}

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    return _expected == msg.sender;
  }

  function _sendMessage(bytes memory _data) internal override {}

  function _processMessage(bytes memory _data) internal override {
    // only callable by mirror connector
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // update the aggregate root on the domain
    update(bytes32(_data));
  }
}

contract PolygonL1Connector is Connector {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorProcessGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    Connector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorProcessGas, _processGas, _reserveGas)
  {}

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    return _expected == msg.sender;
  }

  function _sendMessage(bytes memory _data) internal override {
    PolygonL1AMB(AMB).syncState(mirrorConnector, _data);
  }

  function _processMessage(bytes memory _data) internal override {
    // only callable by mirror connector
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // update the root on the root manager
    IRootManager(ROOT_MANAGER).setOutboundRoot(mirrorDomain, bytes32(_data));
  }
}

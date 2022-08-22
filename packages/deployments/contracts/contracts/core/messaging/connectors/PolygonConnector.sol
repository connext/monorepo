// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {CrossChainEnabledPolygonChild} from "@openzeppelin/contracts/crosschain/polygon/CrossChainEnabledPolygonChild.sol";

import {IRootManager} from "../interfaces/IRootManager.sol";
import {Connector} from "./Connector.sol";

// address constant MUMBAI_FX_CHILD = 0xCf73231F28B7331BBe3124B907840A94851f9f11;
// address constant GOERLI_FX_ROOT = 0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA;

// address constant MAINNET_FX_CHILD = 0x8397259c983751DAf40400790063935a11afa28a;
// address constant MAINNET_FX_ROOT = 0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2;

// FX_ROOT contract
interface PolygonL1AMB {
  function sendMessageToChild(address receiver, bytes calldata data) external;
}

contract PolygonL2Connector is Connector, CrossChainEnabledPolygonChild {
  event MessageSent(bytes message);

  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorProcessGas,
    uint256 _processGas,
    uint256 _reserveGas,
    address _fxChild
  )
    Connector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorProcessGas, _processGas, _reserveGas)
    CrossChainEnabledPolygonChild(_fxChild)
  {}

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    return _expected == _crossChainSender();
  }

  function _sendMessage(bytes memory _data) internal override {
    emit MessageSent(_data);
  }

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
    uint256 _reserveGas,
    address _checkPointManager
  )
    Connector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorProcessGas, _processGas, _reserveGas)
  {}

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    return _expected == msg.sender;
  }

  function _sendMessage(bytes memory _data) internal override {
    // FX_ROOT on L1 chain will call below
    // bytes memory data = abi.encode(msg.sender, _receiver, _data);
    // stateSender.syncState(fxChild, data);
    PolygonL1AMB(AMB).sendMessageToChild(mirrorConnector, _data);
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

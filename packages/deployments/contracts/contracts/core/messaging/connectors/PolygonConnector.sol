// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../interfaces/IRootManager.sol";
import {Connector} from "./Connector.sol";
import {FxBaseRootTunnel} from "../helpers/polygon/tunnel/FxBaseRootTunnel.sol";
import {FxBaseChildTunnel} from "../helpers/polygon/tunnel/FxBaseChildTunnel.sol";

// address constant MUMBAI_FX_CHILD = 0xCf73231F28B7331BBe3124B907840A94851f9f11;
// address constant GOERLI_CHECKPOINT_MANAGER = 0x2890bA17EfE978480615e330ecB65333b880928e;
// address constant GOERLI_FX_ROOT = 0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA;

// address constant MAINNET_FX_CHILD = 0x8397259c983751DAf40400790063935a11afa28a;
// address constant MAINNET_CHECKPOINT_MANAGER = 0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287;
// address constant MAINNET_FX_ROOT = 0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2;

contract PolygonL2Connector is Connector, FxBaseChildTunnel {
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
    FxBaseChildTunnel(_amb)
  {
    // setFxRootTunnel(_mirrorConnector);
  }

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    require(msg.sender == AMB, "!bridge");
    return true;
  }

  function _sendMessage(bytes memory _data) internal override {
    // Simply emit `MessageSent(_data)`
    _sendMessageToRoot(_data);
  }

  function _processMessageFromRoot(
    uint256, /* stateId */
    address sender,
    bytes memory data
  ) internal override validateSender(sender) {
    require(msg.sender == AMB, "!bridge");
    // get the data (should be the aggregate root)
    require(data.length == 32, "!length");
    // update the aggregate root on the domain
    update(bytes32(data));
  }

  function _processMessage(bytes memory _data) internal override {}
}

contract PolygonL1Connector is Connector, FxBaseRootTunnel {
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
    FxBaseRootTunnel(_checkPointManager, _amb)
  {
    setFxChildTunnel(_mirrorConnector);
  }

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    return true;
  }

  function _sendMessage(bytes memory _data) internal override {
    _sendMessageToChild(_data);
  }

  function _processMessageFromChild(bytes memory message) internal override {
    // get the data (should be the aggregate root)
    require(message.length == 32, "!length");
    // update the root on the root manager
    IRootManager(ROOT_MANAGER).setOutboundRoot(mirrorDomain, bytes32(message));

    emit MessageProcessed(message, msg.sender);
  }

  function _processMessage(bytes memory _data) internal override {}
}

// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";

import {FxBaseRootTunnel} from "./tunnel/FxBaseRootTunnel.sol";

import {HubConnector} from "../HubConnector.sol";

contract PolygonHubConnector is HubConnector, FxBaseRootTunnel {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    address _checkPointManager
  )
    HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector)
    FxBaseRootTunnel(_checkPointManager, _amb)
  {}

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    // NOTE: always return false on polygon
    return false;
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should not include specialized calldata
    require(_encodedData.length == 0, "!data length");
    _sendMessageToChild(_data);
  }

  function _processMessageFromChild(bytes memory message) internal override {
    // NOTE: crosschain sender is not directly exposed by the child message

    // do not need any additional sender or origin checks here since the proof contains inclusion proofs of the snapshots

    // get the data (should be the aggregate root)
    require(message.length == 32, "!length");
    // update the root on the root manager
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, bytes32(message));

    emit MessageProcessed(message, msg.sender);
  }

  function _processMessage(bytes memory _data) internal override {
    // Does nothing, all messages should go through the `_processMessageFromChild` path
    revert Connector__processMessage_notUsed();
  }

  function _setMirrorConnector(address _mirrorConnector) internal override {
    // NOTE: FxBaseRootTunnel has the following code in their `setFxChildTunnel`:
    // ```
    // require(fxChildTunnel == address(0x0), "FxBaseRootTunnel: CHILD_TUNNEL_ALREADY_SET");
    // ```
    // Which means this function will revert if updating the `mirrorConnector`. In that case, in
    // changes  the
    // hub connector should also be redeployed
    require(mirrorConnector == address(0), "!empty");
    super._setMirrorConnector(_mirrorConnector);

    setFxChildTunnel(_mirrorConnector);
  }
}

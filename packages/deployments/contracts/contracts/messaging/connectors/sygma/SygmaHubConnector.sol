// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseSygma} from "./BaseSygma.sol";
import {Connector} from "../Connector.sol";
import {HubConnector} from "../HubConnector.sol";
import {IBridge} from "../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";
import {IRootManager} from "../../interfaces/IRootManager.sol";

contract SygmaHubConnector is HubConnector, BaseSygma {
  error SygmaHubConnector_OnlyPermissionedHandler();
  error SygmaHubConnector_OriginIsNotMirrorConnector();
  error SygmaHubConnector_DataLengthIsNot32();

  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    address _permissionlessHandler,
    uint256 _gasCap
  )
    HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector)
    BaseSygma(_amb, _permissionlessHandler, _gasCap)
  {}

  // TODO: add permissionles handler here
  function receiveMessage(address _originSender, bytes32 _root) external {
    if (msg.sender != PERMISSIONLESS_HANDLER) revert SygmaHubConnector_OnlyPermissionedHandler();
    if (!_verifySender(_originSender)) revert SygmaHubConnector_OriginIsNotMirrorConnector();
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, _root);
  }

  // TODO: add doc explaining if the domain id is bad it won't revert but it won't be bridged
  function _sendMessage(bytes memory _root, bytes memory _encodedData) internal override {
    if (!_checkDataLength(_root)) revert SygmaHubConnector_DataLengthIsNot32();
    (uint8 sygmaDomainId, bytes memory _feeData) = abi.decode(_encodedData, (uint8, bytes));
    bytes memory _depositData = parseDepositData(bytes32(_root), mirrorConnector);
    SYGMA_BRIDGE.deposit{value: msg.value}(sygmaDomainId, PERMISSIONLESS_HANDLER_ID, _depositData, _feeData);
  }

  function _verifySender(address _sender) internal view override returns (bool _validSender) {
    _validSender = _sender == mirrorConnector;
  }
}

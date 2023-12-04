// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseSygma} from "./BaseSygma.sol";
import {Connector} from "../Connector.sol";
import {SpokeConnector, ProposedOwnable} from "../SpokeConnector.sol";
import {IBridge} from "../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";

contract SygmaSpokeConnector is SpokeConnector, BaseSygma {
  error SygmaSpokeConnector_SenderIsNotMirrorConnector();
  error SygmaSpokeConnector_DataLengthIsNot32();
  error SygmaSpokeConnector_UnimplementedMethod();
  uint8 public immutable HUB_DOMAIN_ID;

  constructor(
    SpokeConnector.ConstructorParams memory _params,
    uint8 _hubDomainId,
    uint256 _gasCap
  ) SpokeConnector(_params) BaseSygma(_params.amb, _gasCap) {
    HUB_DOMAIN_ID = _hubDomainId;
  }

  function receiveMessage(address _originSender, bytes32 _root) external onlyAMB {
    if (!_verifySender(_originSender)) revert SygmaSpokeConnector_SenderIsNotMirrorConnector();
    receiveAggregateRoot(_root);
  }

  function _sendMessage(bytes memory _data, bytes memory _feeData) internal override {
    if (!_checkDataLength(_data)) revert SygmaSpokeConnector_DataLengthIsNot32();
    bytes memory _depositData = _parseDepositData(bytes32(_data), mirrorConnector);
    SYGMA_BRIDGE.deposit{value: msg.value}(HUB_DOMAIN_ID, PERMISSIONLESS_HANDLER_ID, _depositData, _feeData);
  }

  function _verifySender(address _sender) internal view override returns (bool _validSender) {
    _validSender = _sender == mirrorConnector;
  }

  function renounceOwnership() public view override(SpokeConnector, ProposedOwnable) onlyOwner {
    revert SygmaSpokeConnector_UnimplementedMethod();
  }

  function _processMessage(bytes memory) internal pure override {
    revert SygmaSpokeConnector_UnimplementedMethod();
  }
}

// (uint256 _fee, ) = SygmaFeeRouter(sygmaInfo.feeRouter).calculateFee(
//   msg.sender,
//   sygmaInfo.sygmaSpokeDomainId,
//   sygmaInfo.sygmaHubDomainId,
//   messageData.resourceId,
//   messageData.depositData,
//   messageData.feeData
// );
// if (msg.value < _fee) revert;

// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseSygma} from "./BaseSygma.sol";
import {Connector} from "../Connector.sol";
import {SpokeConnector, ProposedOwnable} from "../SpokeConnector.sol";
import {IBridge} from "../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";

contract SygmaSpokeConnector is SpokeConnector, BaseSygma {
  error SygmaSpokeConnector_SenderIsNotMirrorConnector();
  error SygmaSpokeConnector_DataLengthIsNot32();
  error SygmaSpokeConnector_MethodNotImplemented();

  bytes32 public constant PERMISSIONLESS_HANDLER_ID =
    0x0000000000000000000000000000000000000000000000000000000000000000;
  uint8 public constant ETHEREUM_DOMAIN_ID = 1;

  constructor(
    SpokeConnector.ConstructorParams memory _params,
    uint256 _gasCap
  ) SpokeConnector(_params) BaseSygma(_params.amb, _gasCap) {}

  function _processMessage(bytes memory _data) internal override onlyAMB {
    (address _originSender, bytes32 _root) = abi.decode(_data, (address, bytes32));
    if (_verifySender(_originSender)) revert SygmaSpokeConnector_SenderIsNotMirrorConnector();
    receiveAggregateRoot(_root);
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override checkDataLength(_data) {
    if (_checkDataLength(_data)) revert SygmaSpokeConnector_DataLengthIsNot32();
    bytes memory _depositData = abi.encodePacked(
      // uint256 maxFee
      uint256(0),
      // uint16 len(executeFuncSignature)
      uint16(4),
      // bytes executeFuncSignature
      Connector.processMessage.selector,
      // uint8 len(executeContractAddress)
      uint8(20),
      // bytes executeContractAddress
      mirrorConnector,
      // uint8 len(executionDataDepositor)
      uint8(20),
      // bytes executionDataDepositor
      address(this),
      // bytes executionDataDepositor
      abi.encode(address(this), _data)
    );
    SYGMA_AMB.deposit{value: msg.value}(ETHEREUM_DOMAIN_ID, PERMISSIONLESS_HANDLER_ID, _depositData, _encodedData);
  }

  function _verifySender(address _sender) internal view override returns (bool _validSender) {
    _validSender = _verifyOriginSender(_sender, mirrorConnector);
  }

  function renounceOwnership() public view override(SpokeConnector, ProposedOwnable) onlyOwner {
    revert SygmaSpokeConnector_MethodNotImplemented();
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

// struct SygmaInfo {
//   address feeRouter;
//   uint32 resourceId;
//   uint8 sygmaSpokeDomainId;
//   uint8 sygmaHubDomainId;
// }

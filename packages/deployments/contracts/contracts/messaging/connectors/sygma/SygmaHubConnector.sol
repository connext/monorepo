// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseSygma} from "./BaseSygma.sol";
import {Connector} from "../Connector.sol";
import {HubConnector} from "../HubConnector.sol";
import {IBridge} from "../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";
import {IRootManager} from "../../interfaces/IRootManager.sol";

contract SygmaHubConnector is HubConnector, BaseSygma {
  error SygmaHubConnector_SenderIsNotMirrorConnector();
  error SygmaHubConnector_DataLengthIsNot32();
  error SygmaHubConnector_NotImplementedMethod();

  bytes32 public constant PERMISSIONLESS_HANDLER_ID =
    0x0000000000000000000000000000000000000000000000000000000000000000;

  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _gasCap
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector) BaseSygma(_amb, _gasCap) {}

  function receiveData(address _originSender, bytes32 _root) external onlyAMB {
    if (!_verifySender(_originSender)) revert SygmaHubConnector_SenderIsNotMirrorConnector();
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, _root);
  }

  function _processMessage(bytes memory) internal pure override {
    revert SygmaHubConnector_NotImplementedMethod();
  }

  function _sendMessage(bytes memory _root, bytes memory _encodedData) internal override {
    if (!_checkDataLength(_root)) revert SygmaHubConnector_DataLengthIsNot32();
    // TODO: add check over domain id?
    (uint8 sygmaDomainId, bytes memory _feeData) = abi.decode(_encodedData, (uint8, bytes));

    uint16 _lenFunctionSig = 4;
    uint8 _lenAddress = 20;
    bytes memory _data = abi.encode(address(0), bytes32(_root));
    bytes memory _preparedData = this.slice(_data, 32);
    bytes memory _depositData = abi.encodePacked(
      // uint256 maxFee
      uint256(gasCap),
      // uint16 len(executeFuncSignature)
      _lenFunctionSig,
      // bytes executeFuncSignature
      Connector.processMessage.selector,
      // uint8 len(executeContractAddress)
      _lenAddress,
      // bytes executeContractAddress
      mirrorConnector,
      // uint8 len(executionDataDepositor)
      _lenAddress,
      // bytes executionDataDepositor
      address(this),
      // bytes executionDataDepositor
      _preparedData
    );
    SYGMA_BRIDGE.deposit{value: msg.value}(sygmaDomainId, PERMISSIONLESS_HANDLER_ID, _depositData, _feeData);
  }

  function _verifySender(address _sender) internal view override returns (bool _validSender) {
    _validSender = _verifyOriginSender(_sender, mirrorConnector);
  }

  function slice(bytes calldata input, uint256 position) public pure returns (bytes memory _slicedData) {
    _slicedData = input[position:];
  }
}

// (uint256 _fee, ) = SygmaFeeRouter(FEE_ROUTER).calculateFee(
//   msg.sender,
//   DOMAIN_ID,
//   messageData.destinationDomainId,
//   messageData.resourceId,
//   messageData.depositData,
//   messageData.feeData
// );

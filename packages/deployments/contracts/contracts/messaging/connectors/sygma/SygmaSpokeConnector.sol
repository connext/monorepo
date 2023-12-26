// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseSygma} from "./BaseSygma.sol";
import {Connector} from "../Connector.sol";
import {ConnectorsLib} from "../ConnectorsLib.sol";
import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";
import {SpokeConnector} from "../SpokeConnector.sol";
import {IBridge} from "../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";

/**
 * @title SygmaSpokeConnector
 * @notice Contract used to send messages from L2 to L1, and receive messages sent from L1 on L2.
 */
contract SygmaSpokeConnector is SpokeConnector, BaseSygma {
  /**
   * @notice Thrown when the caller is not the permissionless handler
   */
  error SygmaSpokeConnector_OnlyPermissionedHandler();

  /**
   * @notice Thrown when the sender is not the mirror connector
   */
  error SygmaSpokeConnector_SenderIsNotMirrorConnector();

  /**
   * @notice Thrown when the data length is not 32
   */
  error SygmaSpokeConnector_DataLengthIsNot32();

  /**
   * @notice Thrown when the method is not implemented
   */
  error SygmaSpokeConnector_UnimplementedMethod();

  /**
   * @notice The Sygma's ethereum domain ID
   */
  uint8 public immutable HUB_DOMAIN_ID;

  /**
   * @notice Creates a new SygmaSpokeConnector instance
   * @dev The connectors are deployed such that there is one on each side of an AMB
   * @param _params The constructor params for the SpokeConnector
   * @param _hubDomainId The domain ID of the hub connector
   * @param _permissionlessHandler The address of the permissionless handler
   * @param _gasCap The gas cap for the messages sent through the bridge
   */
  constructor(
    SpokeConnector.ConstructorParams memory _params,
    uint8 _hubDomainId,
    address _permissionlessHandler,
    uint256 _gasCap
  ) SpokeConnector(_params) BaseSygma(_params.amb, _permissionlessHandler, _gasCap) {
    HUB_DOMAIN_ID = _hubDomainId;
  }

  /**
   * @notice Receives a message from the permissionless handler
   * @param _originSender The original sender of the message
   * @param _root The aggregate root
   * @dev This can be called only by Sygma's permissionless handler
   * @dev The origin sender must be the mirror connector
   */
  function receiveMessage(address _originSender, bytes32 _root) external {
    if (msg.sender != PERMISSIONLESS_HANDLER) revert SygmaSpokeConnector_OnlyPermissionedHandler();
    if (!_verifySender(_originSender)) revert SygmaSpokeConnector_SenderIsNotMirrorConnector();
    receiveAggregateRoot(_root);
    emit MessageProcessed(abi.encode(_root), msg.sender);
  }

  /**
   * @notice Sends a message over the Sygma bridge
   * @param _data The data to send
   * @param _feeData The fee data
   * @dev The data must be 32 bytes long since is the root
   * @dev `msg.value` must be equal to the fee. It can be calculated on Sygma's `FeeRouter.calculateFee()` function
   * @dev The `_feeData` can be empty
   */
  function _sendMessage(bytes memory _data, bytes memory _feeData) internal override {
    if (!ConnectorsLib.checkMessageLength(_data)) revert SygmaSpokeConnector_DataLengthIsNot32();
    bytes memory _depositData = parseDepositData(bytes32(_data), mirrorConnector);
    SYGMA_BRIDGE.deposit{value: msg.value}(HUB_DOMAIN_ID, PERMISSIONLESS_HANDLER_ID, _depositData, _feeData);
  }

  /**
   * @notice Verifies the sender of the message
   * @param _sender The sender to verify
   * @return _validSender Whether the sender is valid or not
   */
  function _verifySender(address _sender) internal view override returns (bool _validSender) {
    _validSender = _sender == mirrorConnector;
  }

  /**
   * @notice Renounces the ownership of the contract
   * @dev This method is not implemented
   */
  function renounceOwnership() public view override(SpokeConnector, ProposedOwnable) onlyOwner {
    revert SygmaSpokeConnector_UnimplementedMethod();
  }

  /**
   * @notice Processes a message
   * @dev This method is not implemented
   */
  function _processMessage(bytes memory) internal pure override {
    revert SygmaSpokeConnector_UnimplementedMethod();
  }
}

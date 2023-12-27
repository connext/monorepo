// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseSygma} from "./BaseSygma.sol";
import {Connector} from "../Connector.sol";
import {ConnectorsLib} from "../ConnectorsLib.sol";
import {HubConnector} from "../HubConnector.sol";
import {IBridge} from "../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";
import {IRootManager} from "../../interfaces/IRootManager.sol";

/**
 * @title SygmaHubConnector
 * @dev This connector is used to send messages from L1 to L2, and receive messages sent from L2 on L1.
 */
contract SygmaHubConnector is HubConnector, BaseSygma {
  /**
   * @notice Thrown when the caller is not the permissionless handler
   */
  error SygmaHubConnector_OnlyPermissionedHandler();

  /**
   * @notice Thrown when the origin sender is not the mirror connector
   */
  error SygmaHubConnector_OriginIsNotMirrorConnector();

  /**
   * @notice Thrown when the data length is not 32
   */
  error SygmaHubConnector_DataLengthIsNot32();

  /**
   * @notice Creates a new SygmaHubConnector instance
   * @dev The connectors are deployed such that there is one on each side of an AMB
   * @param _domain The domain this connector lives on
   * @param _mirrorDomain The spoke domain
   * @param _amb The address of the amb on the domain this connector lives on
   * @param _rootManager The address of the RootManager on mainnet
   * @param _mirrorConnector The address of the spoke connector
   * @param _permissionlessHandler The address of the permissionless handler
   * @param _gasCap The gas cap for the messages sent through the bridge
   */
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

  /**
   * @notice Receives a message from the permissionless handler
   * @dev This can be called only by Sygma's permissionless handler
   * @dev The origin sender must be the mirror connector
   * @param _originSender The original sender of the message
   * @param _root The aggregate root
   */
  function receiveMessage(address _originSender, bytes32 _root) external {
    if (msg.sender != PERMISSIONLESS_HANDLER) revert SygmaHubConnector_OnlyPermissionedHandler();
    if (!_verifySender(_originSender)) revert SygmaHubConnector_OriginIsNotMirrorConnector();
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, _root);
    emit MessageProcessed(abi.encode(_root), msg.sender);
  }

  /**
   * @notice Sends a message over the amb
   * @param _root The aggregate root
   * @param _encodedData The encoded data
   * @dev The data length must be 32, since is the aggregate root
   * @dev The encoded data must be a tuple of the sygma domain id and the fee data. The sygma domain id must be a supported one,
   * otherwise the tx won't revert, but the message won't be bridged
   * @dev The `msg.value` must be equal to the fee for the message. The fee can be calculated on `FeeRouter.calculateFee()` function
   * @dev `_feeData` can be empty but it must be passed
   */
  function _sendMessage(bytes memory _root, bytes memory _encodedData) internal override {
    if (!ConnectorsLib.checkMessageLength(_root)) revert SygmaHubConnector_DataLengthIsNot32();
    (uint8 sygmaDomainId, bytes memory _feeData) = abi.decode(_encodedData, (uint8, bytes));
    bytes memory _depositData = parseDepositData(bytes32(_root), mirrorConnector);
    SYGMA_BRIDGE.deposit{value: msg.value}(sygmaDomainId, PERMISSIONLESS_HANDLER_ID, _depositData, _feeData);
  }

  /**
   * @notice Verifies if the sender is the mirror connector
   * @param _sender The sender to verify
   * @return _validSender True if the sender is the mirror connector
   */
  function _verifySender(address _sender) internal view override returns (bool _validSender) {
    _validSender = _sender == mirrorConnector;
  }
}

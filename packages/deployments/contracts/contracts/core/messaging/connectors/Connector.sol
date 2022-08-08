// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {ProposedOwnable} from "../../shared/ProposedOwnable.sol";
import {IConnector} from "../interfaces/IConnector.sol";

/**
 * @notice Holds shared logic for interfacing with AMB
 */
abstract contract Connector is ProposedOwnable, IConnector {
  // ============ Events ============
  event MirrorConnectorUpdated(address previous, address current);

  event MessageSent(bytes data);

  event MessageProcessed(address _from, bytes data);

  // ============ Properties ============
  /**
   * @notice Address of the AMB on this domain
   */
  address public immutable ambAddress;

  /**
   * @notice The domain of this Connector
   */
  uint32 public immutable domain;

  /**
   * @notice Connector on L2 for L1 connectors, and vice versa
   */
  address public mirrorConnector;

  /**
   * @notice Domain of mirror connector
   */
  uint32 public mirrorDomain;

  // ============ Constructor ============

  constructor(
    address _ambAddress,
    address _mirrorConnector,
    uint32 _domain,
    uint32 _mirrorDomain
  ) ProposedOwnable() {
    ambAddress = _ambAddress;
    mirrorConnector = _mirrorConnector;
    domain = _domain;
    mirrorDomain = _mirrorDomain;
    _setOwner(msg.sender);
  }

  // ============ Public fns ============
  function sendMessage(bytes memory _data) external {
    _sendMessage(_data);
  }

  function processMessage(address _sender, bytes memory _data) external {
    _processMessage(_sender, _data);
  }

  function verifySender(address _expected) external returns (bool) {
    return _verifySender(_expected);
  }

  // ============ Admin fns ============

  /**
   * @notice Sets the address of the l2Connector for this domain
   */
  function setMirrorConnector(address _mirrorConnector) public onlyOwner {
    emit MirrorConnectorUpdated(mirrorConnector, _mirrorConnector);
    mirrorConnector = _mirrorConnector;
  }

  // ============ Private fns ============
  /**
   * @notice This function is used by the Connext contract on the l2 domain to send a message to the
   * l1 domain (i.e. called by Connext on optimism to send a message to mainnet with roots)
   */
  function _sendMessage(bytes memory _data) internal virtual;

  /**
   * @notice This function is used by the AMBs to handle incoming messages. Should store the latest
   * root generated on the l2 domain
   */
  function _processMessage(address _sender, bytes memory _data) internal virtual;

  /**
   * @notice Function is used to check the sender of the message on the other domain
   */
  function _verifySender(address _expected) internal virtual returns (bool);
}

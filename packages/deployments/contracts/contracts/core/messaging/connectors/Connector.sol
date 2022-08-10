// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {ProposedOwnable} from "../../shared/ProposedOwnable.sol";

import {IConnector} from "../interfaces/IConnector.sol";

import {Messaging} from "../Messaging.sol";

/**
 * @notice Holds shared logic for interfacing with AMB
 */
abstract contract Connector is Messaging, ProposedOwnable, IConnector {
  // ============ Events ============
  event MirrorConnectorUpdated(address previous, address current);

  event MessageSent(bytes data);

  event MessageProcessed(address _from, bytes data);

  // ============ Properties ============
  /**
   * @notice Connector on L2 for L1 connectors, and vice versa.
   */
  address public mirrorConnector;

  /**
   * @notice Domain of mirror connector.
   * @dev Immutable, as the domain should be known at deployment time.
   */
  uint32 public immutable mirrorDomain;

  // ============ Constructor ============
  constructor(
    uint32 _domain,
    address _amb,
    address _rootManager,
    address _bridgeRouter,
    uint256 _processGas,
    uint256 _reserveGas,
    uint32 _mirrorDomain,
    address _mirrorConnector
  ) Messaging(_domain, _amb, _rootManager, _bridgeRouter, _processGas, _reserveGas) ProposedOwnable() {
    mirrorDomain = _mirrorDomain;
    mirrorConnector = _mirrorConnector;
    _setOwner(msg.sender);
  }

  // ============ Admin fns ============
  /**
   * @notice Sets the address of the l2Connector for this domain
   */
  function setMirrorConnector(address _mirrorConnector) public onlyOwner {
    emit MirrorConnectorUpdated(mirrorConnector, _mirrorConnector);
    mirrorConnector = _mirrorConnector;
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

  // ============ Private fns ============
  /**
   * @notice This function is used by the AMBs to handle incoming messages. Should store the latest
   * root generated on the l2 domain.
   */
  function _processMessage(address _sender, bytes memory _data) internal virtual;

  /**
   * @notice Function is used to check the sender of the message on the other domain.
   * @dev Should be overridden by the implementing Connector contract.
   */
  function _verifySender(address _expected) internal virtual returns (bool);
}

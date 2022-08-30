// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../interfaces/IRootManager.sol";

import {Connector} from "./Connector.sol";

contract MainnetL1Connector is Connector {
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
  {}

  // ============ Private fns ============
  /**
   * @dev Asserts the sender of a cross domain message. On mainnet all senders should be this
   */
  function _verifySender(address _expected) internal view override returns (bool) {
    return msg.sender == _expected;
  }

  /**
   * @dev Messaging uses this function to send outboundRoot to root manager. On mainnet,
   * would just update the root manager directly
   */
  function _sendMessage(bytes memory _data) internal override {
    // get the data (should be the outbound root)
    require(_data.length == 32, "!length");
    // update the outbound root on the root manager
    IRootManager(ROOT_MANAGER).setOutboundRoot(domain, bytes32(_data));
  }

  /**
   * @dev Called by the root manager to update the aggregateRoot. On mainnet, update the
   * aggregateRoot directly
   */
  function _processMessage(bytes memory _data) internal override {
    // ensure the l1 connector sent the message
    require(_verifySender(ROOT_MANAGER), "!sender");
    // should be the aggregate root
    require(_data.length == 32, "!length");
    // update the aggregate root on the domain
    update(bytes32(_data));
  }
}

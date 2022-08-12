// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../interfaces/IRootManager.sol";

import {Connector} from "./Connector.sol";

contract MainnetL1Connector is Connector {
  // ============ Constructor ============
  constructor(
    bool _isHub,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _receiveGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    Connector(
      _isHub,
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _receiveGas,
      _processGas,
      _reserveGas
    )
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
  function _sendRoot(bytes memory _data) internal override {
    // get the data (should be the outbound root)
    require(_data.length == 32, "!length");
    // update the outbound root on the root manager
    IRootManager(ROOT_MANAGER).setOutboundRoot(domain, bytes32(_data));
  }

  /**
   * @dev Called by the root manager to update the aggregateRoot. On mainnet, update the
   * aggregateRoot directly
   */
  function _receiveRoot(
    address, // _sender -- not used
    bytes memory _data
  ) internal view override returns (bytes32) {
    // ensure the l1 connector sent the message
    require(msg.sender == ROOT_MANAGER, "!sender");
    // should be the aggregate root
    require(_data.length == 32, "!length");
    // update the aggregate root on the domain
    return bytes32(_data);
  }
}

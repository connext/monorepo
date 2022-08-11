// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../interfaces/IRootManager.sol";

import {Connector} from "./Connector.sol";

/**
 * @dev The optimism bridge shares both of these functions, but it is important
 * to note that when going from L2 -> L1, the message cannot be processed by the
 * AMB until the challenge period elapses.
 *
 * HOWEVER, before the challenge elapses, you can read the state of the L2 as it is
 * placed on mainnet. By processing data from the L2 state, we are able to "circumvent"
 * this delay to a reasonable degree.
 *
 * This means that for messages going L1 -> L2, you can call "processMessage" and expect
 * the call to be executed to pass up the aggregate root. When going from L2 -> L1, you
 * must read the root from the L2 state
 *
 * L2 messenger: https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2CrossDomainMessenger.sol
 * L1 messenger: https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol
 */
interface OptimismBridge {
  function sendMessage(
    address _target,
    bytes memory _message,
    uint32 _gasLimit
  ) external;

  function xDomainMessageSender() external returns (address);
}

abstract contract BaseOptimismConnector is Connector {
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

  // ============ Public Fns ============
  function _verifySender(address _expected) internal override returns (bool) {
    require(msg.sender == AMB, "!bridge");
    return OptimismBridge(AMB).xDomainMessageSender() == _expected;
  }
}

contract OptimismL2Connector is BaseOptimismConnector {
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
    BaseOptimismConnector(
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
   * @dev Sends `outboundRoot` to root manager on l1
   */
  function _sendRoot(bytes memory _data) internal override {
    OptimismBridge(AMB).sendMessage(mirrorConnector, _data, uint32(receiveGas));
  }

  /**
   * @dev Handles an incoming `aggregateRoot`
   * NOTE: Could store latest root sent and prove aggregate root
   */
  function _receiveRoot(
    address, // _sender -- not used
    bytes memory _data
  ) internal override returns (bytes32) {
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // Return the outbound root for optimism.
    return bytes32(_data);
  }
}

contract OptimismL1Connector is BaseOptimismConnector {
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
    BaseOptimismConnector(
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
   * @dev Sends `aggregateRoot` to messaging on l2
   */
  function _sendRoot(bytes memory _data) internal override {
    require(msg.sender == ROOT_MANAGER, "!rootManager");
    OptimismBridge(AMB).sendMessage(mirrorConnector, _data, uint32(receiveGas));
  }

  /**
   * @dev Handles an incoming `outboundRoot`
   * FIXME: This currently assumes the connector will call `receiveRoot`
   * which requires waiting out the full delay. Need to figure out the right
   * flow to shortcut this
   */
  function _receiveRoot(address _sender, bytes memory _data) internal override returns (bytes32) {
    // get the data (should be the outbound root)
    require(_data.length == 32, "!length");
    // Return the outbound root.
    return bytes32(_data);
  }
}

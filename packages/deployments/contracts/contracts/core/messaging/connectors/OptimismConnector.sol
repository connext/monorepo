// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {Connector} from "./Connector.sol";
import {IMessaging} from "../interfaces/IMessaging.sol";
import {IRootManager} from "../interfaces/IRootManager.sol";

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
  // ============ Events ============

  // ============ Properties ============

  // ============ Constructor ============

  constructor(
    address _ambAddress,
    address _mirrorConnector,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _messaging,
    uint256 _processGas,
    address _rootManager
  ) Connector(_ambAddress, _mirrorConnector, _domain, _mirrorDomain, _messaging, _processGas, _rootManager) {}

  // ============ Public Fns ============

  function _verifySender(address _expected) internal override returns (bool) {
    require(msg.sender == ambAddress, "!bridge");
    return OptimismBridge(ambAddress).xDomainMessageSender() == _expected;
  }
}

contract OptimismL2Connector is BaseOptimismConnector {
  // ============ Constructor ============

  constructor(
    address _ambAddress,
    address _mirrorConnector,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _messaging,
    uint256 _processGas,
    address _rootManager
  )
    BaseOptimismConnector(_ambAddress, _mirrorConnector, _domain, _mirrorDomain, _messaging, _processGas, _rootManager)
  {}

  // ============ Private fns ============

  /**
   * @dev Sends `outboundRoot` to root manager on l1
   */
  function _sendMessage(bytes memory _data) internal override {
    require(msg.sender == messaging, "!messaging");
    OptimismBridge(ambAddress).sendMessage(mirrorConnector, _data, uint32(processGas));
  }

  /**
   * @dev Handles an incoming `aggregateRoot`
   * NOTE: Could store latest root sent and prove aggregate root
   */
  function _processMessage(
    address, // _sender -- not used
    bytes memory _data
  ) internal override {
    // enforce this came from connector on l2
    require(_verifySender(mirrorConnector), "!l1Connector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // set the outbound root for optimism
    IMessaging(messaging).update(bytes32(_data));
    // get the state commitment root
    // if state commitment root is <
  }
}

contract OptimismL1Connector is BaseOptimismConnector {
  // ============ Properties ============

  // ============ Constructor ============

  constructor(
    address _ambAddress,
    address _mirrorConnector,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _messaging,
    uint256 _processGas,
    address _rootManager
  )
    BaseOptimismConnector(_ambAddress, _mirrorConnector, _domain, _mirrorDomain, _messaging, _processGas, _rootManager)
  {}

  // ============ Public fns ============

  // ============ Private fns ============

  /**
   * @dev Sends `aggregateRoot` to messaging on l2
   */
  function _sendMessage(bytes memory _data) internal override {
    require(msg.sender == rootManager, "!rootManager");
    OptimismBridge(ambAddress).sendMessage(mirrorConnector, _data, uint32(processGas));
  }

  /**
   * @dev Handles an incoming `outboundRoot`
   * FIXME: This currently assumes the connector will call `processMessage`
   * which requires waiting out the full delay. Need to figure out the right
   * flow to shortcut this
   */
  function _processMessage(
    address, // _sender -- not used
    bytes memory _data
  ) internal override {
    // enforce this came from connector on l2
    require(_verifySender(mirrorConnector), "!l2Connector");
    // get the data (should be the outbound root)
    require(_data.length == 32, "!length");
    // set the outbound root for optimism
    IRootManager(rootManager).setOutboundRoot(mirrorDomain, bytes32(_data));
    // get the state commitment root
    // if state commitment root is <
  }
}

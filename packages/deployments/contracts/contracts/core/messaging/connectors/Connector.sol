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
  uint32 constant ETH_MAINNET_DOMAIN = 6648936;

  /**
   * @notice Address of the AMB on this domain.
   */
  address public immutable ambAddress;

  /**
   * @notice The domain of this Connector.
   */
  uint32 public immutable domain;

  /**
   * @notice Connector on L2 for L1 connectors, and vice versa.
   */
  address public mirrorConnector;

  /**
   * @notice Domain of mirror connector.
   */
  uint32 public immutable mirrorDomain;

  address public immutable rootManager;

  address public messaging;

  /**
   * @notice Gas used on the mirror domain.
   */
  uint256 public processGas;

  // ============ Constructor ============

  constructor(
    address _ambAddress,
    address _mirrorConnector,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _messaging,
    uint256 _processGas,
    address _rootManager
  ) ProposedOwnable() {
    ambAddress = _ambAddress;
    mirrorConnector = _mirrorConnector;
    domain = _domain;
    mirrorDomain = _mirrorDomain;
    messaging = _messaging;
    processGas = _processGas;

    // NOTE: The address for the RootManager contract should be 0x for Connectors on their respective
    // domain, and should be defined for connectors on Eth Mainnet.
    if (_domain == ETH_MAINNET_DOMAIN) {
      require(_rootManager != address(0), "RootManager addr must be defined");
    } else {
      require(_rootManager == address(0), "RootManager should be zero");
    }
    rootManager = _rootManager;
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

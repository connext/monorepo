// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {Connector} from "./Connector.sol";
import {IMessaging} from "../interfaces/IMessaging.sol";
import {IRootManager} from "../interfaces/IRootManager.sol";

// TODO: how to handle message passing failures?

// Taken from: https://github.com/omni/tokenbridge-contracts/blob/master/contracts/interfaces/IAMB.sol
interface GnosisBridge {
  function messageSender() external view returns (address);

  function maxGasPerTx() external view returns (uint256);

  function transactionHash() external view returns (bytes32);

  function messageId() external view returns (bytes32);

  function messageSourceChainId() external view returns (bytes32);

  function messageCallStatus(bytes32 _messageId) external view returns (bool);

  function failedMessageDataHash(bytes32 _messageId) external view returns (bytes32);

  function failedMessageReceiver(bytes32 _messageId) external view returns (address);

  function failedMessageSender(bytes32 _messageId) external view returns (address);

  function requireToPassMessage(
    address _contract,
    bytes memory _data,
    uint256 _gas
  ) external returns (bytes32);

  function requireToConfirmMessage(
    address _contract,
    bytes memory _data,
    uint256 _gas
  ) external returns (bytes32);

  function requireToGetInformation(bytes32 _requestSelector, bytes memory _data) external returns (bytes32);

  function sourceChainId() external view returns (uint256);

  function destinationChainId() external view returns (uint256);
}

abstract contract BaseGnosisConnector is Connector {
  // ============ Events ============

  // ============ Properties ============

  address public rootManager;

  address public messaging;

  uint256 public processGas;

  // ============ Constructor ============
  constructor(
    address _ambAddress,
    address _mirrorConnector,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _rootManager,
    address _messaging,
    uint256 _processGas
  ) Connector(_ambAddress, _mirrorConnector, _domain, _mirrorDomain) {
    rootManager = _rootManager;
    messaging = _messaging;
    processGas = _processGas; // _processGas used on mirror connector
  }

  /**
   * @dev Asserts the sender of a cross domain message
   */
  function _verifySender(address _expected) internal view override returns (bool) {
    require(msg.sender == ambAddress, "!bridge");
    return GnosisBridge(ambAddress).messageSender() == _expected;
  }
}

/**
 * @notice Handles Gnosis interactions with AMB on Gnosis chain
 * @dev Usage on L2:
 * - aggregateRoot is processed as AMB on L2 handles the `RootManager.propagate` call within `_processMessage`
 * - outboundRoot is sent via Messaging on L2 using `_sendMessage` call
 */
contract GnosisL2Connector is BaseGnosisConnector {
  // ============ Events ============

  // ============ Properties ============

  // ============ Constructor ============
  constructor(
    address _ambAddress,
    address _mirrorConnector,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _rootManager,
    address _messaging,
    uint256 _processGas
  ) BaseGnosisConnector(_ambAddress, _mirrorConnector, _domain, _mirrorDomain, _rootManager, _messaging, _processGas) {}

  // ============ Public fns ============

  // ============ Private fns ============

  /**
   * @dev Messaging uses this function to send data to mainnet via amb
   */
  function _sendMessage(bytes memory _data) internal override {
    // ensure the messaging from this chain is sending the message
    require(msg.sender == messaging, "!messaging");
    // send the message to the l1 connector by calling `processMessage`
    GnosisBridge(ambAddress).requireToPassMessage(
      mirrorConnector,
      abi.encodeWithSelector(Connector.processMessage.selector, address(this), _data),
      processGas
    );
  }

  /**
   * @dev AMB calls this function to store aggregate root that is sent up by the root manager
   */
  function _processMessage(
    address, // _sender -- not used
    bytes memory _data
  ) internal override {
    // ensure the l1 connector sent the message
    require(_verifySender(mirrorConnector), "!l1Connector");
    // ensure it is headed to this domain
    require(GnosisBridge(ambAddress).destinationChainId() == block.chainid, "!destinationChain");
    // ensure it came from mainnet
    require(GnosisBridge(ambAddress).sourceChainId() == 1, "!sourceChainId");
    // update the aggregate root on the domain
    IMessaging(messaging).update(bytes32(_data));
  }
}

/**
 * @notice Handles Gnosis interactions with AMB on mainnet
 * @dev Usage on L1:
 * - outboundRoot is processed as AMB on L1 handles the `Messaging.send` call within `_processMessage`
 * - aggregateRoot is sent via RootManager on L1 using `_sendMessage` call via `RootManager.propagate`
 */
contract GnosisL1Connector is BaseGnosisConnector {
  // ============ Properties ============

  // ============ Constructor ============
  constructor(
    address _ambAddress,
    address _mirrorConnector,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _rootManager,
    address _messaging,
    uint256 _processGas
  ) BaseGnosisConnector(_ambAddress, _mirrorConnector, _domain, _mirrorDomain, _rootManager, _messaging, _processGas) {}

  // ============ Private fns ============

  /**
   * @dev Messaging uses this function to send data to l2 via amb
   */
  function _sendMessage(bytes memory _data) internal override {
    // only root manager can dispatch message to l2 via connector
    require(msg.sender == rootManager, "!rootManager");
    // send message via AMB, should call "processMessage" which will update aggregate root
    GnosisBridge(ambAddress).requireToPassMessage(
      mirrorConnector,
      abi.encodeWithSelector(Connector.processMessage.selector, address(this), _data),
      processGas
    );
  }

  /**
   * @dev L2 connector calls this function to pass down latest outbound root
   */
  function _processMessage(
    address, // _sender -- not used
    bytes memory _data
  ) internal override {
    // ensure the l1 connector sent the message
    require(_verifySender(mirrorConnector), "!l2Connector");
    // ensure it is headed to this domain
    require(GnosisBridge(ambAddress).destinationChainId() == block.chainid, "!destinationChain");
    // ensure it came from mainnet
    require(GnosisBridge(ambAddress).sourceChainId() == 100, "!sourceChainId");
    // get the data (should be the outbound root)
    require(_data.length == 32, "!length");
    // update the root on the root manager
    IRootManager(rootManager).setOutboundRoot(mirrorDomain, bytes32(_data));
  }
}

// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../interfaces/IRootManager.sol";

import {Connector} from "./Connector.sol";

// TODO: how to handle message passing failures?

// Taken from: https://github.com/omni/tokenbridge-contracts/blob/master/contracts/interfaces/IAMB.sol
interface GnosisAMB {
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
   * @dev Asserts the sender of a cross domain message
   */
  function _verifySender(address _expected) internal view override returns (bool) {
    require(msg.sender == AMB, "!bridge");
    return GnosisAMB(AMB).messageSender() == _expected;
  }
}

/**
 * @notice Handles Gnosis interactions with AMB on Gnosis chain
 * @dev Usage on L2:
 * - aggregateRoot is processed as AMB on L2 handles the `RootManager.propagate` call within `_processMessage`
 * - outboundRoot is sent via Messaging on L2 using `_sendMessage` call
 */
contract GnosisL2Connector is BaseGnosisConnector {
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
    BaseGnosisConnector(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _mirrorProcessGas,
      _processGas,
      _reserveGas
    )
  {}

  // ============ Private fns ============
  /**
   * @dev Messaging uses this function to send data to mainnet via amb
   */
  function _sendMessage(bytes memory _data) internal override {
    // send the message to the l1 connector by calling `processMessage`
    GnosisAMB(AMB).requireToPassMessage(
      mirrorConnector,
      abi.encodeWithSelector(Connector.processMessage.selector, address(this), _data),
      mirrorProcessGas
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
    require(GnosisAMB(AMB).destinationChainId() == block.chainid, "!destinationChain");
    // ensure it came from mainnet
    require(GnosisAMB(AMB).sourceChainId() == 1, "!sourceChainId");
    // update the aggregate root on the domain
    update(bytes32(_data));
  }
}

/**
 * @notice Handles Gnosis interactions with AMB on mainnet
 * @dev Usage on L1:
 * - outboundRoot is processed as AMB on L1 handles the `Messaging.send` call within `_processMessage`
 * - aggregateRoot is sent via RootManager on L1 using `_sendMessage` call via `RootManager.propagate`
 */
contract GnosisL1Connector is BaseGnosisConnector {
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
    BaseGnosisConnector(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _mirrorProcessGas,
      _processGas,
      _reserveGas
    )
  {}

  // ============ Private fns ============
  /**
   * @dev Messaging uses this function to send data to l2 via amb
   */
  function _sendMessage(bytes memory _data) internal override onlyRootManager {
    // send message via AMB, should call "processMessage" which will update aggregate root
    GnosisAMB(AMB).requireToPassMessage(
      mirrorConnector,
      abi.encodeWithSelector(Connector.processMessage.selector, address(this), _data),
      mirrorProcessGas
    );
    emit MessageSent(_data, msg.sender);
  }

  /**
   * @dev L2 connector calls this function to pass down latest outbound root
   */
  function _processMessage(address _sender, bytes memory _data) internal override {
    // ensure the l1 connector sent the message
    require(_verifySender(mirrorConnector), "!l2Connector");
    // ensure it is headed to this domain
    require(GnosisAMB(AMB).destinationChainId() == block.chainid, "!destinationChain");
    // ensure it came from mainnet
    require(GnosisAMB(AMB).sourceChainId() == 100, "!sourceChainId");
    // get the data (should be the outbound root)
    require(_data.length == 32, "!length");
    // update the root on the root manager
    IRootManager(ROOT_MANAGER).setOutboundRoot(mirrorDomain, bytes32(_data));
    emit MessageProcessed(_sender, _data, msg.sender);
  }
}

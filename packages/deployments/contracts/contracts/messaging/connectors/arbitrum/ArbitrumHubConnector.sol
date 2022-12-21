// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {LibArbitrumL1} from "@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL1.sol";

import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {IArbitrumInbox} from "../../interfaces/ambs/arbitrum/IArbitrumInbox.sol";
import {IArbitrumOutbox} from "../../interfaces/ambs/arbitrum/IArbitrumOutbox.sol";
import {IArbitrumRollup, Node} from "../../interfaces/ambs/arbitrum/IArbitrumRollup.sol";

import {HubConnector} from "../HubConnector.sol";
import {Connector} from "../Connector.sol";

struct L2Message {
  address l2Sender;
  address to;
  uint256 l2Block;
  uint256 l1Block;
  uint256 l2Timestamp;
  uint256 value;
  bytes callData;
}

contract ArbitrumHubConnector is HubConnector {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  // ============ Storage ============

  IArbitrumOutbox public outbox;
  IArbitrumRollup public rollup;

  /**
   * @notice Sets cap on maxSubmissionCost used in `createRetryableTicket`
   * @dev The value used in `createRetryableTicket` is the lesser of the cap or
   * a value passed in via `_encodedData` in `_sendMessage`.
   *
   * This value represents amount of ETH allocated to pay for the base submission fee
   */
  uint256 public maxSubmissionCostCap;

  /**
   * @notice Sets cap on maxGas used in `createRetryableTicket`
   * @dev The value used in `createRetryableTicket` is the lesser of the cap or
   * a value passed in via `_encodedData` in `_sendMessage`.
   *
   * This value represents gas limit for immediate L2 execution attempt
   */
  uint256 public maxGasCap;

  /**
   * @notice Sets cap on gasPrice used in `createRetryableTicket`
   * @dev The value used in `createRetryableTicket` is the lesser of the cap or
   * a value passed in via `_encodedData` in `_sendMessage`.
   *
   * This value represents L2 gas price bid for immediate L2 execution attempt
   */
  uint256 public gasPriceCap;

  /**
   * @notice Tracks which messages have been processed from bridge
   */
  mapping(uint256 => bool) public processed;

  // ============ Events ============
  // TODO: do we need any other information from the ticket to link to message?
  event RetryableTicketCreated(uint256 indexed ticketId);

  /**
   * @notice Emitted when admin updates the maxSubmissionCap
   * @param _previous The starting value
   * @param _updated The final value
   */
  event MaxSubmissionCapUpdated(uint256 _previous, uint256 _updated);

  /**
   * @notice Emitted when admin updates the maxGasCap
   * @param _previous The starting value
   * @param _updated The final value
   */
  event MaxGasCapUpdated(uint256 _previous, uint256 _updated);

  /**
   * @notice Emitted when admin updates the gasPriceCap
   * @param _previous The starting value
   * @param _updated The final value
   */
  event GasPriceCapUpdated(uint256 _previous, uint256 _updated);

  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    address _outbox,
    uint256 _maxSubmissionCostCap,
    uint256 _maxGasCap,
    uint256 _gasPriceCap
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector) {
    outbox = IArbitrumOutbox(_outbox);
    rollup = IArbitrumRollup(outbox.rollup());

    // Set initial caps for L1 -> L2 messages
    maxSubmissionCostCap = _maxSubmissionCostCap;
    maxGasCap = _maxGasCap;
    gasPriceCap = _gasPriceCap;
  }

  // ============ Admin fns ============

  /**
   * @notice Used (by admin) to update the maxSubmissionCostCap
   * @param _updated The new value
   */
  function setMaxSubmissionCostCap(uint256 _updated) public onlyOwner {
    emit MaxSubmissionCapUpdated(maxSubmissionCostCap, _updated);
    maxSubmissionCostCap = _updated;
  }

  /**
   * @notice Used (by admin) to update the maxGasCap
   * @param _updated The new value
   */
  function setMaxGasCap(uint256 _updated) public onlyOwner {
    emit MaxGasCapUpdated(maxGasCap, _updated);
    maxGasCap = _updated;
  }

  /**
   * @notice Used (by admin) to update the gasPriceCap
   * @param _updated The new value
   */
  function setGasPriceCap(uint256 _updated) public onlyOwner {
    emit GasPriceCapUpdated(maxSubmissionCostCap, _updated);
    gasPriceCap = _updated;
  }

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    return _expected == LibArbitrumL1.crossChainSender(AMB);
  }

  /**
   * @notice Helper to return the lesser of two values
   * @param _a Some number
   * @param _b Some number
   */
  function _lesserOf(uint256 _a, uint256 _b) internal pure returns (uint256) {
    return _a < _b ? _a : _b;
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should always be dispatching the aggregate root
    require(_data.length == 32, "!length");
    // Get the calldata
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);

    // Should include specialized calldata
    require(_encodedData.length == (32 * 3), "!data length");

    // Decode all of the gas-related parameters
    (uint256 maxSubmissionCost, uint256 maxGas, uint256 gasPrice) = abi.decode(
      _encodedData,
      (uint256, uint256, uint256)
    );

    // dispatch to l2
    uint256 ticketID = IArbitrumInbox(AMB).createRetryableTicket{value: msg.value}(
      mirrorConnector, // destAddr
      0, // arbTxCallValue
      _lesserOf(maxSubmissionCost, maxSubmissionCostCap), // maxSubmissionCost: Amount of ETH allocated to pay for the base submission fee
      mirrorConnector, // submissionRefundAddress: Address to which all excess gas is credited on L2
      mirrorConnector, // valueRefundAddress: Address to which CallValue will be credited to on L2 if the retryable ticket times out or is cancelled
      _lesserOf(maxGas, maxGasCap), // maxGas: Gas limit for immediate L2 execution attempt
      _lesserOf(gasPrice, gasPriceCap), // gasPriceBid: L2 Gas price bid for immediate L2 execution attempt
      _calldata // data
    );
    emit RetryableTicketCreated(ticketID);
  }

  // DO NOT override _processMessage, should revert from `Connector` class. All messages must use the
  // `processMessageFromRoot` flow.

  function processMessageFromRoot(
    uint64 _nodeNum,
    bytes32 _sendRoot,
    bytes32 _blockHash,
    bytes32[] calldata _proof,
    uint256 _index,
    L2Message calldata _message
  ) external {
    // Ensure the send root corresponds to an arbitrum node that exists onchain
    _validateSendRoot(_nodeNum, _sendRoot, _blockHash);

    // Ensure the given l2 message is included in the send root
    _validateMessage(_sendRoot, _proof, _index, _message);

    // Message has been proven within the send root, process the message
    // data itself. The message data is defined in the spoke connector as:
    //
    // `abi.encodeWithSelector(Connector.processMessage.selector, _data);`
    //
    // so to get the root data, we need to decode the _calldata. we can do this
    // by dropping the 4-byte selector, then using the rest as the raw _data.
    require(_message.callData.length == 100, "!length");

    // NOTE: TypedMemView only loads 32-byte chunks onto stack, which is fine in this case
    // the calldata is 100 bytes long, the last 32 bytes represent the root to be aggregated.
    bytes32 _data = _message.callData.ref(0).index(68, 32);

    // Update root manager
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, _data);

    // Emit event
    emit MessageProcessed(abi.encode(_data), msg.sender);
  }

  function _validateSendRoot(
    uint64 _nodeNum,
    bytes32 _sendRoot,
    bytes32 _blockHash
  ) internal view {
    // Get the confirm data to ensure the node has been put on L1 with
    // the given block hash and send root
    bytes32 confirmData = _confirmHash(_blockHash, _sendRoot);

    // Validate inputs by checking against the stored none confirm data
    Node memory node = rollup.getNode(_nodeNum);
    require(node.confirmData == confirmData, "!confirmData");

    // Validate the node is staked / not in dispute
    // NOTE: a dispute can happen at any point within the timeout window, so the closest
    // we can get is to ensure the staker count > 0 and that there have been stakes on child
    // nodes as well, meaning the node is less likely to be staked incorrectly (and thus less
    // likely to be disputed)
    require(node.stakerCount > 0 && node.childStakerCount > 0, "!staked");
  }

  // prove the message was included in the given send root
  function _validateMessage(
    bytes32 _sendRoot,
    bytes32[] calldata _proof,
    uint256 _index,
    L2Message calldata _msg
  ) internal {
    // Check that the l2sender is the mirror connector
    require(_msg.l2Sender == mirrorConnector, "!mirrorConnector");

    // Generate the message sent through from L2 (included in sendRoot)
    bytes32 userTx = outbox.calculateItemHash(
      _msg.l2Sender,
      _msg.to,
      _msg.l2Block,
      _msg.l1Block,
      _msg.l2Timestamp,
      _msg.value,
      _msg.callData
    );

    // Prove message is included in the send root
    _recordOutputAsSpent(_proof, _index, userTx, _sendRoot);
  }

  // taken from: https://github.com/OffchainLabs/nitro/blob/208d9d50f250e9b4948f867d3795548256583b17/contracts/src/rollup/RollupLib.sol#L128-L130
  function _confirmHash(bytes32 _blockHash, bytes32 _sendRoot) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(_blockHash, _sendRoot));
  }

  // modified from: https://github.com/OffchainLabs/nitro/blob/fbaa96d6d6246b427629be176499e1d5c5013d89/contracts/src/bridge/Outbox.sol#L219-L235
  function _recordOutputAsSpent(
    bytes32[] memory _proof,
    uint256 _index,
    bytes32 _item,
    bytes32 _sendRoot
  ) internal {
    require(_proof.length < 256, "proof length");
    require((_index >> _proof.length) == 0, "!minimal proof");

    // NOTE: in the arbitrum contracts, they check that the message index is not yet spent
    // Because the spoke connector calls `processMessage`, which does nothing, it is important
    // to check out own internal mapping to ensure the message is not played twice. this forces
    // all messages from l2 to be processed using the `processMessageFromRoot` fn path.
    require(!processed[_index], "spent");

    // Calculate the root
    bytes32 calcRoot = outbox.calculateMerkleRoot(_proof, _index, _item);

    // Assert the sendRoot is correct
    // NOTE: this send root will *not* yet be stored on the `Outbox`
    // contract (fraud period has not yet elapsed);
    require(calcRoot == _sendRoot, "!proof");

    // Mark as spent
    processed[_index] = true;
  }
}

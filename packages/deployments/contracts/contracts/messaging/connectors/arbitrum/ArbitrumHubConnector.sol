// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

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
  uint256 public defaultGasPrice;

  IArbitrumOutbox public outbox;
  IArbitrumRollup public rollup;

  // Tracks which messages have been processed from bridge
  mapping(uint256 => bool) processed;

  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorGas,
    uint256 _defaultGasPrice,
    address _outbox
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorGas) {
    defaultGasPrice = _defaultGasPrice;
    outbox = IArbitrumOutbox(_outbox);
    rollup = IArbitrumRollup(outbox.rollup());
  }

  // ============ Admin fns ============

  function setDefaultGasPrice(uint256 _defaultGasPrice) external onlyOwner {
    emit DefaultGasPriceUpdated(defaultGasPrice, _defaultGasPrice);
    defaultGasPrice = _defaultGasPrice;
  }

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    return _expected == LibArbitrumL1.crossChainSender(AMB);
  }

  function _sendMessage(bytes memory _data) internal override {
    // Should always be dispatching the aggregate root
    require(_data.length == 32, "!length");
    // Get the calldata
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    // dispatch to l2
    IArbitrumInbox(AMB).sendContractTransaction(mirrorGas, defaultGasPrice, mirrorConnector, 0, _calldata);
  }

  function _processMessage(bytes memory _data) internal override {
    // Does nothing, all messages should go through the `processMessageFromRoot` path
    // when handling l2 -> l1 messages. See note in `recordOutputAsSpent`
  }

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
    // NOTE: TypedMemView only loads 32-byte chunks onto stack, which is fine in this case
    bytes32 _data = _message.callData.ref(0).index(4, 32);

    // Update root manager
    IRootManager(ROOT_MANAGER).setOutboundRoot(MIRROR_DOMAIN, _data);
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

    // TODO: Validate the node is staked / not in dispute
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
    require(_index < 2**_proof.length, "!minimal proof");

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

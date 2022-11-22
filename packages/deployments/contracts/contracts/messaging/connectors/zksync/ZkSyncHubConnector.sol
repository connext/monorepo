// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

// Importing zkSync contract interface
import "@matterlabs/zksync-contracts/l1/contracts/zksync/interfaces/IZkSync.sol";

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {HubConnector} from "../HubConnector.sol";
import {Connector} from "../Connector.sol";
import {GasCap} from "../GasCap.sol";

contract ZkSyncHubConnector is HubConnector, GasCap {
  // ============ Storage ============

  // NOTE: This is needed because we need to track the roots we've
  // already sent across chains. When sending an zkSync message, we send calldata
  // for Connector.processMessage. At any point these messages could be processed
  // before the timeout using `processFromRoot` or after the timeout using `process`
  // we track the roots sent here to ensure we process each root once
  mapping(bytes32 => bool) public processed;

  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    address _stateCommitmentChain,
    uint256 _gasCap
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector) GasCap(_gasCap) {}

  // ============ Override Fns ============
  function _verifySender(address) internal pure override returns (bool) {
    // NOTE: sender from L2 is asserted in the `processMessageFromRoot` function. Cross domain
    // sender is packed in with the L2Message struct, so you should not be verifying the
    // sender using this method. Always return false.
    // See docs here: https://v2-docs.zksync.io/dev/developer-guides/Bridging/l2-l1.html#prove-inclusion-of-the-message-into-the-l2-block
    return false;
  }

  /**
   * @dev Sends `aggregateRoot` to messaging on l2
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should include gasPrice value for `l2TransactionBaseCOst` specialized calldata
    require(_encodedData.length == 32, "!data length");
    // Should always be dispatching the aggregate root
    require(_data.length == 32, "!length");
    // Get the calldata
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    // Get the gas data
    uint256 gasPrice = abi.decode(_encodedData, (uint256));

    // Declare the ergs limit
    uint256 ERGS_LIMIT = 10000;

    // Get the max supplied
    uint256 fee = _getGas(msg.value);

    // Ensure it is above minimum
    require(fee > IZkSync(AMB).l2TransactionBaseCost(gasPrice, ERGS_LIMIT, uint32(_calldata.length)), "!fees");

    // Dispatch message
    // https://v2-docs.zksync.io/dev/developer-guides/Bridging/l1-l2.html#structure
    // calling L2 smart contract from L1 Example contract
    // note: msg.value must be passed in and can be retrieved from the AMB view function `l2TransactionBaseCost`
    // https://v2-docs.zksync.io/dev/developer-guides/Bridging/l1-l2.html#using-contract-interface-in-your-project
    IZkSync(AMB).requestL2Transaction{value: fee}(
      // The address of the L2 contract to call
      mirrorConnector,
      // We pass no ETH with the call
      0,
      // Encoding the calldata for the execute
      _calldata,
      // Ergs limit
      ERGS_LIMIT,
      // factory dependencies
      new bytes[](0)
    );
  }

  // DO NOT override _processMessage, should revert from `Connector` class. All messages must use the
  // `processMessageFromRoot` flow.

  /**
   * @notice Processes message and proves inclusion of that message in the root.
   *
   * @dev modified from: https://v2-docs.zksync.io/dev/developer-guides/Bridging/l2-l1.html#prove-inclusion-of-the-message-into-the-l2-block
   */
  function processMessageFromRoot(
    // zkSync block number in which the message was sent
    uint32 _l2BlockNumber,
    // Message index, that can be received via API
    uint256 _l2MessageIndex,
    // The L2 transaction number in a block, in which the log was sent
    uint16 _l2TxNumberInBlock,
    // The message that was sent from l2
    bytes calldata _message,
    // Merkle proof for the message
    bytes32[] calldata _proof
  ) external {
    // sanity check root length (32 bytes root)
    require(_message.length == 32, "!length");

    IZkSync zksync = IZkSync(AMB);
    L2Message memory message = L2Message({
      txNumberInBlock: _l2TxNumberInBlock,
      sender: mirrorConnector,
      data: _message
    });

    bool success = zksync.proveL2MessageInclusion(_l2BlockNumber, _l2MessageIndex, message, _proof);
    require(success, "!proven");

    bytes32 _root = bytes32(_message);

    // NOTE: there are no guarantees the messages are processed once, so processed roots
    // must be tracked within the connector. See:
    // https://v2-docs.zksync.io/dev/developer-guides/Bridging/l2-l1.html#prove-inclusion-of-the-message-into-the-l2-block
    if (!processed[_root]) {
      // set root to processed
      processed[_root] = true;
      // update the root on the root manager
      IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, _root);
      emit MessageProcessed(_message, msg.sender);
    } // otherwise root was already sent to root manager
  }
}

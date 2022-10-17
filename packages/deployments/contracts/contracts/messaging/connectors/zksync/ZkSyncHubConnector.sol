// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

// Importing zkSync contract interface
import "@matterlabs/zksync-contracts/l1/contracts/zksync/interfaces/IZkSync.sol";

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";
import {HubConnector} from "../HubConnector.sol";
import {Connector} from "../Connector.sol";

contract ZkSyncHubConnector is HubConnector {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;

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
    uint256 _mirrorGas,
    address _stateCommitmentChain
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorGas) {}

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
  function _sendMessage(bytes memory _data) internal override {
    // Should always be dispatching the aggregate root
    require(_data.length == 32, "!length");
    // Get the calldata
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);

    // Dispatch message
    // https://v2-docs.zksync.io/dev/developer-guides/Bridging/l1-l2.html#structure
    // calling L2 smart contract from L1 Example contract
    // note: msg.value must be passed in and can be retrieved from the AMB view function `l2TransactionBaseCost`
    // https://v2-docs.zksync.io/dev/developer-guides/Bridging/l1-l2.html#using-contract-interface-in-your-project
    IZkSync(AMB).requestL2Transaction{value: msg.value}(
      // The address of the L2 contract to call
      mirrorConnector,
      // We pass no ETH with the call
      0,
      // Encoding the calldata for the execute
      _calldata,
      // Ergs limit
      10000,
      // factory dependencies
      new bytes[](0)
    );
  }

  /**
   * @notice Processes messages
   * @dev Should do nothing because all messages must be processed via `processMessageFromRoot`
   * to enforce inclusion in the message root.
   *
   * @param _data Message sent from L2 (should be the outbound root)
   */
  function _processMessage(bytes memory _data) internal override {}

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
    // sanity check root length (fn selector + 32 bytes root)
    require(_message.length == 36, "!length");

    IZkSync zksync = IZkSync(AMB);
    L2Message memory message = L2Message({
      txNumberInBlock: _l2TxNumberInBlock,
      sender: mirrorConnector,
      data: _message
    });

    bool success = zksync.proveL2MessageInclusion(_l2BlockNumber, _l2MessageIndex, message, _proof);
    require(success, "!proven");

    // NOTE: TypedMemView only loads 32-byte chunks onto stack, which is fine in this case
    bytes29 _view = _message.ref(0);
    bytes32 _root = _view.index(_view.len() - 32, 32);

    // NOTE: there are no guarantees the messages are processed once, so processed roots
    // must be tracked within the connector. See:
    // https://v2-docs.zksync.io/dev/developer-guides/Bridging/l2-l1.html#prove-inclusion-of-the-message-into-the-l2-block
    if (!processed[_root]) {
      // set root to processed
      processed[_root] = true;
      // update the root on the root manager
      IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, _root);
    } // otherwise root was already sent to root manager
  }
}

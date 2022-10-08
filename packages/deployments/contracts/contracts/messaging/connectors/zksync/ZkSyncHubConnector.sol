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
  function _verifySender(address _expected) internal view override returns (bool) {
    // TODO: verify sender
    return true;
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
   * @param _data The message to process (should be an outbound root originating on
   * spoke)
   */
  function _processMessage(bytes memory _data) internal override {
    // sanity check root length
    require(_data.length == 32, "!length");

    // get root from data
    bytes32 root = bytes32(_data);

    if (!processed[root]) {
      // set root to processed
      processed[root] = true;
      // update the root on the root manager
      IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, root);
    } // otherwise root was already sent to root manager
  }

  /**
   * @dev modified from: https://v2-docs.zksync.io/dev/developer-guides/Bridging/l2-l1.html#prove-inclusion-of-the-message-into-the-l2-block
   */
  function processMessageFromRoot(
    // The address of the zkSync smart contract.
    // It is not recommended to hardcode it during the alpha testnet as regenesis may happen.
    address _zkSyncAddress,
    // zkSync block number in which the message was sent
    uint32 _l2BlockNumber,
    // Message index, that can be received via API
    uint256 _index,
    // The message that was sent from l2
    bytes calldata _message,
    // Merkle proof for the message
    bytes32[] calldata _proof
  ) external {
    IZkSync zksync = IZkSync(_zkSyncAddress);
    L2Message memory message = L2Message({sender: mirrorConnector, data: _message});

    bool success = zksync.proveL2MessageInclusion(_l2BlockNumber, _index, message, _proof);
    require(success, "Failed to prove message inclusion");

    // NOTE: TypedMemView only loads 32-byte chunks onto stack, which is fine in this case
    bytes29 _view = _message.ref(0);
    bytes32 _data = _view.index(_view.len() - 32, 32);

    _processMessage(abi.encode(_data));
  }
}

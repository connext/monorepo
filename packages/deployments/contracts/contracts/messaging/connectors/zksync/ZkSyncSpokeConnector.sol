// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

// Importing interfaces and addresses of the system contracts
import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";

import {SpokeConnector} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

contract ZkSyncSpokeConnector is SpokeConnector {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorGas,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager
  )
    SpokeConnector(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _mirrorGas,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    )
  {}

  // ============ Override Fns ============
  function _verifySender(address _expected) internal view override returns (bool) {
    // NOTE: msg.sender is preserved for L1 -> L2 calls. See the L2 contract in the tutorial
    // here: https://v2-docs.zksync.io/dev/tutorials/cross-chain-tutorial.html#l2-counter
    return msg.sender == _expected;
  }

  /**
   * @dev Sends `outboundRoot` to root manager on l1
   */
  function _sendMessage(bytes memory _data) internal override {
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    // Dispatch message through zkSync AMB
    L1_MESSENGER_CONTRACT.sendToL1(_calldata);
  }

  /**
   * @dev Handles an incoming `aggregateRoot`
   * NOTE: Could store latest root sent and prove aggregate root
   */
  function _processMessage(bytes memory _data) internal override {
    // enforce this came from connector on l2
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // set the aggregate root
    receiveAggregateRoot(bytes32(_data));
  }
}

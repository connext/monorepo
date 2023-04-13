// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

// Importing interfaces and addresses of the system contracts
import {IL1Messenger} from "../../interfaces/ambs/zksync/IL1Messenger.sol";

import {SpokeConnector} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

contract ZkSyncSpokeConnector is SpokeConnector {
  uint160 constant L1_TO_L2_ALIAS_OFFSET = uint160(0x1111000000000000000000000000000000001111);

  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
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
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    )
  {}

  // ============ Public Functions ============

  /**
   * @notice Processes a message received by an AMB
   * @dev This is called to process messages originating from mirror connector
   * For zksync this is not called by AMB
   */
  function processMessage(bytes memory _data) external override {
    _processMessage(_data);
    emit MessageProcessed(_data, msg.sender);
  }

  // ============ Private Functions ============

  // ============ Override Fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    // NOTE: msg.sender is preserved for L1 -> L2 calls. See the L2 contract in the tutorial
    // here: https://v2-docs.zksync.io/dev/tutorials/cross-chain-tutorial.html#l2-counter

    // NOTE: if an attacker controls the msg.sender, they could insert malicious roots.
    // From the zksync team:
    // 'We have a different address generation schema that would not allow address
    // to be claimed on L2 by an adversary. Even if you deploy same address and same
    // private key it would still be different'
    return undoL1ToL2Alias(msg.sender) == _expected;
  }

  /**
   * @dev Sends `outboundRoot` to root manager on l1
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should not include specialized calldata
    require(_encodedData.length == 0, "!data length");

    // Dispatch message through zkSync AMB
    // https://era.zksync.io/docs/dev/developer-guides/bridging/l2-l1.html#structure
    /// https://github.com/matter-labs/era-system-contracts/blob/main/contracts/interfaces/IL1Messenger.sol
    IL1Messenger(AMB).sendToL1(_data);
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

  /**
   * @notice Utility function that converts the msg.sender viewed in the L2 to the
   * address in the L1 that submitted a tx to the inbox
   * @param l2Address L2 address as viewed in msg.sender
   * @return l1Address the address in the L1 that triggered the tx to L2
   */
  function undoL1ToL2Alias(address l2Address) internal pure returns (address l1Address) {
    // https://github.com/matter-labs/v2-testnet-contracts/blob/main/l2/contracts/vendor/AddressAliasHelper.sol
    unchecked {
      l1Address = address(uint160(l2Address) - L1_TO_L2_ALIAS_OFFSET);
    }
  }
}

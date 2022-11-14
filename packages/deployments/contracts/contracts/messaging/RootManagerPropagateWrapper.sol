// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ProposedOwnable} from "../shared/ProposedOwnable.sol";

import {IRootManager} from "./interfaces/IRootManager.sol";
import {IHubConnector} from "./interfaces/IHubConnector.sol";
import {Message} from "./libraries/Message.sol";
import {QueueLib} from "./libraries/Queue.sol";
import {DomainIndexer} from "./libraries/DomainIndexer.sol";

import {MerkleTreeManager} from "./MerkleTreeManager.sol";
import {WatcherClient} from "./WatcherClient.sol";

/**
 * @notice This contract exists at cluster hubs, and aggregates all transfer roots from messaging
 * spokes into a single merkle tree. Regularly broadcasts the root of the aggregator tree back out
 * to all the messaging spokes.
 */
contract RootManagerPropagateWrapper is ProposedOwnable {
  // ============ Events ============

  event FundsReceived(uint256 amount, uint256 balance);

  event FundsDeducted(uint256 amount, uint256 balance);

  event RootManagerChanged(address rootManager, address oldRootManager);

  // ============ Properties ============

  IRootManager public rootManager;

  // ============ Constructor ============

  /**
   * @notice Creates a new RootManagerPropagateWrapper instance.
   * @param _rootManager The address of the RootManager on this domain.
   */
  constructor(address _rootManager) ProposedOwnable() {
    _setOwner(msg.sender);

    require(_rootManager != address(0), "!zero rootManager");
    rootManager = IRootManager(_rootManager);
    emit RootManagerChanged(_rootManager, address(0));
  }

  // ============ Admin Functions ============

  function setRootManager(address _rootManager) external onlyOwner {
    require(_rootManager != address(0), "!zero rootManager");
    address oldRootManager = address(rootManager);
    rootManager = IRootManager(_rootManager);
    emit RootManagerChanged(_rootManager, oldRootManager);
  }

  // ============ External Functions ============

  function propagate(
    address[] calldata _connectors,
    uint256[] calldata _fees,
    bytes[] memory _encodedData
  ) external {
    uint256 sum = 0;
    uint256 length = _connectors.length;
    for (uint32 i; i < length; ) {
      sum += _fees[i];
      unchecked {
        ++i;
      }
    }

    rootManager.propagate{value: sum}(_connectors, _fees, _encodedData);
    emit FundsDeducted(sum, address(this).balance);
  }

  receive() external payable {
    emit FundsReceived(msg.value, address(this).balance);
  }
}

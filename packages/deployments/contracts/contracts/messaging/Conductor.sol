// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ProposedOwnable} from "../shared/ProposedOwnable.sol";
import {ExcessivelySafeCall} from "../shared/libraries/ExcessivelySafeCall.sol";

/**
 * @title Conductor
 * @author Connext Labs
 * @notice A contract that can queue and execute transactions.
 *
 * This contract is intended to be used as an owner, to allow for timelocks
 * over arbitrary admin configuration and contract deployment.
 *
 * @dev Target/selector combos can bypass the timelock if added to a whitelist.
 * However, adding these values requires a timelock (use `multisend` to add).
 *
 * @dev Inherits a default delay fof 7 days from ProposedOwnable
 */
contract Conductor is ProposedOwnable {
  // ============ Structs ============

  /**
   * @notice A struct that represents a transaction to eventually execute
   * @param to The address to send the transaction to
   * @param value The amount of wei to send with the transaction
   * @param data The data to send with the transaction
   */
  struct Transaction {
    address to;
    uint256 value;
    bytes data;
  }

  // ============ Events ============

  /**
   * @notice Emitted when a target/selector combo is added to the bypass whitelist
   * @param target The address of the target contract
   * @param selector The selector of the function to bypass
   */
  event BypassAdded(address target, bytes4 selector);

  /**
   * @notice Emitted when a target/selector combo is removed from the bypass whitelist
   * @param target The address of the target contract
   * @param selector The selector of the function to bypass
   */
  event BypassRemoved(address target, bytes4 selector);

  /**
   * @notice Emitted when a set of transactions are queued
   * @param key The keccak256 hash of the transactions
   * @param elapse The timestamp at which the transactions can be executed
   * @param transactions The transactions that were queued
   */
  event Queued(bytes32 indexed key, uint256 elapse, bytes[] transactions);

  /**
   * @notice Emitted when a set of transactions are removed from the queue
   * @param key The keccak256 hash of the transactions
   * @param transactions The transactions that were dequeued
   */
  event Dequeued(bytes32 indexed key, bytes[] transactions);

  /**
   * @notice Emitted when a set of transactions are executed
   * @param key The keccak256 hash of the transactions
   * @param transactions The transactions that were executed
   */
  event Executed(bytes32 indexed key, bytes[] transactions);

  // ============ Errors ============

  error Conductor_onlyConductor__notConductor(address sender);
  error Conductor_addBypass__cannotBypassConductor();
  error Conductor_renounceOwnership__prohibited();
  error Conductor_queue__alreadyQueued(bytes32 key);
  error Conductor_dequeue__notQueued(bytes32 key);
  error Conductor_execute__notElapsed(bytes32 key);
  error Conductor_execute__cannotBypass(bytes4 selector, address target);
  error Conductor_execute__callFailed();

  // ============ Storage ============

  /**
   * @notice A mapping of target/selector combos to whether they can bypass the
   * timelock.
   * @dev Keyed by keccak256(abi.encodePacked(target, selector))
   */
  mapping(bytes32 => bool) public bypassDelay;

  /**
   * @notice A mapping of active transaction sets to execute
   * @dev Keyed by keccak256(abi.encode(transactions))
   */
  mapping(bytes32 => uint256) public proposals;

  // ============ Modifiers ============
  modifier onlyConductor() {
    if (msg.sender != address(this)) {
      revert Conductor_onlyConductor__notConductor(msg.sender);
    }
    _;
  }

  // ============ Constructor ============
  constructor(address _owner) ProposedOwnable() {
    _setOwner(_owner);
  }

  // ============ Fallback ============
  /**
   * @notice Allows this contract to receive ETH
   */
  receive() external payable {}

  // ============ Admin ============

  /**
   * @notice Adds a target/selector combo to the bypass whitelist
   * @dev This function is intended to be called via queue / execute flow to enforce the
   * same timelock on the bypass whitelist as on the execution of transactions.
   * @param _target The address of the target contract
   * @param _selector The selector of the function to bypass
   */
  function addBypass(address _target, bytes4 _selector) public onlyConductor {
    if (_target == address(this)) {
      revert Conductor_addBypass__cannotBypassConductor();
    }
    bypassDelay[keccak256(abi.encodePacked(_target, _selector))] = true;
    emit BypassAdded(_target, _selector);
  }

  /**
   * @notice Removes a target/selector combo from the bypass whitelist
   * @dev This function is intended to be called via queue / execute flow to enforce the
   * same timelock on the bypass whitelist as on the execution of transactions.
   * @param _target The address of the target contract
   * @param _selector The selector of the function to bypass
   */
  function removeBypass(address _target, bytes4 _selector) public onlyConductor {
    delete bypassDelay[keccak256(abi.encodePacked(_target, _selector))];
    emit BypassRemoved(_target, _selector);
  }

  /**
   * @notice Renouncing ownership of this contract is blocked
   */
  function renounceOwnership() public view override onlyOwner {
    revert Conductor_renounceOwnership__prohibited();
  }

  // ============ Public ============

  /**
   * @notice Stores a proposed set of transactions to execute post-timelock
   * @dev _transactions is an array of abi-encoded Transaction types
   * @param _transactions The transactions to queue
   */
  function queue(bytes[] memory _transactions) public onlyOwner {
    bytes32 key = keccak256(abi.encode(_transactions));
    if (proposals[key] != 0) {
      revert Conductor_queue__alreadyQueued(key);
    }
    uint256 elapse = block.timestamp + delay();
    proposals[key] = elapse;
    emit Queued(key, elapse, _transactions);
  }

  /**
   * @notice Removes a set of transactions from the queue
   * @param _transactions The transactions to dequeue
   */
  function dequeue(bytes[] memory _transactions) public onlyOwner {
    bytes32 key = keccak256(abi.encode(_transactions));
    if (proposals[key] == 0) {
      revert Conductor_dequeue__notQueued(key);
    }
    delete proposals[key];
    emit Dequeued(key, _transactions);
  }

  /**
   * @notice Executes a set of transactions after the timelock has elapsed
   * @param _transactions The transactions to execute
   */
  function execute(bytes[] memory _transactions) public payable onlyOwner {
    bytes32 key = keccak256(abi.encode(_transactions));
    if (block.timestamp < proposals[key]) {
      revert Conductor_execute__notElapsed(key);
    }
    delete proposals[key];
    _execute(_transactions, false);
    emit Executed(key, _transactions);
  }

  /**
   * @notice Executes a set of transactions without checking the timelock
   * @dev `_execute` enforces that the target/selector combo can bypass
   * @param _transactions The transactions to execute
   */
  function executeWithBypass(bytes[] memory _transactions) public payable onlyOwner {
    bytes32 key = keccak256(abi.encode(_transactions));
    _execute(_transactions, true);
    emit Executed(key, _transactions);
  }

  // ============ Private ============

  /**
   * @notice Executes a set of transactions
   * @param _transactions The transactions to execute
   * @param _bypass Whether to bypass the timelock
   */
  function _execute(bytes[] memory _transactions, bool _bypass) internal {
    uint256 reserve = 10_000;
    // Check if all transactions can be bypassed
    for (uint256 i; i < _transactions.length; i++) {
      Transaction memory transaction = abi.decode(_transactions[i], (Transaction));
      bytes4 selector = _getSelector(transaction.data);
      bytes32 key = keccak256(abi.encodePacked(transaction.to, selector));
      if (_bypass) {
        // Make sure selector / addr pair can be bypassed
        if (!bypassDelay[key]) {
          revert Conductor_execute__cannotBypass(selector, transaction.to);
        }
      }
      // NOTE: no need to assert proposals, because it will be checked via
      // `execute` function if used

      // Execute transaction
      (bool success, ) = ExcessivelySafeCall.excessivelySafeCall(
        transaction.to,
        gasleft() - reserve,
        transaction.value,
        0,
        transaction.data
      );
      if (!success) {
        revert Conductor_execute__callFailed();
      }
    }
  }

  /**
   * @notice Gets selector from calldata (first 4 bytes)
   */
  function _getSelector(bytes memory data) internal pure returns (bytes4 selector) {
    assembly {
      selector := mload(add(data, 32))
    }
  }
}

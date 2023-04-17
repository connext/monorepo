// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ProposedOwnable} from "../shared/ProposedOwnable.sol";

import "forge-std/console.sol";

contract Conductor is ProposedOwnable {
  // ============ Structs ============

  struct Transaction {
    address to;
    uint256 value;
    bytes data;
  }

  // ============ Events ============

  event BypassAdded(address target, bytes4 selector);
  event BypassRemoved(address target, bytes4 selector);
  event Queued(bytes32 indexed key, uint256 elapse, bytes[] transactions);
  event Dequeued(bytes32 indexed key, bytes[] transactions);
  event Executed(bytes32 indexed key, bytes[] transactions);

  // ============ Errors ============

  error Conductor_renounceOwnership__prohibited();
  error Conductor_queue__alreadyQueued(bytes32 key);
  error Conductor_dequeue__notQueued(bytes32 key);
  error Conductor_execute__notElapsed(bytes32 key);
  error Conductor_execute__cannotBypass(bytes4 selector, address target);
  error Conductor_execute__callFailed();

  // ============ Storage ============

  mapping(bytes32 => bool) public bypassDelay;

  mapping(bytes32 => uint256) public proposals;

  // ============ Constructor ============
  constructor(address _owner) ProposedOwnable() {
    _setOwner(_owner);
  }

  // ============ Admin ============

  function addBypass(address _target, bytes4 _selector) public onlyOwner {
    bypassDelay[keccak256(abi.encodePacked(_target, _selector))] = true;
    emit BypassAdded(_target, _selector);
  }

  function removeBypass(address _target, bytes4 _selector) public onlyOwner {
    delete bypassDelay[keccak256(abi.encodePacked(_target, _selector))];
    emit BypassRemoved(_target, _selector);
  }

  function renounceOwnership() public override onlyOwner {
    revert Conductor_renounceOwnership__prohibited();
  }

  // ============ Public ============

  function queue(bytes[] memory _transactions) public onlyOwner {
    bytes32 key = keccak256(abi.encode(_transactions));
    if (proposals[key] != 0) {
      revert Conductor_queue__alreadyQueued(key);
    }
    uint256 elapse = block.timestamp + delay();
    proposals[key] = elapse;
    emit Queued(key, elapse, _transactions);
  }

  function dequeue(bytes[] memory _transactions) public onlyOwner {
    bytes32 key = keccak256(abi.encode(_transactions));
    if (proposals[key] == 0) {
      revert Conductor_dequeue__notQueued(key);
    }
    delete proposals[key];
    emit Dequeued(key, _transactions);
  }

  function execute(bytes[] memory _transactions) public onlyOwner {
    bytes32 key = keccak256(abi.encode(_transactions));
    if (block.timestamp < proposals[key]) {
      revert Conductor_execute__notElapsed(key);
    }
    delete proposals[key];
    _execute(_transactions, false);
    emit Executed(key, _transactions);
  }

  function executeWithBypass(bytes[] memory _transactions) public onlyOwner {
    bytes32 key = keccak256(abi.encode(_transactions));
    _execute(_transactions, true);
    emit Executed(key, _transactions);
  }

  // ============ Private ============

  function _execute(bytes[] memory _transactions, bool _bypass) internal {
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
      (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
      if (!success) {
        revert Conductor_execute__callFailed();
      }
    }
  }

  function _getSelector(bytes memory data) internal pure returns (bytes4 selector) {
    assembly {
      selector := mload(add(data, 32))
    }
  }
}

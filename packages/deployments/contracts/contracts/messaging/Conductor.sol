// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ProposedOwnable} from "../shared/ProposedOwnable.sol";

import "forge-std/console.sol";

contract Conductor is ProposedOwnable {
  // ============ Events ============
  event BypassAdded(address target, bytes4 selector);
  event BypassRemoved(address target, bytes4 selector);
  event Queued(bytes32 indexed key, uint256 elapse, bytes transactions);
  event Executed(bytes32 indexed key, bytes transactions);
  // ============ Storage ============

  mapping(bytes32 => bool) public bypassDelay;

  mapping(bytes32 => uint256) public proposals;

  mapping(bytes32 => bool) public executions;

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

  // ============ Public ============

  function execute(bytes memory _transactions) public onlyOwner {
    bytes32 key = keccak256(_transactions);
    require(proposals[key] > block.timestamp, "!elapsed");
    delete proposals[key];
    _execute(_transactions, true);
    emit Executed(key, _transactions);
  }

  function executeWithBypass(bytes memory _transactions) public onlyOwner {
    bytes32 key = keccak256(_transactions);
    _execute(_transactions, false);
    emit Executed(key, _transactions);
  }

  function _execute(bytes memory _transactions, bool _bypass) internal {
    bytes4 selector;
    bytes memory data;
    assembly {
      let length := mload(_transactions)
      let i := 0x20
      for {
        // Pre block is not used in "while mode"
      } lt(i, length) {
        // Post block is not used in "while mode"
      } {
        // bytes 0 - 1 is the operation
        // We shift by 248 bits (256 - 8 [operation byte]) it right since mload will always load 32 bytes (a word).
        // This will also zero out unused data.
        let operation := shr(0xf8, mload(add(_transactions, i)))

        // bytes 1 - 21 are the target
        // We offset the load address by 1 byte (operation byte)
        // We shift it right by 96 bits (256 - 160 [20 address bytes]) to right-align the data and zero out unused data.
        let to := shr(0x60, mload(add(_transactions, add(i, 0x01))))

        // bytes 21 - 53 are the value
        // We offset the load address by 21 byte (operation byte + 20 address bytes)
        let value := mload(add(_transactions, add(i, 0x15)))

        // bytes 53 - 85 are the data length
        // We offset the load address by 53 byte (operation byte + 20 address bytes + 32 value bytes)
        let dataLength := mload(add(_transactions, add(i, 0x35)))

        // bytes 85 - 89 are the selector
        // We offset the load address by 85 byte (operation byte + 20 address bytes + 32 value bytes + 32 data length bytes)
        // Shift it right by 224 bits (256 - 32 [4 selector bytes]) to right-align the data and zero out unused data.
        selector := mload(add(_transactions, add(i, 0x55)))

        // bytes 89 - (85 + dataLength) are the orphaned data
        // We offset the load address by 89 byte (operation byte + 20 address bytes + 32 value bytes + 32 data length bytes + 4 byte selector)
        let orphaned := add(_transactions, add(i, 0x59))
        let success := 0
        switch operation
        case 0 {
          success := call(gas(), to, value, orphaned, dataLength, 0, 0)
        }
        case 1 {
          success := delegatecall(gas(), to, orphaned, dataLength, 0, 0)
        }
        if eq(success, 0) {
          revert(0, 0)
        }
        // Next entry starts at 85 byte + data length
        i := add(i, add(0x59, dataLength))
      }
    }
    console.log("selector:");
    console.logBytes4(selector);
    console.log("data:");
    console.logBytes(data);
  }

  function queue(bytes memory _transactions) public onlyOwner {
    bytes32 key = keccak256(_transactions);
    require(proposals[key] == 0, "already queued");
    uint256 elapse = block.timestamp + delay();
    proposals[key] = elapse;
    emit Queued(key, elapse, _transactions);
  }

  function queueAndExecute() public onlyOwner {}
}

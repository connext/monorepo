// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Conductor} from "../../contracts/messaging/Conductor.sol";
import {TestERC20} from "../../contracts/test/TestERC20.sol";

import "../utils/ConnectorHelper.sol";

contract ConductorTest is ForgeHelper {
  TestERC20 token;

  Conductor conductor;

  function setUp() public {
    token = new TestERC20("t", "t");

    conductor = new Conductor(address(this));
  }

  function test_Conductor__execute_shouldWork() public {
    uint8 operation = 0; // call
    address to = address(token);
    uint256 value = 0;
    bytes memory data = abi.encodeWithSelector(token.mint.selector, address(this), 100);

    bytes memory transactions = abi.encodePacked(operation, to, value, data.length, data);
    console.log("transactions:");
    console.logBytes(transactions);
    conductor.executeWithBypass(transactions);
  }
}

// transaction

// AddressZero 0x0000000000000000000000000000000000000000
// HashZero    0x0000000000000000000000000000000000000000000000000000000000000000

// 0x005615deb798bb3e4dfa0139dfa1b3d433cc23b72f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004440c10f190000000000000000000000007fa9385be102ac3eac297483dd6233d62b3e14960000000000000000000000000000000000000000000000000000000000000064

// 0x // prefix
// 00 // operation
// 5615deb798bb3e4dfa0139dfa1b3d433cc23b72f // to
// 0000000000000000000000000000000000000000000000000000000000000000 // value
// 0000000000000000000000000000000000000000000000000000000000000044 // data length
// 40c10f190000000000000000000000007fa9385be102ac3eac297483dd6233d62b3e14960000000000000000000000000000000000000000000000000000000000000064 // data
// 40c10f19

//
//

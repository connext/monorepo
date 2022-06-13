// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../../../utils/ForgeHelper.sol";

import {TypedMemView, PromiseMessage} from "../../../../contracts/core/promise/libraries/PromiseMessage.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

contract PromiseMessageTest is ForgeHelper {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using PromiseMessage for bytes29;

  // ============ Test set up ============

  function setUp() public {}

  // ============ format/parse ============
  // Should work
  function test_PromiseMessage__parseMessage_formatMessage_shouldWork(
    bytes32 _transferId,
    address _callbackAddress,
    bool _returnSuccess,
    bytes calldata _returnData
  ) public {
    vm.assume(_callbackAddress != address(0) && _returnData.length == 32);
    //format PromiseCallback message
    bytes memory message = PromiseMessage.formatPromiseCallback(
      _transferId,
      _callbackAddress,
      _returnSuccess,
      _returnData
    );

    // parse Message again
    bytes29 _msg = message.ref(0).mustBePromiseCallback();
    bytes32 _parsedTransferId = _msg.transferId();
    address _parsedCallbackAddress = _msg.callbackAddress();
    bool _parsedReturnSuccess = _msg.returnSuccess();
    bytes memory _parsedReturnData = _msg.returnData();

    assertEq(_transferId, _parsedTransferId);
    assertEq(_callbackAddress, _parsedCallbackAddress);
    assertTrue(_returnSuccess == _parsedReturnSuccess);
    assertEq0(_returnData, _parsedReturnData);
  }
}

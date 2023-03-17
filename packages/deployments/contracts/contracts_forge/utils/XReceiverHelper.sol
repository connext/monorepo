// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./ForgeHelper.sol";

contract XReceiverHelper is ForgeHelper {
  // ============ Storage ============
  address _connext = address(999999);

  // Arguments in xReceive interface
  bytes32 _transferId = bytes32("29123acde");
  uint256 _amount = 1.5 ether;
  address _asset = address(777777);
  address _originSender = address(111111);
  uint32 _origin = 123456;
  bytes _callData = abi.encode("");

  function init() internal {
    utils_setUpMockAsset(true);
    labelAddresses();
  }

  function labelAddresses() internal {
    vm.label(_connext, "_connext");
    vm.label(_originSender, "_originSender");
    vm.label(_asset, "_asset");
  }

  // ============ Utils ============
  function utils_setUpMockAsset(bool transferSuccess) internal {
    vm.mockCall(_asset, abi.encodeWithSelector(IERC20.transfer.selector), abi.encode(transferSuccess));
  }
}

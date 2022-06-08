// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "forge-std/Test.sol";
import "forge-std/console.sol";

abstract contract ForgeHelper is Test {
  using stdStorage for StdStorage;
  address public constant NATIVE_ASSET = address(0);
}

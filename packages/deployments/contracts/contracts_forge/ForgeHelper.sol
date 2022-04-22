// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../lib/forge-std/src/Test.sol";

abstract contract ForgeHelper is Test {
  using stdStorage for StdStorage;
  address public constant NATIVE_ASSET = address(0);
}

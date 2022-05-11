// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../lib/forge-std/src/Test.sol";
import "../lib/forge-std/src/console.sol";

abstract contract ForgeHelper is Test {
  using stdStorage for StdStorage;
  address public constant NATIVE_ASSET = address(0);
}

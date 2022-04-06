// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../lib/ds-test/src/test.sol";
import "../lib/forge-std/src/stdlib.sol";
import "../lib/forge-std/src/Vm.sol";
import "../lib/forge-std/src/console.sol";

abstract contract ForgeHelper is DSTest {
  using stdStorage for StdStorage;

  Vm public constant vm = Vm(HEVM_ADDRESS);

  StdStorage public stdstore;

  address public constant NATIVE_ASSET = address(0);
}

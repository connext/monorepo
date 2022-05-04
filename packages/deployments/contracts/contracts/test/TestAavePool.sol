// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {IAavePool} from "../interfaces/IAavePool.sol";

contract TestAavePool is IAavePool {
  function mintUnbacked(
    address asset,
    uint256 amount,
    address onBehalfOf,
    uint16 referralCode
  ) external {}

  function backUnbacked(
    address asset,
    uint256 amount,
    uint256 fee
  ) external {}

  function withdraw(
    address asset,
    uint256 amount,
    address to
  ) external returns (uint256) {}
}

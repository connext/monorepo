// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "./ForgeHelper.sol";

// Holds shared config values
contract ConnectorHelper is ForgeHelper {
  // ============ Storage ============

  uint32 _l1Domain = 1000;
  uint32 _l2Domain = 2000;

  address _amb = address(111111);
  address _rootManager = address(2222222);
  uint256 _mirrorProcessGas = 100_000;
  uint256 _processGas = 850_000;
  uint256 _reserveGas = 15_000;

  address _l1Connector;
  address _l2Connector;
}

// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {OptimismV0SpokeConnector} from "../optimism-v0/OptimismV0SpokeConnector.sol";

contract MantleSpokeConnector is OptimismV0SpokeConnector {
  constructor(
    ConstructorParams memory _baseSpokeParams,
    uint256 _gasCap // gasLimit of message call on L1
  ) OptimismV0SpokeConnector(_baseSpokeParams, _gasCap) {}
}

// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.11;

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

import {AppStorage} from "../libraries/LibConnextStorage.sol";

/**
 * @title VersionFacet
 * @notice Version getter for contracts
 * @dev Should be interface-compatible with https://github.com/nomad-xyz/monorepo/blob/main/packages/contracts-core/contracts/Version0.sol
 **/
contract VersionFacet is BaseConnextFacet {
  // ============ Constants ==============

  uint8 internal immutable _version = 0;

  // ============ Getters ==============

  function VERSION() public pure returns (uint8) {
    return _version;
  }
}

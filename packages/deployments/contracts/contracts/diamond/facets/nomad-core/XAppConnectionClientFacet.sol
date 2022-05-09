// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.11;

// ============ External Imports ============
// import {Home} from "../../../../nomad-core-sol/contracts/Home.sol";
import {Home} from "../../../nomad-core/contracts/Home.sol";
import {XAppConnectionManager} from "../../../nomad-core/contracts/XAppConnectionManager.sol";
import {AppStorage} from "../../libraries/LibConnextStorage.sol";

// TODO: refactor proposed ownable to be one basic + one router/asset
// import {ProposedOwnableUpgradeable} from "../../ProposedOwnableUpgradeable.sol";

import {Modifiers} from "../../utils/Modifiers.sol";

contract XAppConnectionClientFacet is Modifiers {
  // ======== Initializer =========

  // TODO: move to DiamondInit
  // function __XAppConnectionClient_initialize(address _xAppConnectionManager) internal initializer {
  //   xAppConnectionManager = XAppConnectionManager(_xAppConnectionManager);
  //   __ProposedOwnable_init();
  // }

  // ============ External functions ============

  /**
   * @notice Modify the contract the xApp uses to validate Replica contracts
   * @param _xAppConnectionManager The address of the xAppConnectionManager contract
   */
  function setXAppConnectionManager(address _xAppConnectionManager) external onlyOwner {
    s.xAppConnectionManager = XAppConnectionManager(_xAppConnectionManager);
  }
}

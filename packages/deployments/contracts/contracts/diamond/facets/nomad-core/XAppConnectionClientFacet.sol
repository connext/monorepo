// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.11;

import {Home} from "../../../nomad-core/contracts/Home.sol";
import {XAppConnectionManager} from "../../../nomad-core/contracts/XAppConnectionManager.sol";
import {AppStorage} from "../../libraries/LibConnextStorage.sol";

import {BaseConnextFacet} from "../BaseConnextFacet.sol";

contract XAppConnectionClientFacet is BaseConnextFacet {
  // ============ Getters functions ============

  function xAppConnectionManager() public view returns (XAppConnectionManager) {
    return s.xAppConnectionManager;
  }

  // ============ External functions ============

  /**
   * @notice Modify the contract the xApp uses to validate Replica contracts
   * @param _xAppConnectionManager The address of the xAppConnectionManager contract
   */
  function setXAppConnectionManager(address _xAppConnectionManager) external onlyOwner {
    s.xAppConnectionManager = XAppConnectionManager(_xAppConnectionManager);
  }
}

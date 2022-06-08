// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.14;

import {XAppConnectionManager} from "../../../nomad-core/contracts/XAppConnectionManager.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

contract NomadFacet is BaseConnextFacet {
  // ============ Getters functions ============

  function xAppConnectionManager() public view returns (XAppConnectionManager) {
    return s.xAppConnectionManager;
  }

  function remotes(uint32 _domain) public view returns (bytes32) {
    return s.remotes[_domain];
  }

  // ============ External functions ============

  /**
   * @notice Modify the contract the xApp uses to validate Replica contracts
   * @param _xAppConnectionManager The address of the xAppConnectionManager contract
   */
  function setXAppConnectionManager(address _xAppConnectionManager) external onlyOwner {
    s.xAppConnectionManager = XAppConnectionManager(_xAppConnectionManager);
  }

  /**
   * @notice Register the address of a Router contract for the same xApp on a remote chain
   * @param _domain The domain of the remote xApp Router
   * @param _router The address of the remote xApp Router
   */
  function enrollRemoteRouter(uint32 _domain, bytes32 _router) external onlyOwner {
    s.remotes[_domain] = _router;
  }
}

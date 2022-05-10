// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.11;

// TODO: this should be inherited by ConnextRouterFacet
// import {IMessageRecipient} from "../../../nomad-core/interfaces/IMessageRecipient.sol";

import {Modifiers} from "../../utils/Modifiers.sol";

contract NomadRouterFacet is Modifiers {
  // ============ Modifiers ============

  // ============ Getters functions ============

  // TODO: add public storage getters

  // ============ External functions ============

  /**
   * @notice Register the address of a Router contract for the same xApp on a remote chain
   * @param _domain The domain of the remote xApp Router
   * @param _router The address of the remote xApp Router
   */
  function enrollRemoteRouter(uint32 _domain, bytes32 _router) external onlyOwner {
    s.remotes[_domain] = _router;
  }

  // ============ Virtual functions ============

  // function handle(
  //   uint32 _origin,
  //   uint32 _nonce,
  //   bytes32 _sender,
  //   bytes memory _message
  // ) external virtual override;
}

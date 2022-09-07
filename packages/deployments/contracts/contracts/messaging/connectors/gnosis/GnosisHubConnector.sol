// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {GnosisAmb} from "../../interfaces/ambs/GnosisAmb.sol";

import {Connector} from "../Connector.sol";
import {HubConnector} from "../HubConnector.sol";

import {GnosisBase} from "./GnosisBase.sol";

contract GnosisHubConnector is HubConnector, GnosisBase {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorGas
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorGas) GnosisBase() {}

  // ============ Private fns ============
  /**
   * @dev Asserts the sender of a cross domain message
   */
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected);
  }

  /**
   * @dev Messaging uses this function to send data to l2 via amb
   */
  function _sendMessage(bytes memory _data) internal override {
    // Should always be dispatching the aggregate root
    require(_data.length == 32, "!length");
    // send message via AMB, should call "processMessage" which will update aggregate root
    GnosisAmb(AMB).requireToPassMessage(
      mirrorConnector,
      abi.encodeWithSelector(Connector.processMessage.selector, address(this), _data),
      mirrorGas
    );
  }

  /**
   * @dev L2 connector calls this function to pass down latest outbound root
   */
  function _processMessage(bytes memory _data) internal override {
    // ensure the l1 connector sent the message
    require(_verifySender(mirrorConnector), "!l2Connector");
    // ensure it is headed to this domain
    require(GnosisAmb(AMB).destinationChainId() == block.chainid, "!destinationChain");
    // ensure it came from mainnet
    require(GnosisAmb(AMB).sourceChainId() == 100, "!sourceChainId");
    // get the data (should be the outbound root)
    require(_data.length == 32, "!length");
    // update the root on the root manager
    IRootManager(ROOT_MANAGER).setOutboundRoot(MIRROR_DOMAIN, bytes32(_data));
  }
}

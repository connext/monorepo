// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {GnosisAmb} from "../../interfaces/ambs/GnosisAmb.sol";

import {SpokeConnector} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

import {GnosisBase} from "./GnosisBase.sol";

contract GnosisSpokeConnector is SpokeConnector, GnosisBase {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    SpokeConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorGas, _processGas, _reserveGas)
    GnosisBase()
  {}

  // ============ Private fns ============
  /**
   * @dev Asserts the sender of a cross domain message
   */
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected);
  }

  /**
   * @dev Messaging uses this function to send data to mainnet via amb
   */
  function _sendMessage(bytes memory _data) internal override {
    // send the message to the l1 connector by calling `processMessage`
    GnosisAmb(AMB).requireToPassMessage(
      mirrorConnector,
      abi.encodeWithSelector(Connector.processMessage.selector, address(this), _data),
      mirrorGas
    );
  }

  /**
   * @dev AMB calls this function to store aggregate root that is sent up by the root manager
   */
  function _processMessage(bytes memory _data) internal override {
    // ensure the l1 connector sent the message
    require(_verifySender(mirrorConnector), "!l1Connector");
    // ensure it is headed to this domain
    require(GnosisAmb(AMB).destinationChainId() == block.chainid, "!destinationChain");
    // ensure it came from mainnet
    require(GnosisAmb(AMB).sourceChainId() == 1, "!sourceChainId");
    // update the aggregate root on the domain
    updateAggregateRoot(bytes32(_data));
  }
}

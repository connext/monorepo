// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {OptimismAmb} from "../../interfaces/ambs/optimism/OptimismAmb.sol";

import {SpokeConnector, ProposedOwnable} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

import {BaseOptimismV0} from "./BaseOptimismV0.sol";

/**
 * @title OptimismV0SpokeConnector
 * @notice This is the spoke connector that should be deployed on L2 for OptimismV0 network.
 * @dev OptimismV0 uses a pre-bedrock version of the optimism contracts.
 */
contract OptimismV0SpokeConnector is SpokeConnector, BaseOptimismV0 {
  // ============ Constructor ============
  constructor(
    ConstructorParams memory _baseSpokeParams,
    uint256 _gasCap // gasLimit of message call on L1
  ) SpokeConnector(_baseSpokeParams) BaseOptimismV0(_gasCap) {}

  // ============ Override Fns ============
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected);
  }

  /**
   * @notice Should not be able to renounce ownership
   */
  function renounceOwnership() public virtual override(SpokeConnector, ProposedOwnable) onlyOwner {
    require(false, "prohibited");
  }

  /**
   * @dev Sends `outboundRoot` to root manager on l1
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should always be sending the outbound root
    require(_data.length == 32, "!data length");
    OptimismAmb(AMB).sendMessage(mirrorConnector, _data, uint32(_getGasFromEncoded(_encodedData)));
  }

  /**
   * @dev Handles an incoming `aggregateRoot`
   * NOTE: Could store latest root sent and prove aggregate root
   */
  function _processMessage(bytes memory _data) internal override {
    // enforce this came from connector on l2
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // set the aggregate root
    receiveAggregateRoot(bytes32(_data));
  }
}

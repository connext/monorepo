// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {SpokeConnector, ProposedOwnable} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

import {BaseMultichain} from "./BaseMultichain.sol";

contract MultichainSpokeConnector is SpokeConnector, BaseMultichain {
  // ============ Constructor ============
  constructor(
    ConstructorParams memory _baseSpokeParams,
    uint256 _mirrorChainId,
    uint256 _gasCap
  ) SpokeConnector(_baseSpokeParams) BaseMultichain(_baseSpokeParams.amb, _mirrorChainId, _gasCap) {}

  // ============ Admin fns ============

  /**
   * @notice Should not be able to renounce ownership
   */
  function renounceOwnership() public virtual override(SpokeConnector, ProposedOwnable) onlyOwner {
    require(false, "prohibited");
  }

  // ============ Public fns ============
  /**
   * @notice Overrides `Connector.processMessage` to revert as multichain should
   * use `anyExecute` pathway instead.
   */
  function processMessage(bytes memory /*_data*/) external override {
    revert Connector__processMessage_notUsed();
  }

  // ============ Private fns ============
  /**
   * @dev Handles an incoming `aggregateRoot`
   * NOTE: Could store latest root sent and prove aggregate root
   */
  function _processMessage(bytes memory _data) internal override(Connector, BaseMultichain) {
    // enforce this came from connector on l1
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // sanity check: data length
    require(_data.length == 32, "!length");
    // set the aggregate root for BSC + access control
    receiveAggregateRoot(bytes32(_data));
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    _sendMessage(AMB, mirrorConnector, _data, _encodedData);
  }

  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected);
  }
}

// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {OptimismAmb} from "../../interfaces/ambs/optimism/OptimismAmb.sol";

import {SpokeConnector, ProposedOwnable} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

import {BaseOptimism} from "./BaseOptimism.sol";

contract OptimismSpokeConnector is SpokeConnector, BaseOptimism {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager,
    uint256 _gasCap // gasLimit of message call on L1
  )
    SpokeConnector(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    )
    BaseOptimism(_gasCap)
  {}

  // ============ Override Fns ============
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected);
  }

  /**
   * @notice Should not be able to renounce ownership
   */
  function renounceOwnership() public virtual override(SpokeConnector, ProposedOwnable) onlyOwner {}

  /**
   * @dev Sends `outboundRoot` to root manager on l1
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should always be sending the outbound root
    require(_data.length == 32, "!data length");
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    OptimismAmb(AMB).sendMessage(mirrorConnector, _calldata, uint32(_getGasFromEncoded(_encodedData)));
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

// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {SpokeConnector, ProposedOwnable} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

import {BaseAxelar} from "./BaseAxelar.sol";

contract AxelarSpokeConnector is SpokeConnector, BaseAxelar {
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
    uint256 _gasCap,
    address _gasReceiver,
    string memory _mirrorChainId
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
    BaseAxelar(_amb, _gasCap, _gasReceiver, _mirrorChainId)
  {}

  // ============ Admin fns ============

  /**
   * @notice Should not be able to renounce ownership
   */
  function renounceOwnership() public virtual override(SpokeConnector, ProposedOwnable) onlyOwner {}

  // ============ Private fns ============
  /**
   * @dev Handles an incoming `aggregateRoot`
   * NOTE: Could store latest root sent and prove aggregate root
   */
  function _processMessageFrom(address _sender, bytes memory _data) internal override(BaseAxelar) {
    // enforce this came from connector on l1
    require(_verifySender(_sender), "!mirrorConnector");

    // sanity check: data length
    require(_data.length == 32, "!length");

    // set the aggregate root for BSC + access control
    receiveAggregateRoot(bytes32(_data));

    emit MessageProcessed(_data, msg.sender);
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    _sendMessage(mirrorConnector, _data, _encodedData);
  }

  function _verifySender(address _expected) internal view override returns (bool) {
    return _expected == mirrorConnector;
  }
}

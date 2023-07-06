// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IWormholeReceiver} from "../../interfaces/ambs/wormhole/IWormholeReceiver.sol";

import {SpokeConnector, ProposedOwnable} from "../SpokeConnector.sol";

import {BaseWormhole} from "./BaseWormhole.sol";

contract WormholeSpokeConnector is SpokeConnector, BaseWormhole, IWormholeReceiver {
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
    uint16 _mirrorWormholeChainId
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
    BaseWormhole(_gasCap, _mirrorWormholeChainId)
  {}

  // ============ Admin fns ============

  /**
   * @notice Should not be able to renounce ownership
   */
  function renounceOwnership() public virtual override(SpokeConnector, ProposedOwnable) onlyOwner {
    revert("prohibited");
  }

  // ============ Override Fns ============
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(mirrorConnector, _expected);
  }

  // ============ Public fns ============
  /**
   * @notice This function is called to receive messages through the wormhole relayer module
   * https://book.wormhole.com/technical/evm/relayer.html
   * @dev This is defined here instead of the `BaseWormhole` to avoid storing AMB values twice.
   */
  function receiveWormholeMessages(
    bytes memory _payload,
    bytes[] memory, // additionalVaas,
    bytes32 _sourceAddress,
    uint16 _sourceChain,
    bytes32 _deliveryHash
  ) public payable override {
    _wormholeSanityChecks(_sourceChain, AMB, _deliveryHash);

    _processMessageFrom(_fromWormholeFormat(_sourceAddress), _payload);
  }

  // ============ Private fns ============
  /**
   * @dev Handles an incoming `aggregateRoot`
   * NOTE: Could store latest root sent and prove aggregate root
   */
  function _processMessageFrom(address _sender, bytes memory _data) internal override(BaseWormhole) {
    // enforce this came from connector on l1
    require(_verifySender(_sender), "!mirrorConnector");

    // sanity check: data length
    require(_data.length == 32, "!length");

    // set the aggregate root for BSC + access control
    receiveAggregateRoot(bytes32(_data));

    emit MessageProcessed(_data, msg.sender);
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    _sendMessage(AMB, mirrorConnector, _data, _encodedData);
  }
}

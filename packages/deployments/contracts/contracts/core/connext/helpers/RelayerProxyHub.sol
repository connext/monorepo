// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {GelatoRelayFeeCollector} from "@gelatonetwork/relay-context/contracts/GelatoRelayFeeCollector.sol";

import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";
import {IRootManager} from "../../../messaging/interfaces/IRootManager.sol";
import {RelayerProxy} from "./RelayerProxy.sol";

contract RelayerProxyHub is RelayerProxy {
  // ============ Properties ============

  IRootManager public rootManager;

  // ============ Events ============
  event RootManagerChanged(address rootManager, address oldRootManager);

  // ============ Constructor ============

  /**
   * @notice Creates a new RootManagerPropagateWrapper instance.
   * @param _rootManager The address of the RootManager on this domain.
   */
  constructor(
    address _connext,
    address _spokeConnector,
    address _gelatoRelayer,
    address _feeCollector,
    address _rootManager
  ) RelayerProxy(_connext, _spokeConnector, _gelatoRelayer, _feeCollector) {
    _setRootManager(_rootManager);
  }

  // ============ Admin Functions ============

  function setRootManager(address _rootManager) external onlyOwner definedAddress(_rootManager) {
    _setRootManager(_rootManager);
  }

  // ============ External Functions ============

  function propagate(
    address[] calldata _connectors,
    uint256[] calldata _messageFees,
    bytes[] memory _encodedData,
    uint256 _relayerFee
  ) external {
    uint256 sum = 0;
    uint256 length = _connectors.length;
    for (uint32 i; i < length; ) {
      sum += _messageFees[i];
      unchecked {
        ++i;
      }
    }

    rootManager.propagate{value: sum}(_connectors, _messageFees, _encodedData);
    emit FundsDeducted(sum, address(this).balance);
    transferRelayerFee(_relayerFee);
  }

  // ============ Internal Functions ============
  function _setRootManager(address _rootManager) internal {
    emit RootManagerChanged(_rootManager, address(rootManager));
    rootManager = IRootManager(_rootManager);
  }
}

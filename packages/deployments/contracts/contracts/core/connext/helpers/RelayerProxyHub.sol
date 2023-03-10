// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {GelatoRelayFeeCollector} from "@gelatonetwork/relay-context/contracts/GelatoRelayFeeCollector.sol";

import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";
import {IRootManager} from "../../../messaging/interfaces/IRootManager.sol";
import {RelayerProxy} from "./RelayerProxy.sol";

/**
 * @title RelayerProxyHub
 * @author Connext Labs, Inc.
 * @notice This is a temporary contract that wraps the Connext RootManager's propagate() function so that it can be called by
 * Gelato's legacy relayer network. The contract stores native assets and pays them to the relayer on function call.
 */
contract RelayerProxyHub is RelayerProxy {
  // ============ Properties ============

  IRootManager public rootManager;
  uint256 public propagateCooldown;
  // Timestamp of the last time the job was worked.
  uint256 public lastPropagateAt;

  // ============ Events ============
  event RootManagerChanged(address rootManager, address oldRootManager);
  event PropagateCooldownChanged(uint256 propagateCooldown, uint256 oldPropagateCooldown);

  // ============ Constructor ============

  /**
   * @notice Creates a new RelayerProxyHub instance.
   * @param _connext The address of the Connext on this domain.
   * @param _spokeConnector The address of the SpokeConnector on this domain.
   * @param _gelatoRelayer The address of the Gelato relayer on this domain.
   * @param _feeCollector The address of the Gelato Fee Collector on this domain.
   * @param _rootManager The address of the Root Manager on this domain.
   */
  constructor(
    address _connext,
    address _spokeConnector,
    address _gelatoRelayer,
    address _feeCollector,
    address _rootManager,
    address _keep3r,
    uint256 _propagateCooldown
  ) RelayerProxy(_connext, _spokeConnector, _gelatoRelayer, _feeCollector, _keep3r) {
    _setRootManager(_rootManager);
    _setPropagateCooldown(_propagateCooldown);
  }

  // ============ Admin Functions ============

  /**
   * @notice Updates the RootManager address.
   * @param _rootManager The address of the new RootManager on this domain.
   */
  function setRootManager(address _rootManager) external onlyOwner definedAddress(_rootManager) {
    _setRootManager(_rootManager);
  }

  function setPropagateCooldown(uint256 _propagateCooldown) external onlyOwner {
    _setPropagateCooldown(_propagateCooldown);
  }

  // ============ External Functions ============

  /**
   * @notice Wraps the call to propagate() on RootManager and pays either the caller or hardcoded relayer
   * from this contract's balance for completing the transaction.
   *
   * @param _connectors Array of connectors: should match exactly the array of `connectors` in storage;
   * used here to reduce gas costs, and keep them static regardless of number of supported domains.
   * @param _messageFees Array of fees in native token for an AMB if required
   * @param _encodedData Array of encodedData: extra params for each AMB if required
   * @param _relayerFee Fee to be paid to relayer
   */
  function propagate(
    address[] calldata _connectors,
    uint256[] calldata _messageFees,
    bytes[] memory _encodedData,
    uint256 _relayerFee
  ) external onlyRelayer nonReentrant {
    uint256 sum = _propagate(_connectors, _messageFees, _encodedData);
    emit FundsDeducted(sum, address(this).balance);
    transferRelayerFee(_relayerFee);
  }

  // Returns a boolean that indicates if a job is workable or not.
  function propagateWorkable() public view returns (bool _isWorkable) {
    return block.timestamp > (lastPropagateAt + propagateCooldown);
  }

  function propagateKeep3r(
    address[] calldata _connectors,
    uint256[] calldata _messageFees,
    bytes[] memory _encodedData
  ) external validateAndPayWithCredits(msg.sender) nonReentrant {
    require(propagateWorkable(), "Job is not workable");
    _propagate(_connectors, _messageFees, _encodedData);
    lastPropagateAt = block.timestamp;
  }

  // ============ Internal Functions ============
  function _setRootManager(address _rootManager) internal {
    emit RootManagerChanged(_rootManager, address(rootManager));
    rootManager = IRootManager(_rootManager);
  }

  function _setPropagateCooldown(uint256 _propagateCooldown) internal {
    emit PropagateCooldownChanged(_propagateCooldown, propagateCooldown);
    propagateCooldown = _propagateCooldown;
  }

  function _propagate(
    address[] calldata _connectors,
    uint256[] calldata _messageFees,
    bytes[] memory _encodedData
  ) internal returns (uint256) {
    uint256 sum = 0;
    uint256 length = _connectors.length;
    for (uint32 i; i < length; ) {
      sum += _messageFees[i];
      unchecked {
        ++i;
      }
    }

    rootManager.propagate{value: sum}(_connectors, _messageFees, _encodedData);
    return sum;
  }
}

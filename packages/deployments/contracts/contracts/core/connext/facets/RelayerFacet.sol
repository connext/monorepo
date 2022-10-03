// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

contract RelayerFacet is BaseConnextFacet {
  // ========== Custom Errors ===========
  error RelayerFacet__setRelayerFeeVault_invalidRelayerFeeVault();
  error RelayerFacet__addRelayer_alreadyApproved();
  error RelayerFacet__removeRelayer_notApproved();
  error RelayerFacet__initiateClaim_emptyClaim();
  error RelayerFacet__initiateClaim_notRelayer(bytes32 transferId);

  // ========== Events ===========
  /**
   * @notice Emitted when the relayerFeeVault variable is updated
   * @param oldVault - The relayerFeeVault old value
   * @param newVault - The relayerFeeVault new value
   * @param caller - The account that called the function
   */
  event RelayerFeeVaultUpdated(address oldVault, address newVault, address caller);

  /**
   * @notice Emitted when a relayer is added or removed from whitelists
   * @param relayer - The relayer address to be added or removed
   * @param caller - The account that called the function
   */
  event RelayerAdded(address relayer, address caller);

  /**
   * @notice Emitted when a relayer is added or removed from whitelists
   * @param relayer - The relayer address to be added or removed
   * @param caller - The account that called the function
   */
  event RelayerRemoved(address relayer, address caller);

  /**
   * @notice Emitted when `initiateClaim` is called on the destination chain
   * @param domain - Domain to claim funds on
   * @param recipient - Address on origin chain to send claimed funds to
   * @param caller - The account that called the function
   * @param transferIds - TransferIds to claim
   */
  event InitiatedClaim(uint32 indexed domain, address indexed recipient, address caller, bytes32[] transferIds);

  /**
   * @notice Emitted when `claim` is called on the origin domain
   * @param recipient - Address on origin chain to send claimed funds to
   * @param total - Total amount claimed
   * @param transferIds - TransferIds to claim
   */
  event Claimed(address indexed recipient, uint256 total, bytes32[] transferIds);

  // ============ Modifiers ============

  // ============ Getters ============

  function transferRelayer(bytes32 _transferId) public view returns (address) {
    return s.transferRelayer[_transferId];
  }

  function approvedRelayers(address _relayer) public view returns (bool) {
    return s.approvedRelayers[_relayer];
  }

  function relayerFeeVault() external view returns (address) {
    return s.relayerFeeVault;
  }

  // ============ Admin functions ============

  /**
   * @notice Updates the relayer fee router
   * @param _relayerFeeVault The address of the new router
   */
  function setRelayerFeeVault(address _relayerFeeVault) external onlyOwner {
    address old = address(s.relayerFeeVault);
    if (old == _relayerFeeVault) revert RelayerFacet__setRelayerFeeVault_invalidRelayerFeeVault();

    s.relayerFeeVault = _relayerFeeVault;
    emit RelayerFeeVaultUpdated(old, _relayerFeeVault, msg.sender);
  }

  /**
   * @notice Used to add approved relayer
   * @param _relayer - The relayer address to add
   */
  function addRelayer(address _relayer) external onlyOwner {
    if (s.approvedRelayers[_relayer]) revert RelayerFacet__addRelayer_alreadyApproved();
    s.approvedRelayers[_relayer] = true;

    emit RelayerAdded(_relayer, msg.sender);
  }

  /**
   * @notice Used to remove approved relayer
   * @param _relayer - The relayer address to remove
   */
  function removeRelayer(address _relayer) external onlyOwner {
    if (!s.approvedRelayers[_relayer]) revert RelayerFacet__removeRelayer_notApproved();
    delete s.approvedRelayers[_relayer];

    emit RelayerRemoved(_relayer, msg.sender);
  }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

contract RelayerFacet is BaseConnextFacet {
  // ========== Custom Errors ===========
  error RelayerFacet__setRelayerFeeVault_invalidRelayerFeeVault();
  error RelayerFacet__addRelayer_alreadyApproved();
  error RelayerFacet__removeRelayer_notApproved();

  // ========== Events ===========
  /**
   * @notice Emitted when the relayerFeeVault variable is updated
   * @param oldVault - The relayerFeeVault old value
   * @param newVault - The relayerFeeVault new value
   * @param caller - The account that called the function
   */
  event RelayerFeeVaultUpdated(address oldVault, address newVault, address caller);

  /**
   * @notice Emitted when a relayer is added or removed from allowlists
   * @param relayer - The relayer address to be added or removed
   * @param caller - The account that called the function
   */
  event RelayerAdded(address relayer, address caller);

  /**
   * @notice Emitted when a relayer is added or removed from allowlists
   * @param relayer - The relayer address to be added or removed
   * @param caller - The account that called the function
   */
  event RelayerRemoved(address relayer, address caller);

  // ============ Modifiers ============

  // ============ Getters ============

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
  function setRelayerFeeVault(address _relayerFeeVault) external onlyOwnerOrAdmin {
    address old = address(s.relayerFeeVault);
    if (old == _relayerFeeVault) revert RelayerFacet__setRelayerFeeVault_invalidRelayerFeeVault();

    s.relayerFeeVault = _relayerFeeVault;
    emit RelayerFeeVaultUpdated(old, _relayerFeeVault, msg.sender);
  }

  /**
   * @notice Used to add approved relayer
   * @param _relayer - The relayer address to add
   */
  function addRelayer(address _relayer) external onlyOwnerOrAdmin {
    if (s.approvedRelayers[_relayer]) revert RelayerFacet__addRelayer_alreadyApproved();
    s.approvedRelayers[_relayer] = true;

    emit RelayerAdded(_relayer, msg.sender);
  }

  /**
   * @notice Used to remove approved relayer
   * @param _relayer - The relayer address to remove
   */
  function removeRelayer(address _relayer) external onlyOwnerOrAdmin {
    if (!s.approvedRelayers[_relayer]) revert RelayerFacet__removeRelayer_notApproved();
    delete s.approvedRelayers[_relayer];

    emit RelayerRemoved(_relayer, msg.sender);
  }
}

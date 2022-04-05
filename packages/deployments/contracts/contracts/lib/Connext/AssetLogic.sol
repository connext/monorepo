// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../../interfaces/IWrapped.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

library AssetLogic {
  error AssetLogic__transferAssetToContract_notAmount();
  error AssetLogic__transferAssetToContract_ethWithErcTransfer();
  error AssetLogic__transferAssetFromContract_notNative();

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev If using the native asset, will automatically wrap
   * @param _assetId - The address to transfer
   * @param _specifiedAmount - The specified amount to transfer. May not be the
   * actual amount transferred (i.e. fee on transfer tokens)
   * @param _wrapper - The address of the wrapper for the native asset on this domain
   * @return The assetId of the transferred asset
   * @return The amount of the asset that was seen by the contract (may not be the specifiedAmount
   * if the token is a fee-on-transfer token)
   */
  function transferAssetToContract(
    address _assetId,
    uint256 _specifiedAmount,
    IWrapped _wrapper
  ) external returns (address, uint256) {
    uint256 trueAmount = _specifiedAmount;

    if (_assetId == address(0)) {
      // When transferring native asset to the contract, always make sure that the
      // asset is properly wrapped
      if (msg.value != _specifiedAmount) revert AssetLogic__transferAssetToContract_notAmount();
      _wrapper.deposit{value: _specifiedAmount}();
      _assetId = address(_wrapper);
    } else {
      // Validate correct amounts are transferred
      uint256 starting = IERC20Upgradeable(_assetId).balanceOf(address(this));
      if (msg.value != 0) revert AssetLogic__transferAssetToContract_ethWithErcTransfer();
      SafeERC20Upgradeable.safeTransferFrom(IERC20Upgradeable(_assetId), msg.sender, address(this), _specifiedAmount);
      // Calculate the *actual* amount that was sent here
      trueAmount = IERC20Upgradeable(_assetId).balanceOf(address(this)) - starting;
    }

    return (_assetId, trueAmount);
  }

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev If using the native asset, will automatically unwrap
   * @param _assetId - The address to transfer
   * @param _to - The account that will receive the withdrawn funds
   * @param _amount - The amount to withdraw from contract
   * @param _wrapper - The address of the wrapper for the native asset on this domain
   */
  function transferAssetFromContract(
    address _assetId,
    address _to,
    uint256 _amount,
    IWrapped _wrapper
  ) internal {
    // No native assets should ever be stored on this contract
    if (_assetId == address(0)) revert AssetLogic__transferAssetFromContract_notNative();

    if (_assetId == address(_wrapper)) {
      // If dealing with wrapped assets, make sure they are properly unwrapped
      // before sending from contract
      _wrapper.withdraw(_amount);
      AddressUpgradeable.sendValue(payable(_to), _amount);
    } else {
      // Transfer ERC20 asset
      SafeERC20Upgradeable.safeTransfer(IERC20Upgradeable(_assetId), _to, _amount);
    }
  }
}

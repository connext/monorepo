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
   * @param _assetAmount - The specified amount to transfer. May not be the
   * actual amount transferred (i.e. fee on transfer tokens)
   * @param _fee - The fee amount in native asset included as part of the transaction that
   * should not be considered for the transfer amount.
   * @param _wrapper - The address of the wrapper for the native asset on this domain
   * @return The assetId of the transferred asset
   * @return The amount of the asset that was seen by the contract (may not be the specifiedAmount
   * if the token is a fee-on-transfer token)
   */
  function handleIncomingAsset(
    address _assetId,
    uint256 _assetAmount,
    uint256 _fee,
    IWrapped _wrapper
  ) external returns (address, uint256) {
    uint256 trueAmount = _assetAmount;

    if (_assetId == address(0)) {
      if (msg.value != _assetAmount + _fee) revert AssetLogic__transferAssetToContract_notAmount();

      // When transferring native asset to the contract, always make sure that the
      // asset is properly wrapped
      wrapNativeAsset(_assetAmount, _wrapper);
      _assetId = address(_wrapper);
    } else {
      if (msg.value != _fee) revert AssetLogic__transferAssetToContract_ethWithErcTransfer();

      // Transfer asset to contract
      trueAmount = transferAssetToContract(_assetId, _assetAmount);
    }

    return (_assetId, trueAmount);
  }

  /**
   * @notice Wrap the native asset
   * @param _amount - The specified amount to wrap
   * @param _wrapper - The address of the wrapper for the native asset on this domain
   */
  function wrapNativeAsset(uint256 _amount, IWrapped _wrapper) internal {
    _wrapper.deposit{value: _amount}();
  }

  /**
   * @notice Transfer asset funds from msg.sender to the Connext contract.
   * @param _assetId - The address to transfer
   * @param _amount - The specified amount to transfer
   * @return The amount of the asset that was seen by the contract
   */
  function transferAssetToContract(address _assetId, uint256 _amount) internal returns (uint256) {
    // Validate correct amounts are transferred
    uint256 starting = IERC20Upgradeable(_assetId).balanceOf(address(this));

    SafeERC20Upgradeable.safeTransferFrom(IERC20Upgradeable(_assetId), msg.sender, address(this), _amount);
    // Calculate the *actual* amount that was sent here
    return IERC20Upgradeable(_assetId).balanceOf(address(this)) - starting;
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
  ) external {
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

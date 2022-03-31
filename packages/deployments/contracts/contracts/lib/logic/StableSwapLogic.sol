// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../../interfaces/IStableSwap.sol";

import "../../nomad-xapps/contracts/bridge/TokenRegistry.sol";
import "../../nomad-xapps/contracts/bridge/BridgeMessage.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

library StableSwapLogic {

  /**
   * @notice Swaps an adopted asset to the local (representation or canonical) nomad asset
   * @dev Will not swap if the asset passed in is the local asset
   * @param _asset - The address of the adopted asset to swap into the local asset
   * @param _amount - The amount of the adopted asset to swap
   * @return The amount of local asset received from swap
   * @return The address of asset received post-swap
   */
  function swapToLocalAssetIfNeeded(
    BridgeMessage.TokenId memory canonical,
    IStableSwap pool,
    TokenRegistry tokenRegistry,
    address _asset,
    uint256 _amount
  ) external returns (uint256, address) {
    // Check to see if the asset must be swapped because it is not the local asset
    // BridgeMessage.TokenId memory canonical = adoptedToCanonical[_asset];
    if (canonical.id == bytes32(0)) {
      // This is *not* the adopted asset, meaning it must be the local asset
      return (_amount, _asset);
    }

    // Get the local token for this domain (may return canonical or representation)
    address local = tokenRegistry.getLocalAddress(canonical.domain, canonical.id);

    // Check the case where the adopted asset *is* the local asset
    if (local == _asset) {
      // No need to swap
      return (_amount, _asset);
    }

    // Approve pool
    // IStableSwap pool = adoptedToLocalPools[canonical.id];
    SafeERC20Upgradeable.safeApprove(IERC20Upgradeable(_asset), address(pool), _amount);

    // Swap the asset to the proper local asset
    return (pool.swapExact(_amount, _asset, local), local);
  }
}

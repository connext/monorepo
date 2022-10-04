// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20Extended is IERC20Metadata {
  /**
   * @dev Returns the bep token owner.
   */
  function getOwner() external view returns (address);
}

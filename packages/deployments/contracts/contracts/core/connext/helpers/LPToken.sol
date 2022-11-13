// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * @title Liquidity Provider Token
 * @notice This token is an ERC20 detailed token with added capability to be minted by the owner.
 * It is used to represent user's shares when providing liquidity to swap contracts.
 * @dev Only Swap contracts should initialize and own LPToken contracts.
 */
contract LPToken is ERC20Upgradeable, OwnableUpgradeable {
  // ============ Storage ============

  // ============ Initializer ============

  /**
   * @notice Initializes this LPToken contract with the given name and symbol
   * @dev The caller of this function will become the owner. A Swap contract should call this
   * in its initializer function.
   * @param name name of this token
   * @param symbol symbol of this token
   */
  function initialize(string memory name, string memory symbol) external initializer returns (bool) {
    __Context_init_unchained();
    __ERC20_init_unchained(name, symbol);
    __Ownable_init_unchained();
    return true;
  }

  // ============ External functions ============

  /**
   * @notice Mints the given amount of LPToken to the recipient.
   * @dev only owner can call this mint function
   * @param recipient address of account to receive the tokens
   * @param amount amount of tokens to mint
   */
  function mint(address recipient, uint256 amount) external onlyOwner {
    require(amount != 0, "LPToken: cannot mint 0");
    _mint(recipient, amount);
  }

  /**
   * @notice Burns the given amount of LPToken from provided account
   * @dev only owner can call this burn function
   * @param account address of account from which to burn token
   * @param amount amount of tokens to mint
   */
  function burnFrom(address account, uint256 amount) external onlyOwner {
    require(amount != 0, "LPToken: cannot burn 0");
    _burn(account, amount);
  }

  // ============ Internal functions ============

  /**
   * @dev Overrides ERC20._beforeTokenTransfer() which get called on every transfers including
   * minting and burning. This ensures that Swap.updateUserWithdrawFees are called everytime.
   * This assumes the owner is set to a Swap contract's address.
   */
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override(ERC20Upgradeable) {
    super._beforeTokenTransfer(from, to, amount);
    require(to != address(this), "LPToken: cannot send to itself");
  }

  // ============ Upgrade Gap ============
  uint256[50] private __GAP; // gap for upgrade safety
}

// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {IBridgeToken} from "../interfaces/IBridgeToken.sol";

import {ERC20} from "./OZERC20.sol";

contract BridgeToken is IBridgeToken, Ownable, ERC20 {
  // ============ Constructor ============
  constructor(
    uint8 decimals_,
    string memory name_,
    string memory symbol_
  ) Ownable() ERC20(decimals_, name_, symbol_, "1") {}

  // ============ Events ============

  event UpdateDetails(string indexed name, string indexed symbol);

  // ============ Admin Functions ============

  /**
   * @notice Destroys `_amnt` tokens from `_from`, reducing the
   * total supply.
   * @dev Emits a {Transfer} event with `to` set to the zero address.
   * Requirements:
   * - `_from` cannot be the zero address.
   * - `_from` must have at least `_amnt` tokens.
   * @param _from The address from which to destroy the tokens
   * @param _amnt The amount of tokens to be destroyed
   */
  function burn(address _from, uint256 _amnt) external override onlyOwner {
    _burn(_from, _amnt);
  }

  /** @notice Creates `_amnt` tokens and assigns them to `_to`, increasing
   * the total supply.
   * @dev Emits a {Transfer} event with `from` set to the zero address.
   * Requirements:
   * - `to` cannot be the zero address.
   * @param _to The destination address
   * @param _amnt The amount of tokens to be minted
   */
  function mint(address _to, uint256 _amnt) external override onlyOwner {
    _mint(_to, _amnt);
  }

  /**
   * @notice Set the details of a token
   * @param _newName The new name
   * @param _newSymbol The new symbol
   */
  function setDetails(string calldata _newName, string calldata _newSymbol) external override onlyOwner {
    // careful with naming convention change here
    _name = _newName;
    _symbol = _newSymbol;
    bytes32 hashedName = keccak256(bytes(_newName));
    _HASHED_NAME = hashedName;
    _CACHED_DOMAIN_SEPARATOR = _buildDomainSeparator(_TYPE_HASH, hashedName, _HASHED_VERSION);
    emit UpdateDetails(_newName, _newSymbol);
  }
}

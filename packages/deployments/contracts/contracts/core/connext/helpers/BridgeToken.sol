// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import {TypeCasts} from "../../../shared/libraries/TypeCasts.sol";
import {IBridgeToken} from "../interfaces/IBridgeToken.sol";
import {BridgeMessage} from "../libraries/BridgeMessage.sol";

import {ERC20} from "./OZERC20.sol";

contract BridgeToken is IBridgeToken, OwnableUpgradeable, ERC20 {
  /// @dev hash commitment to the name/symbol/decimals
  bytes32 public override detailsHash;

  // ============ Upgrade Gap ============

  uint256[48] private __GAP; // gap for upgrade safety

  // ============ Initializer ============

  function initialize() public override initializer {
    __Ownable_init();
    __ERC20_init(token.name, "1");
  }

  // ============ Events ============

  event UpdateDetails(string indexed name, string indexed symbol, uint8 indexed decimals);

  // ============ External Functions ============

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

  /** @notice allows the owner to set the details hash commitment.
   * @param _detailsHash the new details hash.
   */
  function setDetailsHash(bytes32 _detailsHash) external override onlyOwner {
    if (detailsHash != _detailsHash) {
      detailsHash = _detailsHash;
    }
  }

  /**
   * @notice Set the details of a token
   * @param _newName The new name
   * @param _newSymbol The new symbol
   */
  function setDetails(string calldata _newName, string calldata _newSymbol, uint8 _newDecimals) external override {
    bool _isFirstDetails = bytes(token.name).length == 0;
    // 0 case is the initial deploy. We allow the deploying registry to set
    // these once. After the first transfer is made, detailsHash will be
    // set, allowing anyone to supply correct name/symbols/decimals
    require(_isFirstDetails || BridgeMessage.getDetailsHash(_newName, _newSymbol, _newDecimals) == detailsHash, "!committed details");
    // careful with naming convention change here
    token.name = _newName;
    token.symbol = _newSymbol;
    if (!_isFirstDetails) {
      emit UpdateDetails(_newName, _newSymbol, 18);
    }
  }

  // ============ Public Functions ============

  /**
   * @dev See {IERC20-balanceOf}.
   */
  function balanceOf(address _account) public view override(IBridgeToken, ERC20) returns (uint256) {
    return ERC20.balanceOf(_account);
  }

  /**
   * @dev Returns the name of the token.
   */
  function name() public view override returns (string memory) {
    return token.name;
  }

  /**
   * @dev Returns the symbol of the token, usually a shorter version of the
   * name.
   */
  function symbol() public view override returns (string memory) {
    return token.symbol;
  }

  /**
   * @dev Returns the number of decimals used to get its user representation.
   * For example, if `decimals` equals `2`, a balance of `505` tokens should
   * be displayed to a user as `5,05` (`505 / 10 ** 2`).
   * Tokens usually opt for a value of 18, imitating the relationship between
   * Ether and Wei. This is the value {ERC20} uses, unless {_setupDecimals} is
   * called.
   * NOTE: This information is only used for _display_ purposes: it in
   * no way affects any of the arithmetic of the contract, including
   * {IERC20-balanceOf} and {IERC20-transfer}.
   */
  function decimals() public view override returns (uint8) {
    return token.decimals;
  }

  // required for solidity inheritance
  function transferOwnership(address _newOwner) public override(IBridgeToken, OwnableUpgradeable) onlyOwner {
    OwnableUpgradeable.transferOwnership(_newOwner);
  }
}

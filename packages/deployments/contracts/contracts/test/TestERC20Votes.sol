// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {ERC20Votes, ERC20, ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import {IERC20Metadata, IERC20} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

import {IBridgeToken} from "../core/connext/interfaces/IBridgeToken.sol";

/**
 * @notice This token is ONLY useful for testing
 * @dev Anybody can mint as many tokens as they like
 * @dev Anybody can burn anyone else's tokens
 */
contract TestERC20Votes is ERC20Votes, IBridgeToken {
  string private _name;
  string private _symbol;

  constructor(string memory name_, string memory _symbol_) ERC20(name_, _symbol_) ERC20Votes() ERC20Permit(name_) {
    _name = name_;
    _symbol = _symbol_;
    _mint(msg.sender, 1000000 ether);
  }

  // ============ Bridge functions ===============
  function setDetails(string calldata _newName, string calldata _newSymbol) external override {
    // Does nothing, in practice will update the details to match the hash in message
    // not the autodeployed results
    _name = _newName;
    _symbol = _newSymbol;
  }

  // ============ Token functions ===============
  function balanceOf(address account) public view override(ERC20, IERC20) returns (uint256) {
    return ERC20.balanceOf(account);
  }

  function mint(address account, uint256 amount) external {
    _mint(account, amount);
  }

  function burn(address account, uint256 amount) external {
    _burn(account, amount);
  }

  function symbol() public view override(ERC20, IERC20Metadata) returns (string memory) {
    return _symbol;
  }

  function name() public view override(ERC20, IERC20Metadata) returns (string memory) {
    return _name;
  }

  function decimals() public view override(ERC20, IERC20Metadata) returns (uint8) {
    return ERC20.decimals();
  }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../interfaces/IERC20Minimal.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/* This token is ONLY useful for testing
 * Anybody can mint as many tokens as they like
 * Anybody can burn anyone else's tokens
 */
contract RevertableERC20 is ERC20 {
  bool public shouldRevert = false;

  constructor() ERC20("Revertable Token", "RVRT") {
    _mint(msg.sender, 1000000 ether);
  }

  function mint(address account, uint256 amount) external {
    require(!shouldRevert, "mint: SHOULD_REVERT");
    _mint(account, amount);
  }

  function burn(address account, uint256 amount) external {
    require(!shouldRevert, "burn: SHOULD_REVERT");
    _burn(account, amount);
  }

  function transfer(address account, uint256 amount) public override returns (bool) {
    require(!shouldRevert, "transfer: SHOULD_REVERT");
    _transfer(msg.sender, account, amount);
    return true;
  }

  function balanceOf(address account) public view override returns (uint256) {
    require(!shouldRevert, "balanceOf: SHOULD_REVERT");
    return super.balanceOf(account);
  }

  function setShouldRevert(bool _shouldRevert) external {
    shouldRevert = _shouldRevert;
  }
}

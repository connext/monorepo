// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../interfaces/IERC20Minimal.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/* This token is ONLY useful for testing
 * Anybody can mint as many tokens as they like
 * Anybody can burn anyone else's tokens
 */
contract FeeERC20 is ERC20 {
  uint256 public fee = 1;

  constructor() ERC20("Fee Token", "FEERC20") {
    _mint(msg.sender, 1000000 ether);
  }

  function setFee(uint256 _fee) external {
    fee = _fee;
  }

  function mint(address account, uint256 amount) external {
    _mint(account, amount);
  }

  function burn(address account, uint256 amount) external {
    _burn(account, amount);
  }

  function transfer(address account, uint256 amount) public override returns (bool) {
    uint256 toTransfer = amount - fee;
    _transfer(msg.sender, account, toTransfer);
    return true;
  }

  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) public override returns (bool) {
    uint256 toTransfer = amount - fee;
    _burn(sender, fee);
    _transfer(sender, recipient, toTransfer);
    return true;
  }
}

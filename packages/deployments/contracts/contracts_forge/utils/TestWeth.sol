// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {TestERC20} from "../../contracts/test/TestERC20.sol";

/* This token is ONLY useful for testing
 * Anybody can mint as many tokens as they like
 * Anybody can burn anyone else's tokens
 */
contract WETH is TestERC20 {
  constructor() TestERC20("Wrapped Ether", "WETH") {}

  receive() external payable {}

  event Deposit(address indexed dst, uint256 wad);
  event Withdrawal(address indexed src, uint256 wad);

  function deposit() public payable {
    _mint(msg.sender, msg.value);
    emit Deposit(msg.sender, msg.value);
  }

  function withdraw(uint256 wad) public {
    require(balanceOf(msg.sender) >= wad);
    _burn(msg.sender, wad);
    Address.sendValue(payable(msg.sender), wad);
    emit Withdrawal(msg.sender, wad);
  }
}

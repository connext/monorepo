// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

interface IBridgeToken is IERC20Metadata {
  function burn(address _from, uint256 _amnt) external;

  function mint(address _to, uint256 _amnt) external;

  function setDetails(string calldata _name, string calldata _symbol) external;
}

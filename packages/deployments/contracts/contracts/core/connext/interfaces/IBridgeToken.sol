// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

interface IBridgeToken {
  function initialize(
    uint8 _decimals,
    string memory _name,
    string memory _symbol
  ) external;

  function name() external returns (string memory);

  function balanceOf(address _account) external view returns (uint256);

  function symbol() external view returns (string memory);

  function decimals() external view returns (uint8);

  function detailsHash() external view returns (bytes32);

  function burn(address _from, uint256 _amnt) external;

  function mint(address _to, uint256 _amnt) external;

  function setDetailsHash(bytes32 _detailsHash) external;

  function setDetails(string calldata _name, string calldata _symbol) external;

  // inherited from ownable
  function transferOwnership(address _newOwner) external;
}

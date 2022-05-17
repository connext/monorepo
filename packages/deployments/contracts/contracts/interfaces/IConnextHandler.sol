// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

interface IConnextHandler {
  function initiateClaim(
    uint32 _domain,
    address _recipient,
    bytes32[] calldata _transferIds
  ) external;

  function claim(address _recipient, bytes32[] calldata _transferIds) external;
}

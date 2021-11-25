// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IRouterFactory {
  event RouterCreated(address router);

  function createRouter(address router, address recipient) external returns (address);
}

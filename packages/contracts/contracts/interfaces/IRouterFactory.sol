// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IRouterFactory {
  event RouterCreated(address router, address signer, address receipient, address creater);

  function createRouter(address router, address recipient) external returns (address);
}

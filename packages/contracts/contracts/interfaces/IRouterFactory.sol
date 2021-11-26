// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IRouterFactory {
  event RouterCreated(address router, address routerSigner, address recipient, address transactionManager);

  function createRouter(address router, address recipient) external returns (address);
}

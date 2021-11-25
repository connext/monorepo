// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./interfaces/IRouterFactory.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ITransactionManager.sol";
import "./Router.sol";

contract RouterFactory is IRouterFactory, Ownable {

  /**
  * @dev The stored chain id of the contract, may be passed in to avoid any 
  *      evm issues
  */
  uint256 private immutable chainId;

    /**
    * @dev The transaction Manager contract
    */
  ITransactionManager public transactionManager;

   /**
    * @dev Mapping of signer to created Router contract address
    */
  mapping(address => address) public routerAddresses;

  constructor(address _transactionManager, uint256 _chainId) {
    chainId = _chainId;
    transactionManager = ITransactionManager(_transactionManager);
  }

  function setTransactionManager(address _transactionManager) external onlyOwner {
    transactionManager = ITransactionManager(_transactionManager);
  }

  function createRouter(address signer, address recipient) override external returns (address) {
    Router router = new Router(address(transactionManager), signer, recipient, msg.sender, chainId);

    routerAddresses[signer] = address(router);
    emit RouterCreated(address(router), signer, recipient, msg.sender);
    return address(router);
  }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-deploy/DeployScript.sol";
import "../deployer/DeployerFunctions.g.sol";

contract Deployments is DeployScript {
  using DeployerFunctions for Deployer;

  function deploy() external returns (TestERC20) {
    return deployer.deploy_TestERC20("TestERC20", "Test", "Test");
  }
}

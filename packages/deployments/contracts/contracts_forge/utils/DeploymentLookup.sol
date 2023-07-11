// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {RpcLookup} from "./RpcLookup.sol";
import {ForgeHelper} from "./ForgeHelper.sol";

import "forge-std/console.sol";
import "forge-std/StdJson.sol";
import "forge-std/Vm.sol";

contract DeploymentLookup is ForgeHelper {
  // ============ Libraries ============
  using stdJson for string;
  using Strings for string;
  using Strings for uint256;

  /**
   * @notice Looks up the deployment of a given contract by name
   * @param _chainId The chain id to lookup
   * @param _deploymentName The name of the deployment to lookup
   */
  function getAddress(uint256 _chainId, string memory _deploymentName) public returns (address) {
    // load the deployment artifact
    string memory path = getPath(_chainId, _deploymentName);
    string memory json = vm.readFile(path);

    // parse the address
    address deployed = json.readAddress(".address");
    return deployed;
  }

  /**
   * @notice Returns the path to the deployment file
   * @param _chainId The chain id to lookup
   * @param _deploymentName The name of the deployment to lookup
   */
  function getPath(uint256 _chainId, string memory _deploymentName) public view returns (string memory) {
    string memory root = vm.projectRoot();
    return string.concat(root, "/deployments/", RpcLookup.getNetworkName(_chainId), "/", _deploymentName, ".json");
  }
}

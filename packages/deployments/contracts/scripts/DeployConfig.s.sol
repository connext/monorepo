// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script} from "forge-std/Script.sol";
import {console2 as console} from "forge-std/console2.sol";
import {stdJson} from "forge-std/StdJson.sol";
import {Executables} from "./Executables.sol";

/// @title DeployConfig
/// @notice Represents the configuration required to deploy the system. It is expected
///         to read the file from JSON. A future improvement would be to have fallback
///         values if they are not defined in the JSON themselves.
contract DeployConfig is Script {
  string internal _json;
  string internal _messagingJson;

  struct ProtocolConfig {
    uint256 delayBlocks;
    address hubAmb;
    string prefix;
    uint256 processGas;
    uint256 reserveGas;
    address spokeAmb;
  }

  uint256 public domain;
  uint256 public hubChainId;
  uint256 public chainsLength;
  uint256[] public chains;

  mapping(uint256 => ProtocolConfig) internal _protocolConfigs;

  constructor(string memory _path) {
    console.log("DeployConfig: reading file %s", _path);
    // try vm.readFile(_path) returns (string memory data) {
    //   _json = data;
    // } catch {
    //   console.log("Warning: unable to read config. Do not deploy unless you are not using config.");
    //   return;
    // }

    // domain = stdJson.readUint(_json, "$.domain");

    // // Read messaging config
    // try vm.readFile(string.concat(vm.projectRoot(), "/scripts/deploy-config/messaging.json")) returns (
    //   string memory data
    // ) {
    //   _messagingJson = data;
    // } catch {
    //   console.log("Warning: unable to read messaging config. Do not deploy unless you are not using config.");
    //   return;
    // }
    // hubChainId = stdJson.readUint(_messagingJson, "$.hub");
    // chainsLength = stdJson.readUint(_messagingJson, "$.chains");
    // for (uint256 index = 0; index < chainsLength; index++) {
    //   string memory key = string(abi.encodePacked(".configs[", vm.toString(index), "]"));
    //   ProtocolConfig memory rawConfig = abi.decode(_messagingJson.parseRaw(key), (ProtocolConfig));
    //   console.log(rawConfig.delayBlocks);
    //   console.log(rawConfig.hubAmb);
    //   console.log(rawConfig.prefix);
    //   console.log(rawConfig.processGas);
    // }
  }
}

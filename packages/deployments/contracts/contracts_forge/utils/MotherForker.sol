// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ForgeHelper} from "./ForgeHelper.sol";
import {Deployer} from "./Deployer.sol";
import {RpcLookup} from "./RpcLookup.sol";
import {IDiamondCut} from "../../contracts/core/connext/interfaces/IDiamondCut.sol";
import {IDiamondLoupe} from "../../contracts/core/connext/interfaces/IDiamondLoupe.sol";
import {IConnext} from "../../contracts/core/connext/interfaces/IConnext.sol";

import "forge-std/console.sol";
import "forge-std/StdJson.sol";

/**
 * @notice A 'ForkHelper' used to initialize all the applicable forks (found in foundry.toml).
 * @dev Should be inherited and used in the `upgrade` suite of tests to basically test upgradability
 * of live contracts.
 *
 * @dev Can load fork info from two sources:
 *
 * 1. A json file at the instantiated path with the following format:
 * {
 *    "chains": [1, 100, ...],
 *    "rpcs": ["mainnetrpc.com", "gnosisrpc.com", ...],
 *    "forkBlocks": [123123, 123456456, ...]
 * }
 *
 * 2. Environment variables using the same keys found in `contracts/src/config` for providers
 *    and an array for chains. For example:
 * MAINNET_ETH_PROVIDER_URL="mainnetrpc.com"
 * XDAI_PROVIDER_URL="gnosisrpc.com"
 * FORGE_CHAINS="1,100,..."
 * FORGE_CHAIN_FORK_BLOCKS="123123,123456456,..."
 */
abstract contract MotherForker is ForgeHelper {
  // ============ Libraries ============
  using stdJson for string;
  using Strings for string;
  using Strings for uint256;

  // ============ Storage ============

  // File path to config file
  string public CONFIG_FILE_PATH;

  // All chain ids to fork
  uint256[] public NETWORK_IDS;

  mapping(uint256 => uint256) public forkIdsByChain;
  mapping(uint256 => uint256) public chainsByForkId;
  mapping(uint256 => string) public forkRpcsByChain;
  mapping(uint256 => uint256) public forkBlocksByChain;

  // ============ Constructor ============
  constructor(string memory _filePath) {
    // load the networks from the json file
    CONFIG_FILE_PATH = _filePath;
  }

  // ============ Utils ==================

  /**
   * @notice Create a fork for each network.
   */
  function utils_createForks() internal {
    require(NETWORK_IDS.length > 0, "!networks");
    for (uint256 i; i < NETWORK_IDS.length; i++) {
      // read the block to fork
      uint256 forkBlock = forkBlocksByChain[NETWORK_IDS[i]];
      uint256 forkId;
      if (forkBlock > 0) {
        forkId = vm.createSelectFork(forkRpcsByChain[NETWORK_IDS[i]], forkBlock);
      } else {
        forkId = vm.createSelectFork(forkRpcsByChain[NETWORK_IDS[i]]);
      }
      // update the mappings
      forkIdsByChain[block.chainid] = forkId;
      chainsByForkId[forkId] = block.chainid;
    }
  }

  /**
   * @notice Selects a fork given a chain
   */
  function utils_selectFork(uint256 chain) internal returns (uint256 forkId) {
    // activate the fork
    forkId = forkIdsByChain[chain];
    vm.selectFork(forkId);
  }

  /**
   * @notice Loads the networks from env variables
   */
  function utils_loadNetworkFromEnv() internal {
    // Load the chain ids
    uint256[] memory defaultChains = new uint256[](0);
    uint256[] memory chains = vm.envOr("FORGE_CHAINS", ",", defaultChains);

    // Load the rpcs
    string[] memory rpcs = new string[](chains.length);
    for (uint256 i; i < chains.length; i++) {
      string memory rpc = vm.envString(RpcLookup.getRpcEnvName(chains[i]));
      rpcs[i] = rpc;
    }

    // Load the fork blocks
    uint256[] memory forkBlocks = vm.envOr("FORGE_CHAIN_FORK_BLOCKS", ",", defaultChains);
    utils_loadNetworks(chains, rpcs, forkBlocks);
  }

  /**
   * @notice Loads the networks from the specified json file
   */
  function utils_loadNetworkFromJson() internal {
    string memory json = utils_readConfigJson();
    uint256[] memory chains = json.readUintArray(".chains");
    string[] memory rpcs = json.readStringArray(".rpcs");
    uint256[] memory forkBlocks = json.readUintArray(".forkBlocks");

    utils_loadNetworks(chains, rpcs, forkBlocks);
  }

  function utils_loadNetworks(uint256[] memory _chains, string[] memory _rpcs, uint256[] memory _forkBlocks) internal {
    // FIXME: forking from gnosis mainnet gives this internal forge error:
    //
    // ERROR sharedbackend: Failed to send/recv `basic` err=GetAccount(0x1804c8ab1f12e6bbf3894d4083f33e07309d1f38,
    // (code: -32002, message: No state available for block 0x0ba985b09fec8fd02467a9dbfe0cbd6546a96e897c0576125e17896641b29b8d,
    //  data: None)) address=0x1804c8ab1f12e6bbf3894d4083f33e07309d1f38
    //
    // where the `0x1804c8ab1f12e6bbf3894d4083f33e07309d1f38` is the `DEFAULT_SENDER` forge address found in
    // Base.sol. Need to debug/report to figure out why this is failing.
    //
    // In the meantime, we can just skip this chain
    uint256 gnosisIdx = 10_000;
    for (uint256 i; i < _chains.length; i++) {
      // see above
      if (_chains[i] == 100) {
        // set the idx
        gnosisIdx = i;
      }
      // Add to networks
      NETWORK_IDS.push(_chains[i]);
      forkRpcsByChain[_chains[i]] = _rpcs[i];
      forkBlocksByChain[_chains[i]] = _forkBlocks.length > i ? _forkBlocks[i] : 0;
    }

    // Put gnosis chain last, and remove from array
    if (gnosisIdx != 10_000) {
      // remove from rpcs mapping
      delete forkRpcsByChain[_chains[gnosisIdx]];

      // remove from chain ids array
      NETWORK_IDS[gnosisIdx] = NETWORK_IDS[NETWORK_IDS.length - 1];
      NETWORK_IDS.pop();
    }
  }

  /**
   * @notice Read the config json file and return the string contents
   */
  function utils_readConfigJson() internal view returns (string memory) {
    string memory root = vm.projectRoot();
    string memory path = string.concat(root, CONFIG_FILE_PATH);
    string memory json = vm.readFile(path);
    return json;
  }

  /**
   * @notice Rolls fork to a given timestamp
   */
  function utils_rollForkTo(uint256 timestamp) internal {
    // get blocktime
    uint256 pre = block.timestamp;
    if (pre >= timestamp) {
      return;
    }
    require(pre < timestamp, "cannot rewind");
    uint256 warp = timestamp - block.timestamp;
    vm.rollFork(1 + block.number);
    uint256 blocktime = block.timestamp - pre;

    uint256 rolls = blocktime == 0 ? (warp * 3) / 2 : warp / blocktime;
    vm.rollFork(rolls + block.number);
    // ensure at timestamp
    uint256 step = (rolls * 3) / 2;
    while (block.timestamp < timestamp) {
      vm.rollFork(25 + step + block.number);
    }
  }
}

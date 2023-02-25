// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ForgeHelper} from "../utils/ForgeHelper.sol";
import {IDiamondCut} from "../../contracts/core/connext/interfaces/IDiamondCut.sol";

import "forge-std/console.sol";
import "forge-std/stdJson.sol";

/**
 * @notice A 'ForkHelper' used to initialize all the applicable forks (foun`d in foundry.toml).
 * @dev Should be inherited and used in the `upgrade` suite of tests to basically test upgradability
 * of live contracts.
 */
abstract contract MotherForker is ForgeHelper {
  using stdJson for string;
  using Strings for string;
  using Strings for uint256;

  string[2][] public NETWORKS; // [[name, rpc], [name, rpc], ...]
  uint256[] public FORKED_CHAIN_IDS;

  // Hardcode the path to the file
  string public PROPOSAL_FILE_PATH = "/cuts.json";
  // Hardcode the chains to fork based on env
  mapping(uint256 => bool) public isForkedChain;

  mapping(uint256 => uint256) public forkIdsByChain;
  mapping(uint256 => uint256) public chainsByForkId;

  struct ForkInfo {
    address connext;
    bytes[] encodedCuts; // an array of all facet cuts to propose
  }

  mapping(uint256 => ForkInfo) public forkInfo;

  // ============ Utils ==================
  // Create a fork for each network.
  function utils_createForks() internal {
    NETWORKS = vm.rpcUrls();
    for (uint256 i; i < NETWORKS.length; i++) {
      uint256 forkId = vm.createSelectFork(NETWORKS[i][1]);
      // ignore fork if configured in env but no generated cuts
      if (!isForkedChain[block.chainid]) {
        continue;
      }
      // update the mappings
      forkIdsByChain[block.chainid] = forkId;
      chainsByForkId[forkId] = block.chainid;
    }
  }

  function utils_generateProposalFile() internal {
    // generate the diamond cut proposal by running `propose` via cli:
    // yarn workspace @connext/smart-contracts propose --env "production"
    string[] memory args = new string[](6);
    args[0] = "yarn";
    args[1] = "workspace";
    args[2] = "@connext/smart-contracts";
    args[3] = "propose";
    args[4] = "--env";
    args[5] = "production";
    vm.ffi(args);

    // load the supported chains based on output
    string memory json = utils_readProposalJson();
    uint256[] memory chains = json.readUintArray(".chains");
    FORKED_CHAIN_IDS = new uint256[](chains.length);
    for (uint256 i; i < chains.length; i++) {
      FORKED_CHAIN_IDS[i] = chains[i];
      isForkedChain[chains[i]] = true;
    }
  }

  function utils_readProposalJson() internal returns (string memory) {
    string memory root = vm.projectRoot();
    string memory path = string.concat(root, PROPOSAL_FILE_PATH);
    string memory json = vm.readFile(path);
    return json;
  }

  // should be called after utils_generateProposalFile + utils_createForks
  function utils_loadForkInfo() internal {
    string memory json = utils_readProposalJson();

    for (uint256 i; i < FORKED_CHAIN_IDS.length; i++) {
      uint256 chainId = FORKED_CHAIN_IDS[i];
      uint256 forkId = forkIdsByChain[chainId];

      // update connext address
      string memory connextKey = string.concat(".", chainId.toString(), ".connext");
      forkInfo[forkId].connext = json.readAddress(connextKey);

      // get number of facet cuts to parse
      string memory numberOfCutsKey = string.concat(".", chainId.toString(), ".numberOfCuts");
      uint256 numberOfCuts = json.readUint(numberOfCutsKey);

      // parse the cuts
      forkInfo[forkId].encodedCuts = new bytes[](numberOfCuts);
      for (uint256 j; j < numberOfCuts; j++) {
        IDiamondCut.FacetCut memory cut;
        string memory cutsKey = string.concat(".", chainId.toString(), ".proposal[", j.toString(), "]");

        // TODO: fix the decoding here to simplify parsing. Must define `JsonFacetCut` struct
        // bytes memory encoded = json.parseRaw(cutsKey);
        // JsonFacetCut memory decoded = abi.decode(encoded, (JsonFacetCut));
        // console.log("decoded via parseRaw", decoded.facetAddress, decoded.action, decoded.functionSelectors.length);

        // get facet address
        cut.facetAddress = json.readAddress(string.concat(cutsKey, ".facetAddress"));

        // get action
        uint256 actionUint = json.readUint(string.concat(cutsKey, ".action"));
        if (actionUint == 0) {
          cut.action = IDiamondCut.FacetCutAction.Add;
        } else if (actionUint == 1) {
          cut.action = IDiamondCut.FacetCutAction.Replace;
        } else if (actionUint == 2) {
          cut.action = IDiamondCut.FacetCutAction.Remove;
        } else {
          revert("invalid action");
        }

        // get selectors
        bytes[] memory selectors = json.readBytesArray(string.concat(cutsKey, ".functionSelectors"));
        cut.functionSelectors = new bytes4[](selectors.length);
        for (uint256 k; k < selectors.length; k++) {
          cut.functionSelectors[k] = bytes4(selectors[k]);
        }

        // encode the cut and store
        forkInfo[forkId].encodedCuts[j] = abi.encode(cut);
      }
    }
  }

  function utils_setupForkingEnv() internal {
    // make sure the proposal file is generated (will also determine chains to fork)
    utils_generateProposalFile();
    // make sure the forks are created
    utils_createForks();
    // load the fork info into
    utils_loadForkInfo();
  }

  function utils_upgradeDiamond(address diamond) internal {
    // TODO: Need a pre-generated diamond cut proposal - one that will be different than on-chain - that we're
    // testing here. Should come from config?
    // TODO: Should submit a pre-generated diamond cut proposal to the Connext Diamond, zoom forward 7 days,
    // and then accept the proposal.
  }
}

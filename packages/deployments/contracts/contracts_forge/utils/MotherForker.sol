// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ForgeHelper} from "../utils/ForgeHelper.sol";
import {IDiamondCut} from "../../contracts/core/connext/interfaces/IDiamondCut.sol";
import {IConnext} from "../../contracts/core/connext/interfaces/IConnext.sol";

import "forge-std/console.sol";
import "forge-std/StdJson.sol";

/**
 * @notice A 'ForkHelper' used to initialize all the applicable forks (foun`d in foundry.toml).
 * @dev Should be inherited and used in the `upgrade` suite of tests to basically test upgradability
 * of live contracts.
 */
abstract contract MotherForker is ForgeHelper {
  // ============ Libraries ============
  using stdJson for string;
  using Strings for string;
  using Strings for uint256;

  // ============ Storage ============

  string[2][] public NETWORKS; // [[name, rpc], [name, rpc], ...]
  uint256[] public FORKED_CHAIN_IDS;

  // Hardcode the path to the file
  string public PROPOSAL_FILE_PATH = "/cuts.json";
  // Hardcode the chains to fork based on env
  // key is keccak of chain id as string
  mapping(bytes32 => bool) public isForkedChain;

  mapping(uint256 => uint256) public forkIdsByChain;
  mapping(uint256 => uint256) public chainsByForkId;

  struct ForkInfo {
    address connext;
    bytes[] encodedCuts; // an array of all facet cuts to propose
  }

  mapping(uint256 => ForkInfo) public forkInfo;

  // ============ Utils ==================
  /**
   * @notice Create a fork for each network.
   */
  function utils_createForks() private {
    NETWORKS = vm.rpcUrls();
    // get the block for the fork
    string memory json = utils_readProposalJson();
    for (uint256 i; i < NETWORKS.length; i++) {
      // before creating a fork, check if it is whitelisted
      bytes32 key = keccak256(abi.encode(NETWORKS[i][0]));
      if (!isForkedChain[key]) {
        continue;
      }
      // get the block to fork from
      string memory blockKey = string.concat(".", NETWORKS[i][0], ".forkBlock");
      uint256 start = json.readUint(blockKey);
      uint256 forkId = vm.createSelectFork(NETWORKS[i][1], start);
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
   * @notice Generate the diamond cut proposal by running `propose` via cli:
   *     `ywc propose`
   */
  function utils_generateProposalFile() private {
    string[] memory args = new string[](4);
    args[0] = "yarn";
    args[1] = "workspace";
    args[2] = "@connext/smart-contracts";
    args[3] = "propose";
    vm.ffi(args);

    // load the supported chains based on output
    string memory json = utils_readProposalJson();
    uint256[] memory chains = json.readUintArray(".chains");
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
    FORKED_CHAIN_IDS = new uint256[](chains.length);
    for (uint256 i; i < chains.length; i++) {
      // see above
      if (chains[i] == 100) {
        // set the idx
        gnosisIdx = i;
      }
      FORKED_CHAIN_IDS[i] = chains[i];
      if (i != gnosisIdx) {
        bytes32 key = keccak256(abi.encode(chains[i].toString()));
        isForkedChain[key] = true;
      }
    }

    // Put gnosis chain last, and remove from array
    if (gnosisIdx != 10_000) {
      FORKED_CHAIN_IDS[gnosisIdx] = FORKED_CHAIN_IDS[FORKED_CHAIN_IDS.length - 1];
      FORKED_CHAIN_IDS.pop();
    }
  }

  /**
   * @notice Read the proposal json file and return the string contents
   */
  function utils_readProposalJson() private view returns (string memory) {
    string memory root = vm.projectRoot();
    string memory path = string.concat(root, PROPOSAL_FILE_PATH);
    string memory json = vm.readFile(path);
    return json;
  }

  /**
   * @notice Loads the forkInfo (connext address and proposed cuts) from the proposal file
   * @dev Should be called after utils_generateProposalFile + utils_createForks
   */
  function utils_loadForkInfo() private {
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

  /**
   * @notice Sets up the forks, runs the proposal script to generate cuts to perform, and
   * loads the fork info into the contract.
   */
  function utils_setupForkingEnv() internal {
    // make sure the proposal file is generated (will also determine chains to fork)
    utils_generateProposalFile();
    // make sure the forks are created
    utils_createForks();
    // load the fork info into
    utils_loadForkInfo();
  }

  /**
   * @notice This function applies the upgrades to all Connext instances across all forks
   */
  function utils_upgradeDiamonds() internal {
    for (uint256 i; i < FORKED_CHAIN_IDS.length; i++) {
      uint256 forkId = forkIdsByChain[FORKED_CHAIN_IDS[i]];
      vm.selectFork(forkId);
      utils_upgradeDiamond(forkId);
    }
  }

  /**
   * @notice This function applies the upgrades to a single Connext instance
   */
  function utils_upgradeDiamond(uint256 forkId) private {
    ForkInfo storage info = forkInfo[forkId];
    IConnext connext = IConnext(info.connext);
    if (info.encodedCuts.length == 0) {
      console.log("No cuts to apply for", info.connext, "on", block.chainid);
      return;
    }
    IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](info.encodedCuts.length);
    for (uint256 i; i < info.encodedCuts.length; i++) {
      cuts[i] = abi.decode(info.encodedCuts[i], (IDiamondCut.FacetCut));
    }

    // propose upgrade
    vm.prank(connext.owner());
    connext.proposeDiamondCut(cuts, address(0), bytes(""));

    // roll forward and accept
    uint256 acceptance = connext.getAcceptanceTime(cuts, address(0), bytes(""));
    while (block.timestamp < acceptance) {
      vm.rollFork(forkId, 43200 + block.number);
    }
    vm.prank(connext.owner());
    connext.diamondCut(cuts, address(0), bytes(""));
  }
}

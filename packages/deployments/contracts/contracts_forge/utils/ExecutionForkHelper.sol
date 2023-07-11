// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ForgeHelper} from "../utils/ForgeHelper.sol";
import {MotherForker} from "../utils/MotherForker.sol";
import {Deployer} from "./Deployer.sol";
import {IDiamondCut} from "../../contracts/core/connext/interfaces/IDiamondCut.sol";
import {IDiamondLoupe} from "../../contracts/core/connext/interfaces/IDiamondLoupe.sol";
import {IConnext} from "../../contracts/core/connext/interfaces/IConnext.sol";

import "forge-std/console.sol";
import "forge-std/StdJson.sol";

/**
 * @notice A 'ForkHelper' used to initialize all the applicable forks (foun`d in foundry.toml).
 * @dev Should be inherited and used in the `upgrade` suite of tests to basically test upgradability
 * of live contracts.
 */
contract ExecutionForkHelper is MotherForker {
  // ============ Libraries ============
  using stdJson for string;
  using Strings for string;
  using Strings for uint256;

  // ============ Storage ============
  struct ForkInfo {
    address connext;
    bytes[] encodedCuts; // an array of all facet cuts to propose
    mapping(address => bytes) facetCode;
  }

  mapping(uint256 => ForkInfo) public forkInfo;

  // ============ Constructor ============
  constructor() MotherForker("/cuts.json") {}

  // ============ Utils ==================
  /**
   * @notice Loads the forkInfo (connext address and proposed cuts) from the proposal file
   * @dev Should be called after utils_loadNetworkFromJson + utils_createForks
   */
  function utils_loadForkInfo() private {
    string memory json = utils_readConfigJson();

    // Find all the facets that must be deployed from the json

    for (uint256 i; i < NETWORK_IDS.length; i++) {
      uint256 chainId = NETWORK_IDS[i];
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

        // update the mapping
        forkInfo[forkId].facetCode[cut.facetAddress] = json.readBytes(string.concat(cutsKey, ".code"));
      }
    }
  }

  /**
   * @notice Sets up the forks, runs the proposal script to generate cuts to perform, and
   * loads the fork info into the contract.
   */
  function utils_setupForkingEnv() internal {
    // load info from proposal file
    utils_loadNetworkFromJson();
    // make sure the forks are created
    utils_createForks();
    // load the fork info into mapping
    utils_loadForkInfo();
  }

  /**
   * @notice This function applies the upgrades to all Connext instances across all forks
   */
  function utils_upgradeDiamonds() internal {
    for (uint256 i; i < NETWORK_IDS.length; i++) {
      uint256 forkId = forkIdsByChain[NETWORK_IDS[i]];
      utils_upgradeDiamond(forkId);
    }
  }

  /**
   * @notice This function applies the upgrades to a single Connext instance
   */
  function utils_upgradeDiamond(uint256 forkId) private {
    vm.selectFork(forkId);
    ForkInfo storage info = forkInfo[forkId];
    IConnext connext = IConnext(info.connext);
    if (info.encodedCuts.length == 0) {
      console.log("No cuts to apply for", info.connext, "on", block.chainid);
      return;
    }
    IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](info.encodedCuts.length);
    for (uint256 i; i < info.encodedCuts.length; i++) {
      cuts[i] = abi.decode(info.encodedCuts[i], (IDiamondCut.FacetCut));
      // make all facets persistent
      vm.makePersistent(cuts[i].facetAddress);
      // etch code
      vm.etch(cuts[i].facetAddress, info.facetCode[cuts[i].facetAddress]);
    }
    // make connext persistent
    vm.makePersistent(info.connext);
    // propose upgrade
    vm.prank(connext.owner());
    connext.proposeDiamondCut(cuts, address(0), bytes(""));
    // roll forward and accept
    uint256 acceptance = connext.getAcceptanceTime(cuts, address(0), bytes(""));
    utils_rollForkTo(acceptance + 1);
    require(block.timestamp >= acceptance, "acceptance time not reached");
    vm.prank(connext.owner());
    connext.diamondCut(cuts, address(0), bytes(""));
    // revoke connext persistent
    vm.revokePersistent(info.connext);
  }
}

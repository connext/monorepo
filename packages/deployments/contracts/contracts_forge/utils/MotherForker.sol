// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {ForgeHelper} from "../utils/ForgeHelper.sol";

import {IConnext} from "../../contracts/core/connext/interfaces/IConnext.sol";
import {TestERC20} from "../../contracts/test/TestERC20.sol";

/**
 * @notice A 'ForkHelper' used to initialize all the applicable forks (found in foundry.toml).
 * @dev Should be inherited and used in the `upgrade` suite of tests to basically test upgradability
 * of live contracts.
 */
abstract contract MotherForker is ForgeHelper {
  // Hardcode the networks to participate in (should match foundry.toml)
  string[2][] public NETWORKS; // [[name, rpc], [name, rpc], ...]
  uint256[] public FORK_IDS;

  struct ForkInfo {
    address owner;
    address connext;
  }

  mapping(uint256 => ForkInfo) public forkInfo;

  // ============ Test set up ============
  function setUp() public {
    utils_createForks();
  }

  // ============ Utils ==================
  // Create a fork for each network.
  function utils_createForks() internal {
    NETWORKS = vm.rpcUrls();
    for (uint256 i; i < NETWORKS.length; i++) {
      uint256 forkId = vm.createSelectFork(NETWORKS[i][1]);
      FORK_IDS[i] = forkId;
      // Assert that the fork is selectable (has been selected above).
      assertEq(vm.activeFork(), forkId);

      // Form the key we'll use to identify the env vars needed.
      string memory key = Strings.toString(block.chainid);
      // Get address of the connext diamond on the fork.
      address connext = vm.envAddress(string.concat("CONNEXT_", key));

      // Get the "owner" address of the connext diamond on this fork.
      address owner = IConnext(connext).owner();

      forkInfo[forkId] = ForkInfo({connext: connext, owner: owner});
    }
  }

  function utils_upgradeDiamond(address diamond) internal {
    // TODO: Need a pre-generated diamond cut proposal - one that will be different than on-chain - that we're
    // testing here. Should come from config?
    // TODO: Should submit a pre-generated diamond cut proposal to the Connext Diamond, zoom forward 7 days,
    // and then accept the proposal.
  }

  // Sets the storage results
  function utils_setupAssetOnFork(
    uint256 forkId,
    bool localIsAdopted,
    address canonicalChain
  ) public {
    // Select the target fork.
    vm.selectFork(forkId);

    // clear any previous listings
    delete s.tokenConfigs[_canonicalKey];
    delete s.adoptedToCanonical[_local];
    delete s.representationToCanonical[_local];

    if (onCanonical) {
      // set domain
      s.domain = _canonicalDomain;
      // on canonical, local is always adopted && local is always canonical
      _local = _canonical;
      _adopted = _canonical;
      _stableSwap = address(0);
    } else {
      // Ensure stored domain is not canonical domain
      if (s.domain == _canonicalDomain) {
        _canonicalDomain = _canonicalDomain == _originDomain ? _destinationDomain : _originDomain;
      }

      // If the local is already set to the canonical (i.e. from some defaults)
      // redeploy
      if (_local == _canonical) {
        _local = address(new TestERC20(tokenName, tokenSymbol));
      }

      // If the local is adopted, ensure addresses align
      if (localIsAdopted) {
        _local = _adopted;
        _stableSwap = address(0);
      } else {
        _stableSwap = address(5555555555555555555);
        // ensure addresses are unique
        if (_adopted == _local) {
          _adopted = address(new TestERC20(tokenName, tokenSymbol));
        }
      }
    }

    _canonicalKey = keccak256(abi.encode(_canonicalId, _canonicalDomain));

    // Regardless of whether there are two different assets for representation and adopted,
    // the representation decimals must be set (the default behavior in TokenFacet for configuring
    // new assets involves setting the adopted decimals to the local decimals of the latter does
    // not exist).
    // IFF on the canonical domain, however, representation should be address(0)!
    s.tokenConfigs[_canonicalKey].representationDecimals = 18;

    // - token registry should always return the canonical
    // - if you are not on canonical domain, ensure the local origin returns false
    //   (indicates whether token should be burned or not)
    bool isCanonical = s.domain == _canonicalDomain;
    if (!isCanonical) {
      s.representationToCanonical[_local].domain = _canonicalDomain;
      s.representationToCanonical[_local].id = _canonicalId;

      s.tokenConfigs[_canonicalKey].representation = _local;
    }

    // Setup the storage variables for adopted
    s.adoptedToCanonical[_adopted].domain = _canonicalDomain;
    s.adoptedToCanonical[_adopted].id = _canonicalId;

    // Remaining config
    s.tokenConfigs[_canonicalKey].approval = true;
    s.tokenConfigs[_canonicalKey].adopted = _adopted;
    s.tokenConfigs[_canonicalKey].adoptedDecimals = 18;
    s.tokenConfigs[_canonicalKey].adoptedToLocalExternalPools = _stableSwap;
    s.tokenConfigs[_canonicalKey].cap = isCanonical ? _cap : 0; //10_000_000 ether;
    s.tokenConfigs[_canonicalKey].custodied = 0;

    // // Log stored vars
    // console.log("setup asset:");
    // console.log("- adopted:", _adopted);
    // console.log("- local:", _local);
    // console.log("- canonical:", _canonical);
    // console.log("");
    // console.log("- domain:", s.domain);
    // console.log("- destination:", _destinationDomain);
    // console.log("- origin:", _originDomain);
    // console.log("- canonicalDomain:", _canonicalDomain);
    // console.log("- stableSwap:", _stableSwap);
    // console.log("- isLocalOrigin", onCanonical);
  }
}

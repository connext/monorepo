// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IStableSwap} from "../../contracts/interfaces/IStableSwap.sol";
import {ITokenRegistry} from "../../contracts/nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {ConnextMessage} from "../../contracts/libraries/ConnextMessage.sol";
import {CallParams, ExecuteArgs} from "../../contracts/libraries/LibConnextStorage.sol";
import {AssetFacet} from "../../contracts/facets/AssetFacet.sol";
import {TestERC20} from "../../contracts/test/TestERC20.sol";

import "../../lib/forge-std/src/console.sol";
import "./FacetHelper.sol";

contract AssetFacetTest is AssetFacet, FacetHelper {
  // ============ storage ============
  // local asset for this domain

  // domains
  uint32 _originDomain = 1000;
  uint32 _destinationDomain = 2000;

  // canonical token details
  address _canonical = address(5);
  bytes32 _canonicalTokenId = bytes32(abi.encodePacked(_canonical));
  uint32 _canonicalDomain = _originDomain;

  // ============ Test set up ============
  function setUp() public {
    // deploy any needed contracts
    deployContracts();

    // set defaults
    setDefaults();

    vm.mockCall(
      _tokenRegistry,
      abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
      abi.encode(_canonicalDomain, _canonicalTokenId)
    );

    // // setup asset context (use local == adopted)
    // s.adoptedToCanonical[_local] = ConnextMessage.TokenId(_canonicalDomain, _canonicalTokenId);
    // s.adoptedToLocalPools[_canonicalTokenId] = IStableSwap(address(0));
    // s.canonicalToAdopted[_canonicalTokenId] = _local;

    // // setup other context
    // s.approvedRelayers[address(this)] = true;
    // s.maxRoutersPerTransfer = 5;
  }

  // ============ Getters ============
  // canonicalToAdopted

  // adoptedToCanonical

  // approvedAssets

  // adoptedToLocalPools

  // wrapper

  // tokenRegistry

  // ============ Admin functions ============

  // test_adminFunctions__onlyOwner ??

  // test_setWrapper__shouldUpdateWrapper
  // test_setWrapper__invalidIfRedundant
  // test_setWrapper__invalidIfWrapperIsNotContract

  // setTokenRegistry
  // test_setTokenRegistry__shouldUpdateTokenRegistry
  // test_setTokenRegistry__invalidIfRedundant
  // test_setTokenRegistry__invalidIfNotContract

  // setupAsset
  // test_setupAsset__shouldSetupNativeAsset
  // test_setupAsset__shouldSetupAdoptedToken
  // - update approved assets mapping
  // - if address is 0x0 native, uses s.wrapper; else uses address
  // - update adoptedToCanonical mapping
  // - update canonicalToAdopted mapping
  // - emit AssetAdded
  // - call _addStableSwapPool
  //   - update adoptedToLocalPools
  //   - emit StableSwapAdded
  // test_setupAsset__revertIfAlreadyApproved

  // addStableSwapPool
  // test_addStableSwapPool__shouldSetStableSwapPool
  // TODO: Might not be desirable functionality. Should we be doing a sanity check to make sure the
  // asset exists?
  // test_addStableSwapPool__shouldFreelyOverwrite

  // removeAssetId
  // test_removeAssetId__shouldRemoveAssetId
  // - delete approvedAssets entry
  // - delete adoptedToLocalPools entry
  // - delete adoptedToCanonical entry; uses s.wrapper for native
  // - emit AssetRemoved
  // test_removeAssetId__revertIfNotAlreadyApproved
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../facets/FacetHelper.sol";
import "../../../../contracts/core/connext/libraries/AssetLogic.sol";
import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {ConnextMessage} from "../../../../contracts/core/connext/libraries/ConnextMessage.sol";
import {LibConnextStorage, AppStorage} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";

contract AssetLogicTest is BaseConnextFacet, FacetHelper {
  // ============ Storage ============
  uint32 domain = 1;
  address canonical = address(2);
  address asset = address(3);
  bytes32 canonicalTokenId = bytes32(abi.encodePacked(canonical));
  uint32 canonicalDomain = domain;

  // ============ Setup ============

  function setUp() public {
    // set defaults
    setDefaults();
    vm.mockCall(
      _tokenRegistry,
      abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
      abi.encode(canonicalDomain, canonicalTokenId)
    );
  }

  // should work
  function test_AssetLogic_swapFromLocalAssetIfNeeded_works() public {
    s.canonicalToAdopted[canonicalTokenId] = asset;
    (uint256 _amount, address _asset) = AssetLogic.swapFromLocalAssetIfNeeded(asset, 10000);
    assertEq(_amount, 10000);
    assertEq(_asset, asset);
  }
}

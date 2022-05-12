// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {BaseConnextFacet} from "../../contracts/diamond/facets/BaseConnextFacet.sol";
import {IDiamondCut} from "../../contracts/diamond/interfaces/IDiamondCut.sol";

function getTestSetterFacetCut(address _testSetterFacetFacet) returns (IDiamondCut.FacetCut memory) {
  bytes4[] memory testSetterFacetSelectors = new bytes4[](7);
  testSetterFacetSelectors[0] = TestSetterFacet.setTestRelayerFees.selector;
  testSetterFacetSelectors[1] = TestSetterFacet.setTestTransferRelayer.selector;
  testSetterFacetSelectors[2] = TestSetterFacet.setTestApproveRouterForPortal.selector;
  testSetterFacetSelectors[3] = TestSetterFacet.setTestRouterBalance.selector;
  testSetterFacetSelectors[4] = TestSetterFacet.setTestCanonicalToAdopted.selector;
  testSetterFacetSelectors[5] = TestSetterFacet.setTestAavePortalsTransfers.selector;
  testSetterFacetSelectors[6] = TestSetterFacet.setTestRoutedTransfers.selector;
  return
    IDiamondCut.FacetCut({
      facetAddress: _testSetterFacetFacet,
      action: IDiamondCut.FacetCutAction.Add,
      functionSelectors: testSetterFacetSelectors
    });
}

contract TestSetterFacet is BaseConnextFacet {
  function setTestRelayerFees(bytes32 _transferId, uint256 _fee) external {
    s.relayerFees[_transferId] = _fee;
  }

  function setTestTransferRelayer(bytes32 _transferId, address _relayer) external {
    s.transferRelayer[_transferId] = _relayer;
  }

  function setTestApproveRouterForPortal(address _router, bool _value) external {
    s.routerPermissionInfo.approvedForPortalRouters[_router] = _value;
  }

  function setTestRouterBalance(
    address _router,
    address _asset,
    uint256 _balance
  ) external {
    s.routerBalances[_router][_asset] = _balance;
  }

  function setTestCanonicalToAdopted(bytes32 _id, address _adopted) external {
    s.canonicalToAdopted[_id] = _adopted;
  }

  function setTestAavePortalsTransfers(bytes32 _id, uint256 _amount) external {
    s.aavePortalsTransfers[_id] = _amount;
  }

  function setTestRoutedTransfers(bytes32 _id, address[] memory _routers) external {
    s.routedTransfers[_id] = _routers;
  }
}

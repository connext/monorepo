// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
/******************************************************************************/
import {IDiamondCut} from "../interfaces/IDiamondCut.sol";

// Remember to add the loupe functions from DiamondLoupeFacet to the diamond.
// The loupe functions are required by the EIP2535 Diamonds standard

library LibDiamond {
  bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage");

  struct FacetAddressAndPosition {
    address facetAddress;
    uint96 functionSelectorPosition; // position in facetFunctionSelectors.functionSelectors array
  }

  struct FacetFunctionSelectors {
    bytes4[] functionSelectors;
    uint256 facetAddressPosition; // position of facetAddress in facetAddresses array
  }

  struct DiamondStorage {
    // maps function selector to the facet address and
    // the position of the selector in the facetFunctionSelectors.selectors array
    mapping(bytes4 => FacetAddressAndPosition) selectorToFacetAndPosition;
    // maps facet addresses to function selectors
    mapping(address => FacetFunctionSelectors) facetFunctionSelectors;
    // facet addresses
    address[] facetAddresses;
    // Used to query if a contract implements an interface.
    // Used to implement ERC-165.
    mapping(bytes4 => bool) supportedInterfaces;
    // owner of the contract
    address contractOwner;
    // hash of proposed facets => acceptance time
    mapping(bytes32 => uint256) acceptanceTimes;
    // acceptance delay for upgrading facets
    uint256 acceptanceDelay;
  }

  function diamondStorage() internal pure returns (DiamondStorage storage ds) {
    bytes32 position = DIAMOND_STORAGE_POSITION;
    assembly {
      ds.slot := position
    }
  }

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  function setContractOwner(address _newOwner) internal {
    DiamondStorage storage ds = diamondStorage();
    emit OwnershipTransferred(ds.contractOwner, _newOwner);
    ds.contractOwner = _newOwner;
  }

  function contractOwner() internal view returns (address contractOwner_) {
    contractOwner_ = diamondStorage().contractOwner;
  }

  function acceptanceDelay() internal view returns (uint256) {
    return diamondStorage().acceptanceDelay;
  }

  function acceptanceTime(bytes32 _key) internal view returns (uint256) {
    return diamondStorage().acceptanceTimes[_key];
  }

  function enforceIsContractOwner() internal view {
    require(msg.sender == diamondStorage().contractOwner, "LibDiamond: !contract owner");
  }

  event DiamondCutProposed(IDiamondCut.FacetCut[] _diamondCut, address _init, bytes _calldata, uint256 deadline);

  function proposeDiamondCut(
    IDiamondCut.FacetCut[] memory _diamondCut,
    address _init,
    bytes memory _calldata
  ) internal {
    // NOTE: to save gas, verification that `proposeDiamondCut` and `diamondCut` are not
    // included is performed in `diamondCut`, where there is already a loop over facets.
    // In the case where these cuts are performed, admins must call `rescindDiamondCut`

    DiamondStorage storage ds = diamondStorage();
    uint256 acceptance = block.timestamp + ds.acceptanceDelay;
    ds.acceptanceTimes[keccak256(abi.encode(_diamondCut, _init, _calldata))] = acceptance;
    emit DiamondCutProposed(_diamondCut, _init, _calldata, acceptance);
  }

  event DiamondCutRescinded(IDiamondCut.FacetCut[] _diamondCut, address _init, bytes _calldata);

  function rescindDiamondCut(
    IDiamondCut.FacetCut[] memory _diamondCut,
    address _init,
    bytes memory _calldata
  ) internal {
    // NOTE: you can always rescind a proposed facet cut as the owner, even if outside of the validity
    // period or befor the delay elpases
    delete diamondStorage().acceptanceTimes[keccak256(abi.encode(_diamondCut, _init, _calldata))];
    emit DiamondCutRescinded(_diamondCut, _init, _calldata);
  }

  event DiamondCut(IDiamondCut.FacetCut[] _diamondCut, address _init, bytes _calldata);

  // Internal function version of diamondCut
  function diamondCut(
    IDiamondCut.FacetCut[] memory _diamondCut,
    address _init,
    bytes memory _calldata
  ) internal {
    DiamondStorage storage ds = diamondStorage();
    bytes32 key = keccak256(abi.encode(_diamondCut, _init, _calldata));
    if (ds.facetAddresses.length != 0) {
      uint256 time = ds.acceptanceTimes[key];
      require(time != 0 && time <= block.timestamp, "LibDiamond: delay not elapsed");
      // Reset the acceptance time to ensure the same set of updates cannot be replayed
      // without going through a proposal window

      // NOTE: the only time this will not be set to 0 is when there are no
      // existing facet addresses (on initialization, or when starting after a bad upgrade,
      // for example).
      // The only relevant case is the initial case, which has no acceptance time. otherwise,
      // there is no way to update the facet selector mapping to call `diamondCut`.
      // Avoiding setting the empty value will save gas on the initial deployment.
      delete ds.acceptanceTimes[key];
    } // Otherwise, this is the first instance of deployment and it can be set automatically
    uint256 len = _diamondCut.length;
    for (uint256 facetIndex; facetIndex < len; ) {
      IDiamondCut.FacetCutAction action = _diamondCut[facetIndex].action;
      if (action == IDiamondCut.FacetCutAction.Add) {
        addFunctions(_diamondCut[facetIndex].facetAddress, _diamondCut[facetIndex].functionSelectors);
      } else if (action == IDiamondCut.FacetCutAction.Replace) {
        replaceFunctions(_diamondCut[facetIndex].facetAddress, _diamondCut[facetIndex].functionSelectors);
      } else if (action == IDiamondCut.FacetCutAction.Remove) {
        removeFunctions(_diamondCut[facetIndex].facetAddress, _diamondCut[facetIndex].functionSelectors);
      } else {
        revert("LibDiamondCut: Incorrect FacetCutAction");
      }

      unchecked {
        ++facetIndex;
      }
    }
    emit DiamondCut(_diamondCut, _init, _calldata);
    initializeDiamondCut(_init, _calldata);
  }

  function addFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal {
    require(_functionSelectors.length != 0, "LibDiamondCut: No selectors in facet to cut");
    DiamondStorage storage ds = diamondStorage();
    require(_facetAddress != address(0), "LibDiamondCut: Add facet can't be address(0)");
    uint96 selectorPosition = uint96(ds.facetFunctionSelectors[_facetAddress].functionSelectors.length);
    // add new facet address if it does not exist
    if (selectorPosition == 0) {
      addFacet(ds, _facetAddress);
    }
    uint256 len = _functionSelectors.length;
    for (uint256 selectorIndex; selectorIndex < len; ) {
      bytes4 selector = _functionSelectors[selectorIndex];
      address oldFacetAddress = ds.selectorToFacetAndPosition[selector].facetAddress;
      require(oldFacetAddress == address(0), "LibDiamondCut: Can't add function that already exists");
      addFunction(ds, selector, selectorPosition, _facetAddress);
      selectorPosition++;

      unchecked {
        ++selectorIndex;
      }
    }
  }

  function replaceFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal {
    uint256 len = _functionSelectors.length;
    require(len != 0, "LibDiamondCut: No selectors in facet to cut");
    DiamondStorage storage ds = diamondStorage();
    require(_facetAddress != address(0), "LibDiamondCut: Add facet can't be address(0)");
    uint96 selectorPosition = uint96(ds.facetFunctionSelectors[_facetAddress].functionSelectors.length);
    // add new facet address if it does not exist
    if (selectorPosition == 0) {
      addFacet(ds, _facetAddress);
    }
    for (uint256 selectorIndex; selectorIndex < len; ) {
      bytes4 selector = _functionSelectors[selectorIndex];
      address oldFacetAddress = ds.selectorToFacetAndPosition[selector].facetAddress;
      require(oldFacetAddress != _facetAddress, "LibDiamondCut: Can't replace function with same function");
      removeFunction(ds, oldFacetAddress, selector);
      addFunction(ds, selector, selectorPosition, _facetAddress);
      selectorPosition++;

      unchecked {
        ++selectorIndex;
      }
    }
  }

  function removeFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal {
    require(_functionSelectors.length != 0, "LibDiamondCut: No selectors in facet to cut");
    DiamondStorage storage ds = diamondStorage();
    // get the propose and cut selectors -- can never remove these
    bytes4 proposeSelector = IDiamondCut.proposeDiamondCut.selector;
    bytes4 cutSelector = IDiamondCut.diamondCut.selector;
    // if function does not exist then do nothing and return
    require(_facetAddress == address(0), "LibDiamondCut: Remove facet address must be address(0)");
    uint256 len = _functionSelectors.length;
    for (uint256 selectorIndex; selectorIndex < len; ) {
      bytes4 selector = _functionSelectors[selectorIndex];
      require(selector != proposeSelector && selector != cutSelector, "LibDiamondCut: Cannot remove cut selectors");
      address oldFacetAddress = ds.selectorToFacetAndPosition[selector].facetAddress;
      removeFunction(ds, oldFacetAddress, selector);

      unchecked {
        ++selectorIndex;
      }
    }
  }

  function addFacet(DiamondStorage storage ds, address _facetAddress) internal {
    enforceHasContractCode(_facetAddress, "LibDiamondCut: New facet has no code");
    ds.facetFunctionSelectors[_facetAddress].facetAddressPosition = ds.facetAddresses.length;
    ds.facetAddresses.push(_facetAddress);
  }

  function addFunction(
    DiamondStorage storage ds,
    bytes4 _selector,
    uint96 _selectorPosition,
    address _facetAddress
  ) internal {
    ds.selectorToFacetAndPosition[_selector].functionSelectorPosition = _selectorPosition;
    ds.facetFunctionSelectors[_facetAddress].functionSelectors.push(_selector);
    ds.selectorToFacetAndPosition[_selector].facetAddress = _facetAddress;
  }

  function removeFunction(
    DiamondStorage storage ds,
    address _facetAddress,
    bytes4 _selector
  ) internal {
    require(_facetAddress != address(0), "LibDiamondCut: Can't remove function that doesn't exist");
    // an immutable function is a function defined directly in a diamond
    require(_facetAddress != address(this), "LibDiamondCut: Can't remove immutable function");
    // replace selector with last selector, then delete last selector
    uint256 selectorPosition = ds.selectorToFacetAndPosition[_selector].functionSelectorPosition;
    uint256 lastSelectorPosition = ds.facetFunctionSelectors[_facetAddress].functionSelectors.length - 1;
    // if not the same then replace _selector with lastSelector
    if (selectorPosition != lastSelectorPosition) {
      bytes4 lastSelector = ds.facetFunctionSelectors[_facetAddress].functionSelectors[lastSelectorPosition];
      ds.facetFunctionSelectors[_facetAddress].functionSelectors[selectorPosition] = lastSelector;
      ds.selectorToFacetAndPosition[lastSelector].functionSelectorPosition = uint96(selectorPosition);
    }
    // delete the last selector
    ds.facetFunctionSelectors[_facetAddress].functionSelectors.pop();
    delete ds.selectorToFacetAndPosition[_selector];

    // if no more selectors for facet address then delete the facet address
    if (lastSelectorPosition == 0) {
      // replace facet address with last facet address and delete last facet address
      uint256 lastFacetAddressPosition = ds.facetAddresses.length - 1;
      uint256 facetAddressPosition = ds.facetFunctionSelectors[_facetAddress].facetAddressPosition;
      if (facetAddressPosition != lastFacetAddressPosition) {
        address lastFacetAddress = ds.facetAddresses[lastFacetAddressPosition];
        ds.facetAddresses[facetAddressPosition] = lastFacetAddress;
        ds.facetFunctionSelectors[lastFacetAddress].facetAddressPosition = facetAddressPosition;
      }
      ds.facetAddresses.pop();
      delete ds.facetFunctionSelectors[_facetAddress].facetAddressPosition;
    }
  }

  function initializeDiamondCut(address _init, bytes memory _calldata) internal {
    if (_init == address(0)) {
      require(_calldata.length == 0, "LibDiamondCut: _init is address(0) but_calldata is not empty");
    } else {
      require(_calldata.length != 0, "LibDiamondCut: _calldata is empty but _init is not address(0)");
      if (_init != address(this)) {
        enforceHasContractCode(_init, "LibDiamondCut: _init address has no code");
      }
      (bool success, bytes memory error) = _init.delegatecall(_calldata);
      if (!success) {
        if (error.length != 0) {
          // bubble up the error
          revert(string(error));
        } else {
          revert("LibDiamondCut: _init function reverted");
        }
      }
    }
  }

  function enforceHasContractCode(address _contract, string memory _errorMessage) internal view {
    require(_contract.code.length != 0, _errorMessage);
  }
}

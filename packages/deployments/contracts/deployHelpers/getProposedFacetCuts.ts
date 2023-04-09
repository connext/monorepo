import { constants, Contract } from "ethers";
import { mergeABIs } from "hardhat-deploy/dist/src/utils";

export enum FacetCutAction {
  Add,
  Replace,
  Remove,
}

export type FacetCut = Facet & {
  action: FacetCutAction;
};

export type Facet = {
  name: string;
  facetAddress: string;
  functionSelectors: string[];
};

export type FacetOptions = {
  name: string;
  contract: Contract;
};

// NOTE: facet implementations *must* be deployed before calling this function
// INCLUDING the `_DefaultDiamondLoupeFacet`
export const getProposedFacetCuts = async (
  facets: FacetOptions[],
  current: Contract, // currently deployed contract to upgrade
  exclude: string[] = [], // facets to *NOT* upgrade.
): Promise<FacetCut[]> => {
  // Get existing facets + selectors
  const oldFacets: { facetAddress: string; functionSelectors: string[] }[] = await current.facets();
  const oldSelectors: string[] = [];
  const oldSelectorsFacetAddress: { [selector: string]: string } = {};
  for (const oldFacet of oldFacets) {
    for (const selector of oldFacet.functionSelectors) {
      oldSelectors.push(selector);
      // console.log(`existing facet address:`, oldFacet.facetAddress);
      oldSelectorsFacetAddress[selector] = oldFacet.facetAddress;
    }
  }

  let changesDetected = false;

  // Retrieve new facet selectors
  const newSelectors: string[] = [];
  const facetSnapshot: Facet[] = [];
  for (const facet of facets) {
    // NOTE: modified from: https://github.com/wighawag/hardhat-deploy/blob/3d08a33a6ae9404bf56187c4f49ec359427672eb/src/helpers.ts#L1792-L2443
    // NOTE: update if linkedData / libraries / facetArgs are included in deploy script

    // Update selectors and snapshot
    const functionSelectors = Object.values(facet.contract.interface.functions)
      .map((fragment) => {
        return facet.contract.interface.getSighash(fragment.format());
      })
      .filter((x) => !!x);
    facetSnapshot.push({
      name: facet.name,
      facetAddress: facet.contract.address,
      functionSelectors,
    });
    newSelectors.push(...functionSelectors);
  }

  // Find selectors to add and selectors to replace
  const facetCuts: FacetCut[] = [];
  for (const newFacet of facetSnapshot) {
    const selectorsToAdd: string[] = [];
    const selectorsToReplace: string[] = [];

    for (const selector of newFacet.functionSelectors) {
      if (oldSelectors.indexOf(selector) >= 0) {
        if (oldSelectorsFacetAddress[selector].toLowerCase() !== newFacet.facetAddress.toLowerCase()) {
          selectorsToReplace.push(selector);
        }
      } else {
        selectorsToAdd.push(selector);
      }
    }

    if (selectorsToReplace.length > 0) {
      changesDetected = true;
      facetCuts.push({
        name: newFacet.name,
        facetAddress: newFacet.facetAddress,
        functionSelectors: selectorsToReplace,
        action: FacetCutAction.Replace,
      });
    }

    if (selectorsToAdd.length > 0) {
      changesDetected = true;
      facetCuts.push({
        name: newFacet.name,
        facetAddress: newFacet.facetAddress,
        functionSelectors: selectorsToAdd,
        action: FacetCutAction.Add,
      });
    }
  }

  // Get facet selectors to delete
  const selectorsToDelete: string[] = [];
  for (const selector of oldSelectors) {
    if (newSelectors.indexOf(selector) === -1) {
      selectorsToDelete.push(selector);
    }
  }

  // if (selectorsToDelete.length > 0) {
  //   console.log("trying to remove:", selectorsToDelete);
  // }
  if (selectorsToDelete.length > 0) {
    changesDetected = true;
    facetCuts.unshift({
      name: "unknown",
      facetAddress: "0x0000000000000000000000000000000000000000",
      functionSelectors: selectorsToDelete,
      action: FacetCutAction.Remove,
    });
  }

  // Remove excluded facets
  const e = exclude.map((x) => x.toLowerCase());
  const filtered = facetCuts.filter((cut) => {
    return !e.includes(cut.facetAddress.toLowerCase());
  });

  // If no changes detected, do nothing
  if (!changesDetected || filtered.length === 0) {
    // console.log(`no diamond upgrade proposal needed`);
    return []; // no cuts to propose
  }

  // Make sure this isnt a duplicate proposal (i.e. you aren't just resetting times)
  const acceptanceTime = await current.getAcceptanceTime(filtered, constants.AddressZero, "0x");
  if (!acceptanceTime.isZero()) {
    // console.log(`cut has already been proposed`);
    return filtered;
  }
  // console.log("calling propose with", filtered);

  // Propose facet cut
  return filtered;
};

/**
 *
 * @param prev The abi of the contract prior to the upgrade execution
 */
export const getUpgradedAbi = (facets: (FacetOptions & { abi: any[] })[], prev: any[]): any[] => {
  // Shortcircuit if no facets
  if (facets.length === 0) {
    return prev;
  }

  // Merge all facet abis
  let abi = prev.concat([]);

  for (const facet of facets) {
    abi = mergeABIs([abi, facet.abi] as any[][], {
      check: false,
      skipSupportsInterface: false,
    });
  }
  return abi;
};

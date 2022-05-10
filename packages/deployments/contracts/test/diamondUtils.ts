import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

export const FacetCutAction = {
  Add: 0,
  Replace: 1,
  Remove: 2,
};

export function getSelectors(contract: Contract) {
  const signatures: string[] = Object.keys(contract.interface.functions);

  return signatures.reduce((acc: string[], val) => {
    acc.push(contract.interface.getSighash(val));
    return acc;
  }, []);
}

export const deployDiamond = async <T extends Contract = Contract>(
  diamondArtifactName: string,
  facets: Array<Contract>,
  owner: string,
  contractABIName: string,
): Promise<T> => {
  const diamondCut = [];

  for (const facet of facets) {
    diamondCut.push([facet.address, FacetCutAction.Add, getSelectors(facet)]);
  }

  const diamondFactory = (await ethers.getContractFactory(diamondArtifactName)) as ContractFactory;
  const deployedDiamond = await diamondFactory.deploy(owner, diamondCut);
  await deployedDiamond.deployed();
  const contract = (await ethers.getContractAt(contractABIName, deployedDiamond.address)) as Contract;

  return contract as T;
};

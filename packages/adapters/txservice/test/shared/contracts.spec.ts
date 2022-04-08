import { expect, mkAddress } from "@connext/nxtp-utils";
import Sinon, { reset, restore, SinonStub } from "sinon";
import { ConnextPriceOracle as TConnextPriceOracle } from "@connext/nxtp-contracts/typechain-types";
import * as ContractFns from "../../src/shared/contracts";

describe("contracts", () => {
  let testChainId1 = 1336;
  let testChainId2 = 1337;
  let testAddress = mkAddress("0x123");
  let contractDeployment: any;
  let contractDeploymentStub: SinonStub;

  beforeEach(() => {
    contractDeployment = {
      [String(testChainId1)]: [
        {
          name: "test",
          chainId: testChainId1,
          contracts: {
            ConnextPriceOracle: {
              address: testAddress,
              abi: ["fakeAbi()"],
            },
            Connext: {
              address: testAddress,
              abi: ["fakeAbi()"],
            },
          },
        },
      ],
    };
    contractDeploymentStub = Sinon.stub(ContractFns, "_getContractDeployments");
  });

  describe("#getContractDeployments", () => {
    beforeEach(() => {
      contractDeploymentStub.returns(contractDeployment);
    });

    it("should be correct structure", () => {
      expect(ContractFns._getContractDeployments()[testChainId1][0].chainId).to.be.equal(1336);
    });
  });

  describe("#getDeployedConnextContract", () => {
    beforeEach(() => {});

    it("should return undefined if `connext` doesn't exist in deployments", () => {
      const mockContractDeployment = {
        [String(testChainId1)]: [
          {
            name: "test",
            chainId: testChainId1,
            contracts: {
              ConnextPriceOracle: {
                address: testAddress,
                abi: ["fakeAbi()"],
              },
            },
          },
        ],
      };
      contractDeploymentStub.returns(mockContractDeployment);
      expect(ContractFns.getDeployedConnextContract(1111)).to.be.undefined;
    });

    it("should return undefined if chainId doesn't exist in deployments", () => {
      const mockContractDeployment = {
        [String(testChainId1)]: [
          {
            name: "test",
            chainId: testChainId1,
            contracts: {
              ConnextPriceOracle: {
                address: testAddress,
                abi: ["fakeAbi()"],
              },
            },
          },
        ],
      };
      contractDeploymentStub.returns(mockContractDeployment);
      expect(ContractFns.getDeployedConnextContract(testChainId1)).to.be.undefined;
    });

    it("happy case: should return the connext contract", () => {
      contractDeploymentStub.returns(contractDeployment);
      expect(ContractFns.getDeployedConnextContract(testChainId1)).to.be.deep.equal({
        address: testAddress,
        abi: ["fakeAbi()"],
      });
    });
  });

  describe("#getDeployedPriceOracleContract", () => {
    beforeEach(() => {
      contractDeploymentStub.returns(contractDeployment);
    });

    it("should be undefined for unknown chainId", async () => {
      expect(ContractFns.getDeployedPriceOracleContract(testChainId2)).to.be.equal(undefined);
    });

    it("should be same as test", async () => {
      let oracleContract = ContractFns.getDeployedPriceOracleContract(testChainId1);
      expect(oracleContract.address).to.be.equal(testAddress);
      expect(oracleContract.abi[0]).to.be.equal("fakeAbi()");
    });
  });

  describe("#CHAINS_WITH_PRICE_ORACLES", () => {
    beforeEach(() => {
      contractDeploymentStub.returns(contractDeployment);
    });

    it("should return just number[]", () => {
      expect(ContractFns.CHAINS_WITH_PRICE_ORACLES).to.be.an("array");
    });
  });

  describe("#getPriceOracleInterface", () => {
    let interfaceInstance: TConnextPriceOracle["interface"] = ContractFns.getPriceOracleInterface();

    beforeEach(() => {});

    it("happy", async () => {
      expect(interfaceInstance.encodeFunctionData("admin")).to.be.equal("0xf851a440");
    });
  });

  afterEach(() => {
    restore();
    reset();
  });
});

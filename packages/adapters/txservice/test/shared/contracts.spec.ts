import { expect, mkAddress } from "@connext/nxtp-utils";
import Sinon, { reset, restore, SinonStub } from "sinon";
import { ConnextPriceOracle as TConnextPriceOracle } from "@connext/smart-contracts/typechain-types";
import * as ContractFns from "../../src/shared/contracts";

describe("contracts", () => {
  let testChainId1 = 1336;
  let testChainId2 = 1337;
  let testAddress = mkAddress("0x123");
  let testAddressStaging = mkAddress("0x234");
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
            StableSwap: {
              address: testAddress,
              abi: ["fakeAbi()"],
            },
            StableSwapStaging: {
              address: testAddressStaging,
              abi: ["fakeAbi()"],
            },
            Connext: {
              address: testAddress,
              abi: ["fakeAbi()"],
            },
            ConnextStaging: {
              address: testAddressStaging,
              abi: ["fakeAbi()"],
            },
            Unwrapper: {
              address: testAddress,
              abi: ["fakeAbi()"],
            },
            UnwrapperStaging: {
              address: testAddressStaging,
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
              Connext: {
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
              Connext: {
                address: testAddress,
                abi: ["fakeAbi()"],
              },
            },
          },
        ],
      };
      contractDeploymentStub.returns(mockContractDeployment);
      expect(ContractFns.getDeployedConnextContract(testChainId2)).to.be.undefined;
    });

    it("happy case: should return the prod connext contract", () => {
      contractDeploymentStub.returns(contractDeployment);
      expect(ContractFns.getDeployedConnextContract(testChainId1)).to.be.deep.equal({
        address: testAddress,
        abi: ["fakeAbi()"],
      });
    });

    it("happy case: should return the staging connext contract", () => {
      contractDeploymentStub.returns(contractDeployment);
      expect(ContractFns.getDeployedConnextContract(testChainId1, "Staging")).to.be.deep.equal({
        address: testAddressStaging,
        abi: ["fakeAbi()"],
      });
    });
  });

  describe("#getDeployedUnwrapperContract", () => {
    beforeEach(() => {});

    it("should return undefined if `unwrapper` doesn't exist in deployments", () => {
      const mockContractDeployment = {
        [String(testChainId1)]: [
          {
            name: "test",
            chainId: testChainId1,
            contracts: {
              Unwrapper: {
                address: testAddress,
                abi: ["fakeAbi()"],
              },
            },
          },
        ],
      };
      contractDeploymentStub.returns(mockContractDeployment);
      expect(ContractFns.getDeployedUnwrapperContract(1111)).to.be.undefined;
    });

    it("should return undefined if chainId doesn't exist in deployments", () => {
      const mockContractDeployment = {
        [String(testChainId1)]: [
          {
            name: "test",
            chainId: testChainId1,
            contracts: {
              Unwrapper: {
                address: testAddress,
                abi: ["fakeAbi()"],
              },
            },
          },
        ],
      };
      contractDeploymentStub.returns(mockContractDeployment);
      expect(ContractFns.getDeployedUnwrapperContract(testChainId2)).to.be.undefined;
    });

    it("happy case: should return the prod unwrapper contract", () => {
      contractDeploymentStub.returns(contractDeployment);
      expect(ContractFns.getDeployedUnwrapperContract(testChainId1)).to.be.deep.equal({
        address: testAddress,
        abi: ["fakeAbi()"],
      });
    });

    it("happy case: should return the staging unwrapper contract", () => {
      contractDeploymentStub.returns(contractDeployment);
      expect(ContractFns.getDeployedUnwrapperContract(testChainId1, "Staging")).to.be.deep.equal({
        address: testAddressStaging,
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
      expect(oracleContract!.address).to.be.equal(testAddress);
      expect(oracleContract!.abi[0]).to.be.equal("fakeAbi()");
    });
  });

  describe("#getDeployedStableSwapContract", () => {
    beforeEach(() => {
      contractDeploymentStub.returns(contractDeployment);
    });

    it("should be undefined for unknown chainId", async () => {
      expect(ContractFns.getDeployedStableSwapContract(testChainId2)).to.be.equal(undefined);
    });

    it("should be same as test", async () => {
      let oracleContract = ContractFns.getDeployedStableSwapContract(testChainId1);
      expect(oracleContract!.address).to.be.equal(testAddress);
      expect(oracleContract!.abi[0]).to.be.equal("fakeAbi()");
    });

    it("happy case: should return the prod stableswap contract", () => {
      contractDeploymentStub.returns(contractDeployment);
      expect(ContractFns.getDeployedStableSwapContract(testChainId1)).to.be.deep.equal({
        address: testAddress,
        abi: ["fakeAbi()"],
      });
    });

    it("happy case: should return the staging stableswap contract", () => {
      contractDeploymentStub.returns(contractDeployment);
      expect(ContractFns.getDeployedStableSwapContract(testChainId1, "Staging")).to.be.deep.equal({
        address: testAddressStaging,
        abi: ["fakeAbi()"],
      });
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
      expect(interfaceInstance.encodeFunctionData("owner")).to.be.equal("0x8da5cb5b");
    });
  });

  afterEach(() => {
    restore();
    reset();
  });
});

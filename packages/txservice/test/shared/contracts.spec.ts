import { expect } from "chai";
import { reset, restore, stub } from "sinon";
import * as contracts from "../../src/shared/contracts";
import { ConnextPriceOracle as TConnextPriceOracle } from "@connext/nxtp-contracts/typechain";

describe("Contracts", () => {
  let testChainId1 = 1336;
  let testChainId2 = 1337;
  let testAddress = "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  let contractDeployment: any;

  beforeEach(() => {
    contractDeployment = {
      [String(testChainId1)]: {
        test: {
          name: "test",
          chainId: testChainId1,
          contracts: {
            ConnextPriceOracle: {
              address: testAddress,
              abi: [],
            },
          },
        },
      },
    };
  });

  describe("#getDeployedPriceOracleContract", () => {
    beforeEach(() => {
      stub(contracts, "getContractDeployments").returns(contractDeployment);
    });

    it("should be undefined for unknown chainId", async () => {
      expect(contracts.getDeployedPriceOracleContract(testChainId2)).to.be.equal(undefined);
    });

    it("should be same as test", async () => {
      let oracleContract = contracts.getDeployedPriceOracleContract(testChainId1);
      expect(oracleContract.address).to.be.equal(testAddress);
      expect(oracleContract.abi.length).to.be.equal(0);
    });

    afterEach(() => {
      restore();
      reset();
    });
  });
});

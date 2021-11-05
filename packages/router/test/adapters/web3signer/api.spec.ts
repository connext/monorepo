import axios from "axios";
import Sinon, { reset, restore, SinonStub } from "sinon";

import { expect, getRandomBytes32 } from "@connext/nxtp-utils";

import { Web3SignerApi } from "../../../src/adapters/web3signer/api";

let axiosGetStub: SinonStub;
let axiosPostStub: SinonStub;
let web3SignerApi: Web3SignerApi;
let mockResponseValue: any;

describe("Web3SignerApi", () => {
  beforeEach(() => {
    mockResponseValue = {
      data: [
        {
          test: getRandomBytes32(),
        },
      ],
    };

    axiosGetStub = Sinon.stub(axios, "get").resolves(mockResponseValue);
    axiosPostStub = Sinon.stub(axios, "post").resolves(mockResponseValue);

    web3SignerApi = new Web3SignerApi("test-fake-url");
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#sign", () => {
    it("should call the sign method on the web3 signer", async () => {
      const id = "testid";
      const testData = getRandomBytes32();
      const result = await web3SignerApi.sign(id, testData);
      expect(result).to.deep.eq(mockResponseValue.data);
      expect(axiosPostStub.callCount).to.eq(1);
      const expectedUrl = (web3SignerApi as any).formatUrl((Web3SignerApi as any).ENDPOINTS.SIGN, id);
      expect(axiosPostStub.getCall(0).args).to.deep.eq([expectedUrl, { data: testData }]);
    });
  });

  describe("#reload", () => {
    it("happy", async () => {
      const result = await web3SignerApi.reload();
      expect(result).to.deep.eq(mockResponseValue.data[0]);
      expect(axiosPostStub.callCount).to.eq(1);
      const expectedUrl = (web3SignerApi as any).formatUrl((Web3SignerApi as any).ENDPOINTS.RELOAD);
      expect(axiosPostStub.getCall(0).args).to.deep.eq([expectedUrl]);
    });
  });

  describe("#getServerStatus", () => {
    it("happy", async () => {
      const result = await web3SignerApi.getServerStatus();
      expect(result).to.deep.eq(mockResponseValue.data[0]);
      expect(axiosGetStub.callCount).to.eq(1);
      const expectedUrl = (web3SignerApi as any).formatUrl((Web3SignerApi as any).ENDPOINTS.SERVER_STATUS);
      expect(axiosGetStub.getCall(0).args).to.deep.eq([expectedUrl]);
    });
    
  });

  describe("#getPublicKey", () => {
    it("happy", async () => {
      const result = await web3SignerApi.getPublicKey();
      expect(result).to.deep.eq(mockResponseValue.data[0]);
      expect(axiosGetStub.callCount).to.eq(1);
      const expectedUrl = (web3SignerApi as any).formatUrl((Web3SignerApi as any).ENDPOINTS.PUBLIC_KEY);
      expect(axiosGetStub.getCall(0).args).to.deep.eq([expectedUrl]);
    });
  });

  describe("#formatUrl", () => {
    it("should format the url correctly", () => {
      const testUrl = getRandomBytes32() + "test-fake-url";
      (web3SignerApi as any).url = testUrl;
      const testEndpoint = "test-endpoint";
      const expectedUrl = testUrl + "/" + testEndpoint;
      const formattedUrl = (web3SignerApi as any).formatUrl(testEndpoint);
      expect(formattedUrl).to.eq(expectedUrl);
    });

    it("should handle identifier", () => {
      const testIdentifier = "test-identifier"
      const testUrl = getRandomBytes32() + "test-fake-url";
      (web3SignerApi as any).url = testUrl;
      const testEndpoint = "test-endpoint";
      const expectedUrl = testUrl + "/" + testEndpoint + "/" + testIdentifier;
      const formattedUrl = (web3SignerApi as any).formatUrl(testEndpoint, testIdentifier);
      expect(formattedUrl).to.eq(expectedUrl);
    });
  })
});

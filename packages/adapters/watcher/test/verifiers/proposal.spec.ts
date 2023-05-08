import { expect } from "chai";
import { providers, utils } from "ethers";
import {
  createStubInstance,
  SinonStubbedInstance,
  stub,
  match,
  restore,
  fake,
  SinonStub,
  SinonSpy,
  replace,
} from "sinon";
import { ProposedData, VerifierContext } from "../../src/types";
import { Logger, createRequestContext, domainToChainId, mkRandomBytes32, mkRandomAddress } from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";
import { ProposedRootVerifier } from "../../src/verifiers";
import { EMPTY_ROOT } from "../../src/helpers/constants";
import { hexZeroPad, hexlify } from "ethers/lib/utils";
import { generateFakeProposedData, generateRandomNumberString } from "../utils";

describe.only("Watcher Adapter: ProposedRootVerifier", () => {
  let context: VerifierContext;
  let hubDomain: number;
  let hubProvider: SinonStubbedInstance<providers.JsonRpcProvider>;
  let verifier: ProposedRootVerifier;
  let rootManager: any;
  let hubDomainChainId: number;
  let requestContext = createRequestContext("Monitor Adapter: Proposal tests");
  const SAMPLE_EVENT_FILTER = "TEST_FILTER";

  const proposedData = generateFakeProposedData();
  const spokeConnectorAbi = [
    "function snapshotRoots(uint256) view returns (bytes32)",
    "function outboundRoot() view returns (bytes32)",
  ];
  const spokeConnector1 = {
    address: mkRandomAddress(),
    abi: spokeConnectorAbi,
  };
  const spokeConnector2 = {
    address: mkRandomAddress(),
    abi: spokeConnectorAbi,
  };

  beforeEach(() => {
    const logger = createStubInstance(Logger);
    const txservice: SinonStubbedInstance<TransactionService> = createStubInstance(TransactionService);

    context = {
      domains: [],
      logger,
      txservice,
      isStaging: true,
    };
    hubDomain = 1735353714; // goerli
    hubProvider = createStubInstance(providers.JsonRpcProvider);

    verifier = new ProposedRootVerifier(context, hubDomain, hubProvider);

    rootManager = {
      address: "0x1337",
      filters: {
        AggregateRootProposed: stub(),
      },
      queryFilter: stub(),
    };

    hubDomainChainId = 1;
    requestContext = {
      id: "1",
      origin: "1",
    };
  });

  afterEach(() => {
    restore(); // This will restore all stubs after each test case
  });

  describe("getProposedData", () => {
    const NO_VALID_EVENTS_ERROR = "No valid events found for root proposal";

    it("should log an error and throw if the queryFilter fails", async () => {
      // Set variables
      const errorMessage = "Random crazy error";
      const logMessage = "Failed when getting the latest proposed aggregate root";

      // Mock behavior of internal functions
      rootManager.filters.AggregateRootProposed.returns(SAMPLE_EVENT_FILTER);
      rootManager.queryFilter.withArgs(SAMPLE_EVENT_FILTER).throws(new Error(errorMessage));

      const loggerSpy = verifier.context.logger.error as SinonStub;

      await expect(verifier.getProposedData(rootManager, hubDomainChainId, requestContext)).to.be.rejectedWith(
        errorMessage,
      );
      // expect logger to be called with an error
      expect(loggerSpy).to.have.been.calledOnceWith(logMessage);
    });

    it("should throw an error if no valid events are found", async () => {
      // Mock behavior of internal functions
      rootManager.filters.AggregateRootProposed.returns(SAMPLE_EVENT_FILTER);
      rootManager.queryFilter.withArgs(SAMPLE_EVENT_FILTER).resolves([]);

      await expect(verifier.getProposedData(rootManager, hubDomainChainId, requestContext)).to.be.rejectedWith(
        NO_VALID_EVENTS_ERROR,
      );
    });

    it("should throw an error if event doesnt have arguments", async () => {
      // Set variables
      const eventFilter = SAMPLE_EVENT_FILTER;
      const eventsWithoutArgs = [
        {
          blockNumber: 10,
        },
        {
          blockNumber: 20,
        },
      ];

      // Mock behavior of internal functions
      rootManager.filters.AggregateRootProposed.returns(eventFilter);
      rootManager.queryFilter.withArgs(eventFilter).resolves(eventsWithoutArgs);

      await expect(verifier.getProposedData(rootManager, hubDomainChainId, requestContext)).to.be.rejectedWith(
        NO_VALID_EVENTS_ERROR,
      );
    });

    it("should return the latest proposed data", async () => {
      // Set variables
      const eventFilter = SAMPLE_EVENT_FILTER;
      const events = [
        {
          blockNumber: 10,
          args: generateFakeProposedData(),
        },
        {
          blockNumber: 20,
          args: generateFakeProposedData(),
        },
      ];
      const expectedReturn = events[1].args; // Using the latest event

      // Mock behavior of internal functions
      rootManager.filters.AggregateRootProposed.returns(eventFilter);
      rootManager.queryFilter.withArgs(eventFilter).resolves(events);

      // Call function
      const proposedData = await verifier.getProposedData(rootManager, hubDomainChainId, requestContext);

      // Expectations
      expect(proposedData).to.deep.equal(expectedReturn);
    });
  });

  describe("getSnapshotRootForDomain", () => {
    it("should return the correct root", async () => {
      const snapshootId = generateRandomNumberString(1, 1000);
      const domain = generateRandomNumberString(1, 1000);
      const randomRoot = mkRandomBytes32();
      const spokeConnectorAddress = mkRandomAddress();

      const txservice = context.txservice as SinonStubbedInstance<TransactionService>;
      const spokeConnectorInterface = new utils.Interface(spokeConnectorAbi as string[]);

      const encodedData = utils.defaultAbiCoder.encode(["bytes32"], [randomRoot]);
      txservice.readTx.resolves(encodedData);

      const root = await (verifier as any).getSnapshotRootForDomain(
        snapshootId,
        spokeConnectorAddress,
        spokeConnectorInterface,
        domain,
      );

      expect(root).to.be.equal(randomRoot);
    });
  });

  describe("checkInvariant", () => {
    let getRootManagerContractFake: SinonSpy<[], any>;
    let getProposedDataFake: SinonSpy<[], any>;
    let checkDisputeTimeFinalizationFake: SinonSpy<[], any>;
    let getSpokeConnectorDataFake: SinonSpy<[], any>;
    let getSnapshotRootsFake: SinonSpy<[], any>;
    let insertVirtualLeavesFake: SinonSpy<[], any>;
    let proposedData: ProposedData;

    before(() => (proposedData = generateFakeProposedData()));

    // beforeEach is necessary to reset the fakes
    beforeEach(() => {
      // Create necessary fakes for the tests
      getRootManagerContractFake = fake(() => rootManager);
      getProposedDataFake = fake(() => proposedData);
      getSpokeConnectorDataFake = fake(() => []);
      getSnapshotRootsFake = fake(() => []);
    });

    it("should return false if the proposed root matches the virtual root", async () => {
      // Create necessary fakes for the function to reach the specific path we are testing
      checkDisputeTimeFinalizationFake = fake(() => false);
      insertVirtualLeavesFake = fake(() => proposedData.aggregateRoot);

      // Replace the functions called in checkInvariant with the fakes
      replace(verifier, <any>"getRootManagerContract", getRootManagerContractFake);
      replace(verifier, "getProposedData", getProposedDataFake);
      replace(verifier, <any>"checkDisputeTimeFinalization", checkDisputeTimeFinalizationFake);
      replace(verifier, <any>"getSpokeConnectorData", getSpokeConnectorDataFake);
      replace(verifier, "getSnapshotRoots", getSnapshotRootsFake);
      replace(verifier, <any>"insertVirtualLeaves", insertVirtualLeavesFake);

      // Call checkInvariant
      const result = await verifier.checkInvariant(requestContext);

      // Define what we expect the result to be
      const expectedResult = {
        needsAction: false,
        reason: "Proposed root matches virtual root",
      };

      // Get the chain id of the hub domain (just to match the arguments exactly)
      const hubDomainChainId = domainToChainId(hubDomain);

      // Expect the result to be what we expect
      expect(result).to.deep.eq(expectedResult);

      // Expect the fakes to have been called with the correct arguments and the correct amount of times
      expect(getRootManagerContractFake).to.have.been.calledOnceWith(hubDomainChainId);
      expect(getProposedDataFake).to.have.been.calledOnceWith(rootManager, hubDomainChainId, requestContext);
      expect(checkDisputeTimeFinalizationFake).to.have.been.calledOnceWith(+proposedData.endOfDispute);
      expect(getSpokeConnectorDataFake).to.have.been.calledTwice;
      expect(getSnapshotRootsFake).to.have.been.calledOnceWith(proposedData, [[], []]);
      expect(insertVirtualLeavesFake).to.have.been.calledOnceWith([]);
    });

    it("should return true if the proposed root does not match the virtual root", async () => {
      // Create a random root for virtual root
      let virtualRoot = mkRandomBytes32();

      // We want to ensure that the proposed root is not the same as the virtual root for this path
      if (virtualRoot === proposedData.aggregateRoot) {
        virtualRoot = mkRandomBytes32();
      }

      // Create necessary fakes for the function to reach the specific path we are testing
      checkDisputeTimeFinalizationFake = fake(() => false);
      insertVirtualLeavesFake = fake(() => virtualRoot);

      // Replace the functions called in checkInvariant with the fakes
      replace(verifier, <any>"getRootManagerContract", getRootManagerContractFake);
      replace(verifier, "getProposedData", getProposedDataFake);
      replace(verifier, <any>"checkDisputeTimeFinalization", checkDisputeTimeFinalizationFake);
      replace(verifier, <any>"getSpokeConnectorData", getSpokeConnectorDataFake);
      replace(verifier, "getSnapshotRoots", getSnapshotRootsFake);
      replace(verifier, <any>"insertVirtualLeaves", insertVirtualLeavesFake);

      // Call checkInvariant
      const result = await verifier.checkInvariant(requestContext);

      // Define what we expect the result to be
      const expectedResult = {
        needsAction: true,
        reason: `proposedRoot: ${proposedData.aggregateRoot} is different than virtualRoot: ${virtualRoot}`,
      };

      // Get the chain id of the hub domain (just to match the arguments exactly)
      const hubDomainChainId = domainToChainId(hubDomain);

      // Expect the result to be what we expect
      expect(result).to.deep.eq(expectedResult);

      // Expect the fakes to have been called with the correct arguments and the correct amount of times
      expect(getRootManagerContractFake).to.have.been.calledOnceWith(hubDomainChainId);
      expect(getProposedDataFake).to.have.been.calledOnceWith(rootManager, hubDomainChainId, requestContext);
      expect(checkDisputeTimeFinalizationFake).to.have.been.calledOnceWith(+proposedData.endOfDispute);
      expect(getSpokeConnectorDataFake).to.have.been.calledTwice;
      expect(getSnapshotRootsFake).to.have.been.calledOnceWith(proposedData, [[], []]);
      expect(insertVirtualLeavesFake).to.have.been.calledOnceWith([]);
    });

    it("should return false if the dispute time for the proposed root has finalized", async () => {
      // Create necessary fakes for the function to reach the specific path we are testing
      checkDisputeTimeFinalizationFake = fake(() => true);

      // Replace the functions called in checkInvariant with the fakes
      replace(verifier, <any>"getRootManagerContract", getRootManagerContractFake);
      replace(verifier, "getProposedData", getProposedDataFake);
      replace(verifier, <any>"checkDisputeTimeFinalization", checkDisputeTimeFinalizationFake);

      // Call checkInvariant
      const result = await verifier.checkInvariant(requestContext);

      // Define what we expect the result to be
      const expectedResult = {
        needsAction: false,
        reason: `Dispute time for root ${proposedData.aggregateRoot} is already over`,
      };

      // Get the chain id of the hub domain (just to match the arguments exactly)
      const hubDomainChainId = domainToChainId(hubDomain);

      // Expect the result to be what we expect
      expect(result).to.deep.eq(expectedResult);

      // Expect the fakes to have been called with the correct arguments and the correct amount of times
      expect(getRootManagerContractFake).to.have.been.calledOnceWith(hubDomainChainId);
      expect(getProposedDataFake).to.have.been.calledOnceWith(rootManager, hubDomainChainId, requestContext);
      expect(checkDisputeTimeFinalizationFake).to.have.been.calledOnceWith(+proposedData.endOfDispute);
    });
  });

  describe("getSnapshotRoots", () => {
    it("should return an array of snapshot roots for the given spoke connectors", async () => {
      // Set variables
      const getSnapshotRootForDomainStub = stub(verifier, <any>"getSnapshotRootForDomain");

      // Mock behavior of internal functions
      getSnapshotRootForDomainStub
        .withArgs(proposedData.snapshotId, spokeConnector1.address, match.any, +proposedData.domains[0])
        .resolves("0xroot1");

      getSnapshotRootForDomainStub
        .withArgs(proposedData.snapshotId, spokeConnector2.address, match.any, +proposedData.domains[1])
        .resolves("0xroot2");

      // Call function
      const snapshotRoots = await verifier.getSnapshotRoots(proposedData, [spokeConnector1, spokeConnector2]);

      // Expectations
      expect(snapshotRoots).to.deep.equal(["0xroot1", "0xroot2"]);
      expect(getSnapshotRootForDomainStub.calledTwice).to.be.true;
    });

    it("should call getOutboundRoot when getSnapshotRootForDomain returns EMPTY_ROOT", async () => {
      // Set Variables
      const nonEmptyRoot = mkRandomBytes32();
      const outboundRoot = mkRandomBytes32();

      const getSnapshotRootForDomainStub = stub(verifier, <any>"getSnapshotRootForDomain");

      // Mock behavior of internal functions
      getSnapshotRootForDomainStub
        .withArgs(proposedData.snapshotId, spokeConnector1.address, match.any, +proposedData.domains[0])
        .resolves(EMPTY_ROOT);

      getSnapshotRootForDomainStub
        .withArgs(proposedData.snapshotId, spokeConnector2.address, match.any, +proposedData.domains[1])
        .resolves(nonEmptyRoot);

      const getOutboundRootStub = stub(verifier, <any>"getOutboundRoot")
        .withArgs(spokeConnector1.address, match.any, 1)
        .resolves(outboundRoot);

      // Call function
      const snapshotRoots = await verifier.getSnapshotRoots(proposedData, [spokeConnector1, spokeConnector2]);

      // Expecations
      expect(snapshotRoots).to.deep.equal([outboundRoot, nonEmptyRoot]);

      expect(getOutboundRootStub.calledOnce).to.be.true;
      expect(getSnapshotRootForDomainStub.calledTwice).to.be.true;
    });
  });

  describe("insertVirtualLeaves", () => {
    it("should decode the data properly", async () => {
      // Set variables
      const { aggregateRoot: expectedVirtualRoot, returnData } = generateFakeReturnData();
      const data = [mkRandomBytes32()];

      // Mock behavior of internal functions
      hubProvider.call.resolves(returnData);

      // Call function
      const virtualRoot = await (verifier as any).insertVirtualLeaves(data);

      // Expectations
      expect(virtualRoot).to.equal(expectedVirtualRoot);
    });
  });
  describe("checkDisputeTimeFinalization", () => {
    const END_OF_DISPUTE = 1000;

    it("should return true if current block is greater than endOfDispute", async () => {
      hubProvider.getBlockNumber.resolves(END_OF_DISPUTE + 1);
      const isDisputeTimeFinalized = await (verifier as any).checkDisputeTimeFinalization(END_OF_DISPUTE);
      expect(isDisputeTimeFinalized).to.be.true;
    });

    it("should return true if current block is equal than endOfDispute", async () => {
      hubProvider.getBlockNumber.resolves(END_OF_DISPUTE);
      const isDisputeTimeFinalized = await (verifier as any).checkDisputeTimeFinalization(END_OF_DISPUTE);
      expect(isDisputeTimeFinalized).to.be.true;
    });

    it("should return false if current block is lesset than endOfDispute", async () => {
      hubProvider.getBlockNumber.resolves(END_OF_DISPUTE - 1);
      const isDisputeTimeFinalized = await (verifier as any).checkDisputeTimeFinalization(END_OF_DISPUTE);
      expect(isDisputeTimeFinalized).to.be.false;
    });
  });

  describe("getOutboundRoot", () => {
    it("should return the corrent outboundRoot", async () => {
      // Set variables
      const domain = generateRandomNumberString(1, 1000);
      const snapshotRoot = mkRandomBytes32();
      const spokeConnectorAddress = mkRandomAddress();

      const txservice = context.txservice as SinonStubbedInstance<TransactionService>;
      const spokeConnectorInterface = new utils.Interface(spokeConnectorAbi as string[]);

      const encodedData = utils.defaultAbiCoder.encode(["bytes32"], [snapshotRoot]);

      // Mock behavior of internal functions
      txservice.readTx.resolves(encodedData);

      // Call function
      const root = await (verifier as any).getOutboundRoot(spokeConnectorAddress, spokeConnectorInterface, domain);

      expect(root).to.be.equal(snapshotRoot);
    });
  });
});

type FakeReturnData = {
  aggregateRoot: string;
  returnData: string;
};

function generateFakeReturnData(): FakeReturnData {
  let fakeTree = "0x";
  let newRoot = "";
  const count = hexZeroPad(hexlify(+generateRandomNumberString(1, 200)), 32);
  const root = mkRandomBytes32();
  for (let i = 0; i < 32; i++) {
    newRoot = mkRandomBytes32();
    fakeTree = fakeTree.concat(newRoot.slice(2));
  }
  const returnData = fakeTree.concat(count.slice(2)).concat(root.slice(2));
  return {
    aggregateRoot: root,
    returnData,
  };
}

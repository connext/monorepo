import { createLoggingContext, jsonifyError, RequestContext, domainToChainId } from "@connext/nxtp-utils";
import { Contract, providers, utils } from "ethers";

import { ProposedData, Verifier, VerifierContext, VerifyResponse } from "../types";
import { virtualTreeBytecode } from "../bytecodes";
import { EMPTY_ROOT } from "../helpers/constants";

export class ProposedRootVerifier extends Verifier {
  constructor(
    context: VerifierContext,
    private readonly hubDomain: number,
    private readonly hubProvider: providers.JsonRpcProvider,
  ) {
    super(context);
  }

  /**
   * @notice Validate whether the proposed aggregate root is correct.
   * @dev Should compare the proposed aggregate root to the virtual aggregate root. If
   * the invariant is violated, should return a value to indicate that the caller/consumer should escalate.
   *
   * @returns object - Whether the invariant was verified. `true` if propose was verified (no switch needed).
   * `false` if the invariant was violated (switch is needed)! If false, a reason is included in the response object.
   */
  public override async checkInvariant(requestContext: RequestContext): Promise<VerifyResponse> {
    // get root manager contract of the hub domain chain
    const hubDomainChainId = domainToChainId(this.hubDomain);
    const rootManagerContract = this.getRootManagerContract(hubDomainChainId);

    // get proposed data from root manager contract
    const proposedData = await this.getProposedData(rootManagerContract, hubDomainChainId, requestContext);
    const { aggregateRoot: proposedRoot } = proposedData;

    // stop check execution if the proposed root dispute period has elapsed
    const isDisputeTimeOver = await this.checkDisputeTimeFinalization(+proposedData.endOfDispute);
    if (isDisputeTimeOver) {
      return {
        needsAction: false,
        reason: `Dispute time for root ${proposedRoot} is already over`,
      };
    }

    // get snapshot roots from spoke connectors and insert them into the virtual tree to generate the virtual root
    const spokeConnectors = proposedData.domains.map((domain) => this.getSpokeConnectorData(+domain));
    const snapshotRoots = await this.getSnapshotRoots(proposedData, spokeConnectors);
    const virtualRoot = await this.insertVirtualLeaves(snapshotRoots);

    // Invariant: proposedRoot == virtualRoot
    // Compare virtual root with proposed root and return if action is needed or not
    if (virtualRoot !== proposedRoot) {
      return {
        needsAction: true,
        reason: `proposedRoot: ${proposedRoot} is different than virtualRoot: ${virtualRoot}`,
      };
    }
    return {
      needsAction: false,
      reason: "Proposed root matches virtual root",
    };
  }

  /**
   * @notice Get the latest proposed aggregate root in the RootManager contract at a given snapshot.
   * @param rootManager - Root Manager contract instance.
   * @param hubDomainChainId - The hub domain chain id.
   * @param requestContext - The request context.
   * @returns ProposedData representing the data emitted by the last AggregateRootProposed event.
   */
  public async getProposedData(
    rootManager: Contract,
    hubDomainChainId: number,
    requestContext: RequestContext,
  ): Promise<ProposedData> {
    const { methodContext } = createLoggingContext(this.getProposedData.name);

    // It's important to ensure the provider doesn't have a block-limit to fetch block from, otherwise we must add a contraint
    // in the toBlock and fromBlock optional parameters of rootManagerInstance.queryFilter

    try {
      // create a filter to get the latest proposed root event
      const eventFilter = rootManager.filters.AggregateRootProposed();
      const events = await rootManager.queryFilter(eventFilter);

      // sort events by block number to get the latest proposed root
      const [latestProposedRootEvent] = events.sort((a, b) => b.blockNumber - a.blockNumber);

      if (!latestProposedRootEvent?.args) {
        throw new Error(`No valid events found for root proposal`);
      }

      return latestProposedRootEvent.args as unknown as ProposedData;
    } catch (error: any) {
      this.context.logger.error(
        "Failed when getting the latest proposed aggregate root",
        requestContext,
        methodContext,
        jsonifyError(error as Error),
        {
          domain: this.hubDomain,
          chainId: hubDomainChainId,
          rootManager: rootManager.address,
        },
      );
      throw error;
    }
  }

  /**
   * @notice Get the virtual aggregate root.
   * @param proposedData - ProposedData the data returned by the last AggregateRootProposed event.
   * @param spokeConnectors - List of every spoke connector instance for every domain used in the propose.
   * @returns string representing the virtual root.
   */
  public async getSnapshotRoots(
    proposedData: ProposedData,
    spokeConnectors: { address: string; abi: any }[],
  ): Promise<string[]> {
    // Get the snapshot roots from domains. We parallelize the calls to the spoke connectors.
    const snapshotRoots = await Promise.all(
      spokeConnectors.map(async (spokeConnector, i) => {
        // spokeConnectors are ordered by domain, so we can use the index to get the domain
        const domain = +proposedData.domains[i];
        const spokeConnectorInterface = new utils.Interface(spokeConnector.abi as string[]);
        let snapshotRoot = await this.getSnapshotRootForDomain(
          proposedData.snapshotId,
          spokeConnector.address,
          spokeConnectorInterface,
          domain,
        );

        // If the snapshot root is empty, we need to get the root from `getOutboundRoot` method
        if (snapshotRoot == EMPTY_ROOT) {
          snapshotRoot = await this.getOutboundRoot(spokeConnector.address, spokeConnectorInterface, domain);
        }

        // push the snapshot root to the array
        return snapshotRoot;
      }),
    );

    return snapshotRoots;
  }

  /**
   * @notice Uses the batching method to get the latest aggregate root from the MerkleTreeManager and inserts each snapshot root of each domain to get the correct virtual aggregate root
   * @param leaves - Array of the snapshoot roots of each domain. Its order must follow the order of the domains emitted in the AggregateRootProposed event.
   * @return virtualRoot The virtual aggregate root computed after the insertion of the leaves
   */
  private async insertVirtualLeaves(leaves: string[]): Promise<string> {
    // Encoded input data to be sent to the batch contract constructor
    const hubDomainChainId = domainToChainId(this.hubDomain);
    const merkleTreeManager = this.getMerkleTreeManagerOfRootManagerDeployment(hubDomainChainId);

    const inputData = utils.defaultAbiCoder.encode(["address", "bytes32[]"], [merkleTreeManager.address, leaves]);

    // Generate payload from input data
    const payload = virtualTreeBytecode.concat(inputData.slice(2));

    // Call the deployment transaction with the payload
    const returnedData = await this.hubProvider.call({ data: payload });

    // Parse the returned value: [tree, root]
    const [decoded] = utils.defaultAbiCoder.decode(["tuple(tuple(bytes32[32], uint256), bytes32)"], returnedData);

    const virtualRoot = decoded[1];
    return virtualRoot;
  }

  /**
   * @notice Checks whether the time to dispute the latest proposed root has concluded or not
   * @param endOfDispute - The time at which the disputes for the latest proposed root ends
   * @return isDisputeTimeOver Whether the time to dispute the latest proposed has concluded or not
   */
  private async checkDisputeTimeFinalization(endOfDispute: number): Promise<boolean> {
    const blockNumber = await this.hubProvider.getBlockNumber();
    const isDisputeTimeOver = blockNumber >= endOfDispute;
    return isDisputeTimeOver;
  }

  /**
   * @notice Gets the snapshot root for a given snapshotId in a given domain
   * @param snapshotId - The id of the snapshot root we are going to fetch
   * @param spokeConnectorAddress - The address of the spoke connector in the given domain
   * @param spokeConnectorInterface - The interface of the spokeConnector
   * @return snapshotRoot The snapshot root for the given snapshotId
   */
  private async getSnapshotRootForDomain(
    snapshotId: string,
    spokeConnectorAddress: string,
    spokeConnectorInterface: utils.Interface,
    domain: number,
  ): Promise<string> {
    const snapshotRootCalldata = spokeConnectorInterface.encodeFunctionData("snapshotRoots(uint256)", [snapshotId]);

    const snapshotRootRes = await this.context.txservice.readTx({
      domain: domain,
      to: spokeConnectorAddress,
      data: snapshotRootCalldata,
    });

    const [snapshotRoot] = spokeConnectorInterface.decodeFunctionResult("snapshotRoots(uint256)", snapshotRootRes);
    return snapshotRoot;
  }

  /**
   * @notice Gets the outboundRoot of a given spoke connector in a given domain
   * @param spokeConnectorAddress - The address of the spoke connector in the given domain
   * @param spokeConnectorInterface - The interface of the spokeConnector
   * @return outboundRoot The outbound root for the given spoke connetor in the given domain
   */
  private async getOutboundRoot(
    spokeConnectorAddress: string,
    spokeConnectorInterface: utils.Interface,
    domain: number,
  ): Promise<string> {
    const outboundRootCalldata = spokeConnectorInterface.encodeFunctionData("outboundRoot()", []);

    const outboundRootRes = await this.context.txservice.readTx({
      domain: domain,
      to: spokeConnectorAddress,
      data: outboundRootCalldata,
    });

    let [outboundRoot] = spokeConnectorInterface.decodeFunctionResult("outboundRoot()", outboundRootRes);
    return outboundRoot;
  }

  /**
   * @notice Instantiates an instance of RootManager's contract
   * @param chainId - The chainId of the chain where the RootManager is located
   * @return rootManagerContract - The instance of the RootManager contract
   */
  private getRootManagerContract(chainId: number): Contract {
    const rootManager = this.getRootManagerDeployment(chainId);
    const rootManagerContract = new Contract(rootManager.address, rootManager.abi, this.hubProvider);
    return rootManagerContract;
  }

  /**
   * @notice Gets an instance of a spoke connector instance
   * @param domain - The domain number where the spoke connector to instantiate is located
   * @return spokeConnector - An object containing the abi and address of the spoke connector of the given domain
   */
  private getSpokeConnectorData(domain: number): { address: string; abi: any } {
    const chainId = domainToChainId(domain);
    const spokeConnector = this.getSpokeConnectorDeployment(chainId);
    return spokeConnector;
  }
}

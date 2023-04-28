import { createLoggingContext, jsonifyError, RequestContext, domainToChainId } from "@connext/nxtp-utils";
import { Contract, providers, utils } from "ethers";

import { ProposedData, Verifier, VerifierContext, VerifyResponse } from "../types";
import { virtualTreeBytecode } from "../bytecodes";

export class ProposedRootVerifier extends Verifier {
  constructor(context: VerifierContext, private readonly hubDomain: string) {
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
  public override async checkInvariant(_requestContext: RequestContext): Promise<VerifyResponse> {
    const proposedData = await this.getProposedData(this.hubDomain, _requestContext);
    const virtualRoot = await this.getVirtualRoot(proposedData, _requestContext);
    const { proposedRoot } = proposedData;
    // Invariant: proposedRoot == virtualRoot
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
   * @param hubDomain - The hub domain.
   * @returns ProposedData representing the data emitted by the last AggregateRootProposed event.
   */
  public async getProposedData(hubDomain: string, requestContext: RequestContext): Promise<ProposedData> {
    const { methodContext } = createLoggingContext(this.getProposedData.name);

    // TODO: check with preetham how they handle this--this requires the RPC from the config
    // It's important to ensure the provider doesn't have a block-limit to fetch block from, otherwise we must add a contraint
    // in the toBlock and fromBlock optional parameters of rootManagerInstance.queryFilter
    const provider = providers.getDefaultProvider();
    const chainId = domainToChainId(+hubDomain);
    const rootManager = this.getRootManagerDeployment(chainId);

    const rootManagerInterface = new utils.Interface(rootManager.abi as string[]);
    const rootManagerInstance = new Contract(rootManager.address, rootManager.abi, provider);

    const getSnapshotDurationCalldata = rootManagerInterface.encodeFunctionData("getSnapshotDuration");

    try {
      const getSnapshotDuration = await this.context.txservice.readTx({
        domain: +hubDomain,
        to: rootManager.address,
        data: getSnapshotDurationCalldata,
      });

      // Note: a custom abi could be used for the event if necessary.

      const block = await provider.getBlock("latest");
      const [snapshotDuration] = rootManagerInterface.decodeFunctionResult("getSnapshotDuration", getSnapshotDuration);
      this.context.logger.debug("Queried for snapshot duration", requestContext, methodContext, {
        domain: +hubDomain,
        chainId,
        rootManager: rootManager.address,
        data: getSnapshotDurationCalldata,
        result: snapshotDuration,
      });

      const snapshotId = Math.floor(block.timestamp / Number(snapshotDuration));

      const snapshotIdFilter = rootManagerInstance.filters.AggregateRootProposed(snapshotId);
      const events = await rootManagerInstance.queryFilter(snapshotIdFilter);

      if (events.length == 0) {
        throw new Error(`No event found with snapshotId: ${snapshotId}`);
      }

      const latestProposedRootEvent = events.sort((a, b) => b.blockNumber - a.blockNumber)[0];
      if (!latestProposedRootEvent.args) {
        throw new Error(
          "An error ocurred fetching the latestProposedRoot from the events. Check the event abi and filter are correct",
        );
      }

      // TODO: check if this works correctly. If aggregateRoot is inexistent in the filter we can a custom event abi.
      const proposedData: ProposedData = {
        snapshotId: latestProposedRootEvent.args.snapshotId,
        endOfDispute: latestProposedRootEvent.args.endOfDispute,
        proposedRoot: latestProposedRootEvent.args.aggregateRoot,
        baseRoot: latestProposedRootEvent.args.baseRoot,
        snapshotRoots: latestProposedRootEvent.args.snapshotRoots,
        domains: latestProposedRootEvent.args.domains,
      };
      return proposedData;
    } catch (error: any) {
      this.context.logger.error(
        "Failed when getting the latest proposed aggregate root",
        requestContext,
        methodContext,
        jsonifyError(error as Error),
        {
          domain: +hubDomain,
          chainId,
          rootManager: rootManager.address,
        },
      );
      throw error;
    }
  }

  /**
   * @notice Get the virtual aggregate root.
   * @param proposedData - ProposedData the data returned by the last AggregateRootProposed event.
   * @returns string representing the virtual root.
   */
  public async getVirtualRoot(proposedData: ProposedData, requestContext: RequestContext): Promise<string> {
    const { methodContext } = createLoggingContext(this.getVirtualRoot.name);

    const snapshotRoots = await Promise.all(
      proposedData.domains.map(async (domain) => {
        const chainId = domainToChainId(+domain);
        const spokeConnector = this.getSpokeConnectorDeployment(chainId);
        const spokeConnectorInterface = new utils.Interface(spokeConnector.abi as string[]);
        const snapshotRootCalldata = spokeConnectorInterface.encodeFunctionData("snapshotRoots(uint256)", [
          proposedData.snapshotId,
        ]);

        const snapshotRootRes = await this.context.txservice.readTx({
          domain: +domain,
          to: spokeConnector.address,
          data: snapshotRootCalldata,
        });

        let [snapshotRoot] = spokeConnectorInterface.decodeFunctionResult("snapshotRoots(uint256)", snapshotRootRes);

        // TODO: check typeof return value
        if (snapshotRoot === "0") {
          const snapshotRootCalldata = spokeConnectorInterface.encodeFunctionData("outboundRoot()", []);

          const snapshotRootRes = await this.context.txservice.readTx({
            domain: +domain,
            to: spokeConnector.address,
            data: snapshotRootCalldata,
          });

          [snapshotRoot] = spokeConnectorInterface.decodeFunctionResult("outboundRoot()", snapshotRootRes);
        }

        return snapshotRoot;
      }),
    );

    try {
      const aggregateRoot = await this.insertVirtualLeaves(snapshotRoots);
      return aggregateRoot;
    } catch (error) {
      this.context.logger.error(
        "Failed inserting leaves in virtual tree",
        requestContext,
        methodContext,
        jsonifyError(error as Error),
      );

      throw new Error("Failed inserting leaves in virtual tree");
    }
  }

  /**
   * @notice Uses the batching method to get the latest aggregate root from the MerkleTreeManager and inserts each snapshot root of each domain to get the correct virtual aggregate root
   * @param leaves - Array of the snapshoot roots of each domain. Its order must follow the order of the domains emitted in the AggregateRootProposed event.
   * @return virtualRoot The virtual aggregate root computed after the insertion of the leaves
   */
  private async insertVirtualLeaves(leaves: string[]): Promise<string> {
    // TODO: check with preetham how they handle this--this requires the RPC from the config
    // we are using this provider across this methods quite a bit, passing it as an arguments could make sense
    const provider = providers.getDefaultProvider();

    // Encoded input data to be sent to the batch contract constructor
    // TODO: find a way to get the merkle manager contract in a tidy way. Making a call to the rootManager seems overkill
    const inputData = utils.defaultAbiCoder.encode(
      ["address", "bytes32[]"],
      [CONTRACTS.ROOT_MERKLE_TREE.address, leaves],
    );

    // Generate payload from input data
    const payload = virtualTreeBytecode.concat(inputData.slice(2));

    // Call the deployment transaction with the payload
    const returnedData = await provider.call({ data: payload });

    // Parse the returned value: [tree, root]
    const [decoded] = utils.defaultAbiCoder.decode(["tuple(tuple(bytes32[32], uint256), bytes32)"], returnedData);

    const virtualRoot = decoded[1];
    return virtualRoot;
  }
}

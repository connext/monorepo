import { constants } from "ethers";

import { HubMessagingDeployments, NetworkStack, ProtocolStack, SpokeMessagingDeployments } from "./types";
import { assertValue, getValue, updateIfNeeded } from "./tx";

export const setupMessaging = async (protocol: ProtocolStack) => {
  /// MARK - Peripherals
  // Get hub domain for specific use.
  const hub: NetworkStack = protocol.networks.filter((d) => d.domain === protocol.hub)[0];

  /// MARK - Contracts
  // Convenience setup for contracts.
  const { RootManager, MainnetConnector, HubConnectors, MerkleTreeManagerForRoot, MerkleTreeManagerForSpoke } = hub
    .deployments.messaging as HubMessagingDeployments;

  /// ******************** MESSAGING ********************
  /// MARK - Init
  // TODO: Currently unused, as messaging init checks are not needed with the AMB-compatible stack.
  // However, they will be useful as sanity checks for deployments in the future - thus, leaving
  // this placeholder here for now...

  /// MARK - Connector Mirrors
  console.log("\n\nMESSAGING");
  // Connectors should have their mirrors' address set; this lets them know about their counterparts.
  for (const HubConnector of HubConnectors) {
    // Get the connector's mirror domain (and convert to a string value).
    const mirrorDomain = (
      await getValue<number>({
        deployment: HubConnector,
        read: "MIRROR_DOMAIN",
      })
    ).toString();

    // Find the spoke domain.
    // let foundMirror = false;
    for (const spoke of protocol.networks) {
      if (spoke.domain === mirrorDomain) {
        if (spoke.domain === hub.domain) {
          throw new Error("Mirror domain was hub? Bruh");
        }
        // foundMirror = true;
        const { SpokeConnector, MerkleTreeManager } = spoke.deployments.messaging as SpokeMessagingDeployments;

        console.log(`\tVerifying connection: ${hub.chain}<>${spoke.chain}:`);

        /// MARK - Sanity Checks
        // Sanity check: Make sure RootManager is set correctly for the HubConnector.
        // NOTE: We CANNOT update the currently set ROOT_MANAGER; it is `immutable` and will require redeployment.
        console.log("\tVerifying Connectors' ROOT_MANAGER set correctly.");
        await assertValue({
          deployment: HubConnector,
          read: "ROOT_MANAGER",
          desired: RootManager.address,
        });
        // Sanity check: Make sure RootManager is set correctly for the SpokeConnector.
        await assertValue({
          deployment: SpokeConnector,
          read: "ROOT_MANAGER",
          desired: RootManager.address,
        });

        /// MARK - Connectors: Mirrors
        // Set the mirrors for both the spoke domain's Connector and hub domain's Connector.
        console.log("\tVerifying mirror connectors are set correctly.");
        await updateIfNeeded({
          deployment: HubConnector,
          desired: SpokeConnector.address,
          read: { method: "mirrorConnector", args: [] },
          write: { method: "setMirrorConnector", args: [SpokeConnector.address] },
        });
        await updateIfNeeded({
          deployment: SpokeConnector,
          desired: HubConnector.address,
          read: { method: "mirrorConnector", args: [] },
          write: { method: "setMirrorConnector", args: [HubConnector.address] },
        });

        /// MARK - RootManager: Add Connector
        // Set hub connector address for this domain on RootManager.
        console.log("\tVerifying RootManager `connectors` has HubConnector set correctly.");
        try {
          const currentValue: undefined | string = await getValue({
            deployment: RootManager,
            read: { method: "getConnectorForDomain", args: [spoke.domain] },
          });
          // If the current connector address is not correct and isn't empty, we need to remove the connector first.
          if (
            currentValue &&
            currentValue.toLowerCase() !== HubConnector.address.toLowerCase() &&
            currentValue.toLowerCase() !== constants.AddressZero
          ) {
            await updateIfNeeded({
              deployment: RootManager,
              desired: constants.AddressZero,
              read: { method: "getConnectorForDomain", args: [spoke.domain] },
              write: { method: "removeConnector", args: [spoke.domain] },
            });
          }
        } catch {}

        await updateIfNeeded({
          deployment: RootManager,
          desired: HubConnector.address,
          read: { method: "getConnectorForDomain", args: [spoke.domain] },
          write: { method: "addConnector", args: [spoke.domain, HubConnector.address] },
        });

        /// MARK - Connectors: Allowlist Senders
        console.log(`\tVerifying allowlistSender of SpokeConnector are set correctly.`, spoke.chain);
        await updateIfNeeded({
          deployment: SpokeConnector,
          desired: true,
          read: { method: "allowlistedSenders", args: [spoke.deployments.Connext.address] },
          write: { method: "addSender", args: [spoke.deployments.Connext.address] },
        });

        /// MARK - MerkleTreeManager
        console.log("\tVerifying merkle tree managers are set correctly.");
        await updateIfNeeded({
          deployment: MerkleTreeManager,
          desired: SpokeConnector.address,
          read: { method: "arborist", args: [] },
          write: { method: "setArborist", args: [SpokeConnector.address] },
        });

        /// MARK - xAppManager
        // setXAppConnectionManager to Connext with SpokeConnector
        console.log("\tVerifying xappConnectionManager of Connext are set correctly.", spoke.chain);
        await updateIfNeeded({
          deployment: spoke.deployments.Connext,
          desired: SpokeConnector.address,
          read: { method: "xAppConnectionManager", args: [] },
          write: { method: "setXAppConnectionManager", args: [SpokeConnector.address] },
        });
      }
    }

    // TODO: Actually, should we just submit a warning and skip this iteration? We may discontinue an L2...
    // TODO: Alternatively, this would be best as a sanity check.
    // if (!foundMirror) {
    //   throw new Error(
    //     `Did not find mirrorDomain ${mirrorDomain} in protocol networks! Please configure all Spoke (L2) networks.`,
    //   );
    // }
  }

  /// MARK - MainnetConnector
  // On the hub itself, you only need to connect the mainnet l1 connector to RootManager (no mirror).
  console.log("\tVerifying MainnetConnector is set up correctly...");
  // Sanity check: mirror is address(0).
  assertValue({
    deployment: MainnetConnector,
    desired: constants.AddressZero,
    read: "mirrorConnector",
  });

  // Make sure RootManager is set correctly for this MainnetConnector.
  // NOTE: We CANNOT update the currently set ROOT_MANAGER; it is `immutable` and will require redeployment.
  assertValue({
    deployment: MainnetConnector,
    desired: RootManager.address,
    read: "ROOT_MANAGER",
  });

  // Make sure connext is allowlisted sender for MainnetConnector.
  await updateIfNeeded({
    deployment: MainnetConnector,
    desired: true,
    read: { method: "allowlistedSenders", args: [hub.deployments.Connext.address] },
    write: { method: "addSender", args: [hub.deployments.Connext.address] },
  });

  // Functionality of the MainnetConnector is that of a spoke; we should hook it up to the RootManager.
  try {
    const currentValue = await getValue({
      deployment: RootManager,
      read: { method: "getConnectorForDomain", args: [hub.domain] },
    });
    // If the current connector address is not correct and isn't empty, we need to remove the connector first.
    if (currentValue !== MainnetConnector.address && currentValue !== constants.AddressZero) {
      await updateIfNeeded({
        deployment: RootManager,
        desired: constants.AddressZero,
        read: { method: "getConnectorForDomain", args: [hub.domain] },
        write: { method: "removeConnector", args: [hub.domain] },
      });
    }
  } catch {}

  await updateIfNeeded({
    deployment: RootManager,
    desired: MainnetConnector.address,
    read: { method: "getConnectorForDomain", args: [hub.domain] },
    write: { method: "addConnector", args: [hub.domain, MainnetConnector.address] },
  });

  await updateIfNeeded({
    deployment: MerkleTreeManagerForRoot,
    desired: RootManager.address,
    read: { method: "arborist", args: [] },
    write: { method: "setArborist", args: [RootManager.address] },
  });

  await updateIfNeeded({
    deployment: MerkleTreeManagerForSpoke,
    desired: MainnetConnector.address,
    read: { method: "arborist", args: [] },
    write: { method: "setArborist", args: [MainnetConnector.address] },
  });

  await updateIfNeeded({
    deployment: hub.deployments.Connext,
    desired: MainnetConnector.address,
    read: { method: "xAppConnectionManager", args: [] },
    write: { method: "setXAppConnectionManager", args: [MainnetConnector.address] },
  });
};

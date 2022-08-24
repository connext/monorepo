import { BytesLike, Contract, providers, utils, Wallet } from "ethers";
import { canonizeId, ConnextHandlerInterface } from "@connext/nxtp-contracts";

import { Router__factory, Connector__factory } from "../../typechain-types";

import { Deployment, DomainStack, ProtocolStack } from "./types";
import { waitForTx } from "./tx";

export const whitelistSenders = async (args: { deployer: Wallet; stack: DomainStack }) => {
  const { deployer, stack } = args;
  const ConnectorInterface = Connector__factory.createInterface();

  console.log(`\n* Whitelisting senders for chain ${stack.chain}`);
  for (const [name, handler] of Object.entries(stack.deployments.handlers)) {
    // NOTE: Only needs to be done on Spoke domains.
    const connectorAddress = (stack.deployments.messaging as any).SpokeConnector as Deployment;
    if (!connectorAddress) {
      throw new Error(`No Connector address trying to whitelist senders for chain ${stack.chain}!`);
    }

    const Connector = new Contract(connectorAddress.address, ConnectorInterface, deployer.connect(stack.rpc));

    // Check if already whitelisted.
    const isWhitelisted = (await Connector.callStatic.whitelistedSenders(handler.address)) as boolean;
    if (isWhitelisted) {
      console.log(`${name} whitelisted: ${isWhitelisted}`);
    } else {
      // Call `addSender` on Connector contract, passing in each Handler contract address.
      const tx = (await Connector.addSender(handler.address)) as providers.TransactionResponse;
      await waitForTx({
        tx,
        name: "addSender",
        checkResult: {
          method: async () => (await Connector.callStatic.whitelistedSenders(handler.address)) as boolean,
          desired: true,
        },
      });
      console.log(`${name} whitelisted: ${isWhitelisted}`);
    }
  }
};

export const enrollHandlers = async (args: { protocol: ProtocolStack }) => {
  const { protocol } = args;
  const RouterInterface = Router__factory.createInterface();
  // Each handler will need to have enrolled the handlers of all other domains.
  // For example, each BridgeRouter should have enrolled the BridgeRouter of every other domain.
  for (const handlerName of ["BridgeRouter", "PromiseRouter", "RelayerFeeRouter"]) {
    // Round up the specific Handler type we're concerned with for each domain.
    // e.g. Get every BridgeRouter for every domain.
    const handlers: { deployment: Deployment; stack: DomainStack }[] = [];
    for (const stack of protocol.domains) {
      handlers.push({
        deployment: (stack.deployments.handlers as any)[handlerName] as Deployment,
        stack,
      });
    }

    // For every Handler contract in the list, enroll every other Handler.
    for (let i = 0; i < handlers.length; i++) {
      const targetHandler = handlers[i];
      const remoteHandlers = handlers.filter((_, j) => j !== i);

      console.log(`\n* (${targetHandler.stack.chain}) ${handlerName}: ${targetHandler.deployment.address}`);
      for (const remoteHandler of remoteHandlers) {
        // Get the canonized address of the Handler we want to enroll (will be padded with 0-bytes).
        const canonized = utils.hexlify(canonizeId(remoteHandler.deployment.address as BytesLike));
        // Setup Handler contract with connected deployer signer.
        const Handler = new Contract(
          targetHandler.deployment.address,
          RouterInterface,
          protocol.deployer.connect(targetHandler.stack.rpc),
        );
        const remote = await Handler.callStatic.remotes(remoteHandler.stack.domain);
        // Check if already registered.
        if (remote === canonized) {
          console.log(`\t (${remoteHandler.stack.chain} | ${remoteHandler.stack.domain}) => ${remote}`);
        } else {
          const tx = (await Handler.enrollRemoteRouter()) as providers.TransactionResponse;
          await waitForTx({
            tx,
            name: "enrollRemoteRouters",
            checkResult: {
              method: async () => await Handler.callStatic.remotes(remoteHandler.stack.domain),
              desired: canonized,
            },
          });
          console.log(`\t (${remoteHandler.stack.chain} | ${remoteHandler.stack.domain}) => ${remote} !`);
        }
      }
    }

    // TODO: If Connext === bridge router, this contract property will be removed; remove the following code in that case!
    // Set the bridge router in Connext contract, if applicable.
    if (handlerName === "BridgeRouter") {
      for (const stack of protocol.domains) {
        const connextDeployment = stack.deployments.Connext;
        const bridgeRouterDeployment = stack.deployments.handlers.BridgeRouter;

        // Setup Connext contract with connected deployer signer.
        const Connext = new Contract(
          connextDeployment.address,
          ConnextHandlerInterface,
          protocol.deployer.connect(stack.rpc),
        );
        // Get the currently set BridgeRouter address.
        const bridgeRouter = (await Connext.callStatic.bridgeRouter()).toString();
        // If bridge router is not set, we need to set it to be the BridgeRouterUpgradeBeaconProxy address.
        if (bridgeRouter !== bridgeRouterDeployment.address) {
          const tx = (await Connext.setBridgeRouter(bridgeRouterDeployment.address)) as providers.TransactionResponse;
          await waitForTx({
            tx,
            name: "setBridgeRouter",
            checkResult: {
              method: async () => (await Connext.callStatic.bridgeRouter()).toString(),
              desired: bridgeRouterDeployment.address,
            },
          });
        }
      }
    }
  }
};

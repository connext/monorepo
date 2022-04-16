import { ExecuteArgs, getChainData, signHandleRelayerFeePayload } from "@connext/nxtp-utils";
import { Wallet, constants, utils, providers } from "ethers";
import { task } from "hardhat/config";

import { Connext as TConnext } from "../../typechain-types";
import ConnextArtifact from "../../artifacts/contracts/Connext.sol/Connext.json";
import { canonizeId } from "../nomad";

type TaskArgs = {
  connextAddress?: string;
};

export default task("execute", "Prepare a cross-chain tx")
  .addOptionalParam("connextAddress", "Override connext address")
  .setAction(async ({ connextAddress: _connextAddress }: TaskArgs, { deployments, ethers }) => {
    let connextAddress = _connextAddress ?? process.env.EG_CONNEXT_ADDRESS;
    if (!connextAddress) {
      const connextDeployment = await deployments.get("Connext");
      connextAddress = connextDeployment.address;
    }
    console.log("connextAddress: ", connextAddress);
    const connext = await ethers.getContractAt("Connext", connextAddress);
    const originDomain = process.env.TRANSFER_ORIGIN_DOMAIN;
    const destinationDomain = process.env.TRANSFER_DESTINATION_DOMAIN;
    if (!originDomain || !destinationDomain) {
      throw new Error(
        "Origin and destination domains must be specified as params or from env (TRANSFER_ORIGIN_DOMAIN, TRANSFER_DESTINATION_DOMAIN)",
      );
    }

    const callParams = {
      to: "TRANSFER_TO",
      callData: "TRANSFER_CALL_DATA",
    };
    for (const [key, envKey] of Object.entries(callParams)) {
      const value = process.env[envKey];
      if (value === undefined) {
        throw new Error(`${key} must be specified from env as ${envKey}`);
      }
      (callParams as any)[key] = value;
    }
    (callParams as any).originDomain = originDomain;
    (callParams as any).destinationDomain = destinationDomain;

    // Get the transacting asset ID.
    let transactingAssetId = process.env.TRANSFER_ASSET;
    if (!transactingAssetId) {
      // Alternatively, try defaulting to using the canonical token from the .env (if present) as the transacting asset ID,
      // deriving the local asset using the token registry if applicable.
      const canonicalDomain = process.env.CANONICAL_DOMAIN;
      const canonicalAsset = process.env.CANONICAL_TOKEN;
      if (!canonicalAsset || !canonicalDomain) {
        throw new Error("No canonical domain or token in env");
      }
      const canonicalTokenId = utils.hexlify(canonizeId(canonicalAsset));

      // Retrieve the local asset from the token registry, if applicable.
      if (canonicalDomain === originDomain) {
        // Use the canonical asset as the local asset since we're on the canonical network.
        transactingAssetId = canonicalAsset;
      } else {
        // Current network's domain is not canonical domain, so we need to get the local asset representation.
        const tokenRegistryAddress = (await deployments.get("TokenRegistryUpgradeBeaconProxy")).address;
        const tokenRegistry = await ethers.getContractAt(
          (
            await deployments.getArtifact("TokenRegistry")
          ).abi,
          tokenRegistryAddress,
        );
        transactingAssetId = await tokenRegistry.getRepresentationAddress(canonicalDomain, canonicalTokenId);
        if (transactingAssetId === constants.AddressZero) {
          throw new Error("Empty transactingAssetId on registry");
        }
      }
    }
    if (!transactingAssetId) {
      // If the above attempt fails, then we default to telling the user to just specify the transacting asset ID.
      throw new Error("Transfer asset ID must be specified as param or from env (TRANSFER_ASSET)");
    }

    const executeArgs = {
      routers: "EXECUTE_ROUTER",
      amount: "TRANSFER_AMOUNT",
      nonce: "EXECUTE_NONCE",
      originSender: "EXECUTE_ORIGIN_SENDER",
    };
    for (const [key, envKey] of Object.entries(executeArgs)) {
      const value = process.env[envKey];
      if (value === undefined) {
        throw new Error(`${key} must be specified from env as ${envKey}`);
      }
      (executeArgs as any)[key] = value;
    }
    (executeArgs as any).params = callParams;
    const feePercentage = "1";
    (executeArgs as any).feePercentage = feePercentage;
    (executeArgs as any).local = transactingAssetId;
    (executeArgs as any).routers = [executeArgs.routers];

    let transferId: string | undefined = process.env.EXECUTE_TRANSFER_ID;
    if (!transferId) {
      console.log("Getting transfer ID...", executeArgs.nonce, executeArgs.originSender, callParams);
      transferId = await connext.functions.getTransferId(executeArgs.nonce, executeArgs.originSender, callParams);
    }
    console.log("transferId: ", transferId);

    let relayerSignature: string | undefined = process.env.EXECUTE_RELAYER_SIGNATURE;
    if (!relayerSignature) {
      console.log("Getting relayer signature...");
      const routerMnemonic = process.env.EXECUTE_ROUTER_MNEMONIC;
      if (!routerMnemonic) {
        throw new Error("Router mnemonic must be specified in env (EXECUTE_ROUTER_MNEMONIC)");
      }
      const routerWallet = Wallet.fromMnemonic(routerMnemonic);
      relayerSignature = await signHandleRelayerFeePayload(transferId as string, feePercentage, routerWallet);
    }

    (executeArgs as any).relayerSignature = relayerSignature;

    console.log("Execute args: ", executeArgs);

    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Chain data not found!");
    }

    const relayerMnemonic = process.env.EXECUTE_RELAYER_MNEMONIC;
    if (!relayerMnemonic) {
      throw new Error("Router mnemonic must be specified in env (EXECUTE_RELAYER_MNEMONIC)");
    }
    const relayerWallet = Wallet.fromMnemonic(relayerMnemonic);
    const relayerAddress = await relayerWallet.getAddress();
    console.log("Relayer: ", relayerAddress);

    const rpcUrl =
      chainData.get(destinationDomain)?.rpc ?? process.env.EXECUTE_RPC_URL ?? destinationDomain === "2000"
        ? process.env.RINKEBY_ETH_PROVIDER_URL
        : destinationDomain === "3000"
        ? process.env.KOVAN_ETH_PROVIDER_URL
        : undefined;
    if (!rpcUrl) {
      throw new Error("RPC URL must be specified in env (EXECUTE_RPC_URL)");
    }
    const provider = new providers.JsonRpcProvider(rpcUrl);

    const encoderContract = new utils.Interface(ConnextArtifact.abi) as TConnext["interface"];
    const encodedData = encoderContract.encodeFunctionData("execute", [executeArgs as unknown as ExecuteArgs]);

    // connext = connext.connect(relayerWallet);
    // const tx = await connext.functions.execute([executeArgs, { from: relayerAddress, value: "0" }]);
    const tx = await relayerWallet.connect(provider).sendTransaction({
      to: connext.address,
      data: encodedData,
      from: relayerAddress,
      value: "0",
      gasLimit: "200000",
    });
    console.log("tx sent! ", tx.hash);
    await tx.wait();
    console.log("tx mined! ", tx.hash);
  });

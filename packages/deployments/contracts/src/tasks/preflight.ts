import { BigNumber, constants, utils } from "ethers";
import { hexlify } from "ethers/lib/utils";
import { task } from "hardhat/config";
import { canonizeId } from "../nomad";

// Default amount of tokens to mint / add liquidity for.
const DEFAULT_AMOUNT = "2500000000000000000000000";

export default task("preflight", "Ensure correct setup for e2e demo with a specified router")
  .addOptionalParam("router", "Router address")
  .addOptionalParam("domain", "Canonical domain of token")
  .addOptionalParam("asset", "Canonical token address on canonical domain")
  .addOptionalParam("amount", "Override amount (real units)")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("pool", "The adopted <> local stable swap pool address")
  .setAction(
    async (
      {
        router: _router,
        connextAddress: _connextAddress,
        amount: _amount,
        domain: _domain,
        asset: _asset,
        pool: _pool,
      },
      { deployments, ethers, run, getNamedAccounts, network },
    ) => {
      let connextAddress = _connextAddress;
      if (!connextAddress) {
        const connextDeployment = await deployments.get("Connext");
        connextAddress = connextDeployment.address;
      }

      // Get the router address.
      const router = _router ?? process.env.ROUTER_ADDRESS;
      if (!router) {
        throw new Error("Router address must be specified as param of from env (ROUTER_ADDRESS)");
      }
      // Get canonical domain and asset.
      const canonicalDomain = _domain ?? process.env.CANONICAL_DOMAIN;
      if (!canonicalDomain) {
        throw new Error("Domain must be specified as param or from env (CANONICAL_DOMAIN)");
      }
      // Get the domain of the current network (this could be the canonical network, so same as above).
      const networkDomain = network.name === "rinkeby" ? "2000" : network.name === "kovan" ? "3000" : undefined;
      if (!networkDomain) {
        throw new Error("Unsupported network");
      }
      const canonicalAsset = _asset ?? process.env.CANONICAL_TOKEN;
      if (!canonicalAsset) {
        throw new Error("Asset must be specified as param or from env (CANONICAL_TOKEN)");
      }
      const canonicalTokenId = hexlify(canonizeId(canonicalAsset));

      // Retrieve the local asset from the token registry, if applicable.
      let localAsset: string;
      if (canonicalDomain === networkDomain) {
        // Use the canonical asset as the local asset since we're on the canonical network.
        localAsset = canonicalAsset;
      } else {
        // Current network's domain is not canonical domain, so we need to get the local asset representation.
        const tokenRegistryAddress = (await deployments.get("TokenRegistryUpgradeBeaconProxy")).address;
        const tokenRegistry = await ethers.getContractAt(
          (
            await deployments.getArtifact("TokenRegistry")
          ).abi,
          tokenRegistryAddress,
        );
        localAsset = await tokenRegistry.getRepresentationAddress(canonicalDomain, canonicalTokenId);
        if (localAsset === constants.AddressZero) {
          throw new Error(
            "Corresponding local asset not found for canonical asset!" +
              " Has the representation asset been deployed to this domain?",
          );
        }
      }

      // Make sure router's signer address is approved.
      const connext = await ethers.getContractAt("Connext", connextAddress);
      const isRouterApproved = await connext.approvedRouters(router);
      console.log("\nRouter: ", router, " is approved: ", isRouterApproved);
      if (!isRouterApproved) {
        console.log("*** Approving router!");
        await run("add-router", { router, connextAddress });
      }
      console.log("Router approved!");

      // Make sure the asset is approved.
      // The stable swap pool address, if applicable; if mad asset is what's being used,
      // should be set to address(0).
      const pool = _pool ?? constants.AddressZero;
      const isAssetApproved = await connext.approvedAssets(canonicalTokenId);
      console.log("\nLocal asset: ", localAsset);
      console.log("Canonical asset: ", canonicalAsset);
      if (!isAssetApproved) {
        console.log("*** Approving canonical asset!");
        await run("setup-asset", {
          canonical: canonicalTokenId,
          adopted: localAsset,
          domain: networkDomain,
          connextAddress,
          pool,
        });
      }
      console.log("Canonical asset approved!");

      // Make sure the router's signer address has liquidity by checking the Connext
      // contract in the block explorer and reading the routerBalances mapping, putting in the
      // router signer address and Rinkeby asset ID.

      const erc20 = await ethers.getContractAt("TestERC20", localAsset);
      // The amount to mint / add liquidity for. Convert units, coerce to number to remove
      // decimal point, then back to string.
      const amount = Number(utils.formatUnits(_amount ?? DEFAULT_AMOUNT, await erc20.decimals())).toString();
      const liquidity = await connext.routerBalances(router, localAsset);
      if (liquidity.lt(amount)) {
        if (localAsset !== ethers.constants.AddressZero) {
          const namedAccounts = await getNamedAccounts();

          const balance = await erc20.balanceOf(namedAccounts.deployer);
          console.log("\nDeployer Balance: ", balance.toString());
          if (balance.lt(amount)) {
            console.log("*** Minting tokens!");
            await run("mint", {
              amount,
              asset: localAsset,
              receiver: namedAccounts.deployer,
            });
          }
        } else {
          // TODO: send ETH to txmanager
          throw new Error("Need to support eth");
        }
        console.log("\nLiquidity: ", liquidity.toString());
        console.log("*** Adding liquidity!");
        await run("add-liquidity", { router, asset: localAsset, amount, connextAddress });
      }
      console.log("Sufficient liquidity added!");

      // Make sure the router's signer address has relayer fees by checking the
      // Connext contract on chain and reading the routerRelayerFees function.
      const relayerFees = await connext.routerRelayerFees(router);
      console.log("\nRelayer Fees: ", relayerFees.toString());
      if (relayerFees.lt(BigNumber.from(amount).mul(10).div(100))) {
        // TODO: add relayer fees
      }
    },
  );

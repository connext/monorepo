import { BigNumber, constants, utils } from "ethers";
import { hexlify } from "ethers/lib/utils";
import { task } from "hardhat/config";
import { canonizeId } from "../nomad";

export default task("preflight", "Ensure correct setup for e2e with specified router")
  .addParam("router", "Router address")
  .addOptionalParam("domain", "Canonical domain of token")
  .addOptionalParam("asset", "Canonical token address on canonical domain")
  .addOptionalParam("amount", "Override amount (real units)")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("pool", "The adopted <> local stable swap pool address")
  .setAction(
    async (
      { router, connextAddress: _connextAddress, amount: _amount, domain: _domain, asset: _asset, pool: _pool },
      { deployments, ethers, run, getNamedAccounts, network },
    ) => {
      let connextAddress = _connextAddress;
      if (!connextAddress) {
        const connextDeployment = await deployments.get("Connext");
        connextAddress = connextDeployment.address;
      }

      // Get canonical domain and asset.
      const canonicalDomain = _domain ?? process.env.CANONICAL_DOMAIN;
      if (!canonicalDomain) {
        throw new Error("Domain must be specified as param or from env");
      }
      const canonicalAsset = _asset ?? process.env.CANONICAL_TOKEN;
      if (!canonicalAsset) {
        throw new Error("Asset must be specified as param or from env");
      }
      const canonicalTokenId = hexlify(canonizeId(canonicalAsset));

      // Retrieve the local asset from the token registry.
      const tokenRegistryAddress = (await deployments.get("TokenRegistryUpgradeBeaconProxy")).address;
      const tokenRegistry = await ethers.getContractAt(
        (
          await deployments.getArtifact("TokenRegistry")
        ).abi,
        tokenRegistryAddress,
      );
      let localAsset = await tokenRegistry.getRepresentationAddress(canonicalDomain, canonicalTokenId);
      if (localAsset === constants.AddressZero) {
        // use the canonical asset as the local asset
        console.log(`Corresponding local asset not found for canonical asset, using canonical as local`);
        localAsset = canonicalAsset;
      }

      const amount = _amount ?? "2500000000000000000000000";
      const pool = _pool ?? constants.AddressZero;

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
      const isAssetApproved = await connext.approvedAssets(canonicalTokenId);
      console.log("\nLocal asset: ", localAsset);
      console.log("Canonical asset: ", canonicalAsset);
      if (!isAssetApproved) {
        console.log("*** Approving canonical asset!");
        const domain = network.name === "rinkeby" ? "2000" : network.name === "kovan" ? "3000" : undefined;
        if (!domain) {
          throw new Error("Unsupported network");
        }
        await run("setup-asset", { canonical: canonicalTokenId, adopted: localAsset, domain, connextAddress, pool });
      }
      console.log("Canonical asset approved!");

      // Make sure the router's signer address has liquidity by checking the Connext
      // contract in the block explorer and reading the routerBalances mapping, putting in the
      // router signer address and Rinkeby asset ID.
      const liquidity = await connext.routerBalances(router, localAsset);
      if (liquidity.lt(amount)) {
        if (localAsset !== ethers.constants.AddressZero) {
          const namedAccounts = await getNamedAccounts();
          const erc20 = await ethers.getContractAt("TestERC20", localAsset);
          const balance = await erc20.balanceOf(namedAccounts.deployer);
          console.log("\nDeployer Balance: ", balance.toString());
          if (balance.lt(amount)) {
            console.log("*** Minting tokens!");
            await run("mint", {
              amount: utils.formatUnits(amount, await erc20.decimals()),
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

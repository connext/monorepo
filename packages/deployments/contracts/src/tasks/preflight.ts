import { BigNumber, constants, Contract, utils } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../utils";
import { canonizeId, getDomainInfoFromChainId } from "../nomad";

// Default amount of tokens to mint / add liquidity for.
const DEFAULT_AMOUNT = "2500000";

type TaskArgs = {
  router?: string;
  domain?: string;
  asset?: string;
  amount?: string;
  connextAddress?: string;
  pool?: string;
  relayer?: string;
  env?: Env;
};

export default task("preflight", "Ensure correct setup for e2e demo with a specified router")
  .addOptionalParam("router", "Router address")
  .addOptionalParam("domain", "Canonical domain of token")
  .addOptionalParam("asset", "Canonical token address on canonical domain")
  .addOptionalParam("amount", "Override amount (real units)")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("pool", "The adopted <> local stable swap pool address")
  .addOptionalParam("relayer", "The relayer address to approve")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      {
        router: _router,
        connextAddress: _connextAddress,
        amount: _amount,
        domain: _domain,
        asset: _asset,
        pool: _pool,
        relayer: _relayer,
        env: _env,
      }: TaskArgs,
      { deployments, ethers, run },
    ) => {
      const env = mustGetEnv(_env);
      console.log("env:", env);

      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const connextName = getDeploymentName("ConnextHandler", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
      console.log("connextAddress: ", connextAddress);

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
      const network = await ethers.provider.getNetwork();
      const domainInfo = getDomainInfoFromChainId(network.chainId);
      if (!domainInfo) {
        throw new Error("Unsupported network");
      }
      const canonicalAsset = _asset ?? process.env.CANONICAL_TOKEN;
      if (!canonicalAsset) {
        throw new Error("Asset must be specified as param or from env (CANONICAL_TOKEN)");
      }
      const canonicalTokenId = utils.hexlify(canonizeId(canonicalAsset));

      const relayer = _relayer ?? process.env.RELAYER_ADDRESS;
      if (relayer && !isAddress(relayer)) {
        throw new Error("Supplied relayer address invalid");
      }

      // Retrieve the local asset from the token registry, if applicable.
      let localAsset: string;
      if (+canonicalDomain === domainInfo.domain) {
        // Use the canonical asset as the local asset since we're on the canonical network.
        localAsset = canonicalAsset;
      } else {
        // Current network's domain is not canonical domain, so we need to get the local asset representation.
        const tokenDeployment = await deployments.get(getDeploymentName("TokenRegistryUpgradeBeaconProxy", env));
        const tokenRegistry = new Contract(
          tokenDeployment.address,
          (await deployments.get(getDeploymentName("TokenRegistry"))).abi,
          deployer,
        );
        console.log("tokenRegistry: ", tokenRegistry.address);
        console.log("canonicalDomain: ", canonicalDomain);
        console.log("canonicalTokenId: ", canonicalTokenId);
        localAsset = await tokenRegistry.getRepresentationAddress(canonicalDomain, canonicalTokenId);
        if (localAsset === constants.AddressZero) {
          throw new Error(
            "Corresponding local asset not found for canonical asset!" +
              " Has the representation asset been deployed to this domain?",
          );
        }
      }

      // Make sure router's signer address is approved.
      const isRouterApproved = await connext.getRouterApproval(router);
      console.log("\nRouter: ", router, " is approved: ", isRouterApproved);
      if (!isRouterApproved) {
        console.log("*** Approving router!");
        await run("setup-router", { router, connextAddress });
      }
      console.log("*** Router approved!");

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
          domain: canonicalDomain,
          connextAddress,
          pool,
          env,
        });
      }
      console.log("*** Canonical asset approved!");

      // Make sure the router's signer address has liquidity by checking the Connext
      // contract in the block explorer and reading the routerBalances mapping, putting in the
      // router signer address and Rinkeby asset ID.

      const erc20Deployment = await deployments.get(getDeploymentName("TestERC20", env));
      const erc20 = new Contract(erc20Deployment.address, erc20Deployment.abi, deployer);
      // The amount to mint / add liquidity for. Convert units, coerce to number to remove
      // decimal point, then back to string.
      const amount = _amount ?? DEFAULT_AMOUNT;
      const targetLiquidity = utils.parseUnits(amount, (await erc20.decimals()) as BigNumber);
      const liquidity = await connext.routerBalances(router, localAsset);
      if (liquidity.lt(targetLiquidity)) {
        if (localAsset !== ethers.constants.AddressZero) {
          const balance = await erc20.balanceOf(deployer.address);
          console.log("\nDeployer Balance: ", balance.toString());
          if (balance.lt(targetLiquidity)) {
            console.log("*** Minting tokens!");
            await run("mint", {
              amount,
              asset: localAsset,
              receiver: deployer.address,
              env,
            });
          }
        } else {
          // TODO: send ETH to connext contract
          throw new Error("Need to support eth");
        }
        console.log("\nLiquidity: ", liquidity.toString());
        console.log("*** Adding liquidity!");
        await run("add-liquidity", { router, asset: localAsset, amount, connextAddress, env });
        console.log("*** Sufficient liquidity added!");
      } else {
        console.log("\nLiquidity: ", liquidity.toString());
        console.log("*** Sufficient liquidity present!");
      }

      if (relayer) {
        const approved = await connext.approvedRelayers(relayer);
        if (approved) {
          console.log("*** Relayer already approved!");
        } else {
          console.log("*** Whitelisting relayer!");
          // Add relayer
          const tx = await connext.addRelayer(relayer);
          console.log("addRelayer tx:", tx.hash);
          await tx.wait(1);
          console.log("*** Added relayer to whitelist", relayer);
        }
      } else {
        console.log("*** No relayer to whitelist!");
      }
    },
  );

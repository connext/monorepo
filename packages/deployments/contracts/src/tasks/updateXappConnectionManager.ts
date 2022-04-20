import { Contract } from "ethers";
import { task } from "hardhat/config";

import { XAppConnectionManager } from "../../typechain-types";
import { getDomainInfoFromChainId, getNomadConfig } from "../nomad";

type TaskArgs = {
  xappConnectionManager?: string;
};

export default task("update-xapp-connection", "Enrolls the proper replicas, and unenrolls all other replicas")
  .addOptionalParam("xappConnectionManager", "Override XappConnectionManager address")
  .setAction(async ({ xappConnectionManager: _xappConnectionManager }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }
    console.log("deployer:", deployer.address);

    // Get the xapp connection manager
    const xappManagerDeployment = await deployments.get("XAppConnectionManager");
    const xappConnectionManagerAddress = _xappConnectionManager ?? xappManagerDeployment.address;
    const xappConnectionManager = new Contract(
      xappConnectionManagerAddress,
      xappManagerDeployment.abi,
      deployer,
    ) as XAppConnectionManager;
    console.log("xappConnectionManager:", xappConnectionManager.address);

    // Check to ensure we *can* manage replicas
    const owner = await xappConnectionManager.owner();
    if (deployer.address !== owner) {
      throw new Error(`${deployer.address} cannot manage replicas, must be owner: ${owner}`);
    }

    // Get all the current replicas + unenroll all
    // gives the most recent first
    const enrolledEvents = (
      await xappConnectionManager.queryFilter(xappConnectionManager.filters.ReplicaEnrolled())
    ).sort((a, b) => b.blockNumber - a.blockNumber);

    const unenrolledEvents = (
      await xappConnectionManager.queryFilter(xappConnectionManager.filters.ReplicaUnenrolled())
    ).sort((a, b) => b.blockNumber - a.blockNumber);

    const network = await ethers.provider.getNetwork();
    const nomadConfig = getNomadConfig(network.chainId);

    // NOTE: this algorithm will *NOT* work if the same replica was unenrolled + re-enrolled
    // this is okay because that is not expected, but good to note
    const currentlyEnrolled = enrolledEvents
      .filter((event) => {
        const unenrolled = unenrolledEvents.find(
          (e) => e.args.replica === event.args.replica && e.args.domain === event.args.domain,
        );
        if (unenrolled) {
          // replica for domain has already been unenrolled
          return false;
        }
        return true;
      })
      .map((e) => {
        const [domainName] =
          Object.entries(nomadConfig.protocol.networks).find(([_, info]) => {
            return info.domain === e.args.domain;
          }) ?? [];
        return {
          domainName: (domainName ?? "").toLowerCase(),
          domain: e.args.domain,
          replica: e.args.replica.toLowerCase(),
        };
      });

    // Get all replicas to enroll
    const latestDeployment = Object.entries(getDomainInfoFromChainId(network.chainId).contracts.core.replicas).map(
      ([key, info]) => {
        const domain = nomadConfig.protocol.networks[key].domain;
        return {
          domainName: key.toLowerCase(),
          domain,
          replica: info.proxy.toLowerCase(),
        };
      },
    );

    // Ensure no unnecessary unenroll + re-enroll txs are happening
    const toUnenroll = currentlyEnrolled.filter(
      (entry) =>
        // remove any deployments that would just be re-enrolled
        !latestDeployment.includes({
          domain: entry.domain,
          replica: entry.replica.toLowerCase(),
          domainName: entry.domainName.toLowerCase(),
        }),
    );

    const toEnroll = latestDeployment.filter(
      (entry) =>
        // remove any deployments that would just be re-enrolled
        !currentlyEnrolled.includes({
          domain: entry.domain,
          replica: entry.replica.toLowerCase(),
          domainName: entry.domainName.toLowerCase(),
        }),
    );
    if (toUnenroll.length === 0 && toEnroll.length === 0) {
      console.log("no change detected in connections");
      console.log("currently enrolled:", currentlyEnrolled);
      console.log("latest deployment :", latestDeployment);
      return;
    }

    console.log("unenrolling", toUnenroll.length, "replicas:", toUnenroll);
    console.log("enrolling", toEnroll.length, "replicas:", toEnroll);

    // Unenroll all replicas
    for (const { replica, domain, domainName } of toUnenroll) {
      const tx = await xappConnectionManager.ownerUnenrollReplica(replica);
      console.log(`unenroll ${replica} for ${domainName} (${domain}) tx:`, tx.hash);
      const receipt = await tx.wait();
      console.log(`unenroll tx mined: ${receipt.transactionHash}`);
    }

    // Enroll all replicas
    for (const { replica, domain, domainName } of toEnroll) {
      const tx = await xappConnectionManager.ownerEnrollReplica(replica, domain);
      console.log(`enroll ${replica} for ${domainName} (${domain}) tx:`, tx.hash);
      const receipt = await tx.wait();
      console.log(`enroll tx mined: ${receipt.transactionHash}`);
    }
  });

import { Deployment } from "../../helpers";

export type OptimisticEnabledDeploymentsSpoke = {
  SpokeConnector: Deployment;
};

export type OptimisticEnabledDeploymentsHub = OptimisticEnabledDeploymentsSpoke & {
  RootManager: Deployment;
};

export type OptimisticEnabledDeployments = OptimisticEnabledDeploymentsHub | OptimisticEnabledDeploymentsSpoke;

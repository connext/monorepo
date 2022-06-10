import { deployConfig as moonbeamDeployConfig } from "./moonbeam";
import { DeployConfig } from "./shared";

export const deployConfigs: Record<string, DeployConfig> = {
  "1284": moonbeamDeployConfig,
};

import { deployConfig as moonbeamDeployConfig } from "./moonbeam";
import { deployConfig as evmosDeployConfig } from "./evmos";
import { DeployConfig } from "./shared";

export const deployConfigs: Record<string, DeployConfig> = {
  "1284": moonbeamDeployConfig,
  "9001": evmosDeployConfig,
};

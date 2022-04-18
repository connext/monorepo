import { config } from "dotenv";
config();

export const getDeploymentName = (contractName: string) => {
  const env = process.env.ENV ?? "staging";
  if (env !== "staging" && env !== "production") {
    throw new Error(`Unrecognized env: ${env}`);
  }

  if (env === "staging") {
    return `${contractName}Staging`;
  }
  return contractName;
};

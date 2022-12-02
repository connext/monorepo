import { execFile } from "child_process";

import { AppContext } from "../../shared";

export const runMigration = async (context: AppContext) => {
  const { service } = context.config;
  if (service !== "transfers") {
    return;
  }
  return new Promise<string | null>((resolve) => {
    execFile("dbmate -d /home/node/packages/adapters/database/db/migrations up", (error, stdout, stderr) => {
      if (error !== null || stderr) {
        console.log(`exec error: ${error}`);
        resolve(null);
        return;
      } else {
        const outputStr = stdout.toString();
        resolve(outputStr);
      }
    });
  });
};

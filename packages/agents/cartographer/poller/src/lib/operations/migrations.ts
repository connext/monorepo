import { execFile } from "child_process";

import { AppContext } from "../../shared";

export const runMigration = async (context: AppContext) => {
  const { service } = context.config;
  if (service !== "transfers") {
    return;
  }
  return new Promise<string | null>((resolve) => {
    execFile(
      "dbmate",
      ["--url", `${context.config.database.url}`, "-d", "packages/adapters/database/db/migrations", "up"],
      (error, stdout, stderr) => {
        if (error !== null || stderr) {
          context.logger.error(`exec error: ${error}`);
          resolve(null);
          return;
        } else {
          const outputStr = stdout.toString();
          context.logger.info(`Migration ran successfully ${outputStr}`);
          resolve(outputStr);
        }
      },
    );
  });
};

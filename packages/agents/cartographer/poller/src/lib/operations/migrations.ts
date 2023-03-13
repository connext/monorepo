import { execFile } from "child_process";
import path from "path";

import { AppContext } from "../../shared";

export const runMigration = async (context: AppContext) => {
  const { service } = context.config;
  if (service !== "transfers") {
    return;
  }
  const migrationPath = path.join(__dirname, "../../../../../../../packages/adapters/database/db/migrations");
  return new Promise<string | null>((resolve) => {
    execFile(
      "dbmate",
      ["--url", `${context.config.database.url}`, "-d", migrationPath, "up"],
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

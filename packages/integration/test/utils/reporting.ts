import * as path from "path";
import * as fs from "fs";

// Directory where we store statistics data. Should be ignored by .gitignore.
export const STATS_DIR = path.join(__dirname, "stats");

export const writeStatsToFile = (testName: string, data: Record<string, any>) => {
  const statsFile = path.join(STATS_DIR, `report.${testName}.${new Date().toISOString()}.json`);
  fs.mkdir(STATS_DIR, (error) => {
    if (error && error.code !== "EEXIST") {
      throw new Error("Make stats dir failed.");
    }
  });
  fs.writeFile(statsFile, JSON.stringify(data), (error) => {
    if (error) {
      throw new Error(`Failed to save stats report!`);
    }
  });
};

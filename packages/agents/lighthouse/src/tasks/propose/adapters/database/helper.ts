// import { Database } from "@connext/nxtp-adapters-database";
import { DBHelper } from "@connext/nxtp-utils";

export class OptimisticHubDBHelper implements DBHelper {
  constructor(private roots: string[], private count: number) {}

  public async getCount(): Promise<number> {
    return this.count;
  }

  public async getNode(index: number): Promise<string | undefined> {
    return this.roots[index];
  }

  public async getNodes(start: number, end: number): Promise<string[]> {
    return this.roots.slice(start, end + 1);
  }

  public async putRoot() {
    // noop
  }

  public async getRoot() {
    return undefined;
  }

  public async clearCache() {
    // noop
  }
}

import { execute } from "./execute";
import * as parser from "./parse";
import { getPrefixByDomain } from "./shared";

export const getHelpers = () => {
  return {
    execute,
    // Helpers for parsing subgraph entities.
    parser,
    getPrefixByDomain,
  };
};

import { execute } from "./execute";
import { create } from "./create";
import * as parser from "./parse";
import { getSubgraphNames, executeXQuery } from "./graphclient";
import { getPrefixForDomain, getDomainFromPrefix } from "./prefix";

export const getHelpers = () => {
  return {
    execute,
    create,
    parser,
    getSubgraphNames,
    executeXQuery,
    getPrefixForDomain,
    getDomainFromPrefix,
  };
};

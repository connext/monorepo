import { execute } from "./client";
import { create } from "./create";
import * as parser from "./parse";
import { getMeshOptions, getBuiltGraphClient, getPrefixForDomain, getDomainFromPrefix } from "./shared";

export const getHelpers = () => {
  return {
    execute,
    create,
    parser,
    getMeshOptions,
    getBuiltGraphClient,
    getPrefixForDomain,
    getDomainFromPrefix,
  };
};

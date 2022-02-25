import { create } from "./create";
import * as parser from "./parse";

export const getHelpers = () => {
  return {
    create,
    // Helpers for parsing subgraph entities.
    parser,
  };
};

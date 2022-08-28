import { useContext } from "react";

import { getChains } from "../utils/chain";
import { createCtx } from "../utils/context";
import { Chain } from "../types/chain";

interface IAppState {
  chains: Chain[];
}

const initialState: IAppState = {
  chains: getChains(),
};

type AppState = typeof initialState;
type Action = { type: "set"; payload: Chain[] };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "set":
      return { ...state, chains: action.payload };
    default:
      throw new Error();
  }
}

const [ctx, ChainsProvider] = createCtx(reducer, initialState);

function useChains() {
  const context = useContext(ctx);

  if (context === undefined) {
    throw new Error("useChains must be used within a ChainsProvider");
  }

  return context;
}

export { ChainsProvider, useChains };

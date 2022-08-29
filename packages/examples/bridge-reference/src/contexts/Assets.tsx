import { useContext } from "react";

import { Asset } from "../types/asset";
import { getAssets } from "../utils/asset";
import { createCtx } from "../utils/context";

interface IAppState {
  assets: Asset[];
}

const initialState: IAppState = {
  assets: getAssets(),
};

type AppState = typeof initialState;
type Action = { type: "set"; payload: Asset[] };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "set":
      return { ...state, assets: action.payload };
    default:
      throw new Error();
  }
}

const [ctx, AssetsProvider] = createCtx(reducer, initialState);

function useAssets() {
  const context = useContext(ctx);

  if (context === undefined) {
    throw new Error("useAssets must be used within a AssetsProvider");
  }

  return context;
}

export { AssetsProvider, useAssets };

import { useContext } from "react";
import { uniqBy, concat } from "lodash";

import { Contract } from "../types/asset";
import { createCtx } from "../utils/context";

interface Balance extends Contract {
  amount: number;
}

interface IAppState {
  balances?: Record<number, Balance[]>;
}

const initialState: IAppState = {
  balances: undefined,
};

type AppState = typeof initialState;
type Action = { type: "set"; payload: { chainId: number; balance: Balance } } | { type: "reset" };

function reducer(state: AppState, action: Action): AppState {
  let values;
  switch (action.type) {
    case "set":
      values = state?.balances?.[action.payload.chainId] || [];
      values = uniqBy(concat(action.payload.balance || [], values), "contract_address");

      return { ...state, balances: { ...state.balances, [action.payload.chainId]: values } };
    case "reset":
      return { ...initialState };
    default:
      throw new Error();
  }
}

const [ctx, BalancesProvider] = createCtx(reducer, initialState);

function useBalances() {
  const context = useContext(ctx);

  if (context === undefined) {
    throw new Error("useBalances must be used within a BalancesProvider");
  }

  return context;
}

export { BalancesProvider, useBalances };

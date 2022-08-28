import { Web3Provider } from "@coinbase/wallet-sdk/dist/provider/Web3Provider";
import * as React from "react";

export function createCtx<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType,
) {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState;
  const ctx = React.createContext({
    state: initialState,
    dispatch: defaultDispatch,
  });

  function Provider(props: React.PropsWithChildren<Record<string, unknown>>) {
    const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState);
    return <ctx.Provider value={{ state, dispatch }} {...props} />;
  }

  return [ctx, Provider] as const;
}

interface IAppState {
  provider: any;
  web3_provider?: Web3Provider;
  signer: any;
  chain_id?: number;
  address?: string;
  default_chain_id?: number;
}

const initialState: IAppState = {
  provider: undefined,
  web3_provider: undefined,
  signer: undefined,
  chain_id: undefined,
  address: undefined,
  default_chain_id: undefined,
};

type AppState = typeof initialState;
type Action = { type: "set"; payload: object } | { type: "reset" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "set":
      return { ...state, ...action.payload };
    case "reset":
      return { ...initialState };
    default:
      throw new Error();
  }
}

const [ctx, WalletProvider] = createCtx(reducer, initialState);

function useWallet() {
  const context = React.useContext(ctx);

  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  return context;
}

export { WalletProvider, useWallet };

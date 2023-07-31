import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

export interface GlobalContext {
  favoriteValue: string | null;
}

const initialState: GlobalContext = {
  favoriteValue: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: GlobalContext, action: any): GlobalContext => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        favoriteValue: action.payload,
      };
    case "REMOVE_FAVORITE":
      return {
        favoriteValue: "",
      };
    default:
      return state;
  }
};

export const StateContext = createContext<GlobalContext>(initialState);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DispatchContext = createContext<Dispatch<any> | undefined>(
  undefined
);

export const GlobalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContext => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("Must be used within a ThemeProvider");
  }
  return context;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGlobalDispatch = (): Dispatch<any> => {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error("Must be used within a ThemeProvider");
  }
  return dispatch;
};

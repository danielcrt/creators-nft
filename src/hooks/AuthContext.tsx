import React from "react";
import { useSelfUsers } from "../pages/api/user/users";

export type User = {
  id: string;
  username: string;
  email: string;
  locale: string;
  address: string;
}

export type GlobalState = {
  user?: User;
  mutateUser: () => void;
  error: any
}

const GlobalStateContext = React.createContext<GlobalState>({
  user: undefined,
  mutateUser: () => { },
  error: null,
});

export function GlobalStateProvider(props: any) {
  const { user, error, mutateUser } = useSelfUsers();

  const value = React.useMemo(() => ({ user, error, mutateUser }), [
    user,
    error,
    mutateUser,
  ]);

  return <GlobalStateContext.Provider value={value} {...props} />;
}

export function useGlobalState() {
  const context = React.useContext(GlobalStateContext);

  if (!context) {
    throw new Error("You need to wrap GlobalStateProvider.");
  }

  return context;
}
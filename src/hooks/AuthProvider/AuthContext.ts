import React from "react";
import { AuthState, Permission } from "../../types";

export const AuthContext = React.createContext<AuthState>({
  user: undefined,
  mutateUser: () => { },
  checkIsAllowedTo: (permission: Permission) => false,
  error: null,
});

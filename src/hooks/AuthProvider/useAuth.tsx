import React from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("You need to wrap AuthProvider.");
  }

  return context;
}
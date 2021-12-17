import React from "react";
import { useSelfUsers } from "../../pages/api/user/users";
import { Permission } from "../../types";
import { AuthContext } from "./AuthContext";

type PermissionCache = {
  [key: string]: boolean;
}

export function AuthProvider(props: any) {
  const { user, error, mutateUser } = useSelfUsers();

  const cache: PermissionCache = {};

  const checkIsAllowedTo = (permission: Permission): boolean => {
    if (Object.keys(cache).includes(permission)) {
      return cache[permission];
    }
    const isAllowed = user?.permissions.includes(permission);
    cache[permission] = isAllowed;
    return isAllowed;
  };


  const value = React.useMemo(() => ({ user, error, mutateUser, checkIsAllowedTo }), [
    user,
    error,
    mutateUser,
    checkIsAllowedTo
  ]);

  return <AuthContext.Provider value={value} {...props} />;
}
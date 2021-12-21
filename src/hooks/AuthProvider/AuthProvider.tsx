import React from "react";
import { useSelfUsers } from "../../pages/api/user/users";
import { Permission } from "../../types";
import { Dictionary } from "../../types/Dictionary";
import { AuthContext } from "./AuthContext";

type PermissionCache = {
  [key: string]: boolean;
}

type ResourcePermissionCache = {
  [key: string]: Dictionary<boolean>;
}

export function AuthProvider(props: any) {
  const { user, error, mutateUser } = useSelfUsers();

  const cache: PermissionCache = {};
  const resourceCache: ResourcePermissionCache = {};

  const checkIsAllowedTo = (permission: Permission, resource?: any): boolean => {
    if (resource) {
      if (Object.keys(resourceCache).includes(permission)
        && Object.keys(resourceCache[permission]).includes(resource.id)
      ) {
        return resourceCache[permission][resource.id];
      }
      if (Object.keys(resourceCache).length === 0) {
        resourceCache[permission] = {};
      }
      const isAllowed = user?.permissions.includes(permission) &&
        "owner" in resource &&
        resource.owner === user.address;

      resourceCache[permission][resource.id] = isAllowed;
      return isAllowed;
    }

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
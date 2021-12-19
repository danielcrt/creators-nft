import React from 'react';
import { Permission } from "../../types";
import { useAuth } from '../../hooks/AuthProvider';

type Props = {
  to: Permission;
  resource?: any;
  fallback?: JSX.Element | string;
};

// This component is meant to be used everywhere a restriction based on user permission is needed
const Restricted: React.FunctionComponent<Props> = ({ to, resource, fallback, children }) => {
  const { checkIsAllowedTo } = useAuth();
  const allowed = checkIsAllowedTo(to, resource);

  // If the user has that permission, render the children
  if (allowed) {
    return <>{children}</>;
  }

  // Otherwise, render the fallback
  return <>{fallback}</>;
};

export default Restricted;
import { Permission } from ".";
import { User } from "./User";

export type AuthState = {
  user?: User;
  mutateUser: (user?: User) => void;
  checkIsAllowedTo: (permission: Permission) => boolean;
  error: any
}
import { Permission } from ".";

export type User = {
  id: string;
  username: string;
  email: string;
  locale: string;
  address: string;
  permissions: Permission[]
}
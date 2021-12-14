import { createContext, SetStateAction, Dispatch } from "react";

export interface IHomeContext {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const HomeContext = createContext<IHomeContext>({
  searchValue: '',
  setSearchValue: () => { }
});

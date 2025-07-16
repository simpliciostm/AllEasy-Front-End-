import { createContext } from "react";

export interface IAuthContext {
  login: (email: string, password: string) => void;
  logout: () => void;
  username: string;
  userAuth: string;
}

export const AuthContext = createContext<IAuthContext>({
  login: () => {},
  logout: () => {},
  username: "",
  userAuth: "",
});
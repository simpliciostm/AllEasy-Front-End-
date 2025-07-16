import { createContext } from "react";

export interface IAuthContext {
  login: (email: string, password: string) => void;
  logout: () => void;
  username: string;
  userAuth: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  login: () => {},
  logout: () => {},
  username: "",
  userAuth: false,
});
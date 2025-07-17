import type { IAuthContext } from "@/models/interfaces/IAuthContext";
import { createContext } from "react";

export const AuthContext = createContext<IAuthContext>({
  login: () => {},
  logout: () => {},
  username: "",
  userAuth: ""
});

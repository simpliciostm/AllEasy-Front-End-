export interface IAuthContext {
  login: (email: string, password: string) => void;
  logout: () => void;
  username: string;
  userAuth: string;
  idUser: string;
}

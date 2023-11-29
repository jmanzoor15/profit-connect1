export interface IAuth {
  return: boolean;
  message: string;
  email: string;
  firstname: string;
  lastname: string;
  token: string;
  ID: string;
  role: string;
}

export interface IUserType {
  type: string;
  id: string;
  name: string;
}

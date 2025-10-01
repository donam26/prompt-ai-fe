import { User } from "@/types";

// IAuthType đã được thay thế bằng NextAuthUser để tránh trùng lặp

export interface ISignInData {
  email: string;
  password: string;
}

export enum CredentialActionType {
  SetupPassword = "setupPassword",
  Login = "login",
}

export interface NextAuthUser extends User {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface NextAuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: NextAuthUser;
}

export interface NextAuthSession {
  user: NextAuthUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

import { User } from "@/types";

export interface IAuthType {
  userId: string | number;
  email: string;
  full_name: string;
  role_id: number;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  permissions?: string[] | string;
  count_prompt?: number;
  updated_at: string;
  userSub?: unknown;
  avatar?: string;
  created_at?: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export enum CredentialActionType {
  SetupPassword = "setup_password",
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

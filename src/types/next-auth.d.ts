import { NextAuthUser } from "./auth";

declare module "next-auth" {
  interface Session {
    user: NextAuthUser;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }

  interface User extends NextAuthUser {
    // User interface extends NextAuthUser with additional properties
    permissions?: string[];
    count_prompt?: number;
    updated_at?: string;
    userSub?: import("@/lib/types").UserSubscription;
    avatar?: string;
    created_at?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: NextAuthUser;
  }
}

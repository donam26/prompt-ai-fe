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
    countPrompt?: number;
    updatedAt?: string;
    userSub?: import("@/lib/types").UserSubscription;
    avatar?: string;
    createdAt?: string;
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

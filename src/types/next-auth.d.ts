import { NextAuthUser } from "./auth";

declare module "next-auth" {
  interface Session {
    user: NextAuthUser;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    shouldSyncToStore?: boolean;
    syncData?: {
      user: NextAuthUser;
      token: string;
    };
  }

  interface User extends NextAuthUser {
    // User interface extends NextAuthUser with additional properties
    permissions?: string[];
    countPromt?: number;
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
    shouldSyncToStore?: boolean;
    syncData?: {
      user: NextAuthUser;
      token: string;
    };
  }
}

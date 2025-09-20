import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  DEFAULT_EXPIRE_TOKEN_SECONDS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_EXPIRE_SECONDS,
} from "@/constants/auth";
import { userService } from "@/services";
import { CredentialActionType, IAuthType } from "@/types/auth";
import type { UserSubscription } from "@/lib/types";
import { getUserInfoFromToken } from "@/utils/TokenDecoder";
import { transformUserDataForNextAuth } from "@/utils/userDataTransform";

const setCookieToken = async (name: string, value: string, maxAge: number) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge,
  });
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "text", optional: true },
        userId: { label: "User ID", type: "text", optional: true },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        let user: IAuthType | null = null;

        try {
          switch (credentials.type) {
            case CredentialActionType.SetupPassword:
              // Handle password setup if needed
              // This would need to be implemented in your userService
              return null;

            case undefined:
            default:
              // Handle regular login
              const response = await userService.passwordLogin({
                email: credentials.email,
                password: credentials.password,
                userIP: "", // You might want to get this from the request
              });

              if (response.data.success && response.data.data) {
                const { user: userData, token } = response.data.data.data as {
                  user: unknown;
                  token: string;
                };

                // Create IAuthType object with new data structure
                user = transformUserDataForNextAuth(userData, token);
              }
              break;
          }

          if (!user) {
            return null;
          }

          const { accessToken, refreshToken } = user;
          const userInfo = getUserInfoFromToken(accessToken);
          const refreshTokenInfo = getUserInfoFromToken(refreshToken);
          const refreshTokenMaxAge = refreshTokenInfo?.exp
            ? refreshTokenInfo.exp * 1000
            : REFRESH_TOKEN_EXPIRE_SECONDS;

          const expiresInSec = userInfo?.exp
            ? userInfo.exp * 1000
            : DEFAULT_EXPIRE_TOKEN_SECONDS;
          await setCookieToken(
            ACCESS_TOKEN_COOKIE_NAME,
            accessToken,
            expiresInSec
          );
          await setCookieToken(
            REFRESH_TOKEN_COOKIE_NAME,
            refreshToken,
            refreshTokenMaxAge
          );

          return {
            ...user,
            id: String(user.userId),
            userSub: user.userSub as UserSubscription | undefined,
            permissions: Array.isArray(user.permissions)
              ? user.permissions
              : [],
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      const updatedSession = {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresIn: token.expiresIn,
      };

      return updatedSession;
    },

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = user.expiresIn;
      }
      return token;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

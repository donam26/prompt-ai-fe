import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  DEFAULT_EXPIRE_TOKEN_SECONDS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_EXPIRE_SECONDS,
} from "@/constants/auth";
import { CredentialActionType, NextAuthUser } from "@/types/auth";
import { getUserInfoFromToken } from "@/utils/token-decoder";
import { userService } from "@/services/users/userService";
import {
  transformBackendUserToAuth,
  transformUserForSession,
} from "@/utils/user-transform";

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
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

        const user: NextAuthUser | null = null;

        try {
          switch (credentials.type) {
            case CredentialActionType.SetupPassword:
              return null;

            case undefined:
            default:
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

          return null;
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
        user: token.user || session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresIn: token.expiresIn,
        shouldSyncToStore: token.shouldSyncToStore,
        syncData: token.syncData,
      };

      return updatedSession;
    },

    async jwt({ token, user, account }) {
      if (user && account && account.provider === "google") {
        try {
          // For Google login, we need to get the credential from the account
          // The account object should contain the access_token or id_token
          const credential = account.id_token || account.access_token;

          if (!credential) {
            throw new Error("No credential available from Google");
          }

          // Call backend API to sync Google user data
          const backendResponse = await userService.googleLogin(credential);

          // Transform user data using helper
          const transformedUser = transformBackendUserToAuth(
            backendResponse,
            user as any
          );

          console.log({
            transformedUser,
            backendResponse,
          });

          // Set token properties
          token.accessToken = transformedUser.accessToken;
          token.refreshToken = transformedUser.refreshToken;
          token.expiresIn = transformedUser.expiresIn;
          token.user = transformUserForSession(transformedUser);

          // Force client-side sync by setting a flag
          token.shouldSyncToStore = true;
          token.syncData = {
            user: {
              id: transformedUser.id,
              fullName: transformedUser.fullName,
              email: transformedUser.email,
              avatar: transformedUser.avatar,
              role: transformedUser.role,
              accountStatus: transformedUser.accountStatus,
              createdAt: transformedUser.createdAt,
              updatedAt: transformedUser.updatedAt,
              accessToken: transformedUser.accessToken,
              refreshToken: transformedUser.refreshToken,
              expiresIn: transformedUser.expiresIn,
              userSub: transformedUser.userSub,
              permissions: transformedUser.permissions,
              countPrompt: transformedUser.countPrompt,
            },
            token: transformedUser.accessToken,
          };
        } catch (error) {
          console.error("Backend Google login failed:", error);

          // Fallback to local data if backend fails
          const transformedUser = transformBackendUserToAuth({}, user as any);

          // Set token properties
          token.accessToken = transformedUser.accessToken;
          token.refreshToken = transformedUser.refreshToken;
          token.expiresIn = transformedUser.expiresIn;
          token.user = transformUserForSession(transformedUser);

          // Force client-side sync by setting a flag
          token.shouldSyncToStore = true;
          token.syncData = {
            user: {
              id: transformedUser.id,
              fullName: transformedUser.fullName,
              email: transformedUser.email,
              avatar: transformedUser.avatar,
              role: transformedUser.role,
              accountStatus: transformedUser.accountStatus,
              createdAt: transformedUser.createdAt,
              updatedAt: transformedUser.updatedAt,
              accessToken: transformedUser.accessToken,
              refreshToken: transformedUser.refreshToken,
              expiresIn: transformedUser.expiresIn,
              userSub: transformedUser.userSub,
              permissions: transformedUser.permissions,
              countPrompt: transformedUser.countPrompt,
            },
            token: transformedUser.accessToken,
          };
        }
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
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

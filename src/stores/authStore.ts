import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types";
import {
  DEFAULT_EXPIRE_TOKEN_SECONDS,
  REFRESH_TOKEN_EXPIRE_SECONDS,
} from "@/constants/auth";
import { signOut } from "next-auth/react";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  updateUser: (partial: Partial<User>) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  login: (userData: User, authToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isLoading: true,

      setUser: user => set({ user }),

      // Merge fresh fields (e.g. userSub after a purchase / on app load) into the
      // current user without dropping the accessToken or other existing fields.
      updateUser: partial =>
        set(state => {
          if (!state.user) return {};
          const merged = { ...state.user, ...partial };
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(merged));
          }
          return { user: merged };
        }),

      setToken: token => set({ token }),
      setLoading: isLoading => set({ isLoading }),

      login: (userData, authToken) => {
        // Add accessToken to user object for localStorage
        const userWithAccessToken = {
          ...userData,
          accessToken: authToken,
        };

        set({ user: userWithAccessToken, token: authToken, isLoading: false });

        // Set cookies for API requests only
        if (typeof window !== "undefined") {
          // Set custom cookies for API client
          document.cookie = `accessToken=${authToken}; path=/; max-age=${DEFAULT_EXPIRE_TOKEN_SECONDS}; SameSite=Lax`;
          document.cookie = `refreshToken=${authToken}; path=/; max-age=${REFRESH_TOKEN_EXPIRE_SECONDS}; SameSite=Lax`;

          // Also set in localStorage for api-client.ts
          localStorage.setItem("authToken", authToken);

          // Set user object with accessToken in localStorage
          localStorage.setItem("user", JSON.stringify(userWithAccessToken));
        }
      },

      logout: async () => {
        set({ user: null, token: null, isLoading: false });
        await signOut({
          callbackUrl: "/",
          redirect: true,
        });

        sessionStorage.clear();

        // Clear custom auth data only (not NextAuth)
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-storage");
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");

          // Clear custom cookies only
          document.cookie = `accessToken=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          document.cookie = `refreshToken=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => state => {
        // Set loading to false after rehydration
        if (state) {
          state.setLoading(false);

          // Sync token with api-client after rehydration
          if (typeof window !== "undefined" && state.token && state.user) {
            localStorage.setItem("authToken", state.token);

            // Update user object with accessToken if not already present
            if (!state.user.accessToken) {
              const userWithAccessToken = {
                ...state.user,
                accessToken: state.token,
              };
              localStorage.setItem("user", JSON.stringify(userWithAccessToken));
            }
          }
        }
      },
    }
  )
);

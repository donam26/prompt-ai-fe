import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types";
import {
  DEFAULT_EXPIRE_TOKEN_SECONDS,
  REFRESH_TOKEN_EXPIRE_SECONDS,
} from "@/constants/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
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
      setToken: token => set({ token }),
      setLoading: isLoading => set({ isLoading }),

      login: (userData, authToken) => {
        set({ user: userData, token: authToken, isLoading: false });

        // Set cookies for API requests only
        if (typeof window !== "undefined") {
          // Set custom cookies for API client
          document.cookie = `accessToken=${authToken}; path=/; max-age=${DEFAULT_EXPIRE_TOKEN_SECONDS}; SameSite=Lax`;
          document.cookie = `refreshToken=${authToken}; path=/; max-age=${REFRESH_TOKEN_EXPIRE_SECONDS}; SameSite=Lax`;

          // Also set in localStorage for api-client.ts
          localStorage.setItem("authToken", authToken);
        }
      },

      logout: () => {
        set({ user: null, token: null, isLoading: false });

        // Clear custom auth data only (not NextAuth)
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-storage");
          localStorage.removeItem("authToken");

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
          if (typeof window !== "undefined" && state.token) {
            localStorage.setItem("authToken", state.token);
          }
        }
      },
    }
  )
);

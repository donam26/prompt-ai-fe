import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  DEFAULT_EXPIRE_TOKEN_SECONDS,
  REFRESH_TOKEN_EXPIRE_SECONDS,
} from "@/constants/auth";
import { clearAllAuthData, forceClearAllCookies } from "@/utils/auth-cleanup";

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

        // Set cookies for NextAuth compatibility
        if (typeof window !== "undefined") {
          // Set both custom and NextAuth cookie names for compatibility
          document.cookie = `accessToken=${authToken}; path=/; max-age=${DEFAULT_EXPIRE_TOKEN_SECONDS}; SameSite=Lax`;
          document.cookie = `refreshToken=${authToken}; path=/; max-age=${REFRESH_TOKEN_EXPIRE_SECONDS}; SameSite=Lax`;
          document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=${authToken}; path=/; max-age=${DEFAULT_EXPIRE_TOKEN_SECONDS}; SameSite=Lax`;
          document.cookie = `${REFRESH_TOKEN_COOKIE_NAME}=${authToken}; path=/; max-age=${REFRESH_TOKEN_EXPIRE_SECONDS}; SameSite=Lax`;
        }
      },

      logout: () => {
        set({ user: null, token: null, isLoading: false });

        // Clear all authentication data
        clearAllAuthData();

        // Force clear all cookies as backup
        setTimeout(() => {
          forceClearAllCookies();
        }, 100);
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
        }
      },
    }
  )
);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/lib/types";

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
        set({ user: userData, token: authToken });

        // Set cookies for NextAuth compatibility
        if (typeof window !== "undefined") {
          document.cookie = `accessToken=${authToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
          document.cookie = `refreshToken=${authToken}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
        }
      },

      logout: () => {
        set({ user: null, token: null });

        // Clear cookies
        if (typeof window !== "undefined") {
          document.cookie = "accessToken=; path=/; max-age=0";
          document.cookie = "refreshToken=; path=/; max-age=0";
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
    }
  )
);

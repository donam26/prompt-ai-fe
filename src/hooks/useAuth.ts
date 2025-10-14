import { useAuthStore } from "@/stores/authStore";

export const useAuth = () => {
  const {
    user,
    token,
    isLoading,
    setUser,
    setToken,
    setLoading,
    login,
    logout,
  } = useAuthStore();

  return {
    user,
    token,
    isLoading,
    isLoggedIn: !!(user && token),
    setUser,
    setToken,
    setLoading,
    login,
    logout,
  };
};

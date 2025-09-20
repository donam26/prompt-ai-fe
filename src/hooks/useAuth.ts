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
    setUser,
    setToken,
    setLoading,
    login,
    logout,
  };
};

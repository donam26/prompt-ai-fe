import { useAuthStore } from "@/stores/authStore";

export const useAuth = () => {
  const {
    user,
    token,
    isLoading,
    setUser,
    updateUser,
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
    updateUser,
    setToken,
    setLoading,
    login,
    logout,
  };
};

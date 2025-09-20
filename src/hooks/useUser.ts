import { useAuthStore } from "@/stores/authStore";

export const useUser = () => {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  return {
    user,
    setUser,
  };
};

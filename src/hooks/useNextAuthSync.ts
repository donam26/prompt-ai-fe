import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export const useNextAuthSync = () => {
  const { data: session, status } = useSession();
  const { login, logout } = useAuthStore();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (session?.user && session?.accessToken) {
      // Use the user data from NextAuth session (already transformed in JWT callback)
      const userData = {
        id: session.user.id || 0,
        fullName: session.user.fullName,
        email: session.user.email || "",
        avatar: session.user.avatar || "",
        role: session.user.role || 1,
        accountStatus: session.user.accountStatus || 1,
        createdAt: session.user.createdAt || new Date().toISOString(),
        updatedAt: session.user.updatedAt || new Date().toISOString(),
      };

      // Login to authStore
      login(userData, session.accessToken);
    } else if (status === "unauthenticated") {
      logout();
    }
  }, [session, status, login, logout]);

  // Handle logout from authStore - also clear NextAuth session
  useEffect(() => {
    const handleLogout = () => {
      if (status === "authenticated") {
        signOut({ redirect: false });
      }
    };

    // Listen for logout events from authStore
    const unsubscribe = useAuthStore.subscribe(state => {
      if (!state.user && !state.token && state.isLoading === false) {
        handleLogout();
      }
    });

    return unsubscribe;
  }, [status]);

  return { session, status };
};

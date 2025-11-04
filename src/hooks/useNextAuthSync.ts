import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/authStore";
import { trackLogin, trackSignup } from "@/lib/ga";

export const useNextAuthSync = () => {
  const { data: session, status } = useSession();
  const { login, logout } = useAuthStore();
  const hasTrackedAuth = useRef(false);

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

      // Track signup or login event for Google OAuth (only once per session)
      if (!hasTrackedAuth.current && session.user.createdAt) {
        // Check if this is a new user (signup) by comparing createdAt with current time
        // If createdAt is within the last 10 seconds, it's likely a new user
        const createdAt = session.user.createdAt;
        const isValidDate =
          createdAt &&
          createdAt !== "" &&
          !isNaN(new Date(createdAt).getTime());

        if (isValidDate) {
          const isNewUser =
            new Date().getTime() - new Date(createdAt).getTime() < 10000;

          if (isNewUser) {
            trackSignup("google");
          } else {
            trackLogin("google");
          }
        } else {
          // If we can't determine, default to login
          trackLogin("google");
        }
        hasTrackedAuth.current = true;
      }

      // Login to authStore
      login(userData, session.accessToken);
    } else if (status === "unauthenticated") {
      hasTrackedAuth.current = false;
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

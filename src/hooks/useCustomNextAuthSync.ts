import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/authStore";
import { resolveCheckoutUserId } from "@/utils/checkout-user";

/**
 * When the backend Google login call fails, the NextAuth callback falls back to
 * a default user whose id is 0. Persisting that produces a session that looks
 * logged in but cannot buy anything (the payment API rejects "guest-<planId>"),
 * so refuse to overwrite the store with it.
 */
const hasUsableId = (candidate: { id?: number | string | null } | null) =>
  resolveCheckoutUserId(candidate, null) !== null;

export const useCustomNextAuthSync = () => {
  const { data: session, status } = useSession();
  const { login, logout } = useAuthStore();
  const isInitialMount = useRef(true);
  const lastSessionUser = useRef<string | null>(null);

  useEffect(() => {
    // Skip initial mount to prevent conflicts
    if (isInitialMount.current) {
      isInitialMount.current = false;
      lastSessionUser.current = session?.user?.email || null;
      return;
    }

    // Check if we need to sync data to store (from Google login)
    if (session?.shouldSyncToStore && session?.syncData) {
      if (!hasUsableId(session.syncData.user)) {
        console.error(
          "Bỏ qua đồng bộ phiên đăng nhập Google: thiếu user id hợp lệ (backend login thất bại)."
        );
        return;
      }
      login(session.syncData.user, session.syncData.token);
      lastSessionUser.current = session.syncData.user.email;
      return;
    }

    // Only sync if session actually changed and we have a user
    const currentUserEmail = session?.user?.email || null;

    if (
      session?.user &&
      session?.accessToken &&
      currentUserEmail !== lastSessionUser.current
    ) {
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
        // Carry subscription through so premium gating works on the session path.
        permissions: session.user.permissions,
        countPromt: session.user.countPromt,
        userSub: session.user.userSub,
      };

      // Only login if we don't already have this user logged in
      const currentAuthUser = useAuthStore.getState().user;
      if (!currentAuthUser || currentAuthUser.email !== userData.email) {
        if (!hasUsableId(userData)) {
          console.error(
            "Bỏ qua đồng bộ phiên NextAuth: thiếu user id hợp lệ (backend login thất bại)."
          );
          return;
        }
        login(userData, session.accessToken);
      }

      lastSessionUser.current = currentUserEmail;
    }

    // Don't auto-logout on session unauthenticated to prevent multi-tab conflicts
    // Only logout if explicitly called
  }, [session, login]);

  // Handle manual logout - only clear NextAuth session when explicitly logging out
  const handleManualLogout = () => {
    if (status === "authenticated") {
      signOut({ redirect: false });
    }
    logout();
  };

  return {
    session,
    status,
    handleManualLogout,
  };
};

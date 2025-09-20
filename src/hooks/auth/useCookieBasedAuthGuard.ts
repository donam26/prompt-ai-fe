import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useGetMeQuery } from "@/hooks/auth/useGetMeQuery";
import {
  getSessionFromCookies,
  isProtectedPath,
  handleRedirectToSignIn,
  handleRedirectToDashboard,
  handleUserRedirect,
  clearSessionCookies,
} from "@/utils/sessionManager";
import { INIT_STATUS, AUTH_PAGES, PROTECTED_PATHS } from "@/constants/session";

export const useCookieBasedAuthGuard = () => {
  // State và refs
  const syncLockRef = useRef(false);
  const lastSyncedPathRef = useRef<string | null>(null);
  const initStatus = useRef<keyof typeof INIT_STATUS>(INIT_STATUS.PENDING);

  // Hooks
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { refetch: refetchUserData } = useGetMeQuery();

  // 2. Các function chính
  const getCurrentSession = useCallback(() => getSessionFromCookies(), []);

  const checkIsAuthPage = useCallback(
    (path: string) => AUTH_PAGES.some(authPage => path.startsWith(authPage)),
    []
  );

  const checkIsAdminPage = useCallback(
    (path: string) =>
      PROTECTED_PATHS.some(protectedPath => path.startsWith(protectedPath)),
    []
  );

  // Clear user session
  const clearUserSession = useCallback(() => {
    logout();
    clearSessionCookies();
  }, [logout]);

  // 3. Sync user data từ API
  const syncUserData = useCallback(
    async (token: string) => {
      if (syncLockRef.current || !token) return;

      syncLockRef.current = true;
      try {
        // Refetch user data from API
        refetchUserData();
      } catch {
        clearUserSession();
        if (isProtectedPath(pathname)) {
          handleRedirectToSignIn(pathname);
        }
      } finally {
        syncLockRef.current = false;
      }
    },
    [refetchUserData, pathname, clearUserSession]
  );

  // 4. Handle session và redirect logic
  const handleSessionAndRedirect = useCallback(
    (currentPath: string) => {
      const session = getCurrentSession();
      const isAuth = checkIsAuthPage(currentPath);
      const isProtected = isProtectedPath(currentPath);

      if (!session.accessToken && isProtected) {
        handleRedirectToSignIn(currentPath);
        return false;
      }

      if (session.accessToken && isAuth) {
        handleRedirectToDashboard();
        return false;
      }

      if (
        session.accessToken &&
        !isAuth &&
        lastSyncedPathRef.current !== currentPath
      ) {
        lastSyncedPathRef.current = currentPath;
        syncUserData(session.accessToken);
        return true;
      }

      return false;
    },
    [getCurrentSession, checkIsAuthPage, syncUserData]
  );

  // 5. Effects
  useEffect(() => {
    // Initial redirect & session handling
    if (initStatus.current === INIT_STATUS.PENDING) {
      handleSessionAndRedirect(pathname);
      initStatus.current = INIT_STATUS.COMPLETED;
    }
  }, [pathname, handleSessionAndRedirect]);

  useEffect(() => {
    // Handle redirect logic for verified/unverified user
    if (initStatus.current === INIT_STATUS.PENDING) return;

    const session = getCurrentSession();
    const isAuthPage = checkIsAuthPage(pathname);
    const isAdminPage = checkIsAdminPage(pathname);

    if (session.accessToken && user && (isAuthPage || isAdminPage)) {
      handleUserRedirect(user, pathname);
    }

    if (!session.accessToken && isProtectedPath(pathname)) {
      clearUserSession();
      handleRedirectToSignIn(pathname);
    }
  }, [
    pathname,
    user,
    getCurrentSession,
    checkIsAuthPage,
    checkIsAdminPage,
    clearUserSession,
  ]);

  useEffect(() => {
    // Sync on visibility change
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;

      const session = getCurrentSession();
      const isAuthPage = checkIsAuthPage(pathname);

      if (!session.accessToken) {
        lastSyncedPathRef.current = null;
        if (user) clearUserSession();
        if (isProtectedPath(pathname)) handleRedirectToSignIn(pathname);
        return;
      }

      if (session.accessToken && user && isAuthPage) {
        handleRedirectToDashboard();
        return;
      }

      if (session.accessToken) {
        syncUserData(session.accessToken);
      }
    };

    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [
    pathname,
    user,
    getCurrentSession,
    checkIsAuthPage,
    syncUserData,
    clearUserSession,
  ]);

  return {
    getCurrentSession,
    syncUserData,
    clearUserSession,
  };
};

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { showToast } from "@/components/ui/toast";

interface UseAuthRedirectOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  requireGuest?: boolean;
  showWarning?: boolean;
  warningMessage?: string;
}

export const useAuthRedirect = ({
  redirectTo = "/",
  requireAuth = false,
  requireGuest = false,
  showWarning = false,
  warningMessage = "Bạn cần đăng nhập để truy cập trang này",
}: UseAuthRedirectOptions = {}) => {
  const { user, isLoading, isLoggedIn } = useAuth();
  const router = useRouter();
  const hasShownWarning = useRef(false);
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (isLoading) return;

    // If user is logged in and page requires guest (like login page)
    if (isLoggedIn && requireGuest && !hasRedirected.current) {
      hasRedirected.current = true;
      router.push(redirectTo);
      return;
    }

    // If user is not logged in and page requires auth (like admin page)
    if (!isLoggedIn && requireAuth && !hasRedirected.current) {
      hasRedirected.current = true;

      if (showWarning && !hasShownWarning.current) {
        hasShownWarning.current = true;
        showToast.warning(warningMessage);
        // Delay redirect to allow toast to be visible
        setTimeout(() => {
          router.push(redirectTo);
        }, 1500);
      } else {
        router.push(redirectTo);
      }
    }
  }, [
    isLoggedIn,
    isLoading,
    requireAuth,
    requireGuest,
    redirectTo,
    router,
    showWarning,
    warningMessage,
  ]);

  return {
    isLoggedIn,
    isLoading,
    user,
  };
};

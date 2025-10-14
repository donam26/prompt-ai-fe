import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

interface UseAuthRedirectOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  requireGuest?: boolean;
}

export const useAuthRedirect = ({
  redirectTo = "/",
  requireAuth = false,
  requireGuest = false,
}: UseAuthRedirectOptions = {}) => {
  const { user, isLoading, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // If user is logged in and page requires guest (like login page)
    if (isLoggedIn && requireGuest) {
      router.push(redirectTo);
      return;
    }

    // If user is not logged in and page requires auth (like admin page)
    if (!isLoggedIn && requireAuth) {
      router.push(redirectTo);
      return;
    }
  }, [isLoggedIn, isLoading, requireAuth, requireGuest, redirectTo, router]);

  return {
    isLoggedIn,
    isLoading,
    user,
  };
};

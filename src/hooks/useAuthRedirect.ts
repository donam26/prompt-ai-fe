import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoggedIn = !!(user || session?.user);
  const isLoading = isAuthLoading || status === "loading";

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
    user: user || session?.user,
  };
};

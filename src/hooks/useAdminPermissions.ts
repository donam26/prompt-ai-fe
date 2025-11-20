import { useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  hasPermission,
  getAccessibleScreens,
  ADMIN_SCREENS,
} from "@/constants";

export const useAdminPermissions = () => {
  const { user } = useAuth();

  const isAdmin = useMemo(() => {
    if (!user) return false;
    if (user.role === 2) return true; // Super admin

    // Tất cả role > 1 có permissions
    if (user.role > 1) {
      const perms = user.permissions;
      if (!perms) return false;

      // Handle object format
      if (typeof perms === "object" && !Array.isArray(perms)) {
        return Object.values(perms).some(v => v === true);
      }

      // Handle array format
      if (Array.isArray(perms)) {
        return perms.length > 0;
      }

      // Handle string format
      if (typeof perms === "string") {
        return perms.trim().length > 0;
      }
    }

    return false;
  }, [user]);

  const canAccess = (screen: string) => {
    return hasPermission(user, screen);
  };

  const getAccessibleScreensList = () => {
    return getAccessibleScreens(user);
  };

  const isSuperAdmin = user?.role === 2;
  return {
    isAdmin: !!isAdmin,
    isSuperAdmin: !!isSuperAdmin,
    canAccess,
    getAccessibleScreensList,
    user,
    ADMIN_SCREENS,
  };
};

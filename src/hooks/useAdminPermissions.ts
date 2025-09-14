import { useAuth } from "@/contexts/AuthContext";
import {
  hasPermission,
  getAccessibleScreens,
  ADMIN_SCREENS,
} from "@/lib/constants";

export const useAdminPermissions = () => {
  const { user } = useAuth();

  const isAdmin =
    user &&
    (user.role_id === 2 || // Super admin
      (user.role_id > 1 && (user.permissions || []).length > 0)); // Tất cả role > 1 có permissions

  const canAccess = (screen: string) => {
    return hasPermission(user, screen);
  };

  const getAccessibleScreensList = () => {
    return getAccessibleScreens(user);
  };

  const isSuperAdmin = user?.role_id === 2;

  return {
    isAdmin: !!isAdmin,
    isSuperAdmin: !!isSuperAdmin,
    canAccess,
    getAccessibleScreensList,
    user,
    ADMIN_SCREENS,
  };
};

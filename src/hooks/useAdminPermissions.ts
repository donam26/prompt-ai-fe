import { useAuth } from "@/hooks/useAuth";
import {
  hasPermission,
  getAccessibleScreens,
  ADMIN_SCREENS,
} from "@/constants";

export const useAdminPermissions = () => {
  const { user } = useAuth();

  const isAdmin =
    user &&
    (user.roleId === 2 || // Super admin
      (user.roleId > 1 && (user.permissions || []).length > 0)); // Tất cả role > 1 có permissions

  const canAccess = (screen: string) => {
    return hasPermission(user, screen);
  };

  const getAccessibleScreensList = () => {
    return getAccessibleScreens(user);
  };

  const isSuperAdmin = user?.roleId === 2;
  return {
    isAdmin: !!isAdmin,
    isSuperAdmin: !!isSuperAdmin,
    canAccess,
    getAccessibleScreensList,
    user,
    ADMIN_SCREENS,
  };
};

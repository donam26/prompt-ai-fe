import { useMemo, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { hasPermission, getAccessibleScreens } from "@/constants";
import { sidebarConfig } from "@/components/admin/constants/sidebar-config";
import type { SidebarItemType } from "@/components/admin/types/sidebar";

/**
 * Normalize permission name from snake_case to camelCase
 * Handles mapping between API format (snake_case) and frontend format (camelCase)
 */
const normalizePermissionName = (permission: string): string => {
  // Map common snake_case to camelCase
  const permissionMap: Record<string, string> = {
    blog_category: "blogCategory",
    send_mail: "sendMail",
    upload_word: "uploadWord",
  };

  return permissionMap[permission] || permission;
};

/**
 * Convert camelCase to snake_case
 * Handles reverse mapping from frontend format to API format
 */
const camelToSnake = (str: string): string => {
  const reverseMap: Record<string, string> = {
    blogCategory: "blog_category",
    sendMail: "send_mail",
    uploadWord: "upload_word",
  };

  return reverseMap[str] || str;
};

/**
 * Normalize permissions to array format
 * Handles string, array, object, or undefined permissions
 * Also normalizes permission names from snake_case to camelCase
 */
const normalizePermissions = (
  permissions: string[] | string | Record<string, boolean> | undefined
): string[] => {
  if (!permissions) return [];

  let permissionArray: string[] = [];

  // If already an array, use it
  if (Array.isArray(permissions)) {
    permissionArray = permissions.filter(p => p && typeof p === "string");
  } else if (typeof permissions === "object" && !Array.isArray(permissions)) {
    // Handle object format: { "permission": true, ... }
    permissionArray = Object.keys(permissions).filter(
      key => permissions[key] === true && typeof key === "string"
    );
  } else if (typeof permissions === "string") {
    // If string, try to parse as JSON first
    try {
      const parsed = JSON.parse(permissions);
      if (Array.isArray(parsed)) {
        permissionArray = parsed.filter(p => p && typeof p === "string");
      } else if (typeof parsed === "object" && parsed !== null) {
        // Handle object format from JSON string
        permissionArray = Object.keys(parsed).filter(
          key => parsed[key] === true && typeof key === "string"
        );
      } else {
        // If not array or object, split by comma
        permissionArray = permissions
          .split(",")
          .map(p => p.trim())
          .filter(Boolean);
      }
    } catch {
      // If not JSON, split by comma
      permissionArray = permissions
        .split(",")
        .map(p => p.trim())
        .filter(Boolean);
    }
  }

  // Normalize permission names (snake_case to camelCase)
  return permissionArray.map(p => normalizePermissionName(p));
};

/**
 * Hook to handle admin access control and sidebar menu filtering
 * - Checks if user has role > 1
 * - Validates permissions
 * - Returns accessible sidebar menus based on permissions
 */
export const useAdminAccess = () => {
  const { user } = useAuth();

  /**
   * Check if user can access admin panel
   * User must have role > 1 and at least one permission
   */
  const canAccessAdmin = useMemo(() => {
    if (!user) return false;

    // User must have role > 1
    if (user.role <= 1) return false;

    // Check if user has permissions
    const userPermissions = normalizePermissions(user.permissions);
    return userPermissions.length > 0;
  }, [user]);

  /**
   * Check if user is super admin (role = 2)
   */
  const isSuperAdmin = useMemo(() => {
    return user?.role === 2;
  }, [user]);

  /**
   * Get normalized user permissions
   */
  const userPermissions = useMemo(() => {
    return normalizePermissions(user?.permissions);
  }, [user?.permissions]);

  /**
   * Check if user has permission to access a specific screen
   * Handles both camelCase (screen) and snake_case (permissions) formats
   */
  const canAccessScreen = useCallback(
    (screen: string): boolean => {
      if (!user) return false;

      // Super admin has access to everything
      if (user.role === 2) return true;

      // User must have role > 1
      if (user.role <= 1) return false;

      const normalizedUserPermissions = userPermissions;

      // Check if user has the permission (exact match with normalized permissions)
      if (normalizedUserPermissions.includes(screen)) {
        return true;
      }

      // Also check snake_case version (in case screen is camelCase but permissions are snake_case)
      const snakeCaseScreen = camelToSnake(screen);
      if (normalizedUserPermissions.includes(snakeCaseScreen)) {
        return true;
      }

      // Also check using hasPermission function (which handles raw permissions)
      // This handles cases where permissions might be in different format
      if (hasPermission(user, screen)) {
        return true;
      }

      // Check snake_case version with hasPermission
      return hasPermission(user, snakeCaseScreen);
    },
    [user, userPermissions]
  );

  /**
   * Get all accessible screens based on user permissions
   */
  const accessibleScreens = useMemo(() => {
    if (!user) return [];
    return getAccessibleScreens(user);
  }, [user]);

  /**
   * Filter sidebar menu items based on user permissions
   * Returns only menu items that user has access to
   */
  const accessibleSidebarMenus = useMemo(() => {
    if (!canAccessAdmin) return [];

    // Super admin has access to all menus
    if (isSuperAdmin) {
      return sidebarConfig;
    }

    // Filter menus based on permissions
    return sidebarConfig.filter(item => {
      // If item has children, show it if at least one child has permission
      if (item.children && item.children.length > 0) {
        const hasAccessibleChild = item.children.some(child => {
          return canAccessScreen(child.permission);
        });
        return hasAccessibleChild;
      }

      // For items without children, check the item's permission
      return canAccessScreen(item.permission);
    });
  }, [canAccessAdmin, isSuperAdmin, canAccessScreen]);

  /**
   * Get accessible sidebar menu items with filtered children
   * This ensures that parent items only show children the user can access
   */
  const filteredSidebarMenus = useMemo(() => {
    if (!canAccessAdmin) return [];

    return accessibleSidebarMenus
      .map(item => {
        // If item has children, filter them based on permissions
        if (item.children && item.children.length > 0) {
          const filteredChildren = item.children.filter(child => {
            return isSuperAdmin || canAccessScreen(child.permission);
          });

          // Only include parent item if it has at least one accessible child
          if (filteredChildren.length === 0) {
            return null;
          }

          return {
            ...item,
            children: filteredChildren,
          };
        }

        return item;
      })
      .filter((item): item is SidebarItemType => item !== null);
  }, [accessibleSidebarMenus, isSuperAdmin, canAccessAdmin, canAccessScreen]);

  /**
   * Check if user can access a specific menu item by permission
   */
  const canAccessMenu = (permission: string): boolean => {
    if (!canAccessAdmin) return false;
    if (isSuperAdmin) return true;
    return canAccessScreen(permission);
  };

  return {
    // Access control
    canAccessAdmin,
    isSuperAdmin,
    userPermissions,

    // Screen access
    canAccessScreen,
    accessibleScreens,

    // Sidebar menu access
    canAccessMenu,
    accessibleSidebarMenus,
    filteredSidebarMenus,

    // User info
    user,
  };
};

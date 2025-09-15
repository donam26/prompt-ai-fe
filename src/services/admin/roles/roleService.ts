import { apiClient, buildUrlWithParams } from "../../base/apiClient";
import { ENDPOINTS } from "@/constants";
import { ServiceMethod } from "../../base/types";

// Role service parameters
export interface RoleListParams {
  [key: string]: unknown;
}

export class RoleService {
  // Get all roles
  getRoles: ServiceMethod = () => {
    return apiClient.get(ENDPOINTS.ROLES.BASE);
  };

  // Get role by ID
  getRoleById: ServiceMethod<string | number> = id => {
    return apiClient.get(`${ENDPOINTS.ROLES.BASE}/${id}`);
  };

  // Create role
  createRole: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.ROLES.BASE, data);
  };

  // Update role
  updateRole: ServiceMethod<{ id: string | number; data: unknown }> =
    params => {
      const { id, data } = params || {};
      return apiClient.put(`${ENDPOINTS.ROLES.BASE}/${id}`, data);
    };

  // Delete role
  deleteRole: ServiceMethod<string | number> = id => {
    return apiClient.delete(`${ENDPOINTS.ROLES.BASE}/${id}`);
  };

  // Restore role
  restoreRole: ServiceMethod<string | number> = id => {
    return apiClient.patch(`${ENDPOINTS.ROLES.BASE}/${id}/restore`);
  };

  // Get deleted roles
  getDeletedRoles: ServiceMethod = () => {
    return apiClient.get(ENDPOINTS.ROLES.DELETED);
  };

  // Get users by role
  getUsersByRole: ServiceMethod<{
    roleId: string | number;
    params?: Record<string, unknown>;
  }> = params => {
    const { roleId, params: queryParams = {} } = params || {};
    const queryString =
      buildUrlWithParams(
        `${ENDPOINTS.ROLES.BASE}/${roleId}${ENDPOINTS.ROLES.USERS}`,
        queryParams
      ).split("?")[1] || "";
    return apiClient.get(
      `${ENDPOINTS.ROLES.BASE}/${roleId}${ENDPOINTS.ROLES.USERS}?${queryString}`
    );
  };

  // Assign user to role
  assignUserToRole: ServiceMethod<{
    roleId: string | number;
    userId: string | number;
  }> = params => {
    const { roleId, userId } = params || {};
    return apiClient.post(
      `${ENDPOINTS.ROLES.BASE}/${roleId}${ENDPOINTS.ROLES.ASSIGN_MULTIPLE}`,
      {
        userIds: [userId],
      }
    );
  };

  // Assign multiple users to role
  assignMultipleUsersToRole: ServiceMethod<{
    roleId: string | number;
    userIds: (string | number)[];
  }> = params => {
    const { roleId, userIds } = params || {};
    return apiClient.post(
      `${ENDPOINTS.ROLES.BASE}/${roleId}${ENDPOINTS.ROLES.ASSIGN_MULTIPLE}`,
      {
        userIds: userIds,
      }
    );
  };

  // Remove user from role
  removeUserFromRole: ServiceMethod<{
    roleId: string | number;
    userId: string | number;
  }> = params => {
    const { roleId, userId } = params || {};
    return apiClient.delete(
      `${ENDPOINTS.ROLES.BASE}/${roleId}${ENDPOINTS.ROLES.REMOVE_USER}/${userId}`
    );
  };

  // Get role user statistics
  getRoleUserStats: ServiceMethod = () => {
    return apiClient.get(ENDPOINTS.ROLES.USER_STATS);
  };
}

// Export singleton instance
export const roleService = new RoleService();

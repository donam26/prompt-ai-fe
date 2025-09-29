import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Role } from "@/types";

/**
 * RoleService extending BaseService
 */
export class RoleService extends BaseService {
  constructor() {
    super(ENDPOINTS.ROLES.BASE);
  }

  /**
   * Get all roles
   */
  async getRoles(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get role by ID
   */
  async getRole(id: string | number) {
    return this.getById<Role>(id);
  }

  /**
   * Create new role
   */
  async createRole(data: Partial<Role>) {
    return this.create<Role, Partial<Role>>(data);
  }

  /**
   * Update role
   */
  async updateRole(id: string | number, data: Partial<Role>) {
    return this.update<Role, Partial<Role>>(id, data);
  }

  /**
   * Delete role
   */
  async deleteRole(id: string | number) {
    return this.delete<void>(id);
  }

  /**
   * Restore role
   */
  async restoreRole(id: string | number) {
    return this.patch(id, {});
  }

  /**
   * Get deleted roles
   */
  async getDeletedRoles() {
    return this.list({ deleted: true });
  }

  /**
   * Get users by role
   */
  async getUsersByRole(
    roleId: string | number,
    params?: Record<string, unknown>
  ) {
    return this.list({ ...params, roleId });
  }

  /**
   * Assign user to role
   */
  async assignUserToRole(roleId: string | number, userId: string | number) {
    return this.post(`${roleId}${ENDPOINTS.ROLES.ASSIGN_MULTIPLE}`, {
      userIds: [userId],
    });
  }

  /**
   * Assign multiple users to role
   */
  async assignMultipleUsersToRole(
    roleId: string | number,
    userIds: (string | number)[]
  ) {
    return this.post(`${roleId}${ENDPOINTS.ROLES.ASSIGN_MULTIPLE}`, {
      userIds,
    });
  }

  /**
   * Remove user from role
   */
  async removeUserFromRole(roleId: string | number, userId: string | number) {
    return this.deleteEndpoint(
      `${roleId}${ENDPOINTS.ROLES.REMOVE_USER}/${userId}`
    );
  }

  /**
   * Get role user statistics
   */
  async getRoleUserStats() {
    return this.getById(ENDPOINTS.ROLES.USER_STATS);
  }
}

// Export singleton instance
export const roleService = new RoleService();

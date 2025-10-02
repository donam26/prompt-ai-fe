import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Role } from "@/types";
import type { BaseApiResponse } from "@/types/api/common";

/**
 * RoleService extending BaseService
 */
export class RoleService extends BaseService {
  constructor() {
    super(ENDPOINTS.ROLES.BASE);
  }

  /**
   * Get roles with pagination and filters
   */
  async getRoles(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get roles with query string for proper array handling
   */
  async getRolesPageWithQueryString(queryString: string) {
    const { apiClient } = await import("../../base/apiClient");
    const response = await apiClient.get(`${this.baseUrl}?${queryString}`);
    return response;
  }

  /**
   * Get role by ID
   */
  async getRoleById(id: string | number) {
    const response = await this.getById<Role>(id);
    return {
      success: response.success,
      data: response.data,
    };
  }

  /**
   * Create new role
   */
  async createRole(data: Partial<Role>) {
    return await this.create<Role, Partial<Role>>(data);
  }

  /**
   * Update role
   */
  async updateRole(id: string, data: Partial<Role>) {
    return await this.update<Role, Partial<Role>>(id, data);
  }

  /**
   * Delete role
   */
  async deleteRole(id: string): Promise<BaseApiResponse<void>> {
    return await this.delete<void>(id);
  }

  /**
   * Get deleted roles
   */
  async getDeletedRoles() {
    return await this.list({ deleted: true });
  }

  /**
   * Get users by role
   */
  async getUsersByRole(
    roleId: string | number,
    params?: Record<string, unknown>
  ) {
    return await this.list({ ...params, roleId });
  }

  /**
   * Assign user to role
   */
  async assignUserToRole(roleId: string | number, userId: string | number) {
    return await this.post(`${roleId}${ENDPOINTS.ROLES.ASSIGN_MULTIPLE}`, {
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
    return await this.post(`${roleId}${ENDPOINTS.ROLES.ASSIGN_MULTIPLE}`, {
      userIds,
    });
  }

  /**
   * Remove user from role
   */
  async removeUserFromRole(roleId: string | number, userId: string | number) {
    return await this.deleteEndpoint(
      `${roleId}${ENDPOINTS.ROLES.REMOVE_USER}/${userId}`
    );
  }

  /**
   * Get role user statistics
   */
  async getRoleUserStats() {
    return await this.getById(ENDPOINTS.ROLES.USER_STATS);
  }

  /**
   * Export roles to Excel
   */
  async exportRolesExcel(filters: Record<string, unknown> = {}) {
    const blob = await this.exportExcel("export-excel", filters);
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `roles-export-${timestamp}.xlsx`;
    this.downloadBlob(blob, filename);
    return blob;
  }
}

// Export singleton instance
export const roleService = new RoleService();

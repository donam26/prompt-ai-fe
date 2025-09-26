import {
  BaseService,
  ApiResponse,
  PaginatedResponse,
} from "@/services/base/baseService";
import type { User } from "@/types/admin";

/**
 * User service extending BaseService
 */
export class UserService extends BaseService {
  constructor() {
    super("/admin/users");
  }

  /**
   * Get users with pagination and filtering
   */
  async getUsers(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    role?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ApiResponse<PaginatedResponse<User>>> {
    return this.get<PaginatedResponse<User>>("", params);
  }

  /**
   * Get user by ID
   */
  async getUser(id: string | number): Promise<ApiResponse<User>> {
    return this.getById<User>(id);
  }

  /**
   * Create new user
   */
  async createUser(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.create<User, Partial<User>>(data);
  }

  /**
   * Update user
   */
  async updateUser(
    id: string | number,
    data: Partial<User>
  ): Promise<ApiResponse<User>> {
    return this.update<User, Partial<User>>(id, data);
  }

  /**
   * Delete user
   */
  async deleteUser(id: string | number): Promise<ApiResponse<void>> {
    return this.delete<void>(id);
  }

  /**
   * Toggle user status
   */
  async toggleUserStatus(id: string | number): Promise<ApiResponse<User>> {
    return this.patch<User>(id, {});
  }

  /**
   * Reset user password
   */
  async resetPassword(
    id: string | number
  ): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>("reset-password", { userId: id });
  }
}

// Export singleton instance
export const userService = new UserService();

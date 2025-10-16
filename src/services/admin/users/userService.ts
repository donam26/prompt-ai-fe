import { BaseService } from "@/services/base/baseService";
import type { User } from "@/types";

/**
 * User service extending BaseService
 */
export class UserService extends BaseService {
  constructor() {
    super("/users");
  }

  /**
   * Get users with pagination and filtering
   */
  async getUsers(params: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get user by ID
   */
  async getUser(id: string | number) {
    return this.getById(id);
  }

  /**
   * Create new user
   */
  async createUser(data: Partial<User>) {
    return this.create(data);
  }

  /**
   * Update user
   */
  async updateUser(id: string | number, data: Partial<User>) {
    return this.update(id, data);
  }

  /**
   * Delete user
   */
  async deleteUser(id: string) {
    return this.delete<void>(id);
  }

  /**
   * Toggle user status
   */
  async toggleUserStatus(id: string) {
    return this.patch<User>(id, {});
  }

  /**
   * Reset user password
   */
  async resetPassword(id: string) {
    return this.post("reset-password", { userId: id });
  }

  /**
   * Import users from CSV file
   */
  async importUsersFromCSV(file: File) {
    const formData = new FormData();
    formData.append("csvFile", file);

    const baseURL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
    const response = await fetch(`${baseURL}/users/import-csv`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to import users from CSV");
    }

    return response.json();
  }
}

// Export singleton instance
export const userService = new UserService();

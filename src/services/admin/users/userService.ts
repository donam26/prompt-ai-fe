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

  /**
   * Export users to Excel file
   */
  async exportUsers(filters: Record<string, unknown>) {
    const baseURL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    // Get token from localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${baseURL}/users/export-excel`, {
      method: "POST",
      headers,
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      throw new Error("Failed to export users to Excel");
    }

    // Get the blob from response
    const blob = await response.blob();

    // Get filename from Content-Disposition header or use default
    const contentDisposition = response.headers.get("Content-Disposition");
    let fileName = "danh-sach-users.xlsx";

    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
      if (fileNameMatch) {
        fileName = fileNameMatch[1];
      }
    }

    // Create download link and trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return {
      success: true,
      fileName,
    };
  }
}

// Export singleton instance
export const userService = new UserService();

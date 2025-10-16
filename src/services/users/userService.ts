/**
 * User service for API operations
 */

import { apiClient } from "@/services/base/apiClient";
import type { User } from "@/types";

/**
 * User service class
 */
export class UserService {
  /**
   * Get users with pagination and filters
   *
   * @param params - Pagination and filter parameters
   * @returns Promise with users data
   */
  async getUsersPage(params: {
    page: number;
    pageSize: number;
    search?: string;
    role?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<{
    data: User[];
    total: number;
    totalPages: number;
  }> {
    const payload = {
      ...params,
    };

    const response = await apiClient.post("/users/list", payload);
    return response.data;
  }

  /**
   * Get user by ID
   *
   * @param id - User ID
   * @returns Promise with user data
   */
  async getUserById(id: string) {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  }

  /**
   * Get user info
   *
   * @param id - User ID
   * @returns Promise with user info data
   */
  async getUserInfo(): Promise<{ data: User }> {
    const response = await apiClient.get(`users/me`);
    return response.data;
  }

  /**
   * Update user info
   *
   * @param id - User ID
   * @param formData - Form data with user info
   * @returns Promise with updated user data
   */
  async updateUserInfo(
    id: string | number,
    formData: FormData
  ): Promise<{ user: User }> {
    const response = await apiClient.put(`/users/info/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  /**
   * Change user password
   *
   * @param id - User ID
   * @param currentPassword - Current password
   * @param newPassword - New password
   * @returns Promise with response data
   */
  async changePassword(
    id: string | number,
    currentPassword: string,
    newPassword: string
  ): Promise<any> {
    const response = await apiClient.post(`/users/change-password/${id}`, {
      currentPassword,
      newPassword,
    });
    return response;
  }

  /**
   * Create new user
   *
   * @param userData - User data
   * @returns Promise with created user
   */
  async createUser(userData: {
    name: string;
    email: string;
    role: string;
    status: string;
    phone?: string;
    avatar?: string;
  }): Promise<User> {
    const response = await apiClient.post("/users", userData);
    return response.data;
  }

  /**
   * Update user
   *
   * @param id - User ID
   * @param userData - Updated user data
   * @returns Promise with updated user
   */
  async updateUser(
    id: string | number,
    userData: {
      name?: string;
      email?: string;
      role?: string;
      status?: string;
      phone?: string;
      avatar?: string;
    }
  ): Promise<User> {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  }

  /**
   * Delete user
   *
   * @param id - User ID
   * @returns Promise with deletion result
   */
  async deleteUser(id: string | number): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }

  async resendOTP(email: string) {
    return await apiClient.post("/users/resend-otp", { email });
  }

  async verifyOTP(email: string, otp: string) {
    return await apiClient.post("/users/verify-otp", { email, otp });
  }

  async loginUser(email: string) {
    return await apiClient.post("/users/login", { email });
  }

  /**
   * Google login with credential
   *
   * @param credential - Google OAuth credential
   * @returns Promise with user data and token
   */
  async googleLogin(credential: string) {
    const response = await apiClient.post("/users/auth/google", {
      credential,
    });
    return response.data;
  }
}

export const userService = new UserService();

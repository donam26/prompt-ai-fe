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

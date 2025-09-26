import { apiClient } from "@/lib/api-client";
import type { Payment } from "@/lib/types";

/**
 * Service for managing payments
 */
export const paymentService = {
  /**
   * Get payments with pagination and filtering
   */
  async getPaymentsPage(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
    method?: string;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append("page", params.page.toString());
    if (params.pageSize)
      searchParams.append("pageSize", params.pageSize.toString());
    if (params.search) searchParams.append("search", params.search);
    if (params.status && params.status !== "all")
      searchParams.append("status", params.status);
    if (params.method && params.method !== "all")
      searchParams.append("method", params.method);
    if (params.dateFrom) searchParams.append("dateFrom", params.dateFrom);
    if (params.dateTo) searchParams.append("dateTo", params.dateTo);

    const queryString = searchParams.toString();
    const url = `/admin/payments${queryString ? `?${queryString}` : ""}`;

    return apiClient.get(url);
  },

  /**
   * Get a single payment by ID
   */
  async getPayment(id: string | number): Promise<Payment> {
    const response = await apiClient.get(`/admin/payments/${id}`);
    return response.data;
  },

  /**
   * Create a new payment
   */
  async createPayment(data: Partial<Payment>): Promise<Payment> {
    const response = await apiClient.post("/admin/payments", data);
    return response.data;
  },

  /**
   * Update an existing payment
   */
  async updatePayment(
    id: string | number,
    data: Partial<Payment>
  ): Promise<Payment> {
    const response = await apiClient.put(`/admin/payments/${id}`, data);
    return response.data;
  },

  /**
   * Delete a payment
   */
  async deletePayment(id: string | number): Promise<void> {
    await apiClient.delete(`/admin/payments/${id}`);
  },
};

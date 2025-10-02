import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Payment } from "@/types";

/**
 * PaymentService extending BaseService
 */
export class PaymentService extends BaseService {
  constructor() {
    super(ENDPOINTS.PAYMENT.INDEX);
  }

  /**
   * Get payments with pagination and filtering
   */
  async getPaymentsPage(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get payments with pagination and query string
   */
  async getPaymentsPageWithQueryString(queryString: string) {
    const { apiClient } = await import("../../base/apiClient");
    const response = await apiClient.get(`${this.baseUrl}?${queryString}`);
    return response;
  }

  /**
   * Get payment by ID
   */
  async getPayment(id: string | number) {
    const response = await this.getById<Payment>(id);
    return {
      success: response.success,
      data: response.data,
    };
  }

  /**
   * Create new payment
   */
  async createPayment(data: Partial<Payment>) {
    return await this.create<Payment, Partial<Payment>>(data);
  }

  /**
   * Update payment
   */
  async updatePayment(id: string | number, data: Partial<Payment>) {
    return await this.update<Payment, Partial<Payment>>(id, data);
  }

  /**
   * Delete payment
   */
  async deletePayment(id: string | number) {
    return await this.delete<void>(id);
  }
}

// Export singleton instance
export const paymentService = new PaymentService();

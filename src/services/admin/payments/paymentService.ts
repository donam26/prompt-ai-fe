import { apiClient, buildUrlWithParams } from "../../base/apiClient";
import { ENDPOINTS } from "@/constants";
import { ServiceMethod } from "../../base/types";

// Payment service parameters
export interface PaymentListParams {
  [key: string]: unknown;
}

export class PaymentService {
  // Get payments list
  getListPayment: ServiceMethod<PaymentListParams> = params => {
    const queryString =
      buildUrlWithParams(ENDPOINTS.PAYMENT.FILTER, params).split("?")[1] || "";
    return apiClient.get(`${ENDPOINTS.PAYMENT.FILTER}?${queryString}`);
  };

  // Export payments to Excel
  exportPaymentsExcel: ServiceMethod<Record<string, unknown>> = (
    filters,
    config
  ) => {
    const queryString =
      buildUrlWithParams(ENDPOINTS.PAYMENT.EXPORT, filters).split("?")[1] || "";
    return apiClient.get(`${ENDPOINTS.PAYMENT.EXPORT}?${queryString}`, {
      responseType: "blob",
      ...config,
    });
  };

  // Create payment URL
  payment: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.PAYMENT.CREATE_URL, data);
  };
}

// Export singleton instance
export const paymentService = new PaymentService();

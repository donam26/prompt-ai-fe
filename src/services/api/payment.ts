import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Tạo instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

// Interceptor để thêm token và xử lý Content-Type phù hợp cho mỗi request
axiosInstance.interceptors.request.use(
  config => {
    // Lấy token từ localStorage (client-side)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    // Kiểm tra nếu data là FormData thì set Content-Type là multipart/form-data
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export interface PaymentData {
  amount: number;
  orderInfo: string;
  duration: number;
  orderType: string;
  language: string;
  bankCode: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data: {
    paymentUrl: string;
  };
}

export interface DiscountCodeResponse {
  success: boolean;
  discount: number;
  message?: string;
}

export interface DiscountRequest {
  code: string;
  total: number;
}

export interface DiscountApplyResponse {
  success: boolean;
  message?: string;
  data?: {
    discountAmount: number;
    discountPercentage?: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

export const paymentApi = {
  // Create payment URL for VNPay
  createPaymentUrl: async (data: PaymentData): Promise<PaymentResponse> => {
    const response = await axiosInstance.post(
      "/payment/create_payment_url",
      data
    );
    return response.data;
  },

  // Get discount code
  getDiscountCode: async (code: string): Promise<DiscountCodeResponse> => {
    const response = await axiosInstance.get(`/referral/get-discount/${code}`);
    return response.data;
  },

  // Apply discount code
  applyDiscount: async (
    data: DiscountRequest
  ): Promise<DiscountApplyResponse> => {
    const response = await axiosInstance.post("/coupons/validate", data);
    return response.data;
  },
};

export default paymentApi;

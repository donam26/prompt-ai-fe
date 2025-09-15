import { apiClient } from "../../base/apiClient";
import { ENDPOINTS } from "@/constants";
import { ServiceMethod } from "../../base/types";

export class GptService {
  // Call GPT API
  callGPT: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.CHAT.GPT, data);
  };

  // Get user history
  getHistory: ServiceMethod<string | number> = userId => {
    return apiClient.get(`${ENDPOINTS.HISTORY.USER}/${userId}`);
  };

  // Get referral code
  getCode: ServiceMethod<string> = data => {
    return apiClient.get(`${ENDPOINTS.REFERRAL.GET_DISCOUNT}/${data}`);
  };
}

// Export singleton instance
export const gptService = new GptService();

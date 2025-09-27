import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";

/**
 * GptService extending BaseService
 */
export class GptService extends BaseService {
  constructor() {
    super(ENDPOINTS.CHAT.GPT);
  }

  /**
   * Call GPT API
   */
  async callGPT(data: unknown) {
    return this.post(ENDPOINTS.CHAT.GPT, data);
  }

  /**
   * Get user history
   */
  async getUserHistory(userId: string | number) {
    return this.getById(`${ENDPOINTS.HISTORY.USER}/${userId}`);
  }

  /**
   * Get referral code
   */
  async getReferralCode(code: string) {
    return this.getById(`${ENDPOINTS.REFERRAL.GET_DISCOUNT}/${code}`);
  }
}

// Export singleton instance
export const gptService = new GptService();

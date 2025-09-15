import { apiClient } from "../../base/apiClient";
import { ENDPOINTS } from "@/constants";
import { ServiceMethod } from "../../base/types";

export class DeviceLogService {
  // Get device log by user ID
  getDeviceLog: ServiceMethod<string | number> = userId => {
    return apiClient.get(`${ENDPOINTS.DEVICE_LOGS.BASE}/${userId}`);
  };
}

// Export singleton instance
export const deviceLogService = new DeviceLogService();

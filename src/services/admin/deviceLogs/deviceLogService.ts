import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { DeviceLog } from "@/lib/types";
import type { ApiResponse } from "@/types/common";

/**
 * DeviceLogService extending BaseService
 */
export class DeviceLogService extends BaseService {
  constructor() {
    super(ENDPOINTS.DEVICE_LOGS.BASE);
  }

  /**
   * Get device log by user ID
   */
  async getDeviceLog(userId: string | number) {
    return this.getById<DeviceLog>(userId);
  }

  /**
   * Get all device logs
   */
  async getDeviceLogs(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Create device log
   */
  async createDeviceLog(data: Partial<DeviceLog>) {
    return this.create<DeviceLog, Partial<DeviceLog>>(data);
  }

  /**
   * Delete device log
   */
  async deleteDeviceLog(id: string | number): Promise<ApiResponse<void>> {
    return this.delete<void>(id);
  }
}

// Export singleton instance
export const deviceLogService = new DeviceLogService();

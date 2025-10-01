/**
 * Contact related entities và types
 */

import type { BaseEntity, EntityId } from "../base";

// Contact entity
export interface Contact extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: number;
  status: string;
  reply?: string;
}

// Device log entity
export interface DeviceLog extends BaseEntity {
  userId: EntityId;
  deviceInfo: string;
  ipAddress: string;
  userAgent: string;
}

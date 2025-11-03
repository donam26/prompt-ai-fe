import type { BaseEntity, EntityId } from "@/types/base";
import type { User } from "./user";

/**
 * Feedback entity interface
 */
export interface Feedback extends BaseEntity {
  readonly userId: EntityId;
  readonly email: string;
  readonly fullName?: string | null;
  readonly phone: string;
  readonly feedbackName: string;
  readonly message?: string | null;
  readonly status: number; // 1 - Chưa xử lý, 2 - Đã xử lý
  readonly reply?: string | null;
  readonly user?: User;
}

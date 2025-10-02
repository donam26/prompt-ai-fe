import type { BaseEntity, EntityId } from "@/types/base";

/**
 * Contact entity interface
 */
export interface Contact extends BaseEntity {
  name: string;
  email: string;
  phoneNumber?: string | null;
  message: string;
  status?: number | null;
  reply?: string | null;
  type?: number | null;
  repliedAt?: string;
  repliedBy?: EntityId;
  repliedMessage?: string;
}

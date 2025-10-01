/**
 * GPT related entities và types
 */

import type { EntityId } from "../base";

// GPT request
export interface GPTRequest {
  message: string;
  userId: EntityId;
  conversationId?: string;
}

// GPT response
export interface GPTResponse {
  success: boolean;
  data: {
    message: string;
    conversationId: string;
  };
}

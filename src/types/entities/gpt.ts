/**
 * GPT related entities và types
 */

import type { EntityId } from "../base";

// GPT request
export interface GPTRequest {
  message: string;
  user_id: EntityId;
  conversation_id?: string;
}

// GPT response
export interface GPTResponse {
  success: boolean;
  data: {
    message: string;
    conversation_id: string;
  };
}

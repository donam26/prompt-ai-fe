/**
 * Example usage of usePatchContactReply hook
 *
 * This hook is specifically designed for PATCH /:id/reply endpoint
 * with body: { "reply": "Nội dung phản hồi" }
 */

import { usePatchContactReply } from "./usePatchContactReply";

// Example component usage
export function ContactReplyExample() {
  const {
    isPatching,
    error,
    mutate: patchContactReply,
  } = usePatchContactReply();

  const handleReply = async (contactId: string | number, replyText: string) => {
    // This will call PATCH /api/contact/:id/reply with body: { "reply": "1111" }
    const success = await patchContactReply(contactId, replyText);

    if (success) {
      console.log("Reply sent successfully!");
    } else {
      console.error("Failed to send reply:", error);
    }
  };

  return {
    isPatching,
    error,
    handleReply,
  };
}

/**
 * API Call Details:
 *
 * Method: PATCH
 * URL: /api/contact/:id/reply
 * Body: { "reply": "1111" }
 *
 * Response: Success/Error with appropriate status codes
 */

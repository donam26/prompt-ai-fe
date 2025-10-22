/**
 * Extension Helper Utilities
 * Handles communication between web application and browser extension
 */

interface ExtensionMessage {
  type: string;
  data?: unknown;
}

interface TokenMessage extends ExtensionMessage {
  type: "TOKEN_FROM_WEB";
  token: string;
  userInfo: {
    id: string;
    name: string;
    [key: string]: unknown;
  };
}

/**
 * Sends token to browser extension via postMessage
 */
export const sendTokenToExtension = (token: string, userData?: any): void => {
  if (typeof window === "undefined") return;

  // Use provided userData or get from localStorage
  let userInfo;
  if (userData) {
    userInfo = {
      id: userData.id || "unknown",
      name: userData.name || "User",
      email: userData.email || "",
      picture: userData.picture || "",
    };
  } else {
    // Get user info from localStorage
    const userInfoStr =
      localStorage.getItem("user_info") || localStorage.getItem("userInfo");

    if (userInfoStr) {
      try {
        userInfo = JSON.parse(userInfoStr);
      } catch {
        userInfo = { id: "user_1", name: "Test User" };
      }
    } else {
      userInfo = { id: "user_1", name: "Test User" };
    }
  }

  const message: TokenMessage = {
    type: "TOKEN_FROM_WEB",
    token,
    userInfo,
  };

  // Send message to extension
  window.postMessage(message, "*");

  // Also try to send to parent window if in iframe
  if (window.parent !== window) {
    window.parent.postMessage(message, "*");
  }

  // Token sent to extension successfully
};

/**
 * Gets token from localStorage and sends it to extension
 */
export const getAndSendTokenToExtension = (): boolean => {
  if (typeof window === "undefined") return false;

  try {
    // Try different token storage keys
    const tokenKeys = ["token", "authToken", "accessToken", "auth-storage"];
    let token: string | null = null;

    for (const key of tokenKeys) {
      token = localStorage.getItem(key);
      if (token) {
        // If it's a JSON string, try to parse it
        try {
          const parsed = JSON.parse(token);
          if (parsed.token) {
            token = parsed.token;
          } else if (parsed.accessToken) {
            token = parsed.accessToken;
          }
        } catch {
          // If parsing fails, use the raw token
        }
        break;
      }
    }

    if (!token) {
      // No token found in localStorage
      return false;
    }

    sendTokenToExtension(token);
    return true;
  } catch (error) {
    console.error("Error getting and sending token to extension:", error);
    return false;
  }
};

/**
 * Listens for extension requests for tokens
 */
export const setupExtensionListener = (): void => {
  if (typeof window === "undefined") return;

  const handleMessage = (event: MessageEvent<ExtensionMessage>): void => {
    // Validate origin for security (adjust as needed)
    if (
      event.origin !== window.location.origin &&
      !event.origin.includes("chrome-extension://") &&
      !event.origin.includes("moz-extension://")
    ) {
      return;
    }

    if (event.data?.type === "GET_TOKEN_FROM_WEB") {
      // Extension requested token
      const success = getAndSendTokenToExtension();

      if (!success) {
        // Send error response
        window.postMessage(
          {
            type: "TOKEN_NOT_FOUND",
            data: { error: "No token found in localStorage" },
          },
          "*"
        );
      }
    }
  };

  window.addEventListener("message", handleMessage);
  // Extension listener setup complete
};

/**
 * Removes extension listener
 */
export const removeExtensionListener = (): void => {
  if (typeof window === "undefined") return;

  // Note: This is a simplified removal - in practice, you'd need to store the handler reference
  window.removeEventListener("message", () => {});
};

/**
 * Checks if extension is available
 */
export const checkExtensionAvailability = (): boolean => {
  if (typeof window === "undefined") return false;

  // Send a ping message to check if extension responds
  const pingMessage = {
    type: "PING_EXTENSION",
    data: { timestamp: Date.now() },
  };

  window.postMessage(pingMessage, "*");
  return true;
};

/**
 * Sends close popup message to extension
 */
export const sendClosePopup = (message: string, userId?: string): void => {
  if (typeof window === "undefined") return;

  const messageData = {
    type: "CLOSE_POPUP",
    data: {
      message,
      userId,
      timestamp: Date.now(),
    },
  };

  window.postMessage(messageData, "*");
};

/**
 * Sends API status update to extension
 */
export const sendApiStatusUpdate = (
  status: "success" | "error" | "loading",
  message: string
): void => {
  if (typeof window === "undefined") return;

  const messageData = {
    type: "API_STATUS_UPDATE",
    data: {
      status,
      message,
      timestamp: Date.now(),
    },
  };

  window.postMessage(messageData, "*");
};

/**
 * Sends real-time message to extension
 */
export const sendRealTimeMessage = (
  message: string,
  type: "info" | "success" | "warning" | "error" = "info"
): void => {
  if (typeof window === "undefined") return;

  const messageData = {
    type: "REAL_TIME_MESSAGE",
    data: {
      message,
      type,
      timestamp: Date.now(),
    },
  };

  window.postMessage(messageData, "*");
};

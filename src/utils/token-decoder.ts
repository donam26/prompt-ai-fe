interface TokenPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  email?: string;
  userId?: string | number;
  role?: number;
  permissions?: string[] | string;
  [key: string]: unknown;
}

/**
 * Decodes a JWT token and returns the payload
 * @param token - The JWT token to decode
 * @returns The decoded token payload or null if invalid
 */
export const getUserInfoFromToken = (token: string): TokenPayload | null => {
  try {
    if (!token) {
      return null;
    }

    // Split the token into parts
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (middle part)
    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));

    return JSON.parse(decodedPayload) as TokenPayload;
  } catch {
    return null;
  }
};

/**
 * Checks if a token is expired
 * @param token - The JWT token to check
 * @returns True if token is expired, false otherwise
 */
export const isTokenExpired = (token: string): boolean => {
  const payload = getUserInfoFromToken(token);
  if (!payload || !payload.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

/**
 * Gets the expiration time of a token in milliseconds
 * @param token - The JWT token
 * @returns Expiration time in milliseconds or null if invalid
 */
export const getTokenExpirationTime = (token: string): number | null => {
  const payload = getUserInfoFromToken(token);
  if (!payload || !payload.exp) {
    return null;
  }

  return payload.exp * 1000; // Convert to milliseconds
};

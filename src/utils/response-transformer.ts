/**
 * Response Transformer Utilities
 * Handles conversion between camelCase (frontend) and snake_case (backend)
 */

/**
 * Converts a string from camelCase to snake_case
 */
const toSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

/**
 * Converts a string from snake_case to camelCase
 */
const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * Recursively converts object keys from camelCase to snake_case
 */
export const toSnakeCaseKeys = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => toSnakeCaseKeys(item));
  }

  if (typeof obj === "object" && obj.constructor === Object) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = toSnakeCase(key);
      result[snakeKey] = toSnakeCaseKeys(value);
    }
    return result;
  }

  return obj;
};

/**
 * Recursively converts object keys from snake_case to camelCase
 */
export const toCamelCaseKeys = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCaseKeys(item));
  }

  if (typeof obj === "object" && obj.constructor === Object) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelKey = toCamelCase(key);
      result[camelKey] = toCamelCaseKeys(value);
    }
    return result;
  }

  return obj;
};

/**
 * Transform API response data from snake_case to camelCase
 */
export const transformApiResponse = <T>(response: any): T => {
  if (response?.data) {
    return {
      ...response,
      data: toCamelCaseKeys(response.data),
    };
  }
  return toCamelCaseKeys(response);
};

/**
 * Transform request data from camelCase to snake_case before sending to API
 */
export const transformApiRequest = <T>(data: T): any => {
  return toSnakeCaseKeys(data);
};

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

apiClient.interceptors.request.use(
  config => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export function cleanParams(params: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const key in params) {
    const value = params[key];
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      result[key] = value;
    }
  }
  return result;
}

export function buildQueryString(params: Record<string, unknown>): string {
  const cleaned = cleanParams(params);
  return new URLSearchParams(cleaned as Record<string, string>).toString();
}

export function buildUrlWithParams(
  baseUrl: string,
  params: Record<string, unknown> = {}
): string {
  const queryString = buildQueryString(params);
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

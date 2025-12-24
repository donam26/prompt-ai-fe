// Search parameters
export interface SearchParams {
  search?: string;
  searchText?: string;
}

// Filter parameters
export interface FilterParams {
  status?: string;
  type?: string;
  isType?: string | number;
  subType?: string | number;
}

// Error response type
export interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
    status?: number;
  };
  message?: string;
  status?: number;
}

// Request configuration type
export interface RequestConfig {
  responseType?: "json" | "blob" | "arraybuffer" | "text" | "stream";
  headers?: Record<string, string>;
}
export interface SingleResponse<T> {
  data: T;
}

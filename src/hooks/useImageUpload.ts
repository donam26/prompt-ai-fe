import { useCallback, useState } from "react";

interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    imageUrl?: string;
    imageUrls?: string[];
  };
}

interface UseImageUploadOptions {
  onSuccess?: (url: string | string[]) => void;
  onError?: (error: string) => void;
}

interface UseImageUploadReturn {
  uploadSingle: (file: File) => Promise<string | null>;
  uploadMultiple: (files: File[]) => Promise<string[] | null>;
  isUploading: boolean;
  error: string | null;
}

export const useImageUpload = ({
  onSuccess,
  onError,
}: UseImageUploadOptions = {}): UseImageUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const uploadSingle = useCallback(
    async (file: File): Promise<string | null> => {
      setIsUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("image", file);

        // Get token from localStorage
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("authToken")
            : null;

        const headers: HeadersInit = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${apiUrl}/upload/`, {
          method: "POST",
          body: formData,
          headers,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data: UploadResponse = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Upload failed");
        }

        const imageUrl = data.data.imageUrl;

        if (!imageUrl) {
          throw new Error("No image URL returned from server");
        }

        onSuccess?.(imageUrl);
        return imageUrl;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Upload failed";
        setError(errorMessage);
        onError?.(errorMessage);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [apiUrl, onSuccess, onError]
  );

  const uploadMultiple = useCallback(
    async (files: File[]): Promise<string[] | null> => {
      setIsUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        files.forEach(file => formData.append("images", file));

        // Get token from localStorage
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("authToken")
            : null;

        const headers: HeadersInit = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${apiUrl}/upload/multiple`, {
          method: "POST",
          body: formData,
          headers,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data: UploadResponse = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Upload failed");
        }

        const imageUrls = data.data.imageUrls;

        if (!imageUrls || imageUrls.length === 0) {
          throw new Error("No image URLs returned from server");
        }

        onSuccess?.(imageUrls);
        return imageUrls;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Upload failed";
        setError(errorMessage);
        onError?.(errorMessage);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [apiUrl, onSuccess, onError]
  );

  return {
    uploadSingle,
    uploadMultiple,
    isUploading,
    error,
  };
};

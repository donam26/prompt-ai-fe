"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

interface Props {
  name: string;
  title: string;
  currentImage: string | null | undefined;
  setValue: (name: string, value: any) => void;
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
  isDisabled: boolean;
  errorMessage?: string;
  uploadSuccessMessage: string;
  uploadErrorMessage: string;
  className?: string;
}

export function FormImageSection({
  name,
  title,
  currentImage,
  setValue,
  isUploading,
  setIsUploading,
  isDisabled,
  errorMessage,
  uploadSuccessMessage,
  uploadErrorMessage,
  className = "rounded-lg",
}: Props) {
  const isNewPhotoRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      try {
        // Simulate upload - replace with actual upload service
        const formData = new FormData();
        formData.append("file", file);

        // Mock upload response
        const mockResponse = {
          url: URL.createObjectURL(file),
          filename: file.name,
        };

        setValue(name, mockResponse.url);
        const isNewPhoto = mockResponse.url !== currentImage;
        isNewPhotoRef.current = isNewPhoto;

        // Simulate upload delay
        setTimeout(() => {
          setIsUploading(false);
          if (isNewPhotoRef.current) {
            showToast.success(uploadSuccessMessage);
            isNewPhotoRef.current = false;
          }
        }, 1000);
      } catch (error) {
        setIsUploading(false);
        // eslint-disable-next-line no-console
        console.error("Upload failed:", error);
        showToast.error(uploadErrorMessage);
      }
    },
    [
      setIsUploading,
      setValue,
      name,
      currentImage,
      uploadSuccessMessage,
      uploadErrorMessage,
    ]
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        handleImageUpload(file);
      }
    },
    [handleImageUpload]
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    setValue(name, null);
  }, [setValue, name]);

  return (
    <>
      <div className="mb-3">
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>

      <div className="flex items-start gap-4">
        {/* Image Thumbnail */}
        <div className="flex-shrink-0">
          {currentImage ? (
            <div
              className={`relative border w-24 h-24 overflow-hidden ${className}`}
            >
              <Image
                src={currentImage}
                alt="Preview"
                fill
                className="object-cover"
                onError={e => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center bg-gray-50 border-2 border-gray-300 border-dashed rounded-lg w-24 h-24">
              <div className="text-gray-400 text-xs text-center">No Image</div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUploadClick}
            disabled={isDisabled || isUploading}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {isUploading ? "Uploading..." : "Upload Image"}
          </Button>

          {currentImage && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemoveImage}
              disabled={isDisabled || isUploading}
              className="flex items-center gap-2 hover:bg-red-50 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Remove Image
            </Button>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isDisabled || isUploading}
        />
      </div>

      {errorMessage && (
        <p className="mt-1 text-red-500 text-sm">{errorMessage}</p>
      )}
    </>
  );
}

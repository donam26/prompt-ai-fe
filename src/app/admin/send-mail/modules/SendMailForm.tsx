"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuillEditor } from "@/components/ui/quill-editor";
import { useImageUpload } from "@/hooks/useImageUpload";

interface SendMailFormProps {
  onSend: (content: string) => void;
  loading: boolean;
}

export const SendMailForm = ({ onSend, loading }: SendMailFormProps) => {
  const [content, setContent] = useState("");
  const { uploadSingle, isUploading } = useImageUpload();

  const handleSend = () => {
    if (!content.trim()) {
      return;
    }
    onSend(content);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadSingle(file);
      if (result) {
        // Convert file to HTML content if needed
        // This would depend on your file processing logic
        setContent(result);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* File Upload */}
      <div>
        <label className="block mb-2 font-medium text-gray-700 text-sm">
          Upload File
        </label>
        <input
          type="file"
          accept=".doc,.docx,.txt"
          onChange={handleFileUpload}
          className="block hover:file:bg-blue-100 file:bg-blue-50 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-full w-full file:font-semibold text-gray-500 file:text-blue-700 text-sm file:text-sm"
        />
      </div>

      {/* Quill Editor */}
      <div>
        <label className="block mb-2 font-medium text-gray-700 text-sm">
          Nội dung Email
        </label>
        <QuillEditor
          value={content}
          onChange={setContent}
          placeholder="Nhập nội dung email..."
          className="min-h-[200px]"
        />
      </div>

      {/* Send Button */}
      <Button
        onClick={handleSend}
        disabled={loading || isUploading || !content.trim()}
        className="bg-blue-600 hover:bg-blue-700 w-full text-white"
      >
        {loading ? "Đang gửi..." : "Gửi Mail"}
      </Button>
    </div>
  );
};

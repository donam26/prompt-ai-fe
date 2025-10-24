"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuillEditor } from "@/components/ui/quill-editor";
// import { useImageUpload } from "@/hooks/useImageUpload";

interface SendMailTestFormProps {
  onSend: (content: string) => void;
  loading: boolean;
}

export const SendMailTestForm = ({
  onSend,
  loading,
}: SendMailTestFormProps) => {
  const [content, setContent] = useState("");
  // const { uploadSingle, isUploading } = useImageUpload({
  //   onSuccess: data => {
  //     console.log(data);
  //   },
  //   onError: error => {
  //     console.error(error);
  //   },
  // });

  const handleSend = () => {
    if (!content.trim()) {
      return;
    }
    onSend(content);
  };

  // const handleFileUpload = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   try {
  //     const result = await uploadSingle(file);
  //     if (result) {
  //       // Convert file to HTML content if needed
  //       // This would depend on your file processing logic
  //       setContent(result);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };

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
          className="block hover:file:bg-green-100 file:bg-green-50 file:mr-4 file:px- file:py-2 file:border-0 file:rounded-full w-full file:font-semibold text-gray-500 file:text-green-700 text-sm file:text-sm grado"
        />
      </div>

      {/* Quill Editor */}
      <div>
        <label className="block mb-2 font-medium text-gray-700 text-sm">
          Nội dung Email Test
        </label>
        <QuillEditor
          value={content}
          onChange={setContent}
          placeholder="Nhập nội dung email test..."
          className="min-h-[200px]"
        />
      </div>

      {/* Send Button */}
      <Button
        onClick={handleSend}
        disabled={loading || !content.trim()}
        className="bg-green-600 hover:bg-green-700 w-full text-white"
      >
        {loading ? "Đang gửi..." : "Gửi Mail Test"}
      </Button>
    </div>
  );
};

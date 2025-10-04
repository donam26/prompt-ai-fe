"use client";

import { useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Eye, Code } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-100 rounded-md h-[200px] animate-pulse" />
  ),
});

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  minHeight?: number;
  showPreview?: boolean;
  className?: string;
}

export const QuillEditor = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Nhập nội dung...",
  minHeight = 200,
  className = "",
}: Props) => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Import CSS dynamically
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Kiểm tra xem CSS đã được load chưa
      const existingLink = document.querySelector(
        'link[href*="quill.snow.css"]'
      );
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.quilljs.com/1.3.6/quill.snow.css";
        document.head.appendChild(link);
      }
    }
  }, []);

  // Custom image upload handler
  const handleImageUpload = useCallback(() => {
    // Kiểm tra môi trường client-side
    if (typeof window === "undefined") return;

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Chỉ được upload file hình ảnh");
        return;
      }

      try {
        // Convert to base64 for demo purposes
        // In production, you should upload to your server/CDN
        const reader = new FileReader();
        reader.onload = e => {
          const result = e.target?.result as string;
          if (result) {
            // For now, we'll just insert the image URL into the content
            // In a real implementation, you might want to use a different approach
            const currentValue = value || "";
            const newValue =
              currentValue +
              `<img src="${result}" alt="Uploaded image" style="max-width: 100%; height: auto;" />`;
            onChange(newValue);
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra khi upload hình ảnh");
      }
    };
  }, [value, onChange]);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      <Tabs
        value={activeTab}
        onValueChange={value => setActiveTab(value as "edit" | "preview")}
      >
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="edit" className="gap-2">
            <Code className="w-4 h-4" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-2">
          <div className="relative">
            {isMounted ? (
              <ReactQuill
                theme="snow"
                value={value || ""}
                onChange={onChange}
                readOnly={disabled}
                placeholder={placeholder}
                modules={modules}
                formats={formats}
                className="bg-white"
                style={{ minHeight: `${minHeight}px` }}
              />
            ) : (
              <div
                className="flex justify-center items-center bg-white border rounded-md text-gray-500"
                style={{ minHeight: `${minHeight}px` }}
              >
                Đang tải editor...
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-2">
          <div
            className="bg-background p-4 border rounded-md max-w-none prose prose-sm"
            style={{ minHeight: `${minHeight}px` }}
          >
            {value ? (
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            ) : (
              <p className="text-muted-foreground italic">
                Chưa có nội dung để preview...
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

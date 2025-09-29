"use client";

import { useCallback, useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Eye, Upload, Code } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QuillEditorProps {
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
  showPreview = true,
  className = "",
}: QuillEditorProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const quillRef = useRef<ReactQuill>(null);

  // Custom image upload handler
  const handleImageUpload = useCallback(() => {
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
          if (result && quillRef.current) {
            // Get the Quill instance
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            const index = range ? range.index : quill.getLength();

            // Insert image into Quill editor
            quill.insertEmbed(index, "image", result);

            // Move cursor after the image
            quill.setSelection(index + 1);
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra khi upload hình ảnh");
      }
    };
  }, []);

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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Upload className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">
            Kéo thả hình ảnh hoặc click vào biểu tượng hình ảnh để upload
          </span>
        </div>
        {showPreview && (
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={disabled}
              >
                <Eye className="w-4 h-4" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Preview Nội Dung</DialogTitle>
              </DialogHeader>
              <div className="max-w-none prose prose-sm">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: value || "" }}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

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
            <ReactQuill
              ref={quillRef}
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

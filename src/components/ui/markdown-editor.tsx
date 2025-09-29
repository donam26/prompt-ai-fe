"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { visit } from "unist-util-visit";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Code } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  minHeight?: number;
  className?: string;
}

export const MarkdownEditor = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Nhập nội dung markdown...",
  minHeight = 200,
  className = "",
}: Props) => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Custom rehype plugin to highlight placeholders
  const rehypeHighlightPlaceholders = () => {
    return (tree: any) => {
      visit(
        tree,
        "text",
        (node: any, index: number | undefined, parent: any) => {
          if (
            node.value &&
            typeof node.value === "string" &&
            typeof index === "number"
          ) {
            const text = node.value;
            const placeholderRegex = /\[([^\]]+)\]/g;

            if (placeholderRegex.test(text)) {
              const parts = text.split(placeholderRegex);
              const newNodes = [];

              for (let i = 0; i < parts.length; i++) {
                if (i % 2 === 0 && parts[i]) {
                  // Regular text
                  newNodes.push({
                    type: "text",
                    value: parts[i],
                  });
                } else if (i % 2 === 1 && parts[i]) {
                  // Placeholder text
                  newNodes.push({
                    type: "element",
                    tagName: "span",
                    properties: {
                      className: ["placeholder-highlight-alt"],
                    },
                    children: [
                      {
                        type: "text",
                        value: `[${parts[i]}]`,
                      },
                    ],
                  });
                }
              }

              parent.children.splice(index, 1, ...newNodes);
            }
          }
        }
      );
    };
  };

  // Insert text at cursor position
  const insertText = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const before = value.substring(0, start);
    const after = value.substring(end);

    const newText = before + text + selectedText + after;
    onChange(newText);

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + text.length,
        start + text.length + selectedText.length
      );
    }, 0);
  };

  // Markdown shortcuts
  const insertBold = () => insertText("**text**");
  const insertItalic = () => insertText("*text*");
  const insertLink = () => insertText("[link text](url)");
  const insertHeading1 = () => insertText("# Heading 1");
  const insertHeading2 = () => insertText("## Heading 2");
  const insertHeading3 = () => insertText("### Heading 3");
  const insertBulletList = () => insertText("- Item 1\n- Item 2\n- Item 3");
  const insertNumberedList = () =>
    insertText("1. Item 1\n2. Item 2\n3. Item 3");
  const insertCodeBlock = () => insertText("```\ncode here\n```");

  // Image upload handler
  const handleImageUpload = () => {
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
            const imageMarkdown = `![Uploaded Image](${result})`;
            insertText(imageMarkdown);
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra khi upload hình ảnh");
      }
    };
  };

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
          {/* Markdown Toolbar */}
          <div className="flex flex-wrap gap-1 bg-muted/50 p-2 border rounded-md">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={insertBold}
              disabled={disabled}
              title="Bold"
            >
              <strong>B</strong>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={insertItalic}
              disabled={disabled}
              title="Italic"
            >
              <em>I</em>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={insertLink}
              disabled={disabled}
              title="Link"
            >
              🔗
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleImageUpload}
              disabled={disabled}
              title="Upload Image"
            >
              🖼️
            </Button>
            <div className="mx-1 bg-border w-px h-6" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={insertHeading1}
              disabled={disabled}
              title="Heading 1"
            >
              H1
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={insertHeading2}
              disabled={disabled}
              title="Heading 2"
            >
              H2
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={insertHeading3}
              disabled={disabled}
              title="Heading 3"
            >
              H3
            </Button>
            <div className="mx-1 bg-border w-px h-6" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={insertBulletList}
              disabled={disabled}
              title="Bullet List"
            >
              • List
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={insertNumberedList}
              disabled={disabled}
              title="Numbered List"
            >
              1. List
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={insertCodeBlock}
              disabled={disabled}
              title="Code Block"
            >
              ```Code```
            </Button>
          </div>

          <Textarea
            ref={textareaRef}
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="font-mono text-sm"
            style={{ minHeight: `${minHeight}px` }}
          />
        </TabsContent>

        <TabsContent value="preview" className="space-y-2">
          <div
            className="bg-background p-4 border rounded-md max-w-none prose prose-sm"
            style={{ minHeight: `${minHeight}px` }}
          >
            {value ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw, rehypeHighlightPlaceholders]}
              >
                {value}
              </ReactMarkdown>
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

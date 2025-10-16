"use client";

import { Prompt } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { showToast } from "@/components/ui/toast";

interface PromptDetailContentProps {
  prompt: Prompt;
}

export const PromptDetailContent = ({ prompt }: PromptDetailContentProps) => {
  const [copiedSections, setCopiedSections] = useState<Set<string>>(new Set());

  const handleCopyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSections(prev => new Set(prev).add(section));
      showToast.success("Đã copy vào clipboard");

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedSections(prev => {
          const newSet = new Set(prev);
          newSet.delete(section);
          return newSet;
        });
      }, 2000);
    } catch {
      showToast.error("Không thể copy vào clipboard");
    }
  };

  const renderSection = (
    title: string,
    content: string | null | undefined,
    sectionKey: string
  ) => {
    if (!content) return null;

    const isCopied = copiedSections.has(sectionKey);

    return (
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopyToClipboard(content, sectionKey)}
            className="flex items-center gap-2"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {isCopied ? "Đã copy" : "Copy"}
          </Button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="font-mono text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </pre>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Content */}
      {renderSection("Nội dung Prompt", prompt.content, "content")}

      {/* What section */}
      {renderSection("Mô tả", prompt.what, "what")}

      {/* How section */}
      {renderSection("Cách sử dụng", prompt.how, "how")}

      {/* Tips section */}
      {renderSection("Mẹo", prompt.tips, "tips")}

      {/* Input section */}
      {renderSection("Input", prompt.input, "input")}

      {/* Output section */}
      {renderSection("Output", prompt.output, "output")}

      {/* Optimization Guide */}
      {renderSection(
        "Hướng dẫn tối ưu",
        prompt.optimizationGuide,
        "optimization"
      )}

      {/* Additional Tips */}
      {renderSection("Mẹo bổ sung", prompt.addTip, "addTip")}

      {/* Additional Information */}
      {renderSection(
        "Thông tin bổ sung",
        prompt.addInformation,
        "addInformation"
      )}

      {/* Text section */}
      {renderSection("Văn bản", prompt.text, "text")}
    </div>
  );
};

"use client";

import { Prompt } from "@/types";

interface PromptDetailFooterProps {
  prompt: Prompt;
}

export const PromptDetailFooter = ({ prompt }: PromptDetailFooterProps) => {
  return (
    <div className="mt-8 pt-6 border-gray-200 border-t">
      <div className="text-gray-500 text-sm text-center">
        <p>
          Prompt được tạo lúc:{" "}
          {new Date(prompt.createdAt || "").toLocaleDateString("vi-VN")}
        </p>
        {prompt.sumView && <p className="mt-1">Lượt xem: {prompt.sumView}</p>}
      </div>
    </div>
  );
};

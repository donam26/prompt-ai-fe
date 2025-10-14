"use client";

import { Copy, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import React from "react";

interface ResultViewerProps {
  response?: string;
  gptLoading?: boolean;
  onCopyResult?: () => void;
  onUseInChat?: () => void;
}

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="space-y-3 animate-pulse">
    <div className="bg-[length:200%_100%] bg-[linear-gradient(90deg,#f0d9ff_25%,#f3e9ff_50%,#f0d9ff_75%)] ml-auto rounded-lg w-4/5 h-5 animate-[shimmer_1.5s_infinite]" />
    <div className="bg-[length:200%_100%] bg-[linear-gradient(90deg,#f0d9ff_25%,#f3e9ff_50%,#f0d9ff_75%)] rounded-lg w-full h-5 animate-[shimmer_1.5s_infinite]" />
    <div className="bg-[length:200%_100%] bg-[linear-gradient(90deg,#f0d9ff_25%,#f3e9ff_50%,#f0d9ff_75%)] rounded-lg w-full h-5 animate-[shimmer_1.5s_infinite]" />
  </div>
);

// Clean and normalize HTML function
const cleanAndNormalizeHtml = (input: string) => {
  if (!input || typeof input !== "string") return "";
  let text = input;

  // Fix malformed HTML tags
  text = text.replace(/<div=("[^"]*"|'[^']*'|[^ >]+)>/gi, (match, p1) => {
    const styleValue = p1.replace(/^['"]|['"]$/g, "");
    return `<div style="${styleValue}">`;
  });

  // Fix malformed style attributes
  text = text.replace(/styletext-align/gi, 'style="text-align');
  text = text.replace(/(font-size:\s*\d+px)([^;])/gi, (m, p1, p2) => {
    if (p2 !== ";") return p1 + ";" + p2;
    return m;
  });

  // Fix line breaks
  text = text.replace(/<br\s*\/?>/gi, "\n");

  // Remove any remaining malformed HTML tags but preserve markdown
  text = text.replace(/<[^>]*>/g, "");

  // Clean up extra whitespace
  text = text.replace(/\n\s*\n/g, "\n\n");

  return text.trim();
};

export const ResultViewer = ({
  response,
  gptLoading = false,
  onCopyResult,
}: ResultViewerProps) => {
  return (
    <div className="flex flex-col col-span-1 xl:col-span-4 w-full h-full result-card">
      <div className="flex flex-col flex-1 p-6 pt-0">
        <div className="flex justify-between items-start gap-3 pb-4">
          <h4 className="font-bold text-gray-900 text-xl">Kết quả</h4>
          <Button
            onClick={onCopyResult}
            disabled={!response}
            className="flex items-center gap-2 bg-[#5700C6] hover:bg-[#5700C6]/80 disabled:opacity-50 px-4 py-2 rounded-lg text-white text-sm"
          >
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Sao chép</span>
          </Button>
        </div>

        <div className="flex-1 border border-[rgb(217,217,217)] rounded-lg min-h-[400px] chat-result-body">
          <div className="relative p-4 h-full">
            {gptLoading && !response && (
              <div className="z-10 absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                </div>
              </div>
            )}

            <div className="max-w-none h-full markdown-content">
              {response ? (
                <>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={{
                      table: ({ ...props }) => <table {...props} />,
                      th: ({ ...props }) => <th {...props} />,
                      td: ({ ...props }) => <td {...props} />,
                      pre: ({ ...props }) => <pre {...props} />,
                      p: ({ children, ...props }) => {
                        if (
                          children &&
                          Array.isArray(children) &&
                          children.length === 0
                        )
                          return null;
                        if (
                          children &&
                          Array.isArray(children) &&
                          children[0] === ""
                        )
                          return null;
                        return <p {...props}>{children}</p>;
                      },
                      h1: ({ ...props }) => <h1 {...props} />,
                      h2: ({ ...props }) => <h2 {...props} />,
                      h3: ({ ...props }) => <h3 {...props} />,
                      ul: ({ ...props }) => <ul {...props} />,
                      li: ({ ...props }) => <li {...props} />,
                      strong: ({ ...props }) => <strong {...props} />,
                      em: ({ ...props }) => <em {...props} />,
                      blockquote: ({ ...props }) => <blockquote {...props} />,
                      code: ({ ...props }) => <code {...props} />,
                    }}
                  >
                    {cleanAndNormalizeHtml(response).replace("[SKELETON]", "")}
                  </ReactMarkdown>
                  {gptLoading && <SkeletonLoader />}
                </>
              ) : (
                <div className="flex justify-center items-center h-full text-gray-500">
                  <div className="text-center">
                    <MessageCircle className="mx-auto mb-2 w-12 h-12 text-gray-300" />
                    <p className="text-gray-600">
                      Chưa có kết quả. Hãy chạy prompt!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

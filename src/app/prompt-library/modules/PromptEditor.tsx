"use client";

import { RefreshCw, Copy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/types";

interface PromptEditorProps {
  prompt: Prompt;
  userPrompt: string;
  model: string;
  language: string;
  gptLoading: boolean;
  onRefresh: () => void;
  onCopy: () => void;
  onInput: () => void;
  onModelChange: (model: string) => void;
  onLanguageChange: (language: string) => void;
  onRunPrompt: () => void;
  contentEditableRef: React.RefObject<HTMLDivElement | null>;
}

export const PromptEditor = ({
  prompt,
  userPrompt,
  model,
  language,
  gptLoading,
  onRefresh,
  onCopy,
  onInput,
  onModelChange,
  onLanguageChange,
  onRunPrompt,
  contentEditableRef,
}: PromptEditorProps) => {
  return (
    <div className="col-span-1 xl:col-span-3 bg-white shadow-sm rounded-xl w-full h-full chat-card prompt-card">
      <div className="p-6">
        <div className="flex justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center chat-prompt-title">
            <div className="flex justify-center items-center bg-yellow-100 mr-3 rounded-full w-6 h-6">
              <span className="text-yellow-600 text-sm">💡</span>
            </div>
            <h4 className="font-bold text-gray-900 text-xl chat-section-title">
              Sales Funnels Prompt
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
            <Button
              onClick={onCopy}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white text-sm copy-button"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy</span>
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            Click to a highlight variable and type to fill in your input.
          </p>
        </div>

        <div className="mb-6">
          <div
            ref={contentEditableRef}
            contentEditable
            onInput={onInput}
            className="bg-white p-4 border border-gray-300 rounded-lg outline-none min-h-[400px] overflow-y-auto whitespace-pre-wrap chat-textarea"
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "10px",
              padding: "12px",
              minHeight: "400px",
              outline: "none",
              whiteSpace: "pre-wrap",
              overflowY: "auto",
            }}
            dangerouslySetInnerHTML={{
              __html: userPrompt || prompt?.content || "",
            }}
          />
        </div>

        <div className="chat-controls">
          <div className="flex sm:flex-row flex-col justify-between gap-3 w-full">
            <div className="flex items-center gap-4">
              <select
                value={model}
                onChange={e => onModelChange(e.target.value)}
                className="bg-white px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-auto text-sm chat-select"
              >
                <option value="gpt-4o-mini">GPT 4o Mini</option>
                <option value="gpt-4o">GPT 4o</option>
                <option value="gpt-4">GPT 4</option>
              </select>
              <select
                value={language}
                onChange={e => onLanguageChange(e.target.value)}
                className="bg-white px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-auto text-sm chat-select"
              >
                <option value="en">EN_US</option>
                <option value="vi">VN</option>
              </select>
            </div>
            <Button
              onClick={onRunPrompt}
              disabled={gptLoading}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg w-full sm:w-auto font-medium text-white chat-run-button"
            >
              Run Prompt
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

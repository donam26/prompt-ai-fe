"use client";

import { RefreshCw, Copy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MenuItem } from "./Sidebar";
import ContentEditable from "react-contenteditable";
import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Props,
  PLACEHOLDERS,
  MODEL_OPTIONS,
  LANGUAGE_OPTIONS,
  getOptionsByLanguage,
} from "./prompt-library-detail.i";

export const PromptEditor = ({
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
  selectedMenuItem,
  promptType,
  onPromptTypeChange,
}: Props) => {
  const [htmlContent, setHtmlContent] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitializedRef = useRef(false);
  const previousUserPromptRef = useRef<string>("");
  const isUserEditingRef = useRef(false);

  // Convert highlighted content to HTML string (optimized)
  const getHighlightedHtml = useCallback((text: string) => {
    if (!text) return "";
    return text.replace(
      /\[([^\]]*)\]/g,
      '<span class="highlighted-text" style="background-color: #e6f7ff; color: #1890ff; padding: 2px 4px; border-radius: 4px;">[$1]</span>'
    );
  }, []);

  // Initialize HTML content when userPrompt changes (only for MY_PROMPT tab)
  React.useEffect(() => {
    if (selectedMenuItem === MenuItem.MY_PROMPT && userPrompt) {
      // Check if this is a change from outside (refresh or external update)
      const isExternalChange = previousUserPromptRef.current !== userPrompt;

      // Only update if:
      // 1. Not initialized yet, OR
      // 2. External change detected (not from user editing)
      if (
        !hasInitializedRef.current ||
        (isExternalChange && !isUserEditingRef.current)
      ) {
        setHtmlContent(getHighlightedHtml(userPrompt));
        hasInitializedRef.current = true;
        previousUserPromptRef.current = userPrompt;
        isUserEditingRef.current = false;
      }
    }
  }, [userPrompt, getHighlightedHtml, selectedMenuItem]);

  // Clear content when switching to PROMPT_OPTIMIZER
  React.useEffect(() => {
    if (selectedMenuItem === MenuItem.PROMPT_OPTIMIZER) {
      setHtmlContent("");
      hasInitializedRef.current = false;
      isUserEditingRef.current = false;
    }
  }, [selectedMenuItem]);

  // Cleanup debounce timeout on unmount
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleContentChange = useCallback(
    (evt: any) => {
      const newHtml = evt.target.value;
      setHtmlContent(newHtml);

      // Mark that user is manually editing
      isUserEditingRef.current = true;

      // Extract plain text from HTML to sync with previousUserPromptRef
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = newHtml;
      const plainText = tempDiv.textContent || "";

      // Debounce onInput call to avoid too many updates
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        previousUserPromptRef.current = plainText;
        onInput();
      }, 100); // 100ms debounce
    },
    [onInput]
  );

  return (
    <div className="flex flex-col col-span-1 xl:col-span-3 w-full h-full prompt-card">
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center chat-prompt-title">
            <div className="flex justify-center items-center bg-yellow-100 mr-3 rounded-full w-6 h-6">
              <span className="text-yellow-600 text-sm">💡</span>
            </div>
            <h4 className="font-bold text-gray-900 text-xl chat-section-title">
              Prompt
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
              className="flex items-center gap-2 bg-[#5700C6] hover:bg-[#5700C6]/80 px-4 py-2 rounded-lg text-white text-sm copy-button"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy</span>
            </Button>
          </div>
        </div>

        <div className="flex-1 mb-6">
          <ContentEditable
            innerRef={contentEditableRef as any}
            html={htmlContent}
            onChange={handleContentChange}
            className="h-full chat-textarea"
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "10px",
              padding: "12px",
              minHeight: "400px",
              outline: "none",
              whiteSpace: "pre-wrap",
              overflowY: "auto",
            }}
            disabled={false}
            tagName="div"
          />
        </div>
        <div className="chat-controls">
          <div className="flex sm:flex-row flex-col flex-wrap justify-between gap-3 w-full">
            <div className="flex items-center gap-4">
              <Select value={model} onValueChange={onModelChange}>
                <SelectTrigger className="w-full sm:w-auto">
                  <SelectValue placeholder={PLACEHOLDERS.MODEL} />
                </SelectTrigger>
                <SelectContent>
                  {MODEL_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                      <span className="ml-2 text-gray-500 text-xs">
                        {option.cost} credit
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-full sm:w-auto">
                  <SelectValue placeholder={PLACEHOLDERS.LANGUAGE} />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedMenuItem === MenuItem.PROMPT_OPTIMIZER && (
                <Select value={promptType} onValueChange={onPromptTypeChange}>
                  <SelectTrigger className="w-full sm:w-auto min-w-[140px]">
                    <SelectValue placeholder={PLACEHOLDERS.PROMPT_TYPE} />
                  </SelectTrigger>
                  <SelectContent>
                    {getOptionsByLanguage(language).map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <Image
                            src={option.icon}
                            alt={option.label}
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <Button
              onClick={onRunPrompt}
              disabled={gptLoading}
              className="flex items-center gap-2 bg-[#5700C6] hover:bg-[#5700C6]/80 px-6 py-3 rounded-lg w-full sm:w-auto font-medium text-white"
            >
              Chạy Prompt
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

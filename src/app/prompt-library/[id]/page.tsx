"use client";

import { useParams, useRouter } from "next/navigation";
import { usePromptDetail } from "@/hooks/lib-category-prompt";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  PageHeader,
  Sidebar,
  PromptEditor,
  ResultViewer,
  PromptDetailFooter,
} from "../modules";

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const promptId = params.id as string;

  // State management
  const [selectedMenuItem, setSelectedMenuItem] = useState("my-prompt");
  const [userPrompt, setUserPrompt] = useState("");
  const [response, _setResponse] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [language, setLanguage] = useState("vi");
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed on mobile
  const [gptLoading, setGptLoading] = useState(false);
  const contentEditableRef = useRef<HTMLDivElement | null>(null);

  // Fetch prompt detail
  const {
    prompt,
    isLoading: isLoadingPrompt,
    error: promptError,
    refetch: refetchPrompt,
  } = usePromptDetail(promptId);

  const handleInput = useCallback(() => {
    if (!contentEditableRef.current) return;
    const newText = contentEditableRef.current.innerText || "";
    setUserPrompt(newText);
  }, []);

  const handleRefresh = useCallback(() => {
    if (prompt?.content) {
      const cleanPrompt = prompt.content.replace(/<[^>]*>/g, "");
      setUserPrompt(cleanPrompt);
    }
  }, [prompt?.content]);

  const handleCopy = useCallback(() => {
    if (userPrompt) {
      navigator.clipboard.writeText(userPrompt);
    }
  }, [userPrompt]);

  const handleMenuClick = useCallback((key: string) => {
    setSelectedMenuItem(key);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 640) {
      setIsCollapsed(true);
    }
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  // Initialize prompt content when data loads
  useEffect(() => {
    if (prompt?.content && !userPrompt) {
      const cleanPrompt = prompt.content.replace(/<[^>]*>/g, "");
      setUserPrompt(cleanPrompt);
    }
  }, [prompt?.content, userPrompt]);

  // Set initial collapsed state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Loading state
  if (isLoadingPrompt) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
          <p className="text-gray-600">Đang tải chi tiết prompt...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (promptError || !prompt) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4 mx-auto p-6 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <h2 className="font-bold text-gray-900 text-2xl">
            Không tìm thấy prompt
          </h2>
          <p className="text-gray-600">
            {promptError || "Prompt không tồn tại hoặc đã bị xóa"}
          </p>
          <div className="flex gap-3">
            <Button onClick={() => refetchPrompt()} variant="outline">
              Thử lại
            </Button>
            <Button onClick={() => window.history.back()}>Quay lại</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex md:flex-row flex-col gap-2 md:gap-0 bg-gray-100 p-2 md:p-0 pt-4 md:pt-0 max-w-[100vw] min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        selectedMenuItem={selectedMenuItem}
        onMenuClick={handleMenuClick}
        prompt={prompt}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 max-w-full container">
        <div className="chat-layout">
          {/* Page Header */}
          <PageHeader
            title={
              selectedMenuItem === "prompt-optimizer"
                ? "Nâng Cấp Prompt"
                : prompt?.title || ""
            }
            description={
              selectedMenuItem === "prompt-optimizer"
                ? "Nâng cấp Prompt hiện tại của bạn chỉ với 1 nút bấm! Nhận lại Prompt chuyên sâu ngay lập tức!"
                : prompt?.content
            }
            onBack={handleBack}
          />

          <div className="mt-2">
            <div className="relative flex flex-row bg-transparent">
              {/* Main Content Area */}
              <div className="flex-1 chat-content-layout transition-all duration-300 ease-in-out">
                <div className="gap-4 grid grid-cols-1 xl:grid-cols-7 w-full max-w-full chat-main-content">
                  {/* Prompt Editor */}
                  <PromptEditor
                    prompt={prompt}
                    userPrompt={userPrompt}
                    model={model}
                    language={language}
                    gptLoading={gptLoading}
                    onRefresh={handleRefresh}
                    onCopy={handleCopy}
                    onInput={handleInput}
                    onModelChange={setModel}
                    onLanguageChange={setLanguage}
                    onRunPrompt={() => setGptLoading(!gptLoading)}
                    contentEditableRef={contentEditableRef}
                  />

                  {/* Result Viewer */}
                  <ResultViewer
                    response={response}
                    onCopyResult={() =>
                      response && navigator.clipboard.writeText(response)
                    }
                    onUseInChat={() =>
                      response && navigator.clipboard.writeText(response)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <PromptDetailFooter prompt={prompt} />
        </div>
      </div>
    </div>
  );
}

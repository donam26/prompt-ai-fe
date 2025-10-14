"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { usePromptDetail } from "@/hooks/lib-category-prompt";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useCallback, useEffect } from "react";
import { showToast } from "@/components/ui/toast";
import { usePromptStreaming } from "@/hooks/usePromptStreaming";
import { PageHeader } from "./modules/PageHeader";
import { Sidebar, MenuItem } from "./modules/Sidebar";
import { PromptEditor } from "./modules/PromptEditor";
import { ResultViewer } from "./modules/ResultViewer";

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = params.id as string;

  // State management
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>(() => {
    const tab = searchParams.get("tab") as MenuItem;
    return tab && Object.values(MenuItem).includes(tab)
      ? tab
      : MenuItem.MY_PROMPT;
  });
  const [userPrompt, setUserPrompt] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [language, setLanguage] = useState("vi");
  const [promptType, setPromptType] = useState("standard"); // New state for prompt type
  const [isCollapsed, setIsCollapsed] = useState(false); // Start expanded by default
  const contentEditableRef = useRef<HTMLElement | null>(null);

  // Fetch prompt detail
  const {
    prompt = null,
    isLoading: isLoadingPrompt,
    error: promptError,
    refetch: refetchPrompt,
  } = usePromptDetail(promptId);

  // Use custom hook for prompt streaming
  const { gptLoading, response, setResponse, handleSubmit } =
    usePromptStreaming({
      prompt,
      selectedMenuItem,
      model,
      language,
      promptType,
      contentEditableRef,
    });

  const handleInput = useCallback(() => {
    if (!contentEditableRef.current) return;
    const newText = contentEditableRef.current.innerText || "";
    setUserPrompt(newText);
  }, []);

  const handleRefresh = useCallback(() => {
    if (selectedMenuItem === MenuItem.MY_PROMPT && prompt?.content) {
      const cleanPrompt = prompt.content.replace(/<[^>]*>/g, "");
      setUserPrompt(cleanPrompt);
      setResponse("");
    } else if (selectedMenuItem === MenuItem.PROMPT_OPTIMIZER) {
      // Clear prompt for optimizer tab
      setUserPrompt("");
      setResponse("");
    }
  }, [prompt?.content, selectedMenuItem, setResponse]);

  const handleCopy = useCallback(() => {
    if (userPrompt) {
      navigator.clipboard.writeText(userPrompt);
      showToast.success("Đã sao chép prompt!");
    }
  }, [userPrompt]);

  const handleMenuClick = useCallback(
    (key: MenuItem) => {
      // Clear input when switching from MY_PROMPT to PROMPT_OPTIMIZER
      if (
        selectedMenuItem === MenuItem.MY_PROMPT &&
        key === MenuItem.PROMPT_OPTIMIZER
      ) {
        setUserPrompt("");
        setResponse("");
        if (contentEditableRef.current) {
          contentEditableRef.current.innerText = "";
        }
      }

      // Update URL with tab parameter - useEffect will handle state update
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("tab", key);
      router.replace(currentUrl.pathname + currentUrl.search, {
        scroll: false,
      });

      // Close sidebar on mobile after selection
      if (window.innerWidth < 640) {
        setIsCollapsed(true);
      }
    },
    [router, selectedMenuItem, setResponse]
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  // Initialize prompt content when data loads
  useEffect(() => {
    if (
      prompt?.content &&
      !userPrompt &&
      selectedMenuItem === MenuItem.MY_PROMPT
    ) {
      const cleanPrompt = prompt.content.replace(/<[^>]*>/g, "");
      setUserPrompt(cleanPrompt);
    } else if (selectedMenuItem === MenuItem.PROMPT_OPTIMIZER) {
      // Clear prompt for optimizer tab
      setUserPrompt("");
    }
  }, [prompt?.content, userPrompt, selectedMenuItem]);

  // Sync selected tab with URL changes
  useEffect(() => {
    const tab = searchParams.get("tab") as MenuItem;
    if (
      tab &&
      Object.values(MenuItem).includes(tab) &&
      tab !== selectedMenuItem
    ) {
      setSelectedMenuItem(tab);
    }
  }, [searchParams, selectedMenuItem]);

  // Set initial collapsed state based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Only auto-collapse on mobile if sidebar is currently open
      // This prevents forcing collapse if user has manually opened it
      if (window.innerWidth < 640 && !isCollapsed) {
        setIsCollapsed(true);
      }
    };

    // Initial check - collapse on mobile on page load
    if (window.innerWidth < 640) {
      setIsCollapsed(true);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed]);

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
    <div className="flex md:flex-row flex-col gap-2 md:gap-0 bg-white p-2 md:p-0 pt-4 md:pt-0 max-w-[100vw] min-h-screen overflow-x-hidden">
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
              selectedMenuItem === MenuItem.PROMPT_OPTIMIZER
                ? "Nâng Cấp Prompt"
                : prompt?.title || ""
            }
            description={
              selectedMenuItem === MenuItem.PROMPT_OPTIMIZER
                ? "Nâng cấp Prompt hiện tại của bạn chỉ với 1 nút bấm! Nhận lại Prompt chuyên sâu ngay lập tức!"
                : prompt?.content
            }
            onBack={handleBack}
          />

          <div className="mt-2">
            <div className="relative flex flex-row bg-transparent">
              {/* Main Content Area */}
              <div className="flex-1 chat-content-layout transition-all duration-300 ease-in-out">
                <div className="items-stretch gap-4 grid grid-cols-1 xl:grid-cols-7 w-full max-w-full min-h-[600px] chat-main-content">
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
                    onRunPrompt={handleSubmit}
                    contentEditableRef={contentEditableRef}
                    selectedMenuItem={selectedMenuItem}
                    promptType={promptType}
                    onPromptTypeChange={setPromptType}
                  />

                  {/* Result Viewer */}
                  <ResultViewer
                    response={response}
                    gptLoading={gptLoading}
                    onCopyResult={() => {
                      if (response) {
                        navigator.clipboard.writeText(response);
                        showToast.success("Đã sao chép kết quả!");
                      }
                    }}
                    onUseInChat={() => {
                      if (response) {
                        navigator.clipboard.writeText(response);
                        showToast.success(
                          "Đã sao chép kết quả để sử dụng trong chat!"
                        );
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

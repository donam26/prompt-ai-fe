import { Prompt } from "@/types/entities/prompt";
import { MenuItem } from "./Sidebar";

// Constants for select options.
// `cost` phải khớp prompt-ai-be/config/aiModels.js — backend trừ đúng số credit
// này và trả 403 "Không đủ credit" nếu thiếu. Trước đây UI không hiện giá nên
// user chọn DeepSeek R1 (5 credit) khi còn ít credit sẽ bị đá sang trang Pricing
// mà tưởng là "model DeepSeek không chạy được".
export const MODEL_OPTIONS = [
  { value: "gpt-5-mini", label: "GPT 5 Mini", cost: 4 },
  { value: "gpt-5-nano", label: "GPT 5 Nano", cost: 2 },
  { value: "gpt-5.1", label: "GPT 5.1", cost: 8 },
  { value: "deepseek/deepseek-chat-v3.1", label: "DeepSeek V3.1", cost: 3 },
  { value: "deepseek/deepseek-v3.2", label: "DeepSeek V3.2", cost: 2 },
  { value: "deepseek/deepseek-r1-0528", label: "DeepSeek R1", cost: 5 },
] as const;

export const LANGUAGE_OPTIONS = [
  { value: "en", label: "EN_US" },
  { value: "vi", label: "VN" },
] as const;

// Placeholder constants
export const PLACEHOLDERS = {
  MODEL: "Select model",
  LANGUAGE: "Select language",
  PROMPT_TYPE: "Select type",
} as const;

export interface Props {
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
  contentEditableRef: React.RefObject<HTMLElement | null>;
  selectedMenuItem: MenuItem;
  promptType: string;
  onPromptTypeChange: (type: string) => void;
}

// Prompt type options configuration
export const PROMPT_TYPE_OPTIONS = [
  {
    value: "standard",
    icon: "/icons/features/standard-icon.png",
    labels: {
      en: "Professional",
      vi: "Chuyên sâu",
    },
  },
  {
    value: "creative",
    icon: "/icons/features/creative-icon.png",
    labels: {
      en: "Creative",
      vi: "Sáng tạo",
    },
  },
  {
    value: "media",
    icon: "/icons/features/video-icon.png",
    labels: {
      en: "Image / Video",
      vi: "Hình Ảnh / Video",
    },
  },
  {
    value: "json",
    icon: "/icons/features/json-icon.png",
    labels: {
      en: "JSON",
      vi: "JSON",
    },
  },
];

// Helper function to get options by language
export const getOptionsByLanguage = (lang: string) => {
  return PROMPT_TYPE_OPTIONS.map(option => ({
    value: option.value,
    label:
      option.labels[lang as keyof typeof option.labels] || option.labels.vi,
    icon: option.icon,
  }));
};

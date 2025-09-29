import type { BadgeCellProps } from "@/components/table-cell/badge-cell";

export type BadgeVariant = BadgeCellProps["variant"];

export interface BadgeVariantConfig {
  variant: BadgeVariant;
  label: string;
  description: string;
}

export const BADGE_CONSTANTS = {
  // Badge variant configurations for demo
  DEMO_VARIANTS: [
    {
      variant: "section" as const,
      label: "Section",
      description: "Indigo gradient",
    },
    {
      variant: "premium" as const,
      label: "Premium",
      description: "Golden gradient",
    },
    {
      variant: "industry" as const,
      label: "Industry",
      description: "Purple-Pink-Blue gradient",
    },
    {
      variant: "secondary" as const,
      label: "Secondary",
      description: "Teal gradient",
    },
    {
      variant: "ai" as const,
      label: "AI",
      description: "Purple gradient",
    },
    {
      variant: "tech" as const,
      label: "Tech",
      description: "Sky gradient",
    },
    {
      variant: "business" as const,
      label: "Business",
      description: "Lime gradient",
    },
    {
      variant: "administrator" as const,
      label: "Administrator",
      description: "Rose gradient",
    },
    {
      variant: "organization" as const,
      label: "Organization",
      description: "Blue gradient",
    },
    {
      variant: "teacher" as const,
      label: "Teacher",
      description: "Orange gradient",
    },
    {
      variant: "student" as const,
      label: "Student",
      description: "Emerald gradient",
    },
    {
      variant: "creative" as const,
      label: "Creative",
      description: "Pink gradient",
    },
    {
      variant: "marketing" as const,
      label: "Marketing",
      description: "Violet gradient",
    },
    {
      variant: "education" as const,
      label: "Education",
      description: "Blue gradient",
    },
    {
      variant: "healthcare" as const,
      label: "Healthcare",
      description: "Green gradient",
    },
    {
      variant: "finance" as const,
      label: "Finance",
      description: "Slate gradient",
    },
    {
      variant: "entertainment" as const,
      label: "Entertainment",
      description: "Yellow gradient",
    },
    {
      variant: "sports" as const,
      label: "Sports",
      description: "Red gradient",
    },
    {
      variant: "travel" as const,
      label: "Travel",
      description: "Cyan gradient",
    },
    {
      variant: "food" as const,
      label: "Food",
      description: "Orange gradient",
    },
    {
      variant: "fashion" as const,
      label: "Fashion",
      description: "Purple gradient",
    },
    {
      variant: "gaming" as const,
      label: "Gaming",
      description: "Indigo gradient",
    },
    {
      variant: "default" as const,
      label: "Default",
      description: "Cyan-Blue-Purple gradient",
    },
  ] as const satisfies readonly BadgeVariantConfig[],

  // Default badge configuration
  DEFAULT_CONFIG: {
    variant: "default" as const,
    maxWidth: "max-w-[100px]",
    className: "",
  },

  // Badge list configuration
  LIST_CONFIG: {
    DEFAULT_MAX_VISIBLE: 3,
    TABLE_MAX_VISIBLE: 2,
    EMPTY_MESSAGE: "Chưa có",
  },

  // Animation durations
  ANIMATION: {
    DEFAULT_DURATION: 300,
    HOVER_SCALE: 1.05,
    HOVER_TRANSLATE_Y: -0.125, // -translate-y-0.5
    ICON_HOVER_SCALE: 1.1,
    ICON_ROTATION_DEGREE: 3,
    WOW_ICON_HOVER_SCALE: 1.25,
    WOW_ICON_ROTATION_DEGREE: 12,
  },

  // Color theme keys for dynamic styling
  COLOR_THEMES: {
    LIGHT: "light",
    DARK: "dark",
  },

  // Badge sizes
  SIZES: {
    SMALL: "text-xs",
    MEDIUM: "text-sm",
    LARGE: "text-base",
  },

  // Common industry mappings
  INDUSTRY_VARIANTS: {
    EDUCATION: "education" as const,
    TECHNOLOGY: "tech" as const,
    HEALTHCARE: "healthcare" as const,
    FINANCE: "finance" as const,
    ENTERTAINMENT: "entertainment" as const,
    SPORTS: "sports" as const,
    TRAVEL: "travel" as const,
    FOOD: "food" as const,
    FASHION: "fashion" as const,
    GAMING: "gaming" as const,
    CREATIVE: "creative" as const,
    MARKETING: "marketing" as const,
    BUSINESS: "business" as const,
    AI: "ai" as const,
    DEFAULT: "default" as const,
  },

  // Role mappings
  ROLE_VARIANTS: {
    ADMINISTRATOR: "administrator" as const,
    ORGANIZATION: "organization" as const,
    TEACHER: "teacher" as const,
    STUDENT: "student" as const,
  },

  // Type mappings
  TYPE_VARIANTS: {
    SECTION: "section" as const,
    PREMIUM: "premium" as const,
    INDUSTRY: "industry" as const,
    SECONDARY: "secondary" as const,
  },
} as const;

// Helper functions
export const getBadgeVariantByIndustry = (
  industryName: string
): BadgeVariant => {
  const name = industryName.toLowerCase();

  if (name.includes("education") || name.includes("edu")) return "education";
  if (name.includes("tech") || name.includes("it") || name.includes("software"))
    return "tech";
  if (name.includes("health") || name.includes("medical")) return "healthcare";
  if (name.includes("finance") || name.includes("bank")) return "finance";
  if (name.includes("entertainment") || name.includes("media"))
    return "entertainment";
  if (name.includes("sport")) return "sports";
  if (name.includes("travel") || name.includes("tourism")) return "travel";
  if (name.includes("food") || name.includes("restaurant")) return "food";
  if (name.includes("fashion") || name.includes("clothing")) return "fashion";
  if (name.includes("gaming") || name.includes("game")) return "gaming";
  if (name.includes("creative") || name.includes("design")) return "creative";
  if (name.includes("marketing") || name.includes("advertising"))
    return "marketing";
  if (name.includes("business") || name.includes("corporate"))
    return "business";
  if (name.includes("ai") || name.includes("artificial")) return "ai";

  return "default";
};

export const getBadgeVariantByRole = (role: string): BadgeVariant => {
  const roleLower = role.toLowerCase();

  if (roleLower.includes("admin")) return "administrator";
  if (roleLower.includes("organization") || roleLower.includes("company"))
    return "organization";
  if (roleLower.includes("teacher") || roleLower.includes("instructor"))
    return "teacher";
  if (roleLower.includes("student") || roleLower.includes("learner"))
    return "student";

  return "default";
};

export const getBadgeVariantByType = (type: string): BadgeVariant => {
  const typeLower = type.toLowerCase();

  if (typeLower.includes("section")) return "section";
  if (typeLower.includes("premium") || typeLower.includes("pro"))
    return "premium";
  if (typeLower.includes("industry")) return "industry";
  if (typeLower.includes("secondary") || typeLower.includes("basic"))
    return "secondary";

  return "default";
};

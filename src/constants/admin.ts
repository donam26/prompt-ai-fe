/**
 * Admin constants
 *
 * This file contains all constants used across the admin section
 * for better maintainability and reusability.
 */

// Debounce delay for search input
export const DEBOUNCE_DELAY = 300;

// Filter constants
export const FILTER_CONSTANTS = {
  CONTAINER: "space-y-6",
  GRID: "grid gap-4 xl:grid-cols-3",
  GRID_BOTTOM: "grid gap-4 xl:grid-cols-2",
  SEARCH_ICON:
    "absolute left-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2 transform",
  SPACING: "space-y-6",
} as const;

// Active filters constants
export const ACTIVE_FILTERS_CONSTANTS = {
  CONTAINER:
    "flex flex-wrap items-center gap-2 p-4 bg-gray-50 rounded-lg border",
  CLEAR_BUTTON:
    "hover:bg-gray-100 ml-auto px-3 py-1 border-gray-300 h-7 text-gray-600 hover:text-gray-900 text-xs",
} as const;

// Table constants
export const TABLE_CONSTANTS = {
  IMAGE_SIZE: 48,
  BADGE_VARIANTS: {
    COMING_SOON: "secondary",
    ACTIVE: "default",
  },
} as const;

// Form constants
export const FORM_CONSTANTS = {
  SPACING: "space-y-6",
  ACTIONS_SPACING: "space-y-3",
  BORDER_TOP: "pt-4 border-gray-200 border-t",
} as const;

// Dialog constants
export const DIALOG_CONSTANTS = {
  CONTENT_CLASS: "shadow-lg border border-gray-200 sm:max-w-[500px]",
  TITLE_CLASS: "font-semibold text-gray-900 text-xl",
  HEADER_CLASS: "pb-4",
} as const;

// Card constants
export const CARD_CONSTANTS = {
  FILTER_CARD: "shadow-sm border border-gray-200",
  TABLE_CARD: "shadow-sm border border-gray-200",
  HEADER_CLASS: "bg-gray-50 border-gray-200 border-b",
  TITLE_CLASS: "font-semibold text-gray-900 text-lg",
} as const;

// Button constants
export const BUTTON_CONSTANTS = {
  PRIMARY: "bg-primary-600 hover:bg-primary-700 text-white",
  OUTLINE: "hover:bg-gray-50 border-gray-300 text-gray-700",
  CLEAR_FILTERS:
    "border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-900",
} as const;

// Input constants
export const INPUT_CONSTANTS = {
  SEARCH:
    "pl-10 border-gray-300 focus:border-primary-500 focus:ring-primary-500",
  SELECT: "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
} as const;

// Label constants
export const LABEL_CONSTANTS = {
  FILTER: "font-medium text-gray-700 text-sm",
} as const;

// Badge constants
export const BADGE_CONSTANTS = {
  SECTION:
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200",
  COMING_SOON:
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200",
  ACTIVE:
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200",
  FILTER_BADGE: "gap-1",
} as const;

// Initial states
export const INITIAL_FILTER_STATE = {
  searchTerm: "",
  sectionId: "all",
  status: "all",
  industryIds: [] as readonly string[],
} as const;

export const INITIAL_FORM_DATA = {
  name: "",
  description: "",
  section_id: "",
  is_coming_soon: false,
} as const;

// Admin labels for dashboard
export const ADMIN_LABELS = {
  DASHBOARD: {
    TITLE: "Dashboard",
    SUBTITLE: "Welcome to the admin dashboard",
    QUICK_ACTIONS_TITLE: "Quick Actions",
    QUICK_ACTIONS_DESCRIPTION: "Common administrative tasks",
    ACTIVITY_TITLE: "Activity Overview",
    ACTIVITY_DESCRIPTION: "Key metrics and statistics",
    RECENT_ACTIVITY_TITLE: "Recent Activity",
    RECENT_ACTIVITY_DESCRIPTION: "Latest system activities",
  },
} as const;

// Quick actions for admin dashboard
export const QUICK_ACTIONS = [
  {
    title: "Manage Categories",
    description: "Add, edit, or remove categories",
    href: "/admin/category",
    icon: "📁",
  },
  {
    title: "Manage Users",
    description: "View and manage user accounts",
    href: "/admin/users",
    icon: "👥",
  },
  {
    title: "View Analytics",
    description: "Check system analytics",
    href: "/admin/analytics",
    icon: "📊",
  },
  {
    title: "System Settings",
    description: "Configure system settings",
    href: "/admin/settings",
    icon: "⚙️",
  },
] as const;

// Activity stats for dashboard
export const ACTIVITY_STATS = [
  {
    label: "Total Users",
    value: "0",
    icon: "👥",
    color: "text-blue-500",
  },
  {
    label: "Active Sessions",
    value: "0",
    icon: "🔗",
    color: "text-green-500",
  },
  {
    label: "System Load",
    value: "Low",
    icon: "⚡",
    color: "text-yellow-500",
  },
] as const;

// Recent activities for dashboard
export const RECENT_ACTIVITIES = [
  {
    id: "1",
    type: "user_registration",
    message: "New user registered",
    timestamp: new Date().toISOString(),
    icon: "👤",
    color: "bg-green-500",
    time: "2 minutes ago",
  },
  {
    id: "2",
    type: "category_created",
    message: "New category created",
    timestamp: new Date().toISOString(),
    icon: "📁",
    color: "bg-blue-500",
    time: "5 minutes ago",
  },
  {
    id: "3",
    type: "system_update",
    message: "System updated successfully",
    timestamp: new Date().toISOString(),
    icon: "🔄",
    color: "bg-yellow-500",
    time: "10 minutes ago",
  },
] as const;

// Function to create stat cards from dashboard stats
export const createStatCards = (stats: Record<string, unknown>) => {
  return [
    {
      title: "Total Users",
      value: Number(stats.totalUsers) || 0,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Total Prompts",
      value: Number(stats.totalPrompts) || 0,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Total Categories",
      value: Number(stats.totalCategories) || 0,
      change: "+5%",
      changeType: "positive" as const,
    },
    {
      title: "Total Blogs",
      value: Number(stats.totalBlogs) || 0,
      change: "+15%",
      changeType: "positive" as const,
    },
    {
      title: "Total Payments",
      value: Number(stats.totalPayments) || 0,
      change: "+22%",
      changeType: "positive" as const,
    },
    {
      title: "Monthly Revenue",
      value: `$${Number(stats.monthlyRevenue) || 0}`,
      change: "+18%",
      changeType: "positive" as const,
    },
  ];
};

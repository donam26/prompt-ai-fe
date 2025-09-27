// Base user types for reuse across the application

// User subscription type
export interface UserSubscription {
  id: number;
  status: number;
  start_date: string;
  end_date: string;
  token: number;
  subscription: {
    id: number;
    name: string;
    type: number;
    price?: number;
    description?: string;
  };
}

// Base user interface
export interface BaseUser {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
  permissions: string[];
  count_prompt: number;
  updated_at: string;
  userSub?: UserSubscription;
  avatar?: string;
  created_at?: string;
}

// API user response (from backend)
export interface ApiUser {
  id: string;
  fullName?: string;
  full_name?: string;
  email: string;
  role?: number;
  role_id?: number;
  count_prompt?: number;
  updated_at?: string;
  profile_image?: string;
  permissions?: string[];
  userSub?: UserSubscription;
  created_at?: string;
  avatar?: string;
}

// User with subscription details
export interface UserWithSubscription extends BaseUser {
  userSub: UserSubscription;
}

// User for authentication (simplified)
export interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
  permissions: string[];
  is_verified?: boolean;
  account_status?: number;
}

// User for display purposes
export interface DisplayUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  verified: boolean;
  promptCount: number;
  subscription?: string;
}

// User profile data
export interface UserProfile {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  profile_image?: string;
  role_name: string;
  permissions: string[];
  subscription?: UserSubscription;
  created_at: string;
  updated_at: string;
}

// User statistics
export interface UserStats {
  totalPrompts: number;
  usedPrompts: number;
  remainingPrompts: number;
  subscriptionDaysLeft: number;
  lastActivity: string;
}

// User preferences
export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisible: boolean;
    activityVisible: boolean;
  };
}

export interface User {
  id: string | number;
  full_name: string;
  email: string;
  role_id: number;
  permissions?: string[] | string;
  count_prompt?: number;
  updated_at: string;
  userSub?: UserSubscription;
  avatar?: string;
  created_at?: string;
}

export interface UserSubscription {
  id: string | number;
  user_id: string | number;
  subscription_id: string | number;
  subscription?: Subscription;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string | number;
  name: string;
  type: number;
  duration: string;
  price: number;
  features: string[];
  created_at: string;
  updated_at: string;
}

export interface Prompt {
  id: string | number;
  title: string;
  content: string;
  description?: string;
  category_id: string | number;
  topic_id?: string | number;
  industry_id?: string | number;
  is_type: number;
  sub_type: number;
  image?: string;
  image_card?: string;
  is_coming_soon?: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
  topic?: Topic;
  industry?: Industry;
}

export interface Category {
  id: string | number;
  name: string;
  description?: string;
  image?: string;
  image_card?: string;
  section_id: string | number;
  type?: string;
  is_coming_soon?: boolean;
  is_comming_soon?: boolean; // Support both spellings
  created_at: string;
  updated_at: string;
  section?: Section;
  Section?: Section; // Support both field names
  industries?: Industry[];
}

export interface Section {
  id: string | number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Topic {
  id: string | number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Industry {
  id: string | number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string | number;
  title: string;
  content: string;
  meta_description?: string;
  featured_image?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  category_id?: string | number;
  category?: {
    id: string | number;
    name: string;
  };
  blog_category?: BlogCategory;
}

export interface BlogCategory {
  id: string | number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: number;
  status: string;
  reply?: string;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string | number;
  code: string;
  description?: string;
  discount_type: string; // 'percentage' | 'fixed'
  discount_value: number;
  min_amount?: number;
  max_discount?: number;
  usage_limit?: number;
  used_count: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string | number;
  user_id: string | number;
  subscription_id: string | number;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  transaction_id?: string;
  vnp_response_code?: string;
  created_at: string;
  updated_at: string;
  user?: User;
  subscription?: Subscription;
}

export interface Role {
  id: string | number;
  name: string;
  description?: string;
  permissions: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Product {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FavoritePrompt {
  id: string | number;
  user_id: string | number;
  prompt_id: string | number;
  created_at: string;
  prompt?: Prompt;
}

export interface DeviceLog {
  id: string | number;
  user_id: string | number;
  device_info: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface LoginResponse {
  success?: boolean;
  message?: string;
  requireVerification?: boolean;
  email?: string;
  data?: {
    user?: User;
    token?: string;
    message?: string;
  };
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

export interface UpdateUserRequest {
  full_name?: string;
  email?: string;
  avatar?: File;
}

export interface CreatePromptRequest {
  title: string;
  content: string;
  description?: string;
  category_id: string | number;
  topic_id?: string | number;
  industry_id?: string | number;
  is_type: number;
  sub_type: number;
  image?: File;
  image_card?: File;
  is_coming_soon?: boolean;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  section_id: string | number;
  image?: File;
  image_card?: File;
  is_coming_soon?: boolean;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  description?: string;
  blog_category_id: string | number;
  image?: File;
}

export interface CreateCouponRequest {
  code: string;
  description?: string;
  discount_type: string;
  discount_value: number;
  min_amount?: number;
  max_discount?: number;
  usage_limit?: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface PaymentRequest {
  subscription_id: string | number;
  amount: number;
  coupon_code?: string;
}

export interface GPTRequest {
  message: string;
  user_id: string | number;
  conversation_id?: string;
}

export interface GPTResponse {
  success: boolean;
  data: {
    message: string;
    conversation_id: string;
  };
}

export interface SearchFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  category_id?: string | number;
  topic_id?: string | number;
  industry_id?: string | number | string[];
  is_type?: string | number;
  sub_type?: string | number;
  status?: string;
  type?: string | number;
}

export interface TableColumn {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (value: unknown, record: unknown, index: number) => React.ReactNode;
  sorter?: boolean;
  filterable?: boolean;
  width?: number | string;
  align?: "left" | "center" | "right";
}

export interface AdminStats {
  totalUsers: number;
  totalPrompts: number;
  totalCategories: number;
  totalBlogs: number;
  totalPayments: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
}

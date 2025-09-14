import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Tạo instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

// Interceptor để thêm token và xử lý Content-Type phù hợp cho mỗi request
axiosInstance.interceptors.request.use(
  config => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Kiểm tra nếu data là FormData thì set Content-Type là multipart/form-data
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Helper function để clean params
function cleanParams(params: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const key in params) {
    const value = params[key];
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      result[key] = value;
    }
  }
  return result;
}

export const api = {
  // Prompt APIs
  getPrompts: async (query: string) => {
    return axiosInstance.get(`/prompts?${query}`);
  },
  uploadImage: async (data: FormData) => {
    return axiosInstance.post(`/prompts/upload`, data);
  },
  getPromptById: async (id: string | number) => {
    return axiosInstance.get(`/prompts/${id}`);
  },
  createPrompt: async (promptData: CreatePromptRequest) => {
    return axiosInstance.post(`/prompts`, promptData);
  },
  updatePrompt: async (
    id: string | number,
    promptData: Partial<CreatePromptRequest>
  ) => {
    return axiosInstance.put(`/prompts/${id}`, promptData);
  },
  deletePrompt: async (id: string | number) => {
    return axiosInstance.delete(`/prompts/${id}`);
  },
  deleteCategory: async (id: string | number) => {
    return axiosInstance.delete(`/categories/${id}`);
  },
  getPromptsByCategoryId: async (
    page = 1,
    pageSize = 12,
    category_id?: string | number,
    topic_id?: string | number,
    industry_id?: string | number | string[],
    search_text?: string,
    is_type?: string | number,
    sub_type?: string | number
  ) => {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("pageSize", String(pageSize));

    if (category_id !== undefined)
      params.append("category_id", String(category_id));
    if (topic_id !== undefined) params.append("topic_id", String(topic_id));
    if (industry_id !== undefined) {
      // Handle multiple industry IDs - convert array to comma-separated string
      const industryParam = Array.isArray(industry_id)
        ? industry_id.join(",")
        : String(industry_id);
      params.append("industry_id", industryParam);
    }
    if (search_text !== undefined) params.append("search_text", search_text);
    if (is_type !== undefined) params.append("is_type", String(is_type));
    if (sub_type !== undefined) params.append("sub_type", String(sub_type));

    return axiosInstance.get(`/prompts/by-category?${params.toString()}`);
  },

  getPromptsContentByCategoryId: async (category_id: string | number) => {
    return axiosInstance.get(
      `/prompts/topics/by-category?category_id=${category_id}`
    );
  },
  getNewestPromptsByCategoryId: async (category_id: string | number) => {
    return axiosInstance.get(`/prompts/newest?category_id=${category_id}`);
  },
  getRelatedPrompts: async (
    current_id: string | number,
    category_id: string | number,
    topic_id: string | number
  ) => {
    return axiosInstance.get(
      `/prompts/related?current_id=${current_id}&category_id=${category_id}&topic_id=${topic_id}`
    );
  },

  // Category APIs
  getCategories: async () => {
    return axiosInstance.get(`/categories`);
  },
  getCategoriesPage: async (page = 1, pageSize = 10, queryParams = "") => {
    const url = queryParams
      ? `/categories?${queryParams}`
      : `/categories?page=${page}&pageSize=${pageSize}`;
    return axiosInstance.get(url);
  },
  getCategoryById: async (id: string | number) => {
    return axiosInstance.get(`/categories/${id}`);
  },
  getCategoriesBySection: async (
    sectionId: string | number,
    searchTxt?: string,
    listCategory?: string,
    type?: string,
    industryIds?: string[] | number[]
  ) => {
    const params = new URLSearchParams();
    if (searchTxt) params.append("searchTxt", searchTxt);
    if (listCategory) params.append("listCategory", listCategory);
    if (type) params.append("type", type);
    if (industryIds && industryIds.length > 0) {
      // Handle multiple industry IDs - convert array to comma-separated string
      const industryParam = Array.isArray(industryIds)
        ? industryIds.join(",")
        : String(industryIds);
      params.append("industry_id", industryParam);
    }

    return axiosInstance.get(
      `/categories/by-sectionId/${sectionId}?${params.toString()}`
    );
  },
  createCategories: async (categoryData: CreateCategoryRequest) => {
    return axiosInstance.post(`/categories`, categoryData);
  },
  updateCategories: async (
    id: string | number,
    categoryData: Partial<CreateCategoryRequest>
  ) => {
    return axiosInstance.put(`/categories/${id}`, categoryData);
  },
  deleteCategories: async (id: string | number) => {
    return axiosInstance.delete(`/categories/${id}`);
  },

  // Section APIs
  getSections: async () => {
    return axiosInstance.get(`/sections`);
  },

  // Topic APIs
  getTopics: async () => {
    return axiosInstance.get(`/topic`);
  },
  getTopicsPage: async (page = 1, pageSize = 10) => {
    return axiosInstance.get(`/topic/list?page=${page}&pageSize=${pageSize}`);
  },
  createTopics: async (promptData: unknown) => {
    return axiosInstance.post(`/topic`, promptData);
  },
  updateTopics: async (id: string | number, promptData: unknown) => {
    return axiosInstance.put(`/topic/${id}`, promptData);
  },
  deleteTopics: async (id: string | number) => {
    return axiosInstance.delete(`/topic/${id}`);
  },

  // Contact APIs
  getContacts: async () => {
    return axiosInstance.get(`/contact`);
  },
  getContactsPage: async (
    page = 1,
    pageSize = 10,
    status?: string,
    type = 1
  ) => {
    return axiosInstance.get(
      `/contact/list?page=${page}&pageSize=${pageSize}&status=${status}&type=${type}`
    );
  },
  exportContactsExcel: async (filters: Record<string, unknown> = {}) => {
    const cleaned = cleanParams(filters);
    const query = new URLSearchParams(cleaned).toString();
    return axiosInstance.get(`/contact/export?${query}`, {
      responseType: "blob",
    });
  },
  sendContacts: async (data: unknown) => {
    return axiosInstance.post(`/contact`, data);
  },
  repContacts: async (id: string | number, data: unknown) => {
    return axiosInstance.put(`/contact/${id}`, { reply: data });
  },

  // Subscription APIs
  getSubPage: async (page = 1, pageSize = 10) => {
    return axiosInstance.get(
      `/subscriptions/list?page=${page}&pageSize=${pageSize}`
    );
  },
  createSub: async (promptData: unknown) => {
    return axiosInstance.post(`/subscriptions`, promptData);
  },
  updateSub: async (id: string | number, promptData: unknown) => {
    return axiosInstance.put(`/subscriptions/${id}`, promptData);
  },
  deleteSub: async (id: string | number) => {
    return axiosInstance.delete(`/subscriptions/${id}`);
  },
  getSubDuration: async (duration: string) => {
    return axiosInstance.get(`/subscriptions/by-duration?duration=${duration}`);
  },
  getSubByDurationAndType: async (duration: string, type: string) => {
    return axiosInstance.get(
      `/subscriptions/by-duration-and-type?duration=${duration}&type=${type}`
    );
  },

  // Blog APIs
  getBlogById: async (id: string | number) => {
    return axiosInstance.get(`/blog/${id}`);
  },
  getBlogPage: async (page = 1, pageSize = 10, search?: string) => {
    return axiosInstance.get(
      `/blog/list?page=${page}&pageSize=${pageSize}&search=${search}`
    );
  },
  createBlog: async (promptData: unknown) => {
    return axiosInstance.post(`/blog`, promptData);
  },
  updateBlog: async (id: string | number, promptData: unknown) => {
    return axiosInstance.put(`/blog/${id}`, promptData);
  },
  deleteBlog: async (id: string | number) => {
    return axiosInstance.delete(`/blog/${id}`);
  },

  // Blog Category APIs
  getBlogCategory: async () => {
    return axiosInstance.get(`/blogcategory`);
  },
  getBlogCategoryPage: async () => {
    return axiosInstance.get(`/blogcategory/list`);
  },
  createBlogCategory: async (promptData: unknown) => {
    return axiosInstance.post(`/blogcategory`, promptData);
  },
  updateBlogCategory: async (id: string | number, promptData: unknown) => {
    return axiosInstance.put(`/blogcategory/${id}`, promptData);
  },
  deleteBlogCategory: async (id: string | number) => {
    return axiosInstance.delete(`/blogcategory/${id}`);
  },

  // User APIs
  googleLogin: async (credential: string) => {
    const response = await axiosInstance.post(`/users/auth/google`, {
      credential,
    });
    return response;
  },
  loginUser: async (email: string) => {
    const response = await axiosInstance.post(`/users/login`, { email });
    const { token } = response.data;
    if (token && typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    return response;
  },
  verifyLogin: async (email: string, otp: string, userIP: string) => {
    const response = await axiosInstance.post(`/users/login-verify`, {
      email,
      otp,
      ip_address: userIP,
    });
    const { token } = response.data;
    if (token && typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    return response;
  },
  passwordLogin: async (email: string, password: string, userIP: string) => {
    const response = await axiosInstance.post(`/users/login-password`, {
      email,
      password,
      ip_address: userIP,
    });
    const { token } = response.data;
    if (token && typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    return response;
  },
  verifyOTP: async (email: string, otp: string) => {
    return axiosInstance.post(`/users/verify-otp`, { email, otp });
  },
  resendOTP: async (email: string) => {
    return axiosInstance.post(`/users/resend-otp`, { email });
  },
  registerUser: async (fullName: string, email: string, password: string) => {
    return axiosInstance.post(`/users/register`, {
      full_name: fullName,
      email,
      password,
    });
  },
  forgotPassword: async (email: string) => {
    return axiosInstance.post(`/users/forgot-password`, { email });
  },
  resetPassword: async (email: string, otp: string, newPassword: string) => {
    return axiosInstance.post(`/users/reset-password`, {
      email,
      otp,
      newPassword,
    });
  },
  updateCount: async (id: string | number) => {
    return axiosInstance.put(`/users/count-prompt/${id}`);
  },
  getUserPage: (
    page = 1,
    pageSize = 10,
    filters: Record<string, unknown> = {}
  ) => {
    const payload = {
      page: page,
      pageSize: pageSize,
      ...filters,
    };

    return axiosInstance.post("/users/list", payload);
  },
  getUserInfo: async (id: string | number) => {
    return axiosInstance.get(`/users/${id}`);
  },
  updateUser: async (id: string | number, data: unknown) => {
    return axiosInstance.put(`/users/${id}`, data);
  },
  updateUserInfo: async (id: string | number, data: unknown) => {
    return axiosInstance.put(`/users/update-info/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  changePassword: async (
    id: string | number,
    password: string,
    newPassword: string
  ) => {
    return axiosInstance.put(
      `/users/change-password/${id}?password=${password}&newPassword=${newPassword}`
    );
  },
  getUserSubscriptions: (id: string | number) =>
    axiosInstance.get(`/users/${id}/subscriptions`),
  addUserSubscription: (id: string | number, data: unknown) =>
    axiosInstance.post(`/users/${id}/subscriptions`, data),
  updateUserSubscription: (
    id: string | number,
    subId: string | number,
    data: unknown
  ) => axiosInstance.put(`/users/${id}/subscriptions/${subId}`, data),
  deleteUserSubscription: (id: string | number, subId: string | number) =>
    axiosInstance.delete(`/users/${id}/subscriptions/${subId}`),
  changeUserSubscription: (
    id: string | number,
    subId: string | number,
    data: unknown
  ) => axiosInstance.patch(`/users/${id}/subscriptions/${subId}/change`, data),
  exportUsersExcel: async (filters: Record<string, unknown> = {}) => {
    return axiosInstance.post("/users/export-excel", filters, {
      responseType: "blob",
    });
  },

  // Like Prompt APIs
  getFavoritePrompts: async (userId: string | number) => {
    return axiosInstance.get(`/promptfavorite/${userId}`);
  },
  addFavoritePrompt: async (
    promptId: string | number,
    userId: string | number
  ) => {
    return axiosInstance.post(`/promptfavorite`, {
      prompt_id: promptId,
      user_id: userId,
    });
  },
  removeFavoritePrompt: async (id: string | number) => {
    return axiosInstance.delete(`/promptfavorite/${id}`);
  },

  // Product APIs
  getProducts: async (page = 1, pageSize = 10) => {
    return axiosInstance.get(`/products?page=${page}&pageSize=${pageSize}`);
  },
  createProduct: async (promptData: unknown) => {
    return axiosInstance.post(`/products`, promptData);
  },
  updateProduct: async (id: string | number, promptData: unknown) => {
    return axiosInstance.put(`/products/${id}`, promptData);
  },
  deleteProduct: async (id: string | number) => {
    return axiosInstance.delete(`/products/${id}`);
  },
  getFavoritePromptsByUserId: async (
    userId: string | number,
    sectionId: string | number
  ) => {
    return axiosInstance.get(
      `/promptfavorite/list/by-section?user_id=${userId}&section_id=${sectionId}`
    );
  },

  // Device Log APIs
  getDeviceLog: async (userId: string | number) => {
    return axiosInstance.get(`/devicelogs/${userId}`);
  },

  // Send mail
  sendMail: async (data: unknown) => {
    return axiosInstance.post(`/contact/survey`, data);
  },
  sendMailTest: async (data: unknown) => {
    return axiosInstance.post(`/contact/survey-test`, data);
  },
  uploadExcel: async (data: unknown) => {
    return axiosInstance.post(`/prompts/import-excel`, data);
  },
  exportPromptsExcel: async (filters: Record<string, unknown> = {}) => {
    const cleaned = cleanParams(filters);
    const query = new URLSearchParams(cleaned).toString();
    return axiosInstance.get(`/prompts/export-excel-enhanced?${query}`, {
      responseType: "blob",
    });
  },

  // Get code
  getCode: async (data: string) => {
    return axiosInstance.get(`/referral/get-discount/${data}`);
  },
  payment: async (data: unknown) => {
    return axiosInstance.post(`/payment/create_payment_url`, data);
  },

  // GPT
  callGPT: async (data: unknown) => {
    return axiosInstance.post(`/chat/gpt`, data);
  },
  getHistory: async (userId: string | number) => {
    return axiosInstance.get(`/history/user/${userId}`);
  },

  // Coupon APIs
  getListCoupon: async (params: Record<string, unknown>) => {
    const query = new URLSearchParams(params).toString();
    return axiosInstance.get(`/coupons?${query}`);
  },
  createCoupon: async (data: unknown) => {
    return axiosInstance.post(`/coupons`, data);
  },
  updateCoupon: async (id: string | number, data: unknown) => {
    return axiosInstance.put(`/coupons/${id}`, data);
  },
  deleteCoupon: async (id: string | number) => {
    return axiosInstance.delete(`/coupons/${id}`);
  },
  getCouponUsers: async (id: string | number) => {
    return axiosInstance.get(`/coupons/${id}/users`);
  },
  validateCoupon: async (code: string, totalPrice: number) => {
    return axiosInstance.post(`/coupons/validate`, { code, total: totalPrice });
  },

  // Payment APIs
  getListPayment: async (params: Record<string, unknown>) => {
    const cleaned = cleanParams(params);
    const query = new URLSearchParams(cleaned).toString();
    return axiosInstance.get(`/payment/filter?${query}`);
  },
  exportPaymentsExcel: async (filters: Record<string, unknown> = {}) => {
    const cleaned = cleanParams(filters);
    const query = new URLSearchParams(cleaned).toString();
    return axiosInstance.get(`/payment/export?${query}`, {
      responseType: "blob",
    });
  },

  // Role APIs
  getRoles: async () => {
    return axiosInstance.get(`/roles`);
  },
  getRoleById: async (id: string | number) => {
    return axiosInstance.get(`/roles/${id}`);
  },
  createRole: async (roleData: unknown) => {
    return axiosInstance.post(`/roles`, roleData);
  },
  updateRole: async (id: string | number, roleData: unknown) => {
    return axiosInstance.put(`/roles/${id}`, roleData);
  },
  deleteRole: async (id: string | number) => {
    return axiosInstance.delete(`/roles/${id}`);
  },
  restoreRole: async (id: string | number) => {
    return axiosInstance.patch(`/roles/${id}/restore`);
  },
  getDeletedRoles: async () => {
    return axiosInstance.get(`/roles/deleted/list`);
  },

  // User-Role Management APIs
  getUsersByRole: async (
    roleId: string | number,
    params: Record<string, unknown> = {}
  ) => {
    const query = new URLSearchParams(params).toString();
    return axiosInstance.get(`/roles/${roleId}/users?${query}`);
  },
  assignUserToRole: async (
    roleId: string | number,
    userId: string | number
  ) => {
    return axiosInstance.post(`/roles/${roleId}/assign-multiple-users`, {
      userIds: [userId],
    });
  },
  assignMultipleUsersToRole: async (
    roleId: string | number,
    userIds: (string | number)[]
  ) => {
    return axiosInstance.post(`/roles/${roleId}/assign-multiple-users`, {
      userIds: userIds,
    });
  },
  removeUserFromRole: async (
    roleId: string | number,
    userId: string | number
  ) => {
    return axiosInstance.delete(`/roles/${roleId}/remove-user/${userId}`);
  },
  getRoleUserStats: async () => {
    return axiosInstance.get(`/stats/users-by-role`);
  },

  // Industry APIs
  getIndustries: async () => {
    return axiosInstance.get("/industries");
  },
  getIndustriesPage: async (page = 1, pageSize = 10, queryParams = "") => {
    const url = queryParams
      ? `/industries?page=${page}&pageSize=${pageSize}&${queryParams}`
      : `/industries?page=${page}&pageSize=${pageSize}`;
    return axiosInstance.get(url);
  },
  getIndustryById: async (id: string | number) => {
    return axiosInstance.get(`/industries/${id}`);
  },
  createIndustry: async (data: unknown) => {
    return axiosInstance.post("/industries", data);
  },
  updateIndustry: async (id: string | number, data: unknown) => {
    return axiosInstance.put(`/industries/${id}`, data);
  },
  deleteIndustry: async (id: string | number) => {
    return axiosInstance.delete(`/industries/${id}`);
  },
};

export default api;

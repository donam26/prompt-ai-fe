import { apiClient } from "@/lib/api-client";

interface SendMailRequest {
  reply: string;
}

interface SendMailResponse {
  success: boolean;
  failedEmails?: string[];
}

interface MailLog {
  readonly id: string;
  readonly email: string;
  readonly subject: string;
  readonly status: "success" | "failed";
  readonly timestamp: string;
  readonly createdAt?: string;
}

interface MailLogsResponse {
  readonly data: MailLog[];
  readonly total: number;
  readonly totalPages: number;
}

export const sendMailService = {
  sendMail: async (data: SendMailRequest): Promise<SendMailResponse> => {
    const response = await apiClient.post("/contact/survey", data);
    return response.data;
  },

  sendMailTest: async (data: SendMailRequest): Promise<SendMailResponse> => {
    const response = await apiClient.post("/contact/survey-test", data);
    return response.data;
  },

  uploadWordFile: async (file: File): Promise<{ html: string }> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/upload-word", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getMailLogs: async (params?: {
    pageIndex?: number;
    pageSize?: number;
  }): Promise<MailLogsResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.pageIndex) {
      queryParams.append("pageIndex", String(params.pageIndex));
    }
    if (params?.pageSize) {
      queryParams.append("pageSize", String(params.pageSize));
    }

    const response = await apiClient.get(
      `/admin/mail-logs?${queryParams.toString()}`
    );
    return response.data;
  },
};

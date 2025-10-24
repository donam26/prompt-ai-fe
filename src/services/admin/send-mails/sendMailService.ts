import { apiClient } from "@/lib/api-client";

interface SendMailRequest {
  reply: string;
}

interface SendMailResponse {
  success: boolean;
  failedEmails?: string[];
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
};

import { apiClient, buildUrlWithParams } from "../../base/apiClient";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import { PaginationParams, ServiceMethod } from "../../base/types";

// Contact service parameters
export interface ContactListParams extends PaginationParams {
  status?: string;
  type?: number;
}

export class ContactService {
  // Get all contacts
  getContacts: ServiceMethod = () => {
    return apiClient.get(ENDPOINTS.CONTACTS.BASE);
  };

  // Get contacts with pagination
  getContactsPage: ServiceMethod<ContactListParams> = params => {
    const { page = 1, pageSize = 10, status, type = 1 } = params || {};
    return apiClient.get(
      `${ENDPOINTS.CONTACTS.LIST}?${QUERY_PARAMS.PAGE}=${page}&${QUERY_PARAMS.PAGE_SIZE}=${pageSize}&${QUERY_PARAMS.STATUS}=${status}&type=${type}`
    );
  };

  // Export contacts to Excel
  exportContactsExcel: ServiceMethod<Record<string, unknown>> = (
    filters,
    config
  ) => {
    const queryString =
      buildUrlWithParams(ENDPOINTS.CONTACTS.EXPORT, filters).split("?")[1] ||
      "";
    return apiClient.get(`${ENDPOINTS.CONTACTS.EXPORT}?${queryString}`, {
      responseType: "blob",
      ...config,
    });
  };

  // Send contact message
  sendContacts: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.CONTACTS.BASE, data);
  };

  // Reply to contact
  repContacts: ServiceMethod<{ id: string | number; data: unknown }> =
    params => {
      const { id, data } = params || {};
      return apiClient.put(`${ENDPOINTS.CONTACTS.BASE}/${id}`, { reply: data });
    };

  // Send survey mail
  sendMail: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.CONTACTS.SURVEY, data);
  };

  // Send test survey mail
  sendMailTest: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.CONTACTS.SURVEY_TEST, data);
  };
}

// Export singleton instance
export const contactService = new ContactService();

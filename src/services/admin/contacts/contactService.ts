import { BaseService } from "../../base/baseService";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import type { Contact } from "@/types";
import type { PaginationParams } from "@/types/services/common";

// Contact service parameters
export interface ContactListParams extends PaginationParams {
  status?: string;
  type?: number;
}

/**
 * ContactService extending BaseService
 */
export class ContactService extends BaseService {
  constructor() {
    super(ENDPOINTS.CONTACTS.BASE);
  }

  /**
   * Get all contacts
   */
  async getContacts(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get contacts with pagination
   */
  async getContactsPage(params?: ContactListParams) {
    const { page = 1, pageSize = 10, status, type = 1 } = params || {};
    return this.list({
      [QUERY_PARAMS.PAGE]: page,
      [QUERY_PARAMS.PAGE_SIZE]: pageSize,
      [QUERY_PARAMS.STATUS]: status,
      type,
    });
  }

  /**
   * Get contact by ID
   */
  async getContact(id: string | number) {
    return this.getById<Contact>(id);
  }

  /**
   * Create new contact
   */
  async createContact(data: Partial<Contact>) {
    return this.create<Contact, Partial<Contact>>(data);
  }

  /**
   * Update contact
   */
  async updateContact(id: string | number, data: Partial<Contact>) {
    return this.update<Contact, Partial<Contact>>(id, data);
  }

  /**
   * Delete contact
   */
  async deleteContact(id: string | number) {
    return this.delete<void>(id);
  }

  /**
   * Reply to contact
   */
  async replyContact(id: string | number, reply: string) {
    return this.update(id, { reply });
  }

  /**
   * Send survey mail
   */
  async sendSurveyMail(data: unknown) {
    return this.post(ENDPOINTS.CONTACTS.SURVEY, data);
  }

  /**
   * Send test survey mail
   */
  async sendTestSurveyMail(data: unknown) {
    return this.post(ENDPOINTS.CONTACTS.SURVEY_TEST, data);
  }
}

// Export singleton instance
export const contactService = new ContactService();

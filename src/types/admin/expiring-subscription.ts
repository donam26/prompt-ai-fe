/**
 * Expiring subscription item interface
 */
export interface ExpiringSubscription {
  readonly userId: number;
  readonly userEmail: string;
  readonly userName: string;
  readonly subscriptionId: number;
  readonly subscriptionName: string;
  readonly subscriptionType: number;
  readonly subscriptionPrice: string;
  readonly userSubId: number;
  readonly status: number;
  readonly startDate: string;
  readonly endDate: string;
  readonly daysRemaining: number;
  readonly token: number;
}

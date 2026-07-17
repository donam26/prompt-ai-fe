// NOTE: these are subscription *type* values as stored by the backend
// (subscriptions.type), NOT plan ids. Keep them in sync with the DB catalog.
export const ESubscriptionType = {
  FREE: 1,
  PREMIUM: 2,
  TOKEN_PRO: 3,
  LEGACY: 4,
  PRO: 5,
  BUSINESS: 6,
  TRON_GOI: 7,
} as const;

export const SUBSCRIPTION_PLAN_IDS = {
  FREE: 1,
  LEGACY: 3,
  TOKEN_PRO: 4,
  PREMIUM_MONTHLY: 9,
  PRO_YEARLY: 10,
  BUSINESS_YEARLY: 11,
  PROM_AI_HUB: 12,
} as const;

export const VNPAY_SUBSCRIPTION_PLAN_IDS = [
  SUBSCRIPTION_PLAN_IDS.PROM_AI_HUB,
] as const;

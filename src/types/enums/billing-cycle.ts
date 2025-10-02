export enum BillingCycle {
  YEARLY = "yearly",
  MONTHLY = "monthly",
  LIFETIME = "lifetime",
}

export const BILLING_CYCLE_LABELS = {
  [BillingCycle.YEARLY]: "Năm",
  [BillingCycle.MONTHLY]: "Tháng",
  [BillingCycle.LIFETIME]: "Trọn đời",
} as const;

export const BILLING_CYCLE_OPTIONS = [
  {
    value: BillingCycle.YEARLY,
    label: BILLING_CYCLE_LABELS[BillingCycle.YEARLY],
  },
  {
    value: BillingCycle.MONTHLY,
    label: BILLING_CYCLE_LABELS[BillingCycle.MONTHLY],
  },
  {
    value: BillingCycle.LIFETIME,
    label: BILLING_CYCLE_LABELS[BillingCycle.LIFETIME],
  },
] as const;

export const formatBillingCycle = (billingCycle: string): string => {
  return BILLING_CYCLE_LABELS[billingCycle as BillingCycle] || "Không xác định";
};

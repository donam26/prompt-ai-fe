/**
 * Resolving the buyer's identity for checkout.
 *
 * The payment backend parses `vnp_OrderInfo` as "<userId>-<subscriptionId>" and
 * rejects anything else with HTTP 400 VALIDATION_ERROR. The checkout page used
 * to build that string with `user.id || "guest"`, so a session carrying `id: 0`
 * (what the Google-login fallback stores when the backend login call fails)
 * silently produced "guest-12" and made payment impossible.
 *
 * These helpers keep that resolution in one place and fail loudly instead.
 */

interface MaybeUser {
  id?: number | string | null;
}

const toPositiveInt = (value: unknown): number | null => {
  if (typeof value !== "number" && typeof value !== "string") return null;
  // Number("") is 0 and Number(" ") is 0, so reject blank strings up front.
  if (typeof value === "string" && value.trim() === "") return null;

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return null;

  return parsed;
};

/**
 * Resolve the buyer's user id, preferring the auth store over the legacy
 * `localStorage["user"]` mirror (which is only written at login time and can
 * therefore go stale).
 *
 * @returns the user id, or null when no trustworthy id is available.
 */
export const resolveCheckoutUserId = (
  storeUser: MaybeUser | null | undefined,
  persistedUser: string | null | undefined
): number | null => {
  const fromStore = toPositiveInt(storeUser?.id);
  if (fromStore !== null) return fromStore;

  if (!persistedUser) return null;

  try {
    const parsed = JSON.parse(persistedUser) as MaybeUser | null;
    return toPositiveInt(parsed?.id);
  } catch {
    return null;
  }
};

/**
 * Build the `orderInfo` string the payment backend expects.
 *
 * @throws when either id is missing or non-numeric, so a malformed order can
 * never reach VNPay.
 */
export const buildOrderInfo = (
  userId: number | null | undefined,
  planId: string | number | null | undefined
): string => {
  const validUserId = toPositiveInt(userId);
  if (validUserId === null) {
    throw new Error("Không xác định được tài khoản để thanh toán");
  }

  const validPlanId = toPositiveInt(planId);
  if (validPlanId === null) {
    throw new Error("Không xác định được gói đăng ký để thanh toán");
  }

  return `${validUserId}-${validPlanId}`;
};

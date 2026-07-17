/**
 * Single source of truth for "is this user a paying/premium user?".
 *
 * Historically this was decided ad-hoc in ~7 components with the fragile check
 *   `userSub?.subscription?.nameSub === "Free" || !userSub?.subscription?.nameSub`
 * which (a) mis-classified any user whose `userSub` snapshot was missing/stale as
 * Free, and (b) broke whenever a plan was renamed. This module derives access from
 * the subscription STATE (active + not expired + not the Free plan) instead.
 */
import { ESubscriptionType } from "@/constants/subscription-core";
import type { User, UserSubscription } from "@/types/entities/user";

const FREE_TYPE: number = ESubscriptionType.FREE; // 1

const USER_SUB_STATUS_ACTIVE = 1;

/**
 * A subscription grants paid access when it is active, not expired, and is not
 * the Free plan. We key on `type` (stable) and only fall back to the plan name
 * when the type field is absent from the payload.
 */
export function isActivePaidSubscription(
  userSub: UserSubscription | null | undefined
): boolean {
  if (!userSub) return false;

  // status: 1 = active, 0/2 = inactive/expired.
  if (Number(userSub.status) !== USER_SUB_STATUS_ACTIVE) return false;

  // If an end date is present and valid, it must be in the future.
  if (userSub.endDate) {
    const end = new Date(userSub.endDate).getTime();
    if (!Number.isNaN(end) && end < Date.now()) return false;
  }

  const subscription = userSub.subscription ?? userSub.Subscription;
  const type = subscription?.type;

  if (type != null) {
    return Number(type) !== FREE_TYPE;
  }

  // Fallback: plan type missing from the payload — use the plan name.
  const name = subscription?.nameSub;
  return !!name && name !== "Free";
}

/**
 * Convenience wrapper over a User object. Returns false for logged-out users and
 * for users whose subscription snapshot has not been hydrated yet.
 */
export function isPremiumUser(user: User | null | undefined): boolean {
  return isActivePaidSubscription(user?.userSub);
}

/**
 * Inverse of {@link isPremiumUser}. Kept as a named export so the many call sites
 * that previously computed `isFreeUser` read naturally.
 */
export function isFreeUser(user: User | null | undefined): boolean {
  return !isPremiumUser(user);
}

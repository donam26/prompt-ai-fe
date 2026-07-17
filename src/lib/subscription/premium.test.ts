import { describe, it, expect } from "vitest";
import {
  isActivePaidSubscription,
  isPremiumUser,
} from "@/lib/subscription/premium";
import type { User, UserSubscription } from "@/types/entities/user";

// Far future / past relative to "now" for deterministic tests.
const FUTURE = "2099-03-17T08:17:59.000Z";
const PAST = "2000-01-01T00:00:00.000Z";

interface SubOpts {
  status?: number;
  endDate?: string;
  type?: number;
  nameSub?: string;
}

// Uses `key in opts` so an explicitly-passed `undefined` (e.g. missing type)
// is preserved instead of falling back to the default.
const makeUserSub = (opts: SubOpts = {}): UserSubscription => {
  const status = "status" in opts ? opts.status : 1;
  const endDate = "endDate" in opts ? opts.endDate : FUTURE;
  const type = "type" in opts ? opts.type : 4;
  const nameSub = "nameSub" in opts ? opts.nameSub : "LEGACY";

  return {
    id: 201,
    userId: 11,
    subId: 3,
    status,
    startDate: "2025-05-07T06:42:49.000Z",
    endDate,
    token: 1,
    createdAt: "2025-05-07T06:42:49.000Z",
    updatedAt: "2025-05-07T06:42:49.000Z",
    subscription: {
      id: 3,
      name: nameSub,
      nameSub,
      type,
      duration: 30,
      price: "199000.00",
      billingCycle: "monthly",
    },
  } as unknown as UserSubscription;
};

describe("isActivePaidSubscription", () => {
  it("treats an ACTIVE, non-expired LEGACY (type=4) sub as paid (the reported bug)", () => {
    // Before the fix, the gate keyed on nameSub === 'Free' and, when userSub was
    // dropped/stale, walled this exact user. A LEGACY holder is a paying user.
    expect(isActivePaidSubscription(makeUserSub())).toBe(true);
  });

  it("treats an active PREMIUM (type=2) sub as paid", () => {
    expect(
      isActivePaidSubscription(makeUserSub({ type: 2, nameSub: "PREMIUM" }))
    ).toBe(true);
  });

  it("treats an active Trọn Gói (type=7) sub as paid", () => {
    expect(
      isActivePaidSubscription(makeUserSub({ type: 7, nameSub: "Trọn Gói" }))
    ).toBe(true);
  });

  it("treats the Free plan (type=1) as NOT paid even when active", () => {
    expect(
      isActivePaidSubscription(makeUserSub({ type: 1, nameSub: "Free" }))
    ).toBe(false);
  });

  it("treats an inactive sub (status=0) as NOT paid", () => {
    expect(isActivePaidSubscription(makeUserSub({ status: 0 }))).toBe(false);
  });

  it("treats an inactive sub (status=2) as NOT paid", () => {
    expect(isActivePaidSubscription(makeUserSub({ status: 2 }))).toBe(false);
  });

  it("treats an expired sub (endDate in the past) as NOT paid", () => {
    expect(isActivePaidSubscription(makeUserSub({ endDate: PAST }))).toBe(
      false
    );
  });

  it("returns false for null/undefined userSub (dropped/stale snapshot)", () => {
    expect(isActivePaidSubscription(null)).toBe(false);
    expect(isActivePaidSubscription(undefined)).toBe(false);
  });

  it("falls back to nameSub when subscription.type is missing", () => {
    expect(
      isActivePaidSubscription(
        makeUserSub({ type: undefined, nameSub: "LEGACY" })
      )
    ).toBe(true);
    expect(
      isActivePaidSubscription(
        makeUserSub({ type: undefined, nameSub: "Free" })
      )
    ).toBe(false);
    expect(
      isActivePaidSubscription(makeUserSub({ type: undefined, nameSub: "" }))
    ).toBe(false);
  });

  it("tolerates a missing endDate (lifetime-style) when active", () => {
    expect(isActivePaidSubscription(makeUserSub({ endDate: undefined }))).toBe(
      true
    );
  });
});

describe("isPremiumUser", () => {
  it("returns false for a null user", () => {
    expect(isPremiumUser(null)).toBe(false);
  });

  it("returns false when the user has no userSub (stale/dropped store snapshot)", () => {
    expect(isPremiumUser({ id: 11 } as User)).toBe(false);
  });

  it("returns true for a user holding an active LEGACY sub", () => {
    expect(isPremiumUser({ id: 11, userSub: makeUserSub() } as User)).toBe(
      true
    );
  });
});

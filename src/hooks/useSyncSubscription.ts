"use client";

import { useCallback, useEffect, useRef } from "react";
import { userService } from "@/services";
import { useAuth } from "@/hooks/useAuth";

/**
 * Keeps the auth store's `userSub` in sync with the server.
 *
 * The premium gates read `userSub` from the persisted auth store, which is only
 * written at login. Without this hook the snapshot goes stale the moment a user
 * upgrades (they keep seeing the paywall until they log out and back in). This
 * hydrates `userSub` from `/users/me`:
 *   - once whenever a logged-in user id becomes available (app load / login), and
 *   - on demand via the returned `refresh()` (called on the payment-success page).
 */
export const useSyncSubscription = () => {
  const { user, token, updateUser } = useAuth();
  const inFlight = useRef(false);
  const syncedForUserId = useRef<number | null>(null);

  const refresh = useCallback(async () => {
    if (!token || !user?.id || inFlight.current) return;
    inFlight.current = true;
    try {
      const res = await userService.getUserInfo(); // GET /users/me -> { data: User }
      const fresh = res?.data;
      if (fresh) {
        updateUser({
          userSub: fresh.userSub,
          permissions: fresh.permissions,
          role: fresh.role,
          roleId: fresh.roleId,
        });
      }
    } catch {
      // Best-effort: keep the existing snapshot if the refresh fails.
    } finally {
      inFlight.current = false;
    }
  }, [token, user?.id, updateUser]);

  useEffect(() => {
    if (token && user?.id && syncedForUserId.current !== user.id) {
      syncedForUserId.current = user.id;
      void refresh();
    }
    if (!token || !user?.id) {
      syncedForUserId.current = null;
    }
  }, [token, user?.id, refresh]);

  return { refresh };
};

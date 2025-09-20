import { useCallback, useRef, useLayoutEffect, useState } from "react";
import { STORAGE_KEYS } from "@/constants/session";
import {
  parseStorageValue,
  isEqual,
  type StorageUserData,
  type StorageRolesData,
} from "@/utils/sessionManager";

interface UseStorageSyncProps {
  onUserChange: (newUser: unknown, oldUser?: unknown) => void;
  onRolesChange: (newRoles: unknown[], oldRoles?: unknown[]) => void;
  enabled?: boolean;
}

export const useStorageSync = ({
  onUserChange,
  onRolesChange,
  enabled = true,
}: UseStorageSyncProps) => {
  const [hasHydrated, setHasHydrated] = useState(false);

  // Store callbacks in refs để tránh re-renders
  const onUserChangeRef = useRef(onUserChange);
  const onRolesChangeRef = useRef(onRolesChange);

  // Update refs when callbacks change
  useLayoutEffect(() => {
    onUserChangeRef.current = onUserChange;
  }, [onUserChange]);

  useLayoutEffect(() => {
    onRolesChangeRef.current = onRolesChange;
  }, [onRolesChange]);

  // Handle user storage changes
  const handleUserStorageChange = useCallback((event: StorageEvent) => {
    if (event.key !== STORAGE_KEYS.USER) return;

    // Logout scenario: newValue is null
    if (event.newValue === null) {
      const oldUser = parseStorageValue<StorageUserData>(event.oldValue, {
        state: { user: null },
      });
      onUserChangeRef.current?.(null, oldUser.state?.user);
      return;
    }

    // Login scenario: newValue exists
    if (!event.newValue) return;

    const newUser = parseStorageValue<StorageUserData>(event.newValue, {
      state: { user: null },
    });
    const oldUser = parseStorageValue<StorageUserData>(event.oldValue, {
      state: { user: null },
    });

    if (newUser.state.user !== oldUser.state?.user) {
      onUserChangeRef.current?.(newUser.state.user, oldUser.state?.user);
    }
  }, []);

  // Handle roles storage changes
  const handleRolesStorageChange = useCallback((event: StorageEvent) => {
    if (event.key !== STORAGE_KEYS.ROLES) return;

    // Logout scenario: newValue is null
    if (event.newValue === null) {
      const oldRoles = parseStorageValue<StorageRolesData>(event.oldValue, {
        state: { roles: [] },
      });
      onRolesChangeRef.current?.([], oldRoles.state?.roles || []);
      return;
    }

    if (!event.newValue) return;

    const newRoles = parseStorageValue<StorageRolesData>(event.newValue, {
      state: { roles: [] },
    });
    const oldRoles = parseStorageValue<StorageRolesData>(event.oldValue, {
      state: { roles: [] },
    });

    if (!isEqual(newRoles.state.roles, oldRoles.state?.roles)) {
      onRolesChangeRef.current?.(
        newRoles.state.roles,
        oldRoles.state?.roles || []
      );
    }
  }, []);

  // Main storage change handler
  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (!enabled) return;

      switch (event.key) {
        case STORAGE_KEYS.USER:
          handleUserStorageChange(event);
          break;
        case STORAGE_KEYS.ROLES:
          handleRolesStorageChange(event);
          break;
      }
    },
    [enabled, handleUserStorageChange, handleRolesStorageChange]
  );

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    setHasHydrated(true);
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [handleStorageChange]);

  return {
    handleStorageChange,
    hasHydrated,
  };
};

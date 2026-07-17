import { describe, it, expect } from "vitest";
import {
  transformBackendUserToAuth,
  transformUserForSession,
} from "@/utils/user-transform";

const backendResponse = {
  user: {
    id: 11,
    fullName: "meomeo",
    email: "quocdat.asean@gmail.com",
    role: 2,
    permissions: ["a"],
    countPrompt: 99948,
    userSub: {
      id: 201,
      status: 1,
      endDate: "2099-03-17T08:17:59.000Z",
      subscription: { id: 3, nameSub: "LEGACY", type: 4, price: "199000.00" },
    },
  },
  token: "jwt-token",
};

describe("transformUserForSession", () => {
  it("preserves userSub so premium gating survives the NextAuth session path", () => {
    const transformed = transformBackendUserToAuth(backendResponse as never);
    const session = transformUserForSession(transformed);

    // Regression guard: this field used to be dropped, which walled premium
    // users who logged in via the session path.
    expect(session.userSub).toBeTruthy();
    expect(session.userSub?.subscription?.type).toBe(4);
    expect(session.permissions).toEqual(["a"]);
  });
});

import { describe, it, expect } from "vitest";
import { resolveCheckoutUserId, buildOrderInfo } from "./checkout-user";

describe("resolveCheckoutUserId", () => {
  it("uses the id from the auth store when it is valid", () => {
    expect(resolveCheckoutUserId({ id: 15178 }, null)).toBe(15178);
  });

  it("falls back to the persisted user when the store is empty", () => {
    expect(resolveCheckoutUserId(null, '{"id":14460}')).toBe(14460);
  });

  it("prefers the auth store over a stale persisted user", () => {
    expect(resolveCheckoutUserId({ id: 15178 }, '{"id":0}')).toBe(15178);
  });

  it("accepts a numeric id sent as a string", () => {
    expect(resolveCheckoutUserId({ id: "15178" }, null)).toBe(15178);
  });

  // This is the production bug: the Google-login fallback stores id: 0, and the
  // old checkout code turned that into the literal string "guest".
  it("returns null for the degraded id: 0 session", () => {
    expect(resolveCheckoutUserId({ id: 0 }, '{"id":0}')).toBeNull();
  });

  it("returns null when no user is available at all", () => {
    expect(resolveCheckoutUserId(null, null)).toBeNull();
  });

  it("returns null when the persisted user is not valid JSON", () => {
    expect(resolveCheckoutUserId(null, "not-json")).toBeNull();
  });

  it("returns null for a non-numeric id", () => {
    expect(resolveCheckoutUserId({ id: "guest" }, null)).toBeNull();
  });

  it("returns null for a negative id", () => {
    expect(resolveCheckoutUserId({ id: -3 }, null)).toBeNull();
  });
});

describe("buildOrderInfo", () => {
  it("builds the userId-subscriptionId format the backend parses", () => {
    expect(buildOrderInfo(15178, "9")).toBe("15178-9");
  });

  // The backend rejects anything non-numeric with HTTP 400
  // {"code":"VALIDATION_ERROR","message":"Invalid user_id or subscription_id"}
  it("refuses to build order info without a valid user id", () => {
    expect(() => buildOrderInfo(null, "9")).toThrow();
  });

  it("refuses to build order info without a valid plan id", () => {
    expect(() => buildOrderInfo(15178, "")).toThrow();
    expect(() => buildOrderInfo(15178, "abc")).toThrow();
  });
});

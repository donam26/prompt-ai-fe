/**
 * Utility functions for cleaning up authentication data
 */

const clearCookie = (name: string, path: string = "/", domain?: string) => {
  const domainOptions = domain ? [domain, `.${domain}`] : [undefined];

  domainOptions.forEach(dom => {
    const cookieString = dom
      ? `${name}=; path=${path}; domain=${dom}; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      : `${name}=; path=${path}; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    document.cookie = cookieString;
  });
};

export const clearAllAuthData = () => {
  if (typeof window === "undefined") return;

  // Clear localStorage
  localStorage.removeItem("auth-storage");

  // Clear all NextAuth localStorage keys
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith("nextauth.")) {
      localStorage.removeItem(key);
    }
  });

  // Clear all authentication cookies
  const cookiesToClear = [
    "accessToken",
    "refreshToken",
    "next-auth.access-token",
    "next-auth.refresh-token",
    "next-auth.session-token",
    "next-auth.csrf-token",
    "next-auth.callback-url",
    "next-auth.state",
    "next-auth.pkce.code_verifier",
  ];

  // Clear cookies with different path and domain combinations
  const paths = ["/", "/api", "/api/auth"];
  const domains = [
    window.location.hostname,
    `.${window.location.hostname}`,
    "localhost",
    ".localhost",
  ];

  cookiesToClear.forEach(cookieName => {
    // Clear with all path and domain combinations
    paths.forEach(path => {
      domains.forEach(domain => {
        clearCookie(cookieName, path, domain);
      });
      // Also clear without domain
      clearCookie(cookieName, path);
    });
  });
};

export const forceClearAllCookies = () => {
  if (typeof window === "undefined") return;

  // Get all cookies and clear them
  const cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

    if (name) {
      // Clear with all possible combinations
      const paths = ["/", "/api", "/api/auth", ""];
      const domains = [
        window.location.hostname,
        `.${window.location.hostname}`,
        "localhost",
        ".localhost",
        "",
      ];

      paths.forEach(path => {
        domains.forEach(domain => {
          if (domain) {
            clearCookie(name, path, domain);
          } else {
            clearCookie(name, path);
          }
        });
      });
    }
  });
};

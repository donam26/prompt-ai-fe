/**
 * Extension Integration Test Component
 * Adapted for NextJS with TailwindCSS and Shadcn UI
 */

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  getAndSendTokenToExtension,
  setupExtensionListener,
  checkExtensionAvailability,
} from "@/utils/extensionHelper";

interface TestResult {
  message: string;
  type: "success" | "error" | "info" | "warning";
  timestamp: string;
}

const ExtensionTest = (): React.JSX.Element => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isExtensionListenerSetup, setIsExtensionListenerSetup] =
    useState(false);

  const addTestResult = React.useCallback(
    (message: string, type: TestResult["type"] = "info"): void => {
      setTestResults(prev => [
        ...prev,
        {
          message,
          type,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    },
    []
  );

  useEffect(() => {
    // Setup extension listener on component mount
    if (!isExtensionListenerSetup) {
      setupExtensionListener();
      setIsExtensionListenerSetup(true);
      addTestResult("🔧 Extension listener setup complete", "info");
    }
  }, [isExtensionListenerSetup, addTestResult]);

  const testTokenInLocalStorage = React.useCallback((): void => {
    if (typeof window === "undefined") {
      addTestResult("❌ Window object not available (SSR)", "error");
      return;
    }

    const tokenKeys = ["token", "authToken", "accessToken", "auth-storage"];
    let tokenFound = false;

    for (const key of tokenKeys) {
      const token = localStorage.getItem(key);
      if (token) {
        try {
          const parsed = JSON.parse(token);
          const actualToken = parsed.token || parsed.accessToken || token;
          addTestResult(
            `✅ Token found in localStorage (${key}): ${actualToken.substring(0, 20)}...`,
            "success"
          );
          tokenFound = true;
          break;
        } catch {
          addTestResult(
            `✅ Token found in localStorage (${key}): ${token.substring(0, 20)}...`,
            "success"
          );
          tokenFound = true;
          break;
        }
      }
    }

    if (!tokenFound) {
      addTestResult("❌ No token found in localStorage", "error");
    }
  }, [addTestResult]);

  const testSendTokenToExtension = React.useCallback((): void => {
    if (typeof window === "undefined") {
      addTestResult("❌ Window object not available (SSR)", "error");
      return;
    }

    const tokenKeys = ["token", "authToken", "accessToken", "auth-storage"];
    let token: string | null = null;

    for (const key of tokenKeys) {
      const storedToken = localStorage.getItem(key);
      if (storedToken) {
        try {
          const parsed = JSON.parse(storedToken);
          token = parsed.token || parsed.accessToken || storedToken;
        } catch {
          token = storedToken;
        }
        break;
      }
    }

    if (token) {
      // ✅ Get user info and send with correct format
      const userInfoStr =
        localStorage.getItem("user_info") || localStorage.getItem("userInfo");
      let userInfo;

      if (userInfoStr) {
        try {
          userInfo = JSON.parse(userInfoStr);
        } catch {
          userInfo = { id: "user_1", name: "Test User" };
        }
      } else {
        userInfo = { id: "user_1", name: "Test User" };
      }

      // Send with correct message format
      window.postMessage(
        {
          type: "TOKEN_FROM_WEB", // ✅ Correct type
          token,
          userInfo, // ✅ Include userInfo
        },
        "*"
      );

      addTestResult(
        "📤 Token sent to extension with correct format",
        "success"
      );
    } else {
      addTestResult(
        "❌ Cannot send token - not found in localStorage",
        "error"
      );
    }
  }, [addTestResult]);

  const testGetAndSendToken = React.useCallback((): void => {
    const result = getAndSendTokenToExtension();
    if (result) {
      addTestResult(
        "✅ getAndSendTokenToExtension executed successfully",
        "success"
      );
    } else {
      addTestResult("❌ getAndSendTokenToExtension failed - no token", "error");
    }
  }, [addTestResult]);

  const testExtensionRequest = React.useCallback((): void => {
    if (typeof window === "undefined") {
      addTestResult("❌ Window object not available (SSR)", "error");
      return;
    }

    // Simulate extension request
    window.postMessage({ type: "GET_TOKEN_FROM_WEB" }, "*");
    addTestResult("📨 Simulated extension request sent", "info");
  }, [addTestResult]);

  const testExtensionAvailability = React.useCallback((): void => {
    const result = checkExtensionAvailability();
    if (result) {
      addTestResult("🔍 Extension availability check sent", "info");
    } else {
      addTestResult("❌ Extension availability check failed", "error");
    }
  }, [addTestResult]);

  const clearResults = React.useCallback((): void => {
    setTestResults([]);
  }, []);

  const getBadgeVariant = React.useCallback(
    (
      type: TestResult["type"]
    ): "default" | "destructive" | "secondary" | "outline" => {
      switch (type) {
        case "success":
          return "default";
        case "error":
          return "destructive";
        case "warning":
          return "secondary";
        default:
          return "outline";
      }
    },
    []
  );

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔧 Extension Integration Test
        </CardTitle>
        <CardDescription>
          Test and debug communication between web application and browser
          extension
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Test Functions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Test Functions:</h3>
          <div className="flex flex-wrap gap-2">
            <Button onClick={testTokenInLocalStorage} variant="default">
              Check Token in localStorage
            </Button>
            <Button onClick={testSendTokenToExtension} variant="default">
              Send Token to Extension
            </Button>
            <Button onClick={testGetAndSendToken} variant="default">
              Test getAndSendTokenToExtension
            </Button>
            <Button onClick={testExtensionRequest} variant="default">
              Simulate Extension Request
            </Button>
            <Button onClick={testExtensionAvailability} variant="default">
              Check Extension Availability
            </Button>
            <Button onClick={clearResults} variant="outline">
              Clear Results
            </Button>
          </div>
        </div>

        <Separator />

        {/* Test Results */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Test Results:</h3>
          <ScrollArea className="p-4 border rounded-md w-full h-64">
            {testResults.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No test results yet. Run a test to see results.
              </p>
            ) : (
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge
                      variant={getBadgeVariant(result.type)}
                      className="mt-0.5"
                    >
                      {result.type}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="text-muted-foreground">
                          [{result.timestamp}]
                        </span>{" "}
                        {result.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        <Separator />

        {/* Manual Test Instructions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Manual Test:</h3>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Open browser console and run:
            </p>
            <code className="block bg-muted p-2 rounded text-sm">
              window.postMessage({`{`} type: &quot;GET_TOKEN_FROM_WEB&quot;{" "}
              {`}`}, &quot;*&quot;)
            </code>
            <p className="mt-2 text-muted-foreground text-xs">
              Extension will receive: {`{`} type: &quot;TOKEN_FROM_WEB&quot;,
              token: &quot;...&quot;, userInfo: {`{...}`} {`}`}
            </p>
          </div>
        </div>

        {/* Extension Integration Info */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Integration Info:</h3>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Supported Token Keys:</h4>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>token</li>
                <li>authToken</li>
                <li>accessToken</li>
                <li>auth-storage</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Message Types:</h4>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>TOKEN_FROM_WEB (sent to extension)</li>
                <li>GET_TOKEN_FROM_WEB (request from extension)</li>
                <li>TOKEN_NOT_FOUND (error response)</li>
                <li>PING_EXTENSION (availability check)</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtensionTest;

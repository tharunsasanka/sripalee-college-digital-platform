"use client";

import { useEffect } from "react";

export function PwaShell() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if (
      !("serviceWorker" in navigator) ||
      !window.isSecureContext
    ) {
      return;
    }

    let cancelled = false;

    navigator.serviceWorker
      .register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      })
      .then(async (registration) => {
        if (!cancelled) {
          await registration.update();
        }
      })
      .catch((error: unknown) => {
        console.error(
          "Service worker registration failed:",
          error,
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
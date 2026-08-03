"use client";

import { useEffect, useState } from "react";
import {
  Download,
  RefreshCw,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";

type InstallChoice = {
  outcome: "accepted" | "dismissed";
  platform: string;
};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<InstallChoice>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export function PwaShell() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
      setMessage("Internet connection restored.");
    }

    function handleOffline() {
      setIsOnline(false);
      setMessage("");
    }

    function handleInstallPrompt(event: BeforeInstallPromptEvent) {
      event.preventDefault();
      setInstallPrompt(event);
      setDismissed(false);
    }

    function handleAppInstalled() {
      setInstallPrompt(null);
      setIsInstalled(true);
      setDismissed(true);
      setMessage("Sripalee College was installed successfully.");
    }

    function handleControllerChange() {
      window.location.reload();
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener(
      "beforeinstallprompt",
      handleInstallPrompt,
    );
    window.addEventListener("appinstalled", handleAppInstalled);

    if (
      "serviceWorker" in navigator &&
      window.isSecureContext
    ) {
      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        })
        .then((registration) => {
          void registration.update();

          registration.addEventListener("updatefound", () => {
            const installingWorker = registration.installing;

            if (!installingWorker) {
              return;
            }

            installingWorker.addEventListener("statechange", () => {
              if (
                installingWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                setUpdateAvailable(true);
                setDismissed(false);
              }
            });
          });
        })
        .catch(() => {
          setMessage(
            "Offline support could not be activated in this browser.",
          );
        });

      navigator.serviceWorker.addEventListener(
        "controllerchange",
        handleControllerChange,
      );
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener(
        "beforeinstallprompt",
        handleInstallPrompt,
      );
      window.removeEventListener(
        "appinstalled",
        handleAppInstalled,
      );

      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.removeEventListener(
          "controllerchange",
          handleControllerChange,
        );
      }
    };
  }, []);

  async function installApplication() {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();

    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setMessage("Application installation started.");
    } else {
      setMessage("Application installation was cancelled.");
    }

    setInstallPrompt(null);
    setDismissed(true);
  }

  async function applyUpdate() {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const registration =
      await navigator.serviceWorker.getRegistration();

    if (registration?.waiting) {
      registration.waiting.postMessage({
        type: "SKIP_WAITING",
      });

      setUpdateAvailable(false);
      setMessage("Updating the application.");
      return;
    }

    await registration?.update();
    setMessage("Application update check completed.");
  }

  const showActionCard =
    !dismissed &&
    (updateAvailable || (!isInstalled && installPrompt !== null));

  return (
    <>
      {!isOnline && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-5 z-[90] flex max-w-sm items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-amber-900 shadow-2xl"
        >
          <WifiOff className="mt-0.5 shrink-0" size={21} />

          <div>
            <p className="font-semibold">You are offline</p>

            <p className="mt-1 text-sm leading-6">
              Previously visited public pages may remain available.
            </p>
          </div>
        </div>
      )}

      {showActionCard && (
        <div className="fixed bottom-5 right-5 z-[90] w-[calc(100%-2.5rem)] max-w-sm rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-2xl">
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="focus-ring absolute right-3 top-3 rounded-full p-2 text-black/45 transition hover:bg-black/5"
            aria-label="Dismiss application message"
          >
            <X size={18} />
          </button>

          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
            {updateAvailable ? (
              <RefreshCw size={22} />
            ) : (
              <Download size={22} />
            )}
          </div>

          <h2 className="mt-5 text-xl font-semibold text-[#4e111b]">
            {updateAvailable
              ? "Platform update available"
              : "Install Sripalee College"}
          </h2>

          <p className="mt-3 pr-4 text-sm leading-6 text-black/60">
            {updateAvailable
              ? "Load the newest approved version of the digital platform."
              : "Add the school platform to this device for easier access and limited offline use."}
          </p>

          <button
            type="button"
            onClick={
              updateAvailable ? applyUpdate : installApplication
            }
            className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#741f2b] px-5 py-3 font-semibold text-white"
          >
            {updateAvailable ? (
              <>
                Update now
                <RefreshCw size={18} />
              </>
            ) : (
              <>
                Install application
                <Download size={18} />
              </>
            )}
          </button>
        </div>
      )}

      {message && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-24 z-[95] flex max-w-sm items-start gap-3 rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#4e111b] shadow-2xl"
        >
          {isOnline ? (
            <Wifi className="mt-0.5 shrink-0 text-emerald-700" size={20} />
          ) : (
            <WifiOff className="mt-0.5 shrink-0 text-amber-700" size={20} />
          )}

          <p className="pr-5 text-sm font-semibold leading-6">
            {message}
          </p>

          <button
            type="button"
            onClick={() => setMessage("")}
            className="focus-ring absolute right-2 top-2 rounded-full p-1.5 text-black/40"
            aria-label="Close status message"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
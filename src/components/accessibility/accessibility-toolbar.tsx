"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ALargeSmall,
  Contrast,
  Link2,
  Minus,
  Move,
  Plus,
  RotateCcw,
  Type,
  X,
} from "lucide-react";

type TextScale = "normal" | "large" | "larger";

type AccessibilitySettings = {
  textScale: TextScale;
  highContrast: boolean;
  underlineLinks: boolean;
  reducedMotion: boolean;
  readableFont: boolean;
};

const STORAGE_KEY = "sripalee-accessibility-preferences";

const defaultSettings: AccessibilitySettings = {
  textScale: "normal",
  highContrast: false,
  underlineLinks: false,
  reducedMotion: false,
  readableFont: false,
};

const textScaleLabels: Record<TextScale, string> = {
  normal: "Standard",
  large: "Large",
  larger: "Extra large",
};

let currentSettings: AccessibilitySettings = defaultSettings;
let settingsLoaded = false;

const listeners = new Set<() => void>();

function isAccessibilitySettings(
  value: unknown,
): value is AccessibilitySettings {
  if (!value || typeof value !== "object") {
    return false;
  }

  const settings = value as Partial<AccessibilitySettings>;

  return (
    (settings.textScale === "normal" ||
      settings.textScale === "large" ||
      settings.textScale === "larger") &&
    typeof settings.highContrast === "boolean" &&
    typeof settings.underlineLinks === "boolean" &&
    typeof settings.reducedMotion === "boolean" &&
    typeof settings.readableFont === "boolean"
  );
}

function loadStoredSettings() {
  if (settingsLoaded || typeof window === "undefined") {
    return;
  }

  settingsLoaded = true;

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return;
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (isAccessibilitySettings(parsedValue)) {
      currentSettings = parsedValue;
    }
  } catch {
    currentSettings = defaultSettings;
  }
}

function getSettingsSnapshot() {
  loadStoredSettings();
  return currentSettings;
}

function getServerSettingsSnapshot() {
  return defaultSettings;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function subscribeToSettings(listener: () => void) {
  listeners.add(listener);

  function handleStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY) {
      return;
    }

    if (!event.newValue) {
      currentSettings = defaultSettings;
      notifyListeners();
      return;
    }

    try {
      const parsedValue: unknown = JSON.parse(event.newValue);

      currentSettings = isAccessibilitySettings(parsedValue)
        ? parsedValue
        : defaultSettings;
    } catch {
      currentSettings = defaultSettings;
    }

    notifyListeners();
  }

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(listener);

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function saveSettings(settings: AccessibilitySettings) {
  currentSettings = settings;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(settings),
      );
    } catch {
      currentSettings = settings;
    }
  }

  notifyListeners();
}

export function AccessibilityToolbar() {
  const settings = useSyncExternalStore(
    subscribeToSettings,
    getSettingsSnapshot,
    getServerSettingsSnapshot,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.accessibilityText = settings.textScale;
    root.dataset.accessibilityContrast = String(
      settings.highContrast,
    );
    root.dataset.accessibilityLinks = String(
      settings.underlineLinks,
    );
    root.dataset.accessibilityMotion = String(
      settings.reducedMotion,
    );
    root.dataset.accessibilityFont = String(
      settings.readableFont,
    );
  }, [settings]);

  function updateSetting<K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
    message: string,
  ) {
    saveSettings({
      ...settings,
      [key]: value,
    });

    setStatusMessage(message);
  }

  function increaseTextSize() {
    const nextScale: TextScale =
      settings.textScale === "normal"
        ? "large"
        : settings.textScale === "large"
          ? "larger"
          : "larger";

    updateSetting(
      "textScale",
      nextScale,
      `Text size changed to ${textScaleLabels[nextScale]}.`,
    );
  }

  function decreaseTextSize() {
    const nextScale: TextScale =
      settings.textScale === "larger"
        ? "large"
        : settings.textScale === "large"
          ? "normal"
          : "normal";

    updateSetting(
      "textScale",
      nextScale,
      `Text size changed to ${textScaleLabels[nextScale]}.`,
    );
  }

  function resetSettings() {
    saveSettings(defaultSettings);
    setStatusMessage("Accessibility preferences were reset.");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="accessibility-preferences-panel"
        aria-label={
          isOpen
            ? "Close accessibility preferences"
            : "Open accessibility preferences"
        }
        className="focus-ring fixed bottom-20 left-4 z-[80] grid h-14 w-14 place-items-center rounded-full border-2 border-white bg-[#741f2b] text-white shadow-2xl transition hover:scale-105"
      >
        {isOpen ? <X size={24} /> : <Accessibility size={25} />}
      </button>

      {isOpen && (
        <section
          id="accessibility-preferences-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="accessibility-panel-title"
          className="fixed bottom-36 left-4 z-[80] max-h-[calc(100vh-11rem)] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-[1.75rem] border border-black/10 bg-white p-5 text-[#4e111b] shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#741f2b]">
                Reading preferences
              </p>

              <h2
                id="accessibility-panel-title"
                className="mt-2 text-xl font-semibold"
              >
                Accessibility tools
              </h2>
            </div>

            <Accessibility
              className="text-[#741f2b]"
              size={25}
            />
          </div>

          <div className="mt-6 rounded-2xl bg-[#faf7ef] p-4">
            <div className="flex items-center gap-3">
              <ALargeSmall
                className="text-[#741f2b]"
                size={21}
              />

              <div>
                <p className="font-semibold">Text size</p>

                <p className="mt-1 text-sm text-black/55">
                  Current: {textScaleLabels[settings.textScale]}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={decreaseTextSize}
                disabled={settings.textScale === "normal"}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-[#741f2b]/20 px-4 py-3 text-sm font-semibold text-[#741f2b] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus size={17} />
                Smaller
              </button>

              <button
                type="button"
                onClick={increaseTextSize}
                disabled={settings.textScale === "larger"}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-[#741f2b] px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={17} />
                Larger
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <PreferenceToggle
              title="Higher contrast"
              description="Increase visual contrast across the main content."
              icon={Contrast}
              active={settings.highContrast}
              onChange={() =>
                updateSetting(
                  "highContrast",
                  !settings.highContrast,
                  settings.highContrast
                    ? "Higher contrast was disabled."
                    : "Higher contrast was enabled.",
                )
              }
            />

            <PreferenceToggle
              title="Underline links"
              description="Make text links easier to identify."
              icon={Link2}
              active={settings.underlineLinks}
              onChange={() =>
                updateSetting(
                  "underlineLinks",
                  !settings.underlineLinks,
                  settings.underlineLinks
                    ? "Link underlining was disabled."
                    : "Link underlining was enabled.",
                )
              }
            />

            <PreferenceToggle
              title="Reduce movement"
              description="Minimise animations and transitions."
              icon={Move}
              active={settings.reducedMotion}
              onChange={() =>
                updateSetting(
                  "reducedMotion",
                  !settings.reducedMotion,
                  settings.reducedMotion
                    ? "Reduced movement was disabled."
                    : "Reduced movement was enabled.",
                )
              }
            />

            <PreferenceToggle
              title="Readable font"
              description="Use a simple system font with wider spacing."
              icon={Type}
              active={settings.readableFont}
              onChange={() =>
                updateSetting(
                  "readableFont",
                  !settings.readableFont,
                  settings.readableFont
                    ? "Readable font mode was disabled."
                    : "Readable font mode was enabled.",
                )
              }
            />
          </div>

          <button
            type="button"
            onClick={resetSettings}
            className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#741f2b]/25 px-5 py-3 font-semibold text-[#741f2b]"
          >
            <RotateCcw size={18} />
            Reset preferences
          </button>

          <p
            role="status"
            aria-live="polite"
            className="mt-4 min-h-5 text-sm font-medium leading-5 text-[#741f2b]"
          >
            {statusMessage}
          </p>
        </section>
      )}
    </>
  );
}

type PreferenceToggleProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  active: boolean;
  onChange: () => void;
};

function PreferenceToggle({
  title,
  description,
  icon: Icon,
  active,
  onChange,
}: PreferenceToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={active}
      className={`focus-ring flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition ${
        active
          ? "border-[#741f2b] bg-[#741f2b]/5"
          : "border-black/10 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon
          className="mt-0.5 shrink-0 text-[#741f2b]"
          size={20}
        />

        <div>
          <p className="font-semibold text-[#4e111b]">
            {title}
          </p>

          <p className="mt-1 text-sm leading-5 text-black/55">
            {description}
          </p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition ${
          active ? "bg-[#741f2b]" : "bg-black/20"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            active ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}
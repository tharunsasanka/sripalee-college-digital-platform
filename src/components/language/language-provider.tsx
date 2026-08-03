"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getTranslation,
  isLanguageCode,
  type LanguageCode,
  type TranslationKey,
} from "@/lib/language";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: TranslationKey) => string;
  ready: boolean;
};

const STORAGE_KEY = "sripalee-language-preference";
const LANGUAGE_CHANGE_EVENT = "sripalee-language-change";

const LanguageContext = createContext<LanguageContextValue | null>(null);

let fallbackLanguage: LanguageCode = "en";

function getLanguageSnapshot(): LanguageCode {
  if (typeof window === "undefined") {
    return "en";
  }

  try {
    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);

    if (storedLanguage && isLanguageCode(storedLanguage)) {
      fallbackLanguage = storedLanguage;
      return storedLanguage;
    }
  } catch {
    return fallbackLanguage;
  }

  return fallbackLanguage;
}

function getServerLanguageSnapshot(): LanguageCode {
  return "en";
}

function subscribeToLanguage(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY) {
      return;
    }

    if (event.newValue && isLanguageCode(event.newValue)) {
      fallbackLanguage = event.newValue;
    } else {
      fallbackLanguage = "en";
    }

    onStoreChange();
  }

  function handleLanguageChange() {
    onStoreChange();
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(
    LANGUAGE_CHANGE_EVENT,
    handleLanguageChange,
  );

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(
      LANGUAGE_CHANGE_EVENT,
      handleLanguageChange,
    );
  };
}

function subscribeToBrowserReady() {
  return () => {};
}

function getBrowserReadySnapshot() {
  return true;
}

function getServerReadySnapshot() {
  return false;
}

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );

  const ready = useSyncExternalStore(
    subscribeToBrowserReady,
    getBrowserReadySnapshot,
    getServerReadySnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
  }, [language]);

  function setLanguage(nextLanguage: LanguageCode) {
    fallbackLanguage = nextLanguage;

    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    } catch {
      fallbackLanguage = nextLanguage;
    }

    document.documentElement.lang = nextLanguage;
    document.documentElement.dir = "ltr";

    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  }

  function t(key: TranslationKey) {
    return getTranslation(language, key);
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        ready,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider.",
    );
  }

  return context;
}
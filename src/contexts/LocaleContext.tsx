import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type InterfaceLang = "en" | "bn";
export type LabelDisplayMode = "en" | "bn" | "both";

export interface LocaleConfig {
  lang: InterfaceLang;
  labelMode: LabelDisplayMode;
  setLang: (lang: InterfaceLang) => void;
  setLabelMode: (mode: LabelDisplayMode) => void;
  t: (en: string, bn?: string) => string;
}

const LocaleContext = createContext<LocaleConfig | null>(null);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

/**
 * Returns the display string based on current label mode.
 * - "en"   → English only
 * - "bn"   → Bangla only (falls back to English if no Bangla provided)
 * - "both" → "English / বাংলা"
 */
function resolveLabel(mode: LabelDisplayMode, en: string, bn?: string): string {
  if (!bn) return en;
  switch (mode) {
    case "en":
      return en;
    case "bn":
      return bn;
    case "both":
      return `${en} / ${bn}`;
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<InterfaceLang>(() => {
    const stored = localStorage.getItem("eduspark-lang");
    return (stored === "bn" ? "bn" : "en") as InterfaceLang;
  });

  const [labelMode, setLabelMode] = useState<LabelDisplayMode>(() => {
    const stored = localStorage.getItem("eduspark-label-mode");
    return (["en", "bn", "both"].includes(stored || "") ? stored : "en") as LabelDisplayMode;
  });

  const handleSetLang = useCallback((l: InterfaceLang) => {
    setLang(l);
    localStorage.setItem("eduspark-lang", l);
  }, []);

  const handleSetLabelMode = useCallback((m: LabelDisplayMode) => {
    setLabelMode(m);
    localStorage.setItem("eduspark-label-mode", m);
  }, []);

  const t = useCallback(
    (en: string, bn?: string) => resolveLabel(labelMode, en, bn),
    [labelMode]
  );

  return (
    <LocaleContext.Provider
      value={{ lang, labelMode, setLang: handleSetLang, setLabelMode: handleSetLabelMode, t }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

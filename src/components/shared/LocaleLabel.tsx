import { useLocale } from "@/contexts/LocaleContext";

interface LocaleLabelProps {
  en: string;
  bn?: string;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "label" | "div";
}

/**
 * Renders a label using the current locale display mode.
 *
 * In "both" mode, renders side-by-side with the Bangla in muted style:
 *   English <span class="muted">/ বাংলা</span>
 *
 * In single-language modes, renders just the selected language.
 */
export function LocaleLabel({ en, bn, className, as: Tag = "span" }: LocaleLabelProps) {
  const { labelMode } = useLocale();

  if (!bn) return <Tag className={className}>{en}</Tag>;

  switch (labelMode) {
    case "en":
      return <Tag className={className}>{en}</Tag>;
    case "bn":
      return <Tag className={className}>{bn}</Tag>;
    case "both":
      return (
        <Tag className={className}>
          {en}
          <span className="text-muted-foreground font-normal ml-1 text-[0.85em] opacity-70">/ {bn}</span>
        </Tag>
      );
  }
}

/**
 * Inline helper for use in attributes (title, placeholder, aria-label).
 * Re-exported from context for convenience.
 */
export { useLocale } from "@/contexts/LocaleContext";

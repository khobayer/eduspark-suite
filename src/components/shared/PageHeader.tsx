import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";

interface PageHeaderProps {
  title: string;
  titleBn?: string;
  description?: string;
  descriptionBn?: string;
  children?: ReactNode;
}

export function PageHeader({ title, titleBn, description, descriptionBn, children }: PageHeaderProps) {
  const { labelMode } = useLocale();

  const renderTitle = () => {
    if (!titleBn) return title;
    switch (labelMode) {
      case "en": return title;
      case "bn": return titleBn;
      case "both": return (
        <>
          {title}
          <span className="text-muted-foreground font-normal text-base ml-2">/ {titleBn}</span>
        </>
      );
    }
  };

  const renderDescription = () => {
    if (!description) return null;
    if (!descriptionBn) return description;
    switch (labelMode) {
      case "en": return description;
      case "bn": return descriptionBn;
      case "both": return description;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
    >
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          {renderTitle()}
        </h1>
        {renderDescription() && (
          <p className="text-sm text-muted-foreground mt-0.5">{renderDescription()}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </motion.div>
  );
}

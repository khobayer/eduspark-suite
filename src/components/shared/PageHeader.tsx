import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  titleBn?: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, titleBn, description, children }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
    >
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          {title}
          {titleBn && <span className="text-muted-foreground font-normal text-base ml-2">/ {titleBn}</span>}
        </h1>
        {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </motion.div>
  );
}

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ModuleStubProps {
  title: string;
  titleBn?: string;
  description: string;
  icon: LucideIcon;
  children?: ReactNode;
}

export function ModuleStub({ title, titleBn, description, icon: Icon, children }: ModuleStubProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
          <Icon className="h-5 w-5 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {title}
            {titleBn && <span className="text-muted-foreground font-normal text-base ml-2">/ {titleBn}</span>}
          </h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </motion.div>
      {children || (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-xl"
        >
          <Icon className="h-12 w-12 text-muted-foreground/30 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">Module under development</p>
          <p className="text-xs text-muted-foreground/70 mt-1">This page will be available soon</p>
        </motion.div>
      )}
    </div>
  );
}

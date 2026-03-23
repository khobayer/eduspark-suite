import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale } from "@/contexts/LocaleContext";

interface StatCardProps {
  title: string;
  titleBn?: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  index?: number;
}

export function StatCard({ title, titleBn, value, change, changeType = 'neutral', icon: Icon, index = 0 }: StatCardProps) {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{titleBn ? t(title, titleBn) : title}</p>
              <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
              {change && (
                <p className={`text-xs font-medium ${
                  changeType === 'positive' ? 'text-success' :
                  changeType === 'negative' ? 'text-destructive' :
                  'text-muted-foreground'
                }`}>
                  {change}
                </p>
              )}
            </div>
            <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-accent-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

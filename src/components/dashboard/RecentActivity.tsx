import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recentActivities } from "@/data/mock-data";
import { Users, Wallet, FileText, CalendarCheck, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";

const iconMap = {
  student: Users,
  finance: Wallet,
  exam: FileText,
  attendance: CalendarCheck,
  notice: Bell,
};

export function RecentActivity() {
  const { t } = useLocale();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{t("Recent Activity", "সাম্প্রতিক কার্যকলাপ")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivities.map((activity) => {
            const Icon = iconMap[activity.type];
            return (
              <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="h-8 w-8 rounded-md bg-accent flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="h-4 w-4 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.detail}</p>
                </div>
                <span className="text-[11px] text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}

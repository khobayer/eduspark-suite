import { Users, GraduationCap, CalendarCheck, Wallet, FileText, MessageSquare, ArrowRight, AlertTriangle, Plus, UserPlus, CreditCard } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tenantDashboardStats } from "@/data/mock-data";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useLocale } from "@/contexts/LocaleContext";

const financeChartData = [
  { month: 'Jan', collection: 220, expense: 150 },
  { month: 'Feb', collection: 235, expense: 145 },
  { month: 'Mar', collection: 245, expense: 160 },
  { month: 'Apr', collection: 210, expense: 155 },
  { month: 'May', collection: 250, expense: 148 },
  { month: 'Jun', collection: 245, expense: 152 },
];

const quickActions = [
  { label: 'Add Student', labelBn: 'শিক্ষার্থী যোগ', icon: UserPlus, href: '/tenant/students/create', color: 'bg-primary/10 text-primary' },
  { label: 'Record Payment', labelBn: 'পেমেন্ট রেকর্ড', icon: CreditCard, href: '/tenant/finance', color: 'bg-success/10 text-success' },
  { label: 'Mark Attendance', labelBn: 'উপস্থিতি চিহ্নিত', icon: CalendarCheck, href: '/tenant/attendance', color: 'bg-info/10 text-info' },
  { label: 'New Broadcast', labelBn: 'নতুন সম্প্রচার', icon: MessageSquare, href: '/tenant/broadcast', color: 'bg-warning/10 text-warning' },
];

const upcomingReminders = [
  { title: '1st Term Exam starts April 1', type: 'exam' },
  { title: '12 students have overdue fees', type: 'finance' },
  { title: 'Parent-Teacher Meeting – March 22', type: 'event' },
];

export default function TenantDashboard() {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        titleBn="ড্যাশবোর্ড"
        description={t("Dhaka Model School", "ঢাকা মডেল স্কুল")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Students" titleBn="শিক্ষার্থী" value={tenantDashboardStats.totalStudents.toLocaleString()} change="+15 this month" changeType="positive" icon={Users} index={0} />
        <StatCard title="Teachers" titleBn="শিক্ষক" value={tenantDashboardStats.totalTeachers} icon={GraduationCap} index={1} />
        <StatCard title="Attendance" titleBn="উপস্থিতি" value={`${tenantDashboardStats.attendanceRate}%`} change="+0.5%" changeType="positive" icon={CalendarCheck} index={2} />
        <StatCard title="Pending Fees" titleBn="বকেয়া ফি" value={`৳${(tenantDashboardStats.pendingFees / 1000).toFixed(0)}k`} change="12 students" changeType="negative" icon={Wallet} index={3} />
        <StatCard title="Upcoming Exams" titleBn="আসন্ন পরীক্ষা" value={tenantDashboardStats.upcomingExams} icon={FileText} index={4} />
        <StatCard title="Messages" titleBn="বার্তা" value={tenantDashboardStats.unreadMessages} change="5 unread" changeType="neutral" icon={MessageSquare} index={5} />
      </div>

      {/* Quick Actions + Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">{t("Quick Actions", "দ্রুত কার্যক্রম")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => navigate(action.href)}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted/30 transition-colors group"
                  >
                    <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{action.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <Card className="h-full border-warning/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <CardTitle className="text-base font-semibold">Reminders</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingReminders.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full mt-2 shrink-0 ${
                    item.type === 'finance' ? 'bg-destructive' : item.type === 'exam' ? 'bg-warning' : 'bg-info'
                  }`} />
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        
        {/* Finance Mini Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Income vs Expense / আয় ও ব্যয়</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate('/tenant/finance')}>
                  Details <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financeChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" tickFormatter={(v) => `${v}k`} />
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid hsl(var(--border))' }} formatter={(value: number) => [`৳${value}k`]} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="collection" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Collection" />
                    <Bar dataKey="expense" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} name="Expense" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <RecentActivity />
    </div>
  );
}

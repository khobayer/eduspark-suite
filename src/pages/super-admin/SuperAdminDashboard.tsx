import { Building2, Users, CreditCard, TrendingUp, PlayCircle, BarChart3, AlertTriangle, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TenantTable } from "@/components/dashboard/TenantTable";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { superAdminStats } from "@/data/mock-data";
import { billingStats, monthlyRevenueData } from "@/data/super-admin-data";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useLocale } from "@/contexts/LocaleContext";

const tenantModeData = [
  { name: 'School', value: 98, fill: 'hsl(172, 66%, 30%)' },
  { name: 'Coaching', value: 58, fill: 'hsl(220, 20%, 50%)' },
];

const planDistribution = [
  { name: 'Basic', value: 45, fill: 'hsl(210, 14%, 70%)' },
  { name: 'Pro', value: 82, fill: 'hsl(172, 66%, 40%)' },
  { name: 'Enterprise', value: 29, fill: 'hsl(220, 20%, 20%)' },
];

const recentActivity = [
  { id: '1', action: 'New tenant registered', detail: 'Rajshahi Public School', time: '12 min ago', type: 'tenant' },
  { id: '2', action: 'Payment received', detail: '৳12,000 from Green Valley School', time: '25 min ago', type: 'payment' },
  { id: '3', action: 'Plan upgraded', detail: 'Ideal Coaching → Pro plan', time: '1 hr ago', type: 'upgrade' },
  { id: '4', action: 'Support ticket opened', detail: 'SMS delivery issue – Sunshine Academy', time: '2 hrs ago', type: 'ticket' },
  { id: '5', action: 'Payment failed', detail: '৳2,000 – Star Coaching (bKash)', time: '3 hrs ago', type: 'alert' },
  { id: '6', action: 'Tenant suspended', detail: 'Future Leaders Academy – 3 months overdue', time: '5 hrs ago', type: 'alert' },
];

const alerts = [
  { id: '1', title: '3 subscriptions expiring this week', severity: 'warning' as const },
  { id: '2', title: '2 failed payment retries pending', severity: 'error' as const },
  { id: '3', title: 'SMS quota exceeded for 4 tenants', severity: 'warning' as const },
];

export default function SuperAdminDashboard() {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Overview"
        titleBn="প্ল্যাটফর্ম ওভারভিউ"
        description="Monitor your SaaS platform health, tenant activity, and revenue"
        descriptionBn="আপনার SaaS প্ল্যাটফর্মের স্বাস্থ্য, প্রতিষ্ঠান কার্যকলাপ এবং রাজস্ব পর্যবেক্ষণ করুন"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Tenants" titleBn="মোট প্রতিষ্ঠান" value={superAdminStats.totalTenants} change="+8 this month" changeType="positive" icon={Building2} index={0} />
        <StatCard title="Total Students" titleBn="মোট শিক্ষার্থী" value={superAdminStats.totalStudents.toLocaleString()} change="+2.1k this month" changeType="positive" icon={Users} index={1} />
        <StatCard title="MRR" titleBn="মাসিক রাজস্ব" value={`৳${(billingStats.thisMonthRevenue / 1000).toFixed(0)}k`} change={`+${billingStats.mrrGrowth}% growth`} changeType="positive" icon={CreditCard} index={2} />
        <StatCard title="Active Subs" titleBn="সক্রিয় সাবস্ক্রিপশন" value={billingStats.activeSubscriptions} change={`${billingStats.churnRate}% churn`} changeType="neutral" icon={TrendingUp} index={3} />
        <StatCard title="Trial Accounts" titleBn="ট্রায়াল অ্যাকাউন্ট" value={superAdminStats.trialAccounts} change="Converting well" changeType="positive" icon={PlayCircle} index={4} />
        <StatCard title="Avg Revenue" titleBn="গড় রাজস্ব" value={`৳${(billingStats.avgRevenuePerTenant / 1000).toFixed(1)}k`} change="Per tenant/mo" changeType="neutral" icon={BarChart3} index={5} />
      </div>

      {/* Alerts Banner */}
      {alerts.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-warning/30 bg-warning/[0.03]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1.5">
                  <p className="text-sm font-semibold text-foreground">Attention Required</p>
                  {alerts.map(alert => (
                    <div key={alert.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${alert.severity === 'error' ? 'bg-destructive' : 'bg-warning'}`} />
                      <span>{alert.title}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="shrink-0">View All</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Tenant Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2 text-center font-medium">By Mode</p>
                  <div className="h-[110px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={tenantModeData} cx="50%" cy="50%" innerRadius={30} outerRadius={48} paddingAngle={4} dataKey="value">
                          {tenantModeData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 11 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-1 mt-1">
                    {tenantModeData.map(d => (
                      <div key={d.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.fill }} />
                          <span className="text-muted-foreground">{d.name}</span>
                        </div>
                        <span className="font-medium">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 text-center font-medium">By Plan</p>
                  <div className="h-[110px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={planDistribution} cx="50%" cy="50%" innerRadius={30} outerRadius={48} paddingAngle={4} dataKey="value">
                          {planDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 11 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-1 mt-1">
                    {planDistribution.map(d => (
                      <div key={d.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.fill }} />
                          <span className="text-muted-foreground">{d.name}</span>
                        </div>
                        <span className="font-medium">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity Feed + System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">View All <ArrowRight className="h-3 w-3 ml-1" /></Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                      item.type === 'alert' ? 'bg-destructive/10' :
                      item.type === 'payment' ? 'bg-success/10' :
                      item.type === 'upgrade' ? 'bg-primary/10' :
                      item.type === 'ticket' ? 'bg-warning/10' :
                      'bg-info/10'
                    }`}>
                      {item.type === 'alert' ? <AlertTriangle className="h-4 w-4 text-destructive" /> :
                       item.type === 'payment' ? <CreditCard className="h-4 w-4 text-success" /> :
                       item.type === 'upgrade' ? <TrendingUp className="h-4 w-4 text-primary" /> :
                       item.type === 'ticket' ? <Clock className="h-4 w-4 text-warning" /> :
                       <Building2 className="h-4 w-4 text-info" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'API Uptime', value: '99.98%', status: 'healthy' },
                { label: 'Database', value: '42ms avg', status: 'healthy' },
                { label: 'SMS Gateway', value: '99.3% delivery', status: 'healthy' },
                { label: 'Storage Used', value: '68.2 GB / 100 GB', status: 'warning' },
                { label: 'Active Sessions', value: '342 users', status: 'healthy' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${item.status === 'healthy' ? 'bg-success' : 'bg-warning'}`} />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <TenantTable />
    </div>
  );
}

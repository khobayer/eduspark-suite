import { Building2, Users, CreditCard, TrendingUp, PlayCircle, BarChart3 } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TenantTable } from "@/components/dashboard/TenantTable";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { superAdminStats } from "@/data/mock-data";
import { billingStats, monthlyRevenueData } from "@/data/super-admin-data";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const tenantModeData = [
  { name: 'School', value: 98, fill: 'hsl(172, 66%, 30%)' },
  { name: 'Coaching', value: 58, fill: 'hsl(220, 20%, 50%)' },
];

const planDistribution = [
  { name: 'Basic', value: 45, fill: 'hsl(210, 14%, 70%)' },
  { name: 'Pro', value: 82, fill: 'hsl(172, 66%, 40%)' },
  { name: 'Enterprise', value: 29, fill: 'hsl(220, 20%, 20%)' },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Overview"
        description="Monitor your SaaS platform health, tenant activity, and revenue"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Tenants" value={superAdminStats.totalTenants} change="+8 this month" changeType="positive" icon={Building2} index={0} />
        <StatCard title="Total Students" value={superAdminStats.totalStudents.toLocaleString()} change="+2.1k this month" changeType="positive" icon={Users} index={1} />
        <StatCard title="MRR" value={`৳${(billingStats.thisMonthRevenue / 1000).toFixed(0)}k`} change={`+${billingStats.mrrGrowth}% growth`} changeType="positive" icon={CreditCard} index={2} />
        <StatCard title="Active Subs" value={billingStats.activeSubscriptions} change={`${billingStats.churnRate}% churn`} changeType="neutral" icon={TrendingUp} index={3} />
        <StatCard title="Trial Accounts" value={superAdminStats.trialAccounts} change="Converting well" changeType="positive" icon={PlayCircle} index={4} />
        <StatCard title="Avg Revenue" value={`৳${(billingStats.avgRevenuePerTenant / 1000).toFixed(1)}k`} change="Per tenant/mo" changeType="neutral" icon={BarChart3} index={5} />
      </div>

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
                          {tenantModeData.map((entry, i) => (
                            <Cell key={i} fill={entry.fill} />
                          ))}
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
                          {planDistribution.map((entry, i) => (
                            <Cell key={i} fill={entry.fill} />
                          ))}
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

      <TenantTable />
    </div>
  );
}

import { Building2, Users, CreditCard, TrendingUp, PlayCircle, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TenantTable } from "@/components/dashboard/TenantTable";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { superAdminStats } from "@/data/mock-data";

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Platform Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Monitor your SaaS platform health and tenant activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Tenants" titleBn="মোট প্রতিষ্ঠান" value={superAdminStats.totalTenants} change="+8 this month" changeType="positive" icon={Building2} index={0} />
        <StatCard title="Total Students" titleBn="মোট শিক্ষার্থী" value={superAdminStats.totalStudents.toLocaleString()} change="+2.1k this month" changeType="positive" icon={Users} index={1} />
        <StatCard title="Monthly Revenue" titleBn="মাসিক আয়" value={`৳${(superAdminStats.totalRevenue / 1000).toFixed(0)}k`} change="+12.5%" changeType="positive" icon={CreditCard} index={2} />
        <StatCard title="Active Subs" titleBn="সক্রিয় সাবস্ক্রিপশন" value={superAdminStats.activeSubscriptions} icon={TrendingUp} index={3} />
        <StatCard title="Trial Accounts" titleBn="ট্রায়াল অ্যাকাউন্ট" value={superAdminStats.trialAccounts} icon={PlayCircle} index={4} />
        <StatCard title="Growth Rate" titleBn="প্রবৃদ্ধির হার" value={`${superAdminStats.monthlyGrowth}%`} change="vs last month" changeType="positive" icon={AlertTriangle} index={5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <TenantTable />
      </div>
    </div>
  );
}

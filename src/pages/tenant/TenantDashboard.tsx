import { Users, GraduationCap, CalendarCheck, Wallet, FileText, MessageSquare } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { PageHeader } from "@/components/shared/PageHeader";
import { tenantDashboardStats } from "@/data/mock-data";

export default function TenantDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        titleBn="ড্যাশবোর্ড"
        description="Dhaka Model School — ঢাকা মডেল স্কুল"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Students" titleBn="শিক্ষার্থী" value={tenantDashboardStats.totalStudents.toLocaleString()} change="+15 this month" changeType="positive" icon={Users} index={0} />
        <StatCard title="Teachers" titleBn="শিক্ষক" value={tenantDashboardStats.totalTeachers} icon={GraduationCap} index={1} />
        <StatCard title="Attendance" titleBn="উপস্থিতি" value={`${tenantDashboardStats.attendanceRate}%`} change="+0.5%" changeType="positive" icon={CalendarCheck} index={2} />
        <StatCard title="Pending Fees" titleBn="বকেয়া ফি" value={`৳${(tenantDashboardStats.pendingFees / 1000).toFixed(0)}k`} change="12 students" changeType="negative" icon={Wallet} index={3} />
        <StatCard title="Upcoming Exams" titleBn="আসন্ন পরীক্ষা" value={tenantDashboardStats.upcomingExams} icon={FileText} index={4} />
        <StatCard title="Messages" titleBn="বার্তা" value={tenantDashboardStats.unreadMessages} change="5 unread" changeType="neutral" icon={MessageSquare} index={5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        <RecentActivity />
      </div>
    </div>
  );
}

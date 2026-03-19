// Mock data for the ERP dashboard

export interface Tenant {
  id: string;
  name: string;
  nameBn: string;
  mode: 'school' | 'coaching';
  plan: 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'suspended' | 'trial';
  students: number;
  teachers: number;
  createdAt: string;
  location: string;
}

export const tenants: Tenant[] = [
  { id: '1', name: 'Dhaka Model School', nameBn: 'ঢাকা মডেল স্কুল', mode: 'school', plan: 'enterprise', status: 'active', students: 1250, teachers: 68, createdAt: '2024-01-15', location: 'Dhaka' },
  { id: '2', name: 'Ideal Coaching Center', nameBn: 'আইডিয়াল কোচিং সেন্টার', mode: 'coaching', plan: 'pro', status: 'active', students: 430, teachers: 22, createdAt: '2024-03-10', location: 'Chittagong' },
  { id: '3', name: 'Sunshine Academy', nameBn: 'সানশাইন একাডেমি', mode: 'school', plan: 'pro', status: 'active', students: 890, teachers: 45, createdAt: '2024-02-20', location: 'Sylhet' },
  { id: '4', name: 'Star Coaching', nameBn: 'স্টার কোচিং', mode: 'coaching', plan: 'basic', status: 'trial', students: 120, teachers: 8, createdAt: '2025-01-05', location: 'Rajshahi' },
  { id: '5', name: 'Green Valley School', nameBn: 'গ্রিন ভ্যালি স্কুল', mode: 'school', plan: 'enterprise', status: 'active', students: 2100, teachers: 95, createdAt: '2023-08-01', location: 'Dhaka' },
  { id: '6', name: 'Future Leaders Academy', nameBn: 'ফিউচার লিডার্স একাডেমি', mode: 'coaching', plan: 'pro', status: 'suspended', students: 310, teachers: 15, createdAt: '2024-06-12', location: 'Khulna' },
];

export const superAdminStats = {
  totalTenants: 156,
  totalStudents: 42500,
  totalRevenue: 2450000,
  activeSubscriptions: 142,
  trialAccounts: 14,
  monthlyGrowth: 12.5,
};

export const tenantDashboardStats = {
  totalStudents: 1250,
  totalTeachers: 68,
  attendanceRate: 94.2,
  pendingFees: 245000,
  upcomingExams: 3,
  unreadMessages: 12,
};

export const revenueChartData = [
  { month: 'Jan', revenue: 180000, tenants: 120 },
  { month: 'Feb', revenue: 195000, tenants: 125 },
  { month: 'Mar', revenue: 210000, tenants: 132 },
  { month: 'Apr', revenue: 225000, tenants: 138 },
  { month: 'May', revenue: 240000, tenants: 145 },
  { month: 'Jun', revenue: 245000, tenants: 156 },
];

export const attendanceChartData = [
  { day: 'Sat', present: 1180, absent: 70 },
  { day: 'Sun', present: 1150, absent: 100 },
  { day: 'Mon', present: 1200, absent: 50 },
  { day: 'Tue', present: 1170, absent: 80 },
  { day: 'Wed', present: 1190, absent: 60 },
  { day: 'Thu', present: 1100, absent: 150 },
];

export const recentActivities = [
  { id: '1', action: 'New student enrolled', detail: 'Rahima Begum - Class 8', time: '5 mins ago', type: 'student' as const },
  { id: '2', action: 'Fee payment received', detail: '৳5,000 from Ahmed Khan', time: '15 mins ago', type: 'finance' as const },
  { id: '3', action: 'Exam results published', detail: 'Mid-term - Class 10', time: '1 hour ago', type: 'exam' as const },
  { id: '4', action: 'Attendance marked', detail: 'Class 6A - All present', time: '2 hours ago', type: 'attendance' as const },
  { id: '5', action: 'Notice published', detail: 'Annual sports day schedule', time: '3 hours ago', type: 'notice' as const },
];

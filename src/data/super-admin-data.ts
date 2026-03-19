// Comprehensive Super Admin mock data

// ============ BILLING / PAYMENTS ============
export interface PaymentRecord {
  id: string;
  transactionId: string;
  tenantName: string;
  tenantId: string;
  plan: string;
  amount: number;
  method: 'bkash' | 'nagad' | 'bank_transfer' | 'card' | 'cash';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  invoicePeriod: string;
}

export const paymentRecords: PaymentRecord[] = [
  { id: '1', transactionId: 'TXN-20250319-001', tenantName: 'Dhaka Model School', tenantId: 'T-001', plan: 'Enterprise', amount: 12000, method: 'bkash', status: 'completed', date: '2025-03-19', invoicePeriod: 'Mar 2025' },
  { id: '2', transactionId: 'TXN-20250319-002', tenantName: 'Ideal Coaching Center', tenantId: 'T-002', plan: 'Pro', amount: 5000, method: 'nagad', status: 'completed', date: '2025-03-18', invoicePeriod: 'Mar 2025' },
  { id: '3', transactionId: 'TXN-20250318-003', tenantName: 'Sunshine Academy', tenantId: 'T-003', plan: 'Pro', amount: 5000, method: 'bank_transfer', status: 'completed', date: '2025-03-17', invoicePeriod: 'Mar 2025' },
  { id: '4', transactionId: 'TXN-20250317-004', tenantName: 'Star Coaching', tenantId: 'T-004', plan: 'Basic', amount: 2000, method: 'bkash', status: 'failed', date: '2025-03-16', invoicePeriod: 'Mar 2025' },
  { id: '5', transactionId: 'TXN-20250316-005', tenantName: 'Green Valley School', tenantId: 'T-005', plan: 'Enterprise', amount: 12000, method: 'card', status: 'completed', date: '2025-03-15', invoicePeriod: 'Mar 2025' },
  { id: '6', transactionId: 'TXN-20250315-006', tenantName: 'Future Leaders Academy', tenantId: 'T-006', plan: 'Pro', amount: 5000, method: 'bkash', status: 'refunded', date: '2025-03-14', invoicePeriod: 'Mar 2025' },
  { id: '7', transactionId: 'TXN-20250314-007', tenantName: 'Rajshahi Scholars', tenantId: 'T-007', plan: 'Basic', amount: 2000, method: 'nagad', status: 'completed', date: '2025-03-13', invoicePeriod: 'Mar 2025' },
  { id: '8', transactionId: 'TXN-20250313-008', tenantName: 'Sylhet Grammar School', tenantId: 'T-008', plan: 'Enterprise', amount: 12000, method: 'bank_transfer', status: 'pending', date: '2025-03-12', invoicePeriod: 'Mar 2025' },
  { id: '9', transactionId: 'TXN-20250312-009', tenantName: 'Comilla Public School', tenantId: 'T-009', plan: 'Pro', amount: 5000, method: 'card', status: 'completed', date: '2025-03-11', invoicePeriod: 'Mar 2025' },
  { id: '10', transactionId: 'TXN-20250311-010', tenantName: 'Khulna Modern Academy', tenantId: 'T-010', plan: 'Pro', amount: 5000, method: 'bkash', status: 'completed', date: '2025-03-10', invoicePeriod: 'Mar 2025' },
];

export const billingStats = {
  totalRevenue: 2450000,
  thisMonthRevenue: 385000,
  pendingPayments: 48000,
  failedPayments: 14000,
  activeSubscriptions: 142,
  churnRate: 2.3,
  avgRevenuePerTenant: 15800,
  mrrGrowth: 12.5,
};

export const monthlyRevenueData = [
  { month: 'Oct', revenue: 320000, tenants: 120, churn: 3 },
  { month: 'Nov', revenue: 338000, tenants: 128, churn: 2 },
  { month: 'Dec', revenue: 352000, tenants: 134, churn: 4 },
  { month: 'Jan', revenue: 360000, tenants: 140, churn: 2 },
  { month: 'Feb', revenue: 372000, tenants: 148, churn: 1 },
  { month: 'Mar', revenue: 385000, tenants: 156, churn: 3 },
];

export const revenuByPlanData = [
  { name: 'Basic', value: 90000, count: 45, fill: 'hsl(210, 14%, 70%)' },
  { name: 'Pro', value: 410000, count: 82, fill: 'hsl(172, 66%, 40%)' },
  { name: 'Enterprise', value: 348000, count: 29, fill: 'hsl(220, 20%, 20%)' },
];

// ============ FEATURE FLAGS ============
export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  category: 'module' | 'integration' | 'ui' | 'experimental';
  enabledForPlans: string[];
  enabledForTenants: string[];
  isGlobal: boolean;
  status: 'enabled' | 'disabled' | 'beta';
  lastUpdated: string;
}

export const featureFlags: FeatureFlag[] = [
  { id: '1', key: 'module_exams', name: 'Exam Module', description: 'Full exam management with tabulation and report cards', category: 'module', enabledForPlans: ['Pro', 'Enterprise'], enabledForTenants: [], isGlobal: false, status: 'enabled', lastUpdated: '2025-03-15' },
  { id: '2', key: 'module_attendance_biometric', name: 'Biometric Attendance', description: 'Integration with biometric devices for attendance', category: 'integration', enabledForPlans: ['Enterprise'], enabledForTenants: [], isGlobal: false, status: 'enabled', lastUpdated: '2025-03-10' },
  { id: '3', key: 'sms_whatsapp', name: 'WhatsApp Notifications', description: 'Send notifications via WhatsApp Business API', category: 'integration', enabledForPlans: ['Pro', 'Enterprise'], enabledForTenants: [], isGlobal: false, status: 'beta', lastUpdated: '2025-03-18' },
  { id: '4', key: 'module_transport', name: 'Transport Management', description: 'Bus routes, vehicle tracking, and transport fees', category: 'module', enabledForPlans: ['Enterprise'], enabledForTenants: ['T-001', 'T-005'], isGlobal: false, status: 'beta', lastUpdated: '2025-03-12' },
  { id: '5', key: 'ui_dark_mode', name: 'Dark Mode', description: 'Enable dark theme for tenant dashboards', category: 'ui', enabledForPlans: [], enabledForTenants: [], isGlobal: true, status: 'enabled', lastUpdated: '2025-02-28' },
  { id: '6', key: 'ai_report_generation', name: 'AI Report Generation', description: 'Auto-generate progress reports using AI', category: 'experimental', enabledForPlans: [], enabledForTenants: ['T-001'], isGlobal: false, status: 'beta', lastUpdated: '2025-03-19' },
  { id: '7', key: 'module_hostel', name: 'Hostel Management', description: 'Room allocation, mess, and hostel fee tracking', category: 'module', enabledForPlans: ['Enterprise'], enabledForTenants: [], isGlobal: false, status: 'disabled', lastUpdated: '2025-01-20' },
  { id: '8', key: 'payment_sslcommerz', name: 'SSLCommerz Payment', description: 'Online fee payment via SSLCommerz gateway', category: 'integration', enabledForPlans: ['Pro', 'Enterprise'], enabledForTenants: [], isGlobal: false, status: 'enabled', lastUpdated: '2025-03-05' },
  { id: '9', key: 'multi_branch', name: 'Multi-Branch Support', description: 'Manage multiple branches under one tenant', category: 'module', enabledForPlans: ['Enterprise'], enabledForTenants: [], isGlobal: false, status: 'enabled', lastUpdated: '2025-02-15' },
  { id: '10', key: 'custom_report_builder', name: 'Custom Report Builder', description: 'Drag-and-drop report designer for tenants', category: 'experimental', enabledForPlans: [], enabledForTenants: ['T-001', 'T-003'], isGlobal: false, status: 'beta', lastUpdated: '2025-03-16' },
];

// ============ TEMPLATES ============
export interface Template {
  id: string;
  name: string;
  type: 'report_card' | 'invoice' | 'id_card' | 'admit_card' | 'certificate' | 'receipt';
  description: string;
  usedBy: number;
  isDefault: boolean;
  lastUpdated: string;
  thumbnail?: string;
  status: 'active' | 'draft' | 'archived';
}

export const templates: Template[] = [
  { id: '1', name: 'Standard Report Card', type: 'report_card', description: 'Default report card with grading table and teacher remarks', usedBy: 89, isDefault: true, lastUpdated: '2025-03-01', status: 'active' },
  { id: '2', name: 'Detailed Report Card', type: 'report_card', description: 'Extended layout with subject-wise marks, GPA, and attendance summary', usedBy: 45, isDefault: false, lastUpdated: '2025-02-20', status: 'active' },
  { id: '3', name: 'Monthly Invoice', type: 'invoice', description: 'Clean invoice with fee breakdown, payment details, and QR code', usedBy: 120, isDefault: true, lastUpdated: '2025-03-10', status: 'active' },
  { id: '4', name: 'Student ID Card', type: 'id_card', description: 'Photo ID with student details, barcode, and emergency contact', usedBy: 98, isDefault: true, lastUpdated: '2025-01-15', status: 'active' },
  { id: '5', name: 'Exam Admit Card', type: 'admit_card', description: 'Admit card with exam schedule, seat number, and instructions', usedBy: 56, isDefault: true, lastUpdated: '2025-02-28', status: 'active' },
  { id: '6', name: 'Transfer Certificate', type: 'certificate', description: 'TC template with academic records and conduct assessment', usedBy: 23, isDefault: true, lastUpdated: '2025-01-05', status: 'active' },
  { id: '7', name: 'Payment Receipt', type: 'receipt', description: 'Compact receipt with payment confirmation and balance info', usedBy: 134, isDefault: true, lastUpdated: '2025-03-08', status: 'active' },
  { id: '8', name: 'Coaching Report Card', type: 'report_card', description: 'Coaching-mode report with batch info and progress tracking', usedBy: 32, isDefault: false, lastUpdated: '2025-02-10', status: 'active' },
  { id: '9', name: 'Premium Invoice', type: 'invoice', description: 'Branded invoice with custom header and digital signature', usedBy: 12, isDefault: false, lastUpdated: '2025-03-18', status: 'draft' },
];

// ============ SMS USAGE ============
export interface SmsRecord {
  id: string;
  tenantName: string;
  tenantId: string;
  totalSent: number;
  totalFailed: number;
  monthlyQuota: number;
  used: number;
  channel: 'sms' | 'whatsapp' | 'email';
  lastSent: string;
  plan: string;
}

export const smsRecords: SmsRecord[] = [
  { id: '1', tenantName: 'Dhaka Model School', tenantId: 'T-001', totalSent: 1850, totalFailed: 12, monthlyQuota: 2000, used: 92.5, channel: 'sms', lastSent: '2025-03-19 14:30', plan: 'Enterprise' },
  { id: '2', tenantName: 'Ideal Coaching Center', tenantId: 'T-002', totalSent: 420, totalFailed: 5, monthlyQuota: 500, used: 84, channel: 'sms', lastSent: '2025-03-18 10:15', plan: 'Pro' },
  { id: '3', tenantName: 'Sunshine Academy', tenantId: 'T-003', totalSent: 380, totalFailed: 8, monthlyQuota: 500, used: 76, channel: 'sms', lastSent: '2025-03-19 09:45', plan: 'Pro' },
  { id: '4', tenantName: 'Star Coaching', tenantId: 'T-004', totalSent: 95, totalFailed: 2, monthlyQuota: 100, used: 95, channel: 'sms', lastSent: '2025-03-17 16:20', plan: 'Basic' },
  { id: '5', tenantName: 'Green Valley School', tenantId: 'T-005', totalSent: 1640, totalFailed: 18, monthlyQuota: 2000, used: 82, channel: 'sms', lastSent: '2025-03-19 12:00', plan: 'Enterprise' },
  { id: '6', tenantName: 'Future Leaders Academy', tenantId: 'T-006', totalSent: 0, totalFailed: 0, monthlyQuota: 500, used: 0, channel: 'sms', lastSent: '—', plan: 'Pro' },
];

export const smsStats = {
  totalSentThisMonth: 28450,
  totalFailed: 186,
  deliveryRate: 99.3,
  totalCost: 42675,
  activeSenders: 134,
  avgPerTenant: 212,
};

export const smsChartData = [
  { date: 'Mar 1', sent: 850, failed: 12 },
  { date: 'Mar 5', sent: 1200, failed: 18 },
  { date: 'Mar 10', sent: 980, failed: 8 },
  { date: 'Mar 15', sent: 1450, failed: 22 },
  { date: 'Mar 19', sent: 1100, failed: 15 },
];

// ============ ADMIN USERS ============
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'support' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
  avatar?: string;
}

export const adminUsers: AdminUser[] = [
  { id: '1', name: 'Kamrul Hasan', email: 'kamrul@edusaas.com', role: 'super_admin', status: 'active', lastLogin: '2025-03-19 14:30', createdAt: '2023-01-01' },
  { id: '2', name: 'Nadia Rahman', email: 'nadia@edusaas.com', role: 'admin', status: 'active', lastLogin: '2025-03-19 11:15', createdAt: '2023-06-15' },
  { id: '3', name: 'Farhan Ahmed', email: 'farhan@edusaas.com', role: 'support', status: 'active', lastLogin: '2025-03-18 09:45', createdAt: '2024-02-01' },
  { id: '4', name: 'Tasnim Akter', email: 'tasnim@edusaas.com', role: 'support', status: 'active', lastLogin: '2025-03-19 08:30', createdAt: '2024-05-10' },
  { id: '5', name: 'Rezaul Karim', email: 'rezaul@edusaas.com', role: 'viewer', status: 'inactive', lastLogin: '2025-02-28 16:00', createdAt: '2024-08-20' },
];

// ============ SYSTEM SETTINGS ============
export interface SettingGroup {
  id: string;
  title: string;
  description: string;
  icon: string;
  settings: Setting[];
}

export interface Setting {
  key: string;
  label: string;
  description: string;
  type: 'toggle' | 'text' | 'select' | 'number';
  value: string | boolean | number;
  options?: string[];
}

export const systemSettings: SettingGroup[] = [
  {
    id: 'general',
    title: 'General',
    description: 'Basic platform configuration',
    icon: 'settings',
    settings: [
      { key: 'platform_name', label: 'Platform Name', description: 'Name displayed in header and emails', type: 'text', value: 'EduSaaS' },
      { key: 'support_email', label: 'Support Email', description: 'Email for support inquiries', type: 'text', value: 'support@edusaas.com' },
      { key: 'default_language', label: 'Default Language', description: 'Default language for new tenants', type: 'select', value: 'en', options: ['en', 'bn', 'both'] },
      { key: 'maintenance_mode', label: 'Maintenance Mode', description: 'Put the entire platform in maintenance', type: 'toggle', value: false },
    ],
  },
  {
    id: 'registration',
    title: 'Registration & Onboarding',
    description: 'Control tenant sign-up flow',
    icon: 'user-plus',
    settings: [
      { key: 'allow_registration', label: 'Allow Self Registration', description: 'Let new tenants sign up without approval', type: 'toggle', value: true },
      { key: 'trial_days', label: 'Trial Period (days)', description: 'Free trial duration for new tenants', type: 'number', value: 14 },
      { key: 'require_verification', label: 'Require Email Verification', description: 'Verify email before activating tenant', type: 'toggle', value: true },
      { key: 'default_plan', label: 'Default Plan', description: 'Plan assigned to new registrations', type: 'select', value: 'Basic', options: ['Basic', 'Pro', 'Enterprise'] },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Email and SMS notification settings',
    icon: 'bell',
    settings: [
      { key: 'email_notifications', label: 'Email Notifications', description: 'Send email alerts for important events', type: 'toggle', value: true },
      { key: 'sms_provider', label: 'SMS Provider', description: 'Default SMS gateway for platform', type: 'select', value: 'bulksmsbd', options: ['bulksmsbd', 'sslwireless', 'twilio', 'none'] },
      { key: 'sms_sender_id', label: 'SMS Sender ID', description: 'Sender name shown in SMS', type: 'text', value: 'EduSaaS' },
      { key: 'payment_reminder', label: 'Payment Reminders', description: 'Auto-send payment due reminders', type: 'toggle', value: true },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Authentication and access controls',
    icon: 'shield',
    settings: [
      { key: 'two_factor', label: 'Two-Factor Authentication', description: 'Require 2FA for admin users', type: 'toggle', value: false },
      { key: 'session_timeout', label: 'Session Timeout (minutes)', description: 'Auto logout after inactivity', type: 'number', value: 60 },
      { key: 'password_min_length', label: 'Min Password Length', description: 'Minimum characters for passwords', type: 'number', value: 8 },
      { key: 'ip_whitelist', label: 'IP Whitelist', description: 'Restrict admin access to specific IPs', type: 'toggle', value: false },
    ],
  },
];

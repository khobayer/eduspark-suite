// Extended mock data for the full ERP

// ============ STUDENTS ============
export interface Student {
  id: string;
  name: string;
  nameBn: string;
  studentId: string;
  class: string;
  section: string;
  roll: number;
  gender: 'male' | 'female';
  phone: string;
  guardianName: string;
  guardianPhone: string;
  status: 'enrolled' | 'graduated' | 'expelled' | 'inactive';
  bloodGroup: string;
  admissionDate: string;
  dob: string;
  photo?: string;
}

export const students: Student[] = [
  { id: '1', name: 'Ahmed Khan', nameBn: 'আহমেদ খান', studentId: 'STU-2024-001', class: 'Class 10', section: 'A', roll: 1, gender: 'male', phone: '01712345678', guardianName: 'Karim Khan', guardianPhone: '01812345678', status: 'enrolled', bloodGroup: 'A+', admissionDate: '2022-01-15', dob: '2008-03-20' },
  { id: '2', name: 'Fatima Begum', nameBn: 'ফাতিমা বেগম', studentId: 'STU-2024-002', class: 'Class 10', section: 'A', roll: 2, gender: 'female', phone: '01712345679', guardianName: 'Jamal Uddin', guardianPhone: '01812345679', status: 'enrolled', bloodGroup: 'B+', admissionDate: '2022-01-15', dob: '2008-05-12' },
  { id: '3', name: 'Rahim Uddin', nameBn: 'রহিম উদ্দিন', studentId: 'STU-2024-003', class: 'Class 9', section: 'B', roll: 1, gender: 'male', phone: '01712345680', guardianName: 'Nuru Mia', guardianPhone: '01812345680', status: 'enrolled', bloodGroup: 'O+', admissionDate: '2023-01-10', dob: '2009-11-02' },
  { id: '4', name: 'Nusrat Jahan', nameBn: 'নুসরাত জাহান', studentId: 'STU-2024-004', class: 'Class 8', section: 'A', roll: 5, gender: 'female', phone: '01712345681', guardianName: 'Abul Hasan', guardianPhone: '01812345681', status: 'enrolled', bloodGroup: 'AB+', admissionDate: '2023-06-01', dob: '2010-07-15' },
  { id: '5', name: 'Sohel Rana', nameBn: 'সোহেল রানা', studentId: 'STU-2024-005', class: 'Class 10', section: 'B', roll: 3, gender: 'male', phone: '01712345682', guardianName: 'Monir Hossain', guardianPhone: '01812345682', status: 'graduated', bloodGroup: 'A-', admissionDate: '2020-01-10', dob: '2006-09-28' },
  { id: '6', name: 'Rubina Akter', nameBn: 'রুবিনা আক্তার', studentId: 'STU-2024-006', class: 'Class 7', section: 'A', roll: 8, gender: 'female', phone: '01712345683', guardianName: 'Shah Alam', guardianPhone: '01812345683', status: 'enrolled', bloodGroup: 'B-', admissionDate: '2024-01-05', dob: '2011-01-30' },
  { id: '7', name: 'Tariq Islam', nameBn: 'তারিক ইসলাম', studentId: 'STU-2024-007', class: 'Class 9', section: 'A', roll: 4, gender: 'male', phone: '01712345684', guardianName: 'Rafiq Islam', guardianPhone: '01812345684', status: 'inactive', bloodGroup: 'O-', admissionDate: '2023-03-15', dob: '2009-04-18' },
  { id: '8', name: 'Mitu Das', nameBn: 'মিতু দাস', studentId: 'STU-2024-008', class: 'Class 8', section: 'B', roll: 2, gender: 'female', phone: '01712345685', guardianName: 'Bipul Das', guardianPhone: '01812345685', status: 'enrolled', bloodGroup: 'A+', admissionDate: '2023-01-10', dob: '2010-12-05' },
];

// ============ INVOICES / FINANCE ============
export interface Invoice {
  id: string;
  invoiceNo: string;
  studentName: string;
  studentId: string;
  class: string;
  feeHead: string;
  amount: number;
  paid: number;
  due: number;
  status: 'paid' | 'partial' | 'overdue' | 'pending';
  dueDate: string;
  paidDate?: string;
  month: string;
}

export const invoices: Invoice[] = [
  { id: '1', invoiceNo: 'INV-2025-001', studentName: 'Ahmed Khan', studentId: 'STU-2024-001', class: 'Class 10', feeHead: 'Tuition Fee', amount: 5000, paid: 5000, due: 0, status: 'paid', dueDate: '2025-03-10', paidDate: '2025-03-08', month: 'March 2025' },
  { id: '2', invoiceNo: 'INV-2025-002', studentName: 'Fatima Begum', studentId: 'STU-2024-002', class: 'Class 10', feeHead: 'Tuition Fee', amount: 5000, paid: 3000, due: 2000, status: 'partial', dueDate: '2025-03-10', month: 'March 2025' },
  { id: '3', invoiceNo: 'INV-2025-003', studentName: 'Rahim Uddin', studentId: 'STU-2024-003', class: 'Class 9', feeHead: 'Tuition Fee', amount: 4500, paid: 0, due: 4500, status: 'overdue', dueDate: '2025-02-28', month: 'February 2025' },
  { id: '4', invoiceNo: 'INV-2025-004', studentName: 'Nusrat Jahan', studentId: 'STU-2024-004', class: 'Class 8', feeHead: 'Exam Fee', amount: 2000, paid: 2000, due: 0, status: 'paid', dueDate: '2025-03-15', paidDate: '2025-03-12', month: 'March 2025' },
  { id: '5', invoiceNo: 'INV-2025-005', studentName: 'Sohel Rana', studentId: 'STU-2024-005', class: 'Class 10', feeHead: 'Tuition Fee', amount: 5000, paid: 0, due: 5000, status: 'pending', dueDate: '2025-03-20', month: 'March 2025' },
  { id: '6', invoiceNo: 'INV-2025-006', studentName: 'Rubina Akter', studentId: 'STU-2024-006', class: 'Class 7', feeHead: 'Lab Fee', amount: 1500, paid: 1500, due: 0, status: 'paid', dueDate: '2025-03-10', paidDate: '2025-03-05', month: 'March 2025' },
  { id: '7', invoiceNo: 'INV-2025-007', studentName: 'Tariq Islam', studentId: 'STU-2024-007', class: 'Class 9', feeHead: 'Tuition Fee', amount: 4500, paid: 0, due: 4500, status: 'overdue', dueDate: '2025-01-31', month: 'January 2025' },
  { id: '8', invoiceNo: 'INV-2025-008', studentName: 'Mitu Das', studentId: 'STU-2024-008', class: 'Class 8', feeHead: 'Tuition Fee', amount: 4000, paid: 4000, due: 0, status: 'paid', dueDate: '2025-03-10', paidDate: '2025-03-09', month: 'March 2025' },
];

export const feeHeads = [
  { id: '1', name: 'Tuition Fee', nameBn: 'বেতন', amount: 5000, frequency: 'monthly' },
  { id: '2', name: 'Exam Fee', nameBn: 'পরীক্ষার ফি', amount: 2000, frequency: 'per-exam' },
  { id: '3', name: 'Lab Fee', nameBn: 'ল্যাব ফি', amount: 1500, frequency: 'monthly' },
  { id: '4', name: 'Library Fee', nameBn: 'লাইব্রেরি ফি', amount: 500, frequency: 'yearly' },
  { id: '5', name: 'Sports Fee', nameBn: 'ক্রীড়া ফি', amount: 1000, frequency: 'yearly' },
  { id: '6', name: 'Development Fee', nameBn: 'উন্নয়ন ফি', amount: 3000, frequency: 'yearly' },
];

export const financeStats = {
  totalCollection: 1850000,
  totalDue: 425000,
  thisMonthCollection: 245000,
  totalExpense: 680000,
  paidInvoices: 842,
  overdueInvoices: 45,
};

export const collectionChartData = [
  { month: 'Jan', collection: 220000, expense: 150000 },
  { month: 'Feb', collection: 235000, expense: 145000 },
  { month: 'Mar', collection: 245000, expense: 160000 },
  { month: 'Apr', collection: 210000, expense: 155000 },
  { month: 'May', collection: 250000, expense: 148000 },
  { month: 'Jun', collection: 245000, expense: 152000 },
];

// ============ SUPER ADMIN EXTENDED ============
export interface Subscription {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  tenantCount: number;
  status: 'active' | 'inactive';
}

export const subscriptionPlans: Subscription[] = [
  { id: '1', name: 'Basic', price: 2000, period: 'monthly', features: ['Up to 200 students', 'Basic attendance', 'Fee management', 'SMS: 100/month'], tenantCount: 45, status: 'active' },
  { id: '2', name: 'Pro', price: 5000, period: 'monthly', features: ['Up to 1000 students', 'Full attendance', 'Exam module', 'Report cards', 'SMS: 500/month'], tenantCount: 82, status: 'active' },
  { id: '3', name: 'Enterprise', price: 12000, period: 'monthly', features: ['Unlimited students', 'All modules', 'Custom branding', 'API access', 'Priority support', 'SMS: 2000/month'], tenantCount: 29, status: 'active' },
];

export interface AuditLogEntry {
  id: string;
  action: string;
  user: string;
  tenant: string;
  timestamp: string;
  details: string;
  level: 'info' | 'warning' | 'critical';
}

export const auditLogs: AuditLogEntry[] = [
  { id: '1', action: 'Tenant Created', user: 'Super Admin', tenant: 'System', timestamp: '2025-03-19 14:30:22', details: 'New tenant "Green Valley School" created', level: 'info' },
  { id: '2', action: 'Plan Changed', user: 'Dhaka Model School', tenant: 'Dhaka Model School', timestamp: '2025-03-19 12:15:45', details: 'Upgraded from Pro to Enterprise', level: 'info' },
  { id: '3', action: 'Payment Failed', user: 'System', tenant: 'Star Coaching', timestamp: '2025-03-18 09:22:10', details: 'Monthly subscription payment failed - insufficient balance', level: 'warning' },
  { id: '4', action: 'Tenant Suspended', user: 'Super Admin', tenant: 'Future Leaders Academy', timestamp: '2025-03-17 16:45:30', details: 'Suspended due to payment default (3 months)', level: 'critical' },
  { id: '5', action: 'Feature Flag Updated', user: 'Super Admin', tenant: 'System', timestamp: '2025-03-17 10:05:18', details: 'Enabled "sms_whatsapp" for Pro plan', level: 'info' },
  { id: '6', action: 'Bulk SMS Sent', user: 'Sunshine Academy', tenant: 'Sunshine Academy', timestamp: '2025-03-16 08:30:00', details: '450 SMS sent - Exam schedule notification', level: 'info' },
  { id: '7', action: 'Data Export', user: 'Ideal Coaching Center', tenant: 'Ideal Coaching Center', timestamp: '2025-03-15 17:20:55', details: 'Exported all student records (CSV)', level: 'info' },
  { id: '8', action: 'Login Failed', user: 'Unknown', tenant: 'System', timestamp: '2025-03-15 03:14:22', details: '5 failed login attempts from IP 103.45.xx.xx', level: 'critical' },
];

export interface SupportTicket {
  id: string;
  ticketNo: string;
  subject: string;
  tenant: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'pending' | 'closed';
  createdAt: string;
  lastReply: string;
}

export const supportTickets: SupportTicket[] = [
  { id: '1', ticketNo: 'TKT-001', subject: 'Cannot generate report cards', tenant: 'Dhaka Model School', priority: 'high', status: 'open', createdAt: '2025-03-19', lastReply: '2 hours ago' },
  { id: '2', ticketNo: 'TKT-002', subject: 'SMS not delivering to parents', tenant: 'Sunshine Academy', priority: 'urgent', status: 'open', createdAt: '2025-03-18', lastReply: '5 hours ago' },
  { id: '3', ticketNo: 'TKT-003', subject: 'Need custom fee head setup', tenant: 'Ideal Coaching Center', priority: 'medium', status: 'pending', createdAt: '2025-03-17', lastReply: '1 day ago' },
  { id: '4', ticketNo: 'TKT-004', subject: 'Export student data in PDF', tenant: 'Green Valley School', priority: 'low', status: 'closed', createdAt: '2025-03-15', lastReply: '3 days ago' },
];

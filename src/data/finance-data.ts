// Comprehensive finance data for the Finance module

export interface FeeCategory {
  id: string;
  name: string;
  nameBn: string;
  description: string;
  type: 'academic' | 'utility' | 'one-time' | 'recurring';
  isActive: boolean;
  feeHeadCount: number;
}

export const feeCategories: FeeCategory[] = [
  { id: '1', name: 'Academic Fees', nameBn: 'একাডেমিক ফি', description: 'Tuition and class-related fees', type: 'academic', isActive: true, feeHeadCount: 3 },
  { id: '2', name: 'Examination Fees', nameBn: 'পরীক্ষার ফি', description: 'Fees for exams and assessments', type: 'academic', isActive: true, feeHeadCount: 2 },
  { id: '3', name: 'Facility Fees', nameBn: 'সুবিধা ফি', description: 'Lab, library, and facility usage fees', type: 'utility', isActive: true, feeHeadCount: 4 },
  { id: '4', name: 'Admission Fees', nameBn: 'ভর্তি ফি', description: 'One-time enrollment and admission fees', type: 'one-time', isActive: true, feeHeadCount: 2 },
  { id: '5', name: 'Transport Fees', nameBn: 'পরিবহন ফি', description: 'School transport and bus service fees', type: 'recurring', isActive: true, feeHeadCount: 1 },
  { id: '6', name: 'Co-curricular Fees', nameBn: 'সহপাঠ্যক্রমিক ফি', description: 'Sports, cultural, and extra activities', type: 'recurring', isActive: false, feeHeadCount: 2 },
];

export interface FeeStructureItem {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  nameBn: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly' | 'per-exam' | 'one-time';
  applicableTo: string[];
  isWaivable: boolean;
  isActive: boolean;
}

export const feeStructure: FeeStructureItem[] = [
  { id: '1', categoryId: '1', categoryName: 'Academic Fees', name: 'Tuition Fee', nameBn: 'বেতন', amount: 5000, frequency: 'monthly', applicableTo: ['Class 9', 'Class 10'], isWaivable: false, isActive: true },
  { id: '2', categoryId: '1', categoryName: 'Academic Fees', name: 'Tuition Fee', nameBn: 'বেতন', amount: 4500, frequency: 'monthly', applicableTo: ['Class 7', 'Class 8'], isWaivable: false, isActive: true },
  { id: '3', categoryId: '2', categoryName: 'Examination Fees', name: 'Term Exam Fee', nameBn: 'সাময়িক পরীক্ষার ফি', amount: 2000, frequency: 'per-exam', applicableTo: ['Class 7', 'Class 8', 'Class 9', 'Class 10'], isWaivable: true, isActive: true },
  { id: '4', categoryId: '2', categoryName: 'Examination Fees', name: 'Pre-test Fee', nameBn: 'প্রাক-পরীক্ষার ফি', amount: 800, frequency: 'per-exam', applicableTo: ['Class 10'], isWaivable: true, isActive: true },
  { id: '5', categoryId: '3', categoryName: 'Facility Fees', name: 'Lab Fee', nameBn: 'ল্যাব ফি', amount: 1500, frequency: 'monthly', applicableTo: ['Class 9', 'Class 10'], isWaivable: true, isActive: true },
  { id: '6', categoryId: '3', categoryName: 'Facility Fees', name: 'Library Fee', nameBn: 'লাইব্রেরি ফি', amount: 500, frequency: 'yearly', applicableTo: ['Class 7', 'Class 8', 'Class 9', 'Class 10'], isWaivable: true, isActive: true },
  { id: '7', categoryId: '3', categoryName: 'Facility Fees', name: 'Computer Lab Fee', nameBn: 'কম্পিউটার ল্যাব ফি', amount: 1200, frequency: 'monthly', applicableTo: ['Class 8', 'Class 9', 'Class 10'], isWaivable: true, isActive: true },
  { id: '8', categoryId: '3', categoryName: 'Facility Fees', name: 'Sports Fee', nameBn: 'ক্রীড়া ফি', amount: 1000, frequency: 'yearly', applicableTo: ['Class 7', 'Class 8', 'Class 9', 'Class 10'], isWaivable: true, isActive: true },
  { id: '9', categoryId: '4', categoryName: 'Admission Fees', name: 'Admission Fee', nameBn: 'ভর্তি ফি', amount: 10000, frequency: 'one-time', applicableTo: ['Class 7', 'Class 8', 'Class 9', 'Class 10'], isWaivable: false, isActive: true },
  { id: '10', categoryId: '4', categoryName: 'Admission Fees', name: 'Development Fee', nameBn: 'উন্নয়ন ফি', amount: 3000, frequency: 'yearly', applicableTo: ['Class 7', 'Class 8', 'Class 9', 'Class 10'], isWaivable: false, isActive: true },
  { id: '11', categoryId: '5', categoryName: 'Transport Fees', name: 'Bus Fee', nameBn: 'বাস ফি', amount: 2500, frequency: 'monthly', applicableTo: ['Class 7', 'Class 8', 'Class 9', 'Class 10'], isWaivable: true, isActive: true },
];

export interface FinanceInvoice {
  id: string;
  invoiceNo: string;
  studentName: string;
  studentNameBn: string;
  studentId: string;
  class: string;
  section: string;
  roll: number;
  feeHead: string;
  category: string;
  amount: number;
  discount: number;
  paid: number;
  due: number;
  status: 'paid' | 'partial' | 'overdue' | 'pending';
  dueDate: string;
  paidDate?: string;
  month: string;
  paymentMethod?: 'cash' | 'bkash' | 'nagad' | 'bank' | 'cheque';
  receiptNo?: string;
  collectedBy?: string;
}

export const financeInvoices: FinanceInvoice[] = [
  { id: '1', invoiceNo: 'INV-2025-001', studentName: 'Ahmed Khan', studentNameBn: 'আহমেদ খান', studentId: 'STU-2024-001', class: 'Class 10', section: 'A', roll: 1, feeHead: 'Tuition Fee', category: 'Academic', amount: 5000, discount: 0, paid: 5000, due: 0, status: 'paid', dueDate: '2025-03-10', paidDate: '2025-03-08', month: 'March 2025', paymentMethod: 'bkash', receiptNo: 'RCP-001', collectedBy: 'Accountant' },
  { id: '2', invoiceNo: 'INV-2025-002', studentName: 'Fatima Begum', studentNameBn: 'ফাতিমা বেগম', studentId: 'STU-2024-002', class: 'Class 10', section: 'A', roll: 2, feeHead: 'Tuition Fee', category: 'Academic', amount: 5000, discount: 0, paid: 3000, due: 2000, status: 'partial', dueDate: '2025-03-10', month: 'March 2025', paymentMethod: 'cash', receiptNo: 'RCP-002', collectedBy: 'Front Desk' },
  { id: '3', invoiceNo: 'INV-2025-003', studentName: 'Rahim Uddin', studentNameBn: 'রহিম উদ্দিন', studentId: 'STU-2024-003', class: 'Class 9', section: 'B', roll: 1, feeHead: 'Tuition Fee', category: 'Academic', amount: 4500, discount: 0, paid: 0, due: 4500, status: 'overdue', dueDate: '2025-02-28', month: 'February 2025' },
  { id: '4', invoiceNo: 'INV-2025-004', studentName: 'Nusrat Jahan', studentNameBn: 'নুসরাত জাহান', studentId: 'STU-2024-004', class: 'Class 8', section: 'A', roll: 5, feeHead: 'Exam Fee', category: 'Examination', amount: 2000, discount: 0, paid: 2000, due: 0, status: 'paid', dueDate: '2025-03-15', paidDate: '2025-03-12', month: 'March 2025', paymentMethod: 'cash', receiptNo: 'RCP-003', collectedBy: 'Accountant' },
  { id: '5', invoiceNo: 'INV-2025-005', studentName: 'Sohel Rana', studentNameBn: 'সোহেল রানা', studentId: 'STU-2024-005', class: 'Class 10', section: 'B', roll: 3, feeHead: 'Tuition Fee', category: 'Academic', amount: 5000, discount: 500, paid: 0, due: 4500, status: 'pending', dueDate: '2025-03-20', month: 'March 2025' },
  { id: '6', invoiceNo: 'INV-2025-006', studentName: 'Rubina Akter', studentNameBn: 'রুবিনা আক্তার', studentId: 'STU-2024-006', class: 'Class 7', section: 'A', roll: 8, feeHead: 'Lab Fee', category: 'Facility', amount: 1500, discount: 0, paid: 1500, due: 0, status: 'paid', dueDate: '2025-03-10', paidDate: '2025-03-05', month: 'March 2025', paymentMethod: 'nagad', receiptNo: 'RCP-004', collectedBy: 'Accountant' },
  { id: '7', invoiceNo: 'INV-2025-007', studentName: 'Tariq Islam', studentNameBn: 'তারিক ইসলাম', studentId: 'STU-2024-007', class: 'Class 9', section: 'A', roll: 4, feeHead: 'Tuition Fee', category: 'Academic', amount: 4500, discount: 0, paid: 0, due: 4500, status: 'overdue', dueDate: '2025-01-31', month: 'January 2025' },
  { id: '8', invoiceNo: 'INV-2025-008', studentName: 'Mitu Das', studentNameBn: 'মিতু দাস', studentId: 'STU-2024-008', class: 'Class 8', section: 'B', roll: 2, feeHead: 'Tuition Fee', category: 'Academic', amount: 4000, discount: 0, paid: 4000, due: 0, status: 'paid', dueDate: '2025-03-10', paidDate: '2025-03-09', month: 'March 2025', paymentMethod: 'bank', receiptNo: 'RCP-005', collectedBy: 'Accountant' },
  { id: '9', invoiceNo: 'INV-2025-009', studentName: 'Imran Hossain', studentNameBn: 'ইমরান হোসেন', studentId: 'STU-2024-009', class: 'Class 10', section: 'A', roll: 5, feeHead: 'Lab Fee', category: 'Facility', amount: 1500, discount: 0, paid: 1500, due: 0, status: 'paid', dueDate: '2025-03-10', paidDate: '2025-03-07', month: 'March 2025', paymentMethod: 'cash', receiptNo: 'RCP-006', collectedBy: 'Front Desk' },
  { id: '10', invoiceNo: 'INV-2025-010', studentName: 'Sumaiya Rahman', studentNameBn: 'সুমাইয়া রহমান', studentId: 'STU-2024-010', class: 'Class 9', section: 'A', roll: 2, feeHead: 'Tuition Fee', category: 'Academic', amount: 4500, discount: 0, paid: 2000, due: 2500, status: 'partial', dueDate: '2025-03-10', month: 'March 2025', paymentMethod: 'bkash', receiptNo: 'RCP-007', collectedBy: 'Accountant' },
  { id: '11', invoiceNo: 'INV-2025-011', studentName: 'Shakil Ahmed', studentNameBn: 'শাকিল আহমেদ', studentId: 'STU-2024-011', class: 'Class 7', section: 'B', roll: 1, feeHead: 'Tuition Fee', category: 'Academic', amount: 4500, discount: 0, paid: 4500, due: 0, status: 'paid', dueDate: '2025-03-10', paidDate: '2025-03-10', month: 'March 2025', paymentMethod: 'cash', receiptNo: 'RCP-008', collectedBy: 'Accountant' },
  { id: '12', invoiceNo: 'INV-2025-012', studentName: 'Rahim Uddin', studentNameBn: 'রহিম উদ্দিন', studentId: 'STU-2024-003', class: 'Class 9', section: 'B', roll: 1, feeHead: 'Lab Fee', category: 'Facility', amount: 1500, discount: 0, paid: 0, due: 1500, status: 'overdue', dueDate: '2025-02-28', month: 'February 2025' },
  { id: '13', invoiceNo: 'INV-2025-013', studentName: 'Tariq Islam', studentNameBn: 'তারিক ইসলাম', studentId: 'STU-2024-007', class: 'Class 9', section: 'A', roll: 4, feeHead: 'Exam Fee', category: 'Examination', amount: 2000, discount: 0, paid: 0, due: 2000, status: 'overdue', dueDate: '2025-02-15', month: 'February 2025' },
  { id: '14', invoiceNo: 'INV-2025-014', studentName: 'Ahmed Khan', studentNameBn: 'আহমেদ খান', studentId: 'STU-2024-001', class: 'Class 10', section: 'A', roll: 1, feeHead: 'Lab Fee', category: 'Facility', amount: 1500, discount: 0, paid: 1500, due: 0, status: 'paid', dueDate: '2025-03-10', paidDate: '2025-03-08', month: 'March 2025', paymentMethod: 'bkash', receiptNo: 'RCP-009', collectedBy: 'Accountant' },
  { id: '15', invoiceNo: 'INV-2025-015', studentName: 'Fatima Begum', studentNameBn: 'ফাতিমা বেগম', studentId: 'STU-2024-002', class: 'Class 10', section: 'A', roll: 2, feeHead: 'Development Fee', category: 'Admission', amount: 3000, discount: 0, paid: 0, due: 3000, status: 'pending', dueDate: '2025-04-01', month: 'April 2025' },
];

export interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  paidTo: string;
  paymentMethod: 'cash' | 'bank' | 'cheque' | 'bkash';
  approvedBy: string;
  voucherNo: string;
  status: 'approved' | 'pending' | 'rejected';
}

export const expenses: Expense[] = [
  { id: '1', date: '2025-03-18', category: 'Salary', description: 'March salary — Teaching staff (15 teachers)', amount: 450000, paidTo: 'Staff Accounts', paymentMethod: 'bank', approvedBy: 'Principal', voucherNo: 'VCH-2025-001', status: 'approved' },
  { id: '2', date: '2025-03-17', category: 'Utilities', description: 'Electricity bill — March 2025', amount: 35000, paidTo: 'DPDC', paymentMethod: 'bank', approvedBy: 'Admin', voucherNo: 'VCH-2025-002', status: 'approved' },
  { id: '3', date: '2025-03-15', category: 'Maintenance', description: 'Classroom AC repair — Room 201 & 305', amount: 12000, paidTo: 'Cool Zone Service', paymentMethod: 'cash', approvedBy: 'Admin', voucherNo: 'VCH-2025-003', status: 'approved' },
  { id: '4', date: '2025-03-14', category: 'Supplies', description: 'Science lab chemicals and equipment', amount: 28000, paidTo: 'Hatirjheel Lab Suppliers', paymentMethod: 'cheque', approvedBy: 'Principal', voucherNo: 'VCH-2025-004', status: 'approved' },
  { id: '5', date: '2025-03-12', category: 'Printing', description: 'Exam papers & answer sheets (Mid-term)', amount: 8500, paidTo: 'Ideal Printing Press', paymentMethod: 'cash', approvedBy: 'Exam Controller', voucherNo: 'VCH-2025-005', status: 'approved' },
  { id: '6', date: '2025-03-10', category: 'Transport', description: 'Student field trip — National Museum', amount: 15000, paidTo: 'Green Transport Co.', paymentMethod: 'cash', approvedBy: 'Admin', voucherNo: 'VCH-2025-006', status: 'approved' },
  { id: '7', date: '2025-03-08', category: 'IT & Software', description: 'ERP subscription — March 2025', amount: 5000, paidTo: 'EduSaaS Platform', paymentMethod: 'bkash', approvedBy: 'Admin', voucherNo: 'VCH-2025-007', status: 'approved' },
  { id: '8', date: '2025-03-05', category: 'Salary', description: 'Non-teaching staff salary — March', amount: 120000, paidTo: 'Staff Accounts', paymentMethod: 'bank', approvedBy: 'Principal', voucherNo: 'VCH-2025-008', status: 'approved' },
  { id: '9', date: '2025-03-19', category: 'Maintenance', description: 'Washroom plumbing repair', amount: 6500, paidTo: 'Ali Plumbing Works', paymentMethod: 'cash', approvedBy: 'Admin', voucherNo: 'VCH-2025-009', status: 'pending' },
  { id: '10', date: '2025-03-19', category: 'Events', description: 'Annual Day decoration materials', amount: 22000, paidTo: 'Party Palace', paymentMethod: 'cash', approvedBy: '', voucherNo: 'VCH-2025-010', status: 'pending' },
];

export const expenseCategories = ['Salary', 'Utilities', 'Maintenance', 'Supplies', 'Printing', 'Transport', 'IT & Software', 'Events', 'Miscellaneous'];

export const monthlyFinanceData = [
  { month: 'Oct', income: 195000, expense: 142000, profit: 53000 },
  { month: 'Nov', income: 210000, expense: 155000, profit: 55000 },
  { month: 'Dec', income: 180000, expense: 138000, profit: 42000 },
  { month: 'Jan', income: 220000, expense: 150000, profit: 70000 },
  { month: 'Feb', income: 235000, expense: 145000, profit: 90000 },
  { month: 'Mar', income: 245000, expense: 160000, profit: 85000 },
];

export const incomeByCategory = [
  { name: 'Tuition', value: 145000, fill: 'hsl(172, 66%, 30%)' },
  { name: 'Exam', value: 32000, fill: 'hsl(210, 80%, 52%)' },
  { name: 'Lab/Facility', value: 28000, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Admission', value: 25000, fill: 'hsl(280, 60%, 50%)' },
  { name: 'Others', value: 15000, fill: 'hsl(0, 0%, 60%)' },
];

export const expenseByCategory = [
  { name: 'Salary', value: 570000, fill: 'hsl(172, 66%, 30%)' },
  { name: 'Utilities', value: 35000, fill: 'hsl(210, 80%, 52%)' },
  { name: 'Maintenance', value: 18500, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Supplies', value: 28000, fill: 'hsl(280, 60%, 50%)' },
  { name: 'Others', value: 28500, fill: 'hsl(0, 0%, 60%)' },
];

export interface OverdueStudent {
  studentId: string;
  name: string;
  nameBn: string;
  class: string;
  section: string;
  roll: number;
  guardianPhone: string;
  totalDue: number;
  overdueMonths: number;
  lastPaymentDate?: string;
  invoiceCount: number;
}

export const overdueStudents: OverdueStudent[] = [
  { studentId: 'STU-2024-007', name: 'Tariq Islam', nameBn: 'তারিক ইসলাম', class: 'Class 9', section: 'A', roll: 4, guardianPhone: '01812345684', totalDue: 11000, overdueMonths: 3, lastPaymentDate: '2024-12-15', invoiceCount: 3 },
  { studentId: 'STU-2024-003', name: 'Rahim Uddin', nameBn: 'রহিম উদ্দিন', class: 'Class 9', section: 'B', roll: 1, guardianPhone: '01812345680', totalDue: 6000, overdueMonths: 2, invoiceCount: 2 },
  { studentId: 'STU-2024-002', name: 'Fatima Begum', nameBn: 'ফাতিমা বেগম', class: 'Class 10', section: 'A', roll: 2, guardianPhone: '01812345679', totalDue: 2000, overdueMonths: 1, lastPaymentDate: '2025-03-10', invoiceCount: 1 },
  { studentId: 'STU-2024-010', name: 'Sumaiya Rahman', nameBn: 'সুমাইয়া রহমান', class: 'Class 9', section: 'A', roll: 2, guardianPhone: '01812345691', totalDue: 2500, overdueMonths: 1, lastPaymentDate: '2025-03-10', invoiceCount: 1 },
  { studentId: 'STU-2024-005', name: 'Sohel Rana', nameBn: 'সোহেল রানা', class: 'Class 10', section: 'B', roll: 3, guardianPhone: '01812345682', totalDue: 4500, overdueMonths: 1, invoiceCount: 1 },
];

export const financeStatsExtended = {
  totalCollection: 1850000,
  totalDue: 425000,
  thisMonthCollection: 245000,
  lastMonthCollection: 235000,
  totalExpense: 680000,
  thisMonthExpense: 160000,
  paidInvoices: 842,
  overdueInvoices: 45,
  pendingInvoices: 23,
  totalStudents: 312,
  paidStudents: 267,
  netProfit: 1170000,
  collectionRate: 81.3,
};

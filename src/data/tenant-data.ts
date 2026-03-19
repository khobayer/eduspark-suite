// Comprehensive Tenant mock data

// ============ TEACHERS / STAFF ============
export interface Teacher {
  id: string;
  name: string;
  nameBn: string;
  employeeId: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  gender: 'male' | 'female';
  qualification: string;
  subjects: string[];
}

export const teachers: Teacher[] = [
  { id: '1', name: 'Dr. Kamal Hossain', nameBn: 'ড. কামাল হোসেন', employeeId: 'TCH-001', designation: 'Head Teacher', department: 'Administration', phone: '01711111111', email: 'kamal@dms.edu', joinDate: '2015-01-10', status: 'active', gender: 'male', qualification: 'PhD in Education', subjects: ['Bangla', 'Social Science'] },
  { id: '2', name: 'Nasreen Akter', nameBn: 'নাসরিন আক্তার', employeeId: 'TCH-002', designation: 'Senior Teacher', department: 'Science', phone: '01711111112', email: 'nasreen@dms.edu', joinDate: '2017-06-15', status: 'active', gender: 'female', qualification: 'MSc Physics', subjects: ['Physics', 'Mathematics'] },
  { id: '3', name: 'Md. Rafiq Islam', nameBn: 'মো. রফিক ইসলাম', employeeId: 'TCH-003', designation: 'Assistant Teacher', department: 'Mathematics', phone: '01711111113', email: 'rafiq@dms.edu', joinDate: '2019-02-01', status: 'active', gender: 'male', qualification: 'BSc Mathematics', subjects: ['Mathematics', 'ICT'] },
  { id: '4', name: 'Fatema Khatun', nameBn: 'ফাতেমা খাতুন', employeeId: 'TCH-004', designation: 'Senior Teacher', department: 'English', phone: '01711111114', email: 'fatema@dms.edu', joinDate: '2016-08-20', status: 'on_leave', gender: 'female', qualification: 'MA English', subjects: ['English'] },
  { id: '5', name: 'Abdul Karim', nameBn: 'আব্দুল করিম', employeeId: 'TCH-005', designation: 'Assistant Teacher', department: 'Arabic', phone: '01711111115', email: 'karim@dms.edu', joinDate: '2020-01-05', status: 'active', gender: 'male', qualification: 'BA Arabic', subjects: ['Arabic', 'Islamic Studies'] },
  { id: '6', name: 'Sultana Razia', nameBn: 'সুলতানা রাজিয়া', employeeId: 'TCH-006', designation: 'Lab Instructor', department: 'Science', phone: '01711111116', email: 'sultana@dms.edu', joinDate: '2021-03-10', status: 'active', gender: 'female', qualification: 'BSc Chemistry', subjects: ['Chemistry', 'Biology'] },
];

// ============ ACADEMIC STRUCTURE ============
export interface ClassSection {
  id: string;
  name: string;
  nameBn: string;
  sections: { id: string; name: string; capacity: number; enrolled: number; classTeacher: string }[];
  subjects: string[];
}

export const classStructure: ClassSection[] = [
  { id: '1', name: 'Class 6', nameBn: 'ষষ্ঠ শ্রেণি', sections: [
    { id: '6a', name: 'A', capacity: 50, enrolled: 45, classTeacher: 'Abdul Karim' },
    { id: '6b', name: 'B', capacity: 50, enrolled: 42, classTeacher: 'Sultana Razia' },
  ], subjects: ['Bangla', 'English', 'Mathematics', 'Science', 'Social Science', 'ICT', 'Arabic'] },
  { id: '2', name: 'Class 7', nameBn: 'সপ্তম শ্রেণি', sections: [
    { id: '7a', name: 'A', capacity: 50, enrolled: 48, classTeacher: 'Nasreen Akter' },
    { id: '7b', name: 'B', capacity: 50, enrolled: 44, classTeacher: 'Md. Rafiq Islam' },
  ], subjects: ['Bangla', 'English', 'Mathematics', 'Science', 'Social Science', 'ICT'] },
  { id: '3', name: 'Class 8', nameBn: 'অষ্টম শ্রেণি', sections: [
    { id: '8a', name: 'A', capacity: 50, enrolled: 47, classTeacher: 'Fatema Khatun' },
    { id: '8b', name: 'B', capacity: 50, enrolled: 40, classTeacher: 'Abdul Karim' },
  ], subjects: ['Bangla', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'ICT'] },
  { id: '4', name: 'Class 9', nameBn: 'নবম শ্রেণি', sections: [
    { id: '9a', name: 'A', capacity: 55, enrolled: 52, classTeacher: 'Nasreen Akter' },
    { id: '9b', name: 'B', capacity: 55, enrolled: 49, classTeacher: 'Md. Rafiq Islam' },
  ], subjects: ['Bangla', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Higher Math', 'ICT'] },
  { id: '5', name: 'Class 10', nameBn: 'দশম শ্রেণি', sections: [
    { id: '10a', name: 'A', capacity: 55, enrolled: 50, classTeacher: 'Dr. Kamal Hossain' },
    { id: '10b', name: 'B', capacity: 55, enrolled: 48, classTeacher: 'Sultana Razia' },
  ], subjects: ['Bangla', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Higher Math', 'ICT'] },
];

export interface AcademicSession {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
}

export const academicSessions: AcademicSession[] = [
  { id: '1', name: '2025', startDate: '2025-01-01', endDate: '2025-12-31', status: 'active' },
  { id: '2', name: '2024', startDate: '2024-01-01', endDate: '2024-12-31', status: 'completed' },
  { id: '3', name: '2026', startDate: '2026-01-01', endDate: '2026-12-31', status: 'upcoming' },
];

// ============ ATTENDANCE ============
export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  roll: number;
  status: 'present' | 'absent' | 'late' | 'leave';
}

export const dailyAttendance: AttendanceRecord[] = [
  { studentId: '1', studentName: 'Ahmed Khan', roll: 1, status: 'present' },
  { studentId: '2', studentName: 'Fatima Begum', roll: 2, status: 'present' },
  { studentId: '3', studentName: 'Rahim Uddin', roll: 3, status: 'absent' },
  { studentId: '4', studentName: 'Nusrat Jahan', roll: 4, status: 'present' },
  { studentId: '5', studentName: 'Sohel Rana', roll: 5, status: 'late' },
  { studentId: '6', studentName: 'Rubina Akter', roll: 6, status: 'present' },
  { studentId: '7', studentName: 'Tariq Islam', roll: 7, status: 'leave' },
  { studentId: '8', studentName: 'Mitu Das', roll: 8, status: 'present' },
  { studentId: '9', studentName: 'Arif Hasan', roll: 9, status: 'present' },
  { studentId: '10', studentName: 'Sumaiya Islam', roll: 10, status: 'present' },
  { studentId: '11', studentName: 'Shakil Ahmed', roll: 11, status: 'absent' },
  { studentId: '12', studentName: 'Riya Sultana', roll: 12, status: 'present' },
];

export const attendanceSummary = [
  { date: 'Mar 13', present: 45, absent: 3, late: 2 },
  { date: 'Mar 14', present: 44, absent: 4, late: 2 },
  { date: 'Mar 15', present: 46, absent: 2, late: 2 },
  { date: 'Mar 16', present: 43, absent: 5, late: 2 },
  { date: 'Mar 17', present: 47, absent: 1, late: 2 },
  { date: 'Mar 18', present: 44, absent: 4, late: 2 },
  { date: 'Mar 19', present: 45, absent: 3, late: 2 },
];

// ============ EXAMS ============
export interface Exam {
  id: string;
  name: string;
  nameBn: string;
  type: 'term' | 'mid_term' | 'final' | 'class_test' | 'mock';
  session: string;
  classes: string[];
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'published';
  totalMarks: number;
}

export const exams: Exam[] = [
  { id: '1', name: '1st Term Exam', nameBn: 'প্রথম সাময়িক পরীক্ষা', type: 'term', session: '2025', classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'], startDate: '2025-04-01', endDate: '2025-04-10', status: 'upcoming', totalMarks: 100 },
  { id: '2', name: 'Mid-Term Exam', nameBn: 'অর্ধ-বার্ষিক পরীক্ষা', type: 'mid_term', session: '2025', classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'], startDate: '2025-06-15', endDate: '2025-06-25', status: 'upcoming', totalMarks: 100 },
  { id: '3', name: 'Class Test - March', nameBn: 'শ্রেণি পরীক্ষা - মার্চ', type: 'class_test', session: '2025', classes: ['Class 10'], startDate: '2025-03-15', endDate: '2025-03-15', status: 'completed', totalMarks: 30 },
  { id: '4', name: 'Annual Exam 2024', nameBn: 'বার্ষিক পরীক্ষা ২০২৪', type: 'final', session: '2024', classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'], startDate: '2024-11-20', endDate: '2024-12-05', status: 'published', totalMarks: 100 },
  { id: '5', name: 'SSC Mock Test', nameBn: 'এসএসসি মক টেস্ট', type: 'mock', session: '2025', classes: ['Class 10'], startDate: '2025-01-10', endDate: '2025-01-15', status: 'published', totalMarks: 100 },
];

export interface ExamResult {
  studentName: string;
  roll: number;
  bangla: number;
  english: number;
  math: number;
  physics: number;
  chemistry: number;
  total: number;
  gpa: number;
  grade: string;
}

export const examResults: ExamResult[] = [
  { studentName: 'Ahmed Khan', roll: 1, bangla: 78, english: 82, math: 90, physics: 85, chemistry: 88, total: 423, gpa: 4.67, grade: 'A+' },
  { studentName: 'Fatima Begum', roll: 2, bangla: 85, english: 78, math: 72, physics: 68, chemistry: 75, total: 378, gpa: 4.00, grade: 'A' },
  { studentName: 'Rahim Uddin', roll: 3, bangla: 65, english: 58, math: 45, physics: 52, chemistry: 55, total: 275, gpa: 2.83, grade: 'B' },
  { studentName: 'Nusrat Jahan', roll: 4, bangla: 92, english: 88, math: 95, physics: 90, chemistry: 92, total: 457, gpa: 5.00, grade: 'A+' },
  { studentName: 'Sohel Rana', roll: 5, bangla: 55, english: 60, math: 38, physics: 42, chemistry: 48, total: 243, gpa: 2.33, grade: 'C' },
  { studentName: 'Rubina Akter', roll: 6, bangla: 72, english: 68, math: 65, physics: 70, chemistry: 62, total: 337, gpa: 3.50, grade: 'A-' },
];

// ============ NOTICES ============
export interface Notice {
  id: string;
  title: string;
  titleBn: string;
  content: string;
  category: 'general' | 'academic' | 'exam' | 'event' | 'holiday';
  date: string;
  pinned: boolean;
}

export const notices: Notice[] = [
  { id: '1', title: 'Annual Sports Day', titleBn: 'বার্ষিক ক্রীড়া দিবস', content: 'Annual sports day will be held on March 25, 2025. All students must participate.', category: 'event', date: '2025-03-19', pinned: true },
  { id: '2', title: '1st Term Exam Schedule', titleBn: 'প্রথম সাময়িক পরীক্ষার সময়সূচি', content: 'First term examination will start from April 1, 2025.', category: 'exam', date: '2025-03-18', pinned: true },
  { id: '3', title: 'Independence Day Holiday', titleBn: 'স্বাধীনতা দিবসের ছুটি', content: 'School will remain closed on March 26 for Independence Day.', category: 'holiday', date: '2025-03-17', pinned: false },
  { id: '4', title: 'Parent-Teacher Meeting', titleBn: 'অভিভাবক-শিক্ষক সভা', content: 'PTM scheduled for March 22 at 10:00 AM in the auditorium.', category: 'general', date: '2025-03-15', pinned: false },
  { id: '5', title: 'Science Fair Registration', titleBn: 'বিজ্ঞান মেলা নিবন্ধন', content: 'Registration for annual science fair is now open. Last date: March 30.', category: 'academic', date: '2025-03-14', pinned: false },
];

// ============ BROADCAST ============
export interface BroadcastMessage {
  id: string;
  subject: string;
  channel: 'sms' | 'whatsapp' | 'email';
  recipients: string;
  recipientCount: number;
  sentAt: string;
  status: 'sent' | 'scheduled' | 'failed' | 'draft';
  deliveredCount: number;
}

export const broadcastMessages: BroadcastMessage[] = [
  { id: '1', subject: 'Exam schedule reminder', channel: 'sms', recipients: 'All Parents - Class 10', recipientCount: 98, sentAt: '2025-03-19 10:30', status: 'sent', deliveredCount: 95 },
  { id: '2', subject: 'Fee payment due notice', channel: 'sms', recipients: 'Due Fee Parents', recipientCount: 45, sentAt: '2025-03-18 09:00', status: 'sent', deliveredCount: 43 },
  { id: '3', subject: 'PTM invitation', channel: 'whatsapp', recipients: 'All Parents', recipientCount: 650, sentAt: '2025-03-17 14:00', status: 'sent', deliveredCount: 620 },
  { id: '4', subject: 'Holiday notice - March 26', channel: 'sms', recipients: 'All Students & Staff', recipientCount: 1320, sentAt: '2025-03-17 08:00', status: 'sent', deliveredCount: 1298 },
  { id: '5', subject: 'Monthly progress report', channel: 'email', recipients: 'All Parents - Class 9', recipientCount: 102, sentAt: '', status: 'scheduled', deliveredCount: 0 },
  { id: '6', subject: 'Sports day registration', channel: 'sms', recipients: 'Selected Students', recipientCount: 200, sentAt: '', status: 'draft', deliveredCount: 0 },
];

// ============ GRADING SYSTEM ============
export interface GradeScale {
  grade: string;
  gpa: number;
  marksFrom: number;
  marksTo: number;
}

export const gradeScales: GradeScale[] = [
  { grade: 'A+', gpa: 5.00, marksFrom: 80, marksTo: 100 },
  { grade: 'A', gpa: 4.00, marksFrom: 70, marksTo: 79 },
  { grade: 'A-', gpa: 3.50, marksFrom: 60, marksTo: 69 },
  { grade: 'B', gpa: 3.00, marksFrom: 50, marksTo: 59 },
  { grade: 'C', gpa: 2.00, marksFrom: 40, marksTo: 49 },
  { grade: 'D', gpa: 1.00, marksFrom: 33, marksTo: 39 },
  { grade: 'F', gpa: 0.00, marksFrom: 0, marksTo: 32 },
];

// ============ SETTINGS / ROLES ============
export interface TenantRole {
  id: string;
  name: string;
  nameBn: string;
  userCount: number;
  permissions: string[];
  isSystem: boolean;
}

export const tenantRoles: TenantRole[] = [
  { id: '1', name: 'Owner', nameBn: 'মালিক', userCount: 1, permissions: ['all'], isSystem: true },
  { id: '2', name: 'Admin', nameBn: 'অ্যাডমিন', userCount: 2, permissions: ['manage_students', 'manage_teachers', 'manage_finance', 'manage_exams', 'manage_settings'], isSystem: true },
  { id: '3', name: 'Accountant', nameBn: 'হিসাবরক্ষক', userCount: 1, permissions: ['manage_finance', 'view_students'], isSystem: true },
  { id: '4', name: 'Teacher', nameBn: 'শিক্ষক', userCount: 45, permissions: ['view_students', 'manage_attendance', 'manage_exams', 'view_reports'], isSystem: true },
  { id: '5', name: 'Exam Controller', nameBn: 'পরীক্ষা নিয়ন্ত্রক', userCount: 2, permissions: ['manage_exams', 'view_students', 'view_reports'], isSystem: false },
  { id: '6', name: 'Front Desk', nameBn: 'ফ্রন্ট ডেস্ক', userCount: 3, permissions: ['view_students', 'manage_attendance', 'view_finance'], isSystem: false },
  { id: '7', name: 'Parent', nameBn: 'অভিভাবক', userCount: 620, permissions: ['view_own_student', 'view_own_finance', 'view_notices'], isSystem: true },
];

// Student Portal mock data

export const studentProfile = {
  id: 'STU-2024-001',
  name: 'Ahmed Khan',
  nameBn: 'আহমেদ খান',
  class: 'Class 10',
  section: 'A',
  roll: 1,
  session: '2025',
  dob: '2008-03-20',
  bloodGroup: 'A+',
  gender: 'Male',
  phone: '01712345678',
  email: 'ahmed.khan@student.dms.edu',
  address: '42 Green Road, Dhanmondi, Dhaka-1205',
  admissionDate: '2022-01-15',
  fatherName: 'Karim Khan',
  motherName: 'Fatema Khan',
  guardianPhone: '01812345678',
};

export const studentAttendanceSummary = {
  totalDays: 180,
  present: 168,
  absent: 8,
  late: 4,
  percentage: 93.3,
};

export const studentMonthlyAttendance = [
  { month: 'Jan', present: 22, absent: 1, late: 0 },
  { month: 'Feb', present: 20, absent: 2, late: 1 },
  { month: 'Mar', present: 18, absent: 1, late: 1 },
  { month: 'Apr', present: 21, absent: 0, late: 1 },
  { month: 'May', present: 20, absent: 2, late: 0 },
  { month: 'Jun', present: 22, absent: 0, late: 0 },
];

export const studentFees = [
  { id: '1', feeHead: 'Tuition Fee', month: 'March 2025', amount: 5000, paid: 5000, due: 0, status: 'paid' as const, paidDate: '2025-03-08' },
  { id: '2', feeHead: 'Tuition Fee', month: 'February 2025', amount: 5000, paid: 5000, due: 0, status: 'paid' as const, paidDate: '2025-02-10' },
  { id: '3', feeHead: 'Exam Fee', month: '1st Term 2025', amount: 2000, paid: 0, due: 2000, status: 'pending' as const },
  { id: '4', feeHead: 'Tuition Fee', month: 'January 2025', amount: 5000, paid: 5000, due: 0, status: 'paid' as const, paidDate: '2025-01-12' },
  { id: '5', feeHead: 'Lab Fee', month: 'Q1 2025', amount: 1500, paid: 1500, due: 0, status: 'paid' as const, paidDate: '2025-01-15' },
  { id: '6', feeHead: 'Sports Fee', month: '2025', amount: 1000, paid: 0, due: 1000, status: 'overdue' as const },
];

export const studentResults = [
  {
    examName: 'SSC Mock Test',
    session: '2025',
    subjects: [
      { name: 'Bangla', fullMarks: 100, obtained: 78, grade: 'A' },
      { name: 'English', fullMarks: 100, obtained: 82, grade: 'A+' },
      { name: 'Mathematics', fullMarks: 100, obtained: 90, grade: 'A+' },
      { name: 'Physics', fullMarks: 100, obtained: 85, grade: 'A+' },
      { name: 'Chemistry', fullMarks: 100, obtained: 88, grade: 'A+' },
    ],
    totalMarks: 500,
    obtained: 423,
    gpa: 4.67,
    grade: 'A+',
    position: 4,
    totalStudents: 50,
  },
  {
    examName: 'Annual Exam 2024',
    session: '2024',
    subjects: [
      { name: 'Bangla', fullMarks: 100, obtained: 72, grade: 'A' },
      { name: 'English', fullMarks: 100, obtained: 75, grade: 'A' },
      { name: 'Mathematics', fullMarks: 100, obtained: 85, grade: 'A+' },
      { name: 'Physics', fullMarks: 100, obtained: 80, grade: 'A+' },
      { name: 'Chemistry', fullMarks: 100, obtained: 82, grade: 'A+' },
    ],
    totalMarks: 500,
    obtained: 394,
    gpa: 4.33,
    grade: 'A',
    position: 6,
    totalStudents: 48,
  },
];

export const studentNotices = [
  { id: '1', title: 'Annual Sports Day', date: '2025-03-19', category: 'event', content: 'Annual sports day will be held on March 25.' },
  { id: '2', title: '1st Term Exam Schedule', date: '2025-03-18', category: 'exam', content: 'First term exam starts April 1.' },
  { id: '3', title: 'Independence Day Holiday', date: '2025-03-17', category: 'holiday', content: 'School closed on March 26.' },
  { id: '4', title: 'Science Fair Registration', date: '2025-03-14', category: 'academic', content: 'Registration open. Last date March 30.' },
];

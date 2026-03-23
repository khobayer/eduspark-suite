// Admission module mock data

export interface AdmissionApplication {
  id: string;
  applicationNo: string;
  studentName: string;
  studentNameBn: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  gender: 'male' | 'female';
  dob: string;
  applyingFor: string;
  previousSchool: string;
  previousClass: string;
  previousResult: string;
  source: 'website' | 'walk_in' | 'referral' | 'social_media' | 'newspaper';
  stage: 'inquiry' | 'applied' | 'document_review' | 'test_scheduled' | 'interview' | 'approved' | 'enrolled' | 'rejected' | 'cancelled';
  submittedAt: string;
  documents: { name: string; status: 'uploaded' | 'pending' | 'verified' | 'rejected' }[];
  guardians: { name: string; relation: string; phone: string; occupation: string }[];
  admissionFee: { amount: number; paid: boolean; method?: string };
  notes: string;
  assignedClass?: string;
  assignedSection?: string;
  testScore?: number;
  interviewDate?: string;
}

export const admissionApplications: AdmissionApplication[] = [
  {
    id: '1', applicationNo: 'ADM-2025-001', studentName: 'Sabbir Hossain', studentNameBn: 'সাব্বির হোসেন',
    fatherName: 'Md. Karim Hossain', motherName: 'Salma Begum', phone: '01711223344', email: 'sabbir@mail.com',
    gender: 'male', dob: '2010-05-15', applyingFor: 'Class 6', previousSchool: 'ABC Primary School',
    previousClass: 'Class 5', previousResult: 'GPA 4.5', source: 'website', stage: 'approved',
    submittedAt: '2025-03-01', notes: 'Excellent previous record',
    documents: [
      { name: 'Birth Certificate', status: 'verified' },
      { name: 'Previous Result', status: 'verified' },
      { name: 'Transfer Certificate', status: 'pending' },
      { name: 'Passport Photo', status: 'uploaded' },
    ],
    guardians: [
      { name: 'Md. Karim Hossain', relation: 'Father', phone: '01711223344', occupation: 'Business' },
      { name: 'Salma Begum', relation: 'Mother', phone: '01711223345', occupation: 'Homemaker' },
    ],
    admissionFee: { amount: 5000, paid: true, method: 'bKash' },
    assignedClass: 'Class 6', assignedSection: 'A', testScore: 82,
    interviewDate: '2025-03-10',
  },
  {
    id: '2', applicationNo: 'ADM-2025-002', studentName: 'Tania Sultana', studentNameBn: 'তানিয়া সুলতানা',
    fatherName: 'Sultan Ahmed', motherName: 'Rashida Begum', phone: '01811223344', email: 'tania@mail.com',
    gender: 'female', dob: '2011-08-22', applyingFor: 'Class 7', previousSchool: 'XYZ School',
    previousClass: 'Class 6', previousResult: 'GPA 4.0', source: 'referral', stage: 'test_scheduled',
    submittedAt: '2025-03-05', notes: '',
    documents: [
      { name: 'Birth Certificate', status: 'uploaded' },
      { name: 'Previous Result', status: 'uploaded' },
      { name: 'Transfer Certificate', status: 'pending' },
      { name: 'Passport Photo', status: 'uploaded' },
    ],
    guardians: [
      { name: 'Sultan Ahmed', relation: 'Father', phone: '01811223344', occupation: 'Teacher' },
    ],
    admissionFee: { amount: 5000, paid: false },
    interviewDate: '2025-03-22',
  },
  {
    id: '3', applicationNo: 'ADM-2025-003', studentName: 'Rafiq Ahmed', studentNameBn: 'রফিক আহমেদ',
    fatherName: 'Ahmed Ali', motherName: 'Hasina Begum', phone: '01911223344', email: 'rafiq@mail.com',
    gender: 'male', dob: '2009-01-10', applyingFor: 'Class 8', previousSchool: 'Model School',
    previousClass: 'Class 7', previousResult: 'GPA 3.8', source: 'walk_in', stage: 'document_review',
    submittedAt: '2025-03-08', notes: 'Needs financial assistance',
    documents: [
      { name: 'Birth Certificate', status: 'uploaded' },
      { name: 'Previous Result', status: 'pending' },
      { name: 'Transfer Certificate', status: 'pending' },
      { name: 'Passport Photo', status: 'pending' },
    ],
    guardians: [
      { name: 'Ahmed Ali', relation: 'Father', phone: '01911223344', occupation: 'Farmer' },
      { name: 'Hasina Begum', relation: 'Mother', phone: '01911223345', occupation: 'Homemaker' },
    ],
    admissionFee: { amount: 5000, paid: false },
  },
  {
    id: '4', applicationNo: 'ADM-2025-004', studentName: 'Nadia Islam', studentNameBn: 'নাদিয়া ইসলাম',
    fatherName: 'Shariful Islam', motherName: 'Monira Begum', phone: '01611223344', email: 'nadia@mail.com',
    gender: 'female', dob: '2012-11-05', applyingFor: 'Class 6', previousSchool: 'Green Land School',
    previousClass: 'Class 5', previousResult: 'GPA 5.0', source: 'social_media', stage: 'enrolled',
    submittedAt: '2025-02-20', notes: 'Top student from previous school',
    documents: [
      { name: 'Birth Certificate', status: 'verified' },
      { name: 'Previous Result', status: 'verified' },
      { name: 'Transfer Certificate', status: 'verified' },
      { name: 'Passport Photo', status: 'verified' },
    ],
    guardians: [
      { name: 'Shariful Islam', relation: 'Father', phone: '01611223344', occupation: 'Engineer' },
    ],
    admissionFee: { amount: 5000, paid: true, method: 'Bank Transfer' },
    assignedClass: 'Class 6', assignedSection: 'B', testScore: 95,
  },
  {
    id: '5', applicationNo: 'ADM-2025-005', studentName: 'Imran Hossain', studentNameBn: 'ইমরান হোসেন',
    fatherName: 'Jahangir Hossain', motherName: 'Taslima Begum', phone: '01512223344', email: 'imran@mail.com',
    gender: 'male', dob: '2010-04-18', applyingFor: 'Class 9', previousSchool: 'City School',
    previousClass: 'Class 8', previousResult: 'GPA 2.8', source: 'newspaper', stage: 'rejected',
    submittedAt: '2025-02-25', notes: 'Did not meet minimum GPA requirement',
    documents: [
      { name: 'Birth Certificate', status: 'uploaded' },
      { name: 'Previous Result', status: 'verified' },
      { name: 'Transfer Certificate', status: 'pending' },
      { name: 'Passport Photo', status: 'uploaded' },
    ],
    guardians: [
      { name: 'Jahangir Hossain', relation: 'Father', phone: '01512223344', occupation: 'Driver' },
    ],
    admissionFee: { amount: 5000, paid: false },
  },
  {
    id: '6', applicationNo: 'ADM-2025-006', studentName: 'Sadia Rahman', studentNameBn: 'সাদিয়া রহমান',
    fatherName: 'Habibur Rahman', motherName: 'Nasreen Akter', phone: '01312223344', email: 'sadia@mail.com',
    gender: 'female', dob: '2011-07-30', applyingFor: 'Class 7', previousSchool: 'Sunrise Academy',
    previousClass: 'Class 6', previousResult: 'GPA 4.2', source: 'website', stage: 'inquiry',
    submittedAt: '2025-03-15', notes: 'Parent inquired about scholarship',
    documents: [],
    guardians: [
      { name: 'Habibur Rahman', relation: 'Father', phone: '01312223344', occupation: 'Shopkeeper' },
    ],
    admissionFee: { amount: 5000, paid: false },
  },
  {
    id: '7', applicationNo: 'ADM-2025-007', studentName: 'Arif Khan', studentNameBn: 'আরিফ খান',
    fatherName: 'Faruk Khan', motherName: 'Shahana Begum', phone: '01412223344', email: 'arif@mail.com',
    gender: 'male', dob: '2010-09-12', applyingFor: 'Class 8', previousSchool: 'National School',
    previousClass: 'Class 7', previousResult: 'GPA 3.5', source: 'walk_in', stage: 'applied',
    submittedAt: '2025-03-18', notes: '',
    documents: [
      { name: 'Birth Certificate', status: 'uploaded' },
      { name: 'Previous Result', status: 'uploaded' },
      { name: 'Passport Photo', status: 'uploaded' },
    ],
    guardians: [
      { name: 'Faruk Khan', relation: 'Father', phone: '01412223344', occupation: 'Business' },
      { name: 'Shahana Begum', relation: 'Mother', phone: '01412223345', occupation: 'Teacher' },
    ],
    admissionFee: { amount: 5000, paid: false },
  },
  {
    id: '8', applicationNo: 'ADM-2025-008', studentName: 'Meher Afroz', studentNameBn: 'মেহের আফরোজ',
    fatherName: 'Nurul Islam', motherName: 'Jahanara Begum', phone: '01712889900', email: 'meher@mail.com',
    gender: 'female', dob: '2011-02-14', applyingFor: 'Class 6', previousSchool: 'Hope School',
    previousClass: 'Class 5', previousResult: 'GPA 4.8', source: 'referral', stage: 'interview',
    submittedAt: '2025-03-12', notes: 'Referred by existing parent',
    documents: [
      { name: 'Birth Certificate', status: 'verified' },
      { name: 'Previous Result', status: 'verified' },
      { name: 'Transfer Certificate', status: 'uploaded' },
      { name: 'Passport Photo', status: 'verified' },
    ],
    guardians: [
      { name: 'Nurul Islam', relation: 'Father', phone: '01712889900', occupation: 'Doctor' },
      { name: 'Jahanara Begum', relation: 'Mother', phone: '01712889901', occupation: 'Nurse' },
    ],
    admissionFee: { amount: 5000, paid: false },
    interviewDate: '2025-03-20', testScore: 78,
  },
];

export const admissionStats = {
  totalApplications: 8,
  inquiries: 1,
  inProgress: 4,
  approved: 1,
  enrolled: 1,
  rejected: 1,
  conversionRate: 25,
  avgProcessingDays: 12,
};

export const admissionFunnelData = [
  { stage: 'Inquiry', count: 45, color: 'hsl(210, 14%, 70%)' },
  { stage: 'Applied', count: 38, color: 'hsl(172, 66%, 50%)' },
  { stage: 'Doc Review', count: 30, color: 'hsl(172, 66%, 40%)' },
  { stage: 'Test/Interview', count: 22, color: 'hsl(38, 92%, 50%)' },
  { stage: 'Approved', count: 18, color: 'hsl(142, 60%, 40%)' },
  { stage: 'Enrolled', count: 15, color: 'hsl(172, 66%, 30%)' },
];

export const admissionSourceData = [
  { name: 'Website', value: 35, fill: 'hsl(172, 66%, 40%)' },
  { name: 'Walk-in', value: 25, fill: 'hsl(210, 14%, 70%)' },
  { name: 'Referral', value: 20, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Social Media', value: 12, fill: 'hsl(220, 20%, 50%)' },
  { name: 'Newspaper', value: 8, fill: 'hsl(0, 72%, 51%)' },
];

export const admissionMonthlyData = [
  { month: 'Jan', applications: 12, enrolled: 8 },
  { month: 'Feb', applications: 18, enrolled: 12 },
  { month: 'Mar', applications: 25, enrolled: 15 },
  { month: 'Apr', applications: 8, enrolled: 5 },
  { month: 'May', applications: 5, enrolled: 3 },
  { month: 'Jun', applications: 3, enrolled: 2 },
];

export const stageLabels: Record<string, string> = {
  inquiry: 'Inquiry',
  applied: 'Applied',
  document_review: 'Document Review',
  test_scheduled: 'Test Scheduled',
  interview: 'Interview',
  approved: 'Approved',
  enrolled: 'Enrolled',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
};

export const sourceLabels: Record<string, string> = {
  website: 'Website',
  walk_in: 'Walk-in',
  referral: 'Referral',
  social_media: 'Social Media',
  newspaper: 'Newspaper',
};

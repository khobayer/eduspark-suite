// Comprehensive student data for the Students module

export interface Guardian {
  id: string;
  name: string;
  nameBn: string;
  relation: 'father' | 'mother' | 'guardian' | 'uncle' | 'sibling';
  phone: string;
  email?: string;
  occupation: string;
  nid?: string;
  address: string;
  isPrimary: boolean;
}

export interface StudentDocument {
  id: string;
  name: string;
  type: 'birth_certificate' | 'photo' | 'transfer_certificate' | 'marksheet' | 'nid_copy' | 'medical_report' | 'other';
  uploadedAt: string;
  fileSize: string;
  status: 'verified' | 'pending' | 'rejected';
}

export interface EnrollmentRecord {
  id: string;
  session: string;
  class: string;
  section: string;
  roll: number;
  result: 'promoted' | 'retained' | 'transferred_in' | 'transferred_out' | 'current';
  gpa?: number;
  remarks?: string;
}

export interface StudentFull {
  id: string;
  name: string;
  nameBn: string;
  studentId: string;
  class: string;
  section: string;
  roll: number;
  gender: 'male' | 'female';
  phone: string;
  email?: string;
  status: 'enrolled' | 'graduated' | 'expelled' | 'inactive' | 'transferred';
  bloodGroup: string;
  admissionDate: string;
  dob: string;
  religion: string;
  nationality: string;
  address: string;
  photo?: string;
  guardians: Guardian[];
  documents: StudentDocument[];
  enrollmentHistory: EnrollmentRecord[];
  feeStatus: 'paid' | 'partial' | 'overdue';
  attendanceRate: number;
  lastExamGpa?: number;
}

export const studentsExtended: StudentFull[] = [
  {
    id: '1', name: 'Ahmed Khan', nameBn: 'আহমেদ খান', studentId: 'STU-2024-001',
    class: 'Class 10', section: 'A', roll: 1, gender: 'male', phone: '01712345678',
    email: 'ahmed.khan@mail.com', status: 'enrolled', bloodGroup: 'A+',
    admissionDate: '2022-01-15', dob: '2008-03-20', religion: 'Islam', nationality: 'Bangladeshi',
    address: 'House 12, Road 5, Dhanmondi, Dhaka-1205',
    feeStatus: 'paid', attendanceRate: 94, lastExamGpa: 4.75,
    guardians: [
      { id: 'g1', name: 'Karim Khan', nameBn: 'করিম খান', relation: 'father', phone: '01812345678', email: 'karim.khan@mail.com', occupation: 'Business Owner', nid: '1990123456789', address: 'House 12, Road 5, Dhanmondi, Dhaka-1205', isPrimary: true },
      { id: 'g2', name: 'Salma Begum', nameBn: 'সালমা বেগম', relation: 'mother', phone: '01912345678', occupation: 'Teacher', address: 'House 12, Road 5, Dhanmondi, Dhaka-1205', isPrimary: false },
    ],
    documents: [
      { id: 'd1', name: 'Birth Certificate', type: 'birth_certificate', uploadedAt: '2022-01-10', fileSize: '1.2 MB', status: 'verified' },
      { id: 'd2', name: 'Passport Photo', type: 'photo', uploadedAt: '2022-01-10', fileSize: '450 KB', status: 'verified' },
      { id: 'd3', name: 'Previous Marksheet', type: 'marksheet', uploadedAt: '2022-01-12', fileSize: '2.1 MB', status: 'verified' },
    ],
    enrollmentHistory: [
      { id: 'e1', session: '2022', class: 'Class 7', section: 'A', roll: 3, result: 'promoted', gpa: 4.50 },
      { id: 'e2', session: '2023', class: 'Class 8', section: 'A', roll: 2, result: 'promoted', gpa: 4.60 },
      { id: 'e3', session: '2024', class: 'Class 9', section: 'A', roll: 1, result: 'promoted', gpa: 4.75 },
      { id: 'e4', session: '2025', class: 'Class 10', section: 'A', roll: 1, result: 'current' },
    ],
  },
  {
    id: '2', name: 'Fatima Begum', nameBn: 'ফাতিমা বেগম', studentId: 'STU-2024-002',
    class: 'Class 10', section: 'A', roll: 2, gender: 'female', phone: '01712345679',
    status: 'enrolled', bloodGroup: 'B+', admissionDate: '2022-01-15', dob: '2008-05-12',
    religion: 'Islam', nationality: 'Bangladeshi', address: '45/A Mirpur Road, Dhaka-1216',
    feeStatus: 'partial', attendanceRate: 88, lastExamGpa: 4.90,
    guardians: [
      { id: 'g3', name: 'Jamal Uddin', nameBn: 'জামাল উদ্দিন', relation: 'father', phone: '01812345679', occupation: 'Government Officer', nid: '1985678901234', address: '45/A Mirpur Road, Dhaka-1216', isPrimary: true },
    ],
    documents: [
      { id: 'd4', name: 'Birth Certificate', type: 'birth_certificate', uploadedAt: '2022-01-10', fileSize: '980 KB', status: 'verified' },
      { id: 'd5', name: 'Photo', type: 'photo', uploadedAt: '2022-01-10', fileSize: '320 KB', status: 'verified' },
    ],
    enrollmentHistory: [
      { id: 'e5', session: '2022', class: 'Class 7', section: 'B', roll: 1, result: 'promoted', gpa: 4.80 },
      { id: 'e6', session: '2023', class: 'Class 8', section: 'A', roll: 1, result: 'promoted', gpa: 4.85 },
      { id: 'e7', session: '2024', class: 'Class 9', section: 'A', roll: 2, result: 'promoted', gpa: 4.90 },
      { id: 'e8', session: '2025', class: 'Class 10', section: 'A', roll: 2, result: 'current' },
    ],
  },
  {
    id: '3', name: 'Rahim Uddin', nameBn: 'রহিম উদ্দিন', studentId: 'STU-2024-003',
    class: 'Class 9', section: 'B', roll: 1, gender: 'male', phone: '01712345680',
    status: 'enrolled', bloodGroup: 'O+', admissionDate: '2023-01-10', dob: '2009-11-02',
    religion: 'Islam', nationality: 'Bangladeshi', address: 'Uttara Sector 7, Dhaka-1230',
    feeStatus: 'overdue', attendanceRate: 72, lastExamGpa: 3.20,
    guardians: [
      { id: 'g4', name: 'Nuru Mia', nameBn: 'নূরু মিয়া', relation: 'father', phone: '01812345680', occupation: 'Farmer', address: 'Uttara Sector 7, Dhaka-1230', isPrimary: true },
      { id: 'g5', name: 'Hasina Akter', nameBn: 'হাসিনা আক্তার', relation: 'mother', phone: '01612345680', occupation: 'Homemaker', address: 'Uttara Sector 7, Dhaka-1230', isPrimary: false },
    ],
    documents: [
      { id: 'd6', name: 'Birth Certificate', type: 'birth_certificate', uploadedAt: '2023-01-08', fileSize: '1.1 MB', status: 'verified' },
      { id: 'd7', name: 'Transfer Certificate', type: 'transfer_certificate', uploadedAt: '2023-01-08', fileSize: '890 KB', status: 'pending' },
    ],
    enrollmentHistory: [
      { id: 'e9', session: '2023', class: 'Class 8', section: 'B', roll: 5, result: 'transferred_in', remarks: 'From Mymensingh Ideal School' },
      { id: 'e10', session: '2024', class: 'Class 9', section: 'B', roll: 1, result: 'current' },
    ],
  },
  {
    id: '4', name: 'Nusrat Jahan', nameBn: 'নুসরাত জাহান', studentId: 'STU-2024-004',
    class: 'Class 8', section: 'A', roll: 5, gender: 'female', phone: '01712345681',
    status: 'enrolled', bloodGroup: 'AB+', admissionDate: '2023-06-01', dob: '2010-07-15',
    religion: 'Islam', nationality: 'Bangladeshi', address: 'Banani DOHS, Dhaka-1206',
    feeStatus: 'paid', attendanceRate: 96, lastExamGpa: 5.00,
    guardians: [
      { id: 'g6', name: 'Abul Hasan', nameBn: 'আবুল হাসান', relation: 'father', phone: '01812345681', email: 'abul.hasan@corp.com', occupation: 'Software Engineer', nid: '1982345678901', address: 'Banani DOHS, Dhaka-1206', isPrimary: true },
      { id: 'g7', name: 'Ruma Akter', nameBn: 'রুমা আক্তার', relation: 'mother', phone: '01912345681', occupation: 'Doctor', address: 'Banani DOHS, Dhaka-1206', isPrimary: false },
    ],
    documents: [
      { id: 'd8', name: 'Birth Certificate', type: 'birth_certificate', uploadedAt: '2023-05-28', fileSize: '1.0 MB', status: 'verified' },
      { id: 'd9', name: 'Photo', type: 'photo', uploadedAt: '2023-05-28', fileSize: '280 KB', status: 'verified' },
      { id: 'd10', name: 'Medical Report', type: 'medical_report', uploadedAt: '2023-05-30', fileSize: '3.5 MB', status: 'verified' },
      { id: 'd11', name: 'Previous Marksheet', type: 'marksheet', uploadedAt: '2023-05-28', fileSize: '1.8 MB', status: 'verified' },
    ],
    enrollmentHistory: [
      { id: 'e11', session: '2023', class: 'Class 7', section: 'A', roll: 3, result: 'promoted', gpa: 5.00 },
      { id: 'e12', session: '2024', class: 'Class 8', section: 'A', roll: 5, result: 'current' },
    ],
  },
  {
    id: '5', name: 'Sohel Rana', nameBn: 'সোহেল রানা', studentId: 'STU-2024-005',
    class: 'Class 10', section: 'B', roll: 3, gender: 'male', phone: '01712345682',
    status: 'graduated', bloodGroup: 'A-', admissionDate: '2020-01-10', dob: '2006-09-28',
    religion: 'Islam', nationality: 'Bangladeshi', address: 'Mohammadpur, Dhaka-1207',
    feeStatus: 'paid', attendanceRate: 85, lastExamGpa: 4.10,
    guardians: [
      { id: 'g8', name: 'Monir Hossain', nameBn: 'মনির হোসেন', relation: 'father', phone: '01812345682', occupation: 'Shopkeeper', address: 'Mohammadpur, Dhaka-1207', isPrimary: true },
    ],
    documents: [
      { id: 'd12', name: 'Birth Certificate', type: 'birth_certificate', uploadedAt: '2020-01-05', fileSize: '1.3 MB', status: 'verified' },
      { id: 'd13', name: 'Photo', type: 'photo', uploadedAt: '2020-01-05', fileSize: '400 KB', status: 'verified' },
    ],
    enrollmentHistory: [
      { id: 'e13', session: '2020', class: 'Class 6', section: 'B', roll: 8, result: 'promoted', gpa: 3.80 },
      { id: 'e14', session: '2021', class: 'Class 7', section: 'B', roll: 5, result: 'promoted', gpa: 3.90 },
      { id: 'e15', session: '2022', class: 'Class 8', section: 'B', roll: 4, result: 'promoted', gpa: 4.00 },
      { id: 'e16', session: '2023', class: 'Class 9', section: 'B', roll: 3, result: 'promoted', gpa: 4.10 },
      { id: 'e17', session: '2024', class: 'Class 10', section: 'B', roll: 3, result: 'promoted', gpa: 4.10, remarks: 'SSC Passed' },
    ],
  },
  {
    id: '6', name: 'Rubina Akter', nameBn: 'রুবিনা আক্তার', studentId: 'STU-2024-006',
    class: 'Class 7', section: 'A', roll: 8, gender: 'female', phone: '01712345683',
    status: 'enrolled', bloodGroup: 'B-', admissionDate: '2024-01-05', dob: '2011-01-30',
    religion: 'Islam', nationality: 'Bangladeshi', address: 'Gulshan-2, Dhaka-1212',
    feeStatus: 'paid', attendanceRate: 91, lastExamGpa: 4.40,
    guardians: [
      { id: 'g9', name: 'Shah Alam', nameBn: 'শাহ আলম', relation: 'father', phone: '01812345683', email: 'shah.alam@biz.com', occupation: 'Garment Exporter', nid: '1978901234567', address: 'Gulshan-2, Dhaka-1212', isPrimary: true },
    ],
    documents: [
      { id: 'd14', name: 'Birth Certificate', type: 'birth_certificate', uploadedAt: '2024-01-02', fileSize: '1.1 MB', status: 'verified' },
      { id: 'd15', name: 'Photo', type: 'photo', uploadedAt: '2024-01-02', fileSize: '350 KB', status: 'verified' },
    ],
    enrollmentHistory: [
      { id: 'e18', session: '2024', class: 'Class 6', section: 'A', roll: 10, result: 'promoted', gpa: 4.40 },
      { id: 'e19', session: '2025', class: 'Class 7', section: 'A', roll: 8, result: 'current' },
    ],
  },
  {
    id: '7', name: 'Tariq Islam', nameBn: 'তারিক ইসলাম', studentId: 'STU-2024-007',
    class: 'Class 9', section: 'A', roll: 4, gender: 'male', phone: '01712345684',
    status: 'inactive', bloodGroup: 'O-', admissionDate: '2023-03-15', dob: '2009-04-18',
    religion: 'Islam', nationality: 'Bangladeshi', address: 'Tejgaon Industrial Area, Dhaka',
    feeStatus: 'overdue', attendanceRate: 45, lastExamGpa: 2.50,
    guardians: [
      { id: 'g10', name: 'Rafiq Islam', nameBn: 'রফিক ইসলাম', relation: 'father', phone: '01812345684', occupation: 'Day Laborer', address: 'Tejgaon Industrial Area, Dhaka', isPrimary: true },
    ],
    documents: [
      { id: 'd16', name: 'Birth Certificate', type: 'birth_certificate', uploadedAt: '2023-03-10', fileSize: '950 KB', status: 'verified' },
    ],
    enrollmentHistory: [
      { id: 'e20', session: '2023', class: 'Class 8', section: 'A', roll: 12, result: 'promoted', gpa: 2.50 },
      { id: 'e21', session: '2024', class: 'Class 9', section: 'A', roll: 4, result: 'current', remarks: 'Irregular attendance' },
    ],
  },
  {
    id: '8', name: 'Mitu Das', nameBn: 'মিতু দাস', studentId: 'STU-2024-008',
    class: 'Class 8', section: 'B', roll: 2, gender: 'female', phone: '01712345685',
    status: 'enrolled', bloodGroup: 'A+', admissionDate: '2023-01-10', dob: '2010-12-05',
    religion: 'Hindu', nationality: 'Bangladeshi', address: 'Shankhari Bazar, Old Dhaka',
    feeStatus: 'paid', attendanceRate: 89, lastExamGpa: 4.30,
    guardians: [
      { id: 'g11', name: 'Bipul Das', nameBn: 'বিপুল দাস', relation: 'father', phone: '01812345685', occupation: 'Jeweler', address: 'Shankhari Bazar, Old Dhaka', isPrimary: true },
      { id: 'g12', name: 'Mala Das', nameBn: 'মালা দাস', relation: 'mother', phone: '01712345686', occupation: 'Homemaker', address: 'Shankhari Bazar, Old Dhaka', isPrimary: false },
    ],
    documents: [
      { id: 'd17', name: 'Birth Certificate', type: 'birth_certificate', uploadedAt: '2023-01-05', fileSize: '1.0 MB', status: 'verified' },
      { id: 'd18', name: 'Photo', type: 'photo', uploadedAt: '2023-01-05', fileSize: '290 KB', status: 'verified' },
      { id: 'd19', name: 'Guardian NID', type: 'nid_copy', uploadedAt: '2023-01-05', fileSize: '1.5 MB', status: 'pending' },
    ],
    enrollmentHistory: [
      { id: 'e22', session: '2023', class: 'Class 7', section: 'B', roll: 4, result: 'promoted', gpa: 4.30 },
      { id: 'e23', session: '2024', class: 'Class 8', section: 'B', roll: 2, result: 'current' },
    ],
  },
  {
    id: '9', name: 'Imran Hossain', nameBn: 'ইমরান হোসেন', studentId: 'STU-2024-009',
    class: 'Class 10', section: 'A', roll: 5, gender: 'male', phone: '01712345690',
    status: 'enrolled', bloodGroup: 'B+', admissionDate: '2021-01-10', dob: '2007-08-14',
    religion: 'Islam', nationality: 'Bangladeshi', address: 'Bashundhara R/A, Dhaka',
    feeStatus: 'paid', attendanceRate: 92, lastExamGpa: 4.55,
    guardians: [
      { id: 'g13', name: 'Faruk Hossain', nameBn: 'ফারুক হোসেন', relation: 'father', phone: '01812345690', occupation: 'Banker', nid: '1975678901234', address: 'Bashundhara R/A, Dhaka', isPrimary: true },
    ],
    documents: [
      { id: 'd20', name: 'Birth Certificate', type: 'birth_certificate', uploadedAt: '2021-01-05', fileSize: '1.2 MB', status: 'verified' },
      { id: 'd21', name: 'Photo', type: 'photo', uploadedAt: '2021-01-05', fileSize: '410 KB', status: 'verified' },
    ],
    enrollmentHistory: [
      { id: 'e24', session: '2021', class: 'Class 7', section: 'A', roll: 8, result: 'promoted', gpa: 4.30 },
      { id: 'e25', session: '2022', class: 'Class 8', section: 'A', roll: 6, result: 'promoted', gpa: 4.45 },
      { id: 'e26', session: '2023', class: 'Class 9', section: 'A', roll: 5, result: 'promoted', gpa: 4.55 },
      { id: 'e27', session: '2024', class: 'Class 10', section: 'A', roll: 5, result: 'current' },
    ],
  },
  {
    id: '10', name: 'Sumaiya Rahman', nameBn: 'সুমাইয়া রহমান', studentId: 'STU-2024-010',
    class: 'Class 9', section: 'A', roll: 2, gender: 'female', phone: '01712345691',
    status: 'enrolled', bloodGroup: 'O+', admissionDate: '2022-06-15', dob: '2009-02-22',
    religion: 'Islam', nationality: 'Bangladeshi', address: 'Lalmatia, Dhaka-1207',
    feeStatus: 'partial', attendanceRate: 82, lastExamGpa: 3.85,
    guardians: [
      { id: 'g14', name: 'Mizanur Rahman', nameBn: 'মিজানুর রহমান', relation: 'father', phone: '01812345691', occupation: 'University Professor', nid: '1970345678901', address: 'Lalmatia, Dhaka-1207', isPrimary: true },
      { id: 'g15', name: 'Nasreen Rahman', nameBn: 'নাসরীন রহমান', relation: 'mother', phone: '01912345691', email: 'nasreen@uni.edu', occupation: 'Lecturer', address: 'Lalmatia, Dhaka-1207', isPrimary: false },
    ],
    documents: [
      { id: 'd22', name: 'Birth Certificate', type: 'birth_certificate', uploadedAt: '2022-06-10', fileSize: '1.0 MB', status: 'verified' },
      { id: 'd23', name: 'Photo', type: 'photo', uploadedAt: '2022-06-10', fileSize: '380 KB', status: 'verified' },
      { id: 'd24', name: 'Transfer Certificate', type: 'transfer_certificate', uploadedAt: '2022-06-10', fileSize: '750 KB', status: 'verified' },
    ],
    enrollmentHistory: [
      { id: 'e28', session: '2022', class: 'Class 7', section: 'A', roll: 6, result: 'transferred_in', remarks: 'From Viqarunnisa Noon School' },
      { id: 'e29', session: '2023', class: 'Class 8', section: 'A', roll: 3, result: 'promoted', gpa: 3.85 },
      { id: 'e30', session: '2024', class: 'Class 9', section: 'A', roll: 2, result: 'current' },
    ],
  },
  {
    id: '11', name: 'Shakil Ahmed', nameBn: 'শাকিল আহমেদ', studentId: 'STU-2024-011',
    class: 'Class 7', section: 'B', roll: 1, gender: 'male', phone: '01712345692',
    status: 'enrolled', bloodGroup: 'AB-', admissionDate: '2024-01-10', dob: '2012-04-10',
    religion: 'Islam', nationality: 'Bangladeshi', address: 'Pallabi, Mirpur, Dhaka',
    feeStatus: 'paid', attendanceRate: 97, lastExamGpa: 4.65,
    guardians: [
      { id: 'g16', name: 'Zahid Ahmed', nameBn: 'জাহিদ আহমেদ', relation: 'father', phone: '01812345692', occupation: 'Police Officer', address: 'Pallabi, Mirpur, Dhaka', isPrimary: true },
    ],
    documents: [
      { id: 'd25', name: 'Birth Certificate', type: 'birth_certificate', uploadedAt: '2024-01-05', fileSize: '1.1 MB', status: 'verified' },
      { id: 'd26', name: 'Photo', type: 'photo', uploadedAt: '2024-01-05', fileSize: '340 KB', status: 'verified' },
    ],
    enrollmentHistory: [
      { id: 'e31', session: '2024', class: 'Class 6', section: 'B', roll: 2, result: 'promoted', gpa: 4.65 },
      { id: 'e32', session: '2025', class: 'Class 7', section: 'B', roll: 1, result: 'current' },
    ],
  },
  {
    id: '12', name: 'Tasnia Ferdous', nameBn: 'তাসনিয়া ফেরদৌস', studentId: 'STU-2024-012',
    class: 'Class 8', section: 'A', roll: 1, gender: 'female', phone: '01712345693',
    status: 'transferred', bloodGroup: 'A+', admissionDate: '2022-01-15', dob: '2010-09-08',
    religion: 'Islam', nationality: 'Bangladeshi', address: 'Wari, Old Dhaka',
    feeStatus: 'paid', attendanceRate: 78,
    guardians: [
      { id: 'g17', name: 'Ferdous Alam', nameBn: 'ফেরদৌস আলম', relation: 'father', phone: '01812345693', occupation: 'Businessman', address: 'Wari, Old Dhaka', isPrimary: true },
    ],
    documents: [
      { id: 'd27', name: 'Birth Certificate', type: 'birth_certificate', uploadedAt: '2022-01-10', fileSize: '1.0 MB', status: 'verified' },
      { id: 'd28', name: 'Transfer Certificate (Out)', type: 'transfer_certificate', uploadedAt: '2024-12-20', fileSize: '680 KB', status: 'verified' },
    ],
    enrollmentHistory: [
      { id: 'e33', session: '2022', class: 'Class 6', section: 'A', roll: 7, result: 'promoted', gpa: 3.60 },
      { id: 'e34', session: '2023', class: 'Class 7', section: 'A', roll: 4, result: 'promoted', gpa: 3.50 },
      { id: 'e35', session: '2024', class: 'Class 8', section: 'A', roll: 1, result: 'transferred_out', remarks: 'Transferred to Rajuk Uttara Model College' },
    ],
  },
];

export const documentTypeLabels: Record<string, string> = {
  birth_certificate: 'Birth Certificate',
  photo: 'Passport Photo',
  transfer_certificate: 'Transfer Certificate',
  marksheet: 'Marksheet / Results',
  nid_copy: 'Guardian NID Copy',
  medical_report: 'Medical Report',
  other: 'Other Document',
};

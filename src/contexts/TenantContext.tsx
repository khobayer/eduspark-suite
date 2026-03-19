import { createContext, useContext, useState, ReactNode } from "react";

export type TenantMode = "school" | "coaching";

export interface TenantLabels {
  student: string;
  studentBn: string;
  students: string;
  studentsBn: string;
  teacher: string;
  teacherBn: string;
  class: string;
  classBn: string;
  classes: string;
  classesBn: string;
  section: string;
  sectionBn: string;
  batch: string;
  batchBn: string;
  session: string;
  sessionBn: string;
  roll: string;
  rollBn: string;
  guardian: string;
  guardianBn: string;
  attendance: string;
  attendanceBn: string;
  exam: string;
  examBn: string;
  feeHead: string;
  invoice: string;
}

const schoolLabels: TenantLabels = {
  student: "Student", studentBn: "শিক্ষার্থী",
  students: "Students", studentsBn: "শিক্ষার্থীগণ",
  teacher: "Teacher", teacherBn: "শিক্ষক",
  class: "Class", classBn: "শ্রেণি",
  classes: "Classes", classesBn: "শ্রেণিসমূহ",
  section: "Section", sectionBn: "শাখা",
  batch: "Batch", batchBn: "ব্যাচ",
  session: "Academic Session", sessionBn: "শিক্ষাবর্ষ",
  roll: "Roll", rollBn: "রোল",
  guardian: "Guardian", guardianBn: "অভিভাবক",
  attendance: "Attendance", attendanceBn: "উপস্থিতি",
  exam: "Exam", examBn: "পরীক্ষা",
  feeHead: "Fee Head", invoice: "Invoice",
};

const coachingLabels: TenantLabels = {
  student: "Student", studentBn: "শিক্ষার্থী",
  students: "Students", studentsBn: "শিক্ষার্থীগণ",
  teacher: "Instructor", teacherBn: "প্রশিক্ষক",
  class: "Program", classBn: "প্রোগ্রাম",
  classes: "Programs", classesBn: "প্রোগ্রামসমূহ",
  section: "Group", sectionBn: "গ্রুপ",
  batch: "Batch", batchBn: "ব্যাচ",
  session: "Session", sessionBn: "সেশন",
  roll: "ID", rollBn: "আইডি",
  guardian: "Guardian", guardianBn: "অভিভাবক",
  attendance: "Attendance", attendanceBn: "উপস্থিতি",
  exam: "Test", examBn: "পরীক্ষা",
  feeHead: "Fee Head", invoice: "Invoice",
};

export interface TenantConfig {
  mode: TenantMode;
  labels: TenantLabels;
  name: string;
  nameBn: string;
  logo?: string;
  primaryColor: string;
  setMode: (mode: TenantMode) => void;
}

const TenantContext = createContext<TenantConfig | null>(null);

export function useTenant() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error("useTenant must be used within TenantProvider");
  return ctx;
}

export function TenantProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<TenantMode>("school");

  const config: TenantConfig = {
    mode,
    labels: mode === "school" ? schoolLabels : coachingLabels,
    name: mode === "school" ? "Dhaka Model School" : "Ideal Coaching Center",
    nameBn: mode === "school" ? "ঢাকা মডেল স্কুল" : "আইডিয়াল কোচিং সেন্টার",
    primaryColor: "hsl(172, 66%, 30%)",
    setMode,
  };

  return (
    <TenantContext.Provider value={config}>
      {children}
    </TenantContext.Provider>
  );
}

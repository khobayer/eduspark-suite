import { ModuleStub } from "@/components/shared/ModuleStub";
import { GraduationCap, CalendarCheck, FileText, BarChart3, Wrench, MessageSquare, Settings, UserCheck } from "lucide-react";

export function TeachersPage() {
  return <ModuleStub title="Teachers & Staff" titleBn="শিক্ষক ও কর্মচারী" description="Manage teacher profiles, designations, and schedules" icon={GraduationCap} />;
}

export function AcademicPage() {
  return <ModuleStub title="Academic Structure" titleBn="একাডেমিক কাঠামো" description="Manage classes, sections, batches, subjects, and sessions" icon={GraduationCap} />;
}

export function AttendancePage() {
  return <ModuleStub title="Attendance" titleBn="উপস্থিতি" description="Daily attendance, subject attendance, and absentee reports" icon={CalendarCheck} />;
}

export function ExamsPage() {
  return <ModuleStub title="Exams & Results" titleBn="পরীক্ষা ও ফলাফল" description="Exam setup, marks entry, tabulation, and report cards" icon={FileText} />;
}

export function ReportsPage() {
  return <ModuleStub title="Reports" titleBn="রিপোর্ট" description="Academic, financial, and administrative reports" icon={BarChart3} />;
}

export function UtilitiesPage() {
  return <ModuleStub title="Utilities" titleBn="ইউটিলিটি" description="ID cards, admit cards, certificates, and notices" icon={Wrench} />;
}

export function BroadcastPage() {
  return <ModuleStub title="Broadcast Center" titleBn="সম্প্রচার কেন্দ্র" description="Send SMS, WhatsApp, and email notifications" icon={MessageSquare} />;
}

export function TenantSettingsPage() {
  return <ModuleStub title="Settings" titleBn="সেটিংস" description="Organization profile, branding, labels, grading, roles" icon={Settings} />;
}

export function TenantStaffPage() {
  return <ModuleStub title="Staff Management" titleBn="কর্মচারী ব্যবস্থাপনা" description="Manage non-teaching staff and roles" icon={UserCheck} />;
}

export function TenantCommunicationPage() {
  return <ModuleStub title="Communication" titleBn="যোগাযোগ" description="Parent and teacher messaging" icon={MessageSquare} />;
}

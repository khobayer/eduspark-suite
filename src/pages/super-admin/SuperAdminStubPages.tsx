import { ModuleStub } from "@/components/shared/ModuleStub";
import { CreditCard, ToggleRight, FileText, MessageSquare, Settings, Users } from "lucide-react";

export function BillingPage() {
  return <ModuleStub title="Billing & Payments" description="View payment history and manage billing" icon={CreditCard} />;
}

export function FeatureFlagsPage() {
  return <ModuleStub title="Feature Flags" description="Toggle features per plan or tenant" icon={ToggleRight} />;
}

export function TemplateManagerPage() {
  return <ModuleStub title="Template Manager" description="Manage report card, invoice, and ID card templates" icon={FileText} />;
}

export function SmsUsagePage() {
  return <ModuleStub title="Communication & SMS Usage" description="Monitor SMS/WhatsApp usage across tenants" icon={MessageSquare} />;
}

export function SystemSettingsPage() {
  return <ModuleStub title="System Settings" description="Configure platform-wide settings" icon={Settings} />;
}

export function SuperAdminUsersPage() {
  return <ModuleStub title="Users" titleBn="ব্যবহারকারী" description="Manage platform-level users and roles" icon={Users} />;
}

export function SuperAdminAnalyticsPage() {
  return <ModuleStub title="Analytics" description="Platform-wide analytics and insights" icon={CreditCard} />;
}

export function SuperAdminRevenuePage() {
  return <ModuleStub title="Revenue" description="Track platform revenue and payouts" icon={CreditCard} />;
}

export function SuperAdminRolesPage() {
  return <ModuleStub title="Roles & Permissions" description="Manage system-level roles and permissions" icon={Settings} />;
}

export function SuperAdminNotificationsPage() {
  return <ModuleStub title="Notifications" description="Configure system notifications" icon={MessageSquare} />;
}

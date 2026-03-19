import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SuperAdminLayout } from "./components/layout/SuperAdminLayout";
import { TenantLayout } from "./components/layout/TenantLayout";

// Super Admin pages
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import TenantListPage from "./pages/super-admin/TenantListPage";
import SubscriptionPlansPage from "./pages/super-admin/SubscriptionPlansPage";
import AuditLogsPage from "./pages/super-admin/AuditLogsPage";
import SupportTicketsPage from "./pages/super-admin/SupportTicketsPage";
import {
  BillingPage, FeatureFlagsPage, TemplateManagerPage, SmsUsagePage,
  SystemSettingsPage, SuperAdminUsersPage, SuperAdminAnalyticsPage,
  SuperAdminRevenuePage, SuperAdminRolesPage, SuperAdminNotificationsPage,
} from "./pages/super-admin/SuperAdminStubPages";

// Tenant pages
import TenantDashboard from "./pages/tenant/TenantDashboard";
import StudentListPage from "./pages/tenant/StudentListPage";
import StudentCreatePage from "./pages/tenant/StudentCreatePage";
import FinancePage from "./pages/tenant/FinancePage";
import {
  TeachersPage, AcademicPage, AttendancePage, ExamsPage, ReportsPage,
  UtilitiesPage, BroadcastPage, TenantSettingsPage, TenantStaffPage,
  TenantCommunicationPage,
} from "./pages/tenant/TenantStubPages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Super Admin Routes */}
          <Route path="/super-admin" element={<SuperAdminLayout />}>
            <Route index element={<SuperAdminDashboard />} />
            <Route path="tenants" element={<TenantListPage />} />
            <Route path="plans" element={<SubscriptionPlansPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="feature-flags" element={<FeatureFlagsPage />} />
            <Route path="templates" element={<TemplateManagerPage />} />
            <Route path="sms-usage" element={<SmsUsagePage />} />
            <Route path="support" element={<SupportTicketsPage />} />
            <Route path="audit-logs" element={<AuditLogsPage />} />
            <Route path="users" element={<SuperAdminUsersPage />} />
            <Route path="analytics" element={<SuperAdminAnalyticsPage />} />
            <Route path="revenue" element={<SuperAdminRevenuePage />} />
            <Route path="roles" element={<SuperAdminRolesPage />} />
            <Route path="notifications" element={<SuperAdminNotificationsPage />} />
            <Route path="settings" element={<SystemSettingsPage />} />
          </Route>

          {/* Tenant Routes */}
          <Route path="/tenant" element={<TenantLayout />}>
            <Route index element={<TenantDashboard />} />
            <Route path="students" element={<StudentListPage />} />
            <Route path="students/create" element={<StudentCreatePage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="academic" element={<AcademicPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="exams" element={<ExamsPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="utilities" element={<UtilitiesPage />} />
            <Route path="broadcast" element={<BroadcastPage />} />
            <Route path="staff" element={<TenantStaffPage />} />
            <Route path="communication" element={<TenantCommunicationPage />} />
            <Route path="settings" element={<TenantSettingsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

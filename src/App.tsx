import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocaleProvider } from "./contexts/LocaleContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SuperAdminLayout } from "./components/layout/SuperAdminLayout";
import { TenantLayout } from "./components/layout/TenantLayout";

// Super Admin pages
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import TenantListPage from "./pages/super-admin/TenantListPage";
import SubscriptionPlansPage from "./pages/super-admin/SubscriptionPlansPage";
import BillingPage from "./pages/super-admin/BillingPage";
import FeatureFlagsPage from "./pages/super-admin/FeatureFlagsPage";
import TemplateManagerPage from "./pages/super-admin/TemplateManagerPage";
import SmsUsagePage from "./pages/super-admin/SmsUsagePage";
import SupportTicketsPage from "./pages/super-admin/SupportTicketsPage";
import AuditLogsPage from "./pages/super-admin/AuditLogsPage";
import AdminUsersPage from "./pages/super-admin/AdminUsersPage";
import SystemSettingsPage from "./pages/super-admin/SystemSettingsPage";

// Tenant pages
import TenantDashboard from "./pages/tenant/TenantDashboard";
import AdmissionPage from "./pages/tenant/AdmissionPage";
import StudentListPage from "./pages/tenant/StudentListPage";
import StudentCreatePage from "./pages/tenant/StudentCreatePage";
import StudentPortalPage from "./pages/tenant/StudentPortalPage";
import TeachersPage from "./pages/tenant/TeachersPage";
import AcademicPage from "./pages/tenant/AcademicPage";
import AttendancePage from "./pages/tenant/AttendancePage";
import ExamsPage from "./pages/tenant/ExamsPage";
import FinancePage from "./pages/tenant/FinancePage";
import ReportsPage from "./pages/tenant/ReportsPage";
import UtilitiesPage from "./pages/tenant/UtilitiesPage";
import BroadcastPage from "./pages/tenant/BroadcastPage";
import TenantSettingsPage from "./pages/tenant/TenantSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocaleProvider>
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
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="settings" element={<SystemSettingsPage />} />
          </Route>

          {/* Tenant Routes */}
          <Route path="/tenant" element={<TenantLayout />}>
            <Route index element={<TenantDashboard />} />
            <Route path="admission" element={<AdmissionPage />} />
            <Route path="students" element={<StudentListPage />} />
            <Route path="students/create" element={<StudentCreatePage />} />
            <Route path="students/edit/:id" element={<StudentCreatePage />} />
            <Route path="student-portal" element={<StudentPortalPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="academic" element={<AcademicPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="exams" element={<ExamsPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="utilities" element={<UtilitiesPage />} />
            <Route path="broadcast" element={<BroadcastPage />} />
            <Route path="settings" element={<TenantSettingsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </LocaleProvider>
  </QueryClientProvider>
);

export default App;

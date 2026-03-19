import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SuperAdminLayout } from "./components/layout/SuperAdminLayout";
import { TenantLayout } from "./components/layout/TenantLayout";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import TenantDashboard from "./pages/tenant/TenantDashboard";

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
          </Route>

          {/* Tenant Routes */}
          <Route path="/tenant" element={<TenantLayout />}>
            <Route index element={<TenantDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

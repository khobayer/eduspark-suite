import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TenantSidebar } from "./TenantSidebar";
import { AppHeader } from "./AppHeader";
import { TenantProvider } from "@/contexts/TenantContext";

export function TenantLayout() {
  return (
    <TenantProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <TenantSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <AppHeader breadcrumbs={[{ label: "Dhaka Model School" }, { label: "Dashboard" }]} />
            <main className="flex-1 p-6 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TenantProvider>
  );
}

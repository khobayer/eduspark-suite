import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Settings,
  BarChart3,
  Shield,
  Bell,
  ToggleRight,
  FileText,
  MessageSquare,
  LifeBuoy,
  ClipboardList,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/super-admin", icon: LayoutDashboard },
  { title: "Tenants", url: "/super-admin/tenants", icon: Building2 },
  { title: "Plans", url: "/super-admin/plans", icon: CreditCard },
  { title: "Billing", url: "/super-admin/billing", icon: CreditCard },
  { title: "Feature Flags", url: "/super-admin/feature-flags", icon: ToggleRight },
  { title: "Templates", url: "/super-admin/templates", icon: FileText },
  { title: "SMS Usage", url: "/super-admin/sms-usage", icon: MessageSquare },
];

const systemItems = [
  { title: "Support Tickets", url: "/super-admin/support", icon: LifeBuoy },
  { title: "Audit Logs", url: "/super-admin/audit-logs", icon: ClipboardList },
  { title: "Users", url: "/super-admin/users", icon: Users },
  { title: "Analytics", url: "/super-admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/super-admin/settings", icon: Settings },
];

export function SuperAdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
            <span className="text-sidebar-primary-foreground font-bold text-sm">E</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sidebar-primary-foreground font-semibold text-sm leading-tight">EduSaaS</span>
              <span className="text-sidebar-foreground text-[10px] opacity-60">Super Admin</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

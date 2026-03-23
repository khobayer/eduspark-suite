import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Settings,
  ToggleRight,
  FileText,
  MessageSquare,
  LifeBuoy,
  ClipboardList,
  Receipt,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { LocaleLabel } from "@/components/shared/LocaleLabel";
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
import { useLocale } from "@/contexts/LocaleContext";

const mainItems = [
  { en: "Dashboard", bn: "ড্যাশবোর্ড", url: "/super-admin", icon: LayoutDashboard, end: true },
  { en: "Tenants", bn: "প্রতিষ্ঠান", url: "/super-admin/tenants", icon: Building2 },
  { en: "Plans", bn: "প্ল্যান", url: "/super-admin/plans", icon: CreditCard },
  { en: "Billing", bn: "বিলিং", url: "/super-admin/billing", icon: Receipt },
  { en: "Feature Flags", bn: "ফিচার ফ্ল্যাগ", url: "/super-admin/feature-flags", icon: ToggleRight },
  { en: "Templates", bn: "টেমপ্লেট", url: "/super-admin/templates", icon: FileText },
  { en: "Communications", bn: "যোগাযোগ", url: "/super-admin/sms-usage", icon: MessageSquare },
];

const systemItems = [
  { en: "Support Tickets", bn: "সাপোর্ট টিকেট", url: "/super-admin/support", icon: LifeBuoy },
  { en: "Audit Logs", bn: "অডিট লগ", url: "/super-admin/audit-logs", icon: ClipboardList },
  { en: "Users", bn: "ব্যবহারকারী", url: "/super-admin/users", icon: Users },
  { en: "Settings", bn: "সেটিংস", url: "/super-admin/settings", icon: Settings },
];

export function SuperAdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { t } = useLocale();

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
              <span className="text-sidebar-foreground text-[10px] opacity-60">{t("Super Admin", "সুপার অ্যাডমিন")}</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Platform", "প্ল্যাটফর্ম")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.end} className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <LocaleLabel en={item.en} bn={item.bn} className="text-sm truncate" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("System", "সিস্টেম")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <LocaleLabel en={item.en} bn={item.bn} className="text-sm truncate" />}
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

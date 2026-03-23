import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  FileText,
  Wallet,
  Settings,
  BookOpen,
  BarChart3,
  Wrench,
  Radio,
  UserPlus,
  User,
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

const academicItems = [
  { en: "Dashboard", bn: "ড্যাশবোর্ড", url: "/tenant", icon: LayoutDashboard, end: true },
  { en: "Admission", bn: "ভর্তি", url: "/tenant/admission", icon: UserPlus },
  { en: "Students", bn: "শিক্ষার্থী", url: "/tenant/students", icon: Users },
  { en: "Student Portal", bn: "ছাত্র পোর্টাল", url: "/tenant/student-portal", icon: User },
  { en: "Teachers & Staff", bn: "শিক্ষক ও কর্মচারী", url: "/tenant/teachers", icon: GraduationCap },
  { en: "Academic", bn: "একাডেমিক", url: "/tenant/academic", icon: BookOpen },
  { en: "Attendance", bn: "উপস্থিতি", url: "/tenant/attendance", icon: CalendarCheck },
  { en: "Exams & Results", bn: "পরীক্ষা ও ফলাফল", url: "/tenant/exams", icon: FileText },
];

const managementItems = [
  { en: "Finance", bn: "আর্থিক", url: "/tenant/finance", icon: Wallet },
  { en: "Reports", bn: "রিপোর্ট", url: "/tenant/reports", icon: BarChart3 },
  { en: "Utilities", bn: "ইউটিলিটি", url: "/tenant/utilities", icon: Wrench },
  { en: "Broadcast Center", bn: "সম্প্রচার কেন্দ্র", url: "/tenant/broadcast", icon: Radio },
  { en: "Settings", bn: "সেটিংস", url: "/tenant/settings", icon: Settings },
];

export function TenantSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { t } = useLocale();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
            <span className="text-sidebar-primary-foreground font-bold text-sm">D</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sidebar-primary-foreground font-semibold text-sm leading-tight">
                {t("Dhaka Model School", "ঢাকা মডেল স্কুল")}
              </span>
              <span className="text-sidebar-foreground text-[10px] opacity-60">
                {t("Institute Panel", "প্রতিষ্ঠান প্যানেল")}
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Academic", "একাডেমিক")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {academicItems.map((item) => (
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
          <SidebarGroupLabel>{t("Management", "ব্যবস্থাপনা")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
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

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  FileText,
  Wallet,
  MessageSquare,
  Settings,
  UserCheck,
  BookOpen,
  BarChart3,
  Wrench,
  Radio,
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

const academicItems = [
  { title: "Dashboard", titleBn: "ড্যাশবোর্ড", url: "/tenant", icon: LayoutDashboard },
  { title: "Students", titleBn: "শিক্ষার্থী", url: "/tenant/students", icon: Users },
  { title: "Teachers", titleBn: "শিক্ষক", url: "/tenant/teachers", icon: GraduationCap },
  { title: "Academic", titleBn: "একাডেমিক", url: "/tenant/academic", icon: BookOpen },
  { title: "Attendance", titleBn: "উপস্থিতি", url: "/tenant/attendance", icon: CalendarCheck },
  { title: "Exams", titleBn: "পরীক্ষা", url: "/tenant/exams", icon: FileText },
];

const managementItems = [
  { title: "Finance", titleBn: "আর্থিক", url: "/tenant/finance", icon: Wallet },
  { title: "Reports", titleBn: "রিপোর্ট", url: "/tenant/reports", icon: BarChart3 },
  { title: "Utilities", titleBn: "ইউটিলিটি", url: "/tenant/utilities", icon: Wrench },
  { title: "Broadcast", titleBn: "সম্প্রচার", url: "/tenant/broadcast", icon: Radio },
  { title: "Staff", titleBn: "কর্মচারী", url: "/tenant/staff", icon: UserCheck },
  { title: "Settings", titleBn: "সেটিংস", url: "/tenant/settings", icon: Settings },
];

export function TenantSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
            <span className="text-sidebar-primary-foreground font-bold text-sm">D</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sidebar-primary-foreground font-semibold text-sm leading-tight">Dhaka Model School</span>
              <span className="text-sidebar-foreground text-[10px] opacity-60">ঢাকা মডেল স্কুল</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Academic</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {academicItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span className="text-xs">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span className="text-xs">{item.title}</span>}
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

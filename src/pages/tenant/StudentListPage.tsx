import { useState, useMemo } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { studentsExtended, type StudentFull } from "@/data/student-data";
import {
  Plus, Users, UserCheck, UserX, GraduationCap, Eye, Edit, Trash2,
  MoreHorizontal, TrendingUp, AlertCircle, ChevronLeft, ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { StudentProfileDrawer } from "@/components/students/StudentProfileDrawer";
import { useTenant } from "@/contexts/TenantContext";
import { useLocale } from "@/contexts/LocaleContext";

const PAGE_SIZE = 8;

export default function StudentListPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<StudentFull | null>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { labels } = useTenant();
  const { t } = useLocale();

  const filtered = useMemo(() => {
    return studentsExtended.filter((s) => {
      const matchSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.nameBn.includes(search) ||
        s.studentId.toLowerCase().includes(search.toLowerCase()) ||
        s.phone.includes(search);

      const matchClass = !filterValues.class || filterValues.class === "all" || s.class === filterValues.class;
      const matchSection = !filterValues.section || filterValues.section === "all" || s.section === filterValues.section;
      const matchStatus = !filterValues.status || filterValues.status === "all" || s.status === filterValues.status;
      const matchGender = !filterValues.gender || filterValues.gender === "all" || s.gender === filterValues.gender;

      return matchSearch && matchClass && matchSection && matchStatus && matchGender;
    });
  }, [search, filterValues]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const enrolled = studentsExtended.filter((s) => s.status === "enrolled").length;
  const male = studentsExtended.filter((s) => s.gender === "male").length;
  const female = studentsExtended.filter((s) => s.gender === "female").length;
  const avgAttendance = Math.round(studentsExtended.reduce((a, s) => a + s.attendanceRate, 0) / studentsExtended.length);

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleClear = () => {
    setSearch("");
    setFilterValues({});
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <PageHeader title={labels.students} titleBn={labels.studentsBn} description="Manage student records, profiles, and enrollment">
        <Button size="sm" onClick={() => navigate("/tenant/students/create")}>
          <Plus className="h-4 w-4 mr-1" />
          Add {labels.student}
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={`Total ${labels.students}`} titleBn={`মোট ${labels.studentsBn}`} value={studentsExtended.length} icon={Users} index={0} />
        <StatCard title="Enrolled" titleBn="ভর্তিকৃত" value={enrolled} change={`${Math.round((enrolled / studentsExtended.length) * 100)}% active`} changeType="positive" icon={UserCheck} index={1} />
        <StatCard title="Avg. Attendance" titleBn="গড় উপস্থিতি" value={`${avgAttendance}%`} change={avgAttendance > 85 ? "Good" : "Needs attention"} changeType={avgAttendance > 85 ? "positive" : "negative"} icon={TrendingUp} index={2} />
        <StatCard title="Fee Overdue" titleBn="বকেয়া ফি" value={studentsExtended.filter((s) => s.feeStatus === "overdue").length} change="Requires follow-up" changeType="negative" icon={AlertCircle} index={3} />
      </div>

      <FilterBar
        searchPlaceholder="Search by name, ID, phone..."
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        filters={[
          { key: "class", label: labels.class, options: [
            { label: `${labels.class} 7`, value: "Class 7" }, { label: `${labels.class} 8`, value: "Class 8" },
            { label: `${labels.class} 9`, value: "Class 9" }, { label: `${labels.class} 10`, value: "Class 10" },
          ]},
          { key: "section", label: labels.section, options: [
            { label: "A", value: "A" }, { label: "B", value: "B" },
          ]},
          { key: "status", label: "Status", options: [
            { label: "Enrolled", value: "enrolled" }, { label: "Graduated", value: "graduated" },
            { label: "Inactive", value: "inactive" }, { label: "Transferred", value: "transferred" },
          ]},
          { key: "gender", label: "Gender", options: [
            { label: "Male", value: "male" }, { label: "Female", value: "female" },
          ]},
        ]}
        filterValues={filterValues}
        onFilterChange={handleFilterChange}
        onClear={handleClear}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs">{labels.student}</TableHead>
                    <TableHead className="text-xs">ID</TableHead>
                    <TableHead className="text-xs hidden md:table-cell">{labels.class}</TableHead>
                    <TableHead className="text-xs hidden md:table-cell">{labels.section}</TableHead>
                    <TableHead className="text-xs hidden lg:table-cell">{labels.roll}</TableHead>
                    <TableHead className="text-xs hidden lg:table-cell">Attendance</TableHead>
                    <TableHead className="text-xs hidden xl:table-cell">Fee</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                        No students found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                  {paginated.map((s) => (
                    <TableRow key={s.id} className="cursor-pointer group" onClick={() => setSelected(s)}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-accent text-accent-foreground text-xs font-medium">
                              {s.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{s.name}</p>
                            <p className="text-[11px] text-muted-foreground">{s.nameBn}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-mono text-muted-foreground">{s.studentId}</TableCell>
                      <TableCell className="text-sm hidden md:table-cell">{s.class}</TableCell>
                      <TableCell className="text-sm hidden md:table-cell">{s.section}</TableCell>
                      <TableCell className="text-sm font-medium hidden lg:table-cell">{s.roll}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress value={s.attendanceRate} className="h-1.5 w-16" />
                          <span className={`text-xs font-medium ${s.attendanceRate >= 85 ? "text-[hsl(var(--success))]" : s.attendanceRate >= 70 ? "text-[hsl(var(--warning))]" : "text-destructive"}`}>
                            {s.attendanceRate}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <StatusBadge status={s.feeStatus === "overdue" ? "overdue" : s.feeStatus === "partial" ? "partial" : "paid"} />
                      </TableCell>
                      <TableCell><StatusBadge status={s.status} /></TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelected(s)}>
                              <Eye className="h-3.5 w-3.5 mr-2" />View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/tenant/students/edit/${s.id}`)}>
                              <Edit className="h-3.5 w-3.5 mr-2" />Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-3.5 w-3.5 mr-2" />Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <p className="text-xs text-muted-foreground">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage(page - 1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button key={i} variant={page === i + 1 ? "default" : "ghost"} size="icon" className="h-8 w-8 text-xs" onClick={() => setPage(i + 1)}>
                      {i + 1}
                    </Button>
                  ))}
                  <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <StudentProfileDrawer student={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

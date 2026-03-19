import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { DetailDrawer } from "@/components/shared/DetailDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { teachers, type Teacher } from "@/data/tenant-data";
import { GraduationCap, Users, UserCheck, Clock, Plus, MoreHorizontal, Eye, Edit } from "lucide-react";
import { motion } from "framer-motion";

export default function TeachersPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Teacher | null>(null);

  const filtered = teachers.filter(
    (t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.nameBn.includes(search) || t.employeeId.toLowerCase().includes(search.toLowerCase())
  );

  const active = teachers.filter(t => t.status === 'active').length;
  const onLeave = teachers.filter(t => t.status === 'on_leave').length;
  const departments = [...new Set(teachers.map(t => t.department))].length;

  return (
    <div className="space-y-6">
      <PageHeader title="Teachers & Staff" titleBn="শিক্ষক ও কর্মচারী" description="Manage teacher profiles, designations, and department assignments">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Add Teacher</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Total Staff" titleBn="মোট কর্মচারী" value={teachers.length} icon={Users} index={0} />
        <StatCard title="Active" titleBn="সক্রিয়" value={active} icon={UserCheck} index={1} />
        <StatCard title="On Leave" titleBn="ছুটিতে" value={onLeave} change={`${onLeave} teacher(s)`} changeType="neutral" icon={Clock} index={2} />
        <StatCard title="Departments" titleBn="বিভাগ" value={departments} icon={GraduationCap} index={3} />
      </div>

      <FilterBar
        searchPlaceholder="Search by name, ID..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { key: 'department', label: 'Department', options: [{ label: 'Science', value: 'Science' }, { label: 'Mathematics', value: 'Mathematics' }, { label: 'English', value: 'English' }, { label: 'Administration', value: 'Administration' }] },
          { key: 'status', label: 'Status', options: [{ label: 'Active', value: 'active' }, { label: 'On Leave', value: 'on_leave' }, { label: 'Inactive', value: 'inactive' }] },
        ]}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs">Teacher</TableHead>
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Designation</TableHead>
                  <TableHead className="text-xs">Department</TableHead>
                  <TableHead className="text-xs">Subjects</TableHead>
                  <TableHead className="text-xs">Phone</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.id} className="cursor-pointer" onClick={() => setSelected(t)}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-accent text-accent-foreground text-xs">{t.name.split(' ').slice(-1)[0][0]}{t.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{t.name}</p>
                          <p className="text-[11px] text-muted-foreground">{t.nameBn}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground">{t.employeeId}</TableCell>
                    <TableCell className="text-sm">{t.designation}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.department}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {t.subjects.slice(0, 2).map(s => (
                          <Badge key={s} variant="secondary" className="text-[10px] font-normal">{s}</Badge>
                        ))}
                        {t.subjects.length > 2 && <Badge variant="secondary" className="text-[10px] font-normal">+{t.subjects.length - 2}</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.phone}</TableCell>
                    <TableCell><StatusBadge status={t.status === 'on_leave' ? 'late' : t.status} /></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => e.stopPropagation()}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelected(t)}><Eye className="h-3.5 w-3.5 mr-2" />View</DropdownMenuItem>
                          <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <DetailDrawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ""} description={selected?.nameBn}>
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">{selected.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{selected.name}</p>
                <p className="text-sm text-muted-foreground">{selected.designation}</p>
                <StatusBadge status={selected.status === 'on_leave' ? 'late' : selected.status} />
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-muted-foreground text-xs mb-0.5">Employee ID</p><p className="font-mono font-medium">{selected.employeeId}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Department</p><p className="font-medium">{selected.department}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Qualification</p><p className="font-medium">{selected.qualification}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Join Date</p><p className="font-medium">{selected.joinDate}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Phone</p><p className="font-medium">{selected.phone}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Email</p><p className="font-medium text-xs">{selected.email}</p></div>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Subjects</p>
              <div className="flex gap-2 flex-wrap">
                {selected.subjects.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">Edit Profile</Button>
              <Button size="sm" variant="outline" className="flex-1">Print ID Card</Button>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DetailDrawer } from "@/components/shared/DetailDrawer";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { students, type Student } from "@/data/mock-data-extended";
import { Plus, Users, UserCheck, UserX, GraduationCap, Eye, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentListPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Student | null>(null);
  const navigate = useNavigate();

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.nameBn.includes(search) ||
      s.studentId.toLowerCase().includes(search.toLowerCase())
  );

  const enrolled = students.filter((s) => s.status === 'enrolled').length;
  const male = students.filter((s) => s.gender === 'male').length;
  const female = students.filter((s) => s.gender === 'female').length;

  return (
    <div className="space-y-6">
      <PageHeader title="Students" titleBn="শিক্ষার্থী" description="Manage student records and profiles">
        <Button size="sm" onClick={() => navigate('/tenant/students/create')}>
          <Plus className="h-4 w-4 mr-1" />
          Add Student
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" titleBn="মোট শিক্ষার্থী" value={students.length} icon={Users} index={0} />
        <StatCard title="Enrolled" titleBn="ভর্তিকৃত" value={enrolled} change={`${Math.round(enrolled / students.length * 100)}% of total`} changeType="positive" icon={UserCheck} index={1} />
        <StatCard title="Male" titleBn="ছাত্র" value={male} icon={GraduationCap} index={2} />
        <StatCard title="Female" titleBn="ছাত্রী" value={female} icon={UserX} index={3} />
      </div>

      <FilterBar
        searchPlaceholder="Search by name, ID..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { key: 'class', label: 'Class', options: [{ label: 'Class 7', value: '7' }, { label: 'Class 8', value: '8' }, { label: 'Class 9', value: '9' }, { label: 'Class 10', value: '10' }] },
          { key: 'section', label: 'Section', options: [{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }] },
          { key: 'status', label: 'Status', options: [{ label: 'Enrolled', value: 'enrolled' }, { label: 'Graduated', value: 'graduated' }, { label: 'Inactive', value: 'inactive' }] },
        ]}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs">Student</TableHead>
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Class</TableHead>
                  <TableHead className="text-xs">Section</TableHead>
                  <TableHead className="text-xs">Roll</TableHead>
                  <TableHead className="text-xs">Gender</TableHead>
                  <TableHead className="text-xs">Guardian</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id} className="cursor-pointer" onClick={() => setSelected(s)}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-accent text-accent-foreground text-xs">{s.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{s.name}</p>
                          <p className="text-[11px] text-muted-foreground">{s.nameBn}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground">{s.studentId}</TableCell>
                    <TableCell className="text-sm">{s.class}</TableCell>
                    <TableCell className="text-sm">{s.section}</TableCell>
                    <TableCell className="text-sm font-medium">{s.roll}</TableCell>
                    <TableCell className="text-sm capitalize text-muted-foreground">{s.gender}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{s.guardianName}</p>
                        <p className="text-[11px] text-muted-foreground">{s.guardianPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge status={s.status} /></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelected(s)}><Eye className="h-3.5 w-3.5 mr-2" />View Profile</DropdownMenuItem>
                          <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive"><Trash2 className="h-3.5 w-3.5 mr-2" />Delete</DropdownMenuItem>
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

      {/* Student Profile Drawer */}
      <DetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name || ""}
        description={selected?.nameBn}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">{selected.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg text-foreground">{selected.name}</p>
                <p className="text-sm text-muted-foreground">{selected.nameBn}</p>
                <StatusBadge status={selected.status} />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Student ID</p>
                <p className="font-medium font-mono">{selected.studentId}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Class & Section</p>
                <p className="font-medium">{selected.class} - {selected.section}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Roll Number</p>
                <p className="font-medium">{selected.roll}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Gender</p>
                <p className="font-medium capitalize">{selected.gender}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Date of Birth</p>
                <p className="font-medium">{selected.dob}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Blood Group</p>
                <p className="font-medium">{selected.bloodGroup}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Phone</p>
                <p className="font-medium">{selected.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Admission Date</p>
                <p className="font-medium">{selected.admissionDate}</p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Guardian Information / অভিভাবকের তথ্য</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">Name</p>
                  <p className="font-medium">{selected.guardianName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">Phone</p>
                  <p className="font-medium">{selected.guardianPhone}</p>
                </div>
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

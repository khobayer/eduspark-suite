import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { dailyAttendance, attendanceSummary, type AttendanceRecord } from "@/data/tenant-data";
import { CalendarCheck, Users, UserX, Clock, Check, X, AlertTriangle, Save, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { toast } from "sonner";
import { useLocale } from "@/contexts/LocaleContext";
import { LocaleLabel } from "@/components/shared/LocaleLabel";

const statusColors: Record<string, string> = {
  present: 'bg-success text-success-foreground',
  absent: 'bg-destructive text-destructive-foreground',
  late: 'bg-warning text-warning-foreground',
  leave: 'bg-muted text-muted-foreground',
};

const statusIcons: Record<string, typeof Check> = {
  present: Check,
  absent: X,
  late: Clock,
  leave: AlertTriangle,
};

const staffAttendance = [
  { id: '1', name: 'Mr. Karim Ahmed', designation: 'Senior Teacher', department: 'Science', status: 'present' as const },
  { id: '2', name: 'Ms. Fatima Begum', designation: 'Lecturer', department: 'English', status: 'present' as const },
  { id: '3', name: 'Mr. Rahman', designation: 'Teacher', department: 'Mathematics', status: 'late' as const },
  { id: '4', name: 'Dr. Hasan Ali', designation: 'Head of Dept', department: 'Science', status: 'present' as const },
  { id: '5', name: 'Ms. Nusrat Jahan', designation: 'Teacher', department: 'Bangla', status: 'absent' as const },
  { id: '6', name: 'Mr. Alam', designation: 'Admin Officer', department: 'Administration', status: 'present' as const },
  { id: '7', name: 'Ms. Afroza', designation: 'Accountant', department: 'Administration', status: 'present' as const },
  { id: '8', name: 'Mr. Habib', designation: 'Teacher', department: 'Science', status: 'leave' as const },
];

const absentStudents = [
  { roll: 1, name: 'Rahim Uddin', class: 'Class 10A', absentDays: 8, lastAbsent: '2025-03-18', guardianPhone: '01711-XXXXXX' },
  { roll: 5, name: 'Sumaiya Akter', class: 'Class 9B', absentDays: 12, lastAbsent: '2025-03-19', guardianPhone: '01811-XXXXXX' },
  { roll: 12, name: 'Habibur Rahman', class: 'Class 8A', absentDays: 6, lastAbsent: '2025-03-17', guardianPhone: '01911-XXXXXX' },
  { roll: 3, name: 'Nazmul Hasan', class: 'Class 10B', absentDays: 15, lastAbsent: '2025-03-19', guardianPhone: '01611-XXXXXX' },
  { roll: 7, name: 'Taslima Begum', class: 'Class 7A', absentDays: 9, lastAbsent: '2025-03-15', guardianPhone: '01511-XXXXXX' },
];

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>(dailyAttendance);
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [selectedSection, setSelectedSection] = useState("A");

  const present = records.filter(r => r.status === 'present').length;
  const absent = records.filter(r => r.status === 'absent').length;
  const late = records.filter(r => r.status === 'late').length;

  const toggleStatus = (studentId: string) => {
    const order: AttendanceRecord['status'][] = ['present', 'absent', 'late', 'leave'];
    setRecords(prev => prev.map(r => {
      if (r.studentId === studentId) {
        const nextIndex = (order.indexOf(r.status) + 1) % order.length;
        return { ...r, status: order[nextIndex] };
      }
      return r;
    }));
  };

  const staffPresent = staffAttendance.filter(s => s.status === 'present').length;

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" titleBn="উপস্থিতি" description="Daily attendance marking and tracking for students and staff">
        <Button size="sm" onClick={() => toast.success("Attendance saved!")}><Save className="h-4 w-4 mr-1" />Save Attendance</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Present" titleBn="উপস্থিত" value={present} change={`${Math.round(present / records.length * 100)}%`} changeType="positive" icon={CalendarCheck} index={0} />
        <StatCard title="Absent" titleBn="অনুপস্থিত" value={absent} changeType="negative" icon={UserX} index={1} />
        <StatCard title="Late" titleBn="বিলম্বে" value={late} icon={Clock} index={2} />
        <StatCard title="Total Students" titleBn="মোট" value={records.length} icon={Users} index={3} />
        <StatCard title="Staff Present" titleBn="কর্মচারী" value={`${staffPresent}/${staffAttendance.length}`} icon={Briefcase} index={4} />
      </div>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Student Attendance / শিক্ষার্থী</TabsTrigger>
          <TabsTrigger value="staff">Staff Attendance / কর্মচারী</TabsTrigger>
          <TabsTrigger value="absent">Absent Summary / অনুপস্থিত</TabsTrigger>
          <TabsTrigger value="analytics">Analytics / বিশ্লেষণ</TabsTrigger>
        </TabsList>

        {/* Student Attendance */}
        <TabsContent value="students" className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-card border rounded-lg">
            <span className="text-sm font-medium text-foreground">Date: March 19, 2025</span>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="h-9 w-[130px] bg-secondary border-0"><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="h-9 w-[100px] bg-secondary border-0"><SelectValue /></SelectTrigger>
              <SelectContent>
                {['A', 'B'].map(s => (<SelectItem key={s} value={s}>Section {s}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">{selectedClass} - Section {selectedSection}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {records.map((r) => {
                    const Icon = statusIcons[r.status];
                    return (
                      <button
                        key={r.studentId}
                        onClick={() => toggleStatus(r.studentId)}
                        className={`relative p-3 rounded-lg border-2 transition-all text-left hover:shadow-sm ${
                          r.status === 'present' ? 'border-success/30 bg-success/5' :
                          r.status === 'absent' ? 'border-destructive/30 bg-destructive/5' :
                          r.status === 'late' ? 'border-warning/30 bg-warning/5' :
                          'border-border bg-muted/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono text-muted-foreground">#{r.roll}</span>
                          <span className={`h-5 w-5 rounded-full flex items-center justify-center ${statusColors[r.status]}`}>
                            <Icon className="h-3 w-3" />
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground truncate">{r.studentName}</p>
                        <p className="text-[10px] text-muted-foreground capitalize mt-0.5">{r.status}</p>
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                  {(['present', 'absent', 'late', 'leave'] as const).map(s => (
                    <div key={s} className="flex items-center gap-1.5">
                      <span className={`h-3 w-3 rounded-full ${statusColors[s]}`} />
                      <span className="text-xs text-muted-foreground capitalize">{s}</span>
                    </div>
                  ))}
                  <span className="text-xs text-muted-foreground ml-auto">Click card to toggle status</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Staff Attendance */}
        <TabsContent value="staff">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">Staff Attendance – March 19, 2025</CardTitle>
                  <span className="text-xs text-muted-foreground">{staffPresent} of {staffAttendance.length} present</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">Staff Member</TableHead>
                      <TableHead className="text-xs">Designation</TableHead>
                      <TableHead className="text-xs">Department</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffAttendance.map(s => (
                      <TableRow key={s.id}>
                        <TableCell className="text-sm font-medium">{s.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{s.designation}</TableCell>
                        <TableCell><Badge variant="secondary" className="text-[10px] font-normal">{s.department}</Badge></TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            s.status === 'present' ? 'bg-success/10 text-success' :
                            s.status === 'absent' ? 'bg-destructive/10 text-destructive' :
                            s.status === 'late' ? 'bg-warning/10 text-warning' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {s.status === 'present' ? <Check className="h-3 w-3" /> :
                             s.status === 'absent' ? <X className="h-3 w-3" /> :
                             s.status === 'late' ? <Clock className="h-3 w-3" /> :
                             <AlertTriangle className="h-3 w-3" />}
                            <span className="capitalize">{s.status}</span>
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Absent Summary */}
        <TabsContent value="absent">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold">Chronically Absent Students / দীর্ঘ অনুপস্থিত</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Students absent 5+ days this month</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">{absentStudents.length} students</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {absentStudents.length === 0 ? (
                  <EmptyState
                    icon={<CalendarCheck className="h-7 w-7 text-muted-foreground" />}
                    title="All students present"
                    description="No chronically absent students found"
                  />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs">Roll</TableHead>
                        <TableHead className="text-xs">Student</TableHead>
                        <TableHead className="text-xs">Class</TableHead>
                        <TableHead className="text-xs text-center">Absent Days</TableHead>
                        <TableHead className="text-xs">Last Absent</TableHead>
                        <TableHead className="text-xs">Guardian Phone</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {absentStudents.map(s => (
                        <TableRow key={s.roll}>
                          <TableCell className="text-sm font-mono">#{s.roll}</TableCell>
                          <TableCell className="text-sm font-medium">{s.name}</TableCell>
                          <TableCell><Badge variant="secondary" className="text-[10px] font-normal">{s.class}</Badge></TableCell>
                          <TableCell className="text-center">
                            <Badge variant={s.absentDays >= 10 ? 'destructive' : 'secondary'} className="text-xs">{s.absentDays} days</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{s.lastAbsent}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{s.guardianPhone}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Weekly Summary Chart */}
        <TabsContent value="analytics">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Weekly Summary / সাপ্তাহিক সারসংক্ষেপ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceSummary}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                      <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                      <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid hsl(var(--border))' }} />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Bar dataKey="present" fill="hsl(142, 60%, 40%)" radius={[4, 4, 0, 0]} name="Present" />
                      <Bar dataKey="absent" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Absent" />
                      <Bar dataKey="late" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} name="Late" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

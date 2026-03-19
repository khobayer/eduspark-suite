import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { dailyAttendance, attendanceSummary, type AttendanceRecord } from "@/data/tenant-data";
import { CalendarCheck, Users, UserX, Clock, Check, X, AlertTriangle, Save } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { toast } from "sonner";

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

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" titleBn="উপস্থিতি" description="Daily attendance marking and tracking">
        <Button size="sm" onClick={() => toast.success("Attendance saved!")}><Save className="h-4 w-4 mr-1" />Save Attendance</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Present" titleBn="উপস্থিত" value={present} change={`${Math.round(present / records.length * 100)}%`} changeType="positive" icon={CalendarCheck} index={0} />
        <StatCard title="Absent" titleBn="অনুপস্থিত" value={absent} changeType="negative" icon={UserX} index={1} />
        <StatCard title="Late" titleBn="বিলম্বে" value={late} icon={Clock} index={2} />
        <StatCard title="Total" titleBn="মোট" value={records.length} icon={Users} index={3} />
      </div>

      {/* Class/Section Selector */}
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

      {/* Attendance Grid */}
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

      {/* Weekly Summary Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Weekly Summary / সাপ্তাহিক সারসংক্ষেপ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceSummary}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid hsl(214, 20%, 90%)' }} />
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
    </div>
  );
}

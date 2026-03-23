import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exams, examResults, type Exam } from "@/data/tenant-data";
import {
  FileText, Calendar, Award, BarChart3, Plus, Eye, Printer, MoreHorizontal,
  Edit, Trash2, CheckCircle2, Upload, Download, Medal, BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useLocale } from "@/contexts/LocaleContext";
import { LocaleLabel } from "@/components/shared/LocaleLabel";

const typeLabels: Record<string, string> = {
  term: 'Term Exam', mid_term: 'Mid-Term', final: 'Final Exam', class_test: 'Class Test', mock: 'Mock Test',
};
const typeColors: Record<string, string> = {
  term: 'bg-info/10 text-info border-info/20',
  mid_term: 'bg-warning/10 text-warning border-warning/20',
  final: 'bg-primary/10 text-primary border-primary/20',
  class_test: 'bg-muted text-muted-foreground border-border',
  mock: 'bg-accent text-accent-foreground border-border',
};

const gradeColors: Record<string, string> = {
  'A+': 'text-success font-bold', 'A': 'text-success', 'A-': 'text-success',
  'B': 'text-info', 'C': 'text-warning', 'D': 'text-warning', 'F': 'text-destructive font-bold',
};

const subjectPerformance = [
  { subject: 'Bangla', avgMarks: 72, highest: 95, lowest: 35, passRate: 92 },
  { subject: 'English', avgMarks: 68, highest: 92, lowest: 28, passRate: 85 },
  { subject: 'Math', avgMarks: 65, highest: 98, lowest: 22, passRate: 78 },
  { subject: 'Physics', avgMarks: 70, highest: 94, lowest: 30, passRate: 88 },
  { subject: 'Chemistry', avgMarks: 67, highest: 90, lowest: 25, passRate: 82 },
];

const subjectChartData = subjectPerformance.map(s => ({
  subject: s.subject,
  average: s.avgMarks,
  highest: s.highest,
  passRate: s.passRate,
}));

export default function ExamsPage() {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [marksData, setMarksData] = useState(
    examResults.map(r => ({ ...r, editing: false }))
  );

  const upcoming = exams.filter(e => e.status === 'upcoming').length;
  const published = exams.filter(e => e.status === 'published').length;
  const completed = exams.filter(e => e.status === 'completed').length;

  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <PageHeader title="Exams & Results" titleBn="পরীক্ষা ও ফলাফল" description="Exam setup, marks entry, tabulation, report cards, and result publishing" descriptionBn="পরীক্ষা সেটআপ, নম্বর এন্ট্রি, ট্যাবুলেশন, রিপোর্ট কার্ড এবং ফলাফল প্রকাশ">
        <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1" />{t("Export", "রপ্তানি")}</Button>
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />{t("Create Exam", "পরীক্ষা তৈরি")}</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Exams" titleBn="মোট পরীক্ষা" value={exams.length} icon={FileText} index={0} />
        <StatCard title="Upcoming" titleBn="আসন্ন" value={upcoming} icon={Calendar} index={1} />
        <StatCard title="Completed" titleBn="সম্পন্ন" value={completed} change="Marks pending" changeType="neutral" icon={CheckCircle2} index={2} />
        <StatCard title="Published" titleBn="প্রকাশিত" value={published} icon={Award} index={3} />
        <StatCard title="Avg GPA" titleBn="গড় জিপিএ" value="3.72" change="Class 10" changeType="positive" icon={BarChart3} index={4} />
      </div>

      <Tabs defaultValue="exams" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-auto">
            <TabsTrigger value="exams" className="text-xs">Exam List</TabsTrigger>
            <TabsTrigger value="marks" className="text-xs">Marks Entry</TabsTrigger>
            <TabsTrigger value="results" className="text-xs">Tabulation</TabsTrigger>
            <TabsTrigger value="merit" className="text-xs">Merit List</TabsTrigger>
            <TabsTrigger value="report-card" className="text-xs">Report Card</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
          </TabsList>
        </div>

        {/* Exam List */}
        <TabsContent value="exams">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams.map((exam, i) => (
              <motion.div key={exam.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card className="border hover:shadow-sm transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{exam.name}</h3>
                        <p className="text-xs text-muted-foreground">{exam.nameBn}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={exam.status} />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Details</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem><Upload className="h-3.5 w-3.5 mr-2" />Enter Marks</DropdownMenuItem>
                            {exam.status === 'completed' && (
                              <DropdownMenuItem><Award className="h-3.5 w-3.5 mr-2" />Publish Results</DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => setConfirmDelete(exam.name)}>
                              <Trash2 className="h-3.5 w-3.5 mr-2" />Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${typeColors[exam.type]}`}>
                          {typeLabels[exam.type]}
                        </span>
                        <Badge variant="secondary" className="text-[10px] font-normal">Session: {exam.session}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>📅 {exam.startDate} → {exam.endDate}</span>
                        <span>📝 {exam.totalMarks} marks</span>
                      </div>
                      <div className="flex gap-1 flex-wrap mt-1">
                        {exam.classes.slice(0, 3).map(c => (
                          <Badge key={c} variant="outline" className="text-[10px] font-normal">{c}</Badge>
                        ))}
                        {exam.classes.length > 3 && <Badge variant="outline" className="text-[10px]">+{exam.classes.length - 3}</Badge>}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 pt-3 border-t">
                      {exam.status === 'upcoming' && <Button size="sm" variant="outline" className="flex-1 h-8 text-xs"><Edit className="h-3 w-3 mr-1" />Edit</Button>}
                      {(exam.status === 'completed' || exam.status === 'published') && (
                        <Button size="sm" variant="outline" className="flex-1 h-8 text-xs"><Eye className="h-3 w-3 mr-1" />View Results</Button>
                      )}
                      {exam.status === 'completed' && <Button size="sm" className="flex-1 h-8 text-xs"><Award className="h-3 w-3 mr-1" />Publish</Button>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Marks Entry */}
        <TabsContent value="marks" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <CardTitle className="text-base font-semibold">Marks Entry / নম্বর এন্ট্রি</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Enter marks for each student per subject</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="mid_term_2025">
                    <SelectTrigger className="h-9 w-[180px] bg-secondary border-0"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mid_term_2025">Mid-Term 2025</SelectItem>
                      <SelectItem value="final_2024">Final 2024</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="class_10a">
                    <SelectTrigger className="h-9 w-[130px] bg-secondary border-0"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class_10a">Class 10A</SelectItem>
                      <SelectItem value="class_10b">Class 10B</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={() => toast.success("Marks saved successfully!")}>
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />Save Marks
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs">Roll</TableHead>
                    <TableHead className="text-xs">Student</TableHead>
                    <TableHead className="text-xs text-center">Bangla (100)</TableHead>
                    <TableHead className="text-xs text-center">English (100)</TableHead>
                    <TableHead className="text-xs text-center">Math (100)</TableHead>
                    <TableHead className="text-xs text-center">Physics (100)</TableHead>
                    <TableHead className="text-xs text-center">Chemistry (100)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examResults.map(r => (
                    <TableRow key={r.roll}>
                      <TableCell className="text-sm font-mono">{r.roll}</TableCell>
                      <TableCell className="text-sm font-medium">{r.studentName}</TableCell>
                      {[r.bangla, r.english, r.math, r.physics, r.chemistry].map((val, i) => (
                        <TableCell key={i} className="text-center p-1">
                          <Input
                            defaultValue={val}
                            className="h-8 w-16 text-center text-sm bg-secondary border-0 mx-auto"
                            type="number"
                            min={0}
                            max={100}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tabulation */}
        <TabsContent value="results">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold">Tabulation Sheet / ফলাফল তালিকা</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">SSC Mock Test - Class 10A · Session 2025 · Total Marks: 500</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5 mr-1" />Export</Button>
                    <Button size="sm" variant="outline"><Printer className="h-3.5 w-3.5 mr-1" />Print</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">Roll</TableHead>
                      <TableHead className="text-xs">Student</TableHead>
                      <TableHead className="text-xs text-center">Bangla</TableHead>
                      <TableHead className="text-xs text-center">English</TableHead>
                      <TableHead className="text-xs text-center">Math</TableHead>
                      <TableHead className="text-xs text-center">Physics</TableHead>
                      <TableHead className="text-xs text-center">Chemistry</TableHead>
                      <TableHead className="text-xs text-center font-semibold">Total</TableHead>
                      <TableHead className="text-xs text-center">GPA</TableHead>
                      <TableHead className="text-xs text-center">Grade</TableHead>
                      <TableHead className="text-xs text-center">Position</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examResults
                      .sort((a, b) => b.total - a.total)
                      .map((r, i) => (
                        <TableRow key={r.roll} className={i === 0 ? 'bg-success/5' : ''}>
                          <TableCell className="text-sm font-mono">{r.roll}</TableCell>
                          <TableCell className="text-sm font-medium">{r.studentName}</TableCell>
                          <TableCell className="text-sm text-center">{r.bangla}</TableCell>
                          <TableCell className="text-sm text-center">{r.english}</TableCell>
                          <TableCell className="text-sm text-center">{r.math}</TableCell>
                          <TableCell className="text-sm text-center">{r.physics}</TableCell>
                          <TableCell className="text-sm text-center">{r.chemistry}</TableCell>
                          <TableCell className="text-sm text-center font-bold">{r.total}</TableCell>
                          <TableCell className="text-sm text-center font-semibold">{r.gpa.toFixed(2)}</TableCell>
                          <TableCell className={`text-sm text-center ${gradeColors[r.grade] || ''}`}>{r.grade}</TableCell>
                          <TableCell className="text-center">
                            {i < 3 ? (
                              <Badge variant={i === 0 ? 'default' : 'secondary'} className="text-[10px]">
                                {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} #{i + 1}
                              </Badge>
                            ) : (
                              <span className="text-sm text-muted-foreground">#{i + 1}</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Merit List */}
        <TabsContent value="merit" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Merit List / মেধা তালিকা</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Top performers ranked by GPA</p>
                </div>
                <Button size="sm" variant="outline"><Printer className="h-3.5 w-3.5 mr-1" />Print Merit List</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {examResults
                  .sort((a, b) => b.gpa - a.gpa)
                  .slice(0, 3)
                  .map((r, i) => (
                    <motion.div key={r.roll} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                      <Card className={`border-2 ${i === 0 ? 'border-warning/50 bg-warning/[0.03]' : i === 1 ? 'border-muted-foreground/30' : 'border-warning/20'}`}>
                        <CardContent className="p-4 text-center">
                          <span className="text-3xl mb-2 block">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                          <p className="font-bold text-foreground">{r.studentName}</p>
                          <p className="text-xs text-muted-foreground">Roll #{r.roll}</p>
                          <Separator className="my-2" />
                          <div className="flex justify-center gap-4">
                            <div>
                              <p className="text-xl font-bold text-primary">{r.gpa.toFixed(2)}</p>
                              <p className="text-[10px] text-muted-foreground">GPA</p>
                            </div>
                            <div>
                              <p className="text-xl font-bold text-foreground">{r.total}</p>
                              <p className="text-[10px] text-muted-foreground">Total</p>
                            </div>
                          </div>
                          <Badge className="mt-2 text-xs">Grade {r.grade}</Badge>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs w-16">Position</TableHead>
                    <TableHead className="text-xs">Student</TableHead>
                    <TableHead className="text-xs text-center">Total</TableHead>
                    <TableHead className="text-xs text-center">GPA</TableHead>
                    <TableHead className="text-xs text-center">Grade</TableHead>
                    <TableHead className="text-xs">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examResults
                    .sort((a, b) => b.gpa - a.gpa)
                    .map((r, i) => (
                      <TableRow key={r.roll}>
                        <TableCell className="font-bold text-sm">#{i + 1}</TableCell>
                        <TableCell className="text-sm font-medium">{r.studentName}</TableCell>
                        <TableCell className="text-sm text-center font-semibold">{r.total}/500</TableCell>
                        <TableCell className="text-sm text-center font-bold text-primary">{r.gpa.toFixed(2)}</TableCell>
                        <TableCell className={`text-sm text-center ${gradeColors[r.grade] || ''}`}>{r.grade}</TableCell>
                        <TableCell><Progress value={(r.total / 500) * 100} className="h-2 w-24" /></TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Card Preview */}
        <TabsContent value="report-card" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Report Card Preview / প্রগতি পত্র</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Preview and print individual student report cards</p>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="1">
                    <SelectTrigger className="h-9 w-[200px] bg-secondary border-0"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {examResults.map(r => (
                        <SelectItem key={r.roll} value={r.roll.toString()}>{r.studentName} (Roll #{r.roll})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm"><Printer className="h-3.5 w-3.5 mr-1" />Print</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-xl p-6 bg-card max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center border-b pb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-2">D</div>
                  <h2 className="text-lg font-bold text-foreground">Dhaka Model School</h2>
                  <p className="text-xs text-muted-foreground">ঢাকা মডেল স্কুল</p>
                  <p className="text-[10px] text-muted-foreground italic mt-0.5">Education for Enlightenment</p>
                  <Badge className="mt-2 text-xs">Progress Report Card – SSC Mock Test 2025</Badge>
                </div>
                {/* Student Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground text-xs">Student Name:</span> <span className="font-medium">{examResults[0].studentName}</span></div>
                  <div><span className="text-muted-foreground text-xs">Roll No:</span> <span className="font-medium">{examResults[0].roll}</span></div>
                  <div><span className="text-muted-foreground text-xs">Class:</span> <span className="font-medium">Class 10A</span></div>
                  <div><span className="text-muted-foreground text-xs">Session:</span> <span className="font-medium">2025</span></div>
                </div>
                <Separator />
                {/* Marks Table */}
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">Subject</TableHead>
                      <TableHead className="text-xs text-center">Full Marks</TableHead>
                      <TableHead className="text-xs text-center">Obtained</TableHead>
                      <TableHead className="text-xs text-center">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: 'Bangla', marks: examResults[0].bangla },
                      { name: 'English', marks: examResults[0].english },
                      { name: 'Mathematics', marks: examResults[0].math },
                      { name: 'Physics', marks: examResults[0].physics },
                      { name: 'Chemistry', marks: examResults[0].chemistry },
                    ].map(sub => {
                      const grade = sub.marks >= 80 ? 'A+' : sub.marks >= 70 ? 'A' : sub.marks >= 60 ? 'A-' : sub.marks >= 50 ? 'B' : sub.marks >= 40 ? 'C' : 'F';
                      return (
                        <TableRow key={sub.name}>
                          <TableCell className="text-sm font-medium">{sub.name}</TableCell>
                          <TableCell className="text-sm text-center text-muted-foreground">100</TableCell>
                          <TableCell className="text-sm text-center font-semibold">{sub.marks}</TableCell>
                          <TableCell className={`text-sm text-center ${gradeColors[grade] || ''}`}>{grade}</TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow className="bg-muted/30 font-semibold">
                      <TableCell className="text-sm font-bold">Total</TableCell>
                      <TableCell className="text-sm text-center">500</TableCell>
                      <TableCell className="text-sm text-center font-bold">{examResults[0].total}</TableCell>
                      <TableCell className="text-sm text-center font-bold">{examResults[0].grade}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                {/* Footer */}
                <div className="flex justify-between pt-4 border-t text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">GPA</p>
                    <p className="text-xl font-bold text-primary">{examResults[0].gpa.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-xs">Position</p>
                    <p className="text-xl font-bold text-foreground">#1 of 8</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8 pt-8 text-center text-xs text-muted-foreground border-t mt-4">
                  <div className="border-t border-foreground/20 pt-2">Class Teacher</div>
                  <div className="border-t border-foreground/20 pt-2">Principal</div>
                  <div className="border-t border-foreground/20 pt-2">Guardian</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">Subject Performance / বিষয়ভিত্তিক পারফরম্যান্স</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subjectChartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="subject" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                        <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid hsl(var(--border))' }} />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Bar dataKey="average" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Average" />
                        <Bar dataKey="highest" fill="hsl(142, 60%, 40%)" radius={[4, 4, 0, 0]} name="Highest" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">Pass Rate by Subject / পাসের হার</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectPerformance.map(s => (
                      <div key={s.subject}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{s.subject}</span>
                          <span className={`text-sm font-semibold ${s.passRate >= 90 ? 'text-success' : s.passRate >= 80 ? 'text-info' : 'text-warning'}`}>
                            {s.passRate}%
                          </span>
                        </div>
                        <Progress value={s.passRate} className="h-2" />
                        <div className="flex justify-between mt-1">
                          <span className="text-[10px] text-muted-foreground">Avg: {s.avgMarks}</span>
                          <span className="text-[10px] text-muted-foreground">High: {s.highest} · Low: {s.lowest}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={!!confirmDelete}
        onOpenChange={() => setConfirmDelete(null)}
        title="Delete Exam"
        description={`Are you sure you want to delete "${confirmDelete}"? All associated marks and results will be permanently removed.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => { toast.success("Exam deleted."); setConfirmDelete(null); }}
      />
    </div>
  );
}

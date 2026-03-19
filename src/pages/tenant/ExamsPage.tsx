import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { exams, examResults, type Exam } from "@/data/tenant-data";
import { FileText, Calendar, Award, BarChart3, Plus, Eye, Printer } from "lucide-react";
import { motion } from "framer-motion";

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

export default function ExamsPage() {
  const upcoming = exams.filter(e => e.status === 'upcoming').length;
  const published = exams.filter(e => e.status === 'published').length;

  return (
    <div className="space-y-6">
      <PageHeader title="Exams & Results" titleBn="পরীক্ষা ও ফলাফল" description="Exam setup, marks entry, tabulation, and report cards">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Create Exam</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Total Exams" titleBn="মোট পরীক্ষা" value={exams.length} icon={FileText} index={0} />
        <StatCard title="Upcoming" titleBn="আসন্ন" value={upcoming} icon={Calendar} index={1} />
        <StatCard title="Results Published" titleBn="ফলাফল প্রকাশিত" value={published} icon={Award} index={2} />
        <StatCard title="Avg GPA" titleBn="গড় জিপিএ" value="3.72" icon={BarChart3} index={3} />
      </div>

      <Tabs defaultValue="exams" className="space-y-4">
        <TabsList>
          <TabsTrigger value="exams">Exam List / পরীক্ষার তালিকা</TabsTrigger>
          <TabsTrigger value="results">Results & Tabulation / ফলাফল</TabsTrigger>
        </TabsList>

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
                      <StatusBadge status={exam.status} />
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
                      {exam.status === 'upcoming' && <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">Edit</Button>}
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

        <TabsContent value="results">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold">SSC Mock Test - Class 10A</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Session 2025 · Total Marks: 500</p>
                  </div>
                  <Button size="sm" variant="outline"><Printer className="h-3.5 w-3.5 mr-1" />Print Tabulation</Button>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examResults.map(r => (
                      <TableRow key={r.roll}>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

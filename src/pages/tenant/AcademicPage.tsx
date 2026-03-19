import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { classStructure, academicSessions } from "@/data/tenant-data";
import { BookOpen, Users, Layers, Calendar, Plus, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function AcademicPage() {
  const totalSections = classStructure.reduce((acc, c) => acc + c.sections.length, 0);
  const totalEnrolled = classStructure.reduce((acc, c) => acc + c.sections.reduce((a, s) => a + s.enrolled, 0), 0);
  const totalCapacity = classStructure.reduce((acc, c) => acc + c.sections.reduce((a, s) => a + s.capacity, 0), 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Academic Structure" titleBn="একাডেমিক কাঠামো" description="Manage classes, sections, subjects, and academic sessions">
        <Button size="sm" variant="outline"><Settings className="h-4 w-4 mr-1" />Configure</Button>
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Add Class</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Classes" titleBn="শ্রেণি" value={classStructure.length} icon={BookOpen} index={0} />
        <StatCard title="Sections" titleBn="শাখা" value={totalSections} icon={Layers} index={1} />
        <StatCard title="Total Enrolled" titleBn="মোট ভর্তি" value={totalEnrolled} change={`${Math.round(totalEnrolled / totalCapacity * 100)}% capacity`} changeType="positive" icon={Users} index={2} />
        <StatCard title="Sessions" titleBn="সেশন" value={academicSessions.length} icon={Calendar} index={3} />
      </div>

      <Tabs defaultValue="classes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="classes">Classes & Sections / শ্রেণি ও শাখা</TabsTrigger>
          <TabsTrigger value="sessions">Academic Sessions / শিক্ষাবর্ষ</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-4">
          {classStructure.map((cls, i) => (
            <motion.div key={cls.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                        <span className="text-sm font-bold text-accent-foreground">{cls.name.split(' ')[1]}</span>
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold">{cls.name} <span className="text-muted-foreground font-normal">/ {cls.nameBn}</span></CardTitle>
                        <p className="text-xs text-muted-foreground">{cls.sections.length} sections · {cls.subjects.length} subjects</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cls.sections.map(sec => {
                      const pct = Math.round(sec.enrolled / sec.capacity * 100);
                      return (
                        <div key={sec.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border">
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-primary">{sec.name}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium">Section {sec.name}</p>
                              <span className="text-xs text-muted-foreground">{sec.enrolled}/{sec.capacity}</span>
                            </div>
                            <Progress value={pct} className="h-1.5" />
                            <p className="text-[11px] text-muted-foreground mt-1">Class Teacher: {sec.classTeacher}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5 font-medium">Subjects</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {cls.subjects.map(s => (
                        <Badge key={s} variant="secondary" className="text-[10px] font-normal">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="sessions">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">Academic Sessions / শিক্ষাবর্ষ</CardTitle>
                  <Button size="sm" variant="outline"><Plus className="h-3.5 w-3.5 mr-1" />Add Session</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">Session</TableHead>
                      <TableHead className="text-xs">Start Date</TableHead>
                      <TableHead className="text-xs">End Date</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {academicSessions.map(s => (
                      <TableRow key={s.id}>
                        <TableCell className="text-sm font-semibold">{s.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{s.startDate}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{s.endDate}</TableCell>
                        <TableCell><StatusBadge status={s.status} /></TableCell>
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
